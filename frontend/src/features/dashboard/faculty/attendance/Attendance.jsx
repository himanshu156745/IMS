import { useState, useMemo } from "react";
import { MdOutlineCalendarMonth, MdOutlineCheckCircle, MdOutlineCancel } from "react-icons/md";
import DashboardCard from "../components/DashboardCard";
import AttendanceTable from "../components/AttendanceTable";
import { TrendChart } from "../components/PerformanceChart";
import { attendanceSummary, monthlyAttendanceTrend, todaysAttendance, monthlyAttendanceTable } from "../data/attendance.service";
import { students } from "../data/students.service";

const months = ["February", "March", "April", "May", "June", "July"];

export default function Attendance() {
  const [month, setMonth] = useState("July");
  const [studentFilter, setStudentFilter] = useState("All");

  const filteredToday = useMemo(() => {
    if (studentFilter === "All") return todaysAttendance;
    return todaysAttendance.filter((a) => a.id === studentFilter);
  }, [studentFilter]);

  return (
    <div className="animate-fadeIn space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <DashboardCard icon={MdOutlineCalendarMonth} label="Overall Attendance" value={`${attendanceSummary.overallPercentage}%`} tone="brand" />
        <DashboardCard icon={MdOutlineCheckCircle} label="Present Today" value={attendanceSummary.presentToday} tone="green" />
        <DashboardCard icon={MdOutlineCancel} label="Absent Today" value={attendanceSummary.absentToday} tone="amber" />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="card p-5 lg:col-span-2">
          <div className="mb-2 flex items-center justify-between">
            <h3 className="font-bold text-slate-800">Attendance Trend</h3>
          </div>
          <TrendChart data={monthlyAttendanceTrend} dataKey="percentage" color="#16A34A" />
        </div>

        <div className="card p-5">
          <h3 className="mb-4 font-bold text-slate-800">Today's Attendance</h3>
          <select
            value={studentFilter}
            onChange={(e) => setStudentFilter(e.target.value)}
            className="input-field mb-4 w-full py-2"
          >
            <option value="All">All Students</option>
            {students.map((s) => (
              <option key={s.id} value={s.id}>{s.name}</option>
            ))}
          </select>
          <div className="max-h-64 space-y-2 overflow-y-auto">
            {filteredToday.map((a) => (
              <div key={a.id} className="flex items-center justify-between rounded-xl border border-slate-100 p-2.5">
                <div className="flex items-center gap-2.5">
                  <img src={a.photo} alt={a.name} className="h-8 w-8 rounded-full object-cover" />
                  <div>
                    <p className="text-sm font-semibold text-slate-700">{a.name}</p>
                    <p className="text-xs text-slate-400">{a.time}</p>
                  </div>
                </div>
                <span className={`badge ${a.status === "Present" ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-500"}`}>
                  {a.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="card p-5">
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h3 className="font-bold text-slate-800">Monthly Attendance</h3>
          <select
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            className="input-field w-auto py-2"
          >
            {months.map((m) => (
              <option key={m} value={m}>{m} 2026</option>
            ))}
          </select>
        </div>
        <AttendanceTable rows={monthlyAttendanceTable} />
      </div>
    </div>
  );
}