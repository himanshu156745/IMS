const { z } = require('zod');

const createInternshipSchema = z.object({
    body: z.object({
        title: z.string().min(1, "Title is required"),
        description: z.string().min(1, "Description is required"),
        requirements: z.string().min(1, "Requirements are required"),
        location: z.string().min(1, "Location is required"),
        stipend: z.number().optional().or(z.string()),
        duration: z.string().min(1, "Duration is required"),
        positions: z.number().min(1, "At least 1 position is required").or(z.string().regex(/^\d+$/, "Must be a number").transform(Number)),
        deadline: z.string().min(1, "Deadline is required")
    })
});

const updateInternshipSchema = z.object({
    body: z.object({
        title: z.string().optional(),
        description: z.string().optional(),
        requirements: z.string().optional(),
        location: z.string().optional(),
        stipend: z.number().optional().or(z.string().optional()),
        duration: z.string().optional(),
        positions: z.number().optional().or(z.string().regex(/^\d+$/, "Must be a number").transform(Number).optional()),
        deadline: z.string().optional(),
        status: z.enum(['open', 'closed']).optional()
    })
});

module.exports = {
    createInternshipSchema,
    updateInternshipSchema
};
