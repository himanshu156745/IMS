import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

const titleMap = {
  "/": "Dashboard",
  "/my-students": "My Students",
  "/student-report": "Student Report",
  "/attendance": "Attendance",
  "/feedback": "Feedback",
  "/performance": "Performance",
};

export default function FacultyLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const baseTitle = "/" + (location.pathname.split("/")[1] || "");
  const title = titleMap[baseTitle] || "Faculty Portal";

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex min-h-screen flex-1 flex-col">
        <Topbar onMenuClick={() => setSidebarOpen(true)} title={title} />
        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}