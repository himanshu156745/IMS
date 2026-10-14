import { useState, useEffect, useCallback } from "react";
import PageHeader from "../../../../components/ui/PageHeader";
import StatCard from "../../../../components/ui/StatCard";

import WelcomeBanner from "./components/WelcomeBanner";
import QuickActions from "./components/QuickActions";
import DashboardSkeleton from "./components/DashboardSkeleton";
import StudentGrowthChart from "./components/StudentGrowthChart";
import MonthlyStatusChart from "./components/MonthlyStatusChart";
import DepartmentDonutChart from "./components/DepartmentDonutChart";
import ApplicationTrendsChart from "./components/ApplicationTrendsChart";
import RecentApplicationsTable from "./components/RecentApplicationsTable";
import RecentStudents from "./components/RecentStudents";
import TopHiringCompanies from "./components/TopHiringCompanies";
import FacultyOverview from "./components/FacultyOverview";
import axiosInstance from "../../../../utils/axiosInstance";
import { unwrapList } from "../../../../utils/api";

export default function AdminDashboard() {
  const [initialLoading, setInitialLoading] = useState(true);
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalFaculty: 0,
    totalCompanies: 0,
    activeInternships: 0,
    pendingApplications: 0,
    completedInternships: 0,
    certificatesIssued: 0,
    placementRate: 0,
    totalApplications: 0,
    departmentDistribution: [],
  });
  const [recentApplications, setRecentApplications] = useState([]);
  const [recentStudents, setRecentStudents] = useState([]);
  const [recentCompanies, setRecentCompanies] = useState([]);
  const [recentFaculty, setRecentFaculty] = useState([]);

  const fetchDashboardData = useCallback(async () => {
    try {
      const [statsRes, appsRes, studentsRes, companiesRes, facultyRes] =
        await Promise.allSettled([
          axiosInstance.get("/admin/stats"),
          axiosInstance.get("/admin/applications", { params: { limit: 6 } }),
          axiosInstance.get("/admin/users", { params: { role: "student", limit: 4 } }),
          axiosInstance.get("/admin/companies", { params: { limit: 4 } }),
          axiosInstance.get("/admin/users", { params: { role: "faculty", limit: 4 } }),
        ]);

      if (statsRes.status === "fulfilled") {
        const d = statsRes.value.data?.data || {};
        setStats({
          totalStudents: d.totalStudents ?? 0,
          totalFaculty: d.totalFaculty ?? 0,
          totalCompanies: d.totalCompanies ?? 0,
          activeInternships: d.activeInternships ?? 0,
          pendingApplications: d.pendingApplications ?? 0,
          completedInternships: d.completedInternships ?? 0,
          certificatesIssued: d.certificatesIssued ?? 0,
          placementRate: d.placementRate ?? 0,
          totalApplications: d.totalApplications ?? 0,
          departmentDistribution: d.departmentDistribution ?? [],
        });
      }

      if (appsRes.status === "fulfilled") {
        setRecentApplications(unwrapList(appsRes.value));
      }

      if (studentsRes.status === "fulfilled") {
        setRecentStudents(unwrapList(studentsRes.value));
      }

      if (companiesRes.status === "fulfilled") {
        setRecentCompanies(unwrapList(companiesRes.value));
      }

      if (facultyRes.status === "fulfilled") {
        setRecentFaculty(unwrapList(facultyRes.value));
      }
    } catch (err) {
      console.error("Failed to load admin dashboard data", err);
    } finally {
      setInitialLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  const statCards = [
    {
      label: "Total Students",
      value: (stats.totalStudents || 0).toLocaleString(),
      trend: 0,
      status: "onTrack",
    },
    {
      label: "Total Faculty",
      value: (stats.totalFaculty || 0).toLocaleString(),
      trend: 0,
      status: "onTrack",
    },
    {
      label: "Registered Companies",
      value: (stats.totalCompanies || 0).toLocaleString(),
      trend: 0,
      status: "onTrack",
    },
    {
      label: "Active Internships",
      value: (stats.activeInternships || 0).toLocaleString(),
      trend: 0,
      status: "onTrack",
    },
    {
      label: "Pending Applications",
      value: (stats.pendingApplications || 0).toLocaleString(),
      trend: 0,
      status: "attention",
    },
    {
      label: "Completed Internships",
      value: (stats.completedInternships || 0).toLocaleString(),
      trend: 0,
      status: "onTrack",
    },
    {
      label: "Certificates Issued",
      value: (stats.certificatesIssued || 0).toLocaleString(),
      trend: 0,
      status: "neutral",
    },
    {
      label: "Placement Rate",
      value: `${stats.placementRate || 0}%`,
      trend: 0,
      status: "onTrack",
    },
  ];

  if (initialLoading) {
    return <DashboardSkeleton />;
  }

  return (
    <>
      <PageHeader
        title="Dashboard"
        subtitle="Your internship ecosystem at a glance."
      />
      <WelcomeBanner name="Admin" />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {statCards.map((s) => (
          <StatCard key={s.label} {...s} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        <QuickActions />
        <StudentGrowthChart totalStudents={stats.totalStudents || 0} />
        <MonthlyStatusChart stats={stats} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        <DepartmentDonutChart data={stats.departmentDistribution || []} />
        <ApplicationTrendsChart totalApplications={stats.totalApplications || 0} />
      </div>

      <div className="mb-6">
        <RecentApplicationsTable applications={recentApplications} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        <RecentStudents students={recentStudents} />
        <TopHiringCompanies companies={recentCompanies} />
      </div>

      <FacultyOverview faculty={recentFaculty} />
    </>
  );
}
