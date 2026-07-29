import { useNavigate } from "react-router-dom";

export default function Sidebar({ collapsed, onToggle, activeTab, setActiveTab }) {

  const navigate = useNavigate()

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '🏠' },
    { id: 'profile', label: 'My Profile', icon: '👤' },
    { id: 'view-internships', label: 'View Internships', icon: '🔍' },
    { id: 'apply', label: 'Apply Internship', icon: '📄' },
    { id: 'applications', label: 'My Applications', icon: '📂' },
    { id: 'reports', label: 'Daily Reports', icon: '📝' },
    { id: 'attendance', label: 'Attendance', icon: '📅' },
    { id: 'certificates', label: 'Certificates', icon: '🎓' },
  ];

  return (
    <aside className={`fixed left-0 top-0 h-screen bg-white border-r border-gray-200 transition-all duration-300 z-40 ${collapsed ? 'w-20' : 'w-72'}`}>
      <div className="flex flex-col h-full">
        {/* Logo Section */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">IMS</span>
              </div>
              {!collapsed && (
                <span className="text-xl font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  IMS
                </span>
              )}
            </div>
            <button
              onClick={onToggle}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={collapsed ? "M13 5l7 7-7 7M5 5l7 7-7 7" : "M11 19l-7-7 7-7m8 14l-7-7 7-7"} />
              </svg>
            </button>
          </div>
        </div>

        {/* Student Info */}
        {!collapsed && (
          <div className="px-6 py-3 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-semibold text-lg shadow-lg">
                RS
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900 truncate">Rahul Sharma</h3>
                <p className="text-sm text-gray-500 truncate">Computer Science</p>
                <p className="text-xs text-gray-400 truncate">Roll: CS2024001</p>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Menu */}
        <nav className="flex-1 overflow-y-auto py-6 px-3">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id)
                if (item.id === "dashboard") {
                  navigate("/students")
                } else {
                  navigate(`/students/${item.id}`)
                }
              }}
              className={`w-full flex items-center gap-3 px-4 py-2 rounded-xl mb-2 transition-all duration-200 ${activeTab === item.id
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-200'
                  : 'text-gray-700 hover:bg-gray-100'
                }`}
            >
              <span className="text-xl">{item.icon}</span>
              {!collapsed && (
                <span className="font-medium">{item.label}</span>
              )}
            </button>
          ))}
        </nav>

        {/* Logout Button */}
        <div className="px-4 py-2 border-t border-gray-100">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 transition-colors">
            <span className="text-xl">🚪</span>
            {!collapsed && (
              <span className="font-medium">Logout</span>
            )}
          </button>
        </div>
      </div>
    </aside>
  );
}
