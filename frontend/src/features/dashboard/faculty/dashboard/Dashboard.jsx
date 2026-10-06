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
import { facultyService } from "../services/faculty.service";

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
  { text: "System updated.", time: "1h ago" },
];

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null);
  const [profile, setProfile] = useState(null);
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [profileRes, statsRes, studentsRes] = await Promise.all([
          facultyService.getProfile(),
          facultyService.getDashboardStats(),
          facultyService.getMyStudents()
        ]);
        setProfile(profileRes.data);
        setStats(statsRes.data);
        
        const formattedStudents = studentsRes.data.map(profile => ({
          id: profile.user._id || profile.user,
          name: profile.fullName || "Unknown",
          photo: profile.avatarUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(profile.fullName || 'U')}`,
          department: profile.course || "N/A",
          enrollment: profile.user.email ? profile.user.email.split('@')[0] : "N/A",
          company: "Unassigned",
          role: "Intern",
          status: "Pending",
          progress: 0
        }));
        setStudents(formattedStudents);
      } catch (error) {
        console.error("Failed to load dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <Loader label="Loading dashboard..." />;

  const displayStats = stats || {
    totalStudents: 0,
    activeInternships: 0,
    pendingReports: 0,
    avgAttendance: 0
  };

  return (
    <div className="animate-fadeIn space-y-6">
      <div className="card relative overflow-hidden bg-gradient-to-r from-navy-900 to-navy-800 p-6 text-white sm:p-8">
        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-brand-500/20 blur-2xl" />
        <div className="relative flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-xl font-extrabold text-white sm:text-2xl">
              Welcome back, {profile?.fullName || "Faculty"} 👋
            </h2>
            <p className="mt-1.5 max-w-lg text-sm text-slate-300">
              You have {displayStats.pendingReports} pending reports to review and feedback requests waiting. Let's keep your students on track.
            </p>
          </div>
          <Link to="my-students" className="btn-primary w-fit bg-brand-500 hover:bg-brand-400">
            View My Students <MdOutlineArrowForward />
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <DashboardCard icon={MdOutlineGroups} label="Total Students" value={displayStats.totalStudents.toString()} trend="" tone="brand" />
        <DashboardCard icon={MdOutlineWorkOutline} label="Active Internships" value={displayStats.activeInternships.toString()} trend="" tone="green" />
        <DashboardCard icon={MdOutlineDescription} label="Pending Reports" value={displayStats.pendingReports.toString()} trend="" tone="amber" />
        <DashboardCard icon={MdOutlineCalendarMonth} label="Avg. Attendance" value={`${displayStats.avgAttendance}%`} trend="" tone="violet" />
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
              <Link to="/faculty/my-students" className="text-sm font-semibold text-brand-500 hover:underline">
                View all
              </Link>
            </div>
            {students.length > 0 ? (
              <StudentTable students={students.slice(0, 4)} compact />
            ) : (
              <p className="text-sm text-slate-500 text-center py-4">No students assigned yet.</p>
            )}
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