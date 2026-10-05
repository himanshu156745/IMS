const FacultyProfile = require('../models/FacultyProfile.model');
const ApiError = require('../utils/ApiError');
const ApiResponse = require('../utils/ApiResponse');
const asyncHandler = require('../utils/asyncHandler');
const User = require('../models/User.model');

/**
 * @desc    Get current faculty profile
 * @route   GET /api/v1/faculty/me
 * @access  Private (faculty only)
 */
const getMyProfile = asyncHandler(async (req, res) => {
    let profile = await FacultyProfile.findOne({ user: req.user._id }).populate('assignedStudents', 'email');

    // Create an empty profile if not found
    if (!profile) {
        throw new ApiError(404, "Profile not found. Please create one.");
    }

    res.status(200).json(new ApiResponse(200, profile, "Profile fetched successfully"));
});

/**
 * @desc    Update faculty profile
 * @route   PATCH /api/v1/faculty/me
 * @access  Private (faculty only)
 */
const updateMyProfile = asyncHandler(async (req, res) => {
    const { fullName, department, designation, phoneNumber } = req.body;

    let profile = await FacultyProfile.findOne({ user: req.user._id });
    if (!profile) {
        throw new ApiError(404, "Profile not found");
    }

    if (fullName) profile.fullName = fullName;
    if (department) profile.department = department;
    if (designation) profile.designation = designation;
    if (phoneNumber) profile.phoneNumber = phoneNumber;

    if (req.file) {
        // Mocking upload for now
        profile.avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(profile.fullName)}`;
    }

    await profile.save();

    res.status(200).json(new ApiResponse(200, profile, "Profile updated successfully"));
});

const getDashboardStats = asyncHandler(async (req, res) => {
    const profile = await FacultyProfile.findOne({ user: req.user._id });
    const assignedStudents = profile?.assignedStudents || [];
    const totalStudents = assignedStudents.length;

    let activeInternships = 0;
    let pendingReports = 0;
    let avgAttendance = 0;

    if (totalStudents > 0) {
        const Application = require('../models/Application.model');
        const Report = require('../models/Report.model');
        const Attendance = require('../models/Attendance.model');

        activeInternships = await Application.countDocuments({
            student: { $in: assignedStudents },
            status: 'accepted'
        });

        pendingReports = await Report.countDocuments({
            student: { $in: assignedStudents },
            status: 'pending'
        });

        const totalAttendance = await Attendance.countDocuments({
            student: { $in: assignedStudents }
        });

        const presentAttendance = await Attendance.countDocuments({
            student: { $in: assignedStudents },
            status: 'present'
        });

        if (totalAttendance > 0) {
            avgAttendance = Math.round((presentAttendance / totalAttendance) * 100);
        }
    }

    res.status(200).json(new ApiResponse(200, {
        totalStudents,
        activeInternships,
        pendingReports,
        avgAttendance
    }, "Stats fetched"));
});

/**
 * @desc    Get assigned students
 * @route   GET /api/v1/faculty/students
 * @access  Private (faculty only)
 */
const getMyStudents = asyncHandler(async (req, res) => {
    const profile = await FacultyProfile.findOne({ user: req.user._id });

    if (!profile || !profile.assignedStudents || profile.assignedStudents.length === 0) {
        return res.status(200).json(new ApiResponse(200, [], "Students fetched successfully"));
    }

    const StudentProfile = require('../models/StudentProfile.model');
    const students = await StudentProfile.find({
        user: { $in: profile.assignedStudents }
    }).populate('user', 'email');

    res.status(200).json(new ApiResponse(200, students, "Students fetched successfully"));
});

module.exports = {
    getMyProfile,
    updateMyProfile,
    getDashboardStats,
    getMyStudents
};
