import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

export default function StudentGrowthChart({ totalStudents = 0 }) {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const currentMonthIdx = new Date().getMonth();
  const data = months.map((month, idx) => ({
    month,
    students: idx <= currentMonthIdx && totalStudents > 0
      ? Math.round((totalStudents * (idx + 1)) / (currentMonthIdx + 1))
      : 0,
  }));

  return (
    <div className="rounded-md bg-white shadow-sm p-4">
      <h2 className="font-display text-base text-ink">Student Growth</h2>
      <p className="text-xs text-slate font-body mb-2">Jan – Dec {new Date().getFullYear()}</p>
      <ResponsiveContainer width="100%" height={220}>
        <LineChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid stroke="#E5E4E7" strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#5B6472" }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 11, fill: "#5B6472" }} axisLine={false} tickLine={false} />
          <Tooltip contentStyle={{ fontSize: 12, borderRadius: 6, borderColor: "#E5E4E7" }} />
          <Line type="monotone" dataKey="students" stroke="#2F6F5E" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
