const { z } = require('zod');

const registerCompanySchema = z.object({
    body: z.object({
        name: z.string().min(1, "Company name is required"),
        description: z.string().min(1, "Description is required"),
        website: z.string().url("Invalid website URL").optional().or(z.literal('')),
        location: z.string().min(1, "Location is required"),
        industry: z.string().optional(),
        hrName: z.string().min(1, "HR Name is required")
    })
});

module.exports = {
    registerCompanySchema
};
