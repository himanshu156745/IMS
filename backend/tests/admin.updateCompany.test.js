process.env.JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret_32_chars_long_minimum';
const request = require('supertest');
const app = require('../src/app');
const mongoose = require('mongoose');
const User = require('../src/models/User.model');
const { MongoMemoryServer } = require('mongodb-memory-server');
const jwt = require('jsonwebtoken');

let mongoServer;
let adminToken;
let companyId;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());

    const admin = await User.create({
        email: 'admin.update@example.com',
        password: 'Password1!abcdef',
        role: 'admin',
        emailVerified: true
    });

    const companyUser = await User.create({
        email: 'company.update@example.com',
        password: 'Password1!abcdef',
        role: 'company',
        emailVerified: true
    });

    const company = await mongoose.model('Company').create({
        user: companyUser._id,
        name: 'Test Company',
        description: 'A test company',
        location: 'Test Location',
        hrName: 'Test HR',
        verificationStatus: 'Pending'
    });
    companyId = company._id;

    adminToken = jwt.sign(
        { id: admin._id, role: admin.role, tokenVersion: admin.tokenVersion },
        process.env.JWT_SECRET || 'fallback_secret_32_chars_long_minimum',
        { algorithm: 'HS256', issuer: 'ims-backend', audience: 'ims-frontend', expiresIn: '15m', jwtid: require('crypto').randomUUID() }
    );
});

afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
});

describe('Admin Update Company (Task 2.8)', () => {
    it('should reject verificationStatus mass assignment', async () => {
        const res = await request(app)
            .put(`/api/v1/admin/companies/${companyId}`)
            .set('Cookie', [`__Host-ims_session=${adminToken}`])
            .send({
                name: 'New Name',
                verificationStatus: 'verified'
            });

        expect(res.status).toBe(400);
        expect(res.body.message).toContain('Cannot update restricted fields');

        // Check it actually wasn't updated
        const company = await mongoose.model('Company').findById(companyId);
        expect(company.verificationStatus).toBe('Pending');
    });

    it('should allow updating valid fields', async () => {
        const res = await request(app)
            .put(`/api/v1/admin/companies/${companyId}`)
            .set('Cookie', [`__Host-ims_session=${adminToken}`])
            .send({
                name: 'Updated Name',
                location: 'New Location'
            });

        expect(res.status).toBe(200);
        expect(res.body.data.name).toBe('Updated Name');
    });
});
