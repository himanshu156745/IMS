import {
  StatCardSkeleton,
  TableRowSkeleton,
} from "../../../../../components/ui/SkeletonLoader";

function Shimmer({ className = "" }) {
  return (
    <div className={`animate-pulse rounded-xl bg-line/60 ${className}`} />
  );
}

export default function DashboardSkeleton() {
  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="space-y-3">
        <Shimmer className="h-8 w-56" />
        <Shimmer className="h-4 w-80" />
      </div>

      {/* Welcome Banner */}
      <div className="rounded-2xl border border-line bg-white p-6">
        <Shimmer className="h-8 w-64 mb-3" />
        <Shimmer className="h-4 w-96" />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <StatCardSkeleton key={i} />
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Shimmer className="h-80 w-full" />
        <Shimmer className="h-80 w-full" />
        <Shimmer className="h-80 w-full" />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Shimmer className="h-80 w-full" />
        <Shimmer className="h-80 w-full" />
      </div>

      {/* Table */}
      <div className="rounded-2xl border border-line bg-white overflow-hidden">
        <table className="w-full">
          <tbody>
            {Array.from({ length: 5 }).map((_, i) => (
              <TableRowSkeleton key={i} />
            ))}
          </tbody>
        </table>
      </div>

      {/* Bottom Cards */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Shimmer className="h-72 w-full" />
        <Shimmer className="h-72 w-full" />
      </div>

      {/* Faculty */}
      <Shimmer className="h-80 w-full" />
    </div>
  );
}