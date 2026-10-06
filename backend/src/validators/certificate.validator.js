const { z } = require('zod');

const issueCertificateSchema = z.object({
    body: z.object({
        studentId: z.string().min(1),
        certificateUrl: z.string().url(),
    }),
    params: z.object({ internshipId: z.string().min(1) }),
});

const verifyCertificateSchema = z.object({
    params: z.object({ certificateId: z.string().trim().min(1) }),
});

module.exports = { issueCertificateSchema, verifyCertificateSchema };
