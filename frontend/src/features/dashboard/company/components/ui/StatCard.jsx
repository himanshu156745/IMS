import Icon from './Icon.jsx'

const iconTones = {
  brand: 'bg-brand-50 text-brand-600',
  amber: 'bg-amber-50 text-amber-600',
}

const barTones = {
  brand: ['bg-brand-100', 'bg-brand-100', 'bg-brand-200', 'bg-brand-300', 'bg-brand-400', 'bg-brand-500'],
  amber: ['bg-amber-100', 'bg-amber-200', 'bg-amber-200', 'bg-amber-300', 'bg-amber-400', 'bg-amber-500'],
}

export default function StatCard({ label, value, delta, deltaTone, icon, bars, barTone = 'brand' }) {
  const iconClass = deltaTone === 'down' ? iconTones.amber : iconTones.brand
  const deltaClass = deltaTone === 'down' ? 'text-rose-500' : 'text-emerald-600'
  const tones = barTones[barTone] || barTones.brand

  return (
    <div className="bg-white rounded-2xl shadow-card p-5 border border-slate-100">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[13px] text-slate-400 font-medium">{label}</p>
          <p className="font-mono font-semibold text-[28px] text-ink mt-1">{value}</p>
        </div>
        <span className={`w-10 h-10 rounded-xl flex items-center justify-center ${iconClass}`}>
          <Icon name={icon} className="w-5 h-5" />
        </span>
      </div>
      <div className="flex items-end gap-1 h-8 mt-4">
        {bars.map((h, i) => (
          <div key={i} className={`sparkbar w-2 rounded-sm ${tones[i % tones.length]}`} style={{ height: `${h}%` }} />
        ))}
        <span className={`ml-auto text-[12px] font-medium self-center ${deltaClass}`}>{delta}</span>
      </div>
    </div>
  )
}
