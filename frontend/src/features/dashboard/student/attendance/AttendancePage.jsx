export default function AttendancePage() {
  const attendancePercentage = 92;
  const monthlyData = [
    { week: 'Week 1', present: 5, absent: 0, leaves: 0 },
    { week: 'Week 2', present: 4, absent: 1, leaves: 0 },
    { week: 'Week 3', present: 5, absent: 0, leaves: 0 },
    { week: 'Week 4', present: 5, absent: 0, leaves: 1 },
  ];

  const recentAttendance = [
    { date: 'May 18, 2024', day: 'Saturday', status: 'Present', checkIn: '09:00 AM', checkOut: '06:00 PM', hours: '9h' },
    { date: 'May 17, 2024', day: 'Friday', status: 'Present', checkIn: '09:15 AM', checkOut: '06:10 PM', hours: '8.9h' },
    { date: 'May 16, 2024', day: 'Thursday', status: 'Present', checkIn: '08:50 AM', checkOut: '06:00 PM', hours: '9.2h' },
    { date: 'May 15, 2024', day: 'Wednesday', status: 'Leave', checkIn: '-', checkOut: '-', hours: '-' },
    { date: 'May 14, 2024', day: 'Tuesday', status: 'Present', checkIn: '09:00 AM', checkOut: '06:05 PM', hours: '9h' },
    { date: 'May 13, 2024', day: 'Monday', status: 'Present', checkIn: '08:55 AM', checkOut: '06:00 PM', hours: '9.1h' },
    { date: 'May 10, 2024', day: 'Friday', status: 'Absent', checkIn: '-', checkOut: '-', hours: '-' },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Present': return 'bg-green-100 text-green-700';
      case 'Absent': return 'bg-red-100 text-red-700';
      case 'Leave': return 'bg-blue-100 text-blue-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Attendance</h1>
        <p className="text-gray-600 mt-1">Track your attendance and working hours</p>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
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
                  strokeDashoffset={`${2 * Math.PI * 85 * (1 - attendancePercentage / 100)}`}
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
                  <div className="text-5xl font-bold text-gray-900">{attendancePercentage}%</div>
                  <div className="text-sm text-gray-500 mt-2">Attendance Rate</div>
                </div>
              </div>
            </div>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600">
              Keep it up! You're doing great with your attendance.
            </p>
          </div>
        </div>

        {/* Statistics */}
        <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Statistics</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-green-50 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-green-500 flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Present Days</p>
                  <p className="text-2xl font-bold text-gray-900">46</p>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between p-4 bg-red-50 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-red-500 flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Absent Days</p>
                  <p className="text-2xl font-bold text-gray-900">2</p>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between p-4 bg-blue-50 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-500 flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Leaves Taken</p>
                  <p className="text-2xl font-bold text-gray-900">2</p>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between p-4 bg-purple-50 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-purple-500 flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Days</p>
                  <p className="text-2xl font-bold text-gray-900">50</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Monthly Chart */}
        <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Monthly Breakdown</h3>
          <div className="space-y-6">
            {monthlyData.map((week, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">{week.week}</span>
                  <span className="text-sm text-gray-600">{week.present + week.absent + week.leaves} days</span>
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
                </div>
              </div>
            ))}
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

      {/* Recent Attendance */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Recent Attendance</h3>
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
              {recentAttendance.map((record, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-4 text-sm text-gray-900 font-medium">{record.date}</td>
                  <td className="py-4 px-4 text-sm text-gray-600">{record.day}</td>
                  <td className="py-4 px-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(record.status)}`}>
                      {record.status}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-900">{record.checkIn}</td>
                  <td className="py-4 px-4 text-sm text-gray-900">{record.checkOut}</td>
                  <td className="py-4 px-4 text-sm font-semibold text-gray-900">{record.hours}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
