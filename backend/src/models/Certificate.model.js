const mongoose = require('mongoose');

const certificateSchema = new mongoose.Schema(
    {
        student: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        internship: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Internship',
            required: true
        },
        issuedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User', // Usually Faculty or Admin or Company
            required: true
        },
        issueDate: {
            type: Date,
            default: Date.now
        },
        certificateUrl: {
            type: String, // Could be a Cloudinary URL to the PDF/Image
            required: true
        },
        certificateId: {
            type: String,
            unique: true,
            required: true // Unique verification ID, e.g. CERT-2024-ABCDEF
        }
    },
    { timestamps: true }
);

// A student can only get one certificate per internship
certificateSchema.index({ student: 1, internship: 1 }, { unique: true });

module.exports = mongoose.model('Certificate', certificateSchema);
