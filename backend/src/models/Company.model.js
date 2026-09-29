const mongoose = require('mongoose');

const companySchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
            unique: true
        },
        verificationStatus: {
            type: String,
            enum: ['Pending', 'Verified', 'Suspended'],
            default: 'Pending'
        },
        industry: {
            type: String,
            default: 'Other'
        },
        hrName: {
            type: String,
            required: [true, 'HR Name is required'],
            trim: true
        },
        name: {
            type: String,
            required: [true, 'Company name is required'],
            trim: true
        },
        description: {
            type: String,
            required: [true, 'Description is required']
        },
        website: {
            type: String,
            trim: true
        },
        location: {
            type: String,
            required: true
        },
        logo: {
            type: String // URL to logo
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model('Company', companySchema);
