import { useState, useEffect } from 'react';
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

const getActiveTabFromPath = (path) => {
  switch (path.replace(/\/$/, '')) {
    case '/students':
      return 'dashboard';
    case '/students/profile':
      return 'profile';
    case '/students/view-internships':
      return 'view-internships';
    case '/students/apply':
      return 'apply';
    case '/students/applications':
      return 'applications';
    case '/students/reports':
      return 'reports';
    case '/students/attendance':
      return 'attendance';
    case '/students/certificates':
      return 'certificates';
    default:
      return 'dashboard';
  }
};

export default function StudentDashboard() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(() => getActiveTabFromPath(location.pathname));
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setActiveTab(getActiveTabFromPath(location.pathname));
  }, [location.pathname]);

  const showDashboard = location.pathname.replace(/\/$/, '') === '/students';

  return (
    <div className="min-h-screen bg-[#F8F9FC]">
      {/* Mobile Overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <Sidebar 
        collapsed={sidebarCollapsed} 
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />
      
      {/* Main Content */}
      <div className={`
        transition-all duration-300 
        ml-0
        lg:ml-20
        ${!sidebarCollapsed ? 'lg:ml-72' : 'lg:ml-20'}
      `}>
        <TopNavbar 
          onMenuClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        />
        
        <main className="p-4 sm:p-6 lg:p-8">

          {showDashboard && (
            <>
              <WelcomeSection />
              <QuickStats />
              
              {/* Responsive Grid Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mt-4 sm:mt-6">
                {/* Left Column - Main Content */}
                <div className="lg:col-span-2 space-y-4 sm:space-y-6 order-2 lg:order-1">
                  <RecentInternship />
                  <ApplicationTimeline />
                  <DailyReports />
                  <RecentNotifications />
                </div>
                
                {/* Right Column - Sidebar Content */}
                <div className="space-y-4 sm:space-y-6 order-1 lg:order-2">
                  <ProfileSummary />
                  <AttendanceSection />
                  <UpcomingEvents />
                </div>
              </div>
            </>
          )}
          
          <Outlet />
        </main>
      </div>
    </div>
  );
}