import { useState, useMemo } from "react";
import SearchBar from "../components/SearchBar";
import StudentTable from "../components/StudentTable";
import { students, departments, batches, statusOptions } from "../data/students.service";

const PAGE_SIZE = 5;

export default function MyStudents() {
  const [query, setQuery] = useState("");
  const [department, setDepartment] = useState("All");
  const [batch, setBatch] = useState("All");
  const [status, setStatus] = useState("All");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    return students.filter((s) => {
      const matchesQuery =
        s.name.toLowerCase().includes(query.toLowerCase()) ||
        s.enrollment.toLowerCase().includes(query.toLowerCase());
      const matchesDept = department === "All" || s.department === department;
      const matchesBatch = batch === "All" || s.batch === batch;
      const matchesStatus = status === "All" || s.status === status;
      return matchesQuery && matchesDept && matchesBatch && matchesStatus;
    });
  }, [query, department, batch, status]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  function updateFilter(setter, value) {
    setter(value);
    setPage(1);
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
            placeholder="Search by name or enrollment no."
            className="sm:w-80"
          />

          <div className="flex flex-wrap gap-2">
            <select
              value={department}
              onChange={(e) => updateFilter(setDepartment, e.target.value)}
              className="input-field w-auto py-2"
            >
              {departments.map((d) => (
                <option key={d} value={d}>{d === "All" ? "All Departments" : d}</option>
              ))}
            </select>
            <select
              value={batch}
              onChange={(e) => updateFilter(setBatch, e.target.value)}
              className="input-field w-auto py-2"
            >
              {batches.map((b) => (
                <option key={b} value={b}>{b === "All" ? "All Batches" : `Batch ${b}`}</option>
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