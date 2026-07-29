export function facultyStatusVariant(status) {
  switch (status) {
    case "Active":
      return "onTrack";
    case "On Leave":
      return "attention";
    case "Pending Approval":
      return "attention";
    case "Inactive":
      return "neutral";
    default:
      return "neutral";
  }
}