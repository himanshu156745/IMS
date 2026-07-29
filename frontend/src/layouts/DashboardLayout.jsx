

import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/common/Sidebar";
import Topbar from "../components/common/Topbar";

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-paper font-body">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex min-h-screen min-w-0 flex-1 flex-col">
        <Topbar onMenuClick={() => setSidebarOpen(true)} />
        <main className="flex-1 overflow-x-hidden px-6 md:px-8 py-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}


// import { useState } from "react";
// import { Outlet, useLocation } from "react-router-dom";
// import Sidebar from "../components/common/Sidebar";
// import Topbar from "../components/common/Topbar";

// const TITLE_MAP = {
//   "/admin": {
//     title: "Dashboard",
//     subtitle: "Your internship ecosystem at a glance.",
//   },
//   "/admin/students": {
//     title: "Manage Students",
//     subtitle: "Monitor all registered students, internship applications, profile verification and hiring progress.",
//   },
//   "/admin/companies": {
//     title: "Manage Companies",
//     subtitle: "Manage all registered companies, monitor internship activities and control company access.",
//   },
//   "/admin/faculty": {
//     title: "Manage Faculty",
//     subtitle: "View, add and manage faculty mentors, their departments, subjects and assigned students.",
//   },
//   "/admin/internships": {
//     title: "Manage Internships",
//     subtitle: "View, organize and monitor all internship opportunities.",
//   },
//   "/admin/applications": {
//     title: "View Applications",
//     subtitle: "Review, manage and track all internship applications submitted by students.",
//   },
//   "/admin/reports": {
//     title: "Report & Analytics",
//     subtitle: "Monitor internship projects, team performance and weekly reports.",
//   },
//   "/admin/settings": {
//     title: "Settings",
//     subtitle: "Configure your Internship Management System.",
//   },
// };

// export default function DashboardLayout() {
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const location = useLocation();

//   const current = TITLE_MAP[location.pathname] || { title: "Admin Console", subtitle: "Manage students, faculty and internships" };

//   return (
//     <div className="flex min-h-screen bg-paper font-body">
//       <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

//       <div className="flex min-h-screen min-w-0 flex-1 flex-col">
//         <Topbar onMenuClick={() => setSidebarOpen(true)} title={current.title} subtitle={current.subtitle} />
//         <main className="flex-1 overflow-x-hidden px-6 md:px-8 py-6">
//           <Outlet />
//         </main>
//       </div>
//     </div>
//   );
// }