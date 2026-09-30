const Interview = require('../models/Interview.model');
const Application = require('../models/Application.model');
const Company = require('../models/Company.model');
const ApiError = require('../utils/ApiError');
const ApiResponse = require('../utils/ApiResponse');
const asyncHandler = require('../utils/asyncHandler');
const { APP_STATUS } = require('../constants/applicationStatus');
const { sendSecurityNotification } = require('../services/notification.service');

/**
 * @desc    Schedule an interview for an application
 * @route   POST /api/v1/interviews
 * @access  Private (company only)
 */
const scheduleInterview = asyncHandler(async (req, res) => {
    const { applicationId, date, time, type, mode, link, location, notes } = req.body;

    const application = await Application.findById(applicationId).populate('internship');
    if (!application) {
        throw new ApiError(404, "Application not found");
    }

    const company = await Company.findOne({ user: req.user._id });
    if (!company) throw new ApiError(404, "Company profile not found");

    // Verify the company owns the internship
    if (application.internship.company.toString() !== company._id.toString()) {
        throw new ApiError(403, "You can only schedule interviews for your own internships");
    }

    const interview = await Interview.create({
        application: application._id,
        company: company._id,
        student: application.student,
        date: new Date(date),
        time,
        type: type || 'technical',
        mode,
        link,
        location,
        notes
    });

    // Update application status
    application.status = APP_STATUS.INTERVIEW_SCHEDULED || 'interview_scheduled';
    await application.save();

    // Notify the student
    await sendSecurityNotification(
        application.student,
        'Interview Scheduled',
        `An interview has been scheduled for ${date} at ${time}. Mode: ${mode}.`,
        'info'
    );

    res.status(201).json(new ApiResponse(201, interview, "Interview scheduled successfully"));
});

/**
 * @desc    Get interviews for the logged-in user (student sees their interviews, company sees interviews they scheduled)
 * @route   GET /api/v1/interviews/me
 * @access  Private
 */
const getMyInterviews = asyncHandler(async (req, res) => {
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.min(100, Math.max(1, parseInt(req.query.limit) || 20));
    const skip = (page - 1) * limit;

    let query;
    if (req.user.role === 'student') {
        query = { student: req.user._id };
    } else {
        const company = await Company.findOne({ user: req.user._id });
        query = { company: company ? company._id : null };
    }

    const [interviews, total] = await Promise.all([
        Interview.find(query)
            .populate('application', 'status')
            .populate('student', 'email')
            .sort('-date')
            .skip(skip)
            .limit(limit),
        Interview.countDocuments(query)
    ]);

    const meta = { page, limit, total, totalPages: Math.ceil(total / limit) };
    res.status(200).json(new ApiResponse(200, { data: interviews, meta }, "Interviews fetched successfully"));
});

/**
 * @desc    Update an interview
 * @route   PATCH /api/v1/interviews/:id
 * @access  Private (company only)
 */
const updateInterview = asyncHandler(async (req, res) => {
    const interview = await Interview.findById(req.params.id);
    if (!interview) {
        throw new ApiError(404, "Interview not found");
    }

    const company = await Company.findOne({ user: req.user._id });
    if (!company) throw new ApiError(404, "Company profile not found");

    if (interview.company.toString() !== company._id.toString()) {
        throw new ApiError(403, "You can only update your own interviews");
    }

    const allowedFields = ['date', 'time', 'type', 'mode', 'link', 'location', 'notes', 'status'];
    for (const key of Object.keys(req.body)) {
        if (allowedFields.includes(key)) {
            interview[key] = key === 'date' ? new Date(req.body[key]) : req.body[key];
        }
    }

    await interview.save();

    // Notify student of update
    await sendSecurityNotification(
        interview.student,
        'Interview Updated',
        `Your interview details have been updated. New date: ${interview.date.toISOString().split('T')[0]} at ${interview.time}.`,
        'info'
    );

    res.status(200).json(new ApiResponse(200, interview, "Interview updated successfully"));
});

/**
 * @desc    Cancel (delete) an interview
 * @route   DELETE /api/v1/interviews/:id
 * @access  Private (company only)
 */
const cancelInterview = asyncHandler(async (req, res) => {
    const interview = await Interview.findById(req.params.id);
    if (!interview) {
        throw new ApiError(404, "Interview not found");
    }

    const company = await Company.findOne({ user: req.user._id });
    if (!company) throw new ApiError(404, "Company profile not found");

    if (interview.company.toString() !== company._id.toString()) {
        throw new ApiError(403, "You can only cancel your own interviews");
    }

    // Notify student before deletion
    await sendSecurityNotification(
        interview.student,
        'Interview Cancelled',
        `Your interview scheduled for ${interview.date.toISOString().split('T')[0]} at ${interview.time} has been cancelled.`,
        'warning'
    );

    await Interview.findByIdAndDelete(req.params.id);

    res.status(200).json(new ApiResponse(200, null, "Interview cancelled successfully"));
});

module.exports = {
    scheduleInterview,
    getMyInterviews,
    updateInterview,
    cancelInterview
};
