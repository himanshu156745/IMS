import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid } from "recharts";

const DATA = [
  { month: "Feb", active: 60, completed: 20, pending: 10 },
  { month: "Mar", active: 75, completed: 35, pending: 12 },
  { month: "Apr", active: 90, completed: 40, pending: 15 },
  { month: "May", active: 95, completed: 55, pending: 14 },
  { month: "Jun", active: 100, completed: 60, pending: 18 },
  { month: "Jul", active: 108, completed: 65, pending: 20 },
];

export default function MonthlyStatusChart() {
  return (
    <div className="rounded-md bg-white shadow-sm p-4">
      <h2 className="font-display text-base text-ink">Monthly Internship Status</h2>
      <p className="text-xs text-slate font-body mb-2">Active · Completed · Pending</p>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={DATA} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid stroke="#E5E4E7" strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#5B6472" }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 11, fill: "#5B6472" }} axisLine={false} tickLine={false} />
          <Tooltip contentStyle={{ fontSize: 12, borderRadius: 6, borderColor: "#E5E4E7" }} />
          <Legend wrapperStyle={{ fontSize: 11 }} />
          <Bar dataKey="active" name="Active" fill="#2F6F5E" radius={[3, 3, 0, 0]} />
          <Bar dataKey="completed" name="Completed" fill="#C98A2C" radius={[3, 3, 0, 0]} />
          <Bar dataKey="pending" name="Pending" fill="#B3492F" radius={[3, 3, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}