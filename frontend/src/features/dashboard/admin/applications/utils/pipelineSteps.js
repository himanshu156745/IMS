// Ordered pipeline for the standard (non-rejected) application journey.
// Rejected is a terminal branch handled separately in the UI.

export const PIPELINE_STEPS = [
  "Applied",
  "Under Review",
  "Shortlisted",
  "Interview Scheduled",
  "Accepted",
  "Assigned",
  "Completed",
];

export function pipelineIndex(status) {
  const idx = PIPELINE_STEPS.indexOf(status);
  return idx === -1 ? 0 : idx;
}

export function isRejected(status) {
  return status === "Rejected";
}