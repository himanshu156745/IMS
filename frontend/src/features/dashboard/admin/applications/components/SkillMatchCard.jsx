import { Check, X } from "lucide-react";

export default function SkillMatchCard({ skillMatch }) {
  const { percentage, matched, missing } = skillMatch;

  const color =
    percentage >= 80 ? "text-signal" : percentage >= 50 ? "text-amber" : "text-coral";
  const trackColor =
    percentage >= 80 ? "bg-signal" : percentage >= 50 ? "bg-amber" : "bg-coral";

  return (
    <div className="space-y-2 min-w-[140px]">
      <div className="flex items-center gap-2">
        <span className={`font-mono text-sm font-medium ${color}`}>{percentage}%</span>
        <div className="flex-1 h-1.5 rounded-full bg-line overflow-hidden">
          <div className={`h-full rounded-full ${trackColor}`} style={{ width: `${percentage}%` }} />
        </div>
      </div>
      <div className="flex flex-wrap gap-1">
        {matched.map((s) => (
          <span key={s} className="inline-flex items-center gap-1 rounded-full bg-signal-light px-2 py-0.5 text-[11px] font-body text-signal">
            <Check className="w-3 h-3" strokeWidth={2} /> {s}
          </span>
        ))}
        {missing.map((s) => (
          <span key={s} className="inline-flex items-center gap-1 rounded-full bg-coral-light px-2 py-0.5 text-[11px] font-body text-coral">
            <X className="w-3 h-3" strokeWidth={2} /> {s}
          </span>
        ))}
      </div>
    </div>
  );
}