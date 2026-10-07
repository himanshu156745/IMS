const toneMap = {
  Pending: 'bg-amber-50 text-amber-600',
  Accepted: 'bg-emerald-50 text-emerald-600',
  Shortlisted: 'bg-brand-50 text-brand-600',
  Rejected: 'bg-rose-50 text-rose-500',
  Active: 'bg-emerald-50 text-emerald-600',
  Draft: 'bg-slate-100 text-slate-500',
  Closed: 'bg-rose-50 text-rose-500',
  Ongoing: 'bg-emerald-50 text-emerald-600',
  Completed: 'bg-slate-100 text-slate-500',
}

export default function StatusBadge({ status }) {
  const classes = toneMap[status] || 'bg-slate-100 text-slate-500'
  return (
    <span className={`px-2.5 py-1 rounded-full text-[12px] font-medium ${classes}`}>
      {status}
    </span>
  )
}
