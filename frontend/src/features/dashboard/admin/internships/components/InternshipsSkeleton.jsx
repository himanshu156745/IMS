import { StatCardSkeleton, TableRowSkeleton } from "../../../../../components/ui/SkeletonLoader";

export default function InternshipsSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <div className="h-8 w-64 rounded bg-gray-200" />
          <div className="h-4 w-96 rounded bg-gray-200" />
        </div>

        <div className="flex gap-3">
          <div className="h-10 w-32 rounded-xl bg-gray-200" />
          <div className="h-10 w-32 rounded-xl bg-gray-200" />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <StatCardSkeleton key={i} />
        ))}
      </div>

      {/* Filters */}
      <div className="rounded-2xl border bg-white p-5 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-10 rounded bg-gray-200" />
          ))}
        </div>

        <div className="flex justify-end gap-3">
          <div className="h-10 w-24 rounded bg-gray-200" />
          <div className="h-10 w-24 rounded bg-gray-200" />
        </div>
      </div>

      {/* Table */}
      <div className="rounded-2xl border bg-white overflow-hidden">
        <table className="w-full">
          <tbody>
            {Array.from({ length: 8 }).map((_, i) => (
              <TableRowSkeleton key={i} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}