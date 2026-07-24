import { Camera, Mail, Phone, Briefcase, Building2, IdCard } from "lucide-react";
import { profileData } from "../data/settingsData";

const ProfileSettings = () => {
  return (
    <div className="space-y-8">
      {/* ================= HEADER ================= */}

      <div>
        <h2 className="text-2xl font-bold text-gray-800">
          Profile Settings
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Update your administrator profile information.
        </p>
      </div>

      {/* ================= PROFILE CARD ================= */}

      <div className="flex flex-col items-center gap-5 rounded-xl border border-gray-200 bg-gray-50 p-6 lg:flex-row">

        <div className="flex h-28 w-28 items-center justify-center rounded-full bg-[#2F6E5F] text-4xl font-bold text-white">
          {profileData.fullName.charAt(0)}
        </div>

        <div className="flex-1">
          <h3 className="text-2xl font-semibold">
            {profileData.fullName}
          </h3>

          <p className="text-gray-500">
            {profileData.designation}
          </p>

          <button className="mt-4 flex items-center gap-2 rounded-lg bg-[#2F6E5F] px-4 py-2 text-white transition hover:bg-[#24584b]">
            <Camera size={18} />
            Change Photo
          </button>
        </div>
      </div>

      {/* ================= FORM ================= */}

      <div className="grid gap-6 md:grid-cols-2">

        {/* Full Name */}

        <div>
          <label className="mb-2 flex items-center gap-2 text-sm font-medium">
            <IdCard size={16} />
            Full Name
          </label>

          <input
            type="text"
            defaultValue={profileData.fullName}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-[#2F6E5F]"
          />
        </div>

        {/* Employee ID */}

        <div>
          <label className="mb-2 flex items-center gap-2 text-sm font-medium">
            <IdCard size={16} />
            Employee ID
          </label>

          <input
            type="text"
            defaultValue={profileData.employeeId}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-[#2F6E5F]"
          />
        </div>

        {/* Email */}

        <div>
          <label className="mb-2 flex items-center gap-2 text-sm font-medium">
            <Mail size={16} />
            Email Address
          </label>

          <input
            type="email"
            defaultValue={profileData.email}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-[#2F6E5F]"
          />
        </div>

        {/* Phone */}

        <div>
          <label className="mb-2 flex items-center gap-2 text-sm font-medium">
            <Phone size={16} />
            Phone Number
          </label>

          <input
            type="text"
            defaultValue={profileData.phone}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-[#2F6E5F]"
          />
        </div>

        {/* Designation */}

        <div>
          <label className="mb-2 flex items-center gap-2 text-sm font-medium">
            <Briefcase size={16} />
            Designation
          </label>

          <input
            type="text"
            defaultValue={profileData.designation}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-[#2F6E5F]"
          />
        </div>

        {/* Department */}

        <div>
          <label className="mb-2 flex items-center gap-2 text-sm font-medium">
            <Building2 size={16} />
            Department
          </label>

          <input
            type="text"
            defaultValue={profileData.department}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-[#2F6E5F]"
          />
        </div>

      </div>

      {/* ================= BUTTON ================= */}

      <div className="flex justify-end">
        <button className="rounded-lg bg-[#2F6E5F] px-6 py-3 font-medium text-white transition hover:bg-[#24584b]">
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default ProfileSettings;