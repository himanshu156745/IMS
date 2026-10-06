const { z } = require('zod');

const updateFacultyProfileSchema = z.object({
    body: z.object({
        fullName: z.string().trim().min(1).max(100).optional(),
        department: z.string().trim().min(1).max(100).optional(),
        designation: z.string().trim().min(1).max(100).optional(),
        phoneNumber: z.string().trim().max(30).optional(),
    }),
});

module.exports = { updateFacultyProfileSchema };
