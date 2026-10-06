const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
process.env.NODE_ENV = 'test';
process.env.JWT_SECRET = 'supersecretlongpassword1234567890';
const request = require('supertest');
const app = require('../src/app');
const User = require('../src/models/User.model');
const Internship = require('../src/models/Internship.model');
const Application = require('../src/models/Application.model');
const Interview = require('../src/models/Interview.model');
const Notification = require('../src/models/Notification.model');
const { USER_ROLES } = require('../src/constants/roles');
const { APP_STATUS } = require('../src/constants/applicationStatus');

describe('Interview Controller (Task 2.15)', () => {
    jest.setTimeout(30000);
    let mongoServer, company, companyB, student, companyToken, companyBToken, studentToken, internship, application, companyProfile, companyBProfile;

    beforeAll(async () => {
        mongoServer = await MongoMemoryServer.create();
        await mongoose.connect(mongoServer.getUri());

        company = await User.create({
            email: `company_${Date.now()}@test.com`,
            password: 'Password123!',
            role: USER_ROLES.COMPANY,
            emailVerified: true
        });

        student = await User.create({
            email: `student_${Date.now()}@test.com`,
            password: 'Password123!',
            role: USER_ROLES.STUDENT,
            emailVerified: true
        });

        companyB = await User.create({
            email: `companyB_${Date.now()}@test.com`,
            password: 'Password123!',
            role: USER_ROLES.COMPANY,
            emailVerified: true
        });

        const Company = require('../src/models/Company.model');
        companyProfile = await Company.create({
            user: company._id,
            name: 'Test Company',
            hrName: 'HR Test',
            description: 'Test Desc',
            location: 'Test Location'
        });

        companyBProfile = await Company.create({
            user: companyB._id,
            name: 'Test Company B',
            hrName: 'HR Test B',
            description: 'Test Desc B',
            location: 'Test Location B'
        });

        internship = await Internship.create({
            title: 'Interview Test Internship',
            company: companyProfile._id,
            description: 'Test Description',
            location: 'Remote',
            stipend: 1000,
            duration: '3 Months',
            positions: 5,
            deadline: new Date(Date.now() + 86400000),
            requirements: ['Node.js']
        });

        application = await Application.create({
            student: student._id,
            internship: internship._id,
            status: APP_STATUS.SHORTLISTED,
            resumeUrl: 'https://cloudinary.com/resume.pdf'
        });

        companyToken = company.generateAccessToken();
        studentToken = student.generateAccessToken();
        companyBToken = companyB.generateAccessToken();
    });

    afterAll(async () => {
        await mongoose.disconnect();
        await mongoServer.stop();
    });

    let createdInterviewId;

    it('POST /interviews — company schedules interview', async () => {
        const res = await request(app)
            .post('/api/v1/interviews')
            .set('Authorization', `Bearer ${companyToken}`)
            .send({
                applicationId: application._id.toString(),
                date: '2026-08-15',
                time: '14:30',
                type: 'technical',
                mode: 'online',
                link: 'https://meet.google.com/abc-def'
            });

        expect(res.statusCode).toBe(201);
        expect(res.body.data.student.toString()).toBe(student._id.toString());
        expect(res.body.data.time).toBe('14:30');
        createdInterviewId = res.body.data._id;

        // Verify student got notified
        const notif = await Notification.findOne({ recipient: student._id, title: 'Interview Scheduled' });
        expect(notif).toBeTruthy();
    });

    it('POST /interviews — unassigned company (companyB) cannot schedule interview for company', async () => {
        const res = await request(app)
            .post('/api/v1/interviews')
            .set('Authorization', `Bearer ${companyBToken}`)
            .send({
                applicationId: application._id.toString(),
                date: '2026-08-15',
                time: '14:30',
                type: 'technical',
                mode: 'online',
                link: 'https://meet.google.com/abc-def'
            });

        expect(res.statusCode).toBe(403);
    });

    it('GET /interviews/me — student sees their interview', async () => {
        const res = await request(app)
            .get('/api/v1/interviews/me')
            .set('Authorization', `Bearer ${studentToken}`);

        expect(res.statusCode).toBe(200);
        expect(res.body.data.data).toHaveLength(1);
        expect(res.body.data.data[0]._id).toBe(createdInterviewId);
    });

    it('PATCH /interviews/:id — company updates interview', async () => {
        const res = await request(app)
            .patch(`/api/v1/interviews/${createdInterviewId}`)
            .set('Authorization', `Bearer ${companyToken}`)
            .send({ time: '16:00', notes: 'Rescheduled' });

        expect(res.statusCode).toBe(200);
        expect(res.body.data.time).toBe('16:00');
        expect(res.body.data.notes).toBe('Rescheduled');
    });

    it('PATCH /interviews/:id — unassigned company (companyB) cannot update interview', async () => {
        const res = await request(app)
            .patch(`/api/v1/interviews/${createdInterviewId}`)
            .set('Authorization', `Bearer ${companyBToken}`)
            .send({ time: '17:00' });

        expect(res.statusCode).toBe(403);
    });

    it('DELETE /interviews/:id — unassigned company (companyB) cannot delete interview', async () => {
        const res = await request(app)
            .delete(`/api/v1/interviews/${createdInterviewId}`)
            .set('Authorization', `Bearer ${companyBToken}`);

        expect(res.statusCode).toBe(403);
    });

    it('DELETE /interviews/:id — company cancels interview', async () => {
        const res = await request(app)
            .delete(`/api/v1/interviews/${createdInterviewId}`)
            .set('Authorization', `Bearer ${companyToken}`);

        expect(res.statusCode).toBe(200);

        // Verify deleted
        const deleted = await Interview.findById(createdInterviewId);
        expect(deleted).toBeNull();

        // Verify cancellation notification
        const notif = await Notification.findOne({ recipient: student._id, title: 'Interview Cancelled' });
        expect(notif).toBeTruthy();
    });
});
