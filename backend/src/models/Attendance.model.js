const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema(
    {
        student: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        internship: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Internship',
            required: true
        },
        dateKey: {
            type: String, // "YYYY-MM-DD"
            required: true
        },
        date: {
            type: Date,
            default: Date.now
        },
        status: {
            type: String,
            enum: ['present', 'absent', 'leave'],
            required: true
        },
        remarks: {
            type: String // Optional, like reason for leave
        }
    },
    { timestamps: true }
);

// One attendance record per day per student per internship
attendanceSchema.index({ student: 1, internship: 1, dateKey: 1 }, { unique: true });

module.exports = mongoose.model('Attendance', attendanceSchema);
