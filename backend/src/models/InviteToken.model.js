const mongoose = require('mongoose');

const inviteTokenSchema = new mongoose.Schema(
    {
        tokenHash: {
            type: String,
            required: true,
            unique: true
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        expiresAt: {
            type: Date,
            required: true,
            index: { expires: 0 } // TTL index expires at the exact timestamp specified in expiresAt
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model('InviteToken', inviteTokenSchema);

