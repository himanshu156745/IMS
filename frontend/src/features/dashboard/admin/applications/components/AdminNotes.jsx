import { useState } from "react";
import { StickyNote, Plus } from "lucide-react";

export default function AdminNotes({ notes, onAddNote }) {
  const [draft, setDraft] = useState("");

  const handleAdd = () => {
    if (!draft.trim()) return;
    onAddNote(draft.trim());
    setDraft("");
  };

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        <input
          type="text"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAdd()}
          placeholder="Add a note e.g. Strong React skills."
          className="flex-1 rounded-xl border border-line bg-white px-3.5 py-2 text-sm font-body text-heading placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
        />
        <button
          type="button"
          onClick={handleAdd}
          className="flex items-center gap-1 rounded-xl bg-primary px-3.5 py-2 text-sm font-body text-white hover:bg-primary/90 transition-colors"
        >
          <Plus className="w-4 h-4" strokeWidth={1.75} /> Add
        </button>
      </div>

      {notes.length === 0 ? (
        <p className="text-sm text-slate-400 font-body py-2">No notes added yet.</p>
      ) : (
        <div className="space-y-2">
          {notes.map((note, i) => (
            <div key={i} className="flex gap-2.5 rounded-xl border border-line px-3.5 py-2.5">
              <StickyNote className="w-4 h-4 mt-0.5 text-amber shrink-0" strokeWidth={1.75} />
              <p className="text-sm text-heading font-body">{note}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}