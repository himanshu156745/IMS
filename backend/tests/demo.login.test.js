require('dotenv').config({ path: __dirname + '/../.env' });
const request = require('supertest');
const app = require('../src/app');
const mongoose = require('mongoose');
const User = require('../src/models/User.model');

describe('Login End-to-End Test', () => {
    beforeAll(async () => {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ims_test_login');
        await User.deleteMany({});
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    const testLoginForRole = async (role) => {
        const email = `test-${role}@example.com`;
        const password = 'password123';
        
        await User.create({
            email,
            password,
            role,
            isActive: true
        });

        const res = await request(app)
            .post('/api/v1/users/login')
            .send({ email, password });

        expect(res.status).toBe(200);
        
        // Assert Set-Cookie is present
        expect(res.headers['set-cookie']).toBeDefined();
        
        // Find the ims_session cookie
        const sessionCookie = res.headers['set-cookie'].find(c => c.startsWith('ims_session='));
        expect(sessionCookie).toBeDefined();
    };

    it('should login student and return ims_session cookie', async () => {
        await testLoginForRole('student');
    });

    it('should login company and return ims_session cookie', async () => {
        await testLoginForRole('company');
    });

    it('should login faculty and return ims_session cookie', async () => {
        await testLoginForRole('faculty');
    });

    it('should login admin and return ims_session cookie', async () => {
        await testLoginForRole('admin');
    });
});
