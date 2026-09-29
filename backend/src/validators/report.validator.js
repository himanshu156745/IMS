const { z } = require('zod');

const submitReportSchema = z.object({
    params: z.object({
        internshipId: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid Internship ID")
    }),
    body: z.object({
        taskDescription: z.string().min(1, "Task description is required"),
        hoursWorked: z.number().min(0.5, "Minimum half an hour required").max(24, "Invalid hours").or(z.string().regex(/^\d+(\.\d+)?$/, "Must be a valid number").transform(Number))
    })
});

const evaluateReportSchema = z.object({
    params: z.object({
        id: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid Report ID")
    }),
    body: z.object({
        status: z.enum(['approved', 'rejected']),
        facultyFeedback: z.string().optional()
    })
});

module.exports = {
    submitReportSchema,
    evaluateReportSchema
};
