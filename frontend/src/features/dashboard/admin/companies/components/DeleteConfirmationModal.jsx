// src/features/dashboard/admin/companies/components/DeleteConfirmationModal.jsx
import React from "react";
import { FiAlertTriangle } from "react-icons/fi";

/**
 * Generic, professional "are you sure" dialog used for deleting a company.
 */
export default function DeleteConfirmationModal({ open, company, onClose, onConfirm }) {
  if (!open || !company) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px]" onClick={onClose} />
      <div className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-50">
          <FiAlertTriangle className="h-6 w-6 text-rose-500" />
        </div>
        <h3 className="mt-4 text-base font-semibold text-slate-800">Delete company?</h3>
        <p className="mt-1.5 text-sm leading-relaxed text-slate-500">
          This will permanently remove <span className="font-medium text-slate-700">{company.name}</span> and all
          of its internships, applications, and assigned student records. This action cannot be undone.
        </p>

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => onConfirm(company)}
            className="rounded-xl bg-rose-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-rose-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
