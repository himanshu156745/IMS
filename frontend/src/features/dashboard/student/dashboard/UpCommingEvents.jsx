import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDashboardData } from '../../../../hooks/useDashboardData';

export default function UpcomingEvents({ applications: propApps }) {
  const navigate = useNavigate();
  const { applications: hookApps } = useDashboardData();
  const applications = propApps !== undefined ? propApps : hookApps;

  const events = useMemo(() => {
    const list = [];
    const acceptedApp = applications.find(a => a.status === 'accepted');

    if (acceptedApp) {
      list.push({
        title: 'Daily Report Submission',
        time: "Due today by 8:00 PM",
        type: 'deadline',
        color: 'orange',
        path: '/students/reports'
      });
      list.push({
        title: 'Attendance Check-in',
        time: "Mark today's status",
        type: 'alert',
        color: 'red',
        path: '/students/attendance'
      });
      if (acceptedApp.internship?.deadline) {
        list.push({
          title: `Internship Completion (${acceptedApp.internship.company?.name || 'Mentor'})`,
          time: new Date(acceptedApp.internship.deadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
          type: 'meeting',
          color: 'purple',
          path: '/students/applications'
        });
      }
    }

    const pendingApps = applications.filter(a => a.status === 'applied' || a.status === 'reviewed');
    pendingApps.slice(0, 2).forEach(app => {
      list.push({
        title: `${app.internship?.title || 'Internship'} Review`,
        time: app.createdAt ? `Applied ${new Date(app.createdAt).toLocaleDateString()}` : 'In progress',
        type: 'interview',
        color: 'blue',
        path: '/students/applications'
      });
    });

    return list;
  }, [applications]);

  const getIcon = (type) => {
    switch (type) {
      case 'interview':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        );
      case 'deadline':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'meeting':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        );
      case 'alert':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        );
      default:
        return null;
    }
  };

  const getColorClass = (color) => {
    switch (color) {
      case 'blue': return 'from-blue-500 to-cyan-500';
      case 'orange': return 'from-orange-500 to-amber-500';
      case 'purple': return 'from-purple-500 to-pink-500';
      case 'red': return 'from-red-500 to-rose-500';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Upcoming Events</h2>

      {events.length === 0 ? (
        <div className="text-center py-8 text-gray-500 text-sm">
          No upcoming events scheduled
        </div>
      ) : (
        <div className="space-y-3">
          {events.map((event, index) => (
            <div
              key={index}
              onClick={() => event.path && navigate(event.path)}
              className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer"
            >
              <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${getColorClass(event.color)} flex items-center justify-center text-white flex-shrink-0`}>
                {getIcon(event.type)}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900 text-sm mb-1 truncate">
                  {event.title}
                </h3>
                <p className="text-xs text-gray-500">{event.time}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      <button 
        onClick={() => navigate('/students/applications')}
        className="w-full mt-4 px-4 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
      >
        View All Applications
      </button>
    </div>
  );
}
