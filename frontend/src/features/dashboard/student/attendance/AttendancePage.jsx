import { useState, useEffect, useMemo, useCallback } from 'react';
import toast from 'react-hot-toast';
import axiosInstance from '../../../../utils/axiosInstance';
import { FiCheckCircle, FiXCircle, FiClock, FiCalendar } from 'react-icons/fi';
import { unwrapList } from '../../../../utils/api';

export default function AttendancePage() {
  const [applications, setApplications] = useState([]);
  const [selectedInternshipId, setSelectedInternshipId] = useState(null);
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch Applications (Only accepted ones)
  const fetchApplications = async () => {
    try {
      const res = await axiosInstance.get('/applications/me');
      const accepted = unwrapList(res).filter(app => app.status === 'accepted');
      setApplications(accepted);
      if (accepted.length > 0) {
        setSelectedInternshipId(accepted[0].internship._id);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to fetch applications');
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch Attendance for Selected Internship
  const fetchAttendance = useCallback(async () => {
    try {
      const res = await axiosInstance.get(`/attendance/me/${selectedInternshipId}`);
      setAttendanceRecords(unwrapList(res));
    } catch {
      toast.error('Failed to fetch attendance records');
    }
  }, [selectedInternshipId]);

  useEffect(() => {
    fetchApplications();
  }, []);

  useEffect(() => {
    if (selectedInternshipId) {
      fetchAttendance();
    }
  }, [selectedInternshipId, fetchAttendance]);

  // Mark Daily Attendance
  const markAttendance = async (status) => {
    if (!selectedInternshipId) return;
    setIsSubmitting(true);
    try {
      await axiosInstance.post(`/attendance/${selectedInternshipId}`, {
        status,
        remarks: ''
      });
      toast.success(`Marked as ${status}`);
      fetchAttendance();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to mark attendance');
    } finally {
      setIsSubmitting(false);
    }
  };

  const todayKey = new Date().toLocaleDateString('en-CA');
  const hasMarkedToday = attendanceRecords.some(r => r.dateKey === todayKey);

  // Calculate Dynamic Stats
  const stats = useMemo(() => {
    const present = attendanceRecords.filter(r => r.status.toLowerCase() === 'present').length;
    const absent = attendanceRecords.filter(r => r.status.toLowerCase() === 'absent').length;
    const leave = attendanceRecords.filter(r => r.status.toLowerCase() === 'leave').length;
    const total = attendanceRecords.length;
    const rate = total > 0 ? Math.round((present / total) * 100) : 0;
    return { present, absent, leave, total, rate };
  }, [attendanceRecords]);

  // Dynamic Weekly Breakdown Calculation for the Chart
  const monthlyData = useMemo(() => {
    if (attendanceRecords.length === 0) return [];
    
    // Group attendance records into 4 weeks
    const weeks = [
      { week: 'Week 1', present: 0, absent: 0, leaves: 0 },
      { week: 'Week 2', present: 0, absent: 0, leaves: 0 },
      { week: 'Week 3', present: 0, absent: 0, leaves: 0 },
      { week: 'Week 4', present: 0, absent: 0, leaves: 0 },
    ];

    attendanceRecords.forEach(record => {
      const date = new Date(record.date);
      const dayOfMonth = date.getDate();
      let weekIndex = Math.floor((dayOfMonth - 1) / 7);
      if (weekIndex > 3) weekIndex = 3;

      const status = record.status.toLowerCase();
      if (status === 'present') weeks[weekIndex].present += 1;
      else if (status === 'absent') weeks[weekIndex].absent += 1;
      else if (status === 'leave') weeks[weekIndex].leaves += 1;
    });

    return weeks;
  }, [attendanceRecords]);

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'present': return 'bg-green-100 text-green-700';
      case 'absent': return 'bg-red-100 text-red-700';
      case 'leave': return 'bg-blue-100 text-blue-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  if (isLoading) {
    return <div className="flex justify-center items-center h-64 font-medium text-gray-600">Loading attendance data...</div>;
  }

  if (applications.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center h-64 text-gray-500">
        <FiCalendar className="w-16 h-16 mb-4 text-gray-300" />
        <h2 className="text-xl font-semibold">No Active Internships</h2>
        <p className="text-sm mt-1">You need an accepted internship to view and mark attendance.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Attendance</h1>
          <p className="text-gray-600 mt-1">Track your daily attendance and working hours</p>
        </div>
        {applications.length > 1 && (
          <select 
            value={selectedInternshipId}
            onChange={(e) => setSelectedInternshipId(e.target.value)}
            className="rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm p-2"
          >
            {applications.map(app => (
              <option key={app.internship._id} value={app.internship._id}>
                {app.internship.title}
              </option>
            ))}
          </select>
        )}
      </div>

      {/* Mark Attendance Banner */}
      {!hasMarkedToday && (
        <div className="bg-white rounded-2xl p-6 border border-blue-200 shadow-sm bg-blue-50/50">
          <h3 className="text-lg font-bold text-gray-900 mb-1">Mark Today's Attendance ({todayKey})</h3>
          <p className="text-sm text-gray-600 mb-4">Please submit your attendance for today. You can only mark it once per day.</p>
          <div className="flex gap-4">
            <button 
              onClick={() => markAttendance('present')} 
              disabled={isSubmitting}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition flex items-center gap-2 disabled:opacity-50 text-sm font-medium"
            >
              <FiCheckCircle /> Present
            </button>
            <button 
              onClick={() => markAttendance('absent')} 
              disabled={isSubmitting}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition flex items-center gap-2 disabled:opacity-50 text-sm font-medium"
            >
              <FiXCircle /> Absent
            </button>
            <button 
              onClick={() => markAttendance('leave')} 
              disabled={isSubmitting}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2 disabled:opacity-50 text-sm font-medium"
            >
              <FiClock /> Leave
            </button>
          </div>
        </div>
      )}

      {/* Overview Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Circular Progress */}
        <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm flex flex-col items-center justify-center">
          <h3 className="text-lg font-bold text-gray-900 mb-6 self-start">Overall Attendance</h3>
          <div className="relative w-48 h-48 mb-4">
            <svg className="w-48 h-48 transform -rotate-90">
              <circle cx="96" cy="96" r="85" stroke="#E5E7EB" strokeWidth="14" fill="none" />
              <circle
                cx="96"
                cy="96"
                r="85"
                stroke="url(#gradient)"
                strokeWidth="14"
                fill="none"
                strokeDasharray={`${2 * Math.PI * 85}`}
                strokeDashoffset={`${2 * Math.PI * 85 * (1 - stats.rate / 100)}`}
                strokeLinecap="round"
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#3B82F6" />
                  <stop offset="100%" stopColor="#8B5CF6" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-5xl font-bold text-gray-900">{stats.rate}%</div>
                <div className="text-sm text-gray-500 mt-2">Attendance Rate</div>
              </div>
            </div>
          </div>
          <p className="text-sm text-gray-600 text-center">
            {stats.rate >= 75 ? "Keep it up! You're doing great." : "Try to keep your attendance above 75%."}
          </p>
        </div>

        {/* Statistics Grid */}
        <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Statistics</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-green-50 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-green-500 flex items-center justify-center">
                  <FiCheckCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Present Days</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.present}</p>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between p-4 bg-red-50 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-red-500 flex items-center justify-center">
                  <FiXCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Absent Days</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.absent}</p>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between p-4 bg-blue-50 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-500 flex items-center justify-center">
                  <FiClock className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Leaves Taken</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.leave}</p>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between p-4 bg-purple-50 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-purple-500 flex items-center justify-center">
                  <FiCalendar className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Days Logged</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Monthly Breakdown Chart */}
        <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Monthly Breakdown</h3>
          <div className="space-y-6">
            {monthlyData.map((week, index) => {
              const weekTotal = week.present + week.absent + week.leaves;
              return (
                <div key={index}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">{week.week}</span>
                    <span className="text-sm text-gray-600">{weekTotal} days</span>
                  </div>
                  <div className="flex gap-1 h-8">
                    {week.present > 0 && (
                      <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center text-white text-xs font-semibold" style={{flex: week.present}}>
                        {week.present}
                      </div>
                    )}
                    {week.absent > 0 && (
                      <div className="bg-gradient-to-r from-red-500 to-rose-500 rounded-lg flex items-center justify-center text-white text-xs font-semibold" style={{flex: week.absent}}>
                        {week.absent}
                      </div>
                    )}
                    {week.leaves > 0 && (
                      <div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center text-white text-xs font-semibold" style={{flex: week.leaves}}>
                        {week.leaves}
                      </div>
                    )}
                    {weekTotal === 0 && (
                      <div className="bg-gray-100 rounded-lg w-full flex items-center justify-center text-gray-400 text-xs">
                        No Data
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
            <div className="pt-4 border-t border-gray-200">
              <div className="flex items-center justify-center gap-4 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-gradient-to-r from-green-500 to-emerald-500"></div>
                  <span className="text-gray-600">Present</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-gradient-to-r from-red-500 to-rose-500"></div>
                  <span className="text-gray-600">Absent</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-gradient-to-r from-blue-500 to-cyan-500"></div>
                  <span className="text-gray-600">Leave</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Dynamic Recent Attendance Table */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Recent Attendance</h3>
        {attendanceRecords.length === 0 ? (
          <p className="text-gray-500 text-center py-4">No attendance records found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-4 px-4 text-sm font-semibold text-gray-700">Date</th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-gray-700">Day</th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-gray-700">Status</th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-gray-700">Check In</th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-gray-700">Check Out</th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-gray-700">Total Hours</th>
                </tr>
              </thead>
              <tbody>
                {attendanceRecords.map((record) => {
                  const recordDate = new Date(record.date);
                  const formattedDate = recordDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
                  const dayName = recordDate.toLocaleDateString('en-US', { weekday: 'long' });

                  return (
                    <tr key={record._id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-4 text-sm text-gray-900 font-medium">{formattedDate}</td>
                      <td className="py-4 px-4 text-sm text-gray-600">{dayName}</td>
                      <td className="py-4 px-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${getStatusColor(record.status)}`}>
                          {record.status}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-sm text-gray-900">{record.checkIn || '-'}</td>
                      <td className="py-4 px-4 text-sm text-gray-900">{record.checkOut || '-'}</td>
                      <td className="py-4 px-4 text-sm font-semibold text-gray-900">{record.hours || '-'}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}