import { Shield, Lock, KeyRound, Bell, Clock } from "lucide-react";

const SecuritySettings = () => {
  return (
    <div className="space-y-8">
      {/* ================= HEADER ================= */}

      <div>
        <h2 className="text-2xl font-bold text-gray-800">
          Security Settings
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Manage your account security and authentication preferences.
        </p>
      </div>

      {/* ================= CHANGE PASSWORD ================= */}

      <div className="rounded-xl border border-gray-200 p-6">
        <div className="mb-5 flex items-center gap-2">
          <Lock className="text-[#2F6E5F]" />
          <h3 className="text-lg font-semibold">Change Password</h3>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <input
            type="password"
            placeholder="Current Password"
            className="rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-[#2F6E5F]"
          />

          <input
            type="password"
            placeholder="New Password"
            className="rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-[#2F6E5F]"
          />

          <input
            type="password"
            placeholder="Confirm Password"
            className="rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-[#2F6E5F]"
          />
        </div>
      </div>

      {/* ================= SECURITY OPTIONS ================= */}

      <div className="rounded-xl border border-gray-200 p-6 space-y-5">
        <h3 className="text-lg font-semibold">Security Options</h3>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Shield className="text-[#2F6E5F]" />
            <div>
              <p className="font-medium">Two-Factor Authentication</p>
              <p className="text-sm text-gray-500">
                Add an extra layer of security.
              </p>
            </div>
          </div>

          <input type="checkbox" className="h-5 w-5" defaultChecked />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Bell className="text-[#2F6E5F]" />
            <div>
              <p className="font-medium">Login Alerts</p>
              <p className="text-sm text-gray-500">
                Receive email notifications for new logins.
              </p>
            </div>
          </div>

          <input type="checkbox" className="h-5 w-5" defaultChecked />
        </div>
      </div>

      {/* ================= SESSION SETTINGS ================= */}

      <div className="rounded-xl border border-gray-200 p-6">
        <div className="mb-5 flex items-center gap-2">
          <Clock className="text-[#2F6E5F]" />
          <h3 className="text-lg font-semibold">Session Settings</h3>
        </div>

        <label className="mb-2 block text-sm font-medium">
          Session Timeout
        </label>

        <select className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-[#2F6E5F]">
          <option>15 Minutes</option>
          <option>30 Minutes</option>
          <option>1 Hour</option>
          <option>2 Hours</option>
          <option>Never</option>
        </select>
      </div>

      {/* ================= ACTIVE DEVICES ================= */}

      <div className="rounded-xl border border-gray-200 p-6">
        <div className="mb-5 flex items-center gap-2">
          <KeyRound className="text-[#2F6E5F]" />
          <h3 className="text-lg font-semibold">Active Login Session</h3>
        </div>

        <div className="rounded-lg border bg-gray-50 p-4">
          <p className="font-medium">Windows 10 • Chrome Browser</p>

          <p className="text-sm text-gray-500 mt-1">
            Last Active: Today at 10:45 AM
          </p>
        </div>
      </div>

      {/* ================= SAVE BUTTON ================= */}

      <div className="flex justify-end">
        <button className="rounded-lg bg-[#2F6E5F] px-6 py-3 font-medium text-white transition hover:bg-[#24584b]">
          Save Security Settings
        </button>
      </div>
    </div>
  );
};

export default SecuritySettings;