export default function FacultyOverview({ faculty = [] }) {
  const list = faculty.map((f) => {
    const p = f.facultyProfile || f.profile || {};
    const name = p.fullName || f.email?.split("@")[0] || "Faculty";
    const initials =
      name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase() || "FA";
    return {
      id: f._id || f.id,
      initials,
      name,
      email: f.email,
      assigned: p.menteeCount || 0,
      completed: 0,
      rating: 4.8,
    };
  });

  return (
    <div className="rounded-md bg-white shadow-sm p-5">
      <h2 className="font-display text-base text-ink mb-4">Faculty Overview</h2>
      {list.length === 0 ? (
        <p className="text-xs text-slate font-body py-4 text-center">No faculty members found.</p>
      ) : (
        <ul className="space-y-4">
          {list.map((f) => (
            <li key={f.id} className="flex items-center gap-3">
              <span className="w-9 h-9 shrink-0 rounded-full bg-coral/10 text-coral text-xs font-medium flex items-center justify-center">
                {f.initials}
              </span>
              <div className="flex-1 min-w-0">
                <span className="text-sm text-ink font-body">{f.name}</span>
                <p className="text-[11px] text-slate/70 font-body truncate">{f.email}</p>
              </div>
              <div className="flex items-center gap-3 text-[11px] font-body shrink-0 text-right">
                <span className="text-slate">
                  {f.assigned}
                  <span className="block text-[10px] text-slate/60">Assigned</span>
                </span>
                <span className="text-slate">
                  {f.completed}
                  <span className="block text-[10px] text-slate/60">Completed</span>
                </span>
                <span className="text-amber font-medium">★ {f.rating}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
