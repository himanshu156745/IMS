// import {
//   User,
//   Shield,
//   Building2,
//   GraduationCap,
//   Bell,
//   MonitorCog,
// } from "lucide-react";

// const menuItems = [
//   {
//     id: "profile",
//     label: "Profile",
//     icon: User,
//   },
//   {
//     id: "security",
//     label: "Security",
//     icon: Shield,
//   },
//   {
//     id: "organization",
//     label: "Organization",
//     icon: Building2,
//   },
//   {
//     id: "internship",
//     label: "Internship",
//     icon: GraduationCap,
//   },
//   {
//     id: "notifications",
//     label: "Notifications",
//     icon: Bell,
//   },
//   {
//     id: "system",
//     label: "System",
//     icon: MonitorCog,
//   },
// ];

// const SettingsSidebar = ({ activeTab, setActiveTab }) => {
//   return (
//     <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
//       <h2 className="mb-5 text-lg font-semibold text-gray-800">
//         Settings Menu
//       </h2>

//       <div className="space-y-2">
//         {menuItems.map((item) => {
//           const Icon = item.icon;

//           return (
//             <button
//               key={item.id}
//               onClick={() => setActiveTab(item.id)}
//               className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left transition-all duration-200 ${
//                 activeTab === item.id
//                   ? "bg-[#2F6E5F] text-white shadow-md"
//                   : "text-gray-700 hover:bg-gray-100"
//               }`}
//             >
//               <Icon size={20} />

//               <span className="font-medium">
//                 {item.label}
//               </span>
//             </button>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default SettingsSidebar;


// import {
//   User,
//   Shield,
//   Building2,
//   GraduationCap,
//   Bell,
//   MonitorCog,
//   HelpCircle,
//   ChevronRight,
// } from "lucide-react";

// const menuItems = [
//   {
//     id: "profile",
//     label: "Profile",
//     description: "Personal information",
//     icon: User,
//   },
//   {
//     id: "security",
//     label: "Security",
//     description: "Password & authentication",
//     icon: Shield,
//   },
//   {
//     id: "organization",
//     label: "Organization",
//     description: "Company details",
//     icon: Building2,
//   },
//   {
//     id: "internship",
//     label: "Internship",
//     description: "Internship preferences",
//     icon: GraduationCap,
//   },
//   {
//     id: "notifications",
//     label: "Notifications",
//     description: "Alerts & emails",
//     icon: Bell,
//   },
//   {
//     id: "system",
//     label: "System",
//     description: "Application settings",
//     icon: MonitorCog,
//   },
// ];

// export default function SettingsSidebar({
//   activeTab,
//   setActiveTab,
// }) {
//   return (
//     <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">

//       <div className="mb-6">
//         <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">
//           SETTINGS
//         </p>

//         <h2 className="mt-2 text-2xl font-bold text-gray-900">
//           Preferences
//         </h2>

//         <p className="mt-1 text-sm text-gray-500">
//           Manage your account and system configuration.
//         </p>
//       </div>

//       <div className="space-y-2">

//         {menuItems.map((item) => {
//           const Icon = item.icon;

//           const active = activeTab === item.id;

//           return (
//             <button
//               key={item.id}
//               onClick={() => setActiveTab(item.id)}
//               className={`group flex w-full items-center justify-between rounded-2xl border p-4 transition-all duration-300 ${
//                 active
//                   ? "border-[#2F6E5F] bg-[#2F6E5F] text-white shadow-lg"
//                   : "border-transparent hover:border-gray-200 hover:bg-gray-50"
//               }`}
//             >
//               <div className="flex items-center gap-4">

//                 <div
//                   className={`flex h-11 w-11 items-center justify-center rounded-xl ${
//                     active
//                       ? "bg-white/20"
//                       : "bg-[#2F6E5F]/10 text-[#2F6E5F]"
//                   }`}
//                 >
//                   <Icon size={20} />
//                 </div>

//                 <div className="text-left">

//                   <h3 className="font-semibold">
//                     {item.label}
//                   </h3>

//                   <p
//                     className={`text-xs ${
//                       active
//                         ? "text-white/80"
//                         : "text-gray-500"
//                     }`}
//                   >
//                     {item.description}
//                   </p>
//                 </div>
//               </div>

//               <ChevronRight
//                 size={18}
//                 className={`transition ${
//                   active
//                     ? "text-white"
//                     : "text-gray-400 group-hover:translate-x-1"
//                 }`}
//               />
//             </button>
//           );
//         })}
//       </div>

//       <div className="mt-8 rounded-2xl bg-[#F8FAFC] p-5">

//         <div className="flex items-center gap-3">

//           <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#2F6E5F]/10">
//             <HelpCircle
//               size={20}
//               className="text-[#2F6E5F]"
//             />
//           </div>

//           <div>

//             <h4 className="font-semibold text-gray-900">
//               Need Help?
//             </h4>

//             <p className="text-xs text-gray-500">
//               Read our documentation.
//             </p>

//           </div>
//         </div>

//         <button className="mt-4 w-full rounded-xl bg-[#2F6E5F] py-2.5 text-sm font-medium text-white transition hover:bg-[#24584b]">
//           View Documentation
//         </button>

//       </div>
//     </div>
//   );
// }


import {
  User,
  Shield,
  Building2,
  GraduationCap,
  Bell,
  MonitorCog,
  HelpCircle,
  ArrowUpRight,
  ShieldCheck,
} from "lucide-react";

const menuGroups = [
  {
    label: "Account",
    items: [
      { id: "profile", label: "Profile", description: "Personal information", icon: User },
      { id: "security", label: "Security", description: "Password & authentication", icon: Shield },
    ],
  },
  {
    label: "Workspace",
    items: [
      { id: "organization", label: "Organization", description: "Company details", icon: Building2 },
      { id: "internship", label: "Internship", description: "Internship preferences", icon: GraduationCap },
    ],
  },
  {
    label: "System",
    items: [
      { id: "notifications", label: "Notifications", description: "Alerts & emails", icon: Bell },
      { id: "system", label: "System", description: "Application settings", icon: MonitorCog },
    ],
  },
];

export default function SettingsSidebar({ activeTab, setActiveTab }) {
  return (
    <div className="sticky top-6 flex flex-col gap-4">
      <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
        <p className="px-1 text-[11px] font-semibold uppercase tracking-widest text-gray-400">
          Settings
        </p>
        <h2 className="mt-1 px-1 text-xl font-bold text-gray-900">Preferences</h2>

        <nav className="mt-5 flex flex-col gap-5">
          {menuGroups.map((group) => (
            <div key={group.label}>
              <p className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-wide text-gray-400">
                {group.label}
              </p>

              <div className="flex flex-col gap-1">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const active = activeTab === item.id;

                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      aria-current={active ? "page" : undefined}
                      className={`group relative flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors duration-150 ${
                        active
                          ? "bg-[#2F6E5F]/[0.08] text-[#2F6E5F]"
                          : "text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      <span
                        className={`absolute left-0 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-full transition-all duration-150 ${
                          active ? "bg-[#2F6E5F]" : "bg-transparent"
                        }`}
                      />

                      <span
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-colors ${
                          active
                            ? "bg-[#2F6E5F] text-white"
                            : "bg-gray-100 text-gray-500 group-hover:bg-gray-200"
                        }`}
                      >
                        <Icon size={17} />
                      </span>

                      <span className="min-w-0">
                        <span
                          className={`block truncate text-sm font-semibold ${
                            active ? "text-[#2F6E5F]" : "text-gray-800"
                          }`}
                        >
                          {item.label}
                        </span>
                        <span className="block truncate text-xs text-gray-400">
                          {item.description}
                        </span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>
      </div>

      {/* Account status - keeps the column from ending on empty white space */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
        <div className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#2F6E5F]/10 text-[#2F6E5F]">
            <ShieldCheck size={16} />
          </span>
          <div>
            <p className="text-sm font-semibold text-gray-900">Account verified</p>
            <p className="text-xs text-gray-400">Last login 2 hours ago</p>
          </div>
        </div>

        <div className="mt-4 space-y-2 border-t border-gray-100 pt-4 text-xs">
          <div className="flex items-center justify-between">
            <span className="text-gray-400">Two-factor auth</span>
            <span className="font-medium text-[#2F6E5F]">Enabled</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-400">Password updated</span>
            <span className="font-medium text-gray-700">32 days ago</span>
          </div>
        </div>
      </div>

      <div className="rounded-2xl bg-[#F4FAF8] p-5">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-[#2F6E5F] shadow-sm">
            <HelpCircle size={18} />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-gray-900">Need help?</h4>
            <p className="mt-0.5 text-xs leading-relaxed text-gray-500">
              Read the setup docs or reach support for account and system issues.
            </p>
          </div>
        </div>

        <button className="mt-4 flex w-full items-center justify-center gap-1.5 rounded-xl border border-[#2F6E5F]/20 bg-white py-2.5 text-sm font-medium text-[#2F6E5F] transition hover:bg-[#2F6E5F] hover:text-white">
          View documentation
          <ArrowUpRight size={15} />
        </button>
      </div>
    </div>
  );
}