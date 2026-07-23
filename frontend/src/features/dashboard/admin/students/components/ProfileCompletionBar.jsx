export default function ProfileCompletionBar({ value }) {
  const pct = Math.max(0, Math.min(100, value));
  const fill = pct > 80 ? "bg-signal" : pct >= 50 ? "bg-amber" : "bg-coral";
  const text = pct > 80 ? "text-signal" : pct >= 50 ? "text-amber" : "text-coral";

  return (
    <div className="flex items-center gap-2 min-w-[110px]">
      <div className="flex-1 h-1.5 rounded-full bg-slate/10 overflow-hidden">
        <div className={`h-full rounded-full ${fill}`} style={{ width: `${pct}%` }} />
      </div>
      <span className={`text-xs font-medium font-mono w-9 text-right ${text}`}>{pct}%</span>
    </div>
  );
}