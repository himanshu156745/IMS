export default function AttendanceTable({ rows }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[560px] border-collapse text-left">
        <thead>
          <tr className="text-xs font-semibold uppercase tracking-wide text-slate-400">
            <th className="px-4 py-3">Date</th>
            <th className="px-4 py-3">Present</th>
            <th className="px-4 py-3">Absent</th>
            <th className="px-4 py-3">Attendance %</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr
              key={r.date}
              className="border-t border-slate-50 text-sm text-slate-600 transition-colors duration-150 hover:bg-slate-50/80"
            >
              <td className="px-4 py-3.5 font-medium text-slate-700">{r.date}</td>
              <td className="px-4 py-3.5 text-emerald-600">{r.present}</td>
              <td className="px-4 py-3.5 text-red-500">{r.absent}</td>
              <td className="px-4 py-3.5">
                <div className="flex items-center gap-2">
                  <div className="h-1.5 w-24 overflow-hidden rounded-full bg-slate-100">
                    <div
                      className="h-full rounded-full bg-emerald-500"
                      style={{ width: `${r.percentage}%` }}
                    />
                  </div>
                  <span className="text-xs font-semibold text-slate-500">{r.percentage}%</span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}