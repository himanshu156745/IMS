const { z } = require('zod');

const markAttendanceSchema = z.object({
    params: z.object({
        internshipId: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid Internship ID")
    }),
    body: z.object({
        status: z.enum(['present', 'absent', 'leave']),
        remarks: z.string().optional()
    })
});

module.exports = {
    markAttendanceSchema
};
