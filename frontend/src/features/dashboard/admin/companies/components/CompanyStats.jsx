// src/features/dashboard/admin/companies/components/CompanyStats.jsx
import React from "react";
import StatCard from "../../../../../components/ui/StatCard";
import { StatCardSkeleton } from "../../../../../components/ui/SkeletonLoader";

// StatCard's `status` prop drives the coloured pulse rail on the card and
// only accepts these 4 values. Map each metric to the one that reflects
// its real-world meaning (not just decoration).
const STAT_STATUS = {
  total: "neutral",
  verified: "onTrack",
  pending: "attention",
  internships: "onTrack",
  applications: "neutral",
  students: "onTrack",
};

const STAT_SUB = {
  total: "All registered companies",
  verified: "Approved & active",
  pending: "Awaiting document review",
  internships: "Currently open roles",
  applications: "Across all companies",
  students: "Currently placed",
};

/**
 * Renders the 6 dashboard stat cards using the shared <StatCard />.
 * Note: StatCard does not accept an icon prop — it only takes
 * label / value / sub / status / trend.
 */
export default function CompanyStats({ stats, loading }) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <StatCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
      {stats.map((stat) => (
        <StatCard
          key={stat.key}
          label={stat.title}
          value={stat.value.toLocaleString()}
          sub={STAT_SUB[stat.key]}
          status={STAT_STATUS[stat.key] || "neutral"}
          trend={stat.growth}
        />
      ))}
    </div>
  );
}
