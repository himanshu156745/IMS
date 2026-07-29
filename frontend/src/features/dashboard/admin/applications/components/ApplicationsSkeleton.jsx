import {
  StatCardSkeleton,
  TableRowSkeleton,
} from "../../../../../components/ui/SkeletonLoader";

export default function ApplicationsSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <div className="h-8 w-64 rounded bg-gray-200" />
          <div className="h-4 w-96 rounded bg-gray-200" />
        </div>

        <div className="flex gap-3">
          <div className="h-10 w-36 rounded-xl bg-gray-200" />
          <div className="h-10 w-40 rounded-xl bg-gray-200" />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <StatCardSkeleton key={i} />
        ))}
      </div>

      {/* Notification */}
      <div className="rounded-2xl border bg-white p-5">
        <div className="h-5 w-52 bg-gray-200 rounded mb-4" />
        <div className="space-y-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-4 rounded bg-gray-200" />
          ))}
        </div>
      </div>

      {/* Filters */}
      <div className="rounded-2xl border bg-white p-5">
        <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-6 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-10 rounded bg-gray-200" />
          ))}
        </div>
      </div>

      {/* Bulk Action */}
      <div className="rounded-xl bg-gray-200 h-12" />

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

      {/* Analytics */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
        <div className="xl:col-span-2 h-80 rounded-2xl bg-gray-200" />
        <div className="h-80 rounded-2xl bg-gray-200" />
      </div>
    </div>
  );
}