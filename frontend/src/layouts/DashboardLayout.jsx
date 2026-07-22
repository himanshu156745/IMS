import { Outlet } from "react-router-dom";
import Sidebar from "../components/common/Sidebar";
import Topbar from "../components/common/Topbar";

/**
 * Shared shell for every role dashboard.
 * Each page renders its own <PageHeader /> inside <Outlet />,
 * so this layout only owns the sidebar + global topbar chrome.
 */
export default function DashboardLayout() {
  return (
    <div className="min-h-screen bg-paper font-body">
      <Sidebar />
      <div className="md:pl-60 flex flex-col min-h-screen">
        <Topbar />
        <main className="flex-1 px-6 md:px-8 py-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}