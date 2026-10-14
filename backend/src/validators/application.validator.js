const { z } = require('zod');

const CLOUDINARY_HOST = 'res.cloudinary.com';

const isValidResumeUrl = (urlStr) => {
    try {
        const parsed = new URL(urlStr);
        return parsed.protocol === 'https:' && parsed.hostname === CLOUDINARY_HOST;
    } catch {
        return false;
    }
};

const applyInternshipSchema = z.object({
    params: z.object({
        internshipId: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid Internship ID")
    }),
    body: z.object({
        resumeUrl: z.string().url("Must be a valid URL").refine(isValidResumeUrl, {
            message: "Resume URL must originate from the authorized Cloudinary storage bucket"
        }).optional(),
        coverLetter: z.string().max(3000, "Cover letter cannot exceed 3000 characters").optional()
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
