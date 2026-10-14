import { useEffect, useState, useCallback } from "react";
import ReportsSkeleton from "./components/ReportsSkeleton";
import DashboardStats from "./components/DashboardStats";
import ProjectTable from "./components/ProjectTable";
import Charts from "./components/Charts";
import { Download, FileText } from "lucide-react";
import WeeklyReports from "./components/WeeklyReports";
import TeamContribution from "./components/TeamContribution";
import axiosInstance from "../../../../utils/axiosInstance";
import { unwrapList, sanitizeCsvCell } from "../../../../utils/api";

const ReportAnalytics = () => {
  const [initialLoading, setInitialLoading] = useState(true);
  const [stats, setStats] = useState({
    totalProjects: 0,
    totalInternships: 0,
    activeInternships: 0,
    completedInternships: 0,
    totalStudents: 0,
    totalCompanies: 0,
    placementRate: 0,
    departmentDistribution: [],
  });
  const [internships, setInternships] = useState([]);
  const [reports, setReports] = useState([]);
  const [students, setStudents] = useState([]);

  const fetchReportsData = useCallback(async () => {
    try {
      const [statsRes, internshipsRes, reportsRes, studentsRes] =
        await Promise.allSettled([
          axiosInstance.get("/admin/stats"),
          axiosInstance.get("/admin/internships", { params: { limit: 50 } }),
          axiosInstance.get("/reports", { params: { limit: 50 } }),
          axiosInstance.get("/admin/users", { params: { role: "student", limit: 50 } }),
        ]);

      if (statsRes.status === "fulfilled") {
        setStats(statsRes.value.data?.data || {});
      }

      if (internshipsRes.status === "fulfilled") {
        setInternships(unwrapList(internshipsRes.value));
      }

      if (reportsRes.status === "fulfilled") {
        setReports(unwrapList(reportsRes.value));
      }

      if (studentsRes.status === "fulfilled") {
        setStudents(unwrapList(studentsRes.value));
      }
    } catch (err) {
      console.error("Failed to load reports data", err);
    } finally {
      setInitialLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchReportsData();
  }, [fetchReportsData]);

  const handleExport = () => {
    if (internships.length === 0) return;
    const headers = ["Title", "Company", "Department", "Status", "Applicants", "Deadline"];
    const rows = [
      headers.map(sanitizeCsvCell).join(","),
      ...internships.map((i) =>
        [
          sanitizeCsvCell(i.name || i.title || ""),
          sanitizeCsvCell(i.company || ""),
          sanitizeCsvCell(i.department || ""),
          sanitizeCsvCell(i.status || ""),
          sanitizeCsvCell(i.applicants || 0),
          sanitizeCsvCell(i.deadline || ""),
        ].join(",")
      ),
    ];
    const blob = new Blob([rows.join("\n")], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `ims_reports_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownloadPDF = () => {
    window.print();
  };

  if (initialLoading) {
    return <ReportsSkeleton />;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Report & Analytics
          </h1>

          <p className="mt-1 text-gray-500">
            Monitor internship projects, team performance and weekly reports.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleExport}
            className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-2.5 font-medium text-gray-700 shadow-sm transition hover:bg-gray-50"
          >
            <FileText size={18} />
            Export Report
          </button>

          <button
            onClick={handleDownloadPDF}
            className="flex items-center gap-2 rounded-xl bg-[#2563EB] px-5 py-2.5 font-medium text-white shadow-sm transition hover:bg-[#1D4ED8]"
          >
            <Download size={18} />
            Download PDF
          </button>
        </div>
      </div>

      {/* Summary Banner */}

      <DashboardStats stats={stats} internships={internships} />

      <Charts stats={stats} internships={internships} />

      <ProjectTable internships={internships} />

      <WeeklyReports reports={reports} />

      <TeamContribution students={students} stats={stats} reports={reports} />
    </div>
  );
};

export default ReportAnalytics;
