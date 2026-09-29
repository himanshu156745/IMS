const Application = require('../models/Application.model');
const Internship = require('../models/Internship.model');
const ApiError = require('../utils/ApiError');
const ApiResponse = require('../utils/ApiResponse');
const asyncHandler = require('../utils/asyncHandler');

/**
 * @desc    Apply for an internship
 * @route   POST /api/v1/applications/:internshipId
 * @access  Private (student only)
 */
const applyForInternship = asyncHandler(async (req, res) => {
    const { resumeUrl, coverLetter } = req.body;
    const { internshipId } = req.params;

    const studentProfile = await require('../models/StudentProfile.model').findOne({ user: req.user._id });
    
    // Use profile resume if not provided, and validate it's a secure URL
    let finalResumeUrl = resumeUrl || studentProfile?.resumeUrl;
    
    if (!finalResumeUrl) {
        throw new ApiError(400, "Resume URL is required. Please upload in your profile.");
    }
    
    if (!finalResumeUrl.startsWith('https://')) {
        throw new ApiError(400, "Invalid resume URL. Must be a secure HTTPS link.");
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

    // Check if student already applied
    const existingApplication = await Application.findOne({
        internship: internshipId,
        student: req.user._id
    });

    if (existingApplication) {
        throw new ApiError(400, "You have already applied for this internship");
    }

    const application = await Application.create({
        internship: internshipId,
        student: req.user._id,
        resumeUrl: finalResumeUrl,
        coverLetter
    });

    res.status(201).json(new ApiResponse(201, application, "Successfully applied for internship"));
});

/**
 * @desc    Get all applications for a specific internship
 * @route   GET /api/v1/applications/internship/:internshipId
 * @access  Private (company only)
 */
const getInternshipApplications = asyncHandler(async (req, res) => {
    const { internshipId } = req.params;

    // First ensure the internship belongs to the requesting company
    const internship = await Internship.findById(internshipId).populate('company');
    
    if (!internship) {
        throw new ApiError(404, "Internship not found");
    }

    // Verify company ownership
    if (internship.company.user.toString() !== req.user._id.toString()) {
        throw new ApiError(403, "You do not have permission to view these applications");
    }

    const applications = await Application.find({ internship: internshipId })
        .populate('student', 'email')
        .sort('-createdAt');

    res.status(200).json(new ApiResponse(200, applications, "Applications fetched successfully"));
});

/**
 * @desc    Update application status
 * @route   PATCH /api/v1/applications/:id/status
 * @access  Private (company only)
 */
const updateApplicationStatus = asyncHandler(async (req, res) => {
    const { status } = req.body;
    const allowedStatuses = ['reviewed', 'accepted', 'rejected'];

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

    // Verify ownership
    if (application.internship.company.user.toString() !== req.user._id.toString()) {
        throw new ApiError(403, "Unauthorized to update this application");
    }

    // State machine: prevent moving out of accepted/rejected states
    if (['accepted', 'rejected'].includes(application.status) && status !== application.status) {
        throw new ApiError(400, `Application is already ${application.status} and cannot be changed to ${status}`);
    }

    // Check positions limit if accepting
    if (status === 'accepted' && application.status !== 'accepted') {
        const acceptedCount = await Application.countDocuments({ 
            internship: application.internship._id, 
            status: 'accepted' 
        });
        
        if (acceptedCount >= application.internship.positions) {
            throw new ApiError(400, "All positions for this internship are already filled");
        }
    }

    application.status = status;
    await application.save();

    res.status(200).json(new ApiResponse(200, application, `Application marked as ${status}`));
});

/**
 * @desc    Get student's own applications
 * @route   GET /api/v1/applications/me
 * @access  Private (student only)
 */
const getMyApplications = asyncHandler(async (req, res) => {
    const applications = await Application.find({ student: req.user._id })
        .populate({
            path: 'internship',
            populate: { path: 'company', select: 'name logo' }
        })
        .sort('-createdAt');

    res.status(200).json(new ApiResponse(200, applications, "Your applications fetched successfully"));
});

module.exports = {
    applyForInternship,
    getInternshipApplications,
    updateApplicationStatus,
    getMyApplications
};
