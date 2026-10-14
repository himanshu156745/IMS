const mongoose = require('mongoose');
const Application = require('../models/Application.model');
const Internship = require('../models/Internship.model');
const Company = require('../models/Company.model');
const StudentProfile = require('../models/StudentProfile.model');
const ApiError = require('../utils/ApiError');
const ApiResponse = require('../utils/ApiResponse');
const asyncHandler = require('../utils/asyncHandler');
const { APP_STATUS } = require('../constants/applicationStatus');

/**
 * @desc    Apply for an internship
 * @route   POST /api/v1/applications/:internshipId
 * @access  Private (student only)
 */
const applyForInternship = asyncHandler(async (req, res) => {
    const { resumeUrl, coverLetter } = req.body;
    const { internshipId } = req.params;

    const studentProfile = await StudentProfile.findOne({ user: req.user._id });

    let finalResumeUrl = resumeUrl || studentProfile?.resumeUrl;

    if (!finalResumeUrl) {
        throw new ApiError(400, "Resume URL is required. Please upload in your profile or provide a link.");
    }

    try {
        const parsed = new URL(finalResumeUrl);
        if (parsed.protocol !== 'https:' || (parsed.hostname !== 'res.cloudinary.com' && process.env.NODE_ENV !== 'test')) {
            throw new ApiError(400, "Resume URL must originate from the authorized Cloudinary storage bucket");
        }
    } catch (err) {
        if (err instanceof ApiError) throw err;
        throw new ApiError(400, "Invalid resume URL format");
    }

    const internship = await Internship.findById(internshipId);
    if (!internship) {
        throw new ApiError(404, "Internship not found");
    }

    if (internship.status !== 'open') {
        throw new ApiError(400, "This internship is no longer accepting applications");
    }

    if (internship.deadline && new Date(internship.deadline) < new Date()) {
        throw new ApiError(400, "The deadline for this internship has passed");
    }

    const existingApplication = await Application.findOne({
        internship: internshipId,
        student: req.user._id
    });

    if (existingApplication) {
        throw new ApiError(400, "You have already applied for this internship");
    }

    try {
        const application = await Application.create({
            internship: internshipId,
            student: req.user._id,
            resumeUrl: finalResumeUrl,
            coverLetter
        });
        res.status(201).json(new ApiResponse(201, application, "Successfully applied for internship"));
    } catch (err) {
        if (err.code === 11000) {
            throw new ApiError(400, "You have already applied for this internship");
        }
        throw err;
    }
});

/**
 * @desc    Get all applications for a specific internship
 * @route   GET /api/v1/applications/internship/:internshipId
 * @access  Private (company only)
 */
const getInternshipApplications = asyncHandler(async (req, res) => {
    const { internshipId } = req.params;

    const internship = await Internship.findById(internshipId).populate('company');

    if (!internship) {
        throw new ApiError(404, "Internship not found");
    }

    if (internship.company.user.toString() !== req.user._id.toString()) {
        throw new ApiError(403, "You do not have permission to view these applications");
    }

    const applications = await Application.find({ internship: internshipId, deletedAt: null })
        .populate('student', 'email')
        .sort('-createdAt');

    res.status(200).json(new ApiResponse(200, applications, "Applications fetched successfully"));
});

/**
 * @desc    Get all applications for the logged-in company across all their internships
 * @route   GET /api/v1/applications/company
 * @access  Private (company only)
 */
const getAllCompanyApplications = asyncHandler(async (req, res) => {
    const company = await Company.findOne({ user: req.user._id });
    if (!company) {
        return res.status(200).json(new ApiResponse(200, [], "Company profile not found"));
    }

    const internships = await Internship.find({ company: company._id }).select('_id title location duration stipend positions');
    const internshipIds = internships.map(i => i._id);

    const applications = await Application.find({ internship: { $in: internshipIds }, deletedAt: null })
        .populate('student', 'email')
        .populate('internship', 'title location duration stipend positions')
        .sort('-createdAt');

    const studentUserIds = applications.map(a => a.student?._id).filter(Boolean);
    const profiles = await StudentProfile.find({ user: { $in: studentUserIds } });
    const profileMap = new Map(profiles.map(p => [p.user.toString(), p]));

    const enriched = applications.map(app => {
        const obj = app.toObject();
        if (app.student && profileMap.has(app.student._id.toString())) {
            const p = profileMap.get(app.student._id.toString());
            obj.studentName = p.fullName;
            obj.studentPhone = p.phoneNumber;
            obj.studentCollege = p.university;
            obj.studentBranch = p.branch;
            obj.studentSkills = p.skills;
        }
        return obj;
    });

    res.status(200).json(new ApiResponse(200, enriched, "Company applications fetched successfully"));
});

/**
 * @desc    Update application status
 * @route   PATCH /api/v1/applications/:id/status
 * @access  Private (company, admin)
 */
const updateApplicationStatus = asyncHandler(async (req, res) => {
    const { status } = req.body;
    const allowedStatuses = ['reviewed', 'accepted', 'rejected', 'shortlisted'];

    if (!allowedStatuses.includes(status)) {
        throw new ApiError(400, "Invalid status update");
    }

    const application = await Application.findById(req.params.id).populate({
        path: 'internship',
        populate: { path: 'company' }
    });

    if (!application) {
        throw new ApiError(404, "Application not found");
    }

    if (req.user.role !== 'admin' && application.internship?.company?.user?.toString() !== req.user._id.toString()) {
        throw new ApiError(403, "Unauthorized to update this application");
    }

    if (['accepted', 'rejected'].includes(application.status) && status !== application.status) {
        throw new ApiError(400, `Application is already ${application.status} and cannot be changed to ${status}`);
    }

    if (status === 'accepted' && application.status !== 'accepted') {
        const session = await mongoose.startSession();
        try {
            try {
                await session.withTransaction(async () => {
                    const internship = await Internship.findOneAndUpdate(
                        {
                            _id: application.internship._id,
                            $expr: { $lt: [{ $ifNull: ["$acceptedCount", 0] }, "$positions"] }
                        },
                        { $inc: { acceptedCount: 1 } },
                        { new: true, session }
                    );

                    if (!internship) {
                        throw new ApiError(400, "All positions for this internship are already filled");
                    }

                    application.status = 'accepted';
                    await application.save({ session });
                });
            } catch (txError) {
                // Fallback for standalone single-node MongoDB without replica set
                if (txError.message && (txError.message.includes('replica set') || txError.message.includes('Transaction'))) {
                    const internship = await Internship.findOneAndUpdate(
                        {
                            _id: application.internship._id,
                            $expr: { $lt: [{ $ifNull: ["$acceptedCount", 0] }, "$positions"] }
                        },
                        { $inc: { acceptedCount: 1 } },
                        { new: true }
                    );

                    if (!internship) {
                        throw new ApiError(400, "All positions for this internship are already filled");
                    }

                    application.status = 'accepted';
                    await application.save();
                } else {
                    throw txError;
                }
            }
        } finally {
            await session.endSession();
        }
    } else {
        application.status = status;
        await application.save();
    }

    res.status(200).json(new ApiResponse(200, application, `Application marked as ${status}`));
});

/**
 * @desc    Delete or withdraw application
 * @route   DELETE /api/v1/applications/:id
 * @access  Private (company, admin, student)
 */
const deleteApplication = asyncHandler(async (req, res) => {
    const application = await Application.findById(req.params.id).populate({
        path: 'internship',
        populate: { path: 'company' }
    });

    if (!application) {
        throw new ApiError(404, "Application not found");
    }

    const isCompanyOwner = application.internship?.company?.user?.toString() === req.user._id.toString();
    const isStudentOwner = application.student.toString() === req.user._id.toString();
    const isAdmin = req.user.role === 'admin';

    if (isAdmin || isCompanyOwner) {
        // Authorized company or admin deletion
    } else if (isStudentOwner) {
        const withdrawableStatuses = ['pending', 'applied'];
        if (!withdrawableStatuses.includes(application.status)) {
            throw new ApiError(400, "Cannot withdraw an application that has already been reviewed or accepted");
        }
    } else {
        throw new ApiError(403, "Unauthorized to delete or withdraw this application");
    }

    if (application.status === 'accepted' && application.internship?._id) {
        await Internship.findByIdAndUpdate(application.internship._id, { $inc: { acceptedCount: -1 } });
    }

    application.deletedAt = new Date();
    await application.save();
    res.status(200).json(new ApiResponse(200, null, "Application deleted successfully"));
});

/**
 * @desc    Get student's own applications
 * @route   GET /api/v1/applications/me
 * @access  Private (student only)
 */
const getMyApplications = asyncHandler(async (req, res) => {
    const applications = await Application.find({ student: req.user._id, deletedAt: null })
        .populate({
            path: 'internship',
            populate: { path: 'company', select: 'name logo location' }
        })
        .sort('-createdAt');

    res.status(200).json(new ApiResponse(200, applications, "Your applications fetched successfully"));
});

module.exports = {
    applyForInternship,
    getInternshipApplications,
    getAllCompanyApplications,
    updateApplicationStatus,
    deleteApplication,
    getMyApplications
};