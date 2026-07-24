import { StatCardSkeleton } from "../../../../../components/ui/SkeletonLoader";

function Shimmer({ className = "" }) {
  return <div className={`animate-pulse rounded-md bg-line/60 ${className}`} />;
}

export default function ReportsSkeleton() {
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

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Shimmer className="h-80 rounded-2xl" />
        <Shimmer className="h-80 rounded-2xl" />
      </div>
    </div>
  );
}