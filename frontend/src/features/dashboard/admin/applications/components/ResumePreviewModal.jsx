import { X, Download, FileText } from "lucide-react";

export default function ResumePreviewModal({ document, onClose }) {
  if (!document) return null;
  const { studentName, label, fileName } = document;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center bg-ink/40 p-4 animate-[fadeIn_0.15s_ease-out]" onClick={onClose}>
      <div className="w-full max-w-lg rounded-2xl bg-white shadow-xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between px-5 py-4 border-b border-line">
          <div>
            <h3 className="font-display text-base text-heading">{label}</h3>
            <p className="text-xs text-slate-400 font-body">{studentName}</p>
          </div>
          <button onClick={onClose} className="rounded-lg p-1.5 text-slate-500 hover:bg-surface-alt transition-colors">
            <X className="w-4 h-4" strokeWidth={1.75} />
          </button>
        </div>

        <div className="px-5 py-8 flex flex-col items-center justify-center gap-3 bg-surface-alt/50 mx-5 my-4 rounded-xl border border-dashed border-line min-h-[260px]">
          <FileText className="w-12 h-12 text-primary" strokeWidth={1.25} />
          <p className="text-sm font-body text-heading">{fileName || "No file available"}</p>
          <p className="text-xs text-slate-400 font-body">PDF preview is not available in this demo.</p>
        </div>

        <div className="flex justify-end gap-2.5 px-5 py-4 border-t border-line">
          <button onClick={onClose} className="rounded-xl border border-line bg-white px-3.5 py-2 text-sm font-body text-heading hover:bg-surface-alt transition-colors">
            Close
          </button>
          <button className="flex items-center gap-1.5 rounded-xl bg-primary px-3.5 py-2 text-sm font-body text-white hover:bg-primary/90 transition-colors">
            <Download className="w-4 h-4" strokeWidth={1.75} /> Download
          </button>
        </div>
      </div>
    </div>
  );
}