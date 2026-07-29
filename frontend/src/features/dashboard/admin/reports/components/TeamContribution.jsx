import { Trophy, Activity, User } from "lucide-react";
import { teamContribution, recentActivities } from "../data/reportData";

// Automatically select the member with the highest progress
const topPerformer = teamContribution.reduce((best, member) =>
  member.progress > best.progress ? member : best
);

const TeamContribution = () => {
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
              {teamContribution.map((member) => (
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
              ))}
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
              <span className="font-semibold">46</span>
            </div>

            <div className="flex justify-between">
              <span>Completed Tasks</span>
              <span className="font-semibold text-green-600">
                162
              </span>
            </div>

            <div className="flex justify-between">
              <span>Pending Tasks</span>
              <span className="font-semibold text-orange-600">
                28
              </span>
            </div>

            <div className="flex justify-between">
              <span>Completion Rate</span>
              <span className="font-semibold">
                91%
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
            {recentActivities.map((activity) => (
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
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamContribution;