import { Search, RotateCcw } from "lucide-react";
import { DEPARTMENTS, FACULTY_STATUSES } from "../data/facultyData";

const inputClass =
  "w-full rounded-xl border border-line bg-white px-3.5 py-2 text-sm font-body text-heading placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors";

export default function FacultyFilters({ filters, onChange, onReset }) {
  const update = (key) => (e) => onChange({ ...filters, [key]: e.target.value });

  return (
    <div className="rounded-2xl border border-line bg-white p-4 space-y-3">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" strokeWidth={1.75} />
        <input
          type="text"
          placeholder="Search by faculty name or ID"
          value={filters.name}
          onChange={update("name")}
          className={`${inputClass} pl-9`}
        />
      </div>

      <div className="flex flex-wrap gap-3">
        <select className={`${inputClass} md:w-48`} value={filters.department} onChange={update("department")}>
          <option value="">All Departments</option>
          {DEPARTMENTS.map((d) => (
            <option key={d} value={d}>{d}</option>
          ))}
        </select>

        <select className={`${inputClass} md:w-48`} value={filters.status} onChange={update("status")}>
          <option value="">All Status</option>
          {FACULTY_STATUSES.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>

        <select className={`${inputClass} md:w-48`} value={filters.experience} onChange={update("experience")}>
          <option value="">All Experience</option>
          <option value="0-5">0–5 years</option>
          <option value="6-10">6–10 years</option>
          <option value="11-15">11–15 years</option>
          <option value="16+">16+ years</option>
        </select>

        <select className={`${inputClass} md:w-40`} value={filters.sort} onChange={update("sort")}>
          <option value="">Sort By</option>
          <option value="name-asc">Name (A–Z)</option>
          <option value="experience-desc">Experience (High–Low)</option>
          <option value="rating-desc">Rating (High–Low)</option>
        </select>

        <button
          type="button"
          onClick={onReset}
          className="flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-sm font-body text-slate-500 hover:bg-surface-alt transition-colors"
        >
          <RotateCcw className="w-4 h-4" strokeWidth={1.75} />
          Reset Filters
        </button>
      </div>
    </div>
  );
}