const { z } = require('zod');

const issueCertificateSchema = z.object({
    params: z.object({
        internshipId: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid Internship ID")
    }),
    body: z.object({
        studentId: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid Student ID"),
        certificateUrl: z.string().url("Must be a valid URL")
    })
});

const verifyCertificateSchema = z.object({
    params: z.object({
        certificateId: z.string().min(1, "Certificate ID is required")
    })
});

module.exports = {
    issueCertificateSchema,
    verifyCertificateSchema
};
