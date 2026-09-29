import {
  StatCardSkeleton,
  TableRowSkeleton,
} from "../../../../../components/ui/SkeletonLoader";

function Shimmer({ className = "" }) {
  return <div className={`animate-pulse rounded-md bg-line/60 ${className}`} />;
}

export default function CompaniesSkeleton() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <Shimmer className="h-8 w-64" />
        <Shimmer className="h-4 w-96" />
      </div>

      {/* Stats */}
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <StatCardSkeleton />
        <StatCardSkeleton />
        <StatCardSkeleton />
        <StatCardSkeleton />
      </div>

      {/* Filters */}
      <div className="rounded-2xl border border-line bg-white p-5 space-y-4">
        <Shimmer className="h-10 w-full" />
      </div>

      {/* Table */}
      <div className="rounded-2xl border border-line bg-white overflow-hidden">
        <table className="w-full">
          <tbody>
            {Array.from({ length: 6 }).map((_, i) => (
              <TableRowSkeleton key={i} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
