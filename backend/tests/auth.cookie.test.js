const request = require('supertest');
const express = require('express');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const { verifyJWT } = require('../src/middlewares/auth.middleware');
const User = require('../src/models/User.model');

jest.mock('../src/models/User.model');

describe('Cookie Name Fix (Check 2)', () => {
    let app;
    
    beforeAll(() => {
        process.env.JWT_SECRET = 'testsecret123456789012345678901234567890';
        
        app = express();
        app.use(cookieParser());
        
        app.get('/test-auth', verifyJWT, (req, res) => {
            res.status(200).json({ success: true, user: req.user });
        });
        
        // Mock user
        User.findById.mockImplementation((id) => {
            return {
                select: () => {
                    if (id === 'user123') return Promise.resolve({ _id: 'user123', isActive: true, role: 'student' });
                    return Promise.resolve(null);
                }
            };
        });
    });

    it('auth middleware should read __Host-ims_session', async () => {
        const token = jwt.sign({ id: 'user123' }, process.env.JWT_SECRET, { algorithm: 'HS256' });
        
        const res = await request(app)
            .get('/test-auth')
            .set('Cookie', [`__Host-ims_session=${token}`]);
            
        expect(res.statusCode).toBe(200);
        expect(res.body.success).toBe(true);
    });

    it('auth middleware should read ims_session', async () => {
        const token = jwt.sign({ id: 'user123' }, process.env.JWT_SECRET, { algorithm: 'HS256' });
        
        const res = await request(app)
            .get('/test-auth')
            .set('Cookie', [`ims_session=${token}`]);
            
        expect(res.statusCode).toBe(200);
        expect(res.body.success).toBe(true);
    });
});
