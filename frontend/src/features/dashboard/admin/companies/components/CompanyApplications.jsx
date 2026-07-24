// src/features/dashboard/admin/companies/components/CompanyApplications.jsx
import React from "react";
import { FiFileText, FiEye } from "react-icons/fi";
import Table from "../../../../../components/ui/Table";
import EmptyState from "../../../../../components/ui/EmptyState";
import StatusBadge from "./StatusBadge";
import { applications } from "../data/companiesData";

const columns = [
  {
    key: "student",
    label: "Student",
    render: (r) => (
      <div>
        <p className="text-sm font-medium text-ink">{r.studentName}</p>
        <p className="text-xs text-slate-400">{r.internshipRole}</p>
      </div>
    ),
  },
  { key: "college", label: "College", render: (r) => <span className="text-sm text-slate-600">{r.college}</span> },
  { key: "course", label: "Course", render: (r) => <span className="text-sm text-slate-600">{r.course}</span> },
  {
    key: "resume",
    label: "Resume",
    render: (r) => (
      <span className="flex items-center gap-1.5 text-sm text-primary">
        <FiFileText className="h-3.5 w-3.5" />
        <span className="max-w-[140px] truncate">{r.resume}</span>
      </span>
    ),
  },
  { key: "applied", label: "Applied Date", render: (r) => <span className="text-sm text-slate-500">{r.appliedDate}</span> },
  { key: "status", label: "Status", render: (r) => <StatusBadge status={r.status} /> },
  {
    key: "actions",
    label: "Actions",
    render: () => (
      <button
        type="button"
        className="flex items-center gap-1 rounded-lg px-2 py-1 text-xs font-medium text-primary transition-colors hover:bg-primary-bg"
      >
        <FiEye className="h-3.5 w-3.5" /> View
      </button>
    ),
  },
];

export default function CompanyApplications({ companyId }) {
  const rows = applications.filter((a) => a.companyId === companyId);

  if (!rows.length) {
    return <EmptyState />;
  }

  return <Table columns={columns} rows={rows} emptyText="No applications received yet." />;
}
