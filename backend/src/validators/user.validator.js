const { z } = require('zod');

const registerSchema = z.object({
    body: z.object({
        email: z.string().email("Invalid email format"),
        password: z.string().min(6, "Password must be at least 6 characters long"),
        role: z.enum(['student', 'company'], {
            errorMap: () => ({ message: "Invalid role provided. Cannot register as admin or faculty directly." })
        })
    })
});

const loginSchema = z.object({
    body: z.object({
        email: z.string().email("Invalid email format"),
        password: z.string().min(1, "Password is required")
    })
});

module.exports = {
    registerSchema,
    loginSchema
};
