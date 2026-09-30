const Notification = require('../models/Notification.model');

/**
 * Creates an in-app notification and sends an email notification (mocked for now).
 * @param {ObjectId|string} userId - The user's ID
 * @param {string} title - The notification title
 * @param {string} message - The notification message
 * @param {string} type - Notification type (default: 'warning' for security)
 */
const sendSecurityNotification = async (userId, title, message, type = 'warning') => {
    try {
        // 1. Create In-App Notification
        const notification = await Notification.create({
            recipient: userId,
            title,
            message,
            type
        });

        // 2. Mock sending an email notification
        console.log(`[EMAIL MOCK] Sending security email to User ${userId}: [${title}] ${message}`);

        return notification;
    } catch (error) {
        console.error('Error sending security notification:', error);
        // Do not throw to prevent blocking the main request lifecycle
    }
};

module.exports = {
    sendSecurityNotification
};
