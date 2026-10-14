import { useState, useMemo, useEffect, useCallback } from "react";
import { Download, RefreshCw } from "lucide-react";
import PageHeader from "../../../../components/ui/PageHeader";
import Pagination from "../../../../components/ui/Pagination";
import InternshipStats from "./components/InternshipStats";
import InternshipFilters from "./components/InternshipFilters";
import InternshipTable from "./components/InternshipTable";
import InternshipsSkeleton from "./components/InternshipsSkeleton";
import axiosInstance from "../../../../utils/axiosInstance";
import { unwrapList, sanitizeCsvCell } from "../../../../utils/api";
import toast from "react-hot-toast";

const PAGE_SIZE = 10;

export default function ManageInternships() {
  const [internships, setInternships] = useState([]);
  const [stats, setStats] = useState({ total: 0, active: 0, pending: 0, completed: 0 });
  const [filters, setFilters] = useState({ search: "", company: "", mentor: "", department: "", status: "" });
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  const fetchStats = useCallback(async () => {
    try {
      const res = await axiosInstance.get('/admin/stats');
      const d = res.data?.data || {};
      setStats({
        total: d.totalInternships ?? 0,
        active: d.activeInternships ?? 0,
        pending: d.pendingInternships ?? 0,
        completed: d.completedInternships ?? 0,
      });
    } catch (err) {
      console.error("Failed to load admin stats for internships", err);
    }
  }, []);

  const fetchInternships = useCallback(async () => {
    setLoading(true);
    try {
      const params = {
        limit: 100,
        search: filters.search ? filters.search : undefined,
        status: filters.status ? filters.status : undefined,
        department: filters.department ? filters.department : undefined,
      };
      let res;
      try {
        res = await axiosInstance.get('/admin/internships', { params });
      } catch {
        res = await axiosInstance.get('/internships', { params });
      }
      const list = unwrapList(res);
      setInternships(list);
    } catch (err) {
      console.error("Failed to load internships", err);
    } finally {
      setLoading(false);
      setInitialLoading(false);
    }
  }, [filters.search, filters.status, filters.department]);

  useEffect(() => {
    fetchStats();
    fetchInternships();
  }, [fetchStats, fetchInternships]);

  const filtered = useMemo(() => {
    return internships.filter((r) => {
      if (filters.search && !r.name?.toLowerCase().includes(filters.search.toLowerCase())) return false;
      if (filters.company && r.company !== filters.company) return false;
      if (filters.mentor && r.mentor !== filters.mentor) return false;
      if (filters.department && r.department !== filters.department) return false;
      if (filters.status) {
        const matchesStatus = r.status?.toLowerCase() === filters.status.toLowerCase() ||
          r.rawStatus?.toLowerCase() === filters.status.toLowerCase() ||
          (filters.status.toLowerCase() === 'active' && r.rawStatus === 'open');
        if (!matchesStatus) return false;
      }
      return true;
    });
  }, [internships, filters]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const companies = useMemo(() => [...new Set(internships.map((r) => r.company).filter(Boolean))], [internships]);
  const mentors = useMemo(() => [...new Set(internships.map((r) => r.mentor).filter(Boolean))], [internships]);
  const departments = useMemo(() => [...new Set(internships.map((r) => r.department).filter(Boolean))], [internships]);

  const handleReset = () => {
    setFilters({ search: "", company: "", mentor: "", department: "", status: "" });
    setPage(1);
  };

  const handleRefresh = () => {
    fetchStats();
    fetchInternships();
  };

  const handleAction = async (actionType, row) => {
    const internshipId = row.id || row._id;
    if (!internshipId) return;

    if (actionType === 'delete') {
      if (!window.confirm(`Are you sure you want to delete "${row.name}"?`)) return;
      try {
        await axiosInstance.delete(`/internships/${internshipId}`);
        setInternships((prev) => prev.filter((i) => (i.id || i._id) !== internshipId));
        toast.success(`Internship "${row.name}" deleted successfully`);
        fetchStats();
      } catch (err) {
        console.error("Failed to delete internship", err);
        toast.error(err.response?.data?.message || "Failed to delete internship");
      }
    } else if (actionType === 'status') {
      const nextStatus = row.rawStatus === 'open' ? 'closed' : 'open';
      try {
        await axiosInstance.patch(`/internships/${internshipId}`, { status: nextStatus });
        setInternships((prev) =>
          prev.map((i) => {
            if ((i.id || i._id) === internshipId) {
              return {
                ...i,
                rawStatus: nextStatus,
                status: nextStatus === 'open' ? 'Active' : 'Completed',
              };
            }
            return i;
          })
        );
        toast.success(`Internship status changed to ${nextStatus}`);
        fetchStats();
      } catch (err) {
        console.error("Failed to update status", err);
        toast.error(err.response?.data?.message || "Failed to update status");
      }
    }
  };

  const handleExport = () => {
    if (filtered.length === 0) return;
    const headers = ["Name", "Company", "Mentor", "Department", "Applicants", "Status", "Deadline"];
    const csvRows = [
      headers.map(sanitizeCsvCell).join(","),
      ...filtered.map((r) =>
        [
          sanitizeCsvCell(r.name || ""),
          sanitizeCsvCell(r.company || ""),
          sanitizeCsvCell(r.mentor || ""),
          sanitizeCsvCell(r.department || ""),
          sanitizeCsvCell(r.applicants || 0),
          sanitizeCsvCell(r.status || ""),
          sanitizeCsvCell(r.deadline || ""),
        ].join(",")
      ),
    ];
    const blob = new Blob([csvRows.join("\n")], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `internships_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Internships exported to CSV");
  };

  if (initialLoading) {
    return <InternshipsSkeleton />;
  }

  return (
    <div className="bg-surface-alt/40 -m-6 md:-m-8 p-6 md:p-8 min-h-full">
      <PageHeader
        title="Manage Internships"
        subtitle="View, organize and monitor all internship opportunities."
        actions={
          <>
            <button
              onClick={handleExport}
              className="flex items-center gap-1.5 rounded-xl border border-line bg-white px-3.5 py-2 text-sm font-body text-heading hover:bg-surface-alt transition-colors"
            >
              <Download className="w-4 h-4" strokeWidth={1.75} />
              Export
            </button>
            <button
              onClick={handleRefresh}
              className="flex items-center gap-1.5 rounded-xl bg-primary px-3.5 py-2 text-sm font-body text-white hover:bg-primary/90 transition-colors"
            >
              <RefreshCw className="w-4 h-4" strokeWidth={1.75} />
              Refresh
            </button>
          </>
        }
      />

      <div className="space-y-5">
        <InternshipStats stats={stats} />

        <InternshipFilters
          filters={filters}
          onChange={(f) => {
            setFilters(f);
            setPage(1);
          }}
          onReset={handleReset}
          companies={companies}
          mentors={mentors}
          departments={departments}
        />

        <InternshipTable rows={paginated} loading={loading} onAction={handleAction} />

        {!loading && filtered.length > 0 && (
          <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
        )}
      </div>
    </div>
  );
}
