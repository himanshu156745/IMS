import { useState, useRef, useEffect } from "react";
import { MdOutlineNotificationsNone } from "react-icons/md";

const notifications = [
  { id: 1, text: "Ankit Verma submitted the mid-term report.", time: "10m ago" },
  { id: 2, text: "3 students marked absent today in CSE batch.", time: "1h ago" },
  { id: 3, text: "Sneha Kulkarni requested a deadline extension.", time: "3h ago" },
  { id: 4, text: "Monthly performance report is ready to review.", time: "1d ago" },
];

export default function NotificationBell() {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="relative rounded-xl p-2.5 text-slate-500 transition-colors duration-200 hover:bg-slate-100"
      >
        <MdOutlineNotificationsNone size={22} />
        <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
      </button>

      {open && (
        <div className="absolute right-0 z-50 mt-2 w-80 animate-fadeIn rounded-2xl border border-slate-100 bg-white p-2 shadow-cardHover">
          <div className="flex items-center justify-between px-3 py-2">
            <p className="text-sm font-semibold text-slate-700">Notifications</p>
            <span className="badge bg-brand-50 text-brand-600">{notifications.length} new</span>
          </div>
          <div className="max-h-72 overflow-y-auto">
            {notifications.map((n) => (
              <div
                key={n.id}
                className="cursor-pointer rounded-xl px-3 py-2.5 transition-colors duration-150 hover:bg-slate-50"
              >
                <p className="text-sm text-slate-700">{n.text}</p>
                <p className="mt-0.5 text-xs text-slate-400">{n.time}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}