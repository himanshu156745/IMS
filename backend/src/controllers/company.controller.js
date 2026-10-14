const Company = require('../models/Company.model');
const ApiError = require('../utils/ApiError');
const ApiResponse = require('../utils/ApiResponse');
const asyncHandler = require('../utils/asyncHandler');
const { COMPANY_VERIFICATION_MAP } = require('../constants/companyVerification');

/**
 * @desc    Create a new company profile
 * @route   POST /api/v1/companies
 * @access  Private (company role only)
 */
const registerCompany = asyncHandler(async (req, res) => {
    const { name, description, website, location, industry, hrName } = req.body;

    if (!name || !description || !location || !hrName) {
        throw new ApiError(400, "Please provide name, description, location, and HR Name");
    }

    // Check if company already exists for this user
    let company = await Company.findOne({ user: req.user._id });
    if (company) {
        throw new ApiError(400, "You have already registered a company profile");
    }

    company = await Company.create({
        user: req.user._id,
        name,
        description,
        website,
        location,
        industry,
        hrName,
        verificationStatus: COMPANY_VERIFICATION_MAP.PENDING
    });

    res.status(201).json(new ApiResponse(201, company, "Company registered successfully"));
});

/**
 * @desc    Get company profile of logged in user
 * @route   GET /api/v1/companies/me
 * @access  Private (company role only)
 */
const getMyCompany = asyncHandler(async (req, res) => {
    const company = await Company.findOne({ user: req.user._id });

    if (!company) {
        throw new ApiError(404, "Company profile not found");
    }

    res.status(200).json(new ApiResponse(200, company, "Company fetched successfully"));
});

/**
 * @desc    Update company profile of logged in user
 * @route   PATCH /api/v1/companies/me
 * @access  Private (company role only)
 */
const updateMyCompany = asyncHandler(async (req, res) => {
    const { name, description, website, location, industry, hrName } = req.body;

    let company = await Company.findOne({ user: req.user._id });

    if (!company) {
        // If profile doesn't exist yet, create it
        company = await Company.create({
            user: req.user._id,
            name: name || "Company",
            description: description || "Company description",
            website,
            location: location || "Remote",
            industry: industry || "Technology",
            hrName: hrName || "HR Manager"
        });
    } else {
        if (name) company.name = name;
        if (description) company.description = description;
        if (website !== undefined) company.website = website;
        if (location) company.location = location;
        if (industry) company.industry = industry;
        if (hrName) company.hrName = hrName;
        await company.save();
    }

    res.status(200).json(new ApiResponse(200, company, "Company profile updated successfully"));
});

/**
 * @desc    Get all verified companies (for students to browse)
 * @route   GET /api/v1/companies
 * @access  Public
 */
const getAllCompanies = asyncHandler(async (req, res) => {
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.min(100, Math.max(1, parseInt(req.query.limit) || 50));
    const skip = (page - 1) * limit;

    const query = { verificationStatus: COMPANY_VERIFICATION_MAP.VERIFIED };

    const [companies, total] = await Promise.all([
        Company.find(query).select('-user').skip(skip).limit(limit).sort('name'),
        Company.countDocuments(query)
    ]);

    const meta = { page, limit, total, totalPages: Math.ceil(total / limit) };
    res.status(200).json(new ApiResponse(200, { data: companies, meta }, "Companies fetched successfully"));
});

module.exports = {
    registerCompany,
    getMyCompany,
    updateMyCompany,
    getAllCompanies
};
