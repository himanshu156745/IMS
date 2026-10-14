const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const validator = require('validator');

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true,
            lowercase: true,
            trim: true,
            validate: [
                validator.isEmail,
                'Please fill a valid email address'
            ]
        },
        password: {
            type: String,
            required: function () {
                // Only required if active and not created via invite-only flow
                return this.isActive && !this.invited;
            },
            minlength: [8, 'Password must be at least 8 characters long'],
            select: false // Exclude from queries by default for security
        },
        role: {
            type: String,
            enum: {
                values: ['admin', 'company', 'faculty', 'student'],
                message: '{VALUE} is not a valid role'
            },
            required: [true, 'Role is required']
        },
        isActive: {
            type: Boolean,
            default: true
        },
        emailVerified: {
            type: Boolean,
            default: false
        },
        emailVerifiedAt: {
            type: Date
        },
        tokenVersion: {
            type: Number,
            default: 0
        },
        deletedAt: {
            type: Date,
            default: null
        },
        failedLoginAttempts: {
            type: Number,
            default: 0
        },
        lockUntil: {
            type: Date,
            default: null
        }
    },
    {
        timestamps: true,
        toJSON: {
            transform: function (doc, ret) {
                delete ret.password; // Double ensure password is never sent in JSON response
                delete ret.__v;
                return ret;
            }
        }
    }
);

// Hash password before saving
userSchema.pre('save', async function () {
    if (!this.isModified('password') || !this.password) return;
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// Method to compare password for login
userSchema.methods.comparePassword = async function (enteredPassword) {
    if (!this.password) return false;
    return await bcrypt.compare(enteredPassword, this.password);
};

// Method to generate JWT Access Token (shortened to 15m with tokenVersion for immediate revocation)
userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        { 
            id: this._id, 
            role: this.role, 
            email: this.email,
            tokenVersion: this.tokenVersion || 0
        },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXPIRES_IN || '15m',
            algorithm: 'HS256'
        }
    );
};

module.exports = mongoose.model('User', userSchema);
