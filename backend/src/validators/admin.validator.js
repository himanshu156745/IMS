const { z } = require('zod');

const toggleUserStatusSchema = z.object({
    body: z.object({ isActive: z.boolean() }),
    params: z.object({ id: z.string().min(1) }),
});

const updateCompanyVerificationSchema = z.object({
    body: z.object({
        verificationStatus: z.enum(['Pending', 'Verified', 'Suspended']),
    }),
    params: z.object({ id: z.string().min(1) }),
});

const createCompanySchema = z.object({
    body: z.object({
        email: z.string().trim().toLowerCase().email(),
        password: z.string().min(8).max(128).optional(),
        name: z.string().trim().min(2).max(100),
        description: z.string().trim().min(1).max(2000),
        website: z.string().url().optional(),
        location: z.string().trim().min(1).max(200),
        industry: z.string().trim().max(100).optional(),
        hrName: z.string().trim().min(1).max(100),
    }),
});

const updateCompanySchema = z.object({
    body: z.object({
        name: z.string().trim().min(2).max(100).optional(),
        description: z.string().trim().min(1).max(2000).optional(),
        website: z.string().url().optional(),
        location: z.string().trim().min(1).max(200).optional(),
        industry: z.string().trim().max(100).optional(),
        hrName: z.string().trim().min(1).max(100).optional(),
    }),
    params: z.object({ id: z.string().min(1) }),
});

module.exports = {
    toggleUserStatusSchema,
    updateCompanyVerificationSchema,
    createCompanySchema,
    updateCompanySchema,
};
