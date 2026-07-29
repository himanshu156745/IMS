import { useState, Fragment } from "react";
import { ChevronRight, ChevronDown, Eye, Pencil, Users, RefreshCcw, Archive, Trash2 } from "lucide-react";
import DropdownMenu from "../../../../../components/ui/DropdownMenu";
import StatusBadge from "./StatusBadge";
import InternshipDetailsPanel from "./InternshipDetailsPanel";
import { TableRowSkeleton } from "../../../../../components/ui/SkeletonLoader";
import EmptyState from "../../../../../components/ui/EmptyState";

const COLUMNS = ["Internship Name", "Company", "Mentor", "Department", "Applicants", "Status", "Deadline", "Actions"];

function getMenuItems() {
  return [
    { label: "View Details", Icon: Eye },
    { label: "Edit Internship", Icon: Pencil },
    { label: "Assign Students", Icon: Users },
    { label: "Change Status", Icon: RefreshCcw },
    { label: "Archive", Icon: Archive },
    { label: "Delete", Icon: Trash2, danger: true },
  ];
}

export default function InternshipTable({ rows, loading }) {
  const [expandedId, setExpandedId] = useState(null);

  if (!loading && rows.length === 0) {
    return (
      <div className="rounded-2xl border border-line bg-white">
        <EmptyState />
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-line bg-white overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm font-body">
          <thead className="sticky top-0 z-10 bg-surface-alt">
            <tr className="border-b border-line text-left">
              <th className="w-8" />
              {COLUMNS.map((col) => (
                <th key={col} className="px-4 py-3 text-xs uppercase tracking-wide text-slate-400 font-medium whitespace-nowrap">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading
              ? Array.from({ length: 5 }).map((_, i) => <TableRowSkeleton key={i} />)
              : rows.map((row) => {
                  const isOpen = expandedId === row.id;
                  return (
                    <Fragment key={row.id}>
                      <tr
                        onClick={() => setExpandedId(isOpen ? null : row.id)}
                        className="border-b border-line last:border-none hover:bg-surface-alt/70 transition-colors cursor-pointer"
                      >
                        <td className="pl-4">
                          {isOpen ? <ChevronDown className="w-4 h-4 text-slate-400" /> : <ChevronRight className="w-4 h-4 text-slate-400" />}
                        </td>
                        <td className="px-4 py-3.5 font-medium text-heading">{row.name}</td>
                        <td className="px-4 py-3.5 text-heading">{row.company}</td>
                        <td className="px-4 py-3.5 text-heading">{row.mentor}</td>
                        <td className="px-4 py-3.5 text-heading">{row.department}</td>
                        <td className="px-4 py-3.5 text-heading">{row.applicants}</td>
                        <td className="px-4 py-3.5"><StatusBadge status={row.status} /></td>
                        <td className="px-4 py-3.5 text-heading whitespace-nowrap">{row.deadline}</td>
                        <td className="px-4 py-3.5" onClick={(e) => e.stopPropagation()}>
                          <DropdownMenu items={getMenuItems()} />
                        </td>
                      </tr>
                      {isOpen && <InternshipDetailsPanel internship={row} />}
                    </Fragment>
                  );
                })}
          </tbody>
        </table>
      </div>
    </div>
  );
}