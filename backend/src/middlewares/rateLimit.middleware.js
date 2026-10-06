const rateLimit = require('express-rate-limit');

let store;
if (process.env.NODE_ENV !== 'test' && process.env.REDIS_URL) {
    try {
        const { RedisStore } = require('rate-limit-redis');
        const { createClient } = require('redis');
        const redisClient = createClient({ url: process.env.REDIS_URL });
        redisClient.connect().catch(() => {});
        store = new RedisStore({ sendCommand: (...args) => redisClient.sendCommand(args) });
    } catch { store = undefined; }
}

const authIpLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, max: 10, store,
    message: { success: false, message: 'Too many auth attempts from this IP.' },
    standardHeaders: true, legacyHeaders: false,
});

const authEmailLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, max: 5, store,
    keyGenerator: (req) => (req.body?.email || '') + '_' + (req.ip || ''),
    message: { success: false, message: 'Too many auth attempts for this email.' },
    standardHeaders: true, legacyHeaders: false,
});

const writeLimiter = rateLimit({
    windowMs: 60 * 1000, max: 30, store,
    keyGenerator: (req) => 'w_' + (req.user?._id || req.ip || ''),
    message: { success: false, message: 'Too many write requests.' },
    standardHeaders: true, legacyHeaders: false,
});

const readLimiter = rateLimit({
    windowMs: 60 * 1000, max: 120, store,
    keyGenerator: (req) => 'r_' + (req.user?._id || req.ip || ''),
    message: { success: false, message: 'Too many read requests.' },
    standardHeaders: true, legacyHeaders: false,
});

const userRateLimiter = (req, res, next) => {
    if (['POST','PUT','PATCH','DELETE'].includes(req.method)) return writeLimiter(req, res, next);
    return readLimiter(req, res, next);
};

module.exports = { authIpLimiter, authEmailLimiter, userRateLimiter, store };
