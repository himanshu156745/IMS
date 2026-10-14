const User = require('../models/User.model');
const Internship = require('../models/Internship.model');
const Application = require('../models/Application.model');
const Company = require('../models/Company.model');
const StudentProfile = require('../models/StudentProfile.model');
const inviteService = require('../services/invite.service');
const ApiError = require('../utils/ApiError');
const ApiResponse = require('../utils/ApiResponse');
const asyncHandler = require('../utils/asyncHandler');
const { logAuditEvent } = require('../services/audit.service');
const { COMPANY_VERIFICATION, COMPANY_VERIFICATION_MAP } = require('../constants/companyVerification');
const { USER_ROLES_ARRAY } = require('../constants/roles');

const Certificate = require('../models/Certificate.model');

/**
 * @desc    Get dashboard statistics
 * @route   GET /api/v1/admin/stats
 * @access  Private (admin only)
 */
const getDashboardStats = asyncHandler(async (req, res) => {
    const [
        totalUsers,
        totalInternships,
        activeInternships,
        completedInternships,
        totalApplications,
        pendingApplications,
        acceptedApplications,
        totalCompanies,
        totalStudents,
        totalFaculty,
        certificatesIssued,
        deptAgg
    ] = await Promise.all([
        User.countDocuments({ deletedAt: null }),
        Internship.countDocuments({ deletedAt: null }),
        Internship.countDocuments({ status: 'open', deletedAt: null }),
        Internship.countDocuments({ status: { $in: ['closed', 'completed'] }, deletedAt: null }),
        Application.countDocuments({ deletedAt: null }),
        Application.countDocuments({ status: { $in: ['pending', 'applied', 'reviewed'] }, deletedAt: null }),
        Application.countDocuments({ status: 'accepted', deletedAt: null }),
        Company.countDocuments(),
        User.countDocuments({ role: 'student', deletedAt: null }),
        User.countDocuments({ role: 'faculty', deletedAt: null }),
        Certificate.countDocuments().catch(() => 0),
        StudentProfile.aggregate([
            { $match: { branch: { $exists: true, $ne: "" } } },
            { $group: { _id: "$branch", count: { $sum: 1 } } },
            { $sort: { count: -1 } },
            { $limit: 6 }
        ]).catch(() => [])
    ]);

    const placementRate = totalStudents > 0 
        ? Number(((acceptedApplications / totalStudents) * 100).toFixed(1)) 
        : 0;

    const colors = ["#2F6F5E", "#C98A2C", "#B3492F", "#5B6472", "#8C7A9B", "#4B7BA6"];
    const departmentDistribution = (deptAgg || []).map((d, idx) => ({
        name: d._id || "Other",
        value: d.count,
        color: colors[idx % colors.length]
    }));

    res.status(200).json(new ApiResponse(200, {
        totalUsers,
        totalInternships,
        activeInternships,
        completedInternships,
        pendingInternships: Math.max(0, totalInternships - activeInternships - completedInternships),
        totalApplications,
        pendingApplications,
        acceptedApplications,
        totalCompanies,
        totalStudents,
        totalFaculty,
        certificatesIssued: certificatesIssued || 0,
        placementRate,
        departmentDistribution
    }, "Stats fetched successfully"));
});

/**
 * @desc    Get all users with filtering
 * @route   GET /api/v1/admin/users
 * @access  Private (admin only)
 */
const getAllUsers = asyncHandler(async (req, res) => {
    const { role } = req.query;
    let query = { deletedAt: null };
    
    // Sanitize role to prevent NoSQL query injection
    if (role && typeof role === 'string' && USER_ROLES_ARRAY.includes(role)) {
        query.role = role;
    }

    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.min(100, Math.max(1, parseInt(req.query.limit) || 20));
    const skip = (page - 1) * limit;

    const [users, total] = await Promise.all([
        User.find(query).select('-password')
            .skip(skip)
            .limit(limit)
            .sort('-createdAt'),
        User.countDocuments(query)
    ]);

    const userIds = users.map(u => u._id);
    const FacultyProfile = require('../models/FacultyProfile.model');
    const [studentProfiles, facultyProfiles] = await Promise.all([
        StudentProfile.find({ user: { $in: userIds } }),
        FacultyProfile.find({ user: { $in: userIds } })
    ]);

    const studentMap = new Map(studentProfiles.map(p => [p.user.toString(), p]));
    const facultyMap = new Map(facultyProfiles.map(p => [p.user.toString(), p]));

    const enriched = users.map(user => {
        const obj = user.toObject();
        if (studentMap.has(user._id.toString())) {
            const p = studentMap.get(user._id.toString());
            obj.studentProfile = p;
            obj.profile = p;
        } else if (facultyMap.has(user._id.toString())) {
            const p = facultyMap.get(user._id.toString());
            obj.facultyProfile = p;
            obj.profile = p;
        }
        return obj;
    });

    const meta = { page, limit, total, totalPages: Math.ceil(total / limit) };
    res.status(200).json(new ApiResponse(200, { data: enriched, meta }, "Users fetched"));
});

/**
 * @desc    Get all applications across system with filtering
 * @route   GET /api/v1/admin/applications
 * @access  Private (admin only)
 */
const getAllApplications = asyncHandler(async (req, res) => {
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.min(100, Math.max(1, parseInt(req.query.limit) || 50));
    const skip = (page - 1) * limit;

    const { status, priority } = req.query;
    let query = { deletedAt: null };

    // Sanitize query params against NoSQL operator injection
    if (status && typeof status === 'string') {
        const allowedStatuses = ['pending', 'reviewed', 'accepted', 'rejected', 'shortlisted', 'applied'];
        if (allowedStatuses.includes(status.toLowerCase())) {
            query.status = status.toLowerCase() === 'applied' ? 'pending' : status.toLowerCase();
        }
    }

    const [applications, total] = await Promise.all([
        Application.find(query)
            .populate({
                path: 'student',
                match: { deletedAt: null },
                select: 'email deletedAt'
            })
            .populate({
                path: 'internship',
                select: 'title company location stipend duration requirements positions',
                populate: { path: 'company', select: 'name logo location' }
            })
            .skip(skip)
            .limit(limit)
            .sort('-createdAt'),
        Application.countDocuments(query)
    ]);

    // Enrich with student profiles
    const studentUserIds = applications.map(a => a.student?._id).filter(Boolean);
    const profiles = await StudentProfile.find({ user: { $in: studentUserIds } });
    const profileMap = new Map(profiles.map(p => [p.user.toString(), p]));

    const enriched = applications.map(app => {
        const obj = app.toObject();
        if (app.student && profileMap.has(app.student._id.toString())) {
            const p = profileMap.get(app.student._id.toString());
            obj.studentProfile = {
                _id: p._id,
                fullName: p.fullName,
                phoneNumber: p.phoneNumber,
                university: p.university,
                course: p.course,
                branch: p.branch,
                skills: p.skills,
                avatarUrl: p.avatarUrl,
                cgpa: p.cgpa,
                semester: p.semester,
                github: p.github,
                linkedin: p.linkedin,
                portfolio: p.portfolio
            };
            obj.studentName = p.fullName;
            obj.studentPhone = p.phoneNumber;
            obj.studentCollege = p.university;
            obj.studentBranch = p.branch;
            obj.studentSkills = p.skills;
        } else {
            obj.studentProfile = null;
        }
        return obj;
    });

    const meta = { page, limit, total, totalPages: Math.ceil(total / limit) };
    res.status(200).json(new ApiResponse(200, { data: enriched, meta }, "Applications fetched successfully"));
});

/**
 * @desc    Block or Unblock a user
 * @route   PATCH /api/v1/admin/users/:id/status
 * @access  Private (admin only)
 */
const toggleUserStatus = asyncHandler(async (req, res) => {
    const { isActive } = req.body;

    if (typeof isActive !== 'boolean') {
        throw new ApiError(400, "isActive must be a boolean");
    }

    const updateData = { isActive };
    if (!isActive) {
        updateData.$inc = { tokenVersion: 1 };
    }

    const user = await User.findByIdAndUpdate(
        req.params.id,
        updateData,
        { new: true }
    ).select('-password');

    if (!user) throw new ApiError(404, "User not found");

    await logAuditEvent({ event: 'ADMIN_ACTION', userId: req.user._id, req, metadata: { action: 'toggleUserStatus', targetUserId: user._id, isActive } });

    res.status(200).json(new ApiResponse(200, user, `User is now ${isActive ? 'active' : 'blocked'}`));
});

/**
 * @desc    Soft delete a user
 * @route   DELETE /api/v1/admin/users/:id
 * @access  Private (admin only)
 */
const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findByIdAndUpdate(
        req.params.id,
        { 
            deletedAt: new Date(),
            isActive: false,
            $inc: { tokenVersion: 1 }
        },
        { new: true }
    ).select('-password');

    if (!user) throw new ApiError(404, "User not found");

    await logAuditEvent({ event: 'ADMIN_ACTION', userId: req.user._id, req, metadata: { action: 'deleteUser', targetUserId: user._id } });

    res.status(200).json(new ApiResponse(200, null, "User successfully deleted"));
});

/**
 * @desc    Invite an admin or faculty user
 * @route   POST /api/v1/admin/users/invite
 * @access  Private (admin only)
 */
const inviteUser = asyncHandler(async (req, res) => {
    const { email, role } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new ApiError(400, "User with this email already exists");
    }

    const user = await User.create({
        email,
        role,
        isActive: false
    });

    const inviteData = await inviteService.generateInviteToken(user._id);

    const responseData = {
        user: { _id: user._id, email: user.email, role: user.role, isActive: user.isActive }
    };

    if (process.env.NODE_ENV !== 'production') {
        responseData.inviteUrl = inviteData.inviteUrl;
    }

    await logAuditEvent({ event: 'ADMIN_ACTION', userId: req.user._id, req, metadata: { action: 'inviteUser', targetUserId: user._id, role } });

    res.status(201).json(new ApiResponse(201, responseData, `${role} invitation sent successfully`));
});

/**
 * @desc    Get all companies with their users
 * @route   GET /api/v1/admin/companies
 * @access  Private (admin only)
 */
const getAllCompanies = asyncHandler(async (req, res) => {
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.min(100, Math.max(1, parseInt(req.query.limit) || 20));
    const skip = (page - 1) * limit;

    const [companies, total] = await Promise.all([
        Company.find().populate('user', 'email isActive')
            .skip(skip)
            .limit(limit)
            .sort('-createdAt'),
        Company.countDocuments()
    ]);

    const meta = { page, limit, total, totalPages: Math.ceil(total / limit) };
    res.status(200).json(new ApiResponse(200, { data: companies, meta }, "Companies fetched successfully"));
});

/**
 * @desc    Update company verification status
 * @route   PATCH /api/v1/admin/companies/:id/verification
 * @access  Private (admin only)
 */
const updateCompanyVerification = asyncHandler(async (req, res) => {
    const { verificationStatus } = req.body;

    if (!Object.values(COMPANY_VERIFICATION).includes(verificationStatus)) {
        throw new ApiError(400, "Invalid verification status");
    }
    const company = await Company.findByIdAndUpdate(
        req.params.id,
        { verificationStatus },
        { new: true }
    ).populate('user', 'email isActive');

    if (!company) throw new ApiError(404, "Company not found");

    await logAuditEvent({ event: 'ADMIN_ACTION', userId: req.user._id, req, metadata: { action: 'updateCompanyVerification', companyId: company._id, verificationStatus } });

    res.status(200).json(new ApiResponse(200, company, `Company marked as ${verificationStatus}`));
});

/**
 * @desc    Delete a company
 * @route   DELETE /api/v1/admin/companies/:id
 * @access  Private (admin only)
 */
const deleteCompany = asyncHandler(async (req, res) => {
    const company = await Company.findById(req.params.id);
    if (!company) throw new ApiError(404, "Company not found");

    const internships = await Internship.find({ company: company._id }).select('_id');
    const internshipIds = internships.map(i => i._id);

    await Promise.all([
        Application.deleteMany({ internship: { $in: internshipIds } }),
        require('../models/Attendance.model').deleteMany({ internship: { $in: internshipIds } }),
        require('../models/Report.model').deleteMany({ internship: { $in: internshipIds } }),
        require('../models/Interview.model').deleteMany({ company: company._id }),
        Certificate.deleteMany({ internship: { $in: internshipIds } }),
        Internship.deleteMany({ company: company._id }),
        Company.findByIdAndDelete(req.params.id),
        User.findByIdAndUpdate(
            company.user,
            { deletedAt: new Date(), isActive: false, $inc: { tokenVersion: 1 } }
        )
    ]);

    await logAuditEvent({ event: 'ADMIN_ACTION', userId: req.user._id, req, metadata: { action: 'deleteCompany', companyId: req.params.id } });

    res.status(200).json(new ApiResponse(200, null, "Company deleted successfully"));
});

/**
 * @desc    Create a new company
 * @route   POST /api/v1/admin/companies
 * @access  Private (admin only)
 */
const createCompany = asyncHandler(async (req, res) => {
    const { email, name, description, website, location, industry, hrName } = req.body;
    let { password } = req.body;

    if (!email || !name || !description || !location || !hrName) {
        throw new ApiError(400, "Please provide all required fields");
    }

    const hasPassword = Boolean(password && password.trim());

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new ApiError(400, "User with this email already exists");
    }

    const user = await User.create({
        email,
        ...(hasPassword && { password }),
        role: 'company',
        isActive: hasPassword
    });

    const company = await Company.create({
        user: user._id,
        name,
        description,
        website,
        location,
        industry,
        hrName,
        verificationStatus: COMPANY_VERIFICATION_MAP.VERIFIED
    });

    let inviteUrl;
    if (!hasPassword) {
        const inviteData = await inviteService.generateInviteToken(user._id);
        inviteUrl = inviteData.inviteUrl;
    }

    const responseData = {
        ...company.toObject()
    };

    if (inviteUrl && process.env.NODE_ENV !== 'production') {
        responseData.inviteUrl = inviteUrl;
    }

    await logAuditEvent({ event: 'ADMIN_ACTION', userId: req.user._id, req, metadata: { action: 'createCompany', companyId: company._id } });

    res.status(201).json(new ApiResponse(201, responseData, "Company created successfully"));
});

/**
 * @desc    Update a company
 * @route   PUT /api/v1/admin/companies/:id
 * @access  Private (admin only)
 */
const updateCompany = asyncHandler(async (req, res) => {
    const restrictedFields = ['_id', 'user', 'createdAt', 'verificationStatus'];
    const hasRestricted = Object.keys(req.body).some(field => restrictedFields.includes(field));
    if (hasRestricted) {
        throw new ApiError(400, "Cannot update restricted fields via this endpoint");
    }

    const { name, description, website, location, industry, hrName } = req.body;

    const company = await Company.findByIdAndUpdate(
        req.params.id,
        { name, description, website, location, industry, hrName },
        { new: true, runValidators: true }
    );

    if (!company) throw new ApiError(404, "Company not found");

    await logAuditEvent({ event: 'ADMIN_ACTION', userId: req.user._id, req, metadata: { action: 'updateCompany', companyId: company._id } });

    res.status(200).json(new ApiResponse(200, company, "Company updated successfully"));
});

/**
 * @desc    Get all internships across system with filtering and pagination
 * @route   GET /api/v1/admin/internships
 * @access  Private (admin only)
 */
const getAllInternships = asyncHandler(async (req, res) => {
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.min(100, Math.max(1, parseInt(req.query.limit) || 20));
    const skip = (page - 1) * limit;

    const { status, search, company } = req.query;
    let query = { deletedAt: null };

    // Sanitize query params against NoSQL operator injection
    if (status && typeof status === 'string') {
        const allowedStatuses = ['open', 'closed', 'active', 'pending', 'completed'];
        const normalized = status.toLowerCase() === 'active' ? 'open' : status.toLowerCase();
        if (allowedStatuses.includes(status.toLowerCase())) {
            query.status = normalized;
        }
    }

    if (company && typeof company === 'string' && /^[0-9a-fA-F]{24}$/.test(company)) {
        query.company = company;
    }

    if (search && typeof search === 'string') {
        const safeSearch = search.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
        query.$or = [
            { title: new RegExp(safeSearch, 'i') },
            { description: new RegExp(safeSearch, 'i') },
            { location: new RegExp(safeSearch, 'i') }
        ];
    }

    const [internships, total] = await Promise.all([
        Internship.find(query)
            .populate('company', 'name logo location')
            .populate('mentor', 'email')
            .skip(skip)
            .limit(limit)
            .sort('-createdAt'),
        Internship.countDocuments(query)
    ]);

    // Count applicants for each internship
    const internshipIds = internships.map(i => i._id);
    const appCounts = await Application.aggregate([
        { $match: { internship: { $in: internshipIds }, deletedAt: null } },
        { $group: { _id: '$internship', count: { $sum: 1 } } }
    ]);
    const appCountMap = new Map(appCounts.map(c => [c._id.toString(), c.count]));

    // Fetch mentor profiles
    const mentorUserIds = internships.map(i => i.mentor?._id).filter(Boolean);
    const FacultyProfile = require('../models/FacultyProfile.model');
    const mentorProfiles = await FacultyProfile.find({ user: { $in: mentorUserIds } });
    const mentorProfileMap = new Map(mentorProfiles.map(p => [p.user.toString(), p]));

    const enriched = internships.map(item => {
        const obj = item.toObject();
        const mProfile = item.mentor ? mentorProfileMap.get(item.mentor._id.toString()) : null;
        
        return {
            ...obj,
            id: item._id,
            name: item.title,
            company: item.company?.name || "Company",
            companyId: item.company?._id,
            mentor: mProfile?.fullName || item.mentor?.email || "Unassigned",
            mentorId: item.mentor?._id,
            department: mProfile?.department || "Computer Science",
            applicants: appCountMap.get(item._id.toString()) || 0,
            status: item.status === 'open' ? 'Active' : 'Completed',
            rawStatus: item.status,
            deadline: item.deadline ? new Date(item.deadline).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "N/A",
            rawDeadline: item.deadline,
            description: item.description,
            skills: item.requirements || [],
            requirements: item.requirements || [],
            duration: item.duration,
            location: item.location,
            mode: item.location,
            openPositions: item.positions,
            assignedStudents: 0,
            lastUpdated: item.updatedAt ? new Date(item.updatedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "N/A"
        };
    });

    const meta = { page, limit, total, totalPages: Math.ceil(total / limit) };
    res.status(200).json(new ApiResponse(200, { data: enriched, meta }, "Internships fetched successfully"));
});

/**
 * @desc    Get all faculty members with profiles, statistics, and pagination
 * @route   GET /api/v1/admin/faculty
 * @access  Private (admin only)
 */
const getAllFaculty = asyncHandler(async (req, res) => {
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.min(100, Math.max(1, parseInt(req.query.limit) || 20));
    const skip = (page - 1) * limit;

    const { department, status, name } = req.query;
    let userQuery = { role: 'faculty', deletedAt: null };

    // Sanitize query params against NoSQL operator injection
    if (status && typeof status === 'string') {
        if (status.toLowerCase() === 'active') {
            userQuery.isActive = true;
        } else if (status.toLowerCase() === 'inactive') {
            userQuery.isActive = false;
        }
    }

    const FacultyProfile = require('../models/FacultyProfile.model');

    let profileFilter = {};
    if (department && typeof department === 'string') {
        const safeDept = department.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
        profileFilter.department = new RegExp(safeDept, 'i');
    }
    if (name && typeof name === 'string') {
        const safeName = name.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
        profileFilter.fullName = new RegExp(safeName, 'i');
    }

    if (Object.keys(profileFilter).length > 0) {
        const matchingProfiles = await FacultyProfile.find(profileFilter).select('user');
        const userIds = matchingProfiles.map(p => p.user);
        userQuery._id = { $in: userIds };
    }

    const [facultyUsers, total] = await Promise.all([
        User.find(userQuery).select('-password')
            .skip(skip)
            .limit(limit)
            .sort('-createdAt'),
        User.countDocuments(userQuery)
    ]);

    const facultyUserIds = facultyUsers.map(u => u._id);
    const profiles = await FacultyProfile.find({ user: { $in: facultyUserIds } });
    const profileMap = new Map(profiles.map(p => [p.user.toString(), p]));

    // Count mentored internships per faculty
    const mentorInternships = await Internship.aggregate([
        { $match: { mentor: { $in: facultyUserIds }, deletedAt: null } },
        { $group: { _id: '$mentor', count: { $sum: 1 } } }
    ]);
    const internshipCountMap = new Map(mentorInternships.map(m => [m._id.toString(), m.count]));

    const enriched = facultyUsers.map(user => {
        const profile = profileMap.get(user._id.toString());
        return {
            _id: user._id,
            id: profile?.employeeId || `FAC-${user._id.toString().slice(-4).toUpperCase()}`,
            facultyId: profile?.employeeId || `FAC-${user._id.toString().slice(-4).toUpperCase()}`,
            name: profile?.fullName || user.email.split('@')[0],
            email: user.email,
            phone: profile?.phoneNumber || "+91 98765 43210",
            department: profile?.department || "Computer Science",
            designation: profile?.designation || "Assistant Professor",
            qualification: "Ph.D. / M.Tech",
            experience: 8,
            subjects: ["Software Engineering", "Systems"],
            gender: "Not Specified",
            joiningDate: user.createdAt ? new Date(user.createdAt).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }) : "N/A",
            address: "University Campus",
            studentsAssigned: profile?.assignedStudents?.length || (internshipCountMap.get(user._id.toString()) || 0) * 4,
            status: user.isActive ? "Active" : "Inactive",
            rating: 4.5,
            photo: profile?.avatarUrl || `https://i.pravatar.cc/150?u=${user._id}`,
            isActive: user.isActive
        };
    });

    const meta = { page, limit, total, totalPages: Math.ceil(total / limit) };
    res.status(200).json(new ApiResponse(200, { data: enriched, meta }, "Faculty fetched successfully"));
});

module.exports = {
    getDashboardStats,
    getAllUsers,
    getAllApplications,
    getAllInternships,
    getAllFaculty,
    toggleUserStatus,
    inviteUser,
    deleteUser,
    getAllCompanies,
    updateCompanyVerification,
    deleteCompany,
    createCompany,
    updateCompany
};
