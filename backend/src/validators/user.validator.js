const { z } = require('zod');
const PASSWORD = require('../constants/password');

const registerSchema = z.object({
    body: z.object({
        email: z.string().email("Invalid email format"),
        password: z.string()
            .min(PASSWORD.MIN_LENGTH, PASSWORD.MESSAGE)
            .max(PASSWORD.MAX_LENGTH, PASSWORD.MESSAGE)
            .regex(PASSWORD.REGEX, PASSWORD.MESSAGE),
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
