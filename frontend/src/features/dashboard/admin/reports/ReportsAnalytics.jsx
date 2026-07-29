import { useEffect, useState } from "react";
import ReportsSkeleton from "./components/ReportsSkeleton";
import DashboardStats from "./components/DashboardStats";
import ProjectTable from "./components/ProjectTable";
import Charts from "./components/Charts";
import { Download, FileText } from "lucide-react";
import WeeklyReports from "./components/WeeklyReports";
import TeamContribution from "./components/TeamContribution";

const ReportAnalytics = () => {
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setInitialLoading(false);
    }, 600);

    return () => clearTimeout(timer);
  }, []);

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
          <button className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-2.5 font-medium text-gray-700 shadow-sm transition hover:bg-gray-50">
            <FileText size={18} />
            Export Report
          </button>

          <button className="flex items-center gap-2 rounded-xl bg-[#2563EB] px-5 py-2.5 font-medium text-white shadow-sm transition hover:bg-[#1D4ED8]">
            <Download size={18} />
            Download PDF
          </button>
        </div>
      </div>

      {/* Summary Banner */}

      <DashboardStats />

      <Charts />

      <ProjectTable />

      <WeeklyReports />

      <TeamContribution />
    </div>
  );
};
export default ReportAnalytics;
