import { useState } from "react";
import { X } from "lucide-react";

const inputClass =
  "w-full rounded-xl border border-line bg-white px-3.5 py-2 text-sm font-body text-heading placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors";

export default function InterviewScheduler({ application, onClose, onSave }) {
  if (!application) return null;
  const existing = application.interview;

  const [date, setDate] = useState(existing?.date || "");
  const [time, setTime] = useState(existing?.time || "");
  const [link, setLink] = useState(existing?.link || "");
  const [notes, setNotes] = useState(existing?.notes || "");

  const handleSave = () => {
    onSave({ date, time, link, notes, mode: link ? "Online" : "In-Person", status: "Interview Scheduled" });
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center bg-ink/40 p-4 animate-[fadeIn_0.15s_ease-out]" onClick={onClose}>
      <div className="w-full max-w-md rounded-2xl bg-white shadow-xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between px-5 py-4 border-b border-line">
          <div>
            <h3 className="font-display text-base text-heading">{existing ? "Update Interview" : "Schedule Interview"}</h3>
            <p className="text-xs text-slate-400 font-body">{application.student.name}</p>
          </div>
          <button onClick={onClose} className="rounded-lg p-1.5 text-slate-500 hover:bg-surface-alt transition-colors">
            <X className="w-4 h-4" strokeWidth={1.75} />
          </button>
        </div>

        <div className="px-5 py-5 space-y-3.5">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-slate-500 font-body">Date</label>
              <input type="text" placeholder="e.g. 28 Jul 2026" value={date} onChange={(e) => setDate(e.target.value)} className={inputClass} />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-slate-500 font-body">Time</label>
              <input type="text" placeholder="e.g. 11:00 AM" value={time} onChange={(e) => setTime(e.target.value)} className={inputClass} />
            </div>
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-slate-500 font-body">Meeting Link</label>
            <input type="text" placeholder="https://meet.google.com/..." value={link} onChange={(e) => setLink(e.target.value)} className={inputClass} />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-slate-500 font-body">Notes</label>
            <textarea rows={3} value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Interview notes..." className={`${inputClass} resize-none`} />
          </div>
        </div>

        <div className="flex justify-end gap-2.5 px-5 py-4 border-t border-line">
          <button onClick={onClose} className="rounded-xl border border-line bg-white px-3.5 py-2 text-sm font-body text-heading hover:bg-surface-alt transition-colors">
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={!date || !time}
            className="rounded-xl bg-primary px-3.5 py-2 text-sm font-body text-white hover:bg-primary/90 disabled:opacity-40 transition-colors"
          >
            {existing ? "Update" : "Schedule"}
          </button>
        </div>
      </div>
    </div>
  );
}