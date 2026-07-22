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

const MOCK_ROWS = [
  { id: 1, initials: "AS", student: "Arjun Sharma", dept: "CS", company: "Google", internship: "SDE Intern", appliedDate: "Jul 18, 2026", status: "Pending" },
  { id: 2, initials: "PM", student: "Priya Mehta", dept: "IT", company: "Microsoft", internship: "Product Intern", appliedDate: "Jul 17, 2026", status: "Approved" },
  { id: 3, initials: "RV", student: "Rohan Verma", dept: "ECE", company: "Amazon", internship: "Cloud Intern", appliedDate: "Jul 16, 2026", status: "Approved" },
  { id: 4, initials: "SP", student: "Sneha Patel", dept: "MBA", company: "Stripe", internship: "Growth Intern", appliedDate: "Jul 15, 2026", status: "Rejected" },
  { id: 5, initials: "KN", student: "Kiran Nair", dept: "IT", company: "Figma", internship: "Design Intern", appliedDate: "Jul 14, 2026", status: "Pending" },
  { id: 6, initials: "DR", student: "Divya Reddy", dept: "CS", company: "Notion", internship: "Backend Intern", appliedDate: "Jul 13, 2026", status: "Approved" },
];

export default function RecentApplicationsTable() {
  return (
    <div className="rounded-md bg-white shadow-sm p-5">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h2 className="font-display text-base text-ink">Recent Applications</h2>
          <p className="text-xs text-slate font-body">Latest internship applications</p>
        </div>
        <button className="text-xs font-medium text-signal hover:underline">Filter</button>
      </div>
      <Table columns={columns} rows={MOCK_ROWS} />
    </div>
  );
}