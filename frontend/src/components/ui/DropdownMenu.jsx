import { useState, useRef, useEffect } from "react";
import { MoreVertical } from "lucide-react";

/**
 * items: [{ label, Icon, onClick, danger?: boolean }]
 */
export default function DropdownMenu({ items }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label="Open actions menu"
        className="rounded-md p-1.5 text-slate-500 hover:bg-surface-alt hover:text-heading transition-colors"
      >
        <MoreVertical className="w-4 h-4" strokeWidth={1.75} />
      </button>

      {open && (
        <div
          className="absolute right-0 z-30 mt-1 w-48 origin-top-right rounded-2xl border border-line bg-white shadow-lg py-1.5
                     animate-[fadeIn_0.12s_ease-out]"
        >
          {items.map((item) => (
            <button
              key={item.label}
              type="button"
              onClick={() => {
                item.onClick?.();
                setOpen(false);
              }}
              className={`flex w-full items-center gap-2.5 px-3.5 py-2 text-sm text-left transition-colors ${
                item.danger
                  ? "text-danger hover:bg-danger-bg"
                  : "text-heading hover:bg-surface-alt"
              }`}
            >
              <item.Icon className="w-4 h-4" strokeWidth={1.75} />
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}