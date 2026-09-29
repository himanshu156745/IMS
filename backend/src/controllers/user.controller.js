const User = require('../models/User.model');
const ApiError = require('../utils/ApiError');
const ApiResponse = require('../utils/ApiResponse');
const asyncHandler = require('../utils/asyncHandler');
const { generateToken } = require('../utils/csrf');
const bcrypt = require('bcrypt');
const crypto = require('crypto');

const DUMMY_HASH = bcrypt.hashSync('timing-safe-dummy-password-' + crypto.randomUUID(), 10);

// Cookie options for security
const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 24 * 60 * 60 * 1000 // 1 day
};

/**
 * @desc    Register a new user
 * @route   POST /api/users/register
 * @access  Public
 */
const registerUser = asyncHandler(async (req, res) => {
    const { email, password, role } = req.body;

    // 1. Validate incoming data
    if (!email || !password || !role) {
        throw new ApiError(400, "Please provide email, password, and role");
    }

    // Prevent privilege escalation: Only allow specific roles
    if (!['student', 'company'].includes(role)) {
        throw new ApiError(403, "Invalid role provided. Cannot register as admin or faculty directly.");
    }

    // 2. Check if user already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
        throw new ApiError(409, "User with this email already exists");
    }

    // 3. Create the user
    const user = await User.create({
        email: email.toLowerCase(),
        password, // Pre-save hook in model will hash this
        role
    });

    // 4. Check if user was created successfully
    const createdUser = await User.findById(user._id);
    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user");
    }

    // 5. Send secure response
    return res.status(201).json(
        new ApiResponse(201, createdUser, "User registered successfully")
    );
});

/**
 * @desc    Login user & get token
 * @route   POST /api/users/login
 * @access  Public
 */
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // 1. Validation
    if (!email || !password) {
        throw new ApiError(400, "Please provide email and password");
    }

    // 2. Find user & explicitly select password
    const user = await User.findOne({ email: email.toLowerCase() }).select("+password");
    
    // Prevent timing attack: Always compare password even if user is not found
    const hash = user ? user.password : DUMMY_HASH;
    const isPasswordValid = await bcrypt.compare(password, hash);

    if (!user || !isPasswordValid) {
        throw new ApiError(401, "Invalid credentials");
    }

    // 4. Check if account is active
    if (!user.isActive) {
        throw new ApiError(403, "Account is disabled. Please contact support.");
    }

    // 5. Generate token
    const token = user.generateAccessToken();

    // Generate CSRF token
    generateToken(req, res, true); // true generates token AND sets cookie on res

    // 6. Remove password from response object
    const loggedInUser = user.toObject();
    delete loggedInUser.password;

    // 7. Send response with cookie
    return res
        .status(200)
        .cookie("token", token, cookieOptions)
        .json(
            new ApiResponse(200, { user: loggedInUser }, "User logged in successfully")
        );
});

/**
 * @desc    Logout user
 * @route   POST /api/users/logout
 * @access  Private
 */
const logoutUser = asyncHandler(async (req, res) => {
    return res
        .status(200)
        .clearCookie("token", cookieOptions)
        .json(new ApiResponse(200, {}, "User logged out successfully"));
});

const getCurrentUser = asyncHandler(async (req, res) => {
    // req.user is set by verifyJWT middleware
    res.status(200).json(new ApiResponse(200, { user: req.user }, "User fetched successfully"));
});

module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    getCurrentUser
};