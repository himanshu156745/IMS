// src/features/dashboard/admin/companies/components/EditCompanyModal.jsx
import React, { useState, useEffect } from "react";
import { FiX } from "react-icons/fi";

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
 * Edit Company modal. Same field set as AddCompanyModal, pre-filled
 * with the selected company's current values.
 */
export default function EditCompanyModal({ open, company, onClose, onSave }) {
  const [form, setForm] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (company) {
      setForm({
        name: company.name || "",
        industry: company.industry || "",
        website: company.website || "",
        email: company.email || "",
        phone: company.phone || "",
        address: company.location || "",
        description: company.description || "",
        hrName: company.hrName || "",
        hrEmail: company.hrEmail || "",
        hrPhone: company.hrPhone || "",
      });
      setErrors({});
    }
  }, [company]);

  if (!open || !form) return null;

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
    onSave({ ...company, ...form, location: form.address });
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px]" onClick={onClose} />
      <div className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-100 p-5">
          <h3 className="text-base font-semibold text-slate-800">Edit Company</h3>
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
              <input className={inputClass} value={form.name} onChange={update("name")} />
              {errors.name && <p className="mt-1 text-xs text-rose-500">{errors.name}</p>}
            </Field>
            <Field label="Industry">
              <input className={inputClass} value={form.industry} onChange={update("industry")} />
              {errors.industry && <p className="mt-1 text-xs text-rose-500">{errors.industry}</p>}
            </Field>
            <Field label="Website">
              <input className={inputClass} value={form.website} onChange={update("website")} />
            </Field>
            <Field label="Email">
              <input className={inputClass} type="email" value={form.email} onChange={update("email")} />
              {errors.email && <p className="mt-1 text-xs text-rose-500">{errors.email}</p>}
            </Field>
            <Field label="Phone">
              <input className={inputClass} value={form.phone} onChange={update("phone")} />
            </Field>
            <Field label="Address">
              <input className={inputClass} value={form.address} onChange={update("address")} />
            </Field>
            <Field label="Description" full>
              <textarea
                className={`${inputClass} min-h-[80px] resize-none`}
                value={form.description}
                onChange={update("description")}
              />
            </Field>
          </div>

          <div className="border-t border-slate-100 pt-4">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-400">HR Details</p>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field label="HR Name">
                <input className={inputClass} value={form.hrName} onChange={update("hrName")} />
                {errors.hrName && <p className="mt-1 text-xs text-rose-500">{errors.hrName}</p>}
              </Field>
              <Field label="HR Email">
                <input className={inputClass} type="email" value={form.hrEmail} onChange={update("hrEmail")} />
              </Field>
              <Field label="HR Phone">
                <input className={inputClass} value={form.hrPhone} onChange={update("hrPhone")} />
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
