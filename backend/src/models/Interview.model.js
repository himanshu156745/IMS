const mongoose = require('mongoose');

const interviewSchema = new mongoose.Schema({
    application: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Application',
        required: true
    },
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
        required: true
    },
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    time: {
        type: String,
        required: true // e.g., '14:30'
    },
    type: {
        type: String,
        enum: ['technical', 'hr', 'assignment', 'final'],
        default: 'technical'
    },
    mode: {
        type: String,
        enum: ['online', 'offline'],
        required: true
    },
    link: {
        type: String // Google Meet, Zoom link, etc. if online
    },
    location: {
        type: String // Address if offline
    },
    status: {
        type: String,
        enum: ['scheduled', 'completed', 'cancelled', 'no_show'],
        default: 'scheduled'
    },
    notes: {
        type: String
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Interview', interviewSchema);
