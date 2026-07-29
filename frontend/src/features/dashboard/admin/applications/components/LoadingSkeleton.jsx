import { StatCardSkeleton, TableRowSkeleton } from "../../../../../components/ui/SkeletonLoader";

export default function LoadingSkeleton() {
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-4">
        {Array.from({ length: 7 }).map((_, i) => (
          <StatCardSkeleton key={i} />
        ))}
      </div>
      <div className="overflow-x-auto rounded-md bg-white shadow-sm">
        <table className="w-full text-sm font-body">
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