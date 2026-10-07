import { useLocation, useNavigate } from 'react-router-dom'
import Icon from '../ui/Icon.jsx'
import { pageMeta } from '../../utils/navigation.js'
import { notifications, company } from '../../services/mockData.js'
import { useDropdown } from '../../hooks/useDropdown.js'
import { useUI } from '../../store/UIContext.jsx'

const notifTones = {
  brand: 'bg-brand-50 text-brand-600',
  amber: 'bg-amber-50 text-amber-600',
  emerald: 'bg-emerald-50 text-emerald-600',
}

function renderNotifText(text) {
  // supports **bold** markers from mock data without pulling in a markdown lib
  const parts = text.split(/\*\*(.*?)\*\*/g)
  return parts.map((part, i) => (i % 2 === 1 ? <b key={i}>{part}</b> : part))
}

export default function Header() {
  const location = useLocation()
  const navigate = useNavigate()
  const { openMobileSidebar } = useUI()
  const [notifOpen, toggleNotif, notifRef] = useDropdown()
  const [profileOpen, toggleProfile, profileRef] = useDropdown()

  const [title, subtitle] = pageMeta[location.pathname] || pageMeta['/']

  return (
    <header className="h-16 sticky top-0 z-30 bg-white shadow-nav flex items-center gap-4 px-4 lg:px-8">
      <button onClick={openMobileSidebar} className="lg:hidden text-slate-500">
        <Icon name="menu" className="w-6 h-6" />
      </button>

      <div className="hidden sm:block">
        <h1 className="font-display font-bold text-lg text-ink leading-none">{title}</h1>
        <p className="text-[13px] text-slate-400 mt-1">{subtitle}</p>
      </div>

      {/* Search */}
      <div className="flex-1 max-w-md ml-auto">
        <div className="relative">
          <Icon name="search" className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search students, internships, applications…"
            className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl bg-mist border border-transparent focus:border-brand-300 focus:bg-white focus:ring-4 focus:ring-brand-100 outline-none transition placeholder:text-slate-400"
          />
        </div>
      </div>

      {/* Notifications */}
      <div className="relative" ref={notifRef}>
        <button
          onClick={toggleNotif}
          className="relative w-10 h-10 rounded-xl flex items-center justify-center text-slate-500 hover:bg-mist transition"
        >
          <Icon name="bell" className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-white" />
        </button>
        <div
          className={`absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-card border border-slate-100 overflow-hidden ${
            notifOpen ? '' : 'hidden'
          }`}
        >
          <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between">
            <p className="font-display font-semibold text-sm">Notifications</p>
            <span className="text-[11px] font-medium text-brand-600 bg-brand-50 px-2 py-0.5 rounded-full">3 new</span>
          </div>
          <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
            {notifications.map((n, i) => (
              <a key={i} href="#" className="flex gap-3 px-4 py-3 hover:bg-mist transition">
                <span className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${notifTones[n.tone]}`}>
                  <Icon name={n.icon} className="w-4 h-4" />
                </span>
                <span>
                  <span className="text-sm text-ink block leading-snug">{renderNotifText(n.text)}</span>
                  <span className="text-[12px] text-slate-400">{n.time}</span>
                </span>
              </a>
            ))}
          </div>
          <a href="#" className="block text-center text-sm font-medium text-brand-600 py-2.5 hover:bg-mist transition">
            View all notifications
          </a>
        </div>
      </div>

      {/* Profile dropdown */}
      <div className="relative" ref={profileRef}>
        <button onClick={toggleProfile} className="flex items-center gap-2.5 pl-2 pr-1 py-1 rounded-xl hover:bg-mist transition">
          <img src="/rid-logo.jpg" className="w-[34px] h-[34px] rounded-lg object-cover ring-2 ring-brand-100" alt="RID Tech" />
          <span className="hidden md:block text-left leading-tight">
            <span className="block text-sm font-semibold text-ink">RID Tech</span>
            <span className="block text-[11px] text-slate-400">Research to Reality</span>
          </span>
          <Icon name="chevronDown" className="w-4 h-4 text-slate-400 hidden md:block" />
        </button>
        <div
          className={`absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-card border border-slate-100 overflow-hidden text-sm ${
            profileOpen ? '' : 'hidden'
          }`}
        >
          <div className="px-4 py-3 border-b border-slate-100">
            <p className="font-semibold text-ink">{company.name}</p>
            <p className="text-[12px] text-slate-400">{company.email}</p>
          </div>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault()
              toggleProfile()
              navigate('/profile')
            }}
            className="flex items-center gap-2.5 px-4 py-2.5 hover:bg-mist transition text-slate-600"
          >
            <Icon name="profile" className="w-4 h-4" />
            Company Profile
          </a>
          <a href="#" className="flex items-center gap-2.5 px-4 py-2.5 hover:bg-mist transition text-slate-600">
            <Icon name="settings" className="w-4 h-4" />
            Settings
          </a>
          <hr className="border-slate-100" />
          <a href="#" className="flex items-center gap-2.5 px-4 py-2.5 hover:bg-rose-50 transition text-rose-600">
            <Icon name="logout" className="w-4 h-4" />
            Log out
          </a>
        </div>
      </div>
    </header>
  )
}
