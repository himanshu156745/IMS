const Report = require('../models/Report.model');
const Internship = require('../models/Internship.model');
const Application = require('../models/Application.model');
const ApiError = require('../utils/ApiError');
const ApiResponse = require('../utils/ApiResponse');
const asyncHandler = require('../utils/asyncHandler');

/**
 * @desc    Submit a daily report
 * @route   POST /api/v1/reports/:internshipId
 * @access  Private (student only)
 */
const submitReport = asyncHandler(async (req, res) => {
    const { taskDescription, hoursWorked } = req.body;
    const { internshipId } = req.params;

    // 1. Verify student is actually accepted into this internship
    const application = await Application.findOne({ 
        internship: internshipId, 
        student: req.user._id,
        status: 'accepted'
    });

    if (!application) {
        throw new ApiError(403, "You can only submit reports for internships you are accepted in");
    }

    // 2. Prevent duplicate report for the same day
    const dateStr = new Date().toLocaleDateString('en-CA'); // 'en-CA' gives YYYY-MM-DD
    const dateKey = dateStr;

    const existingReport = await Report.findOne({
        student: req.user._id,
        internship: internshipId,
        dateKey: dateKey
    });

    if (existingReport) {
        throw new ApiError(400, "You have already submitted a report for today");
    }

    const report = await Report.create({
        student: req.user._id,
        internship: internshipId,
        dateKey,
        taskDescription,
        hoursWorked
    });

    res.status(201).json(new ApiResponse(201, report, "Daily report submitted successfully"));
});

/**
 * @desc    Get student's own reports
 * @route   GET /api/v1/reports/me/:internshipId
 * @access  Private (student only)
 */
const getMyReports = asyncHandler(async (req, res) => {
    const reports = await Report.find({ 
        student: req.user._id, 
        internship: req.params.internshipId 
    }).sort('-date');
    
    res.status(200).json(new ApiResponse(200, reports, "Reports fetched successfully"));
});

/**
 * @desc    Get all reports for an internship to evaluate
 * @route   GET /api/v1/reports/internship/:internshipId
 * @access  Private (faculty/admin)
 */
const getInternshipReportsForEvaluation = asyncHandler(async (req, res) => {
    const internship = await Internship.findById(req.params.internshipId);
    if (!internship) throw new ApiError(404, "Internship not found");
    
    if (req.user.role === 'faculty' && internship.mentor?.toString() !== req.user._id.toString()) {
        throw new ApiError(403, "You can only view reports for internships you mentor");
    }

    const reports = await Report.find({ internship: req.params.internshipId })
        .populate('student', 'email')
        .sort('-date');
        
    res.status(200).json(new ApiResponse(200, reports, "Reports fetched successfully"));
});

/**
 * @desc    Evaluate a report
 * @route   PATCH /api/v1/reports/:id/evaluate
 * @access  Private (faculty only)
 */
const evaluateReport = asyncHandler(async (req, res) => {
    const { status, facultyFeedback } = req.body;
    
    if (!['approved', 'rejected'].includes(status)) {
        throw new ApiError(400, "Invalid status. Must be approved or rejected");
    }

    const report = await Report.findById(req.params.id).populate('internship');
    if (!report) throw new ApiError(404, "Report not found");
    
    if (req.user.role === 'faculty' && report.internship.mentor?.toString() !== req.user._id.toString()) {
        throw new ApiError(403, "You can only evaluate reports for internships you mentor");
    }

    report.status = status;
    report.facultyFeedback = facultyFeedback;
    await report.save();

    if (!report) throw new ApiError(404, "Report not found");

    res.status(200).json(new ApiResponse(200, report, "Report evaluated successfully"));
});

module.exports = {
    submitReport,
    getMyReports,
    getInternshipReportsForEvaluation,
    evaluateReport
};
