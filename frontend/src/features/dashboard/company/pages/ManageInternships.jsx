import { useNavigate } from 'react-router-dom'
import Icon from '../components/ui/Icon.jsx'
import StatusBadge from '../components/ui/StatusBadge.jsx'
import { internships } from '../services/mockData.js'

export default function ManageInternships() {
  const navigate = useNavigate()

  return (
    <section className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 justify-between">
        <div className="relative w-full sm:max-w-xs">
          <Icon name="search" className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search internships…"
            className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:border-brand-400 focus:ring-4 focus:ring-brand-50 outline-none transition bg-white"
          />
        </div>
        <div className="flex gap-2.5">
          <select className="px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm bg-white outline-none focus:border-brand-400">
            <option>All Status</option>
            <option>Active</option>
            <option>Draft</option>
            <option>Closed</option>
          </select>
          <button onClick={() => navigate('/post')} className="px-4 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-sm font-medium transition">
            + Post New
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-card border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[820px]">
            <thead>
              <tr className="text-left text-slate-400 text-[12px] uppercase tracking-wide bg-mist/70">
                <th className="font-medium px-5 py-3.5">Internship Title</th>
                <th className="font-medium px-5 py-3.5">Department</th>
                <th className="font-medium px-5 py-3.5">Type</th>
                <th className="font-medium px-5 py-3.5">Openings</th>
                <th className="font-medium px-5 py-3.5">Applications</th>
                <th className="font-medium px-5 py-3.5">Status</th>
                <th className="font-medium px-5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {internships.map((row) => (
                <tr key={row.title} className="hover:bg-mist/60 transition">
                  <td className="px-5 py-3.5 font-medium text-ink">{row.title}</td>
                  <td className="px-5 py-3.5 text-slate-500">{row.dept}</td>
                  <td className="px-5 py-3.5 text-slate-500">{row.type}</td>
                  <td className="px-5 py-3.5 font-mono text-slate-500">{row.openings}</td>
                  <td className="px-5 py-3.5 font-mono text-slate-500">{row.applications}</td>
                  <td className="px-5 py-3.5">
                    <StatusBadge status={row.status} />
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center justify-end gap-1.5">
                      <button className="w-8 h-8 rounded-lg hover:bg-brand-50 text-slate-400 hover:text-brand-600 flex items-center justify-center transition">
                        <Icon name="eye" className="w-4 h-4" />
                      </button>
                      <button className="w-8 h-8 rounded-lg hover:bg-brand-50 text-slate-400 hover:text-brand-600 flex items-center justify-center transition">
                        <Icon name="edit" className="w-4 h-4" />
                      </button>
                      <button className="w-8 h-8 rounded-lg hover:bg-rose-50 text-slate-400 hover:text-rose-500 flex items-center justify-center transition">
                        <Icon name="trash" className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between px-5 py-3.5 border-t border-slate-100 text-[13px] text-slate-400">
          <span>Showing {internships.length} of 18 internships</span>
          <div className="flex gap-1.5">
            <button className="w-8 h-8 rounded-lg border border-slate-200 hover:bg-mist transition">‹</button>
            <button className="w-8 h-8 rounded-lg bg-brand-600 text-white">1</button>
            <button className="w-8 h-8 rounded-lg border border-slate-200 hover:bg-mist transition">2</button>
            <button className="w-8 h-8 rounded-lg border border-slate-200 hover:bg-mist transition">3</button>
            <button className="w-8 h-8 rounded-lg border border-slate-200 hover:bg-mist transition">›</button>
          </div>
        </div>
      </div>
    </section>
  )
}
