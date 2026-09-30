const APP_STATUS = { PENDING: 'pending', REVIEWED: 'reviewed', ACCEPTED: 'accepted', REJECTED: 'rejected', SHORTLISTED: 'shortlisted', INTERVIEW_SCHEDULED: 'interview_scheduled' };
const APPLICATION_STATUS = Object.values(APP_STATUS);
module.exports = { APP_STATUS, APPLICATION_STATUS };