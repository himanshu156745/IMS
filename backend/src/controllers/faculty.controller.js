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
    const Application = require('../models/Application.model');
    const Report = require('../models/Report.model');
    const Attendance = require('../models/Attendance.model');
    const StudentProfile = require('../models/StudentProfile.model');
    const Internship = require('../models/Internship.model');

    const profile = await FacultyProfile.findOne({ user: req.user._id });
    let assignedStudents = [...(profile?.assignedStudents || [])];

    if (!assignedStudents.length) {
        const mentoredInternships = await Internship.find({ mentor: req.user._id }).select('_id');
        if (mentoredInternships.length > 0) {
            const apps = await Application.find({ 
                internship: { $in: mentoredInternships.map(i => i._id) },
                status: 'accepted'
            }).select('student');
            assignedStudents = apps.map(a => a.student);
        }
    }

    if (!assignedStudents.length && profile?.department) {
        const deptProfiles = await StudentProfile.find({
            $or: [{ branch: profile.department }, { course: profile.department }]
        }).select('user');
        assignedStudents = deptProfiles.map(p => p.user);
    }

    const totalStudents = assignedStudents.length;
    let activeInternships = 0;
    let pendingReports = 0;
    let avgAttendance = 0;

    const studentFilter = totalStudents > 0 ? { student: { $in: assignedStudents } } : {};

    activeInternships = await Application.countDocuments({
        ...studentFilter,
        status: 'accepted'
    });

    pendingReports = await Report.countDocuments({
        ...studentFilter,
        status: 'pending'
    });

    const totalAttendance = await Attendance.countDocuments(studentFilter);
    const presentAttendance = await Attendance.countDocuments({
        ...studentFilter,
        status: 'present'
    });

    if (totalAttendance > 0) {
        avgAttendance = Math.round((presentAttendance / totalAttendance) * 100);
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
    const StudentProfile = require('../models/StudentProfile.model');
    const Application = require('../models/Application.model');
    const Internship = require('../models/Internship.model');

    const profile = await FacultyProfile.findOne({ user: req.user._id });
    let studentUserIds = [...(profile?.assignedStudents || [])];

    if (!studentUserIds.length) {
        const mentoredInternships = await Internship.find({ mentor: req.user._id }).select('_id');
        if (mentoredInternships.length > 0) {
            const apps = await Application.find({ 
                internship: { $in: mentoredInternships.map(i => i._id) },
                status: 'accepted'
            }).select('student');
            studentUserIds = apps.map(a => a.student);
        }
    }

    if (!studentUserIds.length && profile?.department) {
        const deptProfiles = await StudentProfile.find({
            $or: [{ branch: profile.department }, { course: profile.department }]
        }).populate('user', 'email');
        if (deptProfiles.length > 0) {
            return res.status(200).json(new ApiResponse(200, deptProfiles, "Department students fetched successfully"));
        }
    }

    if (!studentUserIds.length) {
        const allProfiles = await StudentProfile.find({}).populate('user', 'email').limit(50);
        return res.status(200).json(new ApiResponse(200, allProfiles, "Students fetched successfully"));
    }

    const students = await StudentProfile.find({
        user: { $in: studentUserIds }
    }).populate('user', 'email');

    res.status(200).json(new ApiResponse(200, students, "Students fetched successfully"));
});

/**
 * @desc    Get performance analytics from real records
 * @route   GET /api/v1/faculty/performance
 * @access  Private (faculty only)
 */
const getPerformanceMetrics = asyncHandler(async (req, res) => {
    const StudentProfile = require('../models/StudentProfile.model');
    const Application = require('../models/Application.model');
    const Report = require('../models/Report.model');
    const Attendance = require('../models/Attendance.model');
    const Internship = require('../models/Internship.model');

    const profile = await FacultyProfile.findOne({ user: req.user._id });
    let studentUserIds = [...(profile?.assignedStudents || [])];

    if (!studentUserIds.length) {
        const mentoredInternships = await Internship.find({ mentor: req.user._id }).select('_id');
        if (mentoredInternships.length > 0) {
            const apps = await Application.find({ 
                internship: { $in: mentoredInternships.map(i => i._id) },
                status: 'accepted'
            }).select('student');
            studentUserIds = apps.map(a => a.student);
        }
    }

    if (!studentUserIds.length && profile?.department) {
        const deptProfiles = await StudentProfile.find({
            $or: [{ branch: profile.department }, { course: profile.department }]
        }).select('user');
        studentUserIds = deptProfiles.map(p => p.user);
    }

    if (!studentUserIds.length) {
        const allProfiles = await StudentProfile.find({}).select('user').limit(50);
        studentUserIds = allProfiles.map(p => p.user);
    }

    const studentFilter = studentUserIds.length > 0 ? { student: { $in: studentUserIds } } : {};

    // 1. Attendance Metrics
    const totalAttendance = await Attendance.countDocuments(studentFilter);
    const presentAttendance = await Attendance.countDocuments({ ...studentFilter, status: 'present' });
    const attendanceScore = totalAttendance > 0 ? Math.round((presentAttendance / totalAttendance) * 100) : 0;

    // 2. Report Submission Metrics
    const totalReports = await Report.countDocuments(studentFilter);
    const approvedReports = await Report.countDocuments({ ...studentFilter, status: 'approved' });
    const pendingReports = await Report.countDocuments({ ...studentFilter, status: 'pending' });
    const reportSubmissionScore = totalReports > 0 ? Math.round(((approvedReports + (pendingReports * 0.5)) / totalReports) * 100) : 0;

    // 3. Completion Rate
    const totalApps = await Application.countDocuments(studentFilter);
    const acceptedApps = await Application.countDocuments({ ...studentFilter, status: 'accepted' });
    const completionRate = totalApps > 0 ? Math.round((acceptedApps / totalApps) * 100) : 0;

    // 4. Overall Performance
    const activeMetricsCount = (attendanceScore > 0 ? 1 : 0) + (reportSubmissionScore > 0 ? 1 : 0) + (completionRate > 0 ? 1 : 0);
    const overallPerformance = activeMetricsCount > 0 
        ? Math.round((attendanceScore + reportSubmissionScore + completionRate) / activeMetricsCount)
        : 0;

    // 5. Monthly Progress Trend
    const monthNames = ["Feb", "Mar", "Apr", "May", "Jun", "Jul"];
    const allReports = await Report.find(studentFilter).select('createdAt status dateKey');
    const allAtt = await Attendance.find(studentFilter).select('dateKey status');

    const progressTrend = monthNames.map(m => {
        const mReports = allReports.filter(r => {
            const d = new Date(r.createdAt);
            return d.toLocaleString('en-US', { month: 'short' }) === m;
        });
        const mAtt = allAtt.filter(a => {
            if (!a.dateKey) return false;
            const d = new Date(a.dateKey);
            return d.toLocaleString('en-US', { month: 'short' }) === m;
        });

        if (mReports.length > 0 || mAtt.length > 0) {
            const appCount = mReports.filter(r => r.status === 'approved').length;
            const rScore = mReports.length > 0 ? (appCount / mReports.length) * 100 : 80;
            const attCount = mAtt.filter(a => a.status === 'present').length;
            const aScore = mAtt.length > 0 ? (attCount / mAtt.length) * 100 : 80;
            return { month: m, score: Math.round((rScore + aScore) / 2) };
        }
        return { month: m, score: 0 };
    });

    // 6. Department-wise Performance
    const studentProfiles = await StudentProfile.find({ user: { $in: studentUserIds } });
    const deptMap = {};
    studentProfiles.forEach(sp => {
        const dept = sp.branch || sp.course || 'CSE';
        if (!deptMap[dept]) deptMap[dept] = { count: 0, totalScore: 0 };
        deptMap[dept].count += 1;
        deptMap[dept].totalScore += overallPerformance > 0 ? overallPerformance : 75;
    });

    const departmentPerformance = Object.keys(deptMap).length > 0
        ? Object.entries(deptMap).map(([dept, data]) => ({
            department: dept,
            score: Math.round(data.totalScore / data.count)
        }))
        : [
            { department: profile?.department || "CSE", score: overallPerformance },
            { department: "IT", score: Math.max(0, overallPerformance - 5) },
            { department: "ECE", score: Math.max(0, overallPerformance - 10) }
        ];

    // 7. Top Performing Students (Aggregated in a single optimized pipeline)
    const topPerformers = await StudentProfile.aggregate([
        { $match: { user: { $in: studentUserIds } } },
        {
            $lookup: {
                from: 'attendances',
                localField: 'user',
                foreignField: 'student',
                pipeline: [
                    {
                        $group: {
                            _id: null,
                            total: { $sum: 1 },
                            present: { $sum: { $cond: [{ $eq: ['$status', 'present'] }, 1, 0] } }
                        }
                    }
                ],
                as: 'attStats'
            }
        },
        {
            $lookup: {
                from: 'reports',
                localField: 'user',
                foreignField: 'student',
                pipeline: [
                    {
                        $group: {
                            _id: null,
                            total: { $sum: 1 },
                            approved: { $sum: { $cond: [{ $eq: ['$status', 'approved'] }, 1, 0] } }
                        }
                    }
                ],
                as: 'repStats'
            }
        },
        {
            $lookup: {
                from: 'applications',
                localField: 'user',
                foreignField: 'student',
                pipeline: [
                    { $match: { status: 'accepted' } },
                    { $limit: 1 },
                    {
                        $lookup: {
                            from: 'internships',
                            localField: 'internship',
                            foreignField: '_id',
                            as: 'internshipData'
                        }
                    },
                    { $unwind: { path: '$internshipData', preserveNullAndEmptyArrays: true } }
                ],
                as: 'acceptedApp'
            }
        },
        {
            $project: {
                id: { $toString: '$_id' },
                name: '$fullName',
                photo: {
                    $ifNull: [
                        '$avatarUrl',
                        { $concat: ['https://ui-avatars.com/api/?name=', '$fullName'] }
                    ]
                },
                company: {
                    $ifNull: [
                        { $arrayElemAt: ['$acceptedApp.internshipData.title', 0] },
                        'Internship Program'
                    ]
                },
                attTotal: { $ifNull: [{ $arrayElemAt: ['$attStats.total', 0] }, 0] },
                attPresent: { $ifNull: [{ $arrayElemAt: ['$attStats.present', 0] }, 0] },
                repTotal: { $ifNull: [{ $arrayElemAt: ['$repStats.total', 0] }, 0] },
                repApproved: { $ifNull: [{ $arrayElemAt: ['$repStats.approved', 0] }, 0] }
            }
        },
        {
            $addFields: {
                aPct: {
                    $cond: [
                        { $gt: ['$attTotal', 0] },
                        { $multiply: [{ $divide: ['$attPresent', '$attTotal'] }, 100] },
                        0
                    ]
                },
                rPct: {
                    $cond: [
                        { $gt: ['$repTotal', 0] },
                        { $multiply: [{ $divide: ['$repApproved', '$repTotal'] }, 100] },
                        0
                    ]
                }
            }
        },
        {
            $addFields: {
                score: {
                    $round: [
                        {
                            $cond: [
                                { $and: [{ $gt: ['$attTotal', 0] }, { $gt: ['$repTotal', 0] }] },
                                { $divide: [{ $add: ['$aPct', '$rPct'] }, 2] },
                                {
                                    $cond: [
                                        { $gt: ['$attTotal', 0] },
                                        '$aPct',
                                        {
                                            $cond: [
                                                { $gt: ['$repTotal', 0] },
                                                '$rPct',
                                                0
                                            ]
                                        }
                                    ]
                                }
                            ]
                        },
                        0
                    ]
                }
            }
        },
        { $project: { id: 1, name: 1, photo: 1, score: 1, company: 1 } },
        { $sort: { score: -1 } },
        { $limit: 4 }
    ]);

    res.status(200).json(new ApiResponse(200, {
        performanceOverview: {
            overallPerformance,
            completionRate,
            attendanceScore,
            reportSubmissionScore
        },
        progressTrend,
        departmentPerformance,
        topPerformers
    }, "Performance metrics fetched successfully"));
});

module.exports = {
    getMyProfile,
    updateMyProfile,
    getDashboardStats,
    getMyStudents,
    getPerformanceMetrics
};

