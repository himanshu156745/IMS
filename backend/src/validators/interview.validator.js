const { z } = require('zod');

const scheduleInterviewSchema = z.object({
    body: z.object({
        applicationId: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid Application ID"),
        date: z.string().min(1, "Date is required"),
        time: z.string().min(1, "Time is required"),
        mode: z.enum(['online', 'offline']),
        type: z.string().optional(),
        link: z.string().url("Invalid URL").refine(val => val.startsWith('https://'), "Link must be an HTTPS URL").optional().or(z.literal('')),
        location: z.string().optional(),
        notes: z.string().optional()
    })
});

const updateInterviewSchema = z.object({
    params: z.object({
        id: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid Interview ID")
    }),
    body: z.object({
        date: z.string().optional(),
        time: z.string().optional(),
        type: z.string().optional(),
        mode: z.enum(['online', 'offline']).optional(),
        link: z.string().url("Invalid URL").refine(val => val.startsWith('https://'), "Link must be an HTTPS URL").optional().or(z.literal('')),
        location: z.string().optional(),
        notes: z.string().optional(),
        status: z.string().optional()
    })
});

module.exports = {
    scheduleInterviewSchema,
    updateInterviewSchema
};
