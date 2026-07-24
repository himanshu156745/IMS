// src/features/dashboard/admin/companies/ManageCompanies.jsx
import React, { useMemo, useState, useEffect, useCallback } from "react";
import { FiPlus, FiDownload, FiRefreshCw } from "react-icons/fi";
import PageHeader from "../../../../components/ui/PageHeader";

import CompanyStats from "./components/CompanyStats";
import CompanyFilters from "./components/CompanyFilters";
import CompanyTable from "./components/CompanyTable";
import CompanyProfileDrawer from "./components/CompanyProfileDrawer";
import AddCompanyModal from "./components/AddCompanyModal";
import EditCompanyModal from "./components/EditCompanyModal";
import DeleteConfirmationModal from "./components/DeleteConfirmationModal";
import NotificationPanel from "./components/NotificationPanel";
import ActivityTimeline from "./components/ActivityTimeline";

import {
  companies as initialCompanies,
  notifications,
  activities,
  getCompanyStats,
} from "./data/companiesData";

const PAGE_SIZE = 8;

const DEFAULT_FILTERS = {
  search: "",
  industry: "All Industries",
  location: "All Locations",
  status: "All Status",
  verification: "All Verification",
  sort: "name-asc",
};

/**
 * NOTE ON SHARED COMPONENTS
 * -------------------------
 * Matches the real shared component APIs from src/components/ui:
 *   - PageHeader    : { title, subtitle, actions }
 *   - StatCard      : { label, value, sub, status: "onTrack"|"attention"|"overdue"|"neutral", trend }
 *   - Table         : { columns: [{ key, label, render(row) }], rows, emptyText }
 *   - Pagination    : { page, totalPages, onPageChange }
 *   - DropdownMenu  : { items: [{ label, Icon, onClick, danger? }] } (renders its own trigger)
 *   - Badge         : { variant: "onTrack"|"attention"|"overdue"|"neutral", children }
 *   - EmptyState    : { onCreateClick } — copy is hardcoded ("No Internships Found") in
 *                      the shared component itself, so it will show that text everywhere
 *                      it's used in this feature too. Update EmptyState.jsx to accept a
 *                      title/description prop if you want context-specific empty copy.
 *   - SkeletonLoader: named exports StatCardSkeleton / TableRowSkeleton / ExpandedDetailsSkeleton
 * All feature-specific logic (filtering, sorting, CRUD on dummy data)
 * lives in this file via useState/useMemo — no Redux, no Context, no API.
 */
export default function ManageCompanies() {
  const [companies, setCompanies] = useState(initialCompanies);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [page, setPage] = useState(1);

  const [selectedCompany, setSelectedCompany] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [editTarget, setEditTarget] = useState(null);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);

  // Simulate an initial fetch so SkeletonLoader has a purpose.
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 700);
    return () => clearTimeout(t);
  }, []);

  const stats = useMemo(() => getCompanyStats(companies), [companies]);

  const filteredCompanies = useMemo(() => {
    let rows = [...companies];
    const q = filters.search.trim().toLowerCase();

    if (q) {
      rows = rows.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.hrName.toLowerCase().includes(q) ||
          c.email.toLowerCase().includes(q)
      );
    }
    if (filters.industry !== "All Industries") {
      rows = rows.filter((c) => c.industry === filters.industry);
    }
    if (filters.location !== "All Locations") {
      rows = rows.filter((c) => c.location === filters.location);
    }
    if (filters.status !== "All Status") {
      rows = rows.filter((c) => c.status === filters.status);
    }
    if (filters.verification !== "All Verification") {
      rows = rows.filter((c) => c.verificationStatus === filters.verification);
    }

    switch (filters.sort) {
      case "name-desc":
        rows.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "rating-desc":
        rows.sort((a, b) => b.rating - a.rating);
        break;
      case "students-desc":
        rows.sort((a, b) => b.studentsAssigned - a.studentsAssigned);
        break;
      case "date-desc":
        rows.sort((a, b) => new Date(b.registrationDate) - new Date(a.registrationDate));
        break;
      default:
        rows.sort((a, b) => a.name.localeCompare(b.name));
    }

    return rows;
  }, [companies, filters]);

  const paginatedCompanies = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return filteredCompanies.slice(start, start + PAGE_SIZE);
  }, [filteredCompanies, page]);

  const totalPages = Math.max(1, Math.ceil(filteredCompanies.length / PAGE_SIZE));

  // Reset to page 1 whenever filters change.
  useEffect(() => setPage(1), [filters]);

  const handleFiltersChange = useCallback((next) => setFilters(next), []);

  // --- Row actions -----------------------------------------------------
  const openProfile = (company) => {
    setSelectedCompany(company);
    setDrawerOpen(true);
  };
  const closeProfile = () => setDrawerOpen(false);

  const openEdit = (company) => {
    setEditTarget(company);
    setEditOpen(true);
  };

  const handleVerify = (company) => {
    setCompanies((prev) =>
      prev.map((c) => (c.id === company.id ? { ...c, verificationStatus: "Verified" } : c))
    );
  };
  const handleSuspend = (company) => {
    setCompanies((prev) =>
      prev.map((c) => (c.id === company.id ? { ...c, status: "Inactive", verificationStatus: "Suspended" } : c))
    );
  };
  const handleActivate = (company) => {
    setCompanies((prev) => prev.map((c) => (c.id === company.id ? { ...c, status: "Active" } : c)));
  };

  const requestDelete = (company) => {
    setDeleteTarget(company);
    setDeleteOpen(true);
  };
  const confirmDelete = (company) => {
    setCompanies((prev) => prev.filter((c) => c.id !== company.id));
    setDeleteOpen(false);
    setDeleteTarget(null);
  };

  const handleAddSave = (newCompany) => {
    setCompanies((prev) => [newCompany, ...prev]);
    setAddOpen(false);
  };

  const handleEditSave = (updatedCompany) => {
    setCompanies((prev) => prev.map((c) => (c.id === updatedCompany.id ? updatedCompany : c)));
    setEditOpen(false);
    setEditTarget(null);
  };

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 600);
  };

  const handleExport = () => {
    const header = ["Name", "Industry", "Location", "HR Name", "Email", "Status", "Verification"];
    const rows = filteredCompanies.map((c) => [
      c.name,
      c.industry,
      c.location,
      c.hrName,
      c.email,
      c.status,
      c.verificationStatus,
    ]);
    const csv = [header, ...rows].map((r) => r.map((v) => `"${v}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "companies.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6 pb-10">
      <PageHeader
        title="Manage Companies"
        subtitle="Manage all registered companies, monitor internship activities and control company access."
        actions={
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={handleRefresh}
              className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-600 shadow-sm transition-colors hover:bg-slate-50"
            >
              <FiRefreshCw className="h-4 w-4" /> Refresh
            </button>
            <button
              type="button"
              onClick={handleExport}
              className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-600 shadow-sm transition-colors hover:bg-slate-50"
            >
              <FiDownload className="h-4 w-4" /> Export
            </button>
            <button
              type="button"
              onClick={() => setAddOpen(true)}
              className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-blue-700"
            >
              <FiPlus className="h-4 w-4" /> Add Company
            </button>
          </div>
        }
      />

      <CompanyStats stats={stats} loading={loading} />

      <CompanyFilters filters={filters} onChange={handleFiltersChange} />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <CompanyTable
            companies={paginatedCompanies}
            loading={loading}
            page={page}
            totalPages={totalPages}
            onPageChange={setPage}
            onView={openProfile}
            onEdit={openEdit}
            onVerify={handleVerify}
            onSuspend={handleSuspend}
            onActivate={handleActivate}
            onDelete={requestDelete}
            onAddCompany={() => setAddOpen(true)}
          />
        </div>

        <div className="space-y-6">
          <NotificationPanel notifications={notifications} />
          <ActivityTimeline activities={activities} />
        </div>
      </div>

      <CompanyProfileDrawer company={selectedCompany} open={drawerOpen} onClose={closeProfile} />

      <AddCompanyModal open={addOpen} onClose={() => setAddOpen(false)} onSave={handleAddSave} />

      <EditCompanyModal
        open={editOpen}
        company={editTarget}
        onClose={() => {
          setEditOpen(false);
          setEditTarget(null);
        }}
        onSave={handleEditSave}
      />

      <DeleteConfirmationModal
        open={deleteOpen}
        company={deleteTarget}
        onClose={() => {
          setDeleteOpen(false);
          setDeleteTarget(null);
        }}
        onConfirm={confirmDelete}
      />
    </div>
  );
}
