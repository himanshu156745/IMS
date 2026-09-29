export default function RecentNotifications() {
  const notifications = [
    {
      title: 'Application Accepted',
      message: 'Your application for Software Developer has been accepted by TCS',
      time: '2 hours ago',
      type: 'success',
    },
    {
      title: 'Attendance Updated',
      message: 'Your attendance has been marked for today',
      time: '5 hours ago',
      type: 'info',
    },
    {
      title: 'Report Approved',
      message: 'Weekly report #18 has been approved by your mentor',
      time: '1 day ago',
      type: 'success',
    },
  ];

  const getTypeColor = (type) => {
    switch (type) {
      case 'success': return 'bg-green-100 text-green-600';
      case 'info': return 'bg-blue-100 text-blue-600';
      case 'warning': return 'bg-orange-100 text-orange-600';
      case 'error': return 'bg-red-100 text-red-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="bg-white rounded-2xl h-90 overflow-auto p-6 border border-gray-200 shadow-sm">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Notifications</h2>

      <div className="space-y-4">
        {notifications.map((notification, index) => (
          <div
            key={index}
            className="relative pl-6 pb-4 border-l-2 border-gray-200 last:border-0 last:pb-0"
          >
            <div className={`absolute left-[-5px] top-0 w-2 h-2 rounded-full ${getTypeColor(notification.type).split(' ')[0]}`}></div>
            <h3 className="font-semibold text-gray-900 text-sm mb-1">
              {notification.title}
            </h3>
            <p className="text-xs text-gray-600 mb-1">
              {notification.message}
            </p>
            <p className="text-xs text-gray-400">{notification.time}</p>
          </div>
        ))}
      </div>

      <button className="w-full mt-4 px-4 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-colors">
        View All Notifications
      </button>
    </div>
  );
}
