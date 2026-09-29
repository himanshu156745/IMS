import { CheckCircle2, XCircle, UserPlus, Trash2, Download, X } from "lucide-react";

export default function BulkActionBar({ selectedCount, onBulkAction, onClear }) {
  if (selectedCount === 0) return null;

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-primary/30 bg-primary-bg px-4 py-3">
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onClear}
          className="rounded-lg p-1 text-primary hover:bg-white/60 transition-colors"
        >
          <X className="w-4 h-4" strokeWidth={2} />
        </button>
        <span className="text-sm font-body font-medium text-primary">
          {selectedCount} application{selectedCount > 1 ? "s" : ""} selected
        </span>
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => onBulkAction("accept")}
          className="flex items-center gap-1.5 rounded-xl bg-white px-3 py-1.5 text-sm font-body text-signal hover:bg-signal-light transition-colors"
        >
          <CheckCircle2 className="w-4 h-4" strokeWidth={1.75} /> Accept
        </button>
        <button
          type="button"
          onClick={() => onBulkAction("reject")}
          className="flex items-center gap-1.5 rounded-xl bg-white px-3 py-1.5 text-sm font-body text-danger hover:bg-danger-bg transition-colors"
        >
          <XCircle className="w-4 h-4" strokeWidth={1.75} /> Reject
        </button>
        <button
          type="button"
          onClick={() => onBulkAction("assign")}
          className="flex items-center gap-1.5 rounded-xl bg-white px-3 py-1.5 text-sm font-body text-heading hover:bg-surface-alt transition-colors"
        >
          <UserPlus className="w-4 h-4" strokeWidth={1.75} /> Assign
        </button>
        <button
          type="button"
          onClick={() => onBulkAction("export")}
          className="flex items-center gap-1.5 rounded-xl bg-white px-3 py-1.5 text-sm font-body text-heading hover:bg-surface-alt transition-colors"
        >
          <Download className="w-4 h-4" strokeWidth={1.75} /> Export
        </button>
        <button
          type="button"
          onClick={() => onBulkAction("delete")}
          className="flex items-center gap-1.5 rounded-xl bg-white px-3 py-1.5 text-sm font-body text-danger hover:bg-danger-bg transition-colors"
        >
          <Trash2 className="w-4 h-4" strokeWidth={1.75} /> Delete
        </button>
      </div>
    </div>
  );
}