// import { useState } from "react";
// import { Settings } from "lucide-react";

// import SettingsSidebar from "./components/SettingsSidebar";
// import ProfileSettings from "./components/ProfileSettings";
// import SecuritySettings from "./components/SecuritySettings";
// import OrganizationSettings from "./components/OrganizationSettings";
// import InternshipSettings from "./components/InternshipSettings";
// import NotificationSettings from "./components/NotificationSettings";
// import SystemSettings from "./components/SystemSettings";

// const AdminSettings = () => {
//   const [activeTab, setActiveTab] = useState("profile");

//   const renderContent = () => {
//     switch (activeTab) {
//       case "profile":
//         return <ProfileSettings />;

//       case "security":
//         return <SecuritySettings />;

//       case "organization":
//         return <OrganizationSettings />;

//       case "internship":
//         return <InternshipSettings />;

//       case "notifications":
//         return <NotificationSettings />;

//       case "system":
//         return <SystemSettings />;

//       default:
//         return <ProfileSettings />;
//     }
//   };

//   return (
//     <div className="space-y-6">
//       {/* ================= HEADER ================= */}

//       <div className="flex items-center justify-between">
//         <div>
//           <h1 className="flex items-center gap-3 text-3xl font-bold text-gray-800">
//             <Settings className="text-[#2F6E5F]" size={32} />
//             Settings
//           </h1>

//           <p className="mt-2 text-gray-500">
//             Configure your Internship Management System.
//           </p>
//         </div>
//       </div>

//       {/* ================= CONTENT ================= */}

//       <div className="grid gap-6 lg:grid-cols-4">
//         {/* Sidebar */}

//         <div className="lg:col-span-1">
//           <SettingsSidebar
//             activeTab={activeTab}
//             setActiveTab={setActiveTab}
//           />
//         </div>

//         {/* Right Content */}

//         <div className="lg:col-span-3">
//           <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
//             {renderContent()}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminSettings;


import { useEffect, useState } from "react";
import SettingsSkeleton from "./components/SettingsSkeleton";
import { Settings } from "lucide-react";

import SettingsSidebar from "./components/SettingsSidebar";
import ProfileSettings from "./components/ProfileSettings";
import SecuritySettings from "./components/SecuritySettings";
import OrganizationSettings from "./components/OrganizationSettings";
import InternshipSettings from "./components/InternshipSettings";
import NotificationSettings from "./components/NotificationSettings";
import SystemSettings from "./components/SystemSettings";

const AdminSettings = () => {
   // ✅ Yahin state hogi
  const [activeTab, setActiveTab] = useState("profile");
  const [initialLoading, setInitialLoading] = useState(true);

  // ✅ Yahin useEffect hoga
  useEffect(() => {
    const timer = setTimeout(() => {
      setInitialLoading(false);
    }, 600);

    return () => clearTimeout(timer);
  }, []);

  // ✅ Skeleton check
  if (initialLoading) {
    return <SettingsSkeleton />;
  }
  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return <ProfileSettings />;

      case "security":
        return <SecuritySettings />;

      case "organization":
        return <OrganizationSettings />;

      case "internship":
        return <InternshipSettings />;

      case "notifications":
        return <NotificationSettings />;

      case "system":
        return <SystemSettings />;

      default:
        return <ProfileSettings />;
    }
  };
  
  return (
    <div className="space-y-6">
      {/* ================= HEADER ================= */}

      <div className="flex items-center justify-between">
        <div>
          <h1 className="flex items-center gap-3 text-3xl font-bold text-gray-800">
            <Settings className="text-[#2F6E5F]" size={32} />
            Settings
          </h1>

          <p className="mt-2 text-gray-500">
            Configure your Internship Management System.
          </p>
        </div>
      </div>

      {/* ================= CONTENT ================= */}
      {/* items-start lets the sidebar stick while the right column scrolls independently.
          No outer card wrapper here — ProfileSettings (and the other tab components)
          already render their own section cards, so wrapping again just doubles the box. */}

      <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[300px_1fr]">
        {/* Sidebar */}

        <SettingsSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Right Content */}

        <div className="min-w-0">{renderContent()}</div>
      </div>
    </div>
  );
};

export default AdminSettings;