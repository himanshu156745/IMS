const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
process.env.NODE_ENV = 'test';
process.env.JWT_SECRET = 'supersecretlongpassword1234567890';
const request = require('supertest');
const app = require('../src/app');
const User = require('../src/models/User.model');
const Internship = require('../src/models/Internship.model');
const Application = require('../src/models/Application.model');
const Certificate = require('../src/models/Certificate.model');
const FacultyProfile = require('../src/models/FacultyProfile.model');
const Company = require('../src/models/Company.model');
const { USER_ROLES } = require('../src/constants/roles');
const { APP_STATUS } = require('../src/constants/applicationStatus');

describe('Certificate issue and revocation (Check 5 & Task 2.16)', () => {
    jest.setTimeout(30000);
    let mongoServer, faculty, student, facultyToken, internship, application, facultyProfile;

    beforeAll(async () => {
        mongoServer = await MongoMemoryServer.create();
        await mongoose.connect(mongoServer.getUri());

        faculty = await User.create({
            email: `faculty_${Date.now()}@test.com`,
            password: 'Password123!',
            role: USER_ROLES.FACULTY,
            emailVerified: true
        });

        student = await User.create({
            email: `student_${Date.now()}@test.com`,
            password: 'Password123!',
            role: USER_ROLES.STUDENT,
            emailVerified: true
        });

        facultyProfile = await FacultyProfile.create({
            user: faculty._id,
            fullName: 'Test Faculty',
            employeeId: 'EMP-12345',
            department: 'CS',
            designation: 'Professor',
            assignedStudents: [student._id]
        });

        const companyUser = await User.create({
            email: `comp_${Date.now()}@test.com`,
            password: 'Password123!',
            role: USER_ROLES.COMPANY,
            emailVerified: true
        });

        const company = await Company.create({
            user: companyUser._id,
            name: 'Test Company',
            industry: 'IT',
            location: 'Test Location',
            description: 'Test Description',
            hrName: 'Test HR'
        });

        internship = await Internship.create({
            title: 'Certificate Test Internship',
            company: company._id,
            description: 'Test Description',
            location: 'Remote',
            stipend: 1000,
            duration: '3 Months',
            positions: 5,
            deadline: new Date(Date.now() + 86400000),
            requirements: ['Node.js'],
            mentor: faculty._id
        });

        application = await Application.create({
            student: student._id,
            internship: internship._id,
            status: APP_STATUS.ACCEPTED,
            resumeUrl: 'https://cloudinary.com/resume.pdf'
        });

        facultyToken = faculty.generateAccessToken();
    });

    afterAll(async () => {
        await mongoose.disconnect();
        await mongoServer.stop();
    });

    let certId;

    it('Faculty issues certificate to their assigned student (Check 5)', async () => {
        const res = await request(app)
            .post(`/api/v1/certificates/${internship._id}/issue`)
            .set('Authorization', `Bearer ${facultyToken}`)
            .send({
                studentId: student._id.toString(), // Sent as string
                certificateUrl: 'https://cloudinary.com/cert.pdf'
            });

        expect(res.statusCode).toBe(201);
        expect(res.body.data.certificateId).toBeTruthy();
        certId = res.body.data.certificateId;
    });

    it('Faculty revokes the certificate (Task 2.16)', async () => {
        const cert = await Certificate.findOne({ certificateId: certId });
        const res = await request(app)
            .post(`/api/v1/certificates/${cert._id}/revoke`)
            .set('Authorization', `Bearer ${facultyToken}`)
            .send({
                revocationReason: 'Academic Misconduct'
            });

        expect(res.statusCode).toBe(200);
        expect(res.body.data.revokedAt).toBeTruthy();
        expect(res.body.data.revocationReason).toBe('Academic Misconduct');
    });

    it('Verify certificate returns valid: false for revoked certificate (Task 2.16)', async () => {
        const res = await request(app)
            .get(`/api/v1/certificates/verify/${certId}`);

        expect(res.statusCode).toBe(200);
        expect(res.body.data.valid).toBe(false);
        expect(res.body.data.revocationReason).toBe('Academic Misconduct');
    });
});
