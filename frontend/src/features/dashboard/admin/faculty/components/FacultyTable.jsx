import {
  Eye,
  Pencil,
  UserPlus,
  UserX,
  KeyRound,
  Trash2,
} from "lucide-react";
import Table from "../../../../../components/ui/Table";
import DropdownMenu from "../../../../../components/ui/DropdownMenu";
import { TableRowSkeleton } from "../../../../../components/ui/SkeletonLoader";
import FacultyStatusBadge from "./FacultyStatusBadge";

export default function FacultyTable({ rows, loading, onAction }) {
  const columns = [
    {
      key: "name",
      label: "Faculty",
      render: (row) => (
        <div className="flex items-center gap-2.5">
          <img src={row.photo} alt={row.name} className="w-8 h-8 rounded-full object-cover" />
          <div>
            <p className="text-sm font-body text-heading leading-tight">{row.name}</p>
            <p className="text-xs text-slate-400 font-body">{row.facultyId}</p>
          </div>
        </div>
      ),
    },
    { key: "department", label: "Department", render: (row) => <span className="text-slate-500">{row.department}</span> },
    { key: "designation", label: "Designation", render: (row) => <span className="text-slate-500">{row.designation}</span> },
    {
      key: "subjects",
      label: "Subjects",
      render: (row) => <span className="text-slate-500">{row.subjects.join(", ")}</span>,
    },
    {
      key: "experience",
      label: "Experience",
      render: (row) => <span className="text-slate-500">{row.experience} yrs</span>,
    },
    {
      key: "studentsAssigned",
      label: "Students Assigned",
      render: (row) => <span className="text-slate-500">{row.studentsAssigned}</span>,
    },
    {
      key: "status",
      label: "Status",
      render: (row) => <FacultyStatusBadge status={row.status} />,
    },
    {
      key: "joiningDate",
      label: "Joining Date",
      render: (row) => <span className="text-slate-500">{row.joiningDate}</span>,
    },
    {
      key: "actions",
      label: "Actions",
      render: (row) => (
        <DropdownMenu
          items={[
            { label: "View", Icon: Eye, onClick: () => onAction("view", row) },
            { label: "Edit", Icon: Pencil, onClick: () => onAction("edit", row) },
            { label: "Assign Students", Icon: UserPlus, onClick: () => onAction("assign", row) },
            { label: "Deactivate", Icon: UserX, onClick: () => onAction("deactivate", row) },
            { label: "Reset Password", Icon: KeyRound, onClick: () => onAction("resetPassword", row) },
            { label: "Delete", Icon: Trash2, onClick: () => onAction("delete", row), danger: true },
          ]}
        />
      ),
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
            {Array.from({ length: 5 }).map((_, i) => (
              <TableRowSkeleton key={i} />
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  return <Table columns={columns} rows={rows} emptyText="No faculty match the current filters." />;
}