import { Bell, Mail, Calendar, FileText, Briefcase } from "lucide-react";
import { notificationSettings } from "../data/settingsData";

const notifications = [
  {
    title: "Email Notifications",
    description: "Receive important updates via email.",
    icon: Mail,
    enabled: notificationSettings.emailNotifications,
  },
  {
    title: "Application Alerts",
    description: "Notify when a new internship application is received.",
    icon: Briefcase,
    enabled: notificationSettings.applicationAlerts,
  },
  {
    title: "Interview Reminders",
    description: "Receive reminders for upcoming interviews.",
    icon: Calendar,
    enabled: notificationSettings.interviewReminder,
  },
  {
    title: "Weekly Reports",
    description: "Get weekly internship performance reports.",
    icon: FileText,
    enabled: notificationSettings.weeklyReports,
  },
  {
    title: "Deadline Reminders",
    description: "Receive reminders before important deadlines.",
    icon: Bell,
    enabled: notificationSettings.deadlineReminder,
  },
];

const NotificationSettings = () => {
  return (
    <div className="space-y-8">
      {/* ================= HEADER ================= */}

      <div>
        <h2 className="text-2xl font-bold text-gray-800">
          Notification Settings
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Control which notifications administrators receive.
        </p>
      </div>

      {/* ================= NOTIFICATION LIST ================= */}

      <div className="space-y-4">
        {notifications.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="flex items-center justify-between rounded-xl border border-gray-200 p-5 hover:shadow-sm transition"
            >
              <div className="flex items-center gap-4">
                <div className="rounded-lg bg-[#2F6E5F]/10 p-3">
                  <Icon className="text-[#2F6E5F]" size={22} />
                </div>

                <div>
                  <h3 className="font-semibold text-gray-800">
                    {item.title}
                  </h3>

                  <p className="text-sm text-gray-500">
                    {item.description}
                  </p>
                </div>
              </div>

              {/* Toggle */}

              <label className="relative inline-flex cursor-pointer items-center">
                <input
                  type="checkbox"
                  defaultChecked={item.enabled}
                  className="peer sr-only"
                />

                <div className="peer h-6 w-11 rounded-full bg-gray-300 transition-all peer-checked:bg-[#2F6E5F] after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all peer-checked:after:translate-x-5"></div>
              </label>
            </div>
          );
        })}
      </div>

      {/* ================= SAVE BUTTON ================= */}

      <div className="flex justify-end">
        <button className="rounded-lg bg-[#2F6E5F] px-6 py-3 font-medium text-white transition hover:bg-[#24584b]">
          Save Notification Settings
        </button>
      </div>
    </div>
  );
};

export default NotificationSettings;