import { Skeleton } from "@/components/ui/Skeleton";

const StudentDashboardSkeleton = () => {
  return (
    <div className="min-h-screen bg-[#F8F9FC]">

      {/* Main Content */}
      <div className="lg:ml-72">

        {/* Top Navbar Skeleton */}
        <div className="h-16 bg-white border-b flex items-center justify-between px-4 sm:px-6 lg:px-8">
          <Skeleton className="h-8 w-8 rounded-lg" />

          <div className="flex items-center gap-4">
            <Skeleton className="h-8 w-8 rounded-full" />
            <Skeleton className="h-8 w-8 rounded-full" />
            <Skeleton className="h-8 w-8 rounded-full" />
          </div>
        </div>

        <main className="p-4 sm:p-6 lg:p-8">

          {/* Welcome Section */}
          <div className="rounded-xl bg-white border p-5 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">

              <div className="space-y-3">
                <Skeleton className="h-7 w-64" />
                <Skeleton className="h-4 w-80 max-w-full" />
              </div>

              <div className="flex flex-wrap gap-3">
                <Skeleton className="h-10 w-36 rounded-lg" />
                <Skeleton className="h-10 w-36 rounded-lg" />
              </div>

            </div>
          </div>

          {/* Quick Stats / Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mt-4 sm:mt-6">

            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="rounded-xl bg-white border p-5"
              >
                <div className="flex items-center justify-between">
                  <Skeleton className="h-10 w-10 rounded-lg" />
                  <Skeleton className="h-4 w-16" />
                </div>

                <Skeleton className="h-7 w-20 mt-5" />
                <Skeleton className="h-4 w-28 mt-2" />
              </div>
            ))}

          </div>

          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mt-4 sm:mt-6">

            {/* Left Column */}
            <div className="lg:col-span-2 space-y-4 sm:space-y-6">

              {/* Recent Internship */}
              <div className="rounded-xl bg-white border p-5 sm:p-6">
                <div className="flex items-center justify-between">
                  <Skeleton className="h-5 w-40" />
                  <Skeleton className="h-8 w-24 rounded-lg" />
                </div>

                <div className="flex items-center gap-4 mt-6">
                  <Skeleton className="h-14 w-14 rounded-lg" />

                  <div className="space-y-2 flex-1">
                    <Skeleton className="h-5 w-48" />
                    <Skeleton className="h-4 w-32" />
                  </div>
                </div>

                <Skeleton className="h-3 w-full rounded-full mt-6" />

                <div className="flex justify-between mt-3">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-24" />
                </div>
              </div>

              {/* Application Timeline */}
              <div className="rounded-xl bg-white border p-5 sm:p-6">
                <Skeleton className="h-5 w-44" />

                <div className="space-y-6 mt-7">
                  {Array.from({ length: 4 }).map((_, index) => (
                    <div key={index} className="flex gap-4">
                      <Skeleton className="h-9 w-9 rounded-full shrink-0" />

                      <div className="space-y-2 flex-1">
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-3 w-48 max-w-full" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Daily Reports */}
              <div className="rounded-xl bg-white border p-5 sm:p-6">
                <div className="flex items-center justify-between">
                  <Skeleton className="h-5 w-32" />
                  <Skeleton className="h-8 w-24 rounded-lg" />
                </div>

                <div className="space-y-4 mt-6">
                  {Array.from({ length: 3 }).map((_, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-4"
                    >
                      <Skeleton className="h-10 w-10 rounded-lg" />

                      <div className="space-y-2 flex-1">
                        <Skeleton className="h-4 w-40" />
                        <Skeleton className="h-3 w-56 max-w-full" />
                      </div>

                      <Skeleton className="h-6 w-20 rounded-full" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Recommended Internships / Notifications */}
              <div className="rounded-xl bg-white border p-5 sm:p-6">
                <Skeleton className="h-5 w-52" />

                <div className="space-y-4 mt-6">
                  {Array.from({ length: 3 }).map((_, index) => (
                    <div
                      key={index}
                      className="flex gap-4"
                    >
                      <Skeleton className="h-12 w-12 rounded-lg" />

                      <div className="flex-1 space-y-2">
                        <Skeleton className="h-4 w-44" />
                        <Skeleton className="h-3 w-64 max-w-full" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Right Column */}
            <div className="space-y-4 sm:space-y-6">

              {/* Profile Summary */}
              <div className="rounded-xl bg-white border p-5 sm:p-6">
                <div className="flex items-center gap-4">
                  <Skeleton className="h-14 w-14 rounded-full" />

                  <div className="space-y-2">
                    <Skeleton className="h-5 w-32" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                </div>

                <Skeleton className="h-3 w-full rounded-full mt-6" />

                <Skeleton className="h-4 w-28 mt-3" />
              </div>

              {/* Attendance */}
              <div className="rounded-xl bg-white border p-5 sm:p-6">
                <Skeleton className="h-5 w-32" />

                <div className="flex items-center justify-center mt-6">
                  <Skeleton className="h-32 w-32 rounded-full" />
                </div>

                <div className="flex justify-between mt-6">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-4 w-20" />
                </div>
              </div>

              {/* Upcoming Events */}
              <div className="rounded-xl bg-white border p-5 sm:p-6">
                <Skeleton className="h-5 w-40" />

                <div className="space-y-5 mt-6">
                  {Array.from({ length: 3 }).map((_, index) => (
                    <div key={index} className="flex gap-3">
                      <Skeleton className="h-10 w-10 rounded-lg" />

                      <div className="space-y-2 flex-1">
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-3 w-24" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>

        </main>
      </div>
    </div>
  );
};

export default StudentDashboardSkeleton;