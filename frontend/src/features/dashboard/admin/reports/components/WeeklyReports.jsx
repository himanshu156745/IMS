import React from "react";
import {
  CalendarDays,
  User,
  CheckCircle2,
  Clock3,
  AlertTriangle,
  MessageSquare,
} from "lucide-react";

import { weeklyReports } from "../data/reportData";

const WeeklyReports = () => {
  return (
    <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800">
          Weekly Reports
        </h2>

        <p className="text-sm text-gray-500">
          Latest reports submitted by project team leaders.
        </p>
      </div>

      <div className="space-y-6">
        {weeklyReports.map((report) => (
          <div
            key={report.id}
            className="rounded-xl border border-gray-200 p-6 transition-all duration-300 hover:shadow-md"
          >
            {/* Top */}
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  {report.project}
                </h3>

                <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <CalendarDays size={16} />
                    {report.week}
                  </div>

                  <div className="flex items-center gap-1">
                    <User size={16} />
                    {report.submittedBy}
                  </div>

                  <span>{report.date}</span>
                </div>
              </div>

              {/* Progress */}
              <div className="w-full lg:w-72">
                <div className="mb-2 flex justify-between text-sm">
                  <span>Progress</span>
                  <span className="font-semibold">
                    {report.progress}%
                  </span>
                </div>

                <div className="h-3 rounded-full bg-gray-200">
                  <div
                    className="h-3 rounded-full bg-[#2F6E5F]"
                    style={{
                      width: `${report.progress}%`,
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Sections */}
            <div className="mt-6 grid gap-5 lg:grid-cols-2">
              {/* Completed */}
              <div className="rounded-lg bg-green-50 p-4">
                <div className="mb-3 flex items-center gap-2">
                  <CheckCircle2
                    size={18}
                    className="text-green-600"
                  />
                  <h4 className="font-semibold text-green-700">
                    Completed Work
                  </h4>
                </div>

                <ul className="space-y-2">
                  {report.completedWork.map((item, index) => (
                    <li
                      key={index}
                      className="text-sm text-gray-700"
                    >
                      • {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Current */}
              <div className="rounded-lg bg-blue-50 p-4">
                <div className="mb-3 flex items-center gap-2">
                  <Clock3
                    size={18}
                    className="text-blue-600"
                  />
                  <h4 className="font-semibold text-blue-700">
                    Current Work
                  </h4>
                </div>

                <ul className="space-y-2">
                  {report.currentWork.map((item, index) => (
                    <li
                      key={index}
                      className="text-sm text-gray-700"
                    >
                      • {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Upcoming */}
              <div className="rounded-lg bg-yellow-50 p-4">
                <div className="mb-3 flex items-center gap-2">
                  <Clock3
                    size={18}
                    className="text-yellow-600"
                  />
                  <h4 className="font-semibold text-yellow-700">
                    Upcoming Work
                  </h4>
                </div>

                <ul className="space-y-2">
                  {report.upcomingWork.map((item, index) => (
                    <li
                      key={index}
                      className="text-sm text-gray-700"
                    >
                      • {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Blockers */}
              <div className="rounded-lg bg-red-50 p-4">
                <div className="mb-3 flex items-center gap-2">
                  <AlertTriangle
                    size={18}
                    className="text-red-600"
                  />
                  <h4 className="font-semibold text-red-700">
                    Challenges
                  </h4>
                </div>

                {report.blockers.length > 0 ? (
                  <ul className="space-y-2">
                    {report.blockers.map((item, index) => (
                      <li
                        key={index}
                        className="text-sm text-gray-700"
                      >
                        • {item}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-gray-500">
                    No blockers reported.
                  </p>
                )}
              </div>
            </div>

            {/* Remarks */}
            <div className="mt-6 rounded-lg bg-gray-50 p-4">
              <div className="mb-2 flex items-center gap-2">
                <MessageSquare
                  size={18}
                  className="text-gray-700"
                />
                <h4 className="font-semibold">
                  Team Leader Remarks
                </h4>
              </div>

              <p className="text-sm leading-6 text-gray-600">
                {report.remarks}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WeeklyReports;