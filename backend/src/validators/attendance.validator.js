const { z } = require('zod');
const { ATTENDANCE_STATUS } = require('../constants/attendanceStatus');

// ⚡ CHANGE: ATTENDANCE_STATUS is an object, not an array. z.enum() requires an
// array. This used to crash at runtime with ZodError. Wrap every usage in
// Object.values().

const markAttendanceSchema = z.object({
    params: z.object({
        internshipId: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid ID")
    }),
    body: z.object({
        status: z.enum(Object.values(ATTENDANCE_STATUS)),   // ⚡ CHANGE
        remarks: z.string().optional()
    })
});

const updateAttendanceSchema = z.object({
    params: z.object({
        id: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid ID")
    }),
    body: z.object({
        status: z.enum(Object.values(ATTENDANCE_STATUS)).optional(),   // ⚡ CHANGE
        remarks: z.string().optional()
    })
});

const overrideAttendanceSchema = z.object({
    params: z.object({
        internshipId: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid ID")
    }),
    body: z.object({
        status: z.enum(Object.values(ATTENDANCE_STATUS)).optional(),   // ⚡ CHANGE
        remarks: z.string().optional(),
        dateKey: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid dateKey format").optional(),
        studentId: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid ID").optional()
    })
});

module.exports = {
    markAttendanceSchema,
    updateAttendanceSchema,
    overrideAttendanceSchema
};