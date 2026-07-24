import {
  User,
  Shield,
  Building2,
  GraduationCap,
  Bell,
  MonitorCog,
} from "lucide-react";

const menuItems = [
  {
    id: "profile",
    label: "Profile",
    icon: User,
  },
  {
    id: "security",
    label: "Security",
    icon: Shield,
  },
  {
    id: "organization",
    label: "Organization",
    icon: Building2,
  },
  {
    id: "internship",
    label: "Internship",
    icon: GraduationCap,
  },
  {
    id: "notifications",
    label: "Notifications",
    icon: Bell,
  },
  {
    id: "system",
    label: "System",
    icon: MonitorCog,
  },
];

const SettingsSidebar = ({ activeTab, setActiveTab }) => {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      <h2 className="mb-5 text-lg font-semibold text-gray-800">
        Settings Menu
      </h2>

      <div className="space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left transition-all duration-200 ${
                activeTab === item.id
                  ? "bg-[#2F6E5F] text-white shadow-md"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <Icon size={20} />

              <span className="font-medium">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default SettingsSidebar;