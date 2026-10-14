import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../../../utils/axiosInstance';
import { unwrapList } from '../../../../utils/api';
import { useDashboardData } from '../../../../hooks/useDashboardData';

export default function AttendanceSection({ applications: propApps }) {
  const navigate = useNavigate();
  const { applications: hookApps } = useDashboardData();
  const applications = propApps !== undefined ? propApps : hookApps;
  const [stats, setStats] = useState({ percentage: 0, present: 0, absent: 0, leave: 0 });

  useEffect(() => {
    const activeApp = applications.find(a => a.status === 'accepted') || applications[0];
    const internshipId = activeApp?.internship?._id || activeApp?.internship;

    if (!internshipId) {
      setStats({ percentage: 0, present: 0, absent: 0, leave: 0 });
      return;
    }

    axiosInstance.get(`/attendance/me/${internshipId}`)
      .then(res => {
        const records = unwrapList(res);
        if (records.length > 0) {
          const present = records.filter(r => r.status === 'present').length;
          const absent = records.filter(r => r.status === 'absent').length;
          const leave = records.filter(r => r.status === 'leave').length;
          const percentage = Math.round((present / records.length) * 100);
          setStats({ percentage, present, absent, leave });
        } else {
          setStats({ percentage: 0, present: 0, absent: 0, leave: 0 });
        }
      })
      .catch(() => {
        setStats({ percentage: 0, present: 0, absent: 0, leave: 0 });
      });
  }, [applications]);

  const attendancePercentage = stats.percentage;

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Attendance</h2>

      <div className="flex justify-center mb-6">
        <div className="relative w-40 h-40">
          <svg className="w-40 h-40 transform -rotate-90">
            <circle
              cx="80"
              cy="80"
              r="70"
              stroke="#E5E7EB"
              strokeWidth="12"
              fill="none"
            />
            <circle
              cx="80"
              cy="80"
              r="70"
              stroke="url(#gradient)"
              strokeWidth="12"
              fill="none"
              strokeDasharray={`${2 * Math.PI * 70}`}
              strokeDashoffset={`${2 * Math.PI * 70 * (1 - attendancePercentage / 100)}`}
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
              <div className="text-3xl font-bold text-gray-900">{attendancePercentage}%</div>
              <div className="text-xs text-gray-500">Attendance</div>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between p-3 bg-green-50 rounded-xl">
          <span className="text-sm font-medium text-gray-700">Present Days</span>
          <span className="text-sm font-bold text-green-700">{stats.present}</span>
        </div>
        <div className="flex items-center justify-between p-3 bg-red-50 rounded-xl">
          <span className="text-sm font-medium text-gray-700">Absent Days</span>
          <span className="text-sm font-bold text-red-700">{stats.absent}</span>
        </div>
        <div className="flex items-center justify-between p-3 bg-blue-50 rounded-xl">
          <span className="text-sm font-medium text-gray-700">Leaves</span>
          <span className="text-sm font-bold text-blue-700">{stats.leave}</span>
        </div>
      </div>

      <button 
        onClick={() => navigate('/students/attendance')}
        className="w-full mt-4 px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all hover:scale-105"
      >
        View Full Report
      </button>
    </div>
  );
}
