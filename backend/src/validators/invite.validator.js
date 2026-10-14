const { z } = require('zod');
const PASSWORD = require('../constants/password');

const verifyInviteSchema = z.object({
    params: z.object({
        token: z.string().min(1, "Token is required")
    })
});

const acceptInviteSchema = z.object({
    params: z.object({
        token: z.string().min(1, "Token is required")
    }),
    body: z.object({
        password: z.string().regex(PASSWORD.REGEX, PASSWORD.MESSAGE)
    })
});

module.exports = {
    verifyInviteSchema,
    acceptInviteSchema
};
