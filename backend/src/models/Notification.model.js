const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    recipient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    type: {
        type: String,
        enum: ['info', 'success', 'warning', 'error', 'application_update', 'interview_scheduled'],
        default: 'info'
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    message: {
        type: String,
        required: true
    },
    link: {
        type: String // Optional link to redirect user when they click the notification
    },
    read: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

// Index for fetching a user's unread notifications quickly
notificationSchema.index({ recipient: 1, read: 1 });

module.exports = mongoose.model('Notification', notificationSchema);
