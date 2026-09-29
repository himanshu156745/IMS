const { z } = require('zod');

const upsertStudentProfileSchema = z.object({
    body: z.object({
        fullName: z.string().min(1, "Full Name is required"),
        phoneNumber: z.string().optional(),
        university: z.string().min(1, "University is required"),
        course: z.string().min(1, "Course is required"),
        semester: z.string().optional().or(z.number().optional()), // formData sends string
        skills: z.string().optional().or(z.array(z.string()).optional()), // can be JSON string or array
    })
});

module.exports = {
    upsertStudentProfileSchema
};
