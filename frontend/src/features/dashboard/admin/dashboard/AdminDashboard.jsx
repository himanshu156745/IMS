import PageHeader from "../../../../components/ui/PageHeader";
import StatCard from "../../../../components/ui/StatCard";
import WelcomeBanner from "../components/WelcomeBanner";
import QuickActions from "../components/QuickActions";
import StudentGrowthChart from "../components/StudentGrowthChart";
import MonthlyStatusChart from "../components/MonthlyStatusChart";
import DepartmentDonutChart from "../components/DepartmentDonutChart";
import ApplicationTrendsChart from "../components/ApplicationTrendsChart";
import RecentApplicationsTable from "../components/RecentApplicationsTable";
import RecentStudents from "../components/RecentStudents";
import TopHiringCompanies from "../components/TopHiringCompanies";
import FacultyOverview from "../components/FacultyOverview";
import RecentActivity from "./components/RecentActivity";

// TODO: replace every MOCK_* array (in each widget file) with real API data
// via TanStack Query once backend endpoints (modules/users, companies,
// internships, applications) are wired.
const STATS = [
  { label: "Total Students", value: "1,148", trend: 12.4, status: "onTrack" },
  { label: "Total Faculty", value: "84", trend: 3.1, status: "onTrack" },
  { label: "Registered Companies", value: "236", trend: 8.7, status: "onTrack" },
  { label: "Active Internships", value: "108", trend: 18.2, status: "onTrack" },
  { label: "Pending Applications", value: "47", trend: -5.3, status: "attention" },
  { label: "Completed Internships", value: "312", trend: 22.7, status: "onTrack" },
  { label: "Certificates Issued", value: "298", trend: 15.9, status: "neutral" },
  { label: "Placement Rate", value: "87.4%", trend: 6.5, status: "onTrack" },
];

export default function AdminDashboard() {
  return (
    <>
      <PageHeader title="Dashboard" subtitle="Your internship ecosystem at a glance." />

      <WelcomeBanner name="Admin" />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {STATS.map((s) => (
          <StatCard key={s.label} {...s} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        <QuickActions />
        <StudentGrowthChart />
        <MonthlyStatusChart />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        <DepartmentDonutChart />
        <ApplicationTrendsChart />
      </div>

      <div className="mb-6">
        <RecentApplicationsTable />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        <RecentStudents />
        <TopHiringCompanies />
      </div>

      <FacultyOverview />
    </>
  );
}