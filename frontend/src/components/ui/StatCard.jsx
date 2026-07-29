import { ArrowUp, ArrowDown } from "lucide-react";
import { STATUS_COLOR } from "../../utils/constants";

/**
 * StatCard — ledger-style metric tile.
 * The left "pulse rail" colour encodes real status (on track / attention /
 * overdue) — not decorative. The top-right badge shows trend vs last period.
 *
 * @param {string} label
 * @param {number|string} value
 * @param {string} sub
 * @param {"onTrack"|"attention"|"overdue"|"neutral"} status
 * @param {number} trend - signed percent, e.g. 12.4 or -3.2
 */
export default function StatCard({ label, value, sub, status = "neutral", trend }) {
  const isUp = trend >= 0;

  return (
    <div className="relative flex flex-col gap-2 rounded-md bg-white pl-5 pr-4 py-4 shadow-sm overflow-hidden">
      <span
        className={`absolute left-0 top-0 h-full w-1.5 ${STATUS_COLOR[status]}`}
        aria-hidden="true"
      />

      {trend !== undefined && (
        <span
          className={`absolute top-3 right-3 inline-flex items-center gap-0.5 text-[11px] font-medium font-body px-1.5 py-0.5 rounded-full ${
            isUp ? "bg-signal-light text-signal" : "bg-coral-light text-coral"
          }`}
        >
          {isUp ? (
            <ArrowUp className="w-3 h-3" strokeWidth={2} />
          ) : (
            <ArrowDown className="w-3 h-3" strokeWidth={2} />
          )}
          {Math.abs(trend)}%
        </span>
      )}

      <span className="font-mono text-2xl font-medium text-ink mt-1">
        {value}
      </span>
      <div className="flex flex-col">
        <span className="text-xs text-slate font-body">{label}</span>
        {sub && <span className="text-[11px] text-slate/70 font-body">{sub}</span>}
      </div>
    </div>
  );
}