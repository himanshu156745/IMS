import { Search, RotateCcw } from "lucide-react";
import { APPLICATION_STATUSES } from "../utils/statusVariants";
import { PRIORITY_LEVELS } from "../utils/priorityVariants";
import { COLLEGES, BRANCHES } from "../data/applicationsData";

const inputClass =
  "w-full rounded-xl border border-line bg-white px-3.5 py-2 text-sm font-body text-heading placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors";

export default function ApplicationFilters({ filters, onChange, onReset }) {
  const update = (key) => (e) => onChange({ ...filters, [key]: e.target.value });

  return (
    <div className="rounded-2xl border border-line bg-white p-4 space-y-3">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" strokeWidth={1.75} />
        <input
          type="text"
          placeholder="Search by student name, email, internship, college or skill"
          value={filters.query}
          onChange={update("query")}
          className={`${inputClass} pl-9`}
        />
      </div>

      <div className="flex flex-wrap gap-3">
        <select className={`${inputClass} md:w-48`} value={filters.status} onChange={update("status")}>
          <option value="">All Status</option>
          {APPLICATION_STATUSES.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>

        <select className={`${inputClass} md:w-48`} value={filters.branch} onChange={update("branch")}>
          <option value="">All Branches</option>
          {BRANCHES.map((b) => (
            <option key={b} value={b}>{b}</option>
          ))}
        </select>

        <select className={`${inputClass} md:w-48`} value={filters.college} onChange={update("college")}>
          <option value="">All Colleges</option>
          {COLLEGES.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>

        <select className={`${inputClass} md:w-40`} value={filters.priority} onChange={update("priority")}>
          <option value="">All Priority</option>
          {PRIORITY_LEVELS.map((p) => (
            <option key={p} value={p}>{p}</option>
          ))}
        </select>

        <select className={`${inputClass} md:w-40`} value={filters.minCgpa} onChange={update("minCgpa")}>
          <option value="">Any CGPA</option>
          <option value="9">9.0+</option>
          <option value="8">8.0+</option>
          <option value="7">7.0+</option>
          <option value="6">6.0+</option>
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