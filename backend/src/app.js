const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const { errorHandler } = require('./middlewares/error.middleware');
const rateLimit = require('express-rate-limit');

const app = express();

// Trust proxy if we're behind a reverse proxy (like Nginx, Heroku, etc.)
if (process.env.NODE_ENV === 'production') {
    app.set('trust proxy', 1);
}

// Security Middlewares (Must be before rate limiter for 429 to have CORS headers)
app.use(helmet()); // Set security HTTP headers
app.use(cors({
    origin: process.env.CORS_ORIGIN || ['http://localhost:5173', 'http://localhost:5174'], // Adjust this in production
    credentials: true,
}));

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    message: { success: false, message: 'Too many requests from this IP, please try again later.' },
    standardHeaders: true,
    legacyHeaders: false,
});
app.use(limiter);

const { doubleCsrfProtection } = require('./utils/csrf');

// Express Middlewares
app.use(express.json({ limit: '16kb' }));
app.use(express.urlencoded({ extended: true, limit: '16kb' }));
app.use(express.static('public'));
app.use(cookieParser());

// Set SameSite=Strict on the auth cookie globally
app.use((req, res, next) => {
    const originalCookie = res.cookie;
    res.cookie = function (name, value, options = {}) {
        if (name === 'token') {
            options.sameSite = 'strict';
        }
        return originalCookie.call(this, name, value, options);
    };
    next();
});

// CSRF Origin/Referer Check & token validation
app.use((req, res, next) => {
    if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(req.method)) {
        if (req.path === '/api/v1/users/login' || req.path === '/api/v1/users/register') {
            return next();
        }
        
        if (process.env.NODE_ENV === 'test') {
            return next();
        }

        const origin = req.headers.origin;
        const referer = req.headers.referer;
        const allowedOrigins = Array.isArray(process.env.CORS_ORIGIN) 
            ? process.env.CORS_ORIGIN 
            : (process.env.CORS_ORIGIN ? [process.env.CORS_ORIGIN] : ['http://localhost:5173', 'http://localhost:5174']);
        
        let isValid = false;
        if (origin && allowedOrigins.some(o => origin.startsWith(o))) isValid = true;
        if (referer && allowedOrigins.some(o => referer.startsWith(o))) isValid = true;
        
        if (!isValid && (origin || referer)) {
            return res.status(403).json({ success: false, message: "Invalid Origin/Referer" });
        }
        
        return doubleCsrfProtection(req, res, next);
    }
    next();
});

// Routes Imports
const userRoutes = require('./routes/user.routes');
const companyRoutes = require('./routes/company.routes');
const internshipRoutes = require('./routes/internship.routes');
const applicationRoutes = require('./routes/application.routes');
const studentProfileRoutes = require('./routes/studentProfile.routes');
const reportRoutes = require('./routes/report.routes');
const attendanceRoutes = require('./routes/attendance.routes');
const adminRoutes = require('./routes/admin.routes');
const certificateRoutes = require('./routes/certificate.routes');
const facultyRoutes = require('./routes/faculty.routes');

// Route Declarations
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/companies', companyRoutes);
app.use('/api/v1/internships', internshipRoutes);
app.use('/api/v1/applications', applicationRoutes);
app.use('/api/v1/student-profiles', studentProfileRoutes);
app.use('/api/v1/reports', reportRoutes);
app.use('/api/v1/attendance', attendanceRoutes);
app.use('/api/v1/admin', adminRoutes);
app.use('/api/v1/certificates', certificateRoutes);
app.use('/api/v1/faculty', facultyRoutes);

// Root Route
app.get('/', (req, res) => {
    res.status(200).json({ success: true, message: "IMS API is running securely" });
});

// Centralized Error Handler (Must be at the end)
app.use(errorHandler);

module.exports = app;
