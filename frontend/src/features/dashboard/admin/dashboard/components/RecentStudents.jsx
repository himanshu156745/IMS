export default function RecentStudents({ students = [] }) {
  const list = students.map((s) => {
    const p = s.studentProfile || s.profile || {};
    const name = p.fullName || s.email?.split("@")[0] || "Student";
    const initials =
      name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase() || "ST";
    const meta = `${p.branch || "General"} · ${p.university || "University"}`;
    return {
      id: s._id || s.id,
      initials,
      name,
      meta,
      progress: s.isActive ? 75 : 0,
      label: s.isActive ? "Active" : "Inactive",
    };
  });

  return (
    <div className="rounded-md bg-white shadow-sm p-5">
      <h2 className="font-display text-base text-ink mb-4">Recent Students</h2>
      {list.length === 0 ? (
        <p className="text-xs text-slate font-body py-4 text-center">No students registered yet.</p>
      ) : (
        <ul className="space-y-4">
          {list.map((s) => (
            <li key={s.id} className="flex items-center gap-3">
              <span className="w-9 h-9 shrink-0 rounded-full bg-signal/10 text-signal text-xs font-medium flex items-center justify-center">
                {s.initials}
              </span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-ink font-body truncate">{s.name}</span>
                  <span className="text-xs text-slate shrink-0 ml-2">{s.label}</span>
                </div>
                <p className="text-[11px] text-slate/70 font-body">{s.meta}</p>
                <div className="mt-1.5 h-1.5 rounded-full bg-slate/10 overflow-hidden">
                  <div
                    className="h-full bg-signal rounded-full"
                    style={{ width: `${s.progress}%` }}
                  />
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
