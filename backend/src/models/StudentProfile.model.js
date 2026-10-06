const mongoose = require('mongoose');

const studentProfileSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
            unique: true // One user, one profile
        },
        fullName: {
            type: String,
            required: [true, 'Full name is required'],
            trim: true
        },
        phoneNumber: {
            type: String,
            trim: true
        },
        university: {
            type: String,
            required: [true, 'University/College name is required']
        },
        course: {
            type: String, // e.g., B.Tech, MCA
            required: true
        },
        semester: {
            type: Number
        },
        skills: {
            type: [String],
            default: []
        },
        resumeUrl: {
            type: String // Uploaded via Cloudinary
        },
        avatarUrl: {
            type: String // Uploaded via Cloudinary
        },
        cgpa: {
            type: Number
        },
        branch: {
            type: String
        },
        github: {
            type: String
        },
        linkedin: {
            type: String
        },
        portfolio: {
            type: String
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model('StudentProfile', studentProfileSchema);
