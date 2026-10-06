process.env.JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret_32_chars_long_minimum';
const request = require('supertest');
const app = require('../src/app');
const mongoose = require('mongoose');
const User = require('../src/models/User.model');
const Internship = require('../src/models/Internship.model');
const Application = require('../src/models/Application.model');
const Report = require('../src/models/Report.model');
const { MongoMemoryServer } = require('mongodb-memory-server');
const jwt = require('jsonwebtoken');
const { APP_STATUS } = require('../src/constants/applicationStatus');

let mongoServer;
let token;
let studentId;
let internshipId;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());

    const student = await User.create({
        email: 'student.datekey@example.com',
        password: 'Password1!abcdef',
        role: 'student',
        emailVerified: true
    });
    studentId = student._id;

    const companyUser = await User.create({
        email: 'company.datekey@example.com',
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

describe('DateKey Timezone Bug Fix (Task 2.6)', () => {
    let originalTz;

    beforeEach(async () => {
        originalTz = process.env.APP_TIMEZONE;
        process.env.APP_TIMEZONE = 'Asia/Kolkata';
        await Report.deleteMany({});
    });

    afterEach(() => {
        process.env.APP_TIMEZONE = originalTz;
        if (global.Date.name !== 'Date' || global.Date.toString().includes('OriginalDate')) {
            global.Date = Date;
        }
    });

    it('should compute dateKey in Asia/Kolkata timezone even if system is UTC', async () => {
        const OriginalDate = Date;
        global.Date = class extends OriginalDate {
            constructor(...args) {
                if (args.length === 0) {
                    super('2026-10-15T17:30:00.000Z');
                } else {
                    super(...args);
                }
            }
            static now() {
                return new OriginalDate('2026-10-15T17:30:00.000Z').getTime();
            }
        };
        
        const student = await User.findById(studentId);
        token = student.generateAccessToken();

        const response = await request(app)
            .post(`/api/v1/reports/${internshipId}`)
            .set('Cookie', [`__Host-ims_session=${token}`])
            .send({
                taskDescription: 'This is a test description that is long enough',
                hoursWorked: 5
            });

        expect(response.status).toBe(201);
        expect(response.body.data.dateKey).toBe('2026-10-15');

        // Fast forward 8 hours to 01:30 UTC on 2026-10-16.
        // In Asia/Kolkata, this is 07:00 on 2026-10-16.
        global.Date = class extends OriginalDate {
            constructor(...args) {
                if (args.length === 0) {
                    super('2026-10-16T01:30:00.000Z');
                } else {
                    super(...args);
                }
            }
            static now() {
                return new OriginalDate('2026-10-16T01:30:00.000Z').getTime();
            }
        };
        
        const student2 = await User.findById(studentId);
        token = student2.generateAccessToken();

        const response2 = await request(app)
            .post(`/api/v1/reports/${internshipId}`)
            .set('Cookie', [`__Host-ims_session=${token}`])
            .send({
                taskDescription: 'Another test description that is long enough',
                hoursWorked: 5
            });

        expect(response2.status).toBe(201);
        expect(response2.body.data.dateKey).toBe('2026-10-16');

        global.Date = OriginalDate;
    });
});
