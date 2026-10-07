import { Outlet, useLocation } from 'react-router-dom'
import Sidebar from '../components/common/Sidebar.jsx'
import MobileSidebar from '../components/common/MobileSidebar.jsx'
import Header from '../components/common/Header.jsx'
import { UIProvider } from '../store/UIContext.jsx'

export default function DashboardLayout() {
  const location = useLocation()

  return (
    <UIProvider>
      <div className="min-h-screen flex">
        <Sidebar />
        <MobileSidebar />

        <div className="flex-1 min-w-0 flex flex-col">
          <Header />
          <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-[1400px] w-full mx-auto">
            <div className="page-enter" key={location.pathname}>
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </UIProvider>
  )
}
