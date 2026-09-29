export const PRIORITY_LEVELS = ["High", "Medium", "Low"];

// Maps priority → Badge variant
export function priorityVariant(priority) {
  switch (priority) {
    case "High":
      return "overdue";
    case "Medium":
      return "attention";
    case "Low":
      return "onTrack";
    default:
      return "neutral";
  }
}