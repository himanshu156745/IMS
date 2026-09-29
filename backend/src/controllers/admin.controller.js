const User = require('../models/User.model');
const Internship = require('../models/Internship.model');
const Application = require('../models/Application.model');
const ApiError = require('../utils/ApiError');
const ApiResponse = require('../utils/ApiResponse');
const asyncHandler = require('../utils/asyncHandler');
const { logAuditEvent } = require('../services/audit.service');
const { COMPANY_VERIFICATION, COMPANY_VERIFICATION_MAP } = require('../constants/companyVerification');
/**
 * @desc    Get dashboard statistics
 * @route   GET /api/v1/admin/stats
 * @access  Private (admin only)
 */
const getDashboardStats = asyncHandler(async (req, res) => {
    const totalUsers = await User.countDocuments();
    const totalInternships = await Internship.countDocuments();
    const totalApplications = await Application.countDocuments();

    res.status(200).json(new ApiResponse(200, {
        totalUsers,
        totalInternships,
        totalApplications
    }, "Stats fetched successfully"));
});

/**
 * @desc    Get all users with filtering
 * @route   GET /api/v1/admin/users
 * @access  Private (admin only)
 */
const getAllUsers = asyncHandler(async (req, res) => {
    const { role } = req.query;
    let query = {};
    if (role) query.role = role;

    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.min(100, Math.max(1, parseInt(req.query.limit) || 20));
    const skip = (page - 1) * limit;

    const [users, total] = await Promise.all([
        User.find(query).select('-password')
            .skip(skip)
            .limit(limit),
        User.countDocuments(query)
    ]);

    const meta = { page, limit, total, totalPages: Math.ceil(total / limit) };
    res.status(200).json(new ApiResponse(200, { data: users, meta }, "Users fetched"));
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

    const user = await User.findByIdAndUpdate(
        req.params.id, 
        { isActive },
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
    // using findByIdAndUpdate directly rather than findById and save, as pre hooks on find will hide it
    // Wait, findByIdAndUpdate uses find hook, so we need to bypass the hook? No, we might want to delete a user that is not deleted.
    const user = await User.findByIdAndUpdate(
        req.params.id,
        { deletedAt: new Date() },
        { new: true }
    ).select('-password');

    if (!user) throw new ApiError(404, "User not found");

    // also bump tokenVersion to force immediate logout of any active sessions
    user.tokenVersion += 1;
    await user.save();

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

const Company = require('../models/Company.model');
const inviteService = require('../services/invite.service');

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
            .limit(limit),
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
    
    if (!COMPANY_VERIFICATION.includes(verificationStatus)) {
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
    
    await Company.findByIdAndDelete(req.params.id);
    // Soft-delete the associated user
    const user = await User.findByIdAndUpdate(
        company.user,
        { deletedAt: new Date() },
        { new: true }
    );
    if (user) {
        user.tokenVersion += 1;
        await user.save();
    }

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

    const hasPassword = !!password;

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

module.exports = {
    getDashboardStats,
    getAllUsers,
    toggleUserStatus,
    inviteUser,
    deleteUser,
    getAllCompanies,
    updateCompanyVerification,
    deleteCompany,
    createCompany,
    updateCompany
};
