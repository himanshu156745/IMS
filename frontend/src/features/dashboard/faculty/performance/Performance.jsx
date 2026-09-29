import { MdOutlineTrendingUp, MdOutlineTaskAlt, MdOutlineCalendarMonth, MdOutlineDescription } from "react-icons/md";
import DashboardCard from "../components/DashboardCard";
import { TrendChart, BarComparisonChart } from "../components/PerformanceChart";
import { performanceOverview, progressTrend, departmentPerformance, topPerformers } from "../data/performance.service";

export default function Performance() {
  return (
    <div className="animate-fadeIn space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <DashboardCard icon={MdOutlineTrendingUp} label="Overall Performance" value={`${performanceOverview.overallPerformance}%`} tone="brand" />
        <DashboardCard icon={MdOutlineTaskAlt} label="Completion Rate" value={`${performanceOverview.completionRate}%`} tone="green" />
        <DashboardCard icon={MdOutlineCalendarMonth} label="Attendance Score" value={`${performanceOverview.attendanceScore}%`} tone="violet" />
        <DashboardCard icon={MdOutlineDescription} label="Report Submission Score" value={`${performanceOverview.reportSubmissionScore}%`} tone="amber" />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="card p-5">
          <h3 className="mb-2 font-bold text-slate-800">Progress Over Time</h3>
          <TrendChart data={progressTrend} dataKey="score" color="#2563EB" />
        </div>
        <div className="card p-5">
          <h3 className="mb-2 font-bold text-slate-800">Department-wise Performance</h3>
          <BarComparisonChart data={departmentPerformance} dataKey="score" labelKey="department" color="#7C3AED" />
        </div>
      </div>

      <div className="card p-5">
        <h3 className="mb-4 font-bold text-slate-800">Top Performing Students</h3>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {topPerformers.map((s, i) => (
            <div key={s.id} className="flex items-center gap-3 rounded-xl border border-slate-100 p-4 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-card">
              <div className="relative">
                <img src={s.photo} alt={s.name} className="h-12 w-12 rounded-full object-cover" />
                <span className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-brand-500 text-[10px] font-bold text-white ring-2 ring-white">
                  {i + 1}
                </span>
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-slate-700">{s.name}</p>
                <p className="truncate text-xs text-slate-400">{s.company}</p>
                <p className="text-xs font-bold text-brand-500">{s.score}% score</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}