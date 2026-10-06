const Attendance = require('../models/Attendance.model');
const Application = require('../models/Application.model');
const ApiError = require('../utils/ApiError');
const ApiResponse = require('../utils/ApiResponse');
const asyncHandler = require('../utils/asyncHandler');

/**
 * @desc    Mark daily attendance
 * @route   POST /api/v1/attendance/:internshipId
 * @access  Private (student only)
 */
const markAttendance = asyncHandler(async (req, res) => {
    const { status, remarks } = req.body;
    const { internshipId } = req.params;

    if (!['present', 'absent', 'leave'].includes(status)) {
        throw new ApiError(400, "Invalid attendance status");
    }

    const application = await Application.findOne({ 
        internship: internshipId, 
        student: req.user._id,
        status: 'accepted'
    });

    if (!application) {
        throw new ApiError(403, "You can only mark attendance for internships you are accepted in");
    }

    // Format as YYYY-MM-DD (IST roughly)
    const dateStr = new Date().toLocaleDateString('en-CA'); // 'en-CA' gives YYYY-MM-DD
    const dateKey = dateStr;

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
    const records = await Attendance.find({ 
        student: req.user._id, 
        internship: req.params.internshipId 
    }).sort('-date');
    
    res.status(200).json(new ApiResponse(200, records, "Attendance fetched successfully"));
});

/**
 * @desc    Get attendance of all students for an internship
 * @route   GET /api/v1/attendance/internship/:internshipId
 * @access  Private (faculty/admin)
 */
const getInternshipAttendance = asyncHandler(async (req, res) => {
    const internship = await require('../models/Internship.model').findById(req.params.internshipId);
    if (!internship) throw new ApiError(404, "Internship not found");
    
    if (req.user.role === 'company') {
        const company = await require('../models/Company.model').findOne({ user: req.user._id });
        if (!company || internship.company.toString() !== company._id.toString()) {
            throw new ApiError(403, "You can only view attendance for your own company's internships");
        }
    } else if (req.user.role === 'faculty') {
        if (internship.mentor?.toString() !== req.user._id.toString()) {
            throw new ApiError(403, "You can only view attendance for internships you mentor");
        }
    }

    const records = await Attendance.find({ internship: req.params.internshipId })
        .populate('student', 'email')
        .sort('-date');
        
    res.status(200).json(new ApiResponse(200, records, "Attendance records fetched successfully"));
});

module.exports = {
    markAttendance,
    getMyAttendance,
    getInternshipAttendance
};
