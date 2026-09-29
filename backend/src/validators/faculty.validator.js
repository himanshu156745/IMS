const { z } = require('zod');

const updateFacultyProfileSchema = z.object({
    body: z.object({
        fullName: z.string().min(2, "Name must be at least 2 characters").max(50).optional(),
        department: z.string().min(2).max(100).optional(),
        designation: z.string().min(2).max(50).optional(),
        phoneNumber: z.string().regex(/^\+?[\d\s-]{10,15}$/, "Invalid phone number format").optional()
    })
});

module.exports = {
    updateFacultyProfileSchema
};
