import { Briefcase, Zap, Clock, CheckCircle2, ArrowUp, ArrowDown } from "lucide-react";

export default function InternshipStats({ stats }) {
  const items = [
    { label: "Total Internships", value: stats?.total ?? 0, trend: stats?.totalTrend ?? 0, Icon: Briefcase, tint: "text-primary bg-primary-bg" },
    { label: "Active Internships", value: stats?.active ?? 0, trend: stats?.activeTrend ?? 0, Icon: Zap, tint: "text-accent bg-accent/10" },
    { label: "Pending Approval", value: stats?.pending ?? 0, trend: stats?.pendingTrend ?? 0, Icon: Clock, tint: "text-warning bg-warning-bg" },
    { label: "Completed Internships", value: stats?.completed ?? 0, trend: stats?.completedTrend ?? 0, Icon: CheckCircle2, tint: "text-success bg-success-bg" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {items.map((s) => {
        const isUp = s.trend >= 0;
        return (
          <div
            key={s.label}
            className="group rounded-2xl border border-line bg-white p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
          >
            <div className="flex items-center justify-between mb-4">
              <span className={`w-10 h-10 rounded-xl flex items-center justify-center ${s.tint}`}>
                <s.Icon className="w-5 h-5" strokeWidth={1.75} />
              </span>
              <span
                className={`inline-flex items-center gap-0.5 text-xs font-medium font-body px-2 py-0.5 rounded-full ${
                  isUp ? "text-success bg-success-bg" : "text-danger bg-danger-bg"
                }`}
              >
                {isUp ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
                {Math.abs(s.trend)}%
              </span>
            </div>
            <p className="font-display text-2xl text-heading">{s.value}</p>
            <p className="text-sm text-slate-500 font-body mt-1">{s.label}</p>
          </div>
        );
      })}
    </div>
  );
}
