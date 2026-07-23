import { Search, RotateCcw } from "lucide-react";
import { HIRING_STATUSES, INTERVIEW_STATUSES, APPLICATION_STATUSES } from "../utils/statusVariants";

const inputClass =
  "w-full rounded-xl border border-line bg-white px-3.5 py-2 text-sm font-body text-heading placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors";

export default function StudentFilters({ filters, onChange, onReset, colleges }) {
  const update = (key) => (e) => onChange({ ...filters, [key]: e.target.value });

  return (
    <div className="rounded-2xl border border-line bg-white p-4 space-y-3">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" strokeWidth={1.75} />
          <input
            type="text"
            placeholder="Search by name"
            value={filters.name}
            onChange={update("name")}
            className={`${inputClass} pl-9`}
          />
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" strokeWidth={1.75} />
          <input
            type="text"
            placeholder="Search by email"
            value={filters.email}
            onChange={update("email")}
            className={`${inputClass} pl-9`}
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <select className={`${inputClass} md:w-48`} value={filters.college} onChange={update("college")}>
          <option value="">All Colleges</option>
          {colleges.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>

        <select className={`${inputClass} md:w-48`} value={filters.hiringStatus} onChange={update("hiringStatus")}>
          <option value="">All Hiring Status</option>
          {HIRING_STATUSES.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>

        <select className={`${inputClass} md:w-48`} value={filters.interviewStatus} onChange={update("interviewStatus")}>
          <option value="">All Interview Status</option>
          {INTERVIEW_STATUSES.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>

        <select className={`${inputClass} md:w-48`} value={filters.applicationStatus} onChange={update("applicationStatus")}>
          <option value="">All Application Status</option>
          {APPLICATION_STATUSES.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
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