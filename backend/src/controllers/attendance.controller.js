const Attendance = require('../models/Attendance.model');
const Application = require('../models/Application.model');
const ApiError = require('../utils/ApiError');
const ApiResponse = require('../utils/ApiResponse');
const asyncHandler = require('../utils/asyncHandler');
const { generateDateKey } = require('../utils/dateUtils');
const { APP_STATUS } = require('../constants/applicationStatus');
const { ATTENDANCE_STATUS } = require('../constants/attendanceStatus');
const Internship = require('../models/Internship.model');
const Company = require('../models/Company.model');
const { logAuditEvent } = require('../services/audit.service');

/**
 * @desc    Mark daily attendance
 * @route   POST /api/v1/attendance/:internshipId
 * @access  Private (student only)
 */
const markAttendance = asyncHandler(async (req, res) => {
    const { status, remarks, dateKey: clientDateKey } = req.body;
    const { internshipId } = req.params;

    if (!Object.values(ATTENDANCE_STATUS).includes(status)) {
        throw new ApiError(400, "Invalid attendance status");
    }

    const application = await Application.findOne({ 
        internship: internshipId, 
        student: req.user._id,
        status: APP_STATUS.ACCEPTED
    });

    if (!application) {
        throw new ApiError(403, "You can only mark attendance for internships you are accepted in");
    }

    const dateKey = generateDateKey(new Date());

    const existingAttendance = await Attendance.findOne({
        student: req.user._id,
        internship: internshipId,
        dateKey: dateKey
    });

    if (existingAttendance) {
        throw new ApiError(400, "Attendance already marked for today");
    }

    const attendance = await Attendance.create({
        student: req.user._id,
        internship: internshipId,
        dateKey,
        status,
        remarks
    });

    res.status(201).json(new ApiResponse(201, attendance, "Attendance marked successfully"));
});

/**
 * @desc    Get student's own attendance records
 * @route   GET /api/v1/attendance/me/:internshipId
 * @access  Private (student only)
 */
const getMyAttendance = asyncHandler(async (req, res) => {
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.min(100, Math.max(1, parseInt(req.query.limit) || 20));
    const skip = (page - 1) * limit;

    const [records, total] = await Promise.all([
        Attendance.find({ 
        student: req.user._id, 
        internship: req.params.internshipId 
    }).sort('-date')
            .skip(skip)
            .limit(limit),
        Attendance.countDocuments({ 
        student: req.user._id, 
        internship: req.params.internshipId 
    })
    ]);

    const meta = { page, limit, total, totalPages: Math.ceil(total / limit) };
    res.status(200).json(new ApiResponse(200, { data: records, meta }, "Attendance fetched successfully"));
});

/**
 * @desc    Get attendance of all students for an internship
 * @route   GET /api/v1/attendance/internship/:internshipId
 * @access  Private (faculty/admin)
 */
const getInternshipAttendance = asyncHandler(async (req, res) => {
    const internship = await Internship.findById(req.params.internshipId);
    if (!internship) throw new ApiError(404, "Internship not found");
    
    if (req.user.role === 'company') {
        const company = await Company.findOne({ user: req.user._id });
        if (!company || internship.company.toString() !== company._id.toString()) {
            throw new ApiError(403, "You can only view attendance for your own company's internships");
        }
    } else if (req.user.role === 'faculty') {
        if (internship.mentor?.toString() !== req.user._id.toString()) {
            throw new ApiError(403, "You can only view attendance for internships you mentor");
        }
    }

    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.min(100, Math.max(1, parseInt(req.query.limit) || 20));
    const skip = (page - 1) * limit;

    const [records, total] = await Promise.all([
        Attendance.find({ internship: req.params.internshipId })
        .populate('student', 'email')
        .sort('-date')
            .skip(skip)
            .limit(limit),
        Attendance.countDocuments({ internship: req.params.internshipId })
    ]);

    const meta = { page, limit, total, totalPages: Math.ceil(total / limit) };
    res.status(200).json(new ApiResponse(200, { data: records, meta }, "Attendance records fetched successfully"));
});


/**
 * @desc    Update student's own attendance for today
 * @route   PATCH /api/v1/attendance/:id
 * @access  Private (student only)
 */
const updateMyAttendance = asyncHandler(async (req, res) => {
    const { status, remarks } = req.body;
    
    if (status && !Object.values(ATTENDANCE_STATUS).includes(status)) {
        throw new ApiError(400, "Invalid attendance status");
    }

    const attendance = await Attendance.findOne({ _id: req.params.id, student: req.user._id });
    if (!attendance) {
        throw new ApiError(404, "Attendance record not found");
    }

    const todayDateKey = generateDateKey(new Date());

    if (attendance.dateKey !== todayDateKey) {
        throw new ApiError(403, "You can only update today's attendance");
    }

    if (status) attendance.status = status;
    if (remarks !== undefined) attendance.remarks = remarks;

    await attendance.save();

    await logAuditEvent({ 
        event: 'ATTENDANCE_OVERRIDE', 
        userId: req.user._id, 
        req, 
        metadata: { action: 'updateMyAttendance', attendanceId: attendance._id, status, remarks } 
    });

    res.status(200).json(new ApiResponse(200, attendance, "Attendance updated successfully"));
});

/**
 * @desc    Override attendance
 * @route   PATCH /api/v1/attendance/:internshipId/override
 * @access  Private (faculty/admin)
 */
const overrideAttendance = asyncHandler(async (req, res) => {
    const { status, remarks, studentId, dateKey } = req.body;
    const { internshipId } = req.params;
    
    const internship = await Internship.findById(internshipId);
    if (!internship) throw new ApiError(404, "Internship not found");

    if (req.user.role === 'company') {
        const company = await Company.findOne({ user: req.user._id });
        if (!company || internship.company.toString() !== company._id.toString()) {
            throw new ApiError(403, "You can only override attendance for your own company's internships");
        }
    } else if (req.user.role === 'faculty') {
        if (internship.mentor?.toString() !== req.user._id.toString()) {
            throw new ApiError(403, "You can only override attendance for internships you mentor");
        }
    }
    
    if (status && !Object.values(ATTENDANCE_STATUS).includes(status)) {
        throw new ApiError(400, "Invalid attendance status");
    }

    if (!studentId || !dateKey) {
        throw new ApiError(400, "studentId and dateKey are required for override");
    }

    let attendance = await Attendance.findOne({
        internship: internshipId,
        student: studentId,
        dateKey
    });

    if (!attendance) {
        // If it doesn't exist, create it via override
        if (!status) {
            throw new ApiError(400, "status is required to create a new attendance record");
        }
        attendance = await Attendance.create({
            internship: internshipId,
            student: studentId,
            dateKey,
            status,
            remarks
        });
    } else {
        if (status) attendance.status = status;
        if (remarks !== undefined) attendance.remarks = remarks;
        await attendance.save();
    }

    await logAuditEvent({ 
        event: 'ATTENDANCE_OVERRIDE', 
        userId: req.user._id, 
        req, 
        metadata: { action: 'overrideAttendance', internshipId, studentId, dateKey, status, remarks } 
    });

    res.status(200).json(new ApiResponse(200, attendance, "Attendance overridden successfully"));
});

module.exports = {
    updateMyAttendance,
    overrideAttendance,
    markAttendance,
    getMyAttendance,
    getInternshipAttendance
};
