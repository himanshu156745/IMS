const crypto = require('crypto');
const InviteToken = require('../models/InviteToken.model');
const User = require('../models/User.model');
const ApiError = require('../utils/ApiError');
const ApiResponse = require('../utils/ApiResponse');
const asyncHandler = require('../utils/asyncHandler');
const PASSWORD = require('../constants/password');

const verifyInvite = asyncHandler(async (req, res) => {
    const { token } = req.params;
    const tokenHash = crypto.createHash('sha256').update(token).digest('hex');
    const invite = await InviteToken.findOne({ tokenHash, expiresAt: { $gt: new Date() } });
    if (!invite) throw new ApiError(400, 'Invalid or expired invite token');
    res.status(200).json(new ApiResponse(200, { valid: true }, 'Token is valid'));
});

const acceptInvite = asyncHandler(async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;
    if (!password) throw new ApiError(400, 'Password is required');
    if (!PASSWORD.REGEX.test(password)) throw new ApiError(400, PASSWORD.MESSAGE);
    const tokenHash = crypto.createHash('sha256').update(token).digest('hex');
    const invite = await InviteToken.findOne({ tokenHash, expiresAt: { $gt: new Date() } }).populate('user');
    if (!invite) throw new ApiError(400, 'Invalid or expired invite token');
    const user = invite.user;
    if (!user) throw new ApiError(404, 'User not found');
    user.password = password;
    user.isActive = true;
    user.emailVerified = true;
    user.emailVerifiedAt = new Date();
    user.tokenVersion = (user.tokenVersion || 0) + 1;
    await user.save();
    await InviteToken.deleteOne({ _id: invite._id });
    res.status(200).json(new ApiResponse(200, null, 'Account activated successfully'));
});

module.exports = { verifyInvite, acceptInvite };
