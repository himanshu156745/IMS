import { useState, useMemo, useEffect } from "react";
import { Download, Plus } from "lucide-react";
import PageHeader from "../../../../components/ui/PageHeader";
import FacultySkeleton from "./components/FacultySkeleton";
import Pagination from "../../../../components/ui/Pagination";
import FacultyStats from "./components/FacultyStats";
import FacultyFilters from "./components/FacultyFilters";
import FacultyTable from "./components/FacultyTable";
import ConfirmationModal from "./components/ConfirmationModal";
import axiosInstance from "../../../../utils/axiosInstance";
import { unwrapList, sanitizeCsvCell } from "../../../../utils/api";
import toast from "react-hot-toast";

const PAGE_SIZE = 10;

const EMPTY_FILTERS = {
  name: "",
  department: "",
  status: "",
  experience: "",
  sort: "",
};

export default function ManageFaculty() {
  const [faculty, setFaculty] = useState([]);
  const [filters, setFilters] = useState(EMPTY_FILTERS);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [confirmation, setConfirmation] = useState(null);

  const fetchFaculty = () => {
    setLoading(true);
    return axiosInstance.get('/admin/users?role=faculty')
      .then((res) => {
        const live = unwrapList(res);
        if (Array.isArray(live)) {
          const formatted = live.map((item, idx) => {
            const profile = item.facultyProfile || item.profile || {};
            return {
              _id: item._id,
              id: profile.employeeId || item._id,
              userId: item._id,
              user: item._id,
              name: profile.fullName || item.email?.split('@')[0] || "Faculty Member",
              facultyId: profile.employeeId || `FAC${String(idx + 1).padStart(3, "0")}`,
              photo: profile.avatarUrl || `https://i.pravatar.cc/150?u=${item._id || idx}`,
              email: item.email || "faculty@college.edu",
              phone: profile.phoneNumber || "N/A",
              department: profile.department || "Computer Science",
              designation: profile.designation || "Assistant Professor",
              qualification: "Ph.D. / M.Tech",
              experience: 8,
              subjects: ["Software Engineering", "Computer Networks"],
              gender: "Not Specified",
              joiningDate: item.createdAt ? new Date(item.createdAt).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }) : "N/A",
              address: "University Campus",
              studentsAssigned: profile.assignedStudents?.length || 0,
              status: item.isActive ? "Active" : "Inactive",
              rating: 4.6,
            };
          });
          setFaculty(formatted);
        } else {
          setFaculty([]);
        }
      })
      .catch((err) => {
        console.error("Failed to fetch faculty:", err);
        setFaculty([]);
      })
      .finally(() => {
        setLoading(false);
        setInitialLoading(false);
      });
  };

  useEffect(() => {
    fetchFaculty();
  }, []);

  const filtered = useMemo(() => {
    let result = faculty.filter((f) => {
      if (
        filters.name &&
        !f.name.toLowerCase().includes(filters.name.toLowerCase()) &&
        !f.facultyId.toLowerCase().includes(filters.name.toLowerCase())
      )
        return false;
      if (filters.department && f.department !== filters.department) return false;
      if (filters.status && f.status !== filters.status) return false;
      if (filters.experience) {
        const [min, max] = filters.experience.replace("+", "-999").split("-").map(Number);
        if (f.experience < min || f.experience > max) return false;
      }
      return true;
    });

    if (filters.sort === "name-asc") result = [...result].sort((a, b) => a.name.localeCompare(b.name));
    if (filters.sort === "experience-desc") result = [...result].sort((a, b) => b.experience - a.experience);
    if (filters.sort === "rating-desc") result = [...result].sort((a, b) => b.rating - a.rating);

    return result;
  }, [faculty, filters]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleReset = () => {
    setFilters(EMPTY_FILTERS);
    setPage(1);
  };

  const handleExport = () => {
    if (filtered.length === 0) return;
    const headers = ["Name", "Email", "Department", "Designation", "Phone", "Status", "Experience"];
    const csvRows = [
      headers.map(sanitizeCsvCell).join(","),
      ...filtered.map((f) =>
        [
          sanitizeCsvCell(f.name || ""),
          sanitizeCsvCell(f.email || ""),
          sanitizeCsvCell(f.department || ""),
          sanitizeCsvCell(f.designation || ""),
          sanitizeCsvCell(f.phone || ""),
          sanitizeCsvCell(f.status || ""),
          sanitizeCsvCell(f.experience || ""),
        ].join(",")
      ),
    ];
    const blob = new Blob([csvRows.join("\n")], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `faculty_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Faculty exported to CSV");
  };

  const updateFaculty = async (updated) => {
    setFaculty((prev) => prev.map((f) => (f.id === updated.id ? updated : f)));
    const targetUserId = updated.userId || updated.user || updated._id || (typeof updated.id === 'string' && updated.id.length === 24 ? updated.id : null);
    if (targetUserId) {
      try {
        const isActive = updated.status === "Active";
        await axiosInstance.patch(`/admin/users/${targetUserId}/status`, { isActive });
        toast.success(`Faculty status set to ${updated.status}`);
      } catch (err) {
        console.error("Failed to update faculty status:", err);
        toast.error(err.response?.data?.message || "Failed to update faculty status");
      }
    }
  };

  const handleAction = (key, member) => {
    switch (key) {
      case "view":
        toast.info(`Viewing profile for ${member.name}`);
        break;
      case "edit":
        toast.info(`Edit faculty: ${member.name}`);
        break;
      case "assign":
        toast.info(`Assign students: ${member.name}`);
        break;
      case "deactivate":
        setConfirmation({
          title: "Deactivate Faculty",
          message: `Deactivate ${member.name}? They will lose access until reactivated.`,
          confirmLabel: "Deactivate",
          danger: true,
          onConfirm: () => updateFaculty({ ...member, status: "Inactive" }),
        });
        break;
      case "activate":
        updateFaculty({ ...member, status: "Active" });
        break;
      case "resetPassword":
        setConfirmation({
          title: "Reset Password",
          message: `Send a password reset link to ${member.name} (${member.email})?`,
          confirmLabel: "Send Reset Link",
          onConfirm: () => toast.success(`Password reset link sent to ${member.email}`),
        });
        break;
      case "delete":
        setConfirmation({
          title: "Delete Faculty",
          message: `Delete ${member.name} permanently? This action cannot be undone.`,
          confirmLabel: "Delete",
          danger: true,
          onConfirm: async () => {
            setFaculty((prev) => prev.filter((f) => f.id !== member.id));
            const targetUserId = member.userId || member.user || member._id || (typeof member.id === 'string' && member.id.length === 24 ? member.id : null);
            if (targetUserId) {
              try {
                await axiosInstance.delete(`/admin/users/${targetUserId}`);
                toast.success(`${member.name} deleted successfully`);
              } catch (err) {
                console.error("Failed to delete faculty user:", err);
                toast.error(err.response?.data?.message || "Failed to delete faculty");
              }
            } else {
              toast.success(`${member.name} removed`);
            }
          },
        });
        break;
      default:
        break;
    }
  };

  if (initialLoading) {
    return <FacultySkeleton />;
  }

  return (
    <div className="bg-surface-alt/40 -m-6 md:-m-8 p-6 md:p-8 min-h-full">
      <PageHeader
        title="Manage Faculty"
        subtitle="View, add and manage faculty mentors, their departments, subjects and assigned students."
        actions={
          <>
            <button
              onClick={handleExport}
              className="flex items-center gap-1.5 rounded-xl border border-line bg-white px-3.5 py-2 text-sm font-body text-heading hover:bg-surface-alt transition-colors"
            >
              <Download className="w-4 h-4" strokeWidth={1.75} />
              Export
            </button>
            <button className="flex items-center gap-1.5 rounded-xl bg-primary px-3.5 py-2 text-sm font-body text-white hover:bg-primary/90 transition-colors">
              <Plus className="w-4 h-4" strokeWidth={1.75} />
              Add Faculty
            </button>
          </>
        }
      />

      <div className="space-y-5">
        <FacultyStats faculty={faculty} />

        <FacultyFilters
          filters={filters}
          onChange={(f) => {
            setFilters(f);
            setPage(1);
          }}
          onReset={handleReset}
        />

        <FacultyTable rows={paginated} loading={loading} onAction={handleAction} />

        {!loading && filtered.length > 0 && (
          <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
        )}
      </div>

      {confirmation && (
        <ConfirmationModal
          config={confirmation}
          onClose={() => setConfirmation(null)}
          onConfirm={() => {
            confirmation.onConfirm();
            setConfirmation(null);
          }}
        />
      )}
    </div>
  );
}
