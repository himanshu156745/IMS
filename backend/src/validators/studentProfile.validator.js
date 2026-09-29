const { z } = require('zod');

const upsertStudentProfileSchema = z.object({
    body: z.object({
        fullName: z.string().min(1, "Full Name is required"),
        phoneNumber: z.string().optional(),
        university: z.string().min(1, "University is required"),
        course: z.string().min(1, "Course is required"),
        semester: z.union([z.string(), z.number()]).optional(),
        skills: z.preprocess((val) => {
            if (!val) return val;
            if (Array.isArray(val)) return val;
            if (typeof val === 'string') {
                if (val.startsWith('[') && val.endsWith(']')) {
                    try { return JSON.parse(val); } catch(e) {}
                }
                return val.split(',').map(s => s.trim()).filter(Boolean);
            }
            return val;
        }, z.array(z.string())).optional(),
    })
});

module.exports = {
    upsertStudentProfileSchema
};
