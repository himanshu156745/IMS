const { z } = require('zod');
const { ATTENDANCE_STATUS } = require('../constants/attendanceStatus');

const markAttendanceSchema = z.object({
    params: z.object({
        internshipId: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid Internship ID")
    }),
    body: z.object({
        status: z.enum(ATTENDANCE_STATUS),
        remarks: z.string().optional(),
        dateKey: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid dateKey format. Expected YYYY-MM-DD").optional()
    })
});

module.exports = {
    markAttendanceSchema
};
