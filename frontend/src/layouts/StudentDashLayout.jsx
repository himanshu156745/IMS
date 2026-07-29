import { useState } from 'react';
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
import { Outlet } from 'react-router-dom';

export default function StudentDashboard() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="min-h-screen bg-[#F8F9FC]">
      <Sidebar 
        collapsed={sidebarCollapsed} 
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      
      <div className={`transition-all duration-300 ${sidebarCollapsed ? 'ml-20' : 'ml-72'}`}>
        <TopNavbar />
        
        <main className="p-6 lg:p-8">
          {activeTab === 'dashboard' && (
            <>
              <WelcomeSection />
              <QuickStats />
              
              <div className="grid lg:grid-cols-3 gap-6 mt-6">
                <div className="lg:col-span-2 space-y-6">
                  <RecentInternship />
                  <ApplicationTimeline />
                  {/* <Charts /> */}
                  <DailyReports />
                  <RecentNotifications />
                </div>
                
                <div className="space-y-6">
                  <ProfileSummary />
                  <AttendanceSection />
                  <UpcomingEvents />
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
