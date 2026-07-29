// src/features/dashboard/admin/companies/components/CompanyStudents.jsx
import React from "react";
import Table from "../../../../../components/ui/Table";
import EmptyState from "../../../../../components/ui/EmptyState";
import StatusBadge from "./StatusBadge";
import { assignedStudents } from "../data/companiesData";

function AttendanceBar({ value }) {
  const color = value >= 85 ? "bg-signal" : value >= 70 ? "bg-amber" : "bg-coral";
  return (
    <div className="flex items-center gap-2">
      <div className="h-1.5 w-16 overflow-hidden rounded-full bg-slate/10">
        <div className={`h-full rounded-full ${color}`} style={{ width: `${value}%` }} />
      </div>
      <span className="text-xs text-slate-500">{value}%</span>
    </div>
  );
}

const columns = [
  { key: "name", label: "Student Name", render: (r) => <span className="text-sm font-medium text-ink">{r.studentName}</span> },
  { key: "internship", label: "Internship", render: (r) => <span className="text-sm text-slate-600">{r.internship}</span> },
  { key: "mentor", label: "Faculty Mentor", render: (r) => <span className="text-sm text-slate-600">{r.facultyMentor}</span> },
  { key: "assignedDate", label: "Assigned Date", render: (r) => <span className="text-sm text-slate-500">{r.assignedDate}</span> },
  { key: "attendance", label: "Attendance", render: (r) => <AttendanceBar value={r.attendance} /> },
  { key: "performance", label: "Performance", render: (r) => <span className="text-sm font-medium text-ink">{r.performance} / 5</span> },
  { key: "status", label: "Status", render: (r) => <StatusBadge status={r.status} /> },
];

export default function CompanyStudents({ companyId }) {
  const rows = assignedStudents.filter((s) => s.companyId === companyId);

  if (!rows.length) {
    return <EmptyState />;
  }

  return <Table columns={columns} rows={rows} emptyText="No students assigned yet." />;
}
