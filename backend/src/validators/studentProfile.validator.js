const { z } = require('zod');

const skillsSchema = z.union([
    z.array(z.string().trim().max(100)),
    z.string(),
]);

const upsertStudentProfileSchema = z.object({
    body: z.object({
        fullName: z.string().trim().min(1).max(100),
        phoneNumber: z.string().trim().max(30).optional(),
        university: z.string().trim().min(1).max(200),
        course: z.string().trim().min(1).max(100),
        semester: z.coerce.number().int().min(1).max(12).optional(),
        skills: skillsSchema.optional(),
        branch: z.string().trim().max(100).optional(),
        cgpa: z.coerce.number().min(0).max(10).optional(),
        github: z.string().url().optional(),
        linkedin: z.string().url().optional(),
    }),
});

module.exports = { upsertStudentProfileSchema };
