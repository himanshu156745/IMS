// src/features/dashboard/admin/companies/components/CompanyTable.jsx
import React from "react";
import { FiStar, FiGlobe, FiMail, FiPhone } from "react-icons/fi";
import Table from "../../../../../components/ui/Table";
import Pagination from "../../../../../components/ui/Pagination";
import { TableRowSkeleton } from "../../../../../components/ui/SkeletonLoader";
import EmptyState from "../../../../../components/ui/EmptyState";
import StatusBadge from "./StatusBadge";
import ActionDropdown from "./ActionDropdown";

/**
 * Builds the column config consumed by the shared <Table />.
 * Table's API is { columns: [{ key, label, render(row) }], rows, emptyText }.
 */
function buildColumns({ onView, onEdit, onVerify, onSuspend, onActivate, onDelete }) {
  return [
    {
      key: "company",
      label: "Company",
      render: (row) => (
        <button
          type="button"
          onClick={() => onView(row)}
          className="flex items-center gap-3 text-left"
        >
          <div
            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-xs font-semibold text-white ${row.logoColor}`}
          >
            {row.logo}
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-ink hover:text-primary">{row.name}</p>
            <p className="flex items-center gap-1 truncate text-xs text-slate-400">
              <FiGlobe className="h-3 w-3" /> {row.website.replace("https://", "")}
            </p>
          </div>
        </button>
      ),
    },
    { key: "industry", label: "Industry", render: (row) => <span className="text-sm text-slate-600">{row.industry}</span> },
    { key: "location", label: "Location", render: (row) => <span className="text-sm text-slate-600">{row.location}</span> },
    {
      key: "hr",
      label: "HR Contact",
      render: (row) => (
        <div>
          <p className="text-sm font-medium text-ink">{row.hrName}</p>
          <p className="flex items-center gap-1 text-xs text-slate-400">
            <FiMail className="h-3 w-3" /> {row.hrEmail}
          </p>
          <p className="flex items-center gap-1 text-xs text-slate-400">
            <FiPhone className="h-3 w-3" /> {row.hrPhone}
          </p>
        </div>
      ),
    },
    {
      key: "internships",
      label: "Internships",
      render: (row) => <span className="text-sm font-medium text-ink">{row.activeInternships}</span>,
    },
    {
      key: "students",
      label: "Students",
      render: (row) => <span className="text-sm font-medium text-ink">{row.studentsAssigned}</span>,
    },
    {
      key: "rating",
      label: "Rating",
      render: (row) => (
        <span className="flex items-center gap-1 text-sm font-medium text-amber-500">
          <FiStar className="h-3.5 w-3.5 fill-amber-400 text-amber-400" /> {row.rating}
        </span>
      ),
    },
    {
      key: "verification",
      label: "Verification",
      render: (row) => <StatusBadge status={row.verificationStatus} />,
    },
    {
      key: "actions",
      label: "Actions",
      render: (row) => (
        <ActionDropdown
          company={row}
          onView={onView}
          onEdit={onEdit}
          onVerify={onVerify}
          onSuspend={onSuspend}
          onActivate={onActivate}
          onDelete={onDelete}
        />
      ),
    },
  ];
}

export default function CompanyTable({
  companies,
  loading,
  page,
  totalPages,
  onPageChange,
  onView,
  onEdit,
  onVerify,
  onSuspend,
  onActivate,
  onDelete,
  onAddCompany,
}) {
  if (loading) {
    return (
      <div className="overflow-hidden rounded-md bg-white shadow-sm">
        <table className="w-full text-sm font-body">
          <tbody>
            {Array.from({ length: 6 }).map((_, i) => (
              <TableRowSkeleton key={i} />
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  if (!companies.length) {
    return (
      <div className="rounded-md bg-white shadow-sm">
        <EmptyState onCreateClick={onAddCompany} />
      </div>
    );
  }

  const columns = buildColumns({ onView, onEdit, onVerify, onSuspend, onActivate, onDelete });

  return (
    <div className="space-y-2">
      <Table columns={columns} rows={companies} emptyText="No companies found." />
      {totalPages > 1 && <Pagination page={page} totalPages={totalPages} onPageChange={onPageChange} />}
    </div>
  );
}
