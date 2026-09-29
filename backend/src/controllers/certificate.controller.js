const Certificate = require('../models/Certificate.model');
const Internship = require('../models/Internship.model');
const Application = require('../models/Application.model');
const StudentProfile = require('../models/StudentProfile.model');
const FacultyProfile = require('../models/FacultyProfile.model');
const ApiError = require('../utils/ApiError');
const ApiResponse = require('../utils/ApiResponse');
const asyncHandler = require('../utils/asyncHandler');
const crypto = require('crypto');

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
        status: { $in: ['accepted', 'completed'] }
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
            if (!facultyProfile || !facultyProfile.assignedStudents.includes(studentId)) {
                throw new ApiError(403, "Not authorized to issue certificates for this internship");
            }
        }
    }

    // Generate unique Certificate ID
    const uniqueHash = crypto.randomBytes(4).toString('hex').toUpperCase();
    const certificateId = `CERT-${new Date().getFullYear()}-${uniqueHash}`;

    const certificate = await Certificate.create({
        student: studentId,
        internship: internshipId,
        issuedBy: req.user._id,
        certificateUrl,
        certificateId
    });

    res.status(201).json(new ApiResponse(201, certificate, "Certificate issued successfully"));
});

/**
 * @desc    Get student's own certificates
 * @route   GET /api/v1/certificates/me
 * @access  Private (Student only)
 */
const getMyCertificates = asyncHandler(async (req, res) => {
    const certificates = await Certificate.find({ student: req.user._id })
        .populate('internship', 'title company')
        .populate({
            path: 'internship',
            populate: { path: 'company', select: 'name logo' }
        })
        .sort('-issueDate');
    
    res.status(200).json(new ApiResponse(200, certificates, "Certificates fetched successfully"));
});

/**
 * @desc    Verify a certificate by its unique ID
 * @route   GET /api/v1/certificates/verify/:certificateId
 * @access  Public
 */
const verifyCertificate = asyncHandler(async (req, res) => {
    const { certificateId } = req.params;

    const certificate = await Certificate.findOne({ certificateId })
        .populate('student', '_id')
        .populate({
            path: 'internship',
            populate: { path: 'company', select: 'name' }
        });

    if (!certificate) {
        throw new ApiError(404, "Invalid Certificate ID");
    }

    // Fetch the student profile for their name instead of exposing the email
    const profile = await StudentProfile.findOne({ user: certificate.student._id }).select('fullName');

    const result = certificate.toObject();
    if (profile) {
        result.studentName = profile.fullName;
    }

    res.status(200).json(new ApiResponse(200, result, "Certificate verified successfully"));
});

module.exports = {
    issueCertificate,
    getMyCertificates,
    verifyCertificate
};
