import { useState } from "react";
import { X } from "lucide-react";

const fieldClass =
  "w-full rounded-xl border border-line bg-white px-3.5 py-2 text-sm font-body text-heading focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors";

function Field({ label, value, onChange }) {
  return (
    <div className="mb-4">
      <label className="block text-xs font-medium text-slate-500 font-body mb-1.5">{label}</label>
      <input value={value} onChange={onChange} className={fieldClass} />
    </div>
  );
}

export default function EditStudentDrawer({ student, onClose, onSave }) {
  const [form, setForm] = useState(() => ({
    name: student?.name || "",
    email: student?.email || "",
    phone: student?.phone || "",
    college: student?.college || "",
    branch: student?.branch || "",
    semester: student?.semester || "",
    skills: student?.skills?.join(", ") || "",
    github: student?.github || "",
    linkedin: student?.linkedin || "",
    portfolio: student?.portfolio || "",
  }));

  if (!student) return null;

  const update = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  const handleSave = () => {
    onSave({ ...student, ...form, skills: form.skills.split(",").map((s) => s.trim()).filter(Boolean) });
  };

  return (
    <div className="fixed inset-0 z-[100] flex justify-end bg-ink/40 animate-[fadeIn_0.15s_ease-out]" onClick={onClose}>
      <div
        className="w-full max-w-md h-full bg-white shadow-xl flex flex-col animate-[slideIn_0.2s_ease-out]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-line">
          <h2 className="font-display text-lg text-heading">Edit Student</h2>
          <button onClick={onClose} className="rounded-lg p-1.5 text-slate-500 hover:bg-surface-alt transition-colors">
            <X className="w-4 h-4" strokeWidth={1.75} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          <div className="flex items-center gap-3 mb-5">
            <img src={student.photo} alt={student.name} className="w-14 h-14 rounded-full object-cover" />
            <button type="button" className="rounded-xl border border-line bg-white px-3.5 py-2 text-sm font-body text-heading hover:bg-surface-alt transition-colors">
              Change Photo
            </button>
          </div>

          <Field label="Name" value={form.name} onChange={update("name")} />
          <Field label="Email" value={form.email} onChange={update("email")} />
          <Field label="Phone" value={form.phone} onChange={update("phone")} />
          <Field label="College" value={form.college} onChange={update("college")} />
          <div className="grid grid-cols-2 gap-3">
            <Field label="Branch" value={form.branch} onChange={update("branch")} />
            <Field label="Semester" value={form.semester} onChange={update("semester")} />
          </div>
          <Field label="Skills (comma separated)" value={form.skills} onChange={update("skills")} />
          <Field label="GitHub" value={form.github} onChange={update("github")} />
          <Field label="LinkedIn" value={form.linkedin} onChange={update("linkedin")} />
          <Field label="Portfolio" value={form.portfolio} onChange={update("portfolio")} />
        </div>

        <div className="flex justify-end gap-2.5 px-5 py-4 border-t border-line">
          <button onClick={onClose} className="rounded-xl border border-line bg-white px-3.5 py-2 text-sm font-body text-heading hover:bg-surface-alt transition-colors">
            Cancel
          </button>
          <button onClick={handleSave} className="rounded-xl bg-primary px-3.5 py-2 text-sm font-body text-white hover:bg-primary/90 transition-colors">
            Save
          </button>
        </div>
      </div>
    </div>
  );
}