const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema(
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
        taskDescription: {
            type: String,
            required: [true, 'Task description is required'],
            minlength: [20, 'Please provide a detailed description (min 20 characters)']
        },
        hoursWorked: {
            type: Number,
            required: true,
            min: [1, 'Hours worked must be at least 1'],
            max: [12, 'Hours worked cannot exceed 12 per day']
        },
        status: {
            type: String,
            enum: ['pending', 'approved', 'rejected'],
            default: 'pending' // Faculty evaluates this
        },
        facultyFeedback: {
            type: String
        }
    },
    { timestamps: true }
);

// Prevent multiple reports for the same day by the same student for the same internship
reportSchema.index({ student: 1, internship: 1, dateKey: 1 }, { unique: true });

module.exports = mongoose.model('Report', reportSchema);
