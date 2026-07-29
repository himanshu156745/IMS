import { Inbox } from "lucide-react";

export default function EmptyApplications({ onResetFilters }) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 px-6 bg-white rounded-md shadow-sm">
      <div className="w-16 h-16 rounded-2xl bg-primary-bg flex items-center justify-center mb-4">
        <Inbox className="w-7 h-7 text-primary" strokeWidth={1.5} />
      </div>
      <h3 className="font-display text-lg text-heading">No Applications Found</h3>
      <p className="text-sm text-slate-500 font-body mt-1 max-w-sm">
        No applications match your current search or filters. Try adjusting them.
      </p>
      {onResetFilters && (
        <button
          type="button"
          onClick={onResetFilters}
          className="mt-5 rounded-xl bg-primary text-white text-sm font-medium font-body px-4 py-2.5 hover:bg-primary/90 transition-colors"
        >
          Reset Filters
        </button>
      )}
    </div>
  );
}