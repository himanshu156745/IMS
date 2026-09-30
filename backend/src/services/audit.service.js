const AuditLog = require('../models/AuditLog.model');

/**
 * Log an audit event.
 * @param {Object} params
 * @param {string} params.event - The event type
 * @param {string|null} [params.userId] - The associated user's ID
 * @param {Object} [params.req] - Express request object (to extract IP, userAgent)
 * @param {Object} [params.metadata] - Additional JSON metadata
 */
const logAuditEvent = async ({ event, userId = null, req = null, metadata = {} }) => {
  try {
    let ip = null;
    let userAgent = null;

    if (req) {
      ip = req.ip || req.headers['x-forwarded-for'] || req.socket?.remoteAddress;
      userAgent = req.headers['user-agent'];
    }

    await AuditLog.create({
      userId,
      event,
      ip,
      userAgent,
      metadata,
    });
  } catch (error) {
    // Log to console but don't fail the primary action
    console.error(`[Audit Log Error] Failed to log event ${event}:`, error.message);
  }
};

module.exports = {
  logAuditEvent,
};
