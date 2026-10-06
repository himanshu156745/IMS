const { z } = require('zod');

const submitReportSchema = z.object({
    body: z.object({
        taskDescription: z.string().trim().min(20).max(2000),
        hoursWorked: z.coerce.number().min(1).max(12),
    }),
    params: z.object({ internshipId: z.string().min(1) }),
});

const evaluateReportSchema = z.object({
    body: z.object({
        status: z.enum(['approved', 'rejected']),
        facultyFeedback: z.string().trim().max(2000).optional(),
    }),
    params: z.object({ id: z.string().min(1) }),
});

module.exports = { submitReportSchema, evaluateReportSchema };
