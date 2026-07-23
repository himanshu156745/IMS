import { X, FileText } from "lucide-react";

export default function DocumentPreviewModal({ document, onClose }) {
  if (!document) return null;
  const { studentName, label, fileName } = document;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/40 p-4 animate-[fadeIn_0.15s_ease-out]" onClick={onClose}>
      <div className="w-full max-w-md rounded-2xl bg-white shadow-xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between px-5 py-4 border-b border-line">
          <h3 className="font-display text-base text-heading">{label} — {studentName}</h3>
          <button onClick={onClose} className="rounded-lg p-1.5 text-slate-500 hover:bg-surface-alt transition-colors">
            <X className="w-4 h-4" strokeWidth={1.75} />
          </button>
        </div>
        <div className="px-5 py-5">
          <div className="h-48 rounded-xl border border-dashed border-line bg-surface-alt flex flex-col items-center justify-center gap-2 text-center px-4">
            <FileText className="w-7 h-7 text-slate-400" strokeWidth={1.5} />
            <span className="text-sm text-slate-500 font-body">{fileName || "No document uploaded"}</span>
            <span className="text-xs text-slate-400 font-body">Preview is not available in this demo.</span>
          </div>
        </div>
        <div className="flex justify-end gap-2.5 px-5 py-4 border-t border-line">
          <button onClick={onClose} className="rounded-xl border border-line bg-white px-3.5 py-2 text-sm font-body text-heading hover:bg-surface-alt transition-colors">
            Close
          </button>
          <button disabled={!fileName} className="rounded-xl bg-primary px-3.5 py-2 text-sm font-body text-white hover:bg-primary/90 disabled:opacity-40 transition-colors">
            Download
          </button>
        </div>
      </div>
    </div>
  );
}