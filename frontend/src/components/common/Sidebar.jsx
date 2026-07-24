// import { NavLink } from "react-router-dom";
// import {
//   LayoutGrid,
//   GraduationCap,
//   Building2,
//   UserCog,
//   Briefcase,
//   FileText,
//   BarChart3,
//   Settings,
//   LogOut,
// } from "lucide-react";

// const NAV_ITEMS = [
//   { to: "/admin", label: "Dashboard", Icon: LayoutGrid, end: true },
//   { to: "/admin/students", label: "Manage Student", Icon: GraduationCap },
//   { to: "/admin/companies", label: "Manage Companies", Icon: Building2 },
//   { to: "/admin/faculty", label: "Manage Faculty", Icon: UserCog },
//   { to: "/admin/internships", label: "Manage Internship", Icon: Briefcase },
//   { to: "/admin/applications", label: "View Applications", Icon: FileText },
//   { to: "/admin/reports", label: "Report & Analytics", Icon: BarChart3 },
//   { to: "/admin/settings", label: "Setting", Icon: Settings },
// ];

// export default function Sidebar() {
//   const handleLogout = () => {
//     // TODO: clear auth token/session + redirect to /login once auth module is wired
//     console.log("logout clicked");
//   };

//   return (
//     <aside className="hidden md:flex md:w-60 md:flex-col bg-ink text-paper/90 fixed inset-y-0 left-0 z-20">
//       <div className="px-6 py-6 border-b border-white/10">
//         <span className="font-display text-xl tracking-tight text-white">
//           RID Tech
//         </span>
//         <span className="block text-[11px] uppercase tracking-widest text-paper/40 font-body mt-0.5">
//           Admin Console
//         </span>
//       </div>

//       <nav className="flex-1 px-3 py-4 space-y-1 font-body text-sm">
//         {NAV_ITEMS.map((item) => (
//           <NavLink
//             key={item.to}
//             to={item.to}
//             end={item.end}
//             className={({ isActive }) =>
//               `flex items-center gap-3 rounded-md px-3 py-2.5 transition-colors ${
//                 isActive
//                   ? "bg-signal/20 text-signal-light border-l-2 border-signal"
//                   : "text-paper/70 hover:bg-white/5 hover:text-paper"
//               }`
//             }
//           >
//             <item.Icon className="w-4 h-4 shrink-0" strokeWidth={1.75} />
//             {item.label}
//           </NavLink>
//         ))}
//       </nav>

//       <div className="px-3 py-4 border-t border-white/10">
//         <button
//           type="button"
//           onClick={handleLogout}
//           className="flex items-center gap-3 w-full rounded-md px-3 py-2.5 text-sm font-body text-paper/70 hover:bg-coral/10 hover:text-coral transition-colors"
//         >
//           <LogOut className="w-4 h-4 shrink-0" strokeWidth={1.75} />
//           Logout
//         </button>
//       </div>
//     </aside>
//   );
// }

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
  X,
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

export default function Sidebar({ isOpen, onClose }) {
  const handleLogout = () => {
    // TODO: clear auth token/session + redirect to /login once auth module is wired
    console.log("logout clicked");
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-slate-900/50 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}

      {/* <aside
        className={`fixed z-40 flex h-full w-72 flex-col bg-ink px-4 py-6 transition-transform duration-300 ease-in-out lg:sticky lg:top-0 lg:h-screen lg:translate-x-0
        ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      > */}
      <aside
        className={`fixed z-40 flex h-full w-72 shrink-0 flex-col bg-ink px-4 py-6 transition-transform duration-300 ease-in-out lg:sticky lg:top-0 lg:h-screen lg:translate-x-0
  ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="mb-8 flex items-center justify-between px-2">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-lg font-bold text-white">
              A
            </div>
            <div>
              <p className="text-lg font-bold leading-none text-white">
                RID Tech
              </p>
              <p className="text-xs font-medium text-slate-400">
                Admin Console
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
