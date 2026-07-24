// src/features/dashboard/admin/companies/components/CompanyProfileDrawer.jsx
import React, { useState, useEffect } from "react";
import {
  FiX,
  FiGlobe,
  FiMapPin,
  FiCalendar,
  FiMail,
  FiPhone,
  FiUser,
  FiStar,
} from "react-icons/fi";
import StatusBadge from "./StatusBadge";
import CompanyInternships from "./CompanyInternships";
import CompanyApplications from "./CompanyApplications";
import CompanyStudents from "./CompanyStudents";
import AnalyticsSection from "./AnalyticsSection";

const TABS = ["Overview", "Internships", "Applications", "Assigned Students", "Analytics"];

function OverviewTab({ company }) {
  const rows = [
    { icon: FiGlobe, label: "Website", value: company.website },
    { icon: FiMapPin, label: "Location", value: company.location },
    { icon: FiCalendar, label: "Registered On", value: company.registrationDate },
  ];

  const hrRows = [
    { icon: FiUser, label: "HR Name", value: company.hrName },
    { icon: FiMail, label: "HR Email", value: company.hrEmail },
    { icon: FiPhone, label: "HR Phone", value: company.hrPhone },
  ];

  return (
    <div className="space-y-6">
      <p className="text-sm leading-relaxed text-slate-600">{company.description}</p>

      <div>
        <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">Company Details</h4>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div className="flex items-center gap-2 rounded-xl border border-slate-100 bg-slate-50/60 px-3 py-2.5 text-sm text-slate-600">
            Industry: <span className="font-medium text-slate-700">{company.industry}</span>
          </div>
          {rows.map((r) => (
            <div
              key={r.label}
              className="flex items-center gap-2 rounded-xl border border-slate-100 bg-slate-50/60 px-3 py-2.5 text-sm text-slate-600"
            >
              <r.icon className="h-4 w-4 shrink-0 text-slate-400" />
              <span className="truncate">{r.value}</span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">HR Contact</h4>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {hrRows.map((r) => (
            <div
              key={r.label}
              className="flex items-center gap-2 rounded-xl border border-slate-100 bg-slate-50/60 px-3 py-2.5 text-sm text-slate-600"
            >
              <r.icon className="h-4 w-4 shrink-0 text-slate-400" />
              <span className="truncate">{r.value}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div className="rounded-xl border border-slate-100 bg-blue-50/60 p-3 text-center">
          <p className="text-lg font-semibold text-blue-700">{company.activeInternships}</p>
          <p className="text-xs text-slate-500">Active Internships</p>
        </div>
        <div className="rounded-xl border border-slate-100 bg-indigo-50/60 p-3 text-center">
          <p className="text-lg font-semibold text-indigo-700">{company.totalApplications}</p>
          <p className="text-xs text-slate-500">Applications</p>
        </div>
        <div className="rounded-xl border border-slate-100 bg-cyan-50/60 p-3 text-center">
          <p className="text-lg font-semibold text-cyan-700">{company.studentsAssigned}</p>
          <p className="text-xs text-slate-500">Students</p>
        </div>
      </div>
    </div>
  );
}

/**
 * Right-hand slide-over showing the full company profile with tabs.
 * Self-contained: manages its own open/close animation + active tab.
 */
export default function CompanyProfileDrawer({ company, open, onClose }) {
  const [activeTab, setActiveTab] = useState("Overview");

  useEffect(() => {
    if (open) setActiveTab("Overview");
  }, [open, company?.id]);

  useEffect(() => {
    function handleKey(e) {
      if (e.key === "Escape") onClose();
    }
    if (open) document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  if (!company) return null;

  return (
    <div
      className={`fixed inset-0 z-50 ${open ? "pointer-events-auto" : "pointer-events-none"}`}
      aria-hidden={!open}
    >
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-slate-900/40 backdrop-blur-[2px] transition-opacity duration-300 ${
          open ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
      />

      {/* Panel */}
      <div
        className={`absolute right-0 top-0 flex h-full w-full max-w-2xl transform flex-col bg-white shadow-2xl transition-transform duration-300 ease-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 border-b border-slate-100 p-5">
          <div className="flex items-center gap-3">
            <div
              className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-sm font-semibold text-white ${company.logoColor}`}
            >
              {company.logo}
            </div>
            <div>
              <h3 className="text-base font-semibold text-slate-800">{company.name}</h3>
              <div className="mt-1 flex items-center gap-2">
                <StatusBadge status={company.verificationStatus} />
                <span className="flex items-center gap-1 text-xs font-medium text-amber-500">
                  <FiStar className="h-3 w-3 fill-amber-400 text-amber-400" /> {company.rating}
                </span>
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
            aria-label="Close profile"
          >
            <FiX className="h-5 w-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 overflow-x-auto border-b border-slate-100 px-5 pt-2">
          {TABS.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`whitespace-nowrap rounded-t-lg px-3.5 py-2.5 text-sm font-medium transition-colors ${
                activeTab === tab
                  ? "border-b-2 border-blue-600 text-blue-600"
                  : "border-b-2 border-transparent text-slate-500 hover:text-slate-700"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5">
          {activeTab === "Overview" && <OverviewTab company={company} />}
          {activeTab === "Internships" && <CompanyInternships companyId={company.id} />}
          {activeTab === "Applications" && <CompanyApplications companyId={company.id} />}
          {activeTab === "Assigned Students" && <CompanyStudents companyId={company.id} />}
          {activeTab === "Analytics" && <AnalyticsSection companyId={company.id} />}
        </div>
      </div>
    </div>
  );
}
