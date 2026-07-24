// src/features/dashboard/admin/companies/components/AnalyticsSection.jsx
import React, { useMemo } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { internships, applications, assignedStudents } from "../data/companiesData";

const MONTHS = ["Feb", "Mar", "Apr", "May", "Jun", "Jul"];
const PIE_COLORS = ["#2563eb", "#0ea5e9", "#6366f1", "#06b6d4", "#3b82f6"];

function seededSeries(seedBase, months, min, max) {
  return months.map((m, idx) => {
    const x = Math.sin(seedBase + idx * 12.9898) * 43758.5453;
    const frac = x - Math.floor(x);
    return { month: m, value: Math.round(min + frac * (max - min)) };
  });
}

function ChartCard({ title, children }) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
      <h4 className="mb-3 text-sm font-semibold text-slate-700">{title}</h4>
      <div className="h-56 w-full">{children}</div>
    </div>
  );
}

export default function AnalyticsSection({ companyId }) {
  const applicationsTrend = useMemo(() => seededSeries(companyId.length * 3, MONTHS, 4, 40), [companyId]);
  const hiringTrend = useMemo(() => seededSeries(companyId.length * 5, MONTHS, 1, 12), [companyId]);
  const internshipTrend = useMemo(() => seededSeries(companyId.length * 7, MONTHS, 1, 10), [companyId]);

  const departmentData = useMemo(() => {
    const rows = internships.filter((i) => i.companyId === companyId);
    const counts = {};
    rows.forEach((r) => {
      counts[r.department] = (counts[r.department] || 0) + 1;
    });
    const entries = Object.entries(counts);
    return entries.length
      ? entries.map(([name, value]) => ({ name, value }))
      : [{ name: "No data", value: 1 }];
  }, [companyId]);

  const monthlyPosts = useMemo(() => seededSeries(companyId.length * 11, MONTHS, 0, 6), [companyId]);

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <ChartCard title="Applications Trend">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={applicationsTrend} margin={{ left: -20, right: 10, top: 5, bottom: 0 }}>
            <defs>
              <linearGradient id="appGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2563eb" stopOpacity={0.35} />
                <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#eef2f7" />
            <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #e2e8f0", fontSize: 12 }} />
            <Area type="monotone" dataKey="value" stroke="#2563eb" strokeWidth={2} fill="url(#appGradient)" />
          </AreaChart>
        </ResponsiveContainer>
      </ChartCard>

      <ChartCard title="Hiring Trend">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={hiringTrend} margin={{ left: -20, right: 10, top: 5, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#eef2f7" />
            <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #e2e8f0", fontSize: 12 }} />
            <Line type="monotone" dataKey="value" stroke="#0ea5e9" strokeWidth={2.5} dot={{ r: 3 }} />
          </LineChart>
        </ResponsiveContainer>
      </ChartCard>

      <ChartCard title="Internship Trend">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={internshipTrend} margin={{ left: -20, right: 10, top: 5, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#eef2f7" />
            <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #e2e8f0", fontSize: 12 }} />
            <Bar dataKey="value" fill="#6366f1" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      <ChartCard title="Top Hiring Departments">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={departmentData} dataKey="value" nameKey="name" innerRadius={45} outerRadius={75} paddingAngle={3}>
              {departmentData.map((entry, idx) => (
                <Cell key={entry.name} fill={PIE_COLORS[idx % PIE_COLORS.length]} />
              ))}
            </Pie>
            <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #e2e8f0", fontSize: 12 }} />
          </PieChart>
        </ResponsiveContainer>
      </ChartCard>

      <ChartCard title="Monthly Internship Posts">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={monthlyPosts} margin={{ left: -20, right: 10, top: 5, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#eef2f7" />
            <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #e2e8f0", fontSize: 12 }} />
            <Bar dataKey="value" fill="#06b6d4" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>
    </div>
  );
}
