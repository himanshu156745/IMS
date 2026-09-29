import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination({ page, totalPages, onPageChange }) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex items-center justify-center gap-1.5 py-4">
      <button
        type="button"
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
        className="flex items-center gap-1 rounded-xl px-2.5 py-1.5 text-sm text-slate-500 font-body hover:bg-surface-alt disabled:opacity-40 disabled:hover:bg-transparent transition-colors"
      >
        <ChevronLeft className="w-4 h-4" /> Previous
      </button>

      {pages.map((p) => (
        <button
          key={p}
          type="button"
          onClick={() => onPageChange(p)}
          className={`w-8 h-8 rounded-xl text-sm font-body transition-colors ${
            p === page
              ? "bg-primary text-white font-medium"
              : "text-slate-500 hover:bg-surface-alt"
          }`}
        >
          {p}
        </button>
      ))}

      <button
        type="button"
        disabled={page === totalPages}
        onClick={() => onPageChange(page + 1)}
        className="flex items-center gap-1 rounded-xl px-2.5 py-1.5 text-sm text-slate-500 font-body hover:bg-surface-alt disabled:opacity-40 disabled:hover:bg-transparent transition-colors"
      >
        Next <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
}