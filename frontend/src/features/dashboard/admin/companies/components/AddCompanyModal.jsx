// src/features/dashboard/admin/companies/components/AddCompanyModal.jsx
import React, { useState } from "react";
import { FiX } from "react-icons/fi";

const EMPTY_FORM = {
  name: "",
  industry: "",
  website: "",
  email: "",
  phone: "",
  address: "",
  description: "",
  hrName: "",
  hrEmail: "",
  hrPhone: "",
};

function Field({ label, children, full }) {
  return (
    <div className={full ? "sm:col-span-2" : ""}>
      <label className="mb-1.5 block text-xs font-medium text-slate-600">{label}</label>
      {children}
    </div>
  );
}

const inputClass =
  "w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 shadow-sm placeholder:text-slate-400 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100";

/**
 * Add Company modal. Purely local state — on submit, builds a new
 * company object (with dummy defaults for the fields the table needs)
 * and hands it back to the parent via onSave. No API calls.
 */
export default function AddCompanyModal({ open, onClose, onSave }) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});

  if (!open) return null;

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  function validate() {
    const next = {};
    if (!form.name.trim()) next.name = "Company name is required";
    if (!form.industry.trim()) next.industry = "Industry is required";
    if (!form.email.trim()) next.email = "Email is required";
    if (!form.hrName.trim()) next.hrName = "HR name is required";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;

    onSave({
      ...form,
      id: `CMP-${Date.now()}`,
      logo: form.name
        .split(" ")
        .map((w) => w[0])
        .slice(0, 2)
        .join("")
        .toUpperCase(),
      logoColor: "bg-blue-600",
      location: form.address || "Not specified",
      registrationDate: new Date().toISOString().slice(0, 10),
      verificationStatus: "Pending",
      status: "Active",
      rating: 0,
      activeInternships: 0,
      studentsAssigned: 0,
      totalApplications: 0,
    });

    setForm(EMPTY_FORM);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px]" onClick={onClose} />
      <div className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-100 p-5">
          <h3 className="text-base font-semibold text-slate-800">Add Company</h3>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
          >
            <FiX className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 p-5">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label="Company Name">
              <input className={inputClass} value={form.name} onChange={update("name")} placeholder="e.g. Nimbus Cloud Systems" />
              {errors.name && <p className="mt-1 text-xs text-rose-500">{errors.name}</p>}
            </Field>
            <Field label="Industry">
              <input className={inputClass} value={form.industry} onChange={update("industry")} placeholder="e.g. Information Technology" />
              {errors.industry && <p className="mt-1 text-xs text-rose-500">{errors.industry}</p>}
            </Field>
            <Field label="Website">
              <input className={inputClass} value={form.website} onChange={update("website")} placeholder="https://example.com" />
            </Field>
            <Field label="Email">
              <input className={inputClass} type="email" value={form.email} onChange={update("email")} placeholder="contact@example.com" />
              {errors.email && <p className="mt-1 text-xs text-rose-500">{errors.email}</p>}
            </Field>
            <Field label="Phone">
              <input className={inputClass} value={form.phone} onChange={update("phone")} placeholder="+91 98765 43210" />
            </Field>
            <Field label="Address">
              <input className={inputClass} value={form.address} onChange={update("address")} placeholder="City, State" />
            </Field>
            <Field label="Description" full>
              <textarea
                className={`${inputClass} min-h-[80px] resize-none`}
                value={form.description}
                onChange={update("description")}
                placeholder="Brief description about the company..."
              />
            </Field>
          </div>

          <div className="border-t border-slate-100 pt-4">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-400">HR Details</p>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field label="HR Name">
                <input className={inputClass} value={form.hrName} onChange={update("hrName")} placeholder="Full name" />
                {errors.hrName && <p className="mt-1 text-xs text-rose-500">{errors.hrName}</p>}
              </Field>
              <Field label="HR Email">
                <input className={inputClass} type="email" value={form.hrEmail} onChange={update("hrEmail")} placeholder="hr@example.com" />
              </Field>
              <Field label="HR Phone">
                <input className={inputClass} value={form.hrPhone} onChange={update("hrPhone")} placeholder="+91 98765 43210" />
              </Field>
            </div>
          </div>

          <div className="flex justify-end gap-3 border-t border-slate-100 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-blue-700"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
