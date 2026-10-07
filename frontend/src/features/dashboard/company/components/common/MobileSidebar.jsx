import { useNavigate } from 'react-router-dom'
import Icon from '../ui/Icon.jsx'
import { SidebarNav } from './Sidebar.jsx'
import { useUI } from '../../store/UIContext.jsx'

export default function MobileSidebar() {
  const { mobileSidebarOpen, closeMobileSidebar } = useUI()
  const navigate = useNavigate()

  const handleLogout = () => {
    closeMobileSidebar()
    if (window.confirm('Are you sure you want to log out?')) {
      navigate('/')
    }
  }

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-xs z-40 lg:hidden transition-opacity ${
          mobileSidebarOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={closeMobileSidebar}
      />
      <aside
        className={`fixed lg:hidden top-0 left-0 h-screen w-64 bg-[#12121a] text-slate-300 z-50 transition-transform duration-300 flex flex-col border-r border-white/5 ${
          mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-5 pb-5">
          <div className="flex items-center gap-3">
            <img
              src="/rid-logo.jpg"
              alt="RID Tech"
              className="w-10 h-10 rounded-xl object-cover shadow-md shrink-0 ring-1 ring-blue-500/30"
            />
            <div className="min-w-0">
              <h2 className="font-bold text-white text-[15px] leading-tight tracking-tight truncate">
                RID Tech
              </h2>
              <p className="text-[12px] text-slate-400 font-normal leading-tight mt-0.5 truncate">
                Research to Reality
              </p>
            </div>
          </div>
          <button
            onClick={closeMobileSidebar}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/5 transition"
            aria-label="Close menu"
          >
            <Icon name="close" className="w-5 h-5" />
          </button>
        </div>

        {/* Nav List */}
        <SidebarNav onNavigate={closeMobileSidebar} />

        {/* Bottom Logout */}
        <div className="p-4 mt-auto">
          <button
            type="button"
            onClick={handleLogout}
            className="w-full flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-medium text-slate-400 hover:text-white hover:bg-white/[0.06] transition-colors"
          >
            <Icon name="logout" className="w-5 h-5 shrink-0" strokeWidth={1.9} />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  )
}
