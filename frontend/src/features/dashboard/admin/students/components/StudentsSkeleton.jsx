import {
  StatCardSkeleton,
  TableRowSkeleton,
} from "../../../../../components/ui/SkeletonLoader";

function Shimmer({ className = "" }) {
  return (
    <div className={`animate-pulse rounded-md bg-line/60 ${className}`} />
  );
}

export default function StudentsSkeleton() {
  return (
    <div className="bg-surface-alt/40 -m-6 min-h-full space-y-6 p-6 md:-m-8 md:p-8">
      {/* Header */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="space-y-3">
          <Shimmer className="h-8 w-64" />
          <Shimmer className="h-4 w-96" />
        </div>

        <div className="flex gap-3">
          <Shimmer className="h-10 w-28 rounded-xl" />
          <Shimmer className="h-10 w-36 rounded-xl" />
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <StatCardSkeleton />
        <StatCardSkeleton />
        <StatCardSkeleton />
        <StatCardSkeleton />
      </div>

      {/* Filters */}
      <div className="rounded-2xl border border-line bg-white p-5 shadow-sm">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Shimmer className="h-10 w-full" />
          <Shimmer className="h-10 w-full" />
          <Shimmer className="h-10 w-full" />
          <Shimmer className="h-10 w-full" />
        </div>

        <div className="mt-4 flex justify-end gap-3">
          <Shimmer className="h-10 w-24 rounded-lg" />
          <Shimmer className="h-10 w-28 rounded-lg" />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-2xl border border-line bg-white shadow-sm">
        <table className="w-full">
          <tbody>
            {Array.from({ length: 8 }).map((_, index) => (
              <TableRowSkeleton key={index} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}