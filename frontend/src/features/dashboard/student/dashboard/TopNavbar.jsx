import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

export default function TopNavbar({ onMenuClick }) {

  const navigate = useNavigate()
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  const notificationRef = useRef(null);
  const profileRef = useRef(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfile(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="sticky top-0 z-30 backdrop-blur-xl bg-white/80 border-b border-gray-200">
      <div className="px-3 sm:px-6 py-3 sm:py-4">
        <div className="flex items-center justify-between gap-2 sm:gap-4">
          {/* Mobile Menu Button */}
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-xl transition-colors shrink-0"
          >
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-2xl">
            <div className="relative w-full">
              <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search internships, companies, reports..."
                className="w-full pl-12 pr-4 py-2.5 sm:py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
              />
            </div>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-1 sm:gap-2 md:gap-3">
            {/* Mobile Search Toggle */}
            <button
              onClick={() => setShowSearch(!showSearch)}
              className="md:hidden p-2 hover:bg-gray-100 rounded-xl transition-colors shrink-0"
            >
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>

            {/* Theme Toggle - Hidden on small mobile */}
            {/* <button className="hidden sm:block p-2 sm:p-3 hover:bg-gray-100 rounded-xl transition-colors shrink-0">
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            </button> */}



            {/* Messages - Hidden on mobile */}
            <button className=" sm:block p-2 sm:p-3 hover:bg-gray-100 rounded-xl transition-colors relative shrink-0">
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-green-500 rounded-full"></span>
            </button>

            {/* Notifications */}
            <div className="relative" ref={notificationRef}>
              <button
                onClick={() => {
                  setShowNotifications(!showNotifications);
                  setShowProfile(false);
                }}
                className="p-2 sm:p-3 hover:bg-gray-100 rounded-xl transition-colors relative shrink-0"
              >
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                <span className="absolute top-1 right-1 sm:top-2 sm:right-2 w-4 h-4 sm:w-5 sm:h-5 bg-red-500 text-white text-[10px] sm:text-xs rounded-full flex items-center justify-center font-semibold">
                  3
                </span>
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-2 w-[calc(100vw-2rem)] sm:w-80 bg-white rounded-2xl shadow-2xl border border-gray-200 p-3 sm:p-4 max-h-[70vh] overflow-y-auto">
                  <h3 className="font-semibold text-gray-900 mb-3 text-sm sm:text-base">Notifications</h3>
                  <div className="space-y-2 sm:space-y-3">
                    <div className="p-2.5 sm:p-3 bg-blue-50 rounded-xl">
                      <p className="text-xs sm:text-sm font-medium text-gray-900">Application Accepted</p>
                      <p className="text-[10px] sm:text-xs text-gray-600 mt-1">Your application for Software Developer has been accepted</p>
                      <p className="text-[10px] sm:text-xs text-gray-400 mt-1">2 hours ago</p>
                    </div>
                    <div className="p-2.5 sm:p-3 bg-purple-50 rounded-xl">
                      <p className="text-xs sm:text-sm font-medium text-gray-900">Report Approved</p>
                      <p className="text-[10px] sm:text-xs text-gray-600 mt-1">Weekly report #18 has been approved</p>
                      <p className="text-[10px] sm:text-xs text-gray-400 mt-1">5 hours ago</p>
                    </div>
                    <div className="p-2.5 sm:p-3 bg-green-50 rounded-xl">
                      <p className="text-xs sm:text-sm font-medium text-gray-900">Certificate Ready</p>
                      <p className="text-[10px] sm:text-xs text-gray-600 mt-1">Your internship certificate is ready for download</p>
                      <p className="text-[10px] sm:text-xs text-gray-400 mt-1">1 day ago</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Profile Dropdown */}
            <div className="relative" ref={profileRef}>
              <button
                onClick={() => {
                  setShowProfile(!showProfile);
                  setShowNotifications(false);
                }}
                className="flex items-center gap-2 sm:gap-3 p-1.5 sm:p-2 hover:bg-gray-100 rounded-xl transition-colors"
              >
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-semibold shadow-lg text-sm sm:text-base shrink-0">
                  RS
                </div>
                <div className="hidden lg:block text-left">
                  <p className="text-sm font-semibold text-gray-900">Rahul Sharma</p>
                  <p className="text-xs text-gray-500">Student</p>
                </div>
                <svg className="hidden sm:block w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {showProfile && (
                <div className="absolute right-0 mt-2 w-56 sm:w-64 bg-white rounded-2xl shadow-2xl border border-gray-200 p-3 sm:p-4">
                  <div className="space-y-1 sm:space-y-2">
                    <button onClick={() => navigate("/students/profile")} className="w-full text-left px-3 sm:px-4 py-2 hover:bg-gray-100 rounded-xl text-xs sm:text-sm font-medium text-gray-700 transition-colors">
                      View Profile
                    </button>
                    <button className="w-full text-left px-3 sm:px-4 py-2 hover:bg-gray-100 rounded-xl text-xs sm:text-sm font-medium text-gray-700 transition-colors">
                      Settings
                    </button>
                    <button className="w-full text-left px-3 sm:px-4 py-2 hover:bg-gray-100 rounded-xl text-xs sm:text-sm font-medium text-gray-700 transition-colors">
                      Help & Support
                    </button>
                    <hr className="my-2" />
                    <button className="w-full text-left px-3 sm:px-4 py-2 hover:bg-red-50 rounded-xl text-xs sm:text-sm font-medium text-red-600 transition-colors">
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Search Bar */}
        {showSearch && (
          <div className="md:hidden mt-3">
            <div className="relative">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
              />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
