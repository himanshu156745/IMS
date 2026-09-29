import { X } from "lucide-react";

export default function ConfirmationModal({ config, onClose, onConfirm }) {
  if (!config) return null;
  const { title, message, confirmLabel = "Confirm", danger = false } = config;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/40 p-4 animate-[fadeIn_0.15s_ease-out]" onClick={onClose}>
      <div className="w-full max-w-sm rounded-2xl bg-white shadow-xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between px-5 py-4 border-b border-line">
          <h3 className="font-display text-base text-heading">{title}</h3>
          <button onClick={onClose} className="rounded-lg p-1.5 text-slate-500 hover:bg-surface-alt transition-colors">
            <X className="w-4 h-4" strokeWidth={1.75} />
          </button>
        </div>
        <div className="px-5 py-5">
          <p className="text-sm text-slate-500 font-body leading-relaxed">{message}</p>
        </div>
        <div className="flex justify-end gap-2.5 px-5 py-4 border-t border-line">
          <button onClick={onClose} className="rounded-xl border border-line bg-white px-3.5 py-2 text-sm font-body text-heading hover:bg-surface-alt transition-colors">
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className={`rounded-xl px-3.5 py-2 text-sm font-body text-white transition-colors ${
              danger ? "bg-danger hover:bg-danger/90" : "bg-primary hover:bg-primary/90"
            }`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}