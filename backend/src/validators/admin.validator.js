const { z } = require('zod');

const toggleUserStatusSchema = z.object({
    params: z.object({
        id: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid User ID")
    }),
    body: z.object({
        isActive: z.boolean({
            required_error: "isActive is required",
            invalid_type_error: "isActive must be a boolean"
        })
    })
});

const updateCompanyVerificationSchema = z.object({
    params: z.object({
        id: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid Company ID")
    }),
    body: z.object({
        verificationStatus: z.enum(['Pending', 'Verified', 'Suspended'])
    })
});

const createCompanySchema = z.object({
    body: z.object({
        email: z.string().email("Invalid email format"),
        password: z.string().min(6, "Password must be at least 6 characters long"),
        name: z.string().min(1, "Company name is required"),
        description: z.string().min(1, "Description is required"),
        website: z.string().url("Invalid website URL").optional().or(z.literal('')),
        location: z.string().min(1, "Location is required"),
        industry: z.string().optional(),
        hrName: z.string().min(1, "HR Name is required")
    })
});

const updateCompanySchema = z.object({
    params: z.object({
        id: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid Company ID")
    }),
    body: z.object({
        name: z.string().optional(),
        description: z.string().optional(),
        website: z.string().url("Invalid website URL").optional().or(z.literal('')),
        location: z.string().optional(),
        industry: z.string().optional(),
        hrName: z.string().optional()
    }).passthrough()
});

module.exports = {
    toggleUserStatusSchema,
    updateCompanyVerificationSchema,
    createCompanySchema,
    updateCompanySchema
};
