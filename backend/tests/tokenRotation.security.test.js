require('dotenv').config({ path: __dirname + '/../.env' });
const request = require('supertest');
const express = require('express');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const mongoose = require('mongoose');

const User = require('../src/models/User.model');
const RefreshToken = require('../src/models/RefreshToken.model');
const { loginUser, logoutUser, refreshAccessToken } = require('../src/controllers/user.controller');
const { verifyJWT } = require('../src/middlewares/auth.middleware');
const { errorHandler } = require('../src/middlewares/error.middleware');

describe('HIGH-01: Broken Access Token Revocation and Refresh Token Rotation', () => {
    let app;
    let testUser;
    const testPassword = 'Password123!';
    const testEmail = `token-rotation-${Date.now()}@test.com`;

    beforeAll(async () => {
        process.env.JWT_SECRET = process.env.JWT_SECRET || 'test_super_secret_jwt_key_minimum_32_chars';
        process.env.JWT_EXPIRES_IN = '15m';
        process.env.CSRF_SECRET = process.env.CSRF_SECRET || 'test_csrf_secret_minimum_32_chars_12345';

        if (mongoose.connection.readyState === 0) {
            await mongoose.connect(process.env.MONGODB_URI);
        }

        app = express();
        app.use(express.json());
        app.use(cookieParser());

        app.post('/api/users/login', loginUser);
        app.post('/api/users/logout', (req, res, next) => {
            verifyJWT(req, res, () => {
                next();
            });
        }, logoutUser);
        app.post('/api/users/refresh-token', refreshAccessToken);
        app.get('/api/users/protected', verifyJWT, (req, res) => {
            res.status(200).json({ success: true, user: req.user });
        });

        app.use(errorHandler);

        testUser = await User.create({
            email: testEmail,
            password: testPassword,
            role: 'student',
            isActive: true,
            tokenVersion: 0
        });
    });

    afterAll(async () => {
        if (testUser) {
            await User.deleteOne({ _id: testUser._id });
            await RefreshToken.deleteMany({ userId: testUser._id });
        }
        await mongoose.connection.close();
    });

    it('1. should generate access tokens with 15-minute lifespan and embedded tokenVersion', () => {
        const token = testUser.generateAccessToken();
        const decoded = jwt.decode(token);

        expect(decoded).toBeDefined();
        expect(decoded.id.toString()).toBe(testUser._id.toString());
        expect(decoded.tokenVersion).toBe(0);

        // Expiry should be approximately 15 minutes (900 seconds) from now
        const lifespanSeconds = decoded.exp - decoded.iat;
        expect(lifespanSeconds).toBe(15 * 60);
    });

    it('2. should set both access and refresh cookies upon login and persist hashed token in DB', async () => {
        const res = await request(app)
            .post('/api/users/login')
            .send({ email: testEmail, password: testPassword });

        expect(res.statusCode).toBe(200);
        expect(res.body.success).toBe(true);

        const cookies = res.headers['set-cookie'];
        expect(cookies).toBeDefined();
        const hasAccessCookie = cookies.some(c => c.includes('ims_session='));
        const hasRefreshCookie = cookies.some(c => c.includes('ims_refresh='));
        expect(hasAccessCookie).toBe(true);
        expect(hasRefreshCookie).toBe(true);

        const dbTokens = await RefreshToken.find({ userId: testUser._id });
        expect(dbTokens.length).toBeGreaterThanOrEqual(1);
    });

    it('3. should rotate refresh token and issue new access token on valid refresh request', async () => {
        const loginRes = await request(app)
            .post('/api/users/login')
            .send({ email: testEmail, password: testPassword });

        const cookies = loginRes.headers['set-cookie'];
        const refreshCookie = cookies.find(c => c.includes('ims_refresh=')).split(';')[0];
        const rawRefreshToken = refreshCookie.split('=')[1];

        const refreshRes = await request(app)
            .post('/api/users/refresh-token')
            .set('Cookie', [refreshCookie]);

        expect(refreshRes.statusCode).toBe(200);
        expect(refreshRes.body.success).toBe(true);

        // The old refresh token must be revoked and linked to new token in DB
        const oldHashed = crypto.createHash('sha256').update(rawRefreshToken).digest('hex');
        const oldTokenDoc = await RefreshToken.findOne({ hashedToken: oldHashed });
        expect(oldTokenDoc.revokedAt).toBeDefined();
        expect(oldTokenDoc.replacedBy).toBeDefined();

        // A new refresh token must exist in DB
        const newHashed = oldTokenDoc.replacedBy;
        const newTokenDoc = await RefreshToken.findOne({ hashedToken: newHashed });
        expect(newTokenDoc).toBeDefined();
        expect(newTokenDoc.revokedAt).toBeUndefined();
    });

    it('4. should trigger reuse detection and revoke all sessions if an old refresh token is reused', async () => {
        const loginRes = await request(app)
            .post('/api/users/login')
            .send({ email: testEmail, password: testPassword });

        const cookies = loginRes.headers['set-cookie'];
        const initialRefreshCookie = cookies.find(c => c.includes('ims_refresh=')).split(';')[0];

        // Refresh once (initial token is now revoked)
        await request(app)
            .post('/api/users/refresh-token')
            .set('Cookie', [initialRefreshCookie]);

        // Attempt to reuse initial token (simulating attacker with intercepted old token)
        const reuseRes = await request(app)
            .post('/api/users/refresh-token')
            .set('Cookie', [initialRefreshCookie]);

        expect(reuseRes.statusCode).toBe(403);
        expect(reuseRes.body.message).toContain("Compromised token reuse detected");

        // Verify user tokenVersion was incremented
        const updatedUser = await User.findById(testUser._id);
        expect(updatedUser.tokenVersion).toBeGreaterThan(0);

        // All active refresh tokens for user must now be revoked
        const activeTokens = await RefreshToken.find({ userId: testUser._id, revokedAt: null });
        expect(activeTokens.length).toBe(0);
    });

    it('5. should increment tokenVersion on logout and immediately invalidate prior access tokens', async () => {
        const loginRes = await request(app)
            .post('/api/users/login')
            .send({ email: testEmail, password: testPassword });

        const cookies = loginRes.headers['set-cookie'];
        const accessCookie = cookies.find(c => c.includes('ims_session=')).split(';')[0];
        const refreshCookie = cookies.find(c => c.includes('ims_refresh=')).split(';')[0];

        // Access protected route before logout - should succeed
        const beforeRes = await request(app)
            .get('/api/users/protected')
            .set('Cookie', [accessCookie]);
        expect(beforeRes.statusCode).toBe(200);

        const currentVersion = (await User.findById(testUser._id)).tokenVersion;

        // Logout
        const logoutRes = await request(app)
            .post('/api/users/logout')
            .set('Cookie', [accessCookie, refreshCookie]);
        expect(logoutRes.statusCode).toBe(200);

        // Verify tokenVersion incremented in DB
        const updatedUser = await User.findById(testUser._id);
        expect(updatedUser.tokenVersion).toBe(currentVersion + 1);

        // Try using the same access token after logout - must be rejected with 401
        const afterRes = await request(app)
            .get('/api/users/protected')
            .set('Cookie', [accessCookie]);
        expect(afterRes.statusCode).toBe(401);
        expect(afterRes.body.message).toContain("Session expired or revoked");
    });
});
