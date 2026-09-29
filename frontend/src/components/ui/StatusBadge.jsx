
const VARIANTS = {
  Active: "text-green-700 bg-green-100",
  Pending: "text-orange-700 bg-orange-100",
  Completed: "text-blue-700 bg-blue-100",
  Rejected: "text-red-700 bg-red-100",
  // Aliases and other common statuses
  active: "text-green-700 bg-green-100",
  open: "text-green-700 bg-green-100",
  accepted: "text-green-700 bg-green-100",
  reviewed: "text-blue-700 bg-blue-100",
  applied: "text-orange-700 bg-orange-100",
  closed: "text-gray-700 bg-gray-100",
  rejected: "text-red-700 bg-red-100",
  inactive: "text-gray-700 bg-gray-100",
};

export default function StatusBadge({ status }) {
  const badgeClass = VARIANTS[status] ?? "text-gray-700 bg-gray-100";
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium font-body capitalize ${badgeClass}`}>
      {status}
    </span>
  );
}
