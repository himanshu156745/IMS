// src/features/dashboard/admin/companies/ManageCompanies.jsx
import { useMemo, useState, useEffect, useCallback } from "react";
import { FiPlus, FiDownload, FiRefreshCw } from "react-icons/fi";
import PageHeader from "../../../../components/ui/PageHeader";

import CompaniesSkeleton from "./components/CompaniesSkeleton";
import CompanyFilters from "./components/CompanyFilters";
import CompanyTable from "./components/CompanyTable";
import CompanyProfileDrawer from "./components/CompanyProfileDrawer";
import AddCompanyModal from "./components/AddCompanyModal";
import EditCompanyModal from "./components/EditCompanyModal";
import DeleteConfirmationModal from "./components/DeleteConfirmationModal";
import NotificationPanel from "./components/NotificationPanel";
import ActivityTimeline from "../../../../components/ui/ActivityTimeline";
import axiosInstance from "../../../../utils/axiosInstance";
import { toast } from "react-hot-toast";

import {
  notifications,
  activities,
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

export default function ManageCompanies() {
  const [companies, setCompanies] = useState([]);
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

  const fetchCompanies = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get('/admin/companies');
      const formattedCompanies = response.data.data.map((c) => ({
        id: c._id,
        name: c.name,
        industry: c.industry || "Other",
        location: c.location,
        hrName: c.hrName || "N/A",
        email: c.user?.email || "",
        status: c.user?.isActive ? "Active" : "Inactive",
        verificationStatus: c.verificationStatus || "Pending",
        website: c.website || "",
        description: c.description || "",
        registrationDate: c.createdAt,
        user: c.user?._id,
      }));
      setCompanies(formattedCompanies);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to fetch companies');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  const filteredCompanies = useMemo(() => {
    let rows = [...companies];
    const q = filters.search.trim().toLowerCase();

    if (q) {
      rows = rows.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.hrName.toLowerCase().includes(q) ||
          c.email.toLowerCase().includes(q),
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
        rows.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case "students-desc":
        rows.sort((a, b) => (b.studentsAssigned || 0) - (a.studentsAssigned || 0));
        break;
      case "date-desc":
        rows.sort(
          (a, b) => new Date(b.registrationDate) - new Date(a.registrationDate),
        );
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

  const totalPages = Math.max(
    1,
    Math.ceil(filteredCompanies.length / PAGE_SIZE),
  );

  const handleFiltersChange = useCallback((next) => {
    setFilters(next);
    setPage(1);
  }, []);

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

  const handleVerify = async (company) => {
    try {
      await axiosInstance.patch(`/admin/companies/${company.id}/verification`, {
        verificationStatus: 'Verified',
      });
      toast.success('Company verified successfully');
      fetchCompanies();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to verify company');
    }
  };

  const handleSuspend = async (company) => {
    try {
      await axiosInstance.patch(`/admin/companies/${company.id}/verification`, {
        verificationStatus: 'Suspended',
      });
      toast.success('Company suspended successfully');
      fetchCompanies();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to suspend company');
    }
  };

  const handleActivate = async (company) => {
    try {
      await axiosInstance.patch(`/admin/users/${company.user}/status`, {
        isActive: true,
      });
      toast.success('Company activated successfully');
      fetchCompanies();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to activate company');
    }
  };

  const requestDelete = (company) => {
    setDeleteTarget(company);
    setDeleteOpen(true);
  };

  const confirmDelete = async (company) => {
    try {
      await axiosInstance.delete(`/admin/companies/${company.id}`);
      toast.success('Company deleted successfully');
      setDeleteOpen(false);
      setDeleteTarget(null);
      fetchCompanies();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to delete company');
    }
  };

  const handleAddSave = async (newCompany) => {
    try {
      await axiosInstance.post('/admin/companies', newCompany);
      toast.success('Company added successfully');
      setAddOpen(false);
      fetchCompanies();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to add company');
    }
  };

  const handleEditSave = async (updatedCompany) => {
    try {
      await axiosInstance.put(`/admin/companies/${updatedCompany.id}`, updatedCompany);
      toast.success('Company updated successfully');
      setEditOpen(false);
      setEditTarget(null);
      fetchCompanies();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update company');
    }
  };

  const handleRefresh = () => {
    fetchCompanies();
  };

  const handleExport = () => {
    const header = [
      "Name",
      "Industry",
      "Location",
      "HR Name",
      "Email",
      "Status",
      "Verification",
    ];
    const rows = filteredCompanies.map((c) => [
      c.name,
      c.industry,
      c.location,
      c.hrName,
      c.email,
      c.status,
      c.verificationStatus,
    ]);
    const csv = [header, ...rows]
      .map((r) => r.map((v) => `"${v}"`).join(","))
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "companies.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return <CompaniesSkeleton />;
  }

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

      <CompanyFilters filters={filters} onChange={handleFiltersChange} />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <CompanyTable
            companies={paginatedCompanies}
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

      <CompanyProfileDrawer
        company={selectedCompany}
        open={drawerOpen}
        onClose={closeProfile}
      />

      <AddCompanyModal
        open={addOpen}
        onClose={() => setAddOpen(false)}
        onSave={handleAddSave}
      />

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