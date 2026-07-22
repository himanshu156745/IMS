import { NavLink } from "react-router-dom";
import {
  LayoutGrid,
  GraduationCap,
  Building2,
  UserCog,
  Briefcase,
  FileText,
  BarChart3,
  Settings,
  LogOut,
} from "lucide-react";

const NAV_ITEMS = [
  { to: "/admin", label: "Dashboard", Icon: LayoutGrid, end: true },
  { to: "/admin/students", label: "Manage Student", Icon: GraduationCap },
  { to: "/admin/companies", label: "Manage Companies", Icon: Building2 },
  { to: "/admin/faculty", label: "Manage Faculty", Icon: UserCog },
  { to: "/admin/internships", label: "Manage Internship", Icon: Briefcase },
  { to: "/admin/applications", label: "View Applications", Icon: FileText },
  { to: "/admin/reports", label: "Report & Analytics", Icon: BarChart3 },
  { to: "/admin/settings", label: "Setting", Icon: Settings },
];

export default function Sidebar() {
  const handleLogout = () => {
    // TODO: clear auth token/session + redirect to /login once auth module is wired
    console.log("logout clicked");
  };

  return (
    <aside className="hidden md:flex md:w-60 md:flex-col bg-ink text-paper/90 fixed inset-y-0 left-0 z-20">
      <div className="px-6 py-6 border-b border-white/10">
        <span className="font-display text-xl tracking-tight text-white">
          RID Tech
        </span>
        <span className="block text-[11px] uppercase tracking-widest text-paper/40 font-body mt-0.5">
          Admin Console
        </span>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1 font-body text-sm">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-md px-3 py-2.5 transition-colors ${
                isActive
                  ? "bg-signal/20 text-signal-light border-l-2 border-signal"
                  : "text-paper/70 hover:bg-white/5 hover:text-paper"
              }`
            }
          >
            <item.Icon className="w-4 h-4 shrink-0" strokeWidth={1.75} />
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="px-3 py-4 border-t border-white/10">
        <button
          type="button"
          onClick={handleLogout}
          className="flex items-center gap-3 w-full rounded-md px-3 py-2.5 text-sm font-body text-paper/70 hover:bg-coral/10 hover:text-coral transition-colors"
        >
          <LogOut className="w-4 h-4 shrink-0" strokeWidth={1.75} />
          Logout
        </button>
      </div>
    </aside>
  );
}