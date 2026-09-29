import {
  Monitor,
  Globe,
  Clock,
  CalendarDays,
  Database,
  HardDrive,
  ShieldCheck,
  Info,
} from "lucide-react";

import {
  systemSettings,
  dataManagement,
  aboutSystem,
} from "../data/settingsData";

const SystemSettings = () => {
  return (
    <div className="space-y-8">
      {/* ================= HEADER ================= */}

      <div>
        <h2 className="text-2xl font-bold text-gray-800">
          System Settings
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Configure system preferences, monitor application health, and view
          application information.
        </p>
      </div>

      {/* ================= SYSTEM PREFERENCES ================= */}

      <div className="rounded-xl border border-gray-200 p-6">
        <h3 className="mb-6 text-lg font-semibold">
          System Preferences
        </h3>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Theme */}

          <div>
            <label className="mb-2 flex items-center gap-2 text-sm font-medium">
              <Monitor size={16} />
              Theme
            </label>

            <select
              defaultValue={systemSettings.theme}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-[#2F6E5F]"
            >
              <option>Light</option>
              <option>Dark</option>
              <option>System</option>
            </select>
          </div>

          {/* Language */}

          <div>
            <label className="mb-2 flex items-center gap-2 text-sm font-medium">
              <Globe size={16} />
              Language
            </label>

            <select
              defaultValue={systemSettings.language}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-[#2F6E5F]"
            >
              <option>English</option>
              <option>Hindi</option>
            </select>
          </div>

          {/* Timezone */}

          <div>
            <label className="mb-2 flex items-center gap-2 text-sm font-medium">
              <Clock size={16} />
              Time Zone
            </label>

            <input
              type="text"
              defaultValue={systemSettings.timezone}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-[#2F6E5F]"
            />
          </div>

          {/* Date Format */}

          <div>
            <label className="mb-2 flex items-center gap-2 text-sm font-medium">
              <CalendarDays size={16} />
              Date Format
            </label>

            <select
              defaultValue={systemSettings.dateFormat}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-[#2F6E5F]"
            >
              <option>DD/MM/YYYY</option>
              <option>MM/DD/YYYY</option>
              <option>YYYY-MM-DD</option>
            </select>
          </div>
        </div>

        {/* Maintenance Mode */}

        <div className="mt-8 flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 p-4">
          <div>
            <h4 className="font-semibold">Maintenance Mode</h4>
            <p className="text-sm text-gray-500">
              Enable maintenance mode to temporarily disable access.
            </p>
          </div>

          <label className="relative inline-flex cursor-pointer items-center">
            <input
              type="checkbox"
              defaultChecked={systemSettings.maintenanceMode}
              className="peer sr-only"
            />

            <div className="peer h-6 w-11 rounded-full bg-gray-300 transition peer-checked:bg-[#2F6E5F] after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition peer-checked:after:translate-x-5"></div>
          </label>
        </div>
      </div>

      {/* ================= DATA MANAGEMENT ================= */}

      <div className="rounded-xl border border-gray-200 p-6">
        <h3 className="mb-6 text-lg font-semibold">
          Data Management
        </h3>

        <div className="grid gap-5 md:grid-cols-2">
          <div className="rounded-lg bg-gray-50 p-4">
            <div className="mb-2 flex items-center gap-2">
              <Database className="text-[#2F6E5F]" size={18} />
              <h4 className="font-semibold">Database Status</h4>
            </div>

            <p>{dataManagement.databaseStatus}</p>
          </div>

          <div className="rounded-lg bg-gray-50 p-4">
            <div className="mb-2 flex items-center gap-2">
              <HardDrive className="text-[#2F6E5F]" size={18} />
              <h4 className="font-semibold">Last Backup</h4>
            </div>

            <p>{dataManagement.lastBackup}</p>
            <p className="text-sm text-gray-500">
              Size: {dataManagement.backupSize}
            </p>
          </div>

          <div className="rounded-lg bg-gray-50 p-4 md:col-span-2">
            <div className="mb-2 flex items-center gap-2">
              <ShieldCheck className="text-[#2F6E5F]" size={18} />
              <h4 className="font-semibold">Cache Status</h4>
            </div>

            <p>{dataManagement.cacheStatus}</p>
          </div>
        </div>

        <div className="mt-6 flex gap-4">
          <button className="rounded-lg bg-[#2F6E5F] px-5 py-3 text-white transition hover:bg-[#24584b]">
            Backup Now
          </button>

          <button className="rounded-lg border border-gray-300 px-5 py-3 transition hover:bg-gray-100">
            Clear Cache
          </button>
        </div>
      </div>

      {/* ================= ABOUT SYSTEM ================= */}

      <div className="rounded-xl border border-gray-200 p-6">
        <div className="mb-6 flex items-center gap-2">
          <Info className="text-[#2F6E5F]" />
          <h3 className="text-lg font-semibold">
            About System
          </h3>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <InfoRow label="Application" value={aboutSystem.appName} />
          <InfoRow label="Version" value={aboutSystem.version} />
          <InfoRow label="Company" value={aboutSystem.company} />
          <InfoRow label="Frontend" value={aboutSystem.frontend} />
          <InfoRow label="Backend" value={aboutSystem.backend} />
          <InfoRow label="Database" value={aboutSystem.database} />
        </div>
      </div>

      {/* ================= SAVE BUTTON ================= */}

      <div className="flex justify-end">
        <button className="rounded-lg bg-[#2F6E5F] px-6 py-3 font-medium text-white transition hover:bg-[#24584b]">
          Save System Settings
        </button>
      </div>
    </div>
  );
};

const InfoRow = ({ label, value }) => (
  <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
    <p className="text-sm text-gray-500">{label}</p>
    <p className="mt-1 font-semibold text-gray-800">{value}</p>
  </div>
);

export default SystemSettings;