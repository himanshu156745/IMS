const User = require('../models/User.model');
const Internship = require('../models/Internship.model');
const Application = require('../models/Application.model');
const ApiError = require('../utils/ApiError');
const ApiResponse = require('../utils/ApiResponse');
const asyncHandler = require('../utils/asyncHandler');
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

    const users = await User.find(query).select('-password');
    res.status(200).json(new ApiResponse(200, users, "Users fetched"));
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

    res.status(200).json(new ApiResponse(200, user, `User is now ${isActive ? 'active' : 'blocked'}`));
});

const Company = require('../models/Company.model');

/**
 * @desc    Get all companies with their users
 * @route   GET /api/v1/admin/companies
 * @access  Private (admin only)
 */
const getAllCompanies = asyncHandler(async (req, res) => {
    const companies = await Company.find().populate('user', 'email isActive');
    res.status(200).json(new ApiResponse(200, companies, "Companies fetched successfully"));
});

/**
 * @desc    Update company verification status
 * @route   PATCH /api/v1/admin/companies/:id/verification
 * @access  Private (admin only)
 */
const updateCompanyVerification = asyncHandler(async (req, res) => {
    const { verificationStatus } = req.body;
    
    if (!['Pending', 'Verified', 'Suspended'].includes(verificationStatus)) {
        throw new ApiError(400, "Invalid verification status");
    }

    const company = await Company.findByIdAndUpdate(
        req.params.id,
        { verificationStatus },
        { new: true }
    ).populate('user', 'email isActive');

    if (!company) throw new ApiError(404, "Company not found");

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
    // Optionally delete the user as well
    // await User.findByIdAndDelete(company.user);

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

    if (!password) {
        const crypto = require('crypto');
        password = crypto.randomBytes(8).toString('hex') + "A1!";
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new ApiError(400, "User with this email already exists");
    }

    const user = await User.create({
        email,
        password,
        role: 'company'
    });

    const company = await Company.create({
        user: user._id,
        name,
        description,
        website,
        location,
        industry,
        hrName,
        verificationStatus: 'Verified'
    });

    res.status(201).json(new ApiResponse(201, company, "Company created successfully"));
});

/**
 * @desc    Update a company
 * @route   PUT /api/v1/admin/companies/:id
 * @access  Private (admin only)
 */
const updateCompany = asyncHandler(async (req, res) => {
    const { name, description, website, location, industry, hrName } = req.body;

    const company = await Company.findByIdAndUpdate(
        req.params.id,
        { name, description, website, location, industry, hrName },
        { new: true, runValidators: true }
    );

    if (!company) throw new ApiError(404, "Company not found");

    res.status(200).json(new ApiResponse(200, company, "Company updated successfully"));
});

module.exports = {
    getDashboardStats,
    getAllUsers,
    toggleUserStatus,
    getAllCompanies,
    updateCompanyVerification,
    deleteCompany,
    createCompany,
    updateCompany
};
