// src/features/dashboard/admin/companies/components/ActionDropdown.jsx
import React from "react";
import { Eye, Pencil, CheckCircle2, PauseCircle, PlayCircle, Trash2 } from "lucide-react";
import DropdownMenu from "../../../../../components/ui/DropdownMenu";

/**
 * Row-level action menu for a company.
 *
 * The shared <DropdownMenu /> renders its own trigger button internally
 * and expects items as [{ label, Icon, onClick, danger? }] — note `Icon`
 * is a component reference (not a rendered element), so we pass the
 * lucide-react icon component itself, matching how DropdownMenu is used
 * elsewhere in this app.
 */
export default function ActionDropdown({ company, onView, onEdit, onVerify, onSuspend, onActivate, onDelete }) {
  const items = [
    { label: "View Profile", Icon: Eye, onClick: () => onView(company) },
    { label: "Edit Company", Icon: Pencil, onClick: () => onEdit(company) },
  ];

  if (company.verificationStatus !== "Verified") {
    items.push({ label: "Verify Company", Icon: CheckCircle2, onClick: () => onVerify(company) });
  }

  if (company.status === "Active") {
    items.push({ label: "Suspend Company", Icon: PauseCircle, onClick: () => onSuspend(company) });
  } else {
    items.push({ label: "Activate Company", Icon: PlayCircle, onClick: () => onActivate(company) });
  }

  items.push({ label: "Delete Company", Icon: Trash2, onClick: () => onDelete(company), danger: true });

  return <DropdownMenu items={items} />;
}
