import { Skeleton } from "@/components/ui/skeleton";

const MyProfileSkeleton = () => {
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Left Profile Card */}
        <div className="rounded-xl border bg-white p-6">
          <div className="flex flex-col items-center">
            <Skeleton className="h-24 w-24 rounded-full" />

            <Skeleton className="mt-4 h-5 w-40" />

            <Skeleton className="mt-3 h-4 w-28" />
          </div>

          <div className="mt-8 space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-4/5" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </div>

        {/* Right Side */}
        <div className="lg:col-span-2 space-y-6">

          {/* Technical Skills */}
          <div className="rounded-xl border bg-white p-6">
            <Skeleton className="h-5 w-36" />

            <div className="flex flex-wrap gap-3 mt-6">
              <Skeleton className="h-8 w-20 rounded-full" />
              <Skeleton className="h-8 w-24 rounded-full" />
              <Skeleton className="h-8 w-16 rounded-full" />
              <Skeleton className="h-8 w-28 rounded-full" />
            </div>
          </div>

          {/* Resume Completion */}
          <div className="rounded-xl border bg-white p-6">
            <Skeleton className="h-5 w-44" />

            <Skeleton className="mt-6 h-3 w-full rounded-full" />

            <div className="mt-6 space-y-3">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-4 w-4/5" />
            </div>
          </div>

          {/* Academic Information */}
          <div className="rounded-xl border bg-white p-6">
            <Skeleton className="h-5 w-44" />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-6">
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default MyProfileSkeleton;