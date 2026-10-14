const Internship = require('../models/Internship.model');
const Company = require('../models/Company.model');
const ApiError = require('../utils/ApiError');
const ApiResponse = require('../utils/ApiResponse');
const asyncHandler = require('../utils/asyncHandler');

/**
 * @desc    Create an internship
 * @route   POST /api/v1/internships
 * @access  Private (company only)
 */
const createInternship = asyncHandler(async (req, res) => {
    const { title, description, requirements, location, stipend, duration, positions, deadline } = req.body;

    const company = await Company.findOne({ user: req.user._id });
    if (!company) {
        throw new ApiError(404, "Please complete your company profile first");
    }
    if (company.verificationStatus !== 'Verified') {
        throw new ApiError(403, "Your company account is pending verification by an admin");
    }

    if (!title || !description || !requirements || !location || !duration || !positions || !deadline) {
        throw new ApiError(400, "Please provide all required fields");
    }

    // Coerce requirements to array if string
    const reqArray = Array.isArray(requirements) 
        ? requirements 
        : requirements.split(',').map(s => s.trim()).filter(Boolean);

    const internship = await Internship.create({
        company: company._id,
        title,
        description,
        requirements: reqArray,
        location,
        stipend: stipend || 0,
        duration,
        positions,
        deadline
    });

    res.status(201).json(new ApiResponse(201, internship, "Internship posted successfully"));
});

/**
 * @desc    Get all internships (with optional filtering)
 * @route   GET /api/v1/internships
 * @access  Public
 */
const getAllInternships = asyncHandler(async (req, res) => {
    const { search } = req.query;
    
    let query = { status: 'open' };
    if (search) {
        const escapeRegExp = (string) => string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        query.title = { $regex: escapeRegExp(search), $options: 'i' };
    }

    const internships = await Internship.find(query)
        .populate('company', 'name location logo')
        .sort('-createdAt');

    res.status(200).json(new ApiResponse(200, internships, "Internships fetched successfully"));
});

/**
 * @desc    Get logged in company's internships
 * @route   GET /api/v1/internships/me
 * @access  Private (company only)
 */
const getMyInternships = asyncHandler(async (req, res) => {
    const company = await Company.findOne({ user: req.user._id });
    if (!company) {
        // Return empty array instead of throwing 404 so dashboard loads cleanly
        return res.status(200).json(new ApiResponse(200, [], "Company profile not found yet"));
    }

    const internships = await Internship.find({ company: company._id })
        .sort('-createdAt');

    res.status(200).json(new ApiResponse(200, internships, "Company internships fetched successfully"));
});

/**
 * @desc    Get single internship by ID
 * @route   GET /api/v1/internships/:id
 * @access  Public
 */
const getInternshipById = asyncHandler(async (req, res) => {
    const internship = await Internship.findById(req.params.id)
        .populate('company', 'name description website location');

    if (!internship) {
        throw new ApiError(404, "Internship not found");
    }

    res.status(200).json(new ApiResponse(200, internship, "Internship fetched successfully"));
});

/**
 * @desc    Update internship details
 * @route   PATCH /api/v1/internships/:id
 * @access  Private (company only)
 */
const updateInternship = asyncHandler(async (req, res) => {
    const { title, description, requirements, location, stipend, duration, positions, status, deadline } = req.body;
    
    let internship = await Internship.findById(req.params.id);
    if (!internship) throw new ApiError(404, "Internship not found");
    
    if (req.user.role !== 'admin') {
        const company = await Company.findOne({ user: req.user._id });
        if (!company || internship.company.toString() !== company._id.toString()) {
            throw new ApiError(403, "You can only update your own internships");
        }
    }

    const updateFields = { title, description, location, stipend, duration, positions, status, deadline };
    if (requirements !== undefined) {
        updateFields.requirements = Array.isArray(requirements) 
            ? requirements 
            : requirements.split(',').map(s => s.trim()).filter(Boolean);
    }

    internship = await Internship.findByIdAndUpdate(
        req.params.id,
        { $set: updateFields },
        { new: true, runValidators: true }
    );

    res.status(200).json(new ApiResponse(200, internship, "Internship updated successfully"));
});

/**
 * @desc    Delete internship
 * @route   DELETE /api/v1/internships/:id
 * @access  Private (company or admin)
 */
const deleteInternship = asyncHandler(async (req, res) => {
    const internship = await Internship.findById(req.params.id);
    if (!internship) throw new ApiError(404, "Internship not found");
    
    if (req.user.role !== 'admin') {
        const company = await Company.findOne({ user: req.user._id });
        if (!company || internship.company.toString() !== company._id.toString()) {
            throw new ApiError(403, "You can only delete your own internships");
        }
    }

    const Application = require('../models/Application.model');
    const hasAccepted = await Application.findOne({ internship: req.params.id, status: 'accepted', deletedAt: null });
    if (hasAccepted && req.user.role !== 'admin') {
        throw new ApiError(400, "Cannot delete an internship with accepted students. Please close it instead.");
    }

    // Cascade delete related records
    const appIds = await Application.find({ internship: req.params.id }).distinct('_id');
    await Promise.all([
        require('../models/Interview.model').deleteMany({ application: { $in: appIds } }),
        require('../models/Attendance.model').deleteMany({ internship: req.params.id }),
        require('../models/Report.model').deleteMany({ internship: req.params.id }),
        require('../models/Certificate.model').deleteMany({ internship: req.params.id }),
        Application.deleteMany({ internship: req.params.id })
    ]);

    await Internship.findByIdAndDelete(req.params.id);
    res.status(200).json(new ApiResponse(200, null, "Internship deleted successfully"));
});

module.exports = {
    createInternship,
    getAllInternships,
    getMyInternships,
    getInternshipById,
    updateInternship,
    deleteInternship
};
