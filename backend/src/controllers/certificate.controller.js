const Certificate = require('../models/Certificate.model');
const Internship = require('../models/Internship.model');
const Application = require('../models/Application.model');
const StudentProfile = require('../models/StudentProfile.model');
const FacultyProfile = require('../models/FacultyProfile.model');
const ApiError = require('../utils/ApiError');
const ApiResponse = require('../utils/ApiResponse');
const asyncHandler = require('../utils/asyncHandler');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const { APP_STATUS } = require('../constants/applicationStatus');
const Company = require('../models/Company.model');
const User = require('../models/User.model');

/**
 * @desc    Issue a certificate to a student for an internship
 * @route   POST /api/v1/certificates/:internshipId/issue
 * @access  Private (Admin or Faculty or Company)
 */
const issueCertificate = asyncHandler(async (req, res) => {
    const { studentId, certificateUrl } = req.body;
    const { internshipId } = req.params;

    if (!studentId || !certificateUrl) {
        throw new ApiError(400, "Student ID and Certificate URL are required");
    }

    
    // Verify application exists and is completed/accepted
    const application = await Application.findOne({
        internship: internshipId,
        student: studentId,
        status: APP_STATUS.ACCEPTED
    });

    if (!application) {
        throw new ApiError(404, "Valid application not found for this student and internship");
    }

    // Check if certificate already exists
    const existing = await Certificate.findOne({ student: studentId, internship: internshipId });
    if (existing) {
        throw new ApiError(400, "Certificate already issued to this student for this internship");
    }

    // Verify ownership/authorization
    const internship = await Internship.findById(internshipId).populate('company');
    if (!internship) throw new ApiError(404, "Internship not found");
    
    // Only Admin, or the Company that owns the internship can issue it
    if (req.user.role !== 'admin') {
        if (req.user.role === 'company' && internship.company.user.toString() !== req.user._id.toString()) {
            throw new ApiError(403, "Not authorized to issue certificates for this internship");
        }
        
        if (req.user.role === 'faculty') {
            if (!internship.mentor || internship.mentor.toString() !== req.user._id.toString()) {
                throw new ApiError(403, "Not authorized to issue certificates for this internship");
            }
            const facultyProfile = await FacultyProfile.findOne({ user: req.user._id });
            if (!facultyProfile || !facultyProfile.assignedStudents.some(id => id.toString() === studentId.toString())) {
                throw new ApiError(403, "Not authorized to issue certificates for this internship");
            }
        }
    }

    // Generate unique Certificate ID
    const uniqueHash = crypto.randomBytes(4).toString('hex').toUpperCase();
    const certificateId = `CERT-${new Date().getFullYear()}-${uniqueHash}`;

    try {
        const certificate = await Certificate.create({
            student: studentId,
            internship: internshipId,
            issuedBy: req.user._id,
            certificateUrl,
            certificateId
        });

        res.status(201).json(new ApiResponse(201, certificate, "Certificate issued successfully"));
    } catch (err) {
        if (err.code === 11000) {
            throw new ApiError(409, "Certificate already issued");
        }
        throw err;
    }
});

/**
 * @desc    Get student's own certificates
 * @route   GET /api/v1/certificates/me
 * @access  Private (Student only)
 */
const getMyCertificates = asyncHandler(async (req, res) => {
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.min(100, Math.max(1, parseInt(req.query.limit) || 20));
    const skip = (page - 1) * limit;

    const [certificates, total] = await Promise.all([
        Certificate.find({ student: req.user._id })
        .populate({
            path: 'internship',
            select: 'title company',
            populate: { path: 'company', select: 'name logo' }
        })
        .sort('-issueDate')
            .skip(skip)
            .limit(limit),
        Certificate.countDocuments({ student: req.user._id })
    ]);

    const meta = { page, limit, total, totalPages: Math.ceil(total / limit) };
    res.status(200).json(new ApiResponse(200, { data: certificates, meta }, "Certificates fetched successfully"));
});

/**
 * @desc    Verify a certificate by its unique ID
 * @route   GET /api/v1/certificates/verify/:certificateId
 * @access  Public
 */
const verifyCertificate = asyncHandler(async (req, res) => {
    const { certificateId } = req.params;

    // Optional authentication to populate req.user for privileged requests
    if (!req.user) {
        try {
            const token = req.cookies?.['__Host-ims_session'] || req.cookies?.['ims_session'] || req.cookies?.token || req.header("Authorization")?.replace("Bearer ", "");
            if (token) {
                const decodedToken = jwt.verify(token, process.env.JWT_SECRET, { algorithms: ['HS256'] });
                const user = await User.findById(decodedToken.id).select("-password");
                if (user && user.isActive && !user.deletedAt) {
                    if (decodedToken.tokenVersion === undefined || user.tokenVersion === undefined || decodedToken.tokenVersion === user.tokenVersion) {
                        req.user = user;
                    }
                }
            }
        } catch (e) {
            // Optional auth: ignore invalid or expired tokens for public verification
        }
    }

    const certificate = await Certificate.findOne({ certificateId })
        .populate({
            path: 'student',
            select: 'email'
        })
        .populate({
            path: 'internship',
            select: 'title company mentor',
            populate: { path: 'company', select: 'name user' }
        });

    if (!certificate) {
        throw new ApiError(404, "Invalid Certificate ID");
    }

    if (certificate.revokedAt) {
        const isPrivileged = req.user && (
            req.user.role === 'admin' ||
            (req.user.role === 'faculty' && certificate.internship?.mentor?.toString() === req.user._id.toString()) ||
            (req.user.role === 'company' && certificate.internship?.company?.user?.toString() === req.user._id.toString())
        );

        const revokedPayload = {
            valid: false,
            status: 'Revoked',
            certificateId: certificate.certificateId,
            issueDate: certificate.issueDate
        };

        if (isPrivileged && certificate.revocationReason) {
            revokedPayload.revocationReason = certificate.revocationReason;
        }

        return res.status(200).json(new ApiResponse(200, revokedPayload, "Certificate has been revoked"));
    }

    const profile = await StudentProfile.findOne({ user: certificate.student._id || certificate.student }).select('fullName');

    const responseData = {
        certificateId: certificate.certificateId,
        studentName: profile ? profile.fullName : 'Unknown Student',
        internshipTitle: certificate.internship?.title || '',
        companyName: certificate.internship?.company?.name || '',
        issueDate: certificate.issueDate,
        valid: true,
        status: "Valid"
    };

    res.status(200).json(new ApiResponse(200, responseData, "Certificate verified successfully"));
});


/**
 * @desc    Revoke certificate
 * @route   POST /api/v1/certificates/:id/revoke
 * @access  Private (admin/faculty/company)
 */
const revokeCertificate = asyncHandler(async (req, res) => {
    const { revocationReason } = req.body;
    
    const certificate = await Certificate.findById(req.params.id).populate('internship');
    if (!certificate) throw new ApiError(404, "Certificate not found");

    if (certificate.revokedAt) {
        throw new ApiError(400, "Certificate is already revoked");
    }

    let authorized = false;
    if (req.user.role === 'admin') authorized = true;
    else if (req.user.role === 'faculty' && certificate.internship.mentor?.toString() === req.user._id.toString()) authorized = true;
    else {
        const company = await Company.findOne({ user: req.user._id });
        if (company && certificate.internship.company.toString() === company._id.toString()) authorized = true;
    }

    if (!authorized) {
        throw new ApiError(403, "Not authorized to revoke this certificate");
    }

    certificate.revokedAt = new Date();
    certificate.revokedBy = req.user._id;
    certificate.revocationReason = revocationReason;
    
    await certificate.save();

    res.status(200).json(new ApiResponse(200, certificate, "Certificate revoked successfully"));
});

module.exports = {
    revokeCertificate,
    issueCertificate,
    getMyCertificates,
    verifyCertificate
};

