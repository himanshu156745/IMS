import { MdMenu, MdOutlineSettings } from "react-icons/md";
import SearchBar from "../components/SearchBar";
import NotificationBell from "../components/NotificationBell";

export default function Topbar({ onMenuClick, title = "Dashboard" }) {
  return (
    <header className="sticky top-0 z-20 flex items-center justify-between gap-4 border-b border-slate-100 bg-white/80 px-4 py-4 backdrop-blur-md sm:px-6">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="rounded-xl p-2 text-slate-500 hover:bg-slate-100 lg:hidden"
        >
          <MdMenu size={22} />
        </button>
        <div>
          <h1 className="text-lg font-bold text-slate-800 sm:text-xl">{title}</h1>
          <p className="hidden text-xs text-slate-400 sm:block">Welcome back, let's check today's progress</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <SearchBar
          value=""
          onChange={() => {}}
          placeholder="Search students, reports..."
          className="hidden w-64 md:block"
        />

        <button className="rounded-xl p-2.5 text-slate-500 transition-colors duration-200 hover:bg-slate-100">
          <MdOutlineSettings size={22} />
        </button>

        <NotificationBell />

        <div className="flex items-center gap-2.5 border-l border-slate-100 pl-3">
          <img
            src="https://i.pravatar.cc/150?img=68"
            alt="Faculty profile"
            className="h-9 w-9 rounded-full object-cover ring-2 ring-brand-50"
          />
          <div className="hidden leading-tight sm:block">
            <p className="text-sm font-semibold text-slate-700">Dr. Meenal Kapoor</p>
            <p className="text-xs text-slate-400">Faculty Mentor</p>
          </div>
        </div>
      </div>
    </header>
  );
}