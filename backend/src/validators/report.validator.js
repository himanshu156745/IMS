const { z } = require('zod');
const { REPORT_STATUS } = require('../constants/reportStatus');

const submitReportSchema = z.object({
    params: z.object({
        internshipId: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid Internship ID")
    }),
    body: z.object({
        taskDescription: z.string().min(20, "Please provide a detailed description (min 20 characters)").max(2000, "Description is too long"),
        hoursWorked: z.number().min(1, "Hours worked must be at least 1").max(12, "Hours worked cannot exceed 12 per day").or(z.string().regex(/^\d+(\.\d+)?$/, "Must be a valid number").transform(Number).refine(n => n >= 1 && n <= 12, { message: "Hours must be between 1 and 12" })),
        dateKey: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid dateKey format. Expected YYYY-MM-DD").optional()
    })
});

const evaluateReportSchema = z.object({
    params: z.object({
        id: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid Report ID")
    }),
    body: z.object({
        status: z.enum(REPORT_STATUS),
        facultyFeedback: z.string().optional()
    })
});

module.exports = {
    submitReportSchema,
    evaluateReportSchema
};
