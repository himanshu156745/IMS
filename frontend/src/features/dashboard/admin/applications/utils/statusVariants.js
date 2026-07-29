// Maps application status → Badge variant (matches existing Badge.jsx variants:
// onTrack | attention | overdue | neutral)

export const APPLICATION_STATUSES = [
  "Applied",
  "Under Review",
  "Shortlisted",
  "Interview Scheduled",
  "Accepted",
  "Rejected",
  "Assigned",
  "Completed",
];

export function statusVariant(status) {
  switch (status) {
    case "Accepted":
    case "Assigned":
    case "Completed":
      return "onTrack";
    case "Shortlisted":
    case "Interview Scheduled":
      return "attention";
    case "Rejected":
      return "overdue";
    case "Applied":
    case "Under Review":
    default:
      return "neutral";
  }
}