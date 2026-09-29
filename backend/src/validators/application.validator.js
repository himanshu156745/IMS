const { z } = require('zod');

const applyInternshipSchema = z.object({
    params: z.object({
        internshipId: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid Internship ID")
    }),
    body: z.object({
        resumeUrl: z.string().url("Must be a valid URL").refine((val) => val.startsWith('https://'), {
            message: "Resume URL must be a secure HTTPS link"
        }).optional(),
        coverLetter: z.string().optional()
    })
});

const updateApplicationStatusSchema = z.object({
    params: z.object({
        id: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid Application ID")
    }),
    body: z.object({
        status: z.enum(['pending', 'reviewed', 'shortlisted', 'rejected', 'accepted'])
    })
});

module.exports = {
    applyInternshipSchema,
    updateApplicationStatusSchema
};
