import { NavLink } from "react-router-dom";
import {
  MdSpaceDashboard,
  MdOutlineGroups,
  MdOutlineDescription,
  MdOutlineCalendarMonth,
  MdOutlineChatBubbleOutline,
  MdOutlineShowChart,
  MdOutlineLogout,
  MdClose,
} from "react-icons/md";

const navItems = [
  { to: "", label: "Dashboard", icon: MdSpaceDashboard, end: true },
  { to: "my-students", label: "My Students", icon: MdOutlineGroups },
  { to: "student-report", label: "Student Report", icon: MdOutlineDescription },
  { to: "attendance", label: "Attendance", icon: MdOutlineCalendarMonth },
  { to: "feedback", label: "Feedback", icon: MdOutlineChatBubbleOutline },
  { to: "performance", label: "Performance", icon: MdOutlineShowChart },
];

export default function Sidebar({ isOpen, onClose }) {
  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-slate-900/50 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed z-40 flex h-full w-72 flex-col bg-ink px-4 py-6 transition-transform duration-300 ease-in-out lg:sticky lg:top-0 lg:h-screen lg:translate-x-0
        ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="mb-8 flex items-center justify-between px-2">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-lg font-bold text-white">
              F
            </div>
            <div>
              <p className="text-lg font-bold leading-none text-white">Faculty</p>
              <p className="text-xs font-medium text-slate-400">Portal</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-slate-400 hover:bg-white/5 hover:text-white lg:hidden"
          >
            <MdClose size={22} />
          </button>
        </div>

        <nav className="flex flex-1 flex-col gap-1.5">
          {navItems.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={label}
              to={to}
              end={end}
              onClick={onClose}
              className={({ isActive }) =>
                `sidebar-link ${isActive ? "sidebar-link-active" : ""}`
              }
            >
              <Icon size={20} />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>

        <button className="sidebar-link mt-2 hover:bg-red-500/10 hover:text-red-400">
          <MdOutlineLogout size={20} />
          <span>Logout</span>
        </button>
      </aside>
    </>
  );
}