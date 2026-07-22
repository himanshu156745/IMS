const MOCK_STUDENTS = [
  { id: 1, initials: "AS", name: "Arjun Sharma", meta: "Computer Science · Batch 2026", progress: 78, label: "Ongoing" },
  { id: 2, initials: "PM", name: "Priya Mehta", meta: "Information Tech · Batch 2026", progress: 92, label: "Almost done" },
  { id: 3, initials: "RV", name: "Rohan Verma", meta: "Electronics · Batch 2026", progress: 40, label: "Ongoing" },
  { id: 4, initials: "SP", name: "Sneha Patel", meta: "MBA · Batch 2026", progress: 100, label: "Inactive" },
];

export default function RecentStudents() {
  return (
    <div className="rounded-md bg-white shadow-sm p-5">
      <h2 className="font-display text-base text-ink mb-4">Recent Students</h2>
      <ul className="space-y-4">
        {MOCK_STUDENTS.map((s) => (
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
    </div>
  );
}