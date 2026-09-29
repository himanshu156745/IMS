import { useState } from "react";
import { X } from "lucide-react";

const fieldClass =
  "w-full rounded-xl border border-line bg-white px-3.5 py-2 text-sm font-body text-heading focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors";

export default function EmailModal({ student, onClose, onSend }) {
  const [form, setForm] = useState({ to: student?.email || "", subject: "", message: "" });
  if (!student) return null;

  const update = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/40 p-4 animate-[fadeIn_0.15s_ease-out]" onClick={onClose}>
      <div className="w-full max-w-md rounded-2xl bg-white shadow-xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between px-5 py-4 border-b border-line">
          <h3 className="font-display text-base text-heading">Send Email</h3>
          <button onClick={onClose} className="rounded-lg p-1.5 text-slate-500 hover:bg-surface-alt transition-colors">
            <X className="w-4 h-4" strokeWidth={1.75} />
          </button>
        </div>

        <div className="px-5 py-4 space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-500 font-body mb-1.5">To</label>
            <input value={form.to} onChange={update("to")} className={fieldClass} />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-500 font-body mb-1.5">Subject</label>
            <input
              value={form.subject}
              onChange={update("subject")}
              placeholder="Regarding your internship application"
              className={fieldClass}
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-500 font-body mb-1.5">Message</label>
            <textarea
              value={form.message}
              onChange={update("message")}
              placeholder="Write your message here..."
              rows={5}
              className={`${fieldClass} resize-none`}
            />
          </div>
        </div>

        <div className="flex justify-end gap-2.5 px-5 py-4 border-t border-line">
          <button onClick={onClose} className="rounded-xl border border-line bg-white px-3.5 py-2 text-sm font-body text-heading hover:bg-surface-alt transition-colors">
            Cancel
          </button>
          <button onClick={() => onSend(form)} className="rounded-xl bg-primary px-3.5 py-2 text-sm font-body text-white hover:bg-primary/90 transition-colors">
            Send
          </button>
        </div>
      </div>
    </div>
  );
}