// import { Bell, Search } from "lucide-react";

// export default function Topbar() {
//   return (
//     <header className="sticky top-0 z-10 bg-paper/95 backdrop-blur border-b border-slate/10 px-6 md:px-8 py-4 flex items-center justify-end">
//       <div className="flex items-center gap-4">
//         <div className="hidden sm:flex items-center gap-2 bg-white rounded-md px-3 py-2 shadow-sm w-64">
//           <Search className="w-4 h-4 text-slate" strokeWidth={1.75} />
//           <input
//             type="text"
//             placeholder="Search applicants, interns…"
//             className="bg-transparent text-sm font-body outline-none w-full placeholder:text-slate/60"
//           />
//         </div>

//         <button
//           type="button"
//           aria-label="Notifications"
//           className="relative rounded-md p-2 hover:bg-white transition-colors"
//         >
//           <Bell className="w-5 h-5 text-ink" strokeWidth={1.75} />
//           <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-coral" />
//         </button>

//         <div className="w-9 h-9 rounded-full bg-signal text-white font-body text-sm flex items-center justify-center">
//           A
//         </div>
//       </div>
//     </header>
//   );
// }


import { Menu, Search, Settings, Bell } from "lucide-react";

export default function Topbar({ onMenuClick, title = "Admin Console" }) {
  return (
    <header className="sticky top-0 z-20 flex items-center justify-between gap-4 border-b border-slate-100 bg-white/80 px-4 py-4 backdrop-blur-md sm:px-6">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="rounded-xl p-2 text-slate-500 hover:bg-slate-100 lg:hidden"
        >
          <Menu size={22} />
        </button>
        <div>
          <h1 className="text-lg font-bold text-slate-800 sm:text-xl">{title}</h1>
          <p className="hidden text-xs text-slate-400 sm:block">Manage students, faculty and internships</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden md:flex items-center gap-2 rounded-xl border border-line bg-white px-3.5 py-2 w-64">
          <Search className="w-4 h-4 text-slate-400 shrink-0" strokeWidth={1.75} />
          <input
            type="text"
            placeholder="Search applicants, interns..."
            className="bg-transparent text-sm font-body text-heading outline-none w-full placeholder:text-slate-400"
          />
        </div>

        <button className="rounded-xl p-2.5 text-slate-500 transition-colors duration-200 hover:bg-slate-100">
          <Settings size={22} strokeWidth={1.75} />
        </button>

        <button className="relative rounded-xl p-2.5 text-slate-500 transition-colors duration-200 hover:bg-slate-100">
          <Bell size={22} strokeWidth={1.75} />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-danger ring-2 ring-white" />
        </button>

        <div className="flex items-center gap-2.5 border-l border-slate-100 pl-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-sm font-semibold text-white ring-2 ring-primary-bg">
            A
          </div>
          <div className="hidden leading-tight sm:block">
            <p className="text-sm font-semibold text-slate-700">Admin</p>
            <p className="text-xs text-slate-400">Super Admin</p>
          </div>
        </div>
      </div>
    </header>
  );
}