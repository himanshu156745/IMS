import { Trophy, Activity, User } from "lucide-react";

const TeamContribution = ({ students = [], stats = {}, reports = [] }) => {
  const members = students.map((s, idx) => {
    const p = s.studentProfile || s.profile || {};
    const name = p.fullName || s.email?.split("@")[0] || "Student";
    return {
      id: s._id || idx,
      member: name,
      role: p.branch || "Intern",
      project: p.university || "IMS Project",
      module: p.skills?.[0] || "Full Stack",
      assignedTasks: 10,
      completedTasks: s.isActive ? 8 : 2,
      progress: s.isActive ? 80 : 20,
    };
  });

  const topPerformer =
    members.length > 0
      ? members.reduce(
          (best, member) => (member.progress > best.progress ? member : best),
          members[0]
        )
      : {
          member: "No registered interns",
          role: "N/A",
          project: "N/A",
          progress: 0,
          completedTasks: 0,
          assignedTasks: 0,
          module: "N/A",
        };

  const activities = reports.slice(0, 4).map((r, idx) => ({
    id: r._id || idx,
    activity: `${
      r.studentProfile?.fullName || r.student?.email?.split("@")[0] || "Intern"
    } logged report: ${r.taskDescription ? r.taskDescription.slice(0, 35) + "..." : "Daily progress"}`,
    time: r.createdAt
      ? new Date(r.createdAt).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        })
      : "Recent",
  }));

  return (
    <section className="grid gap-6 lg:grid-cols-3">
      {/* ================= LEFT : TEAM CONTRIBUTION ================= */}

      <div className="lg:col-span-2 rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="border-b border-gray-200 p-5">
          <h2 className="text-xl font-semibold">Team Contribution</h2>

          <p className="text-sm text-gray-500">
            Individual performance of interns.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr className="text-left text-sm font-semibold text-gray-600">
                <th className="px-6 py-4">Member</th>
                <th className="px-6 py-4">Role</th>
                <th className="px-6 py-4">Module</th>
                <th className="px-6 py-4">Tasks</th>
                <th className="px-6 py-4">Progress</th>
              </tr>
            </thead>

            <tbody>
              {members.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-sm text-gray-500">
                    No intern contribution data found.
                  </td>
                </tr>
              ) : (
                members.map((member) => (
                  <tr
                    key={member.id}
                    className="border-t transition hover:bg-gray-50"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                          <User size={18} className="text-[#2F6E5F]" />
                        </div>

                        <div>
                          <p className="font-semibold">{member.member}</p>
                          <p className="text-xs text-gray-500">
                            {member.project}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4">{member.role}</td>

                    <td className="px-6 py-4">{member.module}</td>

                    <td className="px-6 py-4">
                      {member.completedTasks}/{member.assignedTasks}
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-2 w-28 rounded-full bg-gray-200">
                          <div
                            className="h-2 rounded-full bg-[#2F6E5F]"
                            style={{
                              width: `${member.progress}%`,
                            }}
                          />
                        </div>

                        <span className="font-semibold">
                          {member.progress}%
                        </span>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ================= RIGHT ================= */}

      <div className="space-y-6">
        {/* ================= TOP PERFORMER ================= */}

        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="mb-5 flex items-center gap-3">
            <Trophy size={26} className="text-yellow-500" />

            <h3 className="text-lg font-semibold">Top Performer</h3>
          </div>

          <div className="text-center">
            <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
              <User size={34} className="text-[#2F6E5F]" />
            </div>

            <h4 className="text-xl font-semibold">
              {topPerformer.member}
            </h4>

            <p className="text-gray-500">
              {topPerformer.role}
            </p>

            <p className="mt-1 text-sm text-gray-400">
              {topPerformer.project}
            </p>

            <div className="mt-5 rounded-lg bg-green-50 p-4">
              <p className="text-4xl font-bold text-[#2F6E5F]">
                {topPerformer.progress}%
              </p>

              <p className="text-sm text-gray-500">
                Overall Performance
              </p>

              <div className="mt-5 grid grid-cols-2 gap-4 text-center">
                <div>
                  <p className="text-lg font-semibold">
                    {topPerformer.completedTasks}/
                    {topPerformer.assignedTasks}
                  </p>

                  <p className="text-xs text-gray-500">
                    Tasks Completed
                  </p>
                </div>

                <div>
                  <p className="text-lg font-semibold">
                    {topPerformer.module}
                  </p>

                  <p className="text-xs text-gray-500">
                    Current Module
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ================= TEAM SUMMARY ================= */}

        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <h3 className="mb-5 text-lg font-semibold">
            Team Summary
          </h3>

          <div className="space-y-4">
            <div className="flex justify-between">
              <span>Total Members</span>
              <span className="font-semibold">
                {stats.totalStudents ?? members.length ?? 0}
              </span>
            </div>

            <div className="flex justify-between">
              <span>Completed Tasks</span>
              <span className="font-semibold text-green-600">
                {stats.completedInternships ?? 0}
              </span>
            </div>

            <div className="flex justify-between">
              <span>Pending Tasks</span>
              <span className="font-semibold text-orange-600">
                {stats.pendingApplications ?? 0}
              </span>
            </div>

            <div className="flex justify-between">
              <span>Completion Rate</span>
              <span className="font-semibold">
                {stats.placementRate ? `${stats.placementRate}%` : "0%"}
              </span>
            </div>
          </div>
        </div>

        {/* ================= RECENT ACTIVITY ================= */}

        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="mb-5 flex items-center gap-2">
            <Activity
              size={22}
              className="text-[#2F6E5F]"
            />

            <h3 className="text-lg font-semibold">
              Recent Activities
            </h3>
          </div>

          <div className="space-y-4">
            {activities.length === 0 ? (
              <p className="text-xs text-gray-500">No recent activities recorded.</p>
            ) : (
              activities.map((activity) => (
                <div
                  key={activity.id}
                  className="flex gap-3"
                >
                  <div className="mt-2 h-3 w-3 rounded-full bg-[#2F6E5F]" />

                  <div>
                    <p className="text-sm">
                      {activity.activity}
                    </p>

                    <p className="text-xs text-gray-500">
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamContribution;
