const Company = require('../models/Company.model');
const ApiError = require('../utils/ApiError');
const ApiResponse = require('../utils/ApiResponse');
const asyncHandler = require('../utils/asyncHandler');

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
        hrName
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
 * @desc    Get all companies (for students to browse)
 * @route   GET /api/v1/companies
 * @access  Public
 */
const getAllCompanies = asyncHandler(async (req, res) => {
    const companies = await Company.find().select('-user');
    res.status(200).json(new ApiResponse(200, companies, "Companies fetched successfully"));
});

module.exports = {
    registerCompany,
    getMyCompany,
    getAllCompanies
};
