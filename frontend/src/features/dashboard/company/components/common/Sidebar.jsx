import { NavLink, useNavigate } from 'react-router-dom'
import Icon from '../ui/Icon.jsx'
import { navItems } from '../../utils/navigation.js'

export function SidebarNav({ onNavigate }) {
  return (
    <nav className="flex-1 overflow-y-auto px-3.5 space-y-1.5 text-sm">
      {navItems.map((item) => (
        <NavLink
          key={item.key}
          to={item.path}
          end={item.path === '/'}
          onClick={onNavigate}
          className={({ isActive }) =>
            `group w-full flex items-center gap-3.5 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 ${
              isActive
                ? 'bg-[#2563eb] text-white shadow-sm shadow-blue-900/30'
                : 'text-slate-400 hover:text-white hover:bg-white/[0.06]'
            }`
          }
        >
          {({ isActive }) => (
            <>
              <Icon
                name={item.icon}
                className={`w-5 h-5 shrink-0 transition-colors ${
                  isActive ? 'text-white' : 'text-slate-400 group-hover:text-white'
                }`}
                strokeWidth={1.9}
              />
              <span className="truncate">{item.label}</span>
            </>
          )}
        </NavLink>
      ))}
    </nav>
  )
}

export default function Sidebar() {
  const navigate = useNavigate()

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to log out?')) {
      navigate('/')
    }
  }

  return (
    <aside className="hidden lg:flex lg:flex-col w-64 shrink-0 bg-[#12121a] text-slate-300 sticky top-0 h-screen select-none border-r border-white/5">
      {/* Brand Header */}
      <div className="flex items-center gap-3.5 px-6 pt-5 pb-6">
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

      {/* Nav List */}
      <SidebarNav />

      {/* Logout at bottom */}
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
  )
}
