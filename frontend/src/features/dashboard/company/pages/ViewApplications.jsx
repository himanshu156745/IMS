import { useNavigate } from 'react-router-dom'
import Icon from '../components/ui/Icon.jsx'
import StatusBadge from '../components/ui/StatusBadge.jsx'
import Avatar from '../components/ui/Avatar.jsx'
import { applications } from '../services/mockData.js'

function ActionsCell({ status, onViewAssignment }) {
  if (status === 'Pending') {
    return (
      <div className="flex justify-end gap-2">
        <button className="px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-600 text-[12px] font-medium hover:bg-emerald-100 transition">
          Shortlist
        </button>
        <button className="px-3 py-1.5 rounded-lg bg-rose-50 text-rose-500 text-[12px] font-medium hover:bg-rose-100 transition">
          Reject
        </button>
      </div>
    )
  }
  if (status === 'Accepted') {
    return (
      <div className="flex justify-end gap-2">
        <button
          onClick={onViewAssignment}
          className="px-3 py-1.5 rounded-lg bg-brand-50 text-brand-600 text-[12px] font-medium hover:bg-brand-100 transition"
        >
          View Assignment
        </button>
      </div>
    )
  }
  if (status === 'Shortlisted') {
    return (
      <div className="flex justify-end gap-2">
        <button className="px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-600 text-[12px] font-medium hover:bg-emerald-100 transition">
          Accept
        </button>
        <button className="px-3 py-1.5 rounded-lg bg-rose-50 text-rose-500 text-[12px] font-medium hover:bg-rose-100 transition">
          Reject
        </button>
      </div>
    )
  }
  return <div className="flex justify-end gap-2 text-slate-300 text-[12px]">No actions</div>
}

export default function ViewApplications() {
  const navigate = useNavigate()

  return (
    <section className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 justify-between">
        <div className="relative w-full sm:max-w-xs">
          <Icon name="search" className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search applicants…"
            className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:border-brand-400 focus:ring-4 focus:ring-brand-50 outline-none transition bg-white"
          />
        </div>
        <div className="flex gap-2.5">
          <select className="px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm bg-white outline-none focus:border-brand-400">
            <option>All Internships</option>
            <option>Frontend Developer Intern</option>
            <option>Backend Developer Intern</option>
            <option>UI/UX Design Intern</option>
          </select>
          <select className="px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm bg-white outline-none focus:border-brand-400">
            <option>All Status</option>
            <option>Pending</option>
            <option>Shortlisted</option>
            <option>Accepted</option>
            <option>Rejected</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-card border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[860px]">
            <thead>
              <tr className="text-left text-slate-400 text-[12px] uppercase tracking-wide bg-mist/70">
                <th className="font-medium px-5 py-3.5">Applicant</th>
                <th className="font-medium px-5 py-3.5">Internship</th>
                <th className="font-medium px-5 py-3.5">Applied On</th>
                <th className="font-medium px-5 py-3.5">Resume</th>
                <th className="font-medium px-5 py-3.5">Status</th>
                <th className="font-medium px-5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {applications.map((row) => (
                <tr key={row.name} className="hover:bg-mist/60 transition">
                  <td className="px-5 py-3.5 flex items-center gap-2.5">
                    <Avatar id={row.avatar} />
                    <div>
                      <span className="font-medium text-ink block">{row.name}</span>
                      <span className="text-[12px] text-slate-400">{row.subtitle}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-slate-500">{row.internship}</td>
                  <td className="px-5 py-3.5 text-slate-500 font-mono text-[13px]">{row.applied}</td>
                  <td className="px-5 py-3.5">
                    <a href="#" className="text-brand-600 font-medium hover:underline">
                      View Resume
                    </a>
                  </td>
                  <td className="px-5 py-3.5">
                    <StatusBadge status={row.status} />
                  </td>
                  <td className="px-5 py-3.5">
                    <ActionsCell status={row.status} onViewAssignment={() => navigate('/students')} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
