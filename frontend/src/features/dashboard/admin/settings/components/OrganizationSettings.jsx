import {
  Building2,
  Globe,
  Mail,
  Phone,
  MapPin,
  Image,
} from "lucide-react";
import { organizationData } from "../data/settingsData";

const OrganizationSettings = () => {
  return (
    <div className="space-y-8">
      {/* ================= HEADER ================= */}

      <div>
        <h2 className="text-2xl font-bold text-gray-800">
          Organization Settings
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Manage your company's profile and contact information.
        </p>
      </div>

      {/* ================= COMPANY LOGO ================= */}

      <div className="rounded-xl border border-gray-200 p-6">
        <h3 className="mb-5 text-lg font-semibold">
          Company Logo
        </h3>

        <div className="flex flex-col items-center gap-5 md:flex-row">
          <div className="flex h-28 w-28 items-center justify-center rounded-xl bg-gray-100">
            <Image size={40} className="text-gray-400" />
          </div>

          <div>
            <button className="rounded-lg bg-[#2F6E5F] px-5 py-2 text-white transition hover:bg-[#24584b]">
              Upload Logo
            </button>

            <p className="mt-2 text-sm text-gray-500">
              PNG, JPG or SVG (Max 2 MB)
            </p>
          </div>
        </div>
      </div>

      {/* ================= COMPANY DETAILS ================= */}

      <div className="grid gap-6 md:grid-cols-2">
        {/* Company Name */}

        <div>
          <label className="mb-2 flex items-center gap-2 text-sm font-medium">
            <Building2 size={16} />
            Company Name
          </label>

          <input
            type="text"
            defaultValue={organizationData.companyName}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-[#2F6E5F]"
          />
        </div>

        {/* Website */}

        <div>
          <label className="mb-2 flex items-center gap-2 text-sm font-medium">
            <Globe size={16} />
            Website
          </label>

          <input
            type="text"
            defaultValue={organizationData.website}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-[#2F6E5F]"
          />
        </div>

        {/* Email */}

        <div>
          <label className="mb-2 flex items-center gap-2 text-sm font-medium">
            <Mail size={16} />
            Support Email
          </label>

          <input
            type="email"
            defaultValue={organizationData.supportEmail}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-[#2F6E5F]"
          />
        </div>

        {/* Contact */}

        <div>
          <label className="mb-2 flex items-center gap-2 text-sm font-medium">
            <Phone size={16} />
            Contact Number
          </label>

          <input
            type="text"
            defaultValue={organizationData.contactNumber}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-[#2F6E5F]"
          />
        </div>
      </div>

      {/* Address */}

      <div>
        <label className="mb-2 flex items-center gap-2 text-sm font-medium">
          <MapPin size={16} />
          Office Address
        </label>

        <textarea
          rows={4}
          defaultValue={organizationData.address}
          className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-[#2F6E5F]"
        />
      </div>

      {/* Save Button */}

      <div className="flex justify-end">
        <button className="rounded-lg bg-[#2F6E5F] px-6 py-3 font-medium text-white transition hover:bg-[#24584b]">
          Save Organization Settings
        </button>
      </div>
    </div>
  );
};

export default OrganizationSettings;