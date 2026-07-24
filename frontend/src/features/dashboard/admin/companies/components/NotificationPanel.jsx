// src/features/dashboard/admin/companies/components/NotificationPanel.jsx
import React from "react";
import { FiUserPlus, FiClock, FiEdit3, FiXCircle, FiBell } from "react-icons/fi";
import EmptyState from "../../../../../components/ui/EmptyState";

const TYPE_META = {
  "New Company Registered": { icon: FiUserPlus, style: "bg-blue-50 text-blue-600" },
  "Verification Pending": { icon: FiClock, style: "bg-amber-50 text-amber-600" },
  "Company Updated Profile": { icon: FiEdit3, style: "bg-indigo-50 text-indigo-600" },
  "Internship Closed": { icon: FiXCircle, style: "bg-rose-50 text-rose-600" },
};

export default function NotificationPanel({ notifications }) {
  if (!notifications?.length) {
    return <EmptyState />;
  }

  return (
    <div className="rounded-2xl border border-slate-100 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-slate-100 p-4">
        <h3 className="flex items-center gap-2 text-sm font-semibold text-slate-700">
          <FiBell className="h-4 w-4 text-blue-600" /> Notifications
        </h3>
        <span className="rounded-full bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-600">
          {notifications.length} new
        </span>
      </div>
      <ul className="divide-y divide-slate-50">
        {notifications.map((n) => {
          const meta = TYPE_META[n.type] || { icon: FiBell, style: "bg-slate-50 text-slate-600" };
          const Icon = meta.icon;
          return (
            <li key={n.id} className="flex items-start gap-3 p-4 transition-colors hover:bg-slate-50/60">
              <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${meta.style}`}>
                <Icon className="h-4 w-4" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium text-slate-700">{n.type}</p>
                <p className="mt-0.5 truncate text-xs text-slate-500">{n.message}</p>
                <p className="mt-1 text-[11px] text-slate-400">{n.time}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
