import { Briefcase, Zap, Clock, CheckCircle2, ArrowUp, ArrowDown } from "lucide-react";

const STATS = [
  { label: "Total Internships", value: 236, trend: 8.4, Icon: Briefcase, tint: "text-primary bg-primary-bg" },
  { label: "Active Internships", value: 108, trend: 12.1, Icon: Zap, tint: "text-accent bg-accent/10" },
  { label: "Pending Approval", value: 24, trend: -3.6, Icon: Clock, tint: "text-warning bg-warning-bg" },
  { label: "Completed Internships", value: 312, trend: 15.2, Icon: CheckCircle2, tint: "text-success bg-success-bg" },
];

export default function InternshipStats() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {STATS.map((s) => {
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