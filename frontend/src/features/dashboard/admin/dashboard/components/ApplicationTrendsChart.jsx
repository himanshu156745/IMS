import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

const DATA = [
  { week: "W1", applications: 18 },
  { week: "W2", applications: 22 },
  { week: "W3", applications: 20 },
  { week: "W4", applications: 28 },
  { week: "W5", applications: 26 },
  { week: "W6", applications: 34 },
  { week: "W7", applications: 30 },
  { week: "W8", applications: 38 },
];

export default function ApplicationTrendsChart() {
  return (
    <div className="rounded-md bg-white shadow-sm p-4">
      <h2 className="font-display text-base text-ink">Application Trends</h2>
      <p className="text-xs text-slate font-body mb-2">Weekly application count</p>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={DATA} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
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