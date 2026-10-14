const User = require('../models/User.model');
const RefreshToken = require('../models/RefreshToken.model');
const ApiError = require('../utils/ApiError');
const ApiResponse = require('../utils/ApiResponse');
const asyncHandler = require('../utils/asyncHandler');
const { generateCsrfToken } = require('../utils/csrf');
const bcrypt = require('bcrypt');
const crypto = require('crypto');

const IS_PROD = process.env.NODE_ENV === 'production';
const ACCESS_COOKIE_NAME = IS_PROD ? '__Host-ims_session' : 'ims_session';
const REFRESH_COOKIE_NAME = IS_PROD ? '__Host-ims_refresh' : 'ims_refresh';

const DUMMY_HASH = bcrypt.hashSync('timing-safe-dummy-password-' + crypto.randomUUID(), 10);

// Cookie options for security
const accessCookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 15 * 60 * 1000 // 15 minutes
};

const refreshCookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
};

const cookieOptions = accessCookieOptions;

/**
 * Generate fresh access token and cryptographically random rotated refresh token
 */
const generateAccessAndRefreshTokens = async (user) => {
    const accessToken = user.generateAccessToken();

    const rawRefreshToken = crypto.randomBytes(40).toString('hex');
    const hashedToken = crypto.createHash('sha256').update(rawRefreshToken).digest('hex');
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days

    await RefreshToken.create({
        userId: user._id,
        hashedToken,
        expiresAt
    });

    return { accessToken, rawRefreshToken };
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
 * @desc    Login user & get tokens
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

    // Check account lockout
    if (user && user.lockUntil && user.lockUntil > Date.now()) {
        const remainingMinutes = Math.ceil((user.lockUntil - Date.now()) / (60 * 1000));
        throw new ApiError(403, `Account temporarily locked due to excessive failed login attempts. Please try again after ${remainingMinutes} minute(s).`);
    }

    // Check soft-deleted account
    if (user && user.deletedAt) {
        throw new ApiError(401, "Account deleted");
    }
    
    // Prevent timing attack: Always compare password even if user is not found
    const hash = user ? user.password : DUMMY_HASH;
    const isPasswordValid = await bcrypt.compare(password, hash);

    if (!user || !isPasswordValid) {
        if (user) {
            const attempts = (user.failedLoginAttempts || 0) + 1;
            const update = { failedLoginAttempts: attempts };
            if (attempts >= 5) {
                update.lockUntil = new Date(Date.now() + 15 * 60 * 1000); // Lock for 15 minutes
                update.failedLoginAttempts = 0;
            }
            await User.findByIdAndUpdate(user._id, update);
        }
        throw new ApiError(401, "Invalid credentials");
    }

    // Reset failed login attempts upon successful authentication
    if (user.failedLoginAttempts > 0 || user.lockUntil) {
        await User.findByIdAndUpdate(user._id, { failedLoginAttempts: 0, lockUntil: null });
    }

    // 4. Check if account is active
    if (!user.isActive) {
        throw new ApiError(403, "Account is disabled. Please contact support.");
    }

    // 5. Generate tokens (15m access token + rotated refresh token)
    const { accessToken, rawRefreshToken } = await generateAccessAndRefreshTokens(user);

    // Bind user to request and generate CSRF token
    req.user = user;
    generateCsrfToken(req, res, true); // true generates token AND sets cookie on res

    // 6. Remove password from response object
    const loggedInUser = user.toObject();
    delete loggedInUser.password;

    // 7. Send response with both secure HTTP-only cookies
    return res
        .status(200)
        .cookie(ACCESS_COOKIE_NAME, accessToken, accessCookieOptions)
        .cookie(REFRESH_COOKIE_NAME, rawRefreshToken, refreshCookieOptions)
        .json(
            new ApiResponse(200, { user: loggedInUser }, "User logged in successfully")
        );
});

/**
 * @desc    Refresh access token via HTTP-only refresh token rotation
 * @route   POST /api/v1/users/refresh-token
 * @access  Public (Authenticated via Refresh Cookie)
 */
const refreshAccessToken = asyncHandler(async (req, res) => {
    const rawRefreshToken = req.cookies?.[REFRESH_COOKIE_NAME] || 
                             req.cookies?.['ims_refresh'] || 
                             req.cookies?.refreshToken || 
                             req.body?.refreshToken;

    if (!rawRefreshToken) {
        throw new ApiError(401, "Refresh token is missing or expired");
    }

    const hashedToken = crypto.createHash('sha256').update(rawRefreshToken).digest('hex');
    const existingToken = await RefreshToken.findOne({ hashedToken });

    if (!existingToken) {
        throw new ApiError(401, "Invalid refresh token");
    }

    // 1. Token Reuse Detection (Compromise protection - CWE-613)
    if (existingToken.revokedAt) {
        // If an already revoked token is used, assume breach: invalidate all sessions
        await User.findByIdAndUpdate(existingToken.userId, { $inc: { tokenVersion: 1 } });
        await RefreshToken.updateMany(
            { userId: existingToken.userId, revokedAt: null },
            { revokedAt: new Date() }
        );
        throw new ApiError(403, "Compromised token reuse detected. All sessions revoked.");
    }

    // 2. Check Expiration
    if (existingToken.expiresAt < new Date()) {
        existingToken.revokedAt = new Date();
        await existingToken.save();
        throw new ApiError(401, "Refresh token has expired. Please log in again.");
    }

    // 3. User verification
    const user = await User.findById(existingToken.userId);
    if (!user || user.deletedAt) {
        throw new ApiError(401, "User not found or deleted");
    }
    if (!user.isActive) {
        throw new ApiError(403, "Account is disabled. Please contact support.");
    }

    // 4. Rotate Refresh Token: Revoke current and issue new
    const newRawRefreshToken = crypto.randomBytes(40).toString('hex');
    const newHashedToken = crypto.createHash('sha256').update(newRawRefreshToken).digest('hex');

    existingToken.revokedAt = new Date();
    existingToken.replacedBy = newHashedToken;
    await existingToken.save();

    const newExpiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    await RefreshToken.create({
        userId: user._id,
        hashedToken: newHashedToken,
        expiresAt: newExpiresAt
    });

    // 5. Generate fresh 15-minute access token
    const newAccessToken = user.generateAccessToken();

    req.user = user;
    generateCsrfToken(req, res, true);

    const safeUser = user.toObject();
    delete safeUser.password;

    return res
        .status(200)
        .cookie(ACCESS_COOKIE_NAME, newAccessToken, accessCookieOptions)
        .cookie(REFRESH_COOKIE_NAME, newRawRefreshToken, refreshCookieOptions)
        .json(
            new ApiResponse(200, { user: safeUser }, "Token refreshed successfully")
        );
});

/**
 * @desc    Logout user & invalidate tokens server-side
 * @route   POST /api/v1/users/logout
 * @access  Private
 */
const logoutUser = asyncHandler(async (req, res) => {
    let userId = req.user?._id;

    const rawRefreshToken = req.cookies?.[REFRESH_COOKIE_NAME] || 
                             req.cookies?.['ims_refresh'] || 
                             req.cookies?.refreshToken;

    if (rawRefreshToken) {
        const hashedToken = crypto.createHash('sha256').update(rawRefreshToken).digest('hex');
        const tokenDoc = await RefreshToken.findOneAndUpdate(
            { hashedToken },
            { revokedAt: new Date() }
        );
        if (tokenDoc && !userId) {
            userId = tokenDoc.userId;
        }
    }

    // Server-side revocation: increment tokenVersion to immediately invalidate all access tokens
    if (userId) {
        await User.findByIdAndUpdate(userId, { $inc: { tokenVersion: 1 } });
        await RefreshToken.updateMany(
            { userId, revokedAt: null },
            { revokedAt: new Date() }
        );
    }

    return res
        .status(200)
        .clearCookie(ACCESS_COOKIE_NAME, accessCookieOptions)
        .clearCookie(REFRESH_COOKIE_NAME, refreshCookieOptions)
        .clearCookie('ims_session', accessCookieOptions)
        .clearCookie('ims_refresh', refreshCookieOptions)
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
    getCurrentUser,
    refreshAccessToken
};
