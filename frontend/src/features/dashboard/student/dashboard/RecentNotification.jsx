import { useNavigate } from 'react-router-dom';
import { useDashboardData } from '../../../../hooks/useDashboardData';

export default function RecentNotifications({ notifications: propNotifications }) {
  const navigate = useNavigate();
  const { notifications: hookNotifications = [] } = useDashboardData();
  const liveNotifications = propNotifications !== undefined ? propNotifications : hookNotifications;

  const notifications = liveNotifications.map(n => ({
    title: n.title,
    message: n.message,
    time: n.createdAt ? new Date(n.createdAt).toLocaleDateString() : 'Recent',
    type: n.type || 'info'
  }));

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

      {notifications.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-10 text-gray-500">
          <p className="text-sm">No recent notifications</p>
        </div>
      ) : (
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
      )}

      <button 
        onClick={() => navigate('/students/applications')}
        className="w-full mt-4 px-4 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
      >
        View Applications
      </button>
    </div>
  );
}
