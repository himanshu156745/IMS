import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
} from "recharts";

const COLORS = ["#2563EB", "#14B8A6", "#22C55E", "#F59E0B", "#EF4444", "#8B5CF6", "#0EA5E9"];

function groupByMonth(applications) {
  const map = {};
  applications.forEach((a) => {
    const [, month, year] = a.appliedDate.split(" ");
    const key = `${month} ${year}`;
    map[key] = (map[key] || 0) + 1;
  });
  return Object.entries(map).map(([month, count]) => ({ month, count }));
}

function groupBy(applications, keyFn) {
  const map = {};
  applications.forEach((a) => {
    const key = keyFn(a);
    map[key] = (map[key] || 0) + 1;
  });
  return Object.entries(map).map(([name, value]) => ({ name, value }));
}

function ChartCard({ title, children }) {
  return (
    <div className="rounded-2xl border border-line bg-white p-5">
      <h3 className="font-display text-base text-heading mb-3">{title}</h3>
      {children}
    </div>
  );
}

export default function AnalyticsSection({ applications }) {
  const monthly = groupByMonth(applications);
  const byCollege = groupBy(applications, (a) => a.student.college).slice(0, 6);
  const byBranch = groupBy(applications, (a) => a.student.branch);
  const byStatus = groupBy(applications, (a) => a.status);

  const accepted = applications.filter((a) => a.status === "Accepted" || a.status === "Assigned" || a.status === "Completed").length;
  const acceptanceRate = applications.length ? Math.round((accepted / applications.length) * 100) : 0;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
      <ChartCard title="Applications Trend">
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={monthly} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
            <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #E2E8F0", fontSize: 12 }} />
            <Line type="monotone" dataKey="count" stroke="#2563EB" strokeWidth={2.5} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </ChartCard>

      <ChartCard title="Monthly Applications">
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={monthly} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
            <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #E2E8F0", fontSize: 12 }} />
            <Bar dataKey="count" fill="#14B8A6" radius={[8, 8, 0, 0]} maxBarSize={32} />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      <ChartCard title="College-wise Applications">
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={byCollege} layout="vertical" margin={{ top: 5, right: 20, left: 10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E2E8F0" />
            <XAxis type="number" tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
            <YAxis type="category" dataKey="name" width={140} tick={{ fontSize: 11, fill: "#475569" }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #E2E8F0", fontSize: 12 }} />
            <Bar dataKey="value" fill="#2563EB" radius={[0, 8, 8, 0]} maxBarSize={18} />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      <ChartCard title="Branch-wise Applications">
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={byBranch} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
            <XAxis dataKey="name" tick={{ fontSize: 10, fill: "#94a3b8" }} axisLine={false} tickLine={false} interval={0} angle={-15} textAnchor="end" height={50} />
            <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #E2E8F0", fontSize: 12 }} />
            <Bar dataKey="value" fill="#8B5CF6" radius={[8, 8, 0, 0]} maxBarSize={32} />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      <ChartCard title="Status Distribution">
        <ResponsiveContainer width="100%" height={220}>
          <PieChart>
            <Pie data={byStatus} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label={({ name }) => name}>
              {byStatus.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #E2E8F0", fontSize: 12 }} />
          </PieChart>
        </ResponsiveContainer>
      </ChartCard>

      <ChartCard title="Acceptance Rate">
        <div className="flex h-[220px] flex-col items-center justify-center gap-2">
          <span className="font-mono text-5xl font-semibold text-signal">{acceptanceRate}%</span>
          <p className="text-sm text-slate-500 font-body">{accepted} of {applications.length} applications accepted</p>
        </div>
      </ChartCard>
    </div>
  );
}