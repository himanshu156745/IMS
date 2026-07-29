import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  MdOutlineGroups,
  MdOutlineWorkOutline,
  MdOutlineDescription,
  MdOutlineCalendarMonth,
  MdOutlineArrowForward,
  MdOutlineAssignment,
  MdOutlineRateReview,
  MdOutlineBarChart,
} from "react-icons/md";
import DashboardCard from "../components/DashboardCard";
import StudentTable from "../components/StudentTable";
import Loader from "../components/Loader";
import { students } from "../data/students.service";

const quickActions = [
  { label: "Review Reports", icon: MdOutlineAssignment, to: "student-report" },
  { label: "Give Feedback", icon: MdOutlineRateReview, to: "feedback" },
  { label: "Mark Attendance", icon: MdOutlineCalendarMonth, to: "attendance" },
  { label: "View Performance", icon: MdOutlineBarChart, to: "performance" },
];

const deadlines = [
  { title: "Mid-Term Internship Report", due: "24 Jul 2026", batch: "CSE 2024" },
  { title: "Weekly Progress Log #12", due: "26 Jul 2026", batch: "All Batches" },
  { title: "Company Feedback Form", due: "30 Jul 2026", batch: "IT 2023" },
];

const activities = [
  { text: "Rohit Malhotra completed the internship successfully.", time: "2h ago" },
  { text: "New report submitted by Priya Sharma for review.", time: "5h ago" },
  { text: "Attendance updated for CSE batch, 24 Jul 2026.", time: "1d ago" },
  { text: "Feedback shared with Kabir Singh on DevOps module.", time: "2d ago" },
];

export default function Dashboard() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(t);
  }, []);

  if (loading) return <Loader label="Loading dashboard..." />;

  return (
    <div className="animate-fadeIn space-y-6">
      <div className="card relative overflow-hidden bg-gradient-to-r from-navy-900 to-navy-800 p-6 text-white sm:p-8">
        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-brand-500/20 blur-2xl" />
        <div className="relative flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-xl font-extrabold text-white sm:text-2xl">Welcome back, Dr. Meenal Kapoor 👋</h2>
            <p className="mt-1.5 max-w-lg text-sm text-slate-300">
              You have 3 pending reports to review and 2 feedback requests waiting. Let's keep your students on track.
            </p>
          </div>
          <Link to="my-students" className="btn-primary w-fit bg-brand-500 hover:bg-brand-400">
            View My Students <MdOutlineArrowForward />
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <DashboardCard icon={MdOutlineGroups} label="Total Students" value="28" trend="+4%" tone="brand" />
        <DashboardCard icon={MdOutlineWorkOutline} label="Active Internships" value="21" trend="+2%" tone="green" />
        <DashboardCard icon={MdOutlineDescription} label="Pending Reports" value="6" trend="-1%" tone="amber" />
        <DashboardCard icon={MdOutlineCalendarMonth} label="Avg. Attendance" value="87%" trend="+3%" tone="violet" />
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="space-y-6 xl:col-span-2">
          <div className="card p-5">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-bold text-slate-800">Quick Actions</h3>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {quickActions.map(({ label, icon: Icon, to }) => (
                <Link
                  key={label}
                  to={to}
                  className="flex flex-col items-center gap-2 rounded-xl border border-slate-100 p-4 text-center transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-100 hover:bg-brand-50/50"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-500">
                    <Icon size={20} />
                  </div>
                  <span className="text-xs font-semibold text-slate-600">{label}</span>
                </Link>
              ))}
            </div>
          </div>

          <div className="card p-5">
            <div className="mb-2 flex items-center justify-between">
              <h3 className="font-bold text-slate-800">Recent Student List</h3>
              <Link to="/my-students" className="text-sm font-semibold text-brand-500 hover:underline">
                View all
              </Link>
            </div>
            <StudentTable students={students.slice(0, 4)} compact />
          </div>
        </div>

        <div className="space-y-6">
          <div className="card p-5">
            <h3 className="mb-4 font-bold text-slate-800">Upcoming Deadlines</h3>
            <div className="space-y-3">
              {deadlines.map((d) => (
                <div key={d.title} className="flex items-start gap-3 rounded-xl border border-slate-100 p-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-red-50 text-xs font-bold text-red-500">
                    {d.due.slice(0, 2)}
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-slate-700">{d.title}</p>
                    <p className="text-xs text-slate-400">{d.batch} • Due {d.due}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card p-5">
            <h3 className="mb-4 font-bold text-slate-800">Recent Activities</h3>
            <div className="space-y-4">
              {activities.map((a, i) => (
                <div key={i} className="flex gap-3">
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-brand-400" />
                  <div>
                    <p className="text-sm text-slate-600">{a.text}</p>
                    <p className="text-xs text-slate-400">{a.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}