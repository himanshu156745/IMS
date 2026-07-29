// src/features/dashboard/admin/companies/utils/statusVariants.js
//
// Central place that maps a raw status string to the visual "variant"
// consumed by the shared <Badge /> component (e.g. <Badge variant="success">).
// Keeping this in one file means every table / drawer / card in the
// companies feature stays visually consistent.

/**
 * Verification status a company can be in.
 */
export const VERIFICATION_STATUS = {
  VERIFIED: "Verified",
  PENDING: "Pending",
  SUSPENDED: "Suspended",
};

/**
 * Active/Inactive account status.
 */
export const COMPANY_STATUS = {
  ACTIVE: "Active",
  INACTIVE: "Inactive",
};

/**
 * Internship posting status.
 */
export const INTERNSHIP_STATUS = {
  OPEN: "Open",
  CLOSED: "Closed",
  DRAFT: "Draft",
};

/**
 * Application status.
 */
export const APPLICATION_STATUS = {
  APPLIED: "Applied",
  SHORTLISTED: "Shortlisted",
  INTERVIEWING: "Interviewing",
  SELECTED: "Selected",
  REJECTED: "Rejected",
};

/**
 * Assigned student status.
 */
export const STUDENT_STATUS = {
  ONGOING: "Ongoing",
  COMPLETED: "Completed",
  TERMINATED: "Terminated",
};

// Maps every status string used in this feature to a Badge variant.
// The shared <Badge /> only supports 4 variants: onTrack, attention,
// overdue, neutral — so every status below is bucketed into one of those.
const STATUS_VARIANT_MAP = {
  // Verification
  Verified: "onTrack",
  Pending: "attention",
  Suspended: "overdue",

  // Company account status
  Active: "onTrack",
  Inactive: "neutral",

  // Internships
  Open: "onTrack",
  Closed: "neutral",
  Draft: "attention",

  // Applications
  Applied: "neutral",
  Shortlisted: "attention",
  Interviewing: "attention",
  Selected: "onTrack",
  Rejected: "overdue",

  // Assigned students
  Ongoing: "onTrack",
  Completed: "onTrack",
  Terminated: "overdue",
};

/**
 * Returns the Badge variant for a given status string.
 * Falls back to "neutral" so an unknown status never crashes the UI.
 */
export function getStatusVariant(status) {
  return STATUS_VARIANT_MAP[status] || "neutral";
}

/**
 * Small helper used by StatCard-style growth indicators.
 * Returns "up" | "down" | "flat" plus a formatted string like "+12%".
 */
export function getGrowthMeta(value) {
  if (value > 0) return { direction: "up", label: `+${value}%` };
  if (value < 0) return { direction: "down", label: `${value}%` };
  return { direction: "flat", label: "0%" };
}
