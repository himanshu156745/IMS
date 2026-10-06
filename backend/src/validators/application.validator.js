const { z } = require('zod');

const applyInternshipSchema = z.object({
    body: z.object({
        resumeUrl: z.string().url().optional(),
        coverLetter: z.string().trim().max(2000).optional(),
    }),
    params: z.object({ internshipId: z.string().min(1) }),
});

const updateApplicationStatusSchema = z.object({
    body: z.object({
        status: z.enum(['reviewed', 'accepted', 'rejected']),
    }),
    params: z.object({ id: z.string().min(1) }),
});

module.exports = { applyInternshipSchema, updateApplicationStatusSchema };
