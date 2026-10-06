const { z } = require('zod');

const registerSchema = z.object({
    body: z.object({
        email: z.string().trim().toLowerCase().email(),
        password: z.string().min(8).max(128),
        role: z.enum(['student', 'company']),
    }),
});

const loginSchema = z.object({
    body: z.object({
        email: z.string().trim().toLowerCase().email(),
        password: z.string().min(1),
    }),
});

module.exports = { registerSchema, loginSchema };
