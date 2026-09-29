export default function DashboardCard({ icon: Icon, label, value, trend, tone = "brand" }) {
  const tones = {
    brand: "bg-brand-50 text-brand-500",
    green: "bg-emerald-50 text-emerald-500",
    amber: "bg-amber-50 text-amber-500",
    violet: "bg-violet-50 text-violet-500",
  };

  return (
    <div className="card group flex items-center justify-between p-5">
      <div>
        <p className="text-sm font-medium text-slate-400">{label}</p>
        <p className="mt-1.5 text-2xl font-extrabold text-slate-800">{value}</p>
        {trend && (
          <p className={`mt-1 text-xs font-semibold ${trend.startsWith("-") ? "text-red-500" : "text-emerald-500"}`}>
            {trend} vs last month
          </p>
        )}
      </div>
      <div
        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-110 ${tones[tone]}`}
      >
        <Icon size={24} />
      </div>
    </div>
  );
}