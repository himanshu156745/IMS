process.env.JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret_32_chars_long_minimum';
const request = require('supertest');
const app = require('../src/app');
const mongoose = require('mongoose');
const User = require('../src/models/User.model');
const Internship = require('../src/models/Internship.model');
const Application = require('../src/models/Application.model');
const Report = require('../src/models/Report.model');
const Attendance = require('../src/models/Attendance.model');
const { MongoMemoryServer } = require('mongodb-memory-server');
const { APP_STATUS } = require('../src/constants/applicationStatus');

let mongoServer;
let token;
let studentId;
let internshipId;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());

    const student = await User.create({
        email: 'student.ignore@example.com',
        password: 'Password1!abcdef',
        role: 'student',
        emailVerified: true
    });
    studentId = student._id;

    const companyUser = await User.create({
        email: 'company.ignore@example.com',
        password: 'Password1!abcdef',
        role: 'company',
        emailVerified: true
    });

    const company = await mongoose.model('Company').create({
        user: companyUser._id,
        name: 'Test Company',
        description: 'A test company',
        location: 'Test Location',
        hrName: 'Test HR'
    });

    const internship = await Internship.create({
        title: 'Test Internship',
        company: company._id,
        description: 'Test description',
        positions: 5,
        location: 'Remote',
        requirements: ['React'],
        duration: 3,
        stipend: 5000,
        deadline: new Date(Date.now() + 86400000),
        status: 'open'
    });
    internshipId = internship._id;

    await Application.create({
        internship: internshipId,
        student: studentId,
        status: APP_STATUS.ACCEPTED,
        resumeUrl: 'https://example.com/resume.pdf'
    });

});

afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
});

describe('DateKey Ignore Client Input', () => {
    it('should ignore client provided dateKey for report submission and use system dateKey', async () => {
        const student = await User.findById(studentId);
        await Report.deleteMany({ student: student._id });

        token = student.generateAccessToken();

        const response = await request(app)
            .post(`/api/v1/reports/${internshipId}`)
            .set('Cookie', [`__Host-ims_session=${token}`])
            .send({
                taskDescription: 'This is a test description that is long enough for datekey bypass',
                hoursWorked: 5,
                dateKey: '2024-01-01'
            });

        expect(response.status).toBe(201);
        expect(response.body.data.dateKey).not.toBe('2024-01-01');
    });

    it('should ignore client provided dateKey for attendance mark and use system dateKey', async () => {
        const student = await User.findById(studentId);
        await Attendance.deleteMany({ student: student._id });

        token = student.generateAccessToken();
        const response = await request(app)
            .post(`/api/v1/attendance/${internshipId}`)
            .set('Cookie', [`__Host-ims_session=${token}`])
            .send({
                status: 'present',
                dateKey: '2024-01-01'
            });

        expect(response.status).toBe(201);
        expect(response.body.data.dateKey).not.toBe('2024-01-01');
    });
});
