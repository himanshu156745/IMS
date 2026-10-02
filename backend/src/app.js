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

const CSRF_EXEMPT_PREFIXES = [
    '/api/v1/users/login',
    '/api/v1/users/register',
    '/api/v1/users/forgot-password',
    '/api/v1/users/reset-password',
    '/api/v1/users/verify-email',
    '/api/v1/invite',
];

const isCsrfExempt = (path) =>
    CSRF_EXEMPT_PREFIXES.some((p) => path === p || path.startsWith(p + '/'));

const normalizeOrigin = (u) => { try { return new URL(u).origin; } catch { return null; } };

app.use((req, res, next) => {
    if (!['POST', 'PUT', 'PATCH', 'DELETE'].includes(req.method)) return next();
    if (isCsrfExempt(req.path)) return next();

    const rawOrigins = process.env.CORS_ORIGIN;
    const list = Array.isArray(rawOrigins)
        ? rawOrigins
        : (rawOrigins ? rawOrigins.split(',').map(s => s.trim()) : []);
    const fallback = ['http://localhost:5173', 'http://localhost:5174'];
    const allowed = new Set([...list, ...fallback].map(normalizeOrigin).filter(Boolean));

    const originOrigin = normalizeOrigin(req.headers.origin);
    const refererOrigin = req.headers.referer ? normalizeOrigin(req.headers.referer) : null;
    const hasOriginInfo = Boolean(originOrigin || refererOrigin);
    const ok = (originOrigin && allowed.has(originOrigin))
            || (refererOrigin && allowed.has(refererOrigin));

    if (hasOriginInfo && !ok) {
        return res.status(403).json({ success: false, message: "Invalid Origin/Referer" });
    }

    if (process.env.NODE_ENV === 'test') {
        return next();
    }

    return doubleCsrfProtection(req, res, next);
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
const interviewRoutes = require('./routes/interview.routes');
const inviteRoutes = require('./routes/invite.routes');
const notificationRoutes = require('./routes/notification.routes');
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
app.use('/api/v1/interviews', interviewRoutes);
app.use('/api/v1/invite', inviteRoutes);
app.use('/api/v1/notifications', notificationRoutes);
// Root Route
app.get('/', (req, res) => {
    res.status(200).json({ success: true, message: "IMS API is running securely" });
});

// Centralized Error Handler (Must be at the end)
app.use(errorHandler);

module.exports = app;
