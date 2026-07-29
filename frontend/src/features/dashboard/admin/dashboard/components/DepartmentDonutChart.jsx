import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const DATA = [
  { name: "CS", value: 380, color: "#2F6F5E" },
  { name: "IT", value: 260, color: "#C98A2C" },
  { name: "ECE", value: 188, color: "#B3492F" },
  { name: "Mech", value: 148, color: "#5B6472" },
  { name: "Civil", value: 92, color: "#8C7A9B" },
  { name: "MBA", value: 73, color: "#4B7BA6" },
];

export default function DepartmentDonutChart() {
  return (
    <div className="rounded-md bg-white shadow-sm p-4">
      <h2 className="font-display text-base text-ink">Department-wise Students</h2>
      <p className="text-xs text-slate font-body mb-2">Distribution by department</p>

      <div className="flex items-center gap-4">
        <ResponsiveContainer width="55%" height={180}>
          <PieChart>
            <Pie
              data={DATA}
              dataKey="value"
              nameKey="name"
              innerRadius={45}
              outerRadius={75}
              paddingAngle={2}
            >
              {DATA.map((d) => (
                <Cell key={d.name} fill={d.color} />
              ))}
            </Pie>
            <Tooltip contentStyle={{ fontSize: 12, borderRadius: 6, borderColor: "#E5E4E7" }} />
          </PieChart>
        </ResponsiveContainer>

        <ul className="flex-1 space-y-1.5 text-xs font-body">
          {DATA.map((d) => (
            <li key={d.name} className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-ink">
                <span className="w-2 h-2 rounded-full" style={{ background: d.color }} />
                {d.name}
              </span>
              <span className="text-slate">{d.value}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}