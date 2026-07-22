import { Search, RotateCcw } from "lucide-react";

const SELECT_CLASS =
  "rounded-xl border border-line bg-white px-3 py-2.5 text-sm font-body text-heading outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 transition-colors";

export default function InternshipFilters({ filters, onChange, onReset, companies = [], mentors = [], departments = [] }) {
  return (
    <div className="rounded-2xl border border-line bg-white p-4 flex flex-wrap items-center gap-3">
      <div className="relative flex-1 min-w-[220px]">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          type="text"
          value={filters.search}
          onChange={(e) => onChange({ ...filters, search: e.target.value })}
          placeholder="Search internships…"
          className="w-full rounded-xl border border-line bg-surface-alt pl-9 pr-3 py-2.5 text-sm font-body outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 transition-colors"
        />
      </div>

      <select value={filters.company} onChange={(e) => onChange({ ...filters, company: e.target.value })} className={SELECT_CLASS}>
        <option value="">All Companies</option>
        {companies.map((c) => <option key={c} value={c}>{c}</option>)}
      </select>

      <select value={filters.mentor} onChange={(e) => onChange({ ...filters, mentor: e.target.value })} className={SELECT_CLASS}>
        <option value="">All Mentors</option>
        {mentors.map((m) => <option key={m} value={m}>{m}</option>)}
      </select>

      <select value={filters.department} onChange={(e) => onChange({ ...filters, department: e.target.value })} className={SELECT_CLASS}>
        <option value="">All Departments</option>
        {departments.map((d) => <option key={d} value={d}>{d}</option>)}
      </select>

      <select value={filters.status} onChange={(e) => onChange({ ...filters, status: e.target.value })} className={SELECT_CLASS}>
        <option value="">All Status</option>
        <option value="Active">Active</option>
        <option value="Pending">Pending</option>
        <option value="Completed">Completed</option>
        <option value="Rejected">Rejected</option>
      </select>

      <button
        type="button"
        onClick={onReset}
        className="flex items-center gap-1.5 rounded-xl px-3 py-2.5 text-sm font-body text-slate-500 hover:bg-surface-alt hover:text-heading transition-colors"
      >
        <RotateCcw className="w-4 h-4" strokeWidth={1.75} />
        Reset
      </button>
    </div>
  );
}