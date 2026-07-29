// src/features/dashboard/admin/companies/components/ActivityTimeline.jsx
import React from "react";
import { FiUserPlus, FiCheckCircle, FiBriefcase, FiUsers, FiXCircle, FiActivity } from "react-icons/fi";
import EmptyState from "../../../../../components/ui/EmptyState";

const TYPE_META = {
  "Company Registered": { icon: FiUserPlus, style: "bg-blue-50 text-blue-600 ring-blue-100" },
  "Company Verified": { icon: FiCheckCircle, style: "bg-emerald-50 text-emerald-600 ring-emerald-100" },
  "Internship Posted": { icon: FiBriefcase, style: "bg-indigo-50 text-indigo-600 ring-indigo-100" },
  "Student Assigned": { icon: FiUsers, style: "bg-cyan-50 text-cyan-600 ring-cyan-100" },
  "Internship Closed": { icon: FiXCircle, style: "bg-rose-50 text-rose-600 ring-rose-100" },
};

export default function ActivityTimeline({ activities }) {
  if (!activities?.length) {
    return <EmptyState />;
  }

  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
      <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold text-slate-700">
        <FiActivity className="h-4 w-4 text-blue-600" /> Activity Timeline
      </h3>
      <ol className="relative ml-3 space-y-5 border-l border-slate-100 pl-6">
        {activities.map((a) => {
          const meta = TYPE_META[a.type] || { icon: FiActivity, style: "bg-slate-50 text-slate-600 ring-slate-100" };
          const Icon = meta.icon;
          return (
            <li key={a.id} className="relative">
              <span
                className={`absolute -left-[31px] flex h-6 w-6 items-center justify-center rounded-full ring-4 ring-white ${meta.style}`}
              >
                <Icon className="h-3.5 w-3.5" />
              </span>
              <p className="text-sm font-medium text-slate-700">{a.type}</p>
              <p className="mt-0.5 text-xs text-slate-500">{a.message}</p>
              <p className="mt-1 text-[11px] text-slate-400">{a.time}</p>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
