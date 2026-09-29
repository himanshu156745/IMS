import { NavLink } from "react-router-dom";
import {
  LayoutGrid,
  Briefcase,
  FileText,
  Users,
  Settings,
  LogOut,
  X,
} from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const NAV_ITEMS = [
  { to: "/company", label: "Dashboard", Icon: LayoutGrid, end: true },
  { to: "/company/internships", label: "My Internships", Icon: Briefcase },
  { to: "/company/applications", label: "Applications", Icon: FileText },
  { to: "/company/profile", label: "Company Profile", Icon: Users },
  { to: "/company/settings", label: "Settings", Icon: Settings },
];

export default function CompanySidebar({ isOpen, onClose }) {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch {
      navigate("/login");
    }
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-slate-900/50 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed z-40 flex h-full w-72 shrink-0 flex-col bg-ink px-4 py-6 transition-transform duration-300 ease-in-out lg:sticky lg:top-0 lg:h-screen lg:translate-x-0
  ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="mb-8 flex items-center justify-between px-2">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600 text-lg font-bold text-white">
              C
            </div>
            <div>
              <p className="text-lg font-bold leading-none text-white">
                IMS
              </p>
              <p className="text-xs font-medium text-slate-400">
                Company Portal
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-slate-400 hover:bg-white/5 hover:text-white lg:hidden"
          >
            <X size={22} />
          </button>
        </div>

        <nav className="flex flex-1 flex-col gap-1.5">
          {NAV_ITEMS.map(({ to, label, Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              onClick={onClose}
              className={({ isActive }) =>
                `sidebar-link ${isActive ? "sidebar-link-active" : ""}`
              }
            >
              <Icon size={20} strokeWidth={1.75} />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>

        <button
          type="button"
          onClick={handleLogout}
          className="sidebar-link mt-2 hover:bg-red-500/10 hover:text-red-400"
        >
          <LogOut size={20} strokeWidth={1.75} />
          <span>Logout</span>
        </button>
      </aside>
    </>
  );
}
