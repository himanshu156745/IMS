import { Briefcase, GraduationCap, UserCog, Building2, Award, FileBarChart } from "lucide-react";

const ACTIONS = [
  { label: "Add Internship", Icon: Briefcase },
  { label: "Add Student", Icon: GraduationCap },
  { label: "Add Faculty", Icon: UserCog },
  { label: "Add Company", Icon: Building2 },
  { label: "Add Certificate", Icon: Award },
  { label: "View Reports", Icon: FileBarChart },
];

export default function QuickActions() {
  return (
    <div className="rounded-md bg-white shadow-sm p-4 h-full">
      <h2 className="font-display text-base text-ink mb-3">Quick Actions</h2>
      <div className="grid grid-cols-3 gap-2">
        {ACTIONS.map((a) => (
          <button
            key={a.label}
            type="button"
            className="flex flex-col items-center gap-1.5 rounded-md border border-slate/10 px-2 py-3 text-center hover:bg-paper transition-colors"
          >
            <a.Icon className="w-4 h-4 text-signal" strokeWidth={1.75} />
            <span className="text-[11px] leading-tight text-ink font-body">
              {a.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}