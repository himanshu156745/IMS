const { z } = require('zod');

const internshipFields = {
    title: z.string().trim().min(1).max(150),
    description: z.string().trim().min(1).max(5000),
    requirements: z.union([
        z.array(z.string().trim().min(1).max(100)).min(1),
        z.string().trim().min(1),
    ]),
    location: z.string().trim().min(1).max(200),
    stipend: z.coerce.number().min(0).optional(),
    duration: z.string().trim().min(1).max(100),
    positions: z.coerce.number().int().min(1),
    deadline: z.coerce.date(),
    status: z.enum(['open', 'closed']),
};

const createInternshipSchema = z.object({
    body: z.object({
        title: internshipFields.title,
        description: internshipFields.description,
        requirements: internshipFields.requirements,
        location: internshipFields.location,
        stipend: internshipFields.stipend,
        duration: internshipFields.duration,
        positions: internshipFields.positions,
        deadline: internshipFields.deadline,
    }),
});

const updateInternshipSchema = z.object({
    body: z.object({
        title: internshipFields.title.optional(),
        description: internshipFields.description.optional(),
        requirements: internshipFields.requirements.optional(),
        location: internshipFields.location.optional(),
        stipend: internshipFields.stipend,
        duration: internshipFields.duration.optional(),
        positions: internshipFields.positions.optional(),
        deadline: internshipFields.deadline.optional(),
        status: internshipFields.status.optional(),
    }),
    params: z.object({ id: z.string().min(1) }),
});

module.exports = { createInternshipSchema, updateInternshipSchema };
