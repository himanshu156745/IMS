const { doubleCsrf } = require('csrf-csrf');

const { generateToken, doubleCsrfProtection } = doubleCsrf({
    getSecret: () => process.env.CSRF_SECRET || 'super-secret-csrf-key-12345678901234567890',
    cookieName: 'XSRF-TOKEN',
    cookieOptions: {
        sameSite: 'strict',
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        httpOnly: false // Important! We want frontend to read it
    },
    size: 64,
    ignoredMethods: ['GET', 'HEAD', 'OPTIONS'],
    getTokenFromRequest: (req) => req.headers['x-csrf-token']
});

module.exports = { generateToken, doubleCsrfProtection };
