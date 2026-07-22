import { Bell, Search } from "lucide-react";

export default function Topbar() {
  return (
    <header className="sticky top-0 z-10 bg-paper/95 backdrop-blur border-b border-slate/10 px-6 md:px-8 py-4 flex items-center justify-end">
      <div className="flex items-center gap-4">
        <div className="hidden sm:flex items-center gap-2 bg-white rounded-md px-3 py-2 shadow-sm w-64">
          <Search className="w-4 h-4 text-slate" strokeWidth={1.75} />
          <input
            type="text"
            placeholder="Search applicants, interns…"
            className="bg-transparent text-sm font-body outline-none w-full placeholder:text-slate/60"
          />
        </div>

        <button
          type="button"
          aria-label="Notifications"
          className="relative rounded-md p-2 hover:bg-white transition-colors"
        >
          <Bell className="w-5 h-5 text-ink" strokeWidth={1.75} />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-coral" />
        </button>

        <div className="w-9 h-9 rounded-full bg-signal text-white font-body text-sm flex items-center justify-center">
          A
        </div>
      </div>
    </header>
  );
}