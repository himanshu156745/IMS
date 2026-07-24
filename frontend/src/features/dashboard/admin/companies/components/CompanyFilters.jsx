// src/features/dashboard/admin/companies/components/CompanyFilters.jsx
import React from "react";
import { FiSearch, FiChevronDown } from "react-icons/fi";
import {
  industryOptions,
  locationOptions,
  statusOptions,
  verificationOptions,
  sortOptions,
} from "../data/companiesData";

function SelectField({ label, value, onChange, options, renderOption }) {
  return (
    <div className="relative">
      <select
        aria-label={label}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="peer w-full cursor-pointer appearance-none rounded-xl border border-slate-200 bg-white py-2.5 pl-3 pr-9 text-sm text-slate-700 shadow-sm transition-colors hover:border-slate-300 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
      >
        {options.map((opt) =>
          renderOption ? (
            renderOption(opt)
          ) : (
            <option key={opt} value={opt}>
              {opt}
            </option>
          )
        )}
      </select>
      <FiChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
    </div>
  );
}

/**
 * Search input + filter selects. Fully controlled — parent
 * (ManageCompanies) owns the filter state and passes it down.
 */
export default function CompanyFilters({ filters, onChange }) {
  const set = (key) => (value) => onChange({ ...filters, [key]: value });

  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-6">
        <div className="relative lg:col-span-2">
          <FiSearch className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={filters.search}
            onChange={(e) => set("search")(e.target.value)}
            placeholder="Search company, HR name or email..."
            className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-9 pr-3 text-sm text-slate-700 shadow-sm transition-colors placeholder:text-slate-400 hover:border-slate-300 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
          />
        </div>

        <SelectField label="Industry" value={filters.industry} onChange={set("industry")} options={industryOptions} />
        <SelectField label="Location" value={filters.location} onChange={set("location")} options={locationOptions} />
        <SelectField label="Status" value={filters.status} onChange={set("status")} options={statusOptions} />
        <SelectField
          label="Verification"
          value={filters.verification}
          onChange={set("verification")}
          options={verificationOptions}
        />
      </div>

      <div className="mt-3 flex items-center justify-end gap-2 border-t border-slate-50 pt-3">
        <span className="text-xs font-medium text-slate-400">Sort by</span>
        <SelectField
          label="Sort by"
          value={filters.sort}
          onChange={set("sort")}
          options={sortOptions}
          renderOption={(opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          )}
        />
      </div>
    </div>
  );
}
