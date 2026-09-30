const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
process.env.NODE_ENV = 'test';
process.env.JWT_SECRET = 'supersecretlongpassword1234567890';
const request = require('supertest');
const app = require('../src/app');
const User = require('../src/models/User.model');
const Internship = require('../src/models/Internship.model');
const Application = require('../src/models/Application.model');
const Attendance = require('../src/models/Attendance.model');
const AuditLog = require('../src/models/AuditLog.model');
const { USER_ROLES } = require('../src/constants/roles');
const { generateDateKey } = require('../src/utils/dateUtils');
const { APP_STATUS } = require('../src/constants/applicationStatus');
const { ATTENDANCE_STATUS_MAP } = require('../src/constants/attendanceStatus');

describe('Attendance Override (Task 2.12)', () => {
    jest.setTimeout(30000);
    let mongoServer, studentToken, facultyToken, facultyBToken, student, faculty, facultyB, internship, internship2, application, attendance;

    beforeAll(async () => {
        mongoServer = await MongoMemoryServer.create();
        await mongoose.connect(mongoServer.getUri());

        student = await User.create({
            email: `student_${Date.now()}@test.com`,
            password: 'Password123!',
            role: USER_ROLES.STUDENT,
            emailVerified: true
        });
        
        faculty = await User.create({
            email: `faculty_${Date.now()}@test.com`,
            password: 'Password123!',
            role: USER_ROLES.FACULTY,
            emailVerified: true
        });

        internship = await Internship.create({
            title: 'Test Internship',
            company: new mongoose.Types.ObjectId(), // dummy
            description: 'Test Description',
            location: 'Remote',
            stipend: 1000,
            duration: '3 Months',
            positions: 5,
            deadline: new Date(Date.now() + 100000),
            requirements: ['React'],
            mentor: faculty._id
        });

        application = await Application.create({
            student: student._id,
            internship: internship._id,
            status: APP_STATUS.ACCEPTED,
            resumeUrl: 'https://cloudinary.com/resume.pdf'
        });

        facultyB = await User.create({
            email: `facultyB_${Date.now()}@test.com`,
            password: 'Password123!',
            role: USER_ROLES.FACULTY,
            emailVerified: true
        });

        internship2 = await Internship.create({
            title: 'Test Internship 2',
            company: new mongoose.Types.ObjectId(), // dummy
            description: 'Test Description',
            location: 'Remote',
            stipend: 1000,
            duration: '3 Months',
            positions: 5,
            deadline: new Date(Date.now() + 100000),
            requirements: ['React'],
            mentor: facultyB._id
        });

        studentToken = student.generateAccessToken();
        facultyToken = faculty.generateAccessToken();
        facultyBToken = facultyB.generateAccessToken();
    });

    afterAll(async () => {
        await mongoose.disconnect();
        await mongoServer.stop();
    });

    it("should allow student to update today's attendance and log it", async () => {
        const today = generateDateKey(new Date());
        
        // Mark initial attendance
        attendance = await Attendance.create({
            student: student._id,
            internship: internship._id,
            dateKey: today,
            status: ATTENDANCE_STATUS_MAP.PRESENT
        });

        const res = await request(app)
            .patch(`/api/v1/attendance/${attendance._id}`)
            .set('Authorization', `Bearer ${studentToken}`)
            .send({ status: ATTENDANCE_STATUS_MAP.ABSENT });

        expect(res.statusCode).toBe(200);
        expect(res.body.data.status).toBe(ATTENDANCE_STATUS_MAP.ABSENT);

        // Verify Audit Log
        const log = await AuditLog.findOne({
            event: 'ATTENDANCE_OVERRIDE',
            userId: student._id
        });
        expect(log).toBeTruthy();
        expect(log.metadata.action).toBe('updateMyAttendance');
    });

    it('should allow faculty to override any attendance and log it', async () => {
        const pastDateKey = '2023-10-01';

        const res = await request(app)
            .patch(`/api/v1/attendance/${internship._id}/override`)
            .set('Authorization', `Bearer ${facultyToken}`)
            .send({
                studentId: student._id.toString(),
                dateKey: pastDateKey,
                status: ATTENDANCE_STATUS_MAP.PRESENT,
                remarks: 'Corrected by faculty'
            });

        expect(res.statusCode).toBe(200);
        expect(res.body.data.status).toBe(ATTENDANCE_STATUS_MAP.PRESENT);

        // Verify Audit Log
        const log = await AuditLog.findOne({
            event: 'ATTENDANCE_OVERRIDE',
            userId: faculty._id,
            'metadata.dateKey': pastDateKey
        });
        expect(log).toBeTruthy();
        expect(log.metadata.action).toBe('overrideAttendance');
    });

    it('should NOT allow unassigned faculty (facultyB) to override internship1 attendance', async () => {
        const pastDateKey = '2023-10-01';

        const res = await request(app)
            .patch(`/api/v1/attendance/${internship._id}/override`)
            .set('Authorization', `Bearer ${facultyBToken}`)
            .send({
                studentId: student._id.toString(),
                dateKey: pastDateKey,
                status: ATTENDANCE_STATUS_MAP.PRESENT,
                remarks: 'Hacked by facultyB'
            });

        expect(res.statusCode).toBe(403);
    });
});
