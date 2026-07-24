import {
  CalendarDays,
  Clock,
  Briefcase,
  Users,
  Code2,
} from "lucide-react";
import { internshipSettings } from "../data/settingsData";

const InternshipSettings = () => {
  return (
    <div className="space-y-8">
      {/* ================= HEADER ================= */}

      <div>
        <h2 className="text-2xl font-bold text-gray-800">
          Internship Settings
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Configure internship preferences, work schedule, and available
          domains.
        </p>
      </div>

      {/* ================= BASIC SETTINGS ================= */}

      <div className="grid gap-6 md:grid-cols-2">
        {/* Internship Duration */}

        <div>
          <label className="mb-2 flex items-center gap-2 text-sm font-medium">
            <CalendarDays size={16} />
            Internship Duration
          </label>

          <select
            defaultValue={internshipSettings.internshipDuration}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-[#2F6E5F]"
          >
            <option>1 Month</option>
            <option>2 Months</option>
            <option>3 Months</option>
            <option>6 Months</option>
            <option>12 Months</option>
          </select>
        </div>

        {/* Work Mode */}

        <div>
          <label className="mb-2 flex items-center gap-2 text-sm font-medium">
            <Briefcase size={16} />
            Work Mode
          </label>

          <select
            defaultValue={internshipSettings.workMode}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-[#2F6E5F]"
          >
            <option>On-site</option>
            <option>Remote</option>
            <option>Hybrid</option>
          </select>
        </div>

        {/* Office Timing */}

        <div>
          <label className="mb-2 flex items-center gap-2 text-sm font-medium">
            <Clock size={16} />
            Office Timing
          </label>

          <input
            type="text"
            defaultValue={internshipSettings.officeTiming}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-[#2F6E5F]"
          />
        </div>

        {/* Working Days */}

        <div>
          <label className="mb-2 flex items-center gap-2 text-sm font-medium">
            <CalendarDays size={16} />
            Working Days
          </label>

          <input
            type="text"
            defaultValue={internshipSettings.workingDays}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-[#2F6E5F]"
          />
        </div>

        {/* Maximum Interns */}

        <div>
          <label className="mb-2 flex items-center gap-2 text-sm font-medium">
            <Users size={16} />
            Maximum Interns
          </label>

          <input
            type="number"
            defaultValue={internshipSettings.maxInterns}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-[#2F6E5F]"
          />
        </div>
      </div>

      {/* ================= AVAILABLE DOMAINS ================= */}

      <div className="rounded-xl border border-gray-200 p-6">
        <h3 className="mb-5 flex items-center gap-2 text-lg font-semibold">
          <Code2 className="text-[#2F6E5F]" />
          Available Internship Domains
        </h3>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {internshipSettings.domains.map((domain) => (
            <label
              key={domain}
              className="flex items-center gap-3 rounded-lg border border-gray-200 bg-gray-50 p-3 cursor-pointer hover:bg-gray-100"
            >
              <input
                type="checkbox"
                defaultChecked
                className="h-4 w-4 accent-[#2F6E5F]"
              />
              <span>{domain}</span>
            </label>
          ))}
        </div>
      </div>

      {/* ================= SAVE BUTTON ================= */}

      <div className="flex justify-end">
        <button className="rounded-lg bg-[#2F6E5F] px-6 py-3 font-medium text-white transition hover:bg-[#24584b]">
          Save Internship Settings
        </button>
      </div>
    </div>
  );
};

export default InternshipSettings;