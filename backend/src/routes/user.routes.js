const express = require('express');
const { registerUser, loginUser, logoutUser, getCurrentUser } = require('../controllers/user.controller');
const { verifyJWT } = require('../middlewares/auth.middleware');
const rateLimit = require('express-rate-limit');
const validate = require('../utils/validate.middleware');
const { registerSchema, loginSchema } = require('../validators/user.validator');

const router = express.Router();

const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 10, // Limit each IP to 10 requests per `window`
    message: { success: false, message: 'Too many authentication attempts from this IP, please try again after 15 minutes' },
    standardHeaders: true,
    legacyHeaders: false,
});

// Public routes
router.post('/register', authLimiter, validate(registerSchema), registerUser);
router.post('/login', authLimiter, validate(loginSchema), loginUser);

// Secured routes
router.post('/logout', verifyJWT, logoutUser);
router.get('/me', verifyJWT, getCurrentUser);

module.exports = router;
