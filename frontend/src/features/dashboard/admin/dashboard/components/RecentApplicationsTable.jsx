import Table from "../../../../../components/ui/Table";
import Badge from "../../../../../components/ui/Badge";

const STATUS_VARIANT = {
  Pending: "attention",
  Approved: "onTrack",
  Rejected: "overdue",
};

const columns = [
  {
    key: "student",
    label: "Student",
    render: (row) => (
      <div className="flex items-center gap-2">
        <span className="w-7 h-7 rounded-full bg-signal/10 text-signal text-xs font-medium flex items-center justify-center">
          {row.initials}
        </span>
        <div className="flex flex-col text-left">
          <span className="text-ink text-sm">{row.student}</span>
          <span className="text-[11px] text-slate/70">{row.dept}</span>
        </div>
      </div>
    ),
  },
  { key: "company", label: "Company" },
  { key: "internship", label: "Internship" },
  { key: "appliedDate", label: "Applied Date" },
  {
    key: "status",
    label: "Status",
    render: (row) => <Badge variant={STATUS_VARIANT[row.status]}>{row.status}</Badge>,
  },
];

export default function RecentApplicationsTable({ applications = [] }) {
  const rows = applications.map((app) => {
    const studentName =
      app.studentProfile?.fullName ||
      app.student?.email?.split("@")[0] ||
      "Student";
    const initials =
      studentName
        .split(" ")
        .map((n) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase() || "ST";
    const statusMap = {
      pending: "Pending",
      applied: "Pending",
      reviewed: "Pending",
      accepted: "Approved",
      rejected: "Rejected",
    };
    return {
      id: app._id || app.id,
      initials,
      student: studentName,
      dept: app.studentProfile?.branch || "General",
      company: app.internship?.company?.name || "Company",
      internship: app.internship?.title || "Internship",
      appliedDate: app.createdAt
        ? new Date(app.createdAt).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })
        : "N/A",
      status: statusMap[app.status?.toLowerCase()] || "Pending",
    };
  });

  return (
    <div className="rounded-md bg-white shadow-sm p-5">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h2 className="font-display text-base text-ink">Recent Applications</h2>
          <p className="text-xs text-slate font-body">Latest internship applications</p>
        </div>
        <button className="text-xs font-medium text-signal hover:underline">Filter</button>
      </div>
      <Table columns={columns} rows={rows} emptyText="No recent applications found" />
    </div>
  );
}
