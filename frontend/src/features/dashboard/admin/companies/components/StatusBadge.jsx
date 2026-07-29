// src/features/dashboard/admin/companies/components/StatusBadge.jsx
import React from "react";
import Badge from "../../../../../components/ui/Badge";
import { getStatusVariant } from "../utils/statusVariants";

/**
 * Thin wrapper around the shared <Badge /> so every status pill in this
 * feature (verification, internship, application, student status) is
 * rendered consistently from one place.
 */
export default function StatusBadge({ status, className = "" }) {
  if (!status) return null;
  return (
    <Badge variant={getStatusVariant(status)} className={className}>
      {status}
    </Badge>
  );
}
