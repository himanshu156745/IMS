import { FolderSearch } from "lucide-react";

export default function EmptyState({ 
  title = "No Data Found", 
  description = "No records are available at the moment.", 
  actionLabel = "Create New", 
  onCreateClick, 
  icon: Icon = FolderSearch 
}) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 px-6">
      <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center mb-4">
        <Icon className="w-7 h-7 text-blue-600" strokeWidth={1.5} />
      </div>
      <h3 className="font-display text-lg text-gray-900">{title}</h3>
      <p className="text-sm text-gray-500 font-body mt-1 max-w-sm">
        {description}
      </p>
      {onCreateClick && (
        <button
          type="button"
          onClick={onCreateClick}
          className="mt-5 rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 text-white text-sm font-medium font-body px-4 py-2.5 hover:shadow-lg transition-all"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}