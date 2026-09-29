const StudentProfile = require('../models/StudentProfile.model');
const ApiError = require('../utils/ApiError');
const ApiResponse = require('../utils/ApiResponse');
const asyncHandler = require('../utils/asyncHandler');
const { uploadOnCloudinary } = require('../utils/cloudinary');

/**
 * @desc    Create or update student profile (with file uploads)
 * @route   POST /api/v1/student-profiles
 * @access  Private (student only)
 */
const upsertStudentProfile = asyncHandler(async (req, res) => {
    const { fullName, phoneNumber, university, course, semester, skills, branch, cgpa, github, linkedin } = req.body;

    if (!fullName || !university || !course) {
        throw new ApiError(400, "Full Name, University, and Course are required fields");
    }

    // Process uploaded files if any
    let resumeUrl, avatarUrl;
    
    if (req.files && req.files.resume && req.files.resume.length > 0) {
        const resumeLocalPath = req.files.resume[0].path;
        const uploadResult = await uploadOnCloudinary(resumeLocalPath);
        if (uploadResult) resumeUrl = uploadResult.secure_url;
    }

    if (req.files && req.files.avatar && req.files.avatar.length > 0) {
        const avatarLocalPath = req.files.avatar[0].path;
        const uploadResult = await uploadOnCloudinary(avatarLocalPath);
        if (uploadResult) avatarUrl = uploadResult.secure_url;
    }

    // Parse skills safely if they come as string
    let parsedSkills = skills;
    if (typeof skills === 'string') {
        try {
            parsedSkills = JSON.parse(skills);
        } catch (e) {
            throw new ApiError(400, "Invalid skills format");
        }
    }

    let profile = await StudentProfile.findOne({ user: req.user._id });

    if (profile) {
        // Update existing profile
        profile.fullName = fullName;
        profile.phoneNumber = phoneNumber || profile.phoneNumber;
        profile.university = university;
        profile.course = course;
        profile.semester = semester || profile.semester;
        if (branch) profile.branch = branch;
        if (cgpa) profile.cgpa = cgpa;
        if (github) profile.github = github;
        if (linkedin) profile.linkedin = linkedin;
        if (parsedSkills) profile.skills = parsedSkills;
        if (resumeUrl) profile.resumeUrl = resumeUrl;
        if (avatarUrl) profile.avatarUrl = avatarUrl;
        
        await profile.save();
    } else {
        // Create new profile
        profile = await StudentProfile.create({
            user: req.user._id,
            fullName,
            phoneNumber,
            university,
            course,
            semester,
            branch,
            cgpa,
            github,
            linkedin,
            skills: parsedSkills || [],
            resumeUrl,
            avatarUrl
        });
    }

    res.status(200).json(new ApiResponse(200, profile, "Profile saved successfully"));
});

/**
 * @desc    Get current student's profile
 * @route   GET /api/v1/student-profiles/me
 * @access  Private (student only)
 */
const getMyProfile = asyncHandler(async (req, res) => {
    const profile = await StudentProfile.findOne({ user: req.user._id });
    
    if (!profile) {
        throw new ApiError(404, "Profile not found. Please create one.");
    }
    
    res.status(200).json(new ApiResponse(200, profile, "Profile fetched successfully"));
});

module.exports = {
    upsertStudentProfile,
    getMyProfile
};
