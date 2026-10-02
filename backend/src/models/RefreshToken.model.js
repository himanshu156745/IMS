const mongoose = require('mongoose');
const refreshTokenSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    hashedToken: { type: String, required: true, unique: true },
    expiresAt: { type: Date, required: true, index: { expires: 0 } },
    revokedAt: { type: Date },
    replacedBy: { type: String }
}, { timestamps: true });
refreshTokenSchema.virtual('isExpired').get(function () { return Date.now() >= this.expiresAt; });
refreshTokenSchema.virtual('isActive').get(function () { return !this.revokedAt && !this.isExpired; });
module.exports = mongoose.model('RefreshToken', refreshTokenSchema);
