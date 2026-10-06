const crypto = require('crypto');
const InviteToken = require('../models/InviteToken.model');

/**
 * Generate an invite token and store its hash in DB
 * @param {string} userId - ID of the user being invited
 * @returns {object} { token, inviteUrl }
 */
const generateInviteToken = async (userId) => {
    // Generate 256-bit token
    const token = crypto.randomBytes(32).toString('hex');
    const tokenHash = crypto.createHash('sha256').update(token).digest('hex');

    // 24h TTL
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);

    await InviteToken.create({
        user: userId,
        tokenHash,
        expiresAt
    });

    // We stub the email part, but return the invite URL
    const baseUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
    const inviteUrl = `${baseUrl}/invite/${token}`;

    console.log(`[STUB] Invite link sent to user: ${inviteUrl}`);

    return { token, inviteUrl };
};

module.exports = {
    generateInviteToken
};
