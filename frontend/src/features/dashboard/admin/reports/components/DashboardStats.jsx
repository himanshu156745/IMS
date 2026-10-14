import { useMemo } from "react";
import {
  FolderKanban,
  BriefcaseBusiness,
  CircleCheckBig,
  TriangleAlert,
  Users,
  UserRound,
  TrendingUp,
  Award,
  Code2,
  Database,
  Coffee,
  Atom,
  Server,
  Smartphone,
} from "lucide-react";

const statIcons = {
  "Total Projects": FolderKanban,
  "Active Projects": BriefcaseBusiness,
  "Completed Projects": CircleCheckBig,
  "Delayed Projects": TriangleAlert,
  "Total Teams": Users,
  "Total Interns": UserRound,
  "Average Progress": TrendingUp,
  "Completion Rate": Award,
};

const domainIcons = {
  "MERN Stack": Code2,
  "Python (Django)": Database,
  Java: Coffee,
  "React.js": Atom,
  "Node.js": Server,
  Flutter: Smartphone,
};

const DashboardStats = ({ stats = {}, internships = [] }) => {
  const dynamicKpis = [
    {
      id: 1,
      title: "Total Projects",
      value: stats.totalInternships ?? 0,
      change: "0%",
      trend: "up",
    },
    {
      id: 2,
      title: "Active Projects",
      value: stats.activeInternships ?? 0,
      change: "0%",
      trend: "up",
    },
    {
      id: 3,
      title: "Completed Projects",
      value: stats.completedInternships ?? 0,
      change: "0%",
      trend: "up",
    },
    {
      id: 4,
      title: "Delayed Projects",
      value: 0,
      change: "0%",
      trend: "down",
    },
    {
      id: 5,
      title: "Total Teams",
      value: stats.totalCompanies ?? 0,
      change: "+0",
      trend: "up",
    },
    {
      id: 6,
      title: "Total Interns",
      value: stats.totalStudents ?? 0,
      change: "+0",
      trend: "up",
    },
    {
      id: 7,
      title: "Average Progress",
      value: `${stats.placementRate ?? 0}%`,
      change: "0%",
      trend: "up",
    },
    {
      id: 8,
      title: "Completion Rate",
      value: `${
        stats.totalInternships && stats.completedInternships
          ? Math.round((stats.completedInternships / stats.totalInternships) * 100)
          : 0
      }%`,
      change: "0%",
      trend: "up",
    },
  ];

  const domainStats = useMemo(() => {
    const domainMap = {};
    internships.forEach((item) => {
      const skills = item.skills || item.requirements || [];
      const domainName = skills[0] || item.department || "Technology";
      if (!domainMap[domainName]) {
        domainMap[domainName] = {
          id: domainName,
          domain: domainName,
          projects: 0,
          active: 0,
          completed: 0,
        };
      }
      domainMap[domainName].projects += 1;
      if (item.rawStatus === "open" || item.status === "Active") {
        domainMap[domainName].active += 1;
      } else {
        domainMap[domainName].completed += 1;
      }
    });

    return Object.values(domainMap).map((d) => ({
      ...d,
      progress:
        d.projects > 0 ? Math.round((d.completed / d.projects) * 100) : 0,
    }));
  }, [internships]);

  return (
    <div className="space-y-8">
      {/* ================= KPI CARDS ================= */}

      <section>
        <h2 className="mb-4 text-lg font-semibold text-gray-800">
          Project Overview
        </h2>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {dynamicKpis.map((item) => {
            const Icon = statIcons[item.title] || FolderKanban;

            return (
              <div
                key={item.id}
                className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">{item.title}</p>

                    <h3 className="mt-2 text-3xl font-bold">
                      {item.value}
                    </h3>

                    <p
                      className={`mt-2 text-sm font-medium ${
                        item.trend === "up"
                          ? "text-green-600"
                          : "text-red-500"
                      }`}
                    >
                      {item.change} this month
                    </p>
                  </div>

                  <div className="rounded-full bg-green-100 p-3">
                    <Icon
                      size={28}
                      className="text-[#2F6E5F]"
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ================= DOMAIN CARDS ================= */}

      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-800">
            Technology Domains
          </h2>

          <span className="text-sm text-gray-500">
            Internship Projects by Technology
          </span>
        </div>

        {domainStats.length === 0 ? (
          <div className="rounded-xl border border-gray-200 bg-white p-8 text-center text-sm text-gray-500">
            No technology domains recorded yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {domainStats.map((domain) => {
              const Icon = domainIcons[domain.domain] || Code2;

              return (
                <div
                  key={domain.id}
                  className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:border-[#2F6E5F] hover:shadow-lg"
                >
                  <div className="flex items-center justify-between">
                    <div className="rounded-lg bg-green-100 p-3">
                      <Icon
                        size={28}
                        className="text-[#2F6E5F]"
                      />
                    </div>

                    <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-[#2F6E5F]">
                      {domain.progress}%
                    </span>
                  </div>

                  <h3 className="mt-5 text-lg font-semibold">
                    {domain.domain}
                  </h3>

                  <div className="mt-4 space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Projects</span>
                      <span className="font-semibold">{domain.projects}</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-gray-500">Active</span>
                      <span className="font-semibold text-green-600">
                        {domain.active}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-gray-500">Completed</span>
                      <span className="font-semibold text-blue-600">
                        {domain.completed}
                      </span>
                    </div>
                  </div>

                  <div className="mt-5">
                    <div className="mb-2 flex justify-between text-sm">
                      <span>Overall Progress</span>
                      <span>{domain.progress}%</span>
                    </div>

                    <div className="h-2 rounded-full bg-gray-200">
                      <div
                        className="h-2 rounded-full bg-[#2F6E5F]"
                        style={{
                          width: `${domain.progress}%`,
                        }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
};

export default DashboardStats;
