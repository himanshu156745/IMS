import { useState } from 'react'

export default function PostInternship() {
  const [skills, setSkills] = useState(['React', 'Node.js', 'MongoDB'])
  const [skillInput, setSkillInput] = useState('')

  const addSkill = (e) => {
    if (e.key === 'Enter' && skillInput.trim()) {
      e.preventDefault()
      setSkills((s) => [...s, skillInput.trim()])
      setSkillInput('')
    }
  }

  const removeSkill = (skill) => setSkills((s) => s.filter((x) => x !== skill))

  return (
    <section className="space-y-6">
      <div className="bg-white rounded-2xl shadow-card border border-slate-100 p-6 max-w-4xl">
        <h3 className="font-display font-semibold text-ink mb-1">Post a New Internship</h3>
        <p className="text-[13px] text-slate-400 mb-6">Fill in the role details below — this will be visible to all matched students.</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <label className="block sm:col-span-2">
            <span className="text-[13px] font-medium text-slate-500">Internship Title</span>
            <input
              type="text"
              placeholder="e.g. Frontend Developer Intern"
              className="mt-1.5 w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-brand-400 focus:ring-4 focus:ring-brand-50 outline-none text-sm transition"
            />
          </label>

          <label className="block">
            <span className="text-[13px] font-medium text-slate-500">Department</span>
            <select className="mt-1.5 w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-brand-400 focus:ring-4 focus:ring-brand-50 outline-none text-sm transition bg-white">
              <option>Engineering</option>
              <option>Design</option>
              <option>Marketing</option>
              <option>Data & Analytics</option>
            </select>
          </label>

          <label className="block">
            <span className="text-[13px] font-medium text-slate-500">Work Type</span>
            <select className="mt-1.5 w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-brand-400 focus:ring-4 focus:ring-brand-50 outline-none text-sm transition bg-white">
              <option>Remote</option>
              <option>On-site</option>
              <option>Hybrid</option>
            </select>
          </label>

          <label className="block">
            <span className="text-[13px] font-medium text-slate-500">Duration</span>
            <input
              type="text"
              placeholder="e.g. 3 months"
              className="mt-1.5 w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-brand-400 focus:ring-4 focus:ring-brand-50 outline-none text-sm transition"
            />
          </label>

          <label className="block">
            <span className="text-[13px] font-medium text-slate-500">Monthly Stipend (₹)</span>
            <input
              type="text"
              placeholder="e.g. 12,000"
              className="mt-1.5 w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-brand-400 focus:ring-4 focus:ring-brand-50 outline-none text-sm transition"
            />
          </label>

          <label className="block">
            <span className="text-[13px] font-medium text-slate-500">Number of Openings</span>
            <input
              type="number"
              placeholder="e.g. 4"
              className="mt-1.5 w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-brand-400 focus:ring-4 focus:ring-brand-50 outline-none text-sm transition"
            />
          </label>

          <label className="block">
            <span className="text-[13px] font-medium text-slate-500">Application Deadline</span>
            <input
              type="date"
              className="mt-1.5 w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-brand-400 focus:ring-4 focus:ring-brand-50 outline-none text-sm transition"
            />
          </label>

          <div className="sm:col-span-2">
            <span className="text-[13px] font-medium text-slate-500">Required Skills</span>
            <div className="mt-1.5 flex flex-wrap items-center gap-2 px-3 py-2.5 rounded-xl border border-slate-200 focus-within:border-brand-400 focus-within:ring-4 focus-within:ring-brand-50 transition">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-brand-50 text-brand-600 text-[12px] font-medium"
                >
                  {skill}
                  <button type="button" onClick={() => removeSkill(skill)} className="hover:text-brand-800">
                    ×
                  </button>
                </span>
              ))}
              <input
                type="text"
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyDown={addSkill}
                placeholder="Add a skill and press Enter"
                className="flex-1 min-w-[140px] text-sm outline-none py-1"
              />
            </div>
          </div>

          <label className="block sm:col-span-2">
            <span className="text-[13px] font-medium text-slate-500">Job Description</span>
            <textarea
              rows="5"
              placeholder="Describe the role, responsibilities, and what students will learn…"
              className="mt-1.5 w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-brand-400 focus:ring-4 focus:ring-brand-50 outline-none text-sm transition resize-none"
            />
          </label>
        </div>

        <div className="flex items-center justify-end gap-3 mt-6 pt-5 border-t border-slate-100">
          <button className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-500 text-sm font-medium hover:bg-mist transition">
            Save as Draft
          </button>
          <button className="px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-sm font-medium transition shadow-lg shadow-brand-200">
            Publish Internship
          </button>
        </div>
      </div>
    </section>
  )
}
