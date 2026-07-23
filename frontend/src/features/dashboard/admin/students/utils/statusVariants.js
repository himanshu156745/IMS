// Maps domain status strings to the 4 Badge variants already defined in
// components/ui/Badge.jsx (onTrack | attention | overdue | neutral).

const APPLICATION_STATUS_VARIANT = {
  Applied: "neutral",
  "Under Review": "attention",
  Shortlisted: "onTrack",
  Rejected: "overdue",
  Selected: "onTrack",
};

const HIRING_STATUS_VARIANT = {
  Registered: "neutral",
  Applied: "neutral",
  Shortlisted: "onTrack",
  "Interview Scheduled": "attention",
  Selected: "onTrack",
  Rejected: "overdue",
  Joined: "onTrack",
  Completed: "onTrack",
};

const INTERVIEW_STATUS_VARIANT = {
  "Not Scheduled": "neutral",
  Scheduled: "attention",
  Completed: "onTrack",
};

export function applicationStatusVariant(status) {
  return APPLICATION_STATUS_VARIANT[status] || "neutral";
}

export function hiringStatusVariant(status) {
  return HIRING_STATUS_VARIANT[status] || "neutral";
}

export function interviewStatusVariant(status) {
  return INTERVIEW_STATUS_VARIANT[status] || "neutral";
}

export const APPLICATION_STATUSES = Object.keys(APPLICATION_STATUS_VARIANT);
export const HIRING_STATUSES = Object.keys(HIRING_STATUS_VARIANT);
export const INTERVIEW_STATUSES = Object.keys(INTERVIEW_STATUS_VARIANT);