import { useNavigate } from "react-router-dom";
import { MdChevronRight } from "react-icons/md";

const statusStyles = {
  Ongoing: "bg-blue-50 text-blue-600",
  Completed: "bg-emerald-50 text-emerald-600",
  Pending: "bg-amber-50 text-amber-600",
};

export default function StudentTable({ students, compact = false }) {
  const navigate = useNavigate();

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[720px] border-collapse text-left">
        <thead>
          <tr className="text-xs font-semibold uppercase tracking-wide text-slate-400">
            <th className="px-4 py-3">Student</th>
            <th className="px-4 py-3">Enrollment No.</th>
            <th className="px-4 py-3">Company</th>
            {!compact && <th className="px-4 py-3">Status</th>}
            <th className="px-4 py-3">Progress</th>
            <th className="px-4 py-3 text-right">Action</th>
          </tr>
        </thead>
        <tbody>
          {students.map((s) => (
            <tr
              key={s.id}
              className="rounded-xl border-t border-slate-50 text-sm text-slate-600 transition-colors duration-150 hover:bg-slate-50/80"
            >
              <td className="px-4 py-3.5">
                <div className="flex items-center gap-3">
                  <img src={s.photo} alt={s.name} className="h-9 w-9 rounded-full object-cover" />
                  <div>
                    <p className="font-semibold text-slate-700">{s.name}</p>
                    <p className="text-xs text-slate-400">{s.department}</p>
                  </div>
                </div>
              </td>
              <td className="px-4 py-3.5 font-medium">{s.enrollment}</td>
              <td className="px-4 py-3.5">
                <p className="font-medium text-slate-700">{s.company}</p>
                <p className="text-xs text-slate-400">{s.role}</p>
              </td>
              {!compact && (
                <td className="px-4 py-3.5">
                  <span className={`badge ${statusStyles[s.status]}`}>{s.status}</span>
                </td>
              )}
              <td className="px-4 py-3.5">
                <div className="flex items-center gap-2">
                  <div className="h-1.5 w-24 overflow-hidden rounded-full bg-slate-100">
                    <div
                      className="h-full rounded-full bg-brand-500 transition-all duration-500"
                      style={{ width: `${s.progress}%` }}
                    />
                  </div>
                  <span className="text-xs font-semibold text-slate-500">{s.progress}%</span>
                </div>
              </td>
              <td className="px-4 py-3.5 text-right">
                <button
                  onClick={() => navigate(`/student-report/${s.id}`)}
                  className="inline-flex items-center gap-1 rounded-lg px-2 py-1 text-sm font-semibold text-brand-500 transition-colors duration-150 hover:bg-brand-50"
                >
                  View <MdChevronRight size={16} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}