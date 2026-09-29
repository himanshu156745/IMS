const jwt = require('jsonwebtoken');
const ApiError = require('../utils/ApiError');
const asyncHandler = require('../utils/asyncHandler');
const User = require('../models/User.model');

const verifyJWT = asyncHandler(async (req, res, next) => {
    try {
        // 1. Get token from cookies OR Authorization header (Bearer token)
        const token = req.cookies?.token || req.header("Authorization")?.replace("Bearer ", "");

        if (!token) {
            throw new ApiError(401, "Unauthorized request - Token missing");
        }

        // 2. Verify token (algorithm pinned)
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET, { algorithms: ['HS256'] });

        // 3. Find user from decoded token payload
        const user = await User.findById(decodedToken.id).select("-password");

        if (!user) {
            throw new ApiError(401, "Invalid Access Token - User not found");
        }

        if (!user.isActive) {
            throw new ApiError(403, "Account is disabled. Please contact support.");
        }

        // 4. Attach user to request object for further middlewares/controllers
        req.user = user;
        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            throw new ApiError(401, "Token expired. Please log in again.");
        }
        throw new ApiError(401, "Invalid access token");
    }
});

const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!req.user || !roles.includes(req.user.role)) {
            throw new ApiError(403, "You don't have permission to perform this action");
        }
        next();
    };
};

module.exports = { verifyJWT, authorizeRoles };
