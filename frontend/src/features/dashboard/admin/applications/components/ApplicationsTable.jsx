import { FileText } from "lucide-react";
import Table from "../../../../../components/ui/Table";
import { TableRowSkeleton } from "../../../../../components/ui/SkeletonLoader";
import StatusBadge from "./StatusBadge";
import PriorityBadge from "./PriorityBadge";
import SkillMatchCard from "./SkillMatchCard";
import ActionDropdown from "./ActionDropdown";

export default function ApplicationsTable({ rows, loading, selectedIds, onToggleSelect, onToggleSelectAll, onAction }) {
  const allSelected = rows.length > 0 && rows.every((r) => selectedIds.includes(r.id));

  const columns = [
    {
      key: "select",
      label: (
        <input
          type="checkbox"
          checked={allSelected}
          onChange={(e) => onToggleSelectAll(e.target.checked)}
          className="h-4 w-4 rounded border-line accent-primary"
        />
      ),
      render: (row) => (
        <input
          type="checkbox"
          checked={selectedIds.includes(row.id)}
          onChange={() => onToggleSelect(row.id)}
          className="h-4 w-4 rounded border-line accent-primary"
        />
      ),
    },
    {
      key: "student",
      label: "Student",
      render: (row) => (
        <div className="flex items-center gap-2.5">
          <img src={row.student.photo} alt={row.student.name} className="w-8 h-8 rounded-full object-cover" />
          <div>
            <p className="text-sm font-body text-heading leading-tight">{row.student.name}</p>
            <p className="text-xs text-slate-400 font-body">{row.student.email}</p>
          </div>
        </div>
      ),
    },
    { key: "phone", label: "Phone", render: (row) => <span className="text-slate-500">{row.student.phone}</span> },
    { key: "college", label: "College", render: (row) => <span className="text-slate-500">{row.student.college}</span> },
    { key: "branch", label: "Branch", render: (row) => <span className="text-slate-500">{row.student.branch}</span> },
    {
      key: "internship",
      label: "Internship",
      render: (row) => (
        <div>
          <p className="text-sm font-body text-heading">{row.internship.title}</p>
          <p className="text-xs text-slate-400 font-body">{row.internship.company}</p>
        </div>
      ),
    },
    {
      key: "resume",
      label: "Resume",
      render: (row) => (
        <button
          type="button"
          onClick={() => onAction("viewResume", row)}
          className="flex items-center gap-1.5 rounded-lg border border-line bg-white px-2 py-1 text-[11px] font-body text-slate-500 hover:text-primary hover:border-primary/40 hover:bg-primary-bg transition-colors"
        >
          <FileText className="w-3.5 h-3.5" strokeWidth={1.75} /> View
        </button>
      ),
    },
    { key: "appliedDate", label: "Applied Date", render: (row) => <span className="text-slate-500">{row.appliedDate}</span> },
    { key: "priority", label: "Priority", render: (row) => <PriorityBadge priority={row.priority} /> },
    { key: "skillMatch", label: "Skill Match", render: (row) => <SkillMatchCard skillMatch={row.skillMatch} /> },
    { key: "status", label: "Status", render: (row) => <StatusBadge status={row.status} /> },
    {
      key: "actions",
      label: "Actions",
      render: (row) => <ActionDropdown row={row} onAction={onAction} />,
    },
  ];

  if (loading) {
    return (
      <div className="overflow-x-auto rounded-md bg-white shadow-sm">
        <table className="w-full text-sm font-body">
          <thead>
            <tr className="border-b border-slate/10 text-left">
              {columns.map((col) => (
                <th key={col.key} className="px-4 py-3 text-xs uppercase tracking-wider text-slate font-medium">
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 6 }).map((_, i) => (
              <TableRowSkeleton key={i} />
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  return <Table columns={columns} rows={rows} emptyText="No applications match the current filters." />;
}