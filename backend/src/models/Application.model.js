const mongoose = require('mongoose');
const { APPLICATION_STATUS, APP_STATUS } = require('../constants/applicationStatus');

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
            enum: APPLICATION_STATUS,
            default: APP_STATUS.PENDING
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
