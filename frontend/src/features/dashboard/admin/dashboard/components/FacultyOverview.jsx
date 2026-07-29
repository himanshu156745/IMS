const MOCK_FACULTY = [
  { id: 1, initials: "AK", name: "Dr. Anil Kumar", email: "anil@college.edu", assigned: 18, completed: 3, rating: 4.8 },
  { id: 2, initials: "MI", name: "Prof. Meena Iyer", email: "meena@college.edu", assigned: 14, completed: 1, rating: 4.6 },
  { id: 3, initials: "SR", name: "Dr. Suresh Rao", email: "suresh@college.edu", assigned: 21, completed: 5, rating: 4.9 },
];

export default function FacultyOverview() {
  return (
    <div className="rounded-md bg-white shadow-sm p-5">
      <h2 className="font-display text-base text-ink mb-4">Faculty Overview</h2>
      <ul className="space-y-4">
        {MOCK_FACULTY.map((f) => (
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
    </div>
  );
}