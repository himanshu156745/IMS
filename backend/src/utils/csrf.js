const { doubleCsrf } = require('csrf-csrf');

const { generateCsrfToken, doubleCsrfProtection } = doubleCsrf({
    getSecret: () => process.env.CSRF_SECRET,
    cookieName: 'XSRF-TOKEN',
    cookieOptions: {
        sameSite: 'strict',
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        httpOnly: false // Important! We want frontend to read it
    },
    size: 64,
    ignoredMethods: ['GET', 'HEAD', 'OPTIONS'],
    getTokenFromRequest: (req) => req.headers['x-csrf-token'],
    getSessionIdentifier: (req) => req.cookies['__Host-ims_session'] || req.cookies['ims_session'] || req.cookies['token'] || 'guest-session'
});

module.exports = { generateCsrfToken, doubleCsrfProtection };
