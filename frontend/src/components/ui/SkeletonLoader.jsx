function Shimmer({ className = "" }) {
  return <div className={`animate-pulse rounded-md bg-line/60 ${className}`} />;
}

export function StatCardSkeleton() {
  return (
    <div className="rounded-2xl border border-line bg-white p-5 space-y-3">
      <Shimmer className="w-9 h-9 rounded-xl" />
      <Shimmer className="w-16 h-7" />
      <Shimmer className="w-24 h-3" />
    </div>
  );
}

export function TableRowSkeleton() {
  return (
    <tr className="border-b border-line">
      {Array.from({ length: 8 }).map((_, i) => (
        <td key={i} className="px-4 py-4">
          <Shimmer className="h-4 w-full max-w-[120px]" />
        </td>
      ))}
    </tr>
  );
}

export function ExpandedDetailsSkeleton() {
  return (
    <div className="p-6 space-y-3">
      <Shimmer className="w-1/2 h-4" />
      <Shimmer className="w-full h-3" />
      <Shimmer className="w-3/4 h-3" />
      <div className="flex gap-2 pt-2">
        <Shimmer className="w-16 h-6 rounded-full" />
        <Shimmer className="w-20 h-6 rounded-full" />
        <Shimmer className="w-14 h-6 rounded-full" />
      </div>
    </div>
  );
}