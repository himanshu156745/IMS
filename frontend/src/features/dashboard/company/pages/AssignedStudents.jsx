import StatusBadge from '../components/ui/StatusBadge.jsx'
import { assignedStudents } from '../services/mockData.js'

function progressGradient(status) {
  return status === 'Completed' ? 'from-emerald-400 to-emerald-600' : 'from-brand-400 to-brand-600'
}

export default function AssignedStudents() {
  return (
    <section className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 justify-between">
        <div className="relative w-full sm:max-w-xs">
          <svg viewBox="0 0 24 24" className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="7" />
            <path d="M21 21l-4.3-4.3" />
          </svg>
          <input
            type="text"
            placeholder="Search assigned students…"
            className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:border-brand-400 focus:ring-4 focus:ring-brand-50 outline-none transition bg-white"
          />
        </div>
        <select className="px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm bg-white outline-none focus:border-brand-400">
          <option>All Mentors</option>
          <option>Anjali Verma</option>
          <option>Karan Bedi</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {assignedStudents.map((s) => (
          <div key={s.name} className="bg-white rounded-2xl shadow-card border border-slate-100 p-5">
            <div className="flex items-center gap-3">
              <img src={`https://i.pravatar.cc/64?img=${s.avatar}`} className="w-12 h-12 rounded-xl object-cover" alt="" />
              <div>
                <p className="font-medium text-ink">{s.name}</p>
                <p className="text-[12px] text-slate-400">{s.role}</p>
              </div>
              <span className="ml-auto h-fit">
                <StatusBadge status={s.status} />
              </span>
            </div>
            <div className="mt-4 text-[13px] text-slate-500 space-y-1.5">
              <div className="flex justify-between">
                <span>Mentor</span>
                <span className="font-medium text-ink">{s.mentor}</span>
              </div>
              <div className="flex justify-between">
                <span>Start Date</span>
                <span className="font-medium text-ink font-mono">{s.startDate}</span>
              </div>
            </div>
            <div className="mt-3">
              <div className="flex justify-between text-[12px] text-slate-400 mb-1">
                <span>Progress</span>
                <span className="font-mono">{s.progress}%</span>
              </div>
              <div className="h-2 rounded-full bg-mist overflow-hidden">
                <div className={`h-full bg-gradient-to-r ${progressGradient(s.status)} rounded-full`} style={{ width: `${s.progress}%` }} />
              </div>
            </div>
            <button className="w-full mt-4 py-2 rounded-xl border border-slate-200 text-slate-600 text-sm font-medium hover:bg-mist transition">
              {s.action}
            </button>
          </div>
        ))}
      </div>
    </section>
  )
}
