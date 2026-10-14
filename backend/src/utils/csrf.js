const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });

const { doubleCsrf } = require('csrf-csrf');
const jwt = require('jsonwebtoken');

if (!process.env.CSRF_SECRET || process.env.CSRF_SECRET.length < 32) {
    throw new Error("FATAL: CSRF_SECRET environment variable must be set with >= 32 characters.");
}

const { generateCsrfToken, doubleCsrfProtection } = doubleCsrf({
    getSecret: () => process.env.CSRF_SECRET,
    cookieName: 'XSRF-TOKEN',
    cookieOptions: {
        sameSite: 'strict',
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        httpOnly: false
    },
    size: 64,
    ignoredMethods: ['GET', 'HEAD', 'OPTIONS'],
    getTokenFromRequest: (req) => req.headers['x-csrf-token'] || req.headers['x-xsrf-token'],
    getSessionIdentifier: (req) => {
        const token = req.cookies?.['__Host-ims_session'] || req.cookies?.['ims_session'];
        if (token && process.env.JWT_SECRET) {
            try {
                const decoded = jwt.verify(token, process.env.JWT_SECRET, { algorithms: ['HS256'] });
                if (decoded && decoded.id) {
                    return decoded.id.toString();
                }
            } catch {
                // Fall back if verification fails
            }
        }
        return req.user?._id?.toString() || 'anonymous';
    }
});

module.exports = { generateCsrfToken, doubleCsrfProtection };
