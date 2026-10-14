import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

export default function DepartmentDonutChart({ data = [] }) {
  const chartData = data && data.length > 0 ? data : [];

  return (
    <div className="rounded-md bg-white shadow-sm p-4">
      <h2 className="font-display text-base text-ink">Department-wise Students</h2>
      <p className="text-xs text-slate font-body mb-2">Distribution by department</p>

      {chartData.length === 0 ? (
        <p className="text-xs text-slate font-body py-12 text-center">No student department data yet</p>
      ) : (
        <div className="flex items-center gap-4">
          <ResponsiveContainer width="55%" height={180}>
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                innerRadius={45}
                outerRadius={75}
                paddingAngle={2}
              >
                {chartData.map((d) => (
                  <Cell key={d.name} fill={d.color || "#2F6F5E"} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ fontSize: 12, borderRadius: 6, borderColor: "#E5E4E7" }} />
            </PieChart>
          </ResponsiveContainer>

          <ul className="flex-1 space-y-1.5 text-xs font-body">
            {chartData.map((d) => (
              <li key={d.name} className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-ink">
                  <span className="w-2 h-2 rounded-full" style={{ background: d.color || "#2F6F5E" }} />
                  {d.name}
                </span>
                <span className="text-slate">{d.value}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
