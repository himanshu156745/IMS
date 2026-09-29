// import { Camera, Mail, Phone, Briefcase, Building2, IdCard } from "lucide-react";
// import { profileData } from "../data/settingsData";

// const ProfileSettings = () => {
//   return (
//     <div className="space-y-8">
//       {/* ================= HEADER ================= */}

//       <div>
//         <h2 className="text-2xl font-bold text-gray-800">
//           Profile Settings
//         </h2>

//         <p className="mt-1 text-sm text-gray-500">
//           Update your administrator profile information.
//         </p>
//       </div>

//       {/* ================= PROFILE CARD ================= */}

//       <div className="flex flex-col items-center gap-5 rounded-xl border border-gray-200 bg-gray-50 p-6 lg:flex-row">

//         <div className="flex h-28 w-28 items-center justify-center rounded-full bg-[#2F6E5F] text-4xl font-bold text-white">
//           {profileData.fullName.charAt(0)}
//         </div>

//         <div className="flex-1">
//           <h3 className="text-2xl font-semibold">
//             {profileData.fullName}
//           </h3>

//           <p className="text-gray-500">
//             {profileData.designation}
//           </p>

//           <button className="mt-4 flex items-center gap-2 rounded-lg bg-[#2F6E5F] px-4 py-2 text-white transition hover:bg-[#24584b]">
//             <Camera size={18} />
//             Change Photo
//           </button>
//         </div>
//       </div>

//       {/* ================= FORM ================= */}

//       <div className="grid gap-6 md:grid-cols-2">

//         {/* Full Name */}

//         <div>
//           <label className="mb-2 flex items-center gap-2 text-sm font-medium">
//             <IdCard size={16} />
//             Full Name
//           </label>

//           <input
//             type="text"
//             defaultValue={profileData.fullName}
//             className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-[#2F6E5F]"
//           />
//         </div>

//         {/* Employee ID */}

//         <div>
//           <label className="mb-2 flex items-center gap-2 text-sm font-medium">
//             <IdCard size={16} />
//             Employee ID
//           </label>

//           <input
//             type="text"
//             defaultValue={profileData.employeeId}
//             className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-[#2F6E5F]"
//           />
//         </div>

//         {/* Email */}

//         <div>
//           <label className="mb-2 flex items-center gap-2 text-sm font-medium">
//             <Mail size={16} />
//             Email Address
//           </label>

//           <input
//             type="email"
//             defaultValue={profileData.email}
//             className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-[#2F6E5F]"
//           />
//         </div>

//         {/* Phone */}

//         <div>
//           <label className="mb-2 flex items-center gap-2 text-sm font-medium">
//             <Phone size={16} />
//             Phone Number
//           </label>

//           <input
//             type="text"
//             defaultValue={profileData.phone}
//             className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-[#2F6E5F]"
//           />
//         </div>

//         {/* Designation */}

//         <div>
//           <label className="mb-2 flex items-center gap-2 text-sm font-medium">
//             <Briefcase size={16} />
//             Designation
//           </label>

//           <input
//             type="text"
//             defaultValue={profileData.designation}
//             className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-[#2F6E5F]"
//           />
//         </div>

//         {/* Department */}

//         <div>
//           <label className="mb-2 flex items-center gap-2 text-sm font-medium">
//             <Building2 size={16} />
//             Department
//           </label>

//           <input
//             type="text"
//             defaultValue={profileData.department}
//             className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-[#2F6E5F]"
//           />
//         </div>

//       </div>

//       {/* ================= BUTTON ================= */}

//       <div className="flex justify-end">
//         <button className="rounded-lg bg-[#2F6E5F] px-6 py-3 font-medium text-white transition hover:bg-[#24584b]">
//           Save Changes
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ProfileSettings;


import {
  Camera,
  Mail,
  Phone,
  Briefcase,
  Building2,
  IdCard,
  Calendar,
  BadgeCheck,
  User,
} from "lucide-react";
import { profileData } from "../data/settingsData";

const fieldClass =
  "w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-11 pr-4 text-sm text-gray-800 outline-none transition focus:border-[#2F6E5F] focus:bg-white focus:ring-2 focus:ring-[#2F6E5F]/10";

function Field({ icon: Icon, label, ...inputProps }) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-gray-700">{label}</label>
      <div className="relative">
        <Icon size={16} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
        <input className={fieldClass} {...inputProps} />
      </div>
    </div>
  );
}

export default function ProfileSettings() {
  return (
    <div className="pb-24">
      {/* ================= HEADER ================= */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Profile Settings</h2>
        <p className="mt-1 text-sm text-gray-500">
          Update your administrator profile information.
        </p>
      </div>

      {/* ================= PROFILE HEADER CARD ================= */}
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div className="h-24 bg-gradient-to-r from-[#2F6E5F] to-[#3E8C79]" />

        <div className="flex flex-col gap-5 px-6 pb-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex items-end gap-4 -mt-10">
            <div className="relative">
              <div className="flex h-24 w-24 items-center justify-center rounded-2xl border-4 border-white bg-[#2F6E5F] text-3xl font-bold text-white shadow-md">
                {profileData.fullName.charAt(0)}
              </div>
              <button
                aria-label="Change photo"
                className="absolute -bottom-1 -right-1 flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-gray-900 text-white shadow transition hover:bg-gray-700"
              >
                <Camera size={14} />
              </button>
            </div>

            <div className="pb-1">
              <div className="flex items-center gap-1.5">
                <h3 className="text-lg font-semibold text-gray-900">{profileData.fullName}</h3>
                <BadgeCheck size={16} className="text-[#2F6E5F]" />
              </div>
              <p className="text-sm text-gray-500">{profileData.designation}</p>
            </div>
          </div>

          <div className="flex gap-2 pb-1 sm:pt-0">
            <span className="rounded-full bg-[#2F6E5F]/10 px-3 py-1.5 text-xs font-medium text-[#2F6E5F]">
              {profileData.department}
            </span>
            <span className="rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-500">
              ID {profileData.employeeId}
            </span>
          </div>
        </div>
      </div>

      {/* ================= QUICK STATS ================= */}
      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#2F6E5F]/10 text-[#2F6E5F]">
            <Calendar size={18} />
          </span>
          <div>
            <p className="text-xs text-gray-400">Member since</p>
            <p className="text-sm font-semibold text-gray-800">Jan 2024</p>
          </div>
        </div>

        <div className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#2F6E5F]/10 text-[#2F6E5F]">
            <User size={18} />
          </span>
          <div>
            <p className="text-xs text-gray-400">Role</p>
            <p className="text-sm font-semibold text-gray-800">{profileData.designation}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#2F6E5F]/10 text-[#2F6E5F]">
            <Building2 size={18} />
          </span>
          <div>
            <p className="text-xs text-gray-400">Department</p>
            <p className="text-sm font-semibold text-gray-800">{profileData.department}</p>
          </div>
        </div>
      </div>

      {/* ================= PERSONAL INFO ================= */}
      <div className="mt-5 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <h3 className="text-base font-semibold text-gray-900">Personal information</h3>
        <p className="mt-0.5 text-xs text-gray-400">Basic details tied to your account.</p>

        <div className="mt-5 grid gap-5 md:grid-cols-2">
          <Field icon={IdCard} label="Full name" type="text" defaultValue={profileData.fullName} />
          <Field icon={IdCard} label="Employee ID" type="text" defaultValue={profileData.employeeId} />
          <Field icon={Mail} label="Email address" type="email" defaultValue={profileData.email} />
          <Field icon={Phone} label="Phone number" type="text" defaultValue={profileData.phone} />
        </div>
      </div>

      {/* ================= WORK INFO ================= */}
      <div className="mt-5 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <h3 className="text-base font-semibold text-gray-900">Work information</h3>
        <p className="mt-0.5 text-xs text-gray-400">Your role within the organization.</p>

        <div className="mt-5 grid gap-5 md:grid-cols-2">
          <Field icon={Briefcase} label="Designation" type="text" defaultValue={profileData.designation} />
          <Field icon={Building2} label="Department" type="text" defaultValue={profileData.department} />
        </div>
      </div>

      {/* ================= STICKY SAVE BAR ================= */}
      {/* Sticks to the bottom of THIS column only (not the whole viewport) — no need to know the sidebar's width */}
      <div className="sticky bottom-0 z-10 -mx-6 mt-6 border-t border-gray-200 bg-white/90 px-6 py-4 backdrop-blur">
        <div className="flex items-center justify-end gap-3">
          <button className="rounded-xl px-5 py-2.5 text-sm font-medium text-gray-500 transition hover:bg-gray-100">
            Discard
          </button>
          <button className="rounded-xl bg-[#2F6E5F] px-6 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-[#24584b]">
            Save changes
          </button>
        </div>
      </div>
    </div>
  );
}