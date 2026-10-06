const { z } = require('zod');

const registerCompanySchema = z.object({
    body: z.object({
        name: z.string().trim().min(2).max(100),
        description: z.string().trim().min(1).max(2000),
        website: z.string().url().optional(),
        location: z.string().trim().min(1).max(200),
        industry: z.string().trim().max(100).optional(),
        hrName: z.string().trim().min(1).max(100),
    }),
});

module.exports = { registerCompanySchema };
