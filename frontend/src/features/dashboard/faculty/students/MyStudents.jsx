import { useState, useMemo, useEffect } from "react";
import toast from "react-hot-toast";
import SearchBar from "../components/SearchBar";
import StudentTable from "../components/StudentTable";
import { facultyService } from "../services/faculty.service";

const PAGE_SIZE = 5;
const departments = ["All", "B.Tech", "MCA", "BBA", "BCA"];
const statusOptions = ["All", "Ongoing", "Completed", "Pending"];

export default function MyStudents() {
  const [query, setQuery] = useState("");
  const [department, setDepartment] = useState("All");
  const [status, setStatus] = useState("All");
  const [page, setPage] = useState(1);
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await facultyService.getMyStudents();
        const formattedStudents = res.data.map(profile => ({
          id: profile.user._id || profile.user,
          name: profile.fullName || "Unknown",
          photo: profile.avatarUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(profile.fullName || 'U')}`,
          department: profile.course || "N/A",
          enrollment: profile.user.email ? profile.user.email.split('@')[0] : "N/A",
          company: "Unassigned", // To be fetched from their active application
          role: "Intern",
          status: "Pending", // Mock for now
          progress: 0 // Mock for now
        }));
        setStudents(formattedStudents);
      } catch {
        toast.error("Failed to fetch students");
      } finally {
        setIsLoading(false);
      }
    };
    fetchStudents();
  }, []);

  const filtered = useMemo(() => {
    return students.filter((s) => {
      const matchesQuery =
        s.name.toLowerCase().includes(query.toLowerCase()) ||
        s.enrollment.toLowerCase().includes(query.toLowerCase());
      const matchesDept = department === "All" || s.department === department;
      const matchesStatus = status === "All" || s.status === status;
      return matchesQuery && matchesDept && matchesStatus;
    });
  }, [query, department, status, students]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  function updateFilter(setter, value) {
    setter(value);
    setPage(1);
  }

  if (isLoading) {
    return <div className="p-8 text-center text-slate-500">Loading students...</div>;
  }

  return (
    <div className="animate-fadeIn space-y-6">
      <div className="card p-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <SearchBar
            value={query}
            onChange={(v) => {
              setQuery(v);
              setPage(1);
            }}
            placeholder="Search by name or email prefix."
            className="sm:w-80"
          />

          <div className="flex flex-wrap gap-2">
            <select
              value={department}
              onChange={(e) => updateFilter(setDepartment, e.target.value)}
              className="input-field w-auto py-2"
            >
              {departments.map((d) => (
                <option key={d} value={d}>{d === "All" ? "All Courses" : d}</option>
              ))}
            </select>
            <select
              value={status}
              onChange={(e) => updateFilter(setStatus, e.target.value)}
              className="input-field w-auto py-2"
            >
              {statusOptions.map((s) => (
                <option key={s} value={s}>{s === "All" ? "All Status" : s}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="card p-5">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-bold text-slate-800">
            Students <span className="font-medium text-slate-400">({filtered.length})</span>
          </h3>
        </div>

        {paginated.length > 0 ? (
          <StudentTable students={paginated} />
        ) : (
          <p className="py-10 text-center text-sm text-slate-400">No students match your filters.</p>
        )}

        {filtered.length > 0 && (
          <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4">
            <p className="text-sm text-slate-400">
              Page {page} of {totalPages}
            </p>
            <div className="flex gap-2">
              <button
                disabled={page === 1}
                onClick={() => setPage((p) => p - 1)}
                className="btn-secondary px-3 py-1.5 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Previous
              </button>
              <button
                disabled={page === totalPages}
                onClick={() => setPage((p) => p + 1)}
                className="btn-secondary px-3 py-1.5 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}