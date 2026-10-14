import { useState, useMemo, useEffect, useCallback } from "react";
import { MdOutlineCalendarMonth, MdOutlineCheckCircle, MdOutlineCancel } from "react-icons/md";
import DashboardCard from "../components/DashboardCard";
import AttendanceTable from "../components/AttendanceTable";
import { TrendChart } from "../components/PerformanceChart";
import axiosInstance from "../../../../utils/axiosInstance";
import { unwrapList } from "../../../../utils/api";
import toast from "react-hot-toast";

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export default function Attendance() {
  const currentMonthName = months[new Date().getMonth()];
  const [month, setMonth] = useState(currentMonthName);
  const [studentFilter, setStudentFilter] = useState("All");
  const [internships, setInternships] = useState([]);
  const [selectedInternshipId, setSelectedInternshipId] = useState("");
  const [records, setRecords] = useState([]);
  const [studentsList, setStudentsList] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch internships on mount
  useEffect(() => {
    const fetchInternships = async () => {
      try {
        const res = await axiosInstance.get('/internships');
        const list = unwrapList(res);
        setInternships(list);
        if (list.length > 0) {
          setSelectedInternshipId(list[0]._id);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchInternships();
  }, []);

  // Fetch attendance records when selected internship changes
  const fetchAttendance = useCallback(async () => {
    if (!selectedInternshipId) {
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      const res = await axiosInstance.get(`/attendance/internship/${selectedInternshipId}`);
      const list = unwrapList(res);
      setRecords(list);

      // Extract unique students
      const studentMap = new Map();
      list.forEach(r => {
        const sid = r.student?._id || r.student;
        if (sid && !studentMap.has(sid)) {
          studentMap.set(sid, {
            id: sid,
            name: r.studentName || r.studentProfile?.fullName || r.student?.email || "Student Applicant",
            photo: r.studentProfile?.avatarUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(r.studentName || r.studentProfile?.fullName || 'Student')}`
          });
        }
      });
      setStudentsList(Array.from(studentMap.values()));
    } catch {
      setRecords([]);
    } finally {
      setLoading(false);
    }
  }, [selectedInternshipId]);

  useEffect(() => {
    if (selectedInternshipId) {
      fetchAttendance();
    }
  }, [selectedInternshipId, fetchAttendance]);

  // Overall attendance stats
  const attendanceSummary = useMemo(() => {
    const total = records.length;
    const present = records.filter(r => r.status === 'present').length;
    const overallPercentage = total > 0 ? Math.round((present / total) * 100) : 0;

    const todayKey = new Date().toISOString().split('T')[0];
    const todayRecords = records.filter(r => r.dateKey === todayKey);

    const presentToday = todayRecords.filter(r => r.status === 'present').length;
    const absentToday = todayRecords.filter(r => r.status === 'absent' || r.status === 'leave').length;

    return {
      overallPercentage,
      presentToday,
      absentToday
    };
  }, [records]);

  // Trend chart data (past 6 months)
  const monthlyAttendanceTrend = useMemo(() => {
    const monthLabels = ["Feb", "Mar", "Apr", "May", "Jun", "Jul"];
    return monthLabels.map(m => {
      const matching = records.filter(r => {
        if (!r.dateKey) return false;
        const d = new Date(r.dateKey);
        return d.toLocaleString('en-US', { month: 'short' }) === m;
      });
      if (matching.length > 0) {
        const pCount = matching.filter(r => r.status === 'present').length;
        return { month: m, percentage: Math.round((pCount / matching.length) * 100) };
      }
      return { month: m, percentage: records.length > 0 ? attendanceSummary.overallPercentage : 0 };
    });
  }, [records, attendanceSummary]);

  // Today's attendance list with fallback to recent records
  const todaysAttendance = useMemo(() => {
    const todayKey = new Date().toISOString().split('T')[0];
    let source = records.filter(r => r.dateKey === todayKey);
    if (source.length === 0) {
      // If no records marked today yet, show recent records
      source = records.slice(0, 10);
    }
    return source.map(r => ({
      id: r.student?._id || r.student,
      recordId: r._id,
      name: r.studentName || r.studentProfile?.fullName || r.student?.email || "Student",
      photo: r.studentProfile?.avatarUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(r.studentName || 'Student')}`,
      time: r.createdAt ? new Date(r.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "Marked",
      status: r.status === 'present' ? "Present" : "Absent",
      dateKey: r.dateKey || todayKey
    }));
  }, [records]);

  const filteredToday = useMemo(() => {
    if (studentFilter === "All") return todaysAttendance;
    return todaysAttendance.filter((a) => a.id === studentFilter);
  }, [studentFilter, todaysAttendance]);

  // Faculty override handler
  const handleOverride = async (item) => {
    const nextStatus = item.status === "Present" ? "absent" : "present";
    try {
      await axiosInstance.patch(`/attendance/${selectedInternshipId}/override`, {
        studentId: item.id,
        dateKey: item.dateKey,
        status: nextStatus,
        remarks: "Faculty status override"
      });
      toast.success(`Marked as ${nextStatus.toUpperCase()}`);
      fetchAttendance();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to override attendance");
    }
  };

  // Monthly table rows
  const monthlyAttendanceTable = useMemo(() => {
    const dateMap = new Map();
    records.forEach(r => {
      if (!r.dateKey) return;
      const d = new Date(r.dateKey);
      const mName = months[d.getMonth()];
      if (mName.toLowerCase() === month.toLowerCase()) {
        const formatted = d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' });
        if (!dateMap.has(formatted)) {
          dateMap.set(formatted, { date: formatted, present: 0, absent: 0 });
        }
        const entry = dateMap.get(formatted);
        if (r.status === 'present') entry.present += 1;
        else entry.absent += 1;
      }
    });

    return Array.from(dateMap.values()).map(row => {
      const total = row.present + row.absent;
      return {
        ...row,
        percentage: total > 0 ? Math.round((row.present / total) * 100) : 0
      };
    });
  }, [records, month]);

  if (loading && records.length === 0) {
    return <div className="animate-pulse space-y-6"><div className="grid grid-cols-1 gap-4 sm:grid-cols-3"><div className="h-28 rounded-2xl bg-slate-200"></div><div className="h-28 rounded-2xl bg-slate-200"></div><div className="h-28 rounded-2xl bg-slate-200"></div></div><div className="h-80 rounded-2xl bg-slate-200"></div></div>;
  }

  return (
    <div className="animate-fadeIn space-y-6">
      {internships.length > 1 && (
        <div className="flex items-center justify-between bg-white border border-slate-200 rounded-2xl px-5 py-3">
          <span className="text-sm font-semibold text-slate-700">Internship:</span>
          <select
            value={selectedInternshipId}
            onChange={(e) => setSelectedInternshipId(e.target.value)}
            className="input-field text-xs py-1.5 px-3 max-w-xs"
          >
            {internships.map((intern) => (
              <option key={intern._id} value={intern._id}>{intern.title} ({intern.location || 'Remote'})</option>
            ))}
          </select>
        </div>
      )}

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
            {studentsList.map((s) => (
              <option key={s.id} value={s.id}>{s.name}</option>
            ))}
          </select>
          <div className="max-h-64 space-y-2 overflow-y-auto">
            {filteredToday.length === 0 ? (
              <div className="text-center py-8 text-xs text-slate-400">
                No attendance marked for today yet.
              </div>
            ) : (
              filteredToday.map((a) => (
                <div key={a.recordId || a.id} className="flex items-center justify-between rounded-xl border border-slate-100 p-2.5">
                  <div className="flex items-center gap-2.5">
                    <img src={a.photo} alt={a.name} className="h-8 w-8 rounded-full object-cover" />
                    <div>
                      <p className="text-sm font-semibold text-slate-700">{a.name}</p>
                      <p className="text-xs text-slate-400">{a.time}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleOverride(a)}
                    title="Click to override status"
                    className={`badge cursor-pointer transition-transform hover:scale-105 ${a.status === "Present" ? "bg-emerald-50 text-emerald-600 hover:bg-emerald-100" : "bg-red-50 text-red-500 hover:bg-red-100"}`}
                  >
                    {a.status}
                  </button>
                </div>
              ))
            )}
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
              <option key={m} value={m}>{m} {new Date().getFullYear()}</option>
            ))}
          </select>
        </div>
        <AttendanceTable rows={monthlyAttendanceTable} />
      </div>
    </div>
  );
}
