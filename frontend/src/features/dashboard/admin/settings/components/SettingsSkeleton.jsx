function Shimmer({ className = "" }) {
  return <div className={`animate-pulse rounded-md bg-line/60 ${className}`} />;
}

export default function SettingsSkeleton() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <Shimmer className="h-8 w-56" />
        <Shimmer className="h-4 w-80" />
      </div>

      <div className="grid gap-6 lg:grid-cols-[300px_1fr]">
        {/* Sidebar */}
        <div className="rounded-2xl border border-line bg-white p-5 space-y-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <Shimmer key={i} className="h-10 w-full" />
          ))}
        </div>

        {/* Content */}
        <div className="rounded-2xl border border-line bg-white p-6 space-y-5">
          <Shimmer className="h-8 w-48" />

          <Shimmer className="h-12 w-full" />
          <Shimmer className="h-12 w-full" />
          <Shimmer className="h-12 w-full" />
          <Shimmer className="h-32 w-full" />

          <div className="flex justify-end gap-3">
            <Shimmer className="h-10 w-24" />
            <Shimmer className="h-10 w-32" />
          </div>
        </div>
      </div>
    </div>
  );
}