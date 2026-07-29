import React from "react";
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
  BarChart,
  Bar,
} from "recharts";

import {
  weeklyProgressData,
  projectStatusData,
  domainChartData,
  teamPerformanceData,
} from "../data/reportData";

const COLORS = [
  "#2F6E5F",
  "#4CAF50",
  "#3B82F6",
  "#F59E0B",
  "#EF4444",
  "#8B5CF6",
];

const ChartCard = ({ title, subtitle, children }) => (
  <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
    <div className="mb-4">
      <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
      <p className="text-sm text-gray-500">{subtitle}</p>
    </div>

    <div className="h-72">{children}</div>
  </div>
);

const Charts = () => {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* Weekly Progress */}

      <ChartCard
        title="Weekly Progress"
        subtitle="Overall project completion"
      >
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={weeklyProgressData}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="week" />

            <YAxis />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="progress"
              stroke="#2F6E5F"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </ChartCard>

      {/* Project Status */}

      <ChartCard
        title="Project Status"
        subtitle="Current project distribution"
      >
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={projectStatusData}
              dataKey="value"
              nameKey="name"
              outerRadius={90}
              label
            >
              {projectStatusData.map((entry, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>

            <Tooltip />

            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </ChartCard>

      {/* Domain Distribution */}

      <ChartCard
        title="Technology Distribution"
        subtitle="Projects by technology"
      >
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={domainChartData}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="name" />

            <YAxis />

            <Tooltip />

            <Bar
              dataKey="value"
              fill="#2F6E5F"
              radius={[6, 6, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      {/* Team Performance */}

      <ChartCard
        title="Team Performance"
        subtitle="Overall team progress"
      >
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={teamPerformanceData}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="team" />

            <YAxis />

            <Tooltip />

            <Bar
              dataKey="progress"
              fill="#3B8572"
              radius={[6, 6, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>
    </div>
  );
};

export default Charts;