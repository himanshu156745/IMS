const mongoose = require('mongoose');

const internshipSchema = new mongoose.Schema(
    {
        company: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Company',
            required: true
        },
        mentor: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User' // reference to faculty user
        },
        title: {
            type: String,
            required: [true, 'Internship title is required'],
            trim: true
        },
        description: {
            type: String,
            required: [true, 'Description is required']
        },
        requirements: {
            type: [String],
            required: true
        },
        location: {
            type: String,
            required: true // 'Remote', 'On-site', 'Hybrid', or City name
        },
        stipend: {
            type: Number,
            default: 0
        },
        duration: {
            type: String,
            required: true // e.g., '3 Months', '6 Months'
        },
        positions: {
            type: Number,
            required: true
        },
        deadline: {
            type: Date,
            required: true
        },
        status: {
            type: String,
            enum: ['open', 'closed'],
            default: 'open'
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model('Internship', internshipSchema);
