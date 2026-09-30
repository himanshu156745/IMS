const mongoose = require('mongoose');

const auditLogSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: false, // For failed logins where user might not exist
    },
    event: {
      type: String,
      required: true,
      enum: [
        'LOGIN_SUCCESS',
        'LOGIN_FAILURE',
        'LOGOUT',
        'LOGOUT_ALL',
        'PASSWORD_CHANGE',
        'PASSWORD_RESET_REQUEST',
        'PASSWORD_RESET_SUCCESS',
        'EMAIL_CHANGE',
        'EMAIL_VERIFICATION',
        'ROLE_CHANGE',
        'ACCOUNT_LOCK',
        'ACCOUNT_UNLOCK',
        'ADMIN_ACTION',
        'FORCE_LOGOUT',
        'ATTENDANCE_OVERRIDE'
      ],
    },
    ip: {
      type: String,
      required: false,
    },
    userAgent: {
      type: String,
      required: false,
    },
    metadata: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
  },
  {
    timestamps: true, // provides timestamp via createdAt
  }
);

// Index for faster querying
auditLogSchema.index({ userId: 1, createdAt: -1 });
auditLogSchema.index({ event: 1, createdAt: -1 });

module.exports = mongoose.model('AuditLog', auditLogSchema);
