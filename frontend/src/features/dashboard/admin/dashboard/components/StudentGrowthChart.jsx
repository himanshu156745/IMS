import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

const DATA = [
  { month: "Jan", students: 780 },
  { month: "Feb", students: 810 },
  { month: "Mar", students: 850 },
  { month: "Apr", students: 890 },
  { month: "May", students: 930 },
  { month: "Jun", students: 970 },
  { month: "Jul", students: 1010 },
  { month: "Aug", students: 1045 },
  { month: "Sep", students: 1075 },
  { month: "Oct", students: 1100 },
  { month: "Nov", students: 1125 },
  { month: "Dec", students: 1148 },
];

export default function StudentGrowthChart() {
  return (
    <div className="rounded-md bg-white shadow-sm p-4">
      <h2 className="font-display text-base text-ink">Student Growth</h2>
      <p className="text-xs text-slate font-body mb-2">Jan – Dec 2026</p>
      <ResponsiveContainer width="100%" height={220}>
        <LineChart data={DATA} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
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