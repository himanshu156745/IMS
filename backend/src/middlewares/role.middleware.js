const ApiError = require('../utils/ApiError');

/**
 * Middleware to authorize users based on roles
 * @param  {...string} roles - List of allowed roles (e.g., 'admin', 'company')
 */
const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        // Ensure req.user exists (meaning verifyJWT ran before this)
        if (!req.user) {
            return next(new ApiError(401, "Not authenticated"));
        }

        if (!roles.includes(req.user.role)) {
            return next(new ApiError(403, `Role '${req.user.role}' is not allowed to access this resource`));
        }

        next();
    };
};

module.exports = { authorizeRoles };
