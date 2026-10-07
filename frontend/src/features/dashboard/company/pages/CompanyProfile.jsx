import { useState } from 'react'
import Icon from '../components/ui/Icon.jsx'
import { company as initialCompany } from '../services/mockData.js'

export default function CompanyProfile() {
  const [company, setCompany] = useState(initialCompany)

  const update = (field) => (e) => setCompany((c) => ({ ...c, [field]: e.target.value }))

  return (
    <section className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile summary card */}
        <div className="bg-white rounded-2xl shadow-card border border-slate-100 p-6 text-center h-fit">
          <div className="w-20 h-20 rounded-2xl overflow-hidden mx-auto shadow-lg shadow-brand-200 bg-[#0d1224] p-0.5 flex items-center justify-center">
            {company.logo ? (
              <img src={company.logo} alt={company.name} className="w-full h-full object-cover rounded-xl" />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center text-white font-display font-bold text-2xl">
                {company.initials}
              </div>
            )}
          </div>
          <h3 className="font-display font-semibold text-lg text-ink mt-4">{company.name}</h3>
          <p className="text-[13px] text-slate-400">{company.industry}</p>
          <button className="mt-4 w-full py-2 rounded-xl border border-brand-200 text-brand-600 text-sm font-medium hover:bg-brand-50 transition">
            Change Logo
          </button>

          <div className="grid grid-cols-2 gap-3 mt-6 text-left">
            <div className="bg-mist rounded-xl p-3">
              <p className="text-[11px] text-slate-400">Internships Posted</p>
              <p className="font-mono font-semibold text-ink text-lg">{company.internshipsPosted}</p>
            </div>
            <div className="bg-mist rounded-xl p-3">
              <p className="text-[11px] text-slate-400">Students Hosted</p>
              <p className="font-mono font-semibold text-ink text-lg">{company.studentsHosted}</p>
            </div>
          </div>

          <hr className="my-5 border-slate-100" />
          <div className="text-left space-y-3 text-sm">
            <div className="flex items-center gap-2.5 text-slate-500">
              <Icon name="mail" className="w-4 h-4 text-brand-500 shrink-0" />
              {company.email}
            </div>
            <div className="flex items-center gap-2.5 text-slate-500">
              <Icon name="phone" className="w-4 h-4 text-brand-500 shrink-0" />
              {company.phone}
            </div>
            <div className="flex items-center gap-2.5 text-slate-500">
              <Icon name="globe" className="w-4 h-4 text-brand-500 shrink-0" />
              {company.website}
            </div>
            <div className="flex items-center gap-2.5 text-slate-500">
              <Icon name="pin" className="w-4 h-4 text-brand-500 shrink-0" />
              {company.location}
            </div>
          </div>
        </div>

        {/* Editable details */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-card border border-slate-100 p-6">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-display font-semibold text-ink">Company Details</h3>
            <button className="px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-sm font-medium transition">
              Save Changes
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <label className="block">
              <span className="text-[13px] font-medium text-slate-500">Company Name</span>
              <input
                type="text"
                value={company.name}
                onChange={update('name')}
                className="mt-1.5 w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-brand-400 focus:ring-4 focus:ring-brand-50 outline-none text-sm transition"
              />
            </label>
            <label className="block">
              <span className="text-[13px] font-medium text-slate-500">Industry</span>
              <select
                value={company.industry}
                onChange={update('industry')}
                className="mt-1.5 w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-brand-400 focus:ring-4 focus:ring-brand-50 outline-none text-sm transition bg-white"
              >
                <option>Software & EdTech Services</option>
                <option>Information Technology</option>
                <option>Finance</option>
              </select>
            </label>
            <label className="block">
              <span className="text-[13px] font-medium text-slate-500">Website</span>
              <input
                type="text"
                value={company.website}
                onChange={update('website')}
                className="mt-1.5 w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-brand-400 focus:ring-4 focus:ring-brand-50 outline-none text-sm transition"
              />
            </label>
            <label className="block">
              <span className="text-[13px] font-medium text-slate-500">Contact Email</span>
              <input
                type="email"
                value={company.email}
                onChange={update('email')}
                className="mt-1.5 w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-brand-400 focus:ring-4 focus:ring-brand-50 outline-none text-sm transition"
              />
            </label>
            <label className="block">
              <span className="text-[13px] font-medium text-slate-500">Phone</span>
              <input
                type="text"
                value={company.phone}
                onChange={update('phone')}
                className="mt-1.5 w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-brand-400 focus:ring-4 focus:ring-brand-50 outline-none text-sm transition"
              />
            </label>
            <label className="block">
              <span className="text-[13px] font-medium text-slate-500">Team Size</span>
              <input
                type="text"
                value={company.teamSize}
                onChange={update('teamSize')}
                className="mt-1.5 w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-brand-400 focus:ring-4 focus:ring-brand-50 outline-none text-sm transition"
              />
            </label>
            <label className="block sm:col-span-2">
              <span className="text-[13px] font-medium text-slate-500">Registered Address</span>
              <input
                type="text"
                value={company.address}
                onChange={update('address')}
                className="mt-1.5 w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-brand-400 focus:ring-4 focus:ring-brand-50 outline-none text-sm transition"
              />
            </label>
            <label className="block sm:col-span-2">
              <span className="text-[13px] font-medium text-slate-500">About the Company</span>
              <textarea
                rows="4"
                value={company.about}
                onChange={update('about')}
                className="mt-1.5 w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-brand-400 focus:ring-4 focus:ring-brand-50 outline-none text-sm transition resize-none"
              />
            </label>
          </div>
        </div>
      </div>
    </section>
  )
}
