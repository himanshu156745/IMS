// ── Design tokens (Control Tower theme) ─────────────────────────────
// Ink        #12131A  – sidebar / primary text
// Paper      #F6F5F2  – page background
// Signal     #2F6F5E  – primary / approved / on-track
// Amber      #C98A2C  – pending / needs review
// Coral      #B3492F  – overdue / rejected
// Slate      #5B6472  – secondary text / borders

export const ROLES = {
  SUPER_ADMIN: "super_admin",
  HR: "hr",
  MENTOR: "mentor",
  INTERN: "intern",
};

export const APPLICATION_STATUS = {
  PENDING: "pending",
  SHORTLISTED: "shortlisted",
  INTERVIEW_SCHEDULED: "interview_scheduled",
  SELECTED: "selected",
  REJECTED: "rejected",
  OFFER_SENT: "offer_sent",
};

export const INTERN_STATUS = {
  ONBOARDING: "onboarding",
  ACTIVE: "active",
  ON_LEAVE: "on_leave",
  COMPLETED: "completed",
  TERMINATED: "terminated",
};

export const STATUS_COLOR = {
  onTrack: "bg-signal",
  attention: "bg-amber",
  overdue: "bg-coral",
  neutral: "bg-slate",
};