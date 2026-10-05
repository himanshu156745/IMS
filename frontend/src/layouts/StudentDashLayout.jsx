import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from '../features/dashboard/student/dashboard/SideBar';
import TopNavbar from '../features/dashboard/student/dashboard/TopNavbar';
import WelcomeSection from '../features/dashboard/student/dashboard/WelcomeSection';
import QuickStats from '../features/dashboard/student/dashboard/QuickStats';
import RecentInternship from '../features/dashboard/student/dashboard/RecentInternship';
import ApplicationTimeline from '../features/dashboard/student/dashboard/ApplicationTimeline';
import DailyReports from '../features/dashboard/student/dashboard/DailyReports';
import ProfileSummary from '../features/dashboard/student/dashboard/ProfileSummary';
import AttendanceSection from '../features/dashboard/student/dashboard/AttendanceSection';
import UpcomingEvents from '../features/dashboard/student/dashboard/UpCommingEvents';
import RecentNotifications from '../features/dashboard/student/dashboard/RecentNotification';
import { useDashboardData } from '../hooks/useDashboardData';

export default function StudentDashboard() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const location = useLocation();
  const path = location.pathname.split('/').pop();
  const activeTab = path === 'students' || path === '' ? 'dashboard' : path;

  const { user, profile, applications, notifications, certificates, loading, error } = useDashboardData();

  return (
    <div className="min-h-screen bg-[#F8F9FC]">
      <Sidebar 
        collapsed={sidebarCollapsed} 
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        activeTab={activeTab}
      />
      
      <div className={`transition-all duration-300 ${sidebarCollapsed ? 'ml-20' : 'ml-72'}`}>
        <TopNavbar />
        
        <main className="p-6 lg:p-8">
          {error && (
            <div className="mb-4 bg-red-50 border-l-4 border-red-500 p-4 rounded-md">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'dashboard' && (
            <>
              <WelcomeSection user={user} />
              <QuickStats applications={applications} certificates={certificates} />
              
              <div className="grid lg:grid-cols-3 gap-6 mt-6">
                <div className="lg:col-span-2 space-y-6">
                  <RecentInternship applications={applications} />
                  <ApplicationTimeline applications={applications} />
                  {/* <Charts /> */}
                  <DailyReports />
                  <RecentNotifications notifications={notifications} />
                </div>
                
                <div className="space-y-6">
                  <ProfileSummary profile={profile} />
                  <AttendanceSection applications={applications} />
                  <UpcomingEvents applications={applications} />
                </div>
              </div>
            </>
          )}
          
          <Outlet/>
         
        </main>
      </div>
    </div>
  );
}
