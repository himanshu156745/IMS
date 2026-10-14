import { useState, useRef, useEffect } from "react";
import { MdOutlineNotificationsNone } from "react-icons/md";
import axiosInstance from "../../../../utils/axiosInstance";
import { unwrapList } from "../../../../utils/api";

export default function NotificationBell() {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const ref = useRef(null);

  useEffect(() => {
    let isMounted = true;
    axiosInstance
      .get('/notifications?limit=5')
      .then((res) => {
        if (isMounted) {
          setNotifications(unwrapList(res));
        }
      })
      .catch(() => {
        if (isMounted) {
          setNotifications([]);
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleToggle = () => {
    setOpen((prev) => {
      const next = !prev;
      if (next) {
        axiosInstance.patch('/notifications/read-all').catch(() => {});
        setNotifications((prevList) => prevList.map((n) => ({ ...n, read: true })));
      }
      return next;
    });
  };

  const hasUnread = notifications.some((n) => !n.read);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={handleToggle}
        className="relative rounded-xl p-2.5 text-slate-500 transition-colors duration-200 hover:bg-slate-100"
      >
        <MdOutlineNotificationsNone size={22} />
        {hasUnread && (
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
        )}
      </button>

      {open && (
        <div className="absolute right-0 z-50 mt-2 w-80 animate-fadeIn rounded-2xl border border-slate-100 bg-white p-2 shadow-cardHover">
          <div className="flex items-center justify-between px-3 py-2">
            <p className="text-sm font-semibold text-slate-700">Notifications</p>
            <span className="badge bg-brand-50 text-brand-600">{notifications.length} new</span>
          </div>
          <div className="max-h-72 overflow-y-auto">
            {notifications.length === 0 ? (
              <p className="p-3 text-center text-xs text-slate-400">No notifications</p>
            ) : (
              notifications.map((n) => (
                <div
                  key={n._id || n.id}
                  className="cursor-pointer rounded-xl px-3 py-2.5 transition-colors duration-150 hover:bg-slate-50"
                >
                  <p className="text-sm text-slate-700">{n.message || n.text || n.title}</p>
                  <p className="mt-0.5 text-xs text-slate-400">
                    {n.createdAt ? new Date(n.createdAt).toLocaleDateString() : (n.time || "")}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
