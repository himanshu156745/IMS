const VARIANTS = {
  Active: "text-success bg-success-bg",
  Pending: "text-warning bg-warning-bg",
  Completed: "text-primary bg-primary-bg",
  Rejected: "text-danger bg-danger-bg",
};

export default function StatusBadge({ status }) {
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium font-body ${VARIANTS[status] ?? "text-slate-500 bg-surface-alt"}`}>
      {status}
    </span>
  );
}