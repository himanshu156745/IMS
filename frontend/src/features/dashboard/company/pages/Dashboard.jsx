import { useNavigate } from 'react-router-dom'
import StatCard from '../components/ui/StatCard.jsx'
import StatusBadge from '../components/ui/StatusBadge.jsx'
import Avatar from '../components/ui/Avatar.jsx'
import { stats, recentApplications, upcomingDeadlines } from '../services/mockData.js'

const deadlineTones = {
  rose: 'bg-rose-50 text-rose-500',
  brand: 'bg-brand-50 text-brand-600',
}

export default function Dashboard() {
  const navigate = useNavigate()

  return (
    <section className="space-y-6">
      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {stats.map((s) => (
          <StatCard key={s.label} {...s} />
        ))}
      </div>

      {/* Table + side panel */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 bg-white rounded-2xl shadow-card border border-slate-100 overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
            <h3 className="font-display font-semibold text-ink">Recent Applications</h3>
            <button onClick={() => navigate('/applications')} className="text-[13px] font-medium text-brand-600 hover:text-brand-700">
              View all →
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-slate-400 text-[12px] uppercase tracking-wide">
                  <th className="font-medium px-5 py-3">Student</th>
                  <th className="font-medium px-5 py-3">Internship</th>
                  <th className="font-medium px-5 py-3">Applied</th>
                  <th className="font-medium px-5 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {recentApplications.map((row) => (
                  <tr key={row.name} className="hover:bg-mist/60 transition">
                    <td className="px-5 py-3 flex items-center gap-2.5">
                      <Avatar id={row.avatar} />
                      <span className="font-medium text-ink">{row.name}</span>
                    </td>
                    <td className="px-5 py-3 text-slate-500">{row.internship}</td>
                    <td className="px-5 py-3 text-slate-500 font-mono text-[13px]">{row.applied}</td>
                    <td className="px-5 py-3">
                      <StatusBadge status={row.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-card border border-slate-100 p-5">
          <h3 className="font-display font-semibold text-ink mb-4">Upcoming Deadlines</h3>
          <ul className="space-y-4">
            {upcomingDeadlines.map((d) => (
              <li key={d.title} className="flex gap-3">
                <div className={`w-10 h-10 rounded-xl flex flex-col items-center justify-center shrink-0 font-mono ${deadlineTones[d.tone]}`}>
                  <span className="text-[10px] leading-none">{d.month}</span>
                  <span className="text-sm font-bold leading-none mt-0.5">{d.day}</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-ink">{d.title}</p>
                  <p className="text-[12px] text-slate-400">{d.note}</p>
                </div>
              </li>
            ))}
          </ul>
          <button
            onClick={() =>navigate('/company/applications')}
            className="w-full mt-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-sm font-medium transition"
          >
            + Post New Internship
          </button>
        </div>
      </div>
    </section>
  )
}
