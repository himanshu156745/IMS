const { z } = require('zod');

const markAttendanceSchema = z.object({
    body: z.object({
        status: z.enum(['present', 'absent', 'leave']),
        remarks: z.string().trim().max(500).optional(),
    }),
    params: z.object({ internshipId: z.string().min(1) }),
});

module.exports = { markAttendanceSchema };
