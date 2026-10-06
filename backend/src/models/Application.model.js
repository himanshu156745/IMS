const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema(
    {
        internship: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Internship',
            required: true
        },
        student: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        status: {
            type: String,
            enum: ['pending', 'reviewed', 'accepted', 'rejected'],
            default: 'pending'
        },
        resumeUrl: {
            type: String,
            required: [true, 'Resume is required']
        },
        coverLetter: {
            type: String
        }
    },
    { timestamps: true }
);

// Prevent duplicate applications by the same student for the same internship
applicationSchema.index({ internship: 1, student: 1 }, { unique: true });

module.exports = mongoose.model('Application', applicationSchema);
