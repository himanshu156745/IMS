import { useState, useEffect, useMemo, useCallback } from 'react';
import toast from 'react-hot-toast';
import axiosInstance from '../../../../utils/axiosInstance';
import { FiCheckCircle, FiXCircle, FiClock, FiCalendar } from 'react-icons/fi';

export default function AttendancePage() {
  const [applications, setApplications] = useState([]);
  const [selectedInternshipId, setSelectedInternshipId] = useState(null);
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchApplications = async () => {
    try {
      const res = await axiosInstance.get('/applications/me');
      const accepted = res.data.data.filter(app => app.status === 'accepted');
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

  const fetchAttendance = useCallback(async () => {
    try {
      const res = await axiosInstance.get(`/attendance/me/${selectedInternshipId}`);
      setAttendanceRecords(res.data.data);
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

  const stats = useMemo(() => {
    const present = attendanceRecords.filter(r => r.status === 'present').length;
    const absent = attendanceRecords.filter(r => r.status === 'absent').length;
    const leave = attendanceRecords.filter(r => r.status === 'leave').length;
    const total = attendanceRecords.length;
    const rate = total > 0 ? Math.round((present / total) * 100) : 0;
    return { present, absent, leave, total, rate };
  }, [attendanceRecords]);

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'present': return 'bg-green-100 text-green-700';
      case 'absent': return 'bg-red-100 text-red-700';
      case 'leave': return 'bg-blue-100 text-blue-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  if (isLoading) {
    return <div className="flex justify-center items-center h-64">Loading...</div>;
  }

  if (applications.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center h-64 text-gray-500">
        <FiCalendar className="w-16 h-16 mb-4 text-gray-300" />
        <h2 className="text-xl font-semibold">No Active Internships</h2>
        <p>You need to have an accepted internship to view and mark attendance.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Attendance</h1>
          <p className="text-gray-600 mt-1">Track your daily attendance</p>
        </div>
        {applications.length > 1 && (
          <select 
            value={selectedInternshipId}
            onChange={(e) => setSelectedInternshipId(e.target.value)}
            className="rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            {applications.map(app => (
              <option key={app.internship._id} value={app.internship._id}>
                {app.internship.title}
              </option>
            ))}
          </select>
        )}
      </div>

      {/* Mark Attendance Action */}
      {!hasMarkedToday && (
        <div className="bg-white rounded-2xl p-6 border border-blue-200 shadow-sm bg-blue-50/50">
          <h3 className="text-lg font-bold text-gray-900 mb-2">Mark Today's Attendance ({todayKey})</h3>
          <p className="text-sm text-gray-600 mb-4">Please submit your attendance for today. You can only mark it once per day.</p>
          <div className="flex gap-4">
            <button 
              onClick={() => markAttendance('present')} 
              disabled={isSubmitting}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition flex items-center gap-2 disabled:opacity-50"
            >
              <FiCheckCircle /> Present
            </button>
            <button 
              onClick={() => markAttendance('absent')} 
              disabled={isSubmitting}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition flex items-center gap-2 disabled:opacity-50"
            >
              <FiXCircle /> Absent
            </button>
            <button 
              onClick={() => markAttendance('leave')} 
              disabled={isSubmitting}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2 disabled:opacity-50"
            >
              <FiClock /> Leave
            </button>
          </div>
        </div>
      )}

      {/* Overview Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Circular Progress */}
        <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Overall Attendance</h3>
          <div className="flex justify-center mb-6">
            <div className="relative w-48 h-48">
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
          </div>
        </div>

        {/* Statistics */}
        <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Statistics</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-green-50 rounded-xl">
              <p className="text-sm text-gray-600">Present Days</p>
              <p className="text-2xl font-bold text-gray-900">{stats.present}</p>
            </div>
            <div className="p-4 bg-red-50 rounded-xl">
              <p className="text-sm text-gray-600">Absent Days</p>
              <p className="text-2xl font-bold text-gray-900">{stats.absent}</p>
            </div>
            <div className="p-4 bg-blue-50 rounded-xl">
              <p className="text-sm text-gray-600">Leaves Taken</p>
              <p className="text-2xl font-bold text-gray-900">{stats.leave}</p>
            </div>
            <div className="p-4 bg-purple-50 rounded-xl">
              <p className="text-sm text-gray-600">Total Days Logged</p>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Attendance */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Attendance History</h3>
        {attendanceRecords.length === 0 ? (
          <p className="text-gray-500 text-center py-4">No attendance records found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-4 px-4 text-sm font-semibold text-gray-700">Date</th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-gray-700">Status</th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-gray-700">Remarks</th>
                </tr>
              </thead>
              <tbody>
                {attendanceRecords.map((record) => (
                  <tr key={record._id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-4 text-sm text-gray-900 font-medium">
                      {new Date(record.date).toLocaleDateString()} ({record.dateKey})
                    </td>
                    <td className="py-4 px-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${getStatusColor(record.status)}`}>
                        {record.status}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-sm text-gray-600">
                      {record.remarks || '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
