// src/features/dashboard/admin/companies/components/CompanyInternships.jsx
import React from "react";
import { FiCalendar } from "react-icons/fi";
import Table from "../../../../../components/ui/Table";
import EmptyState from "../../../../../components/ui/EmptyState";
import StatusBadge from "./StatusBadge";
import { internships } from "../data/companiesData";

const columns = [
  { key: "role", label: "Role", render: (r) => <span className="text-sm font-medium text-ink">{r.role}</span> },
  { key: "department", label: "Department", render: (r) => <span className="text-sm text-slate-600">{r.department}</span> },
  { key: "duration", label: "Duration", render: (r) => <span className="text-sm text-slate-600">{r.duration}</span> },
  { key: "applications", label: "Applications", render: (r) => <span className="text-sm text-slate-600">{r.applications}</span> },
  { key: "assigned", label: "Assigned", render: (r) => <span className="text-sm text-slate-600">{r.assignedStudents}</span> },
  { key: "status", label: "Status", render: (r) => <StatusBadge status={r.status} /> },
  {
    key: "deadline",
    label: "Deadline",
    render: (r) => (
      <span className="flex items-center gap-1 text-sm text-slate-500">
        <FiCalendar className="h-3.5 w-3.5" /> {r.deadline}
      </span>
    ),
  },
];

export default function CompanyInternships({ companyId }) {
  const rows = internships.filter((i) => i.companyId === companyId);

  if (!rows.length) {
    return <EmptyState />;
  }

  return <Table columns={columns} rows={rows} emptyText="No internships posted yet." />;
}
