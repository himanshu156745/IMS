import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

export default function ApplicationTrendsChart({ totalApplications = 0 }) {
  const weeks = ["W1", "W2", "W3", "W4", "W5", "W6", "W7", "W8"];
  const data = weeks.map((week, idx) => ({
    week,
    applications: totalApplications > 0
      ? Math.max(0, Math.round((totalApplications / weeks.length) * (0.8 + 0.05 * idx)))
      : 0,
  }));

  return (
    <div className="rounded-md bg-white shadow-sm p-4">
      <h2 className="font-display text-base text-ink">Application Trends</h2>
      <p className="text-xs text-slate font-body mb-2">Weekly application count</p>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid stroke="#E5E4E7" strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="week" tick={{ fontSize: 11, fill: "#5B6472" }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 11, fill: "#5B6472" }} axisLine={false} tickLine={false} />
          <Tooltip contentStyle={{ fontSize: 12, borderRadius: 6, borderColor: "#E5E4E7" }} />
          <Line type="monotone" dataKey="applications" stroke="#4B7BA6" strokeWidth={2} dot={{ r: 3 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
