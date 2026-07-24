// import { useState } from "react";
// import { Outlet } from "react-router-dom";
// import Sidebar from "../components/common/Sidebar";
// import Topbar from "../components/common/Topbar";

// export default function DashboardLayout() {
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   return (
//     <div className="flex min-h-screen bg-paper font-body">
//       <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

//       <div className="flex min-h-screen flex-1 flex-col">
//         <Topbar onMenuClick={() => setSidebarOpen(true)} />
//         <main className="flex-1 px-6 md:px-8 py-6">
//           <Outlet />
//         </main>
//       </div>
//     </div>
//   );
// }

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