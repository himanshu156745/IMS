const Report = require('../models/Report.model');
const Internship = require('../models/Internship.model');
const Application = require('../models/Application.model');
const ApiError = require('../utils/ApiError');
const ApiResponse = require('../utils/ApiResponse');
const asyncHandler = require('../utils/asyncHandler');
const { APP_STATUS } = require('../constants/applicationStatus');
const { REPORT_STATUS_MAP } = require('../constants/reportStatus');

/**
 * @desc    Submit a daily report
 * @route   POST /api/v1/reports/:internshipId
 * @access  Private (student only)
 */
const submitReport = asyncHandler(async (req, res) => {
    const { taskDescription, hoursWorked, dateKey: clientDateKey } = req.body;
    const { internshipId } = req.params;

    // 1. Verify student is actually accepted into this internship
    const application = await Application.findOne({ 
        internship: internshipId, 
        student: req.user._id,
        status: APP_STATUS.ACCEPTED
    });

    if (!application) {
        throw new ApiError(403, "You can only submit reports for internships you are accepted in");
    }

    // 2. Prevent duplicate report for the same day
    const { generateDateKey } = require('../utils/dateUtils');
    const dateKey = generateDateKey(new Date());

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
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.min(100, Math.max(1, parseInt(req.query.limit) || 20));
    const skip = (page - 1) * limit;

    const { from, to } = req.query;
    let query = { student: req.user._id, internship: req.params.internshipId };
    
    if (from || to) {
        query.dateKey = {};
        if (from) {
            if (!/^\d{4}-\d{2}-\d{2}$/.test(from)) throw new ApiError(400, "Invalid 'from' date format (YYYY-MM-DD)");
            query.dateKey.$gte = from;
        }
        if (to) {
            if (!/^\d{4}-\d{2}-\d{2}$/.test(to)) throw new ApiError(400, "Invalid 'to' date format (YYYY-MM-DD)");
            query.dateKey.$lte = to;
        }
    }

    const [reports, total] = await Promise.all([
        Report.find(query).sort('-date')
            .skip(skip)
            .limit(limit),
        Report.countDocuments(query)
    ]);

    const meta = { page, limit, total, totalPages: Math.ceil(total / limit) };
    res.status(200).json(new ApiResponse(200, { data: reports, meta }, "Reports fetched successfully"));
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

    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.min(100, Math.max(1, parseInt(req.query.limit) || 20));
    const skip = (page - 1) * limit;

    const { from, to } = req.query;
    let query = { internship: req.params.internshipId };
    
    if (from || to) {
        query.dateKey = {};
        if (from) {
            if (!/^\d{4}-\d{2}-\d{2}$/.test(from)) throw new ApiError(400, "Invalid 'from' date format (YYYY-MM-DD)");
            query.dateKey.$gte = from;
        }
        if (to) {
            if (!/^\d{4}-\d{2}-\d{2}$/.test(to)) throw new ApiError(400, "Invalid 'to' date format (YYYY-MM-DD)");
            query.dateKey.$lte = to;
        }
    }

    const [reports, total] = await Promise.all([
        Report.find(query)
        .populate('student', 'email')
        .sort('-date')
            .skip(skip)
            .limit(limit),
        Report.countDocuments(query)
    ]);

    const meta = { page, limit, total, totalPages: Math.ceil(total / limit) };
    res.status(200).json(new ApiResponse(200, { data: reports, meta }, "Reports fetched successfully"));
});

/**
 * @desc    Evaluate a report
 * @route   PATCH /api/v1/reports/:id/evaluate
 * @access  Private (faculty only)
 */
const evaluateReport = asyncHandler(async (req, res) => {
    const { status, facultyFeedback } = req.body;
    
    if (![REPORT_STATUS_MAP.APPROVED, REPORT_STATUS_MAP.REJECTED].includes(status)) {
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
