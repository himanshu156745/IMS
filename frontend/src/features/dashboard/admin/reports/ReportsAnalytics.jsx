import DashboardStats from "./components/DashboardStats";
import ProjectTable from "./components/ProjectTable";
import Charts from "./components/Charts";
import WeeklyReports from "./components/WeeklyReports";
import TeamContribution from "./components/TeamContribution";

const ReportAnalytics = () => {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Report & Analytics
        </h1>

        <p className="mt-1 text-gray-500">
          Monitor internship projects, team performance and weekly reports.
        </p>
      </div>

      {/* Summary Banner */}
      <section className="rounded-xl bg-gradient-to-r from-[#2F6E5F] to-[#3B8572] p-6 text-white shadow">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-2xl font-semibold">
              Project Analytics Dashboard 📊
            </h2>

            <p className="mt-2 max-w-2xl text-green-100">
              Track internship projects, weekly reports, team contribution,
              project completion and overall internship performance from one
              place.
            </p>
          </div>

          <div className="flex gap-3">
            <button className="rounded-lg bg-white px-5 py-2 font-medium text-[#2F6E5F] transition hover:bg-gray-100">
              Export Report
            </button>

            <button className="rounded-lg border border-white px-5 py-2 transition hover:bg-white hover:text-[#2F6E5F]">
              Download PDF
            </button>
          </div>
        </div>
      </section>

      {/* Dashboard Stats */}
      <DashboardStats />

      {/* Charts */}
      <Charts />

      {/* Projects */}
      <ProjectTable />

      {/* Weekly Reports */}
      <WeeklyReports />

      {/* Team Contribution */}
      <TeamContribution />
    </div>
  );
};

export default ReportAnalytics;