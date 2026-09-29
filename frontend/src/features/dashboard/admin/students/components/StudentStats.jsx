import { useMemo } from "react";
import StatCard from "../../../../../components/ui/StatCard";

export default function StudentStats({ students }) {
  const stats = useMemo(() => {
    const total = students.length;
    const activeApplications = students.filter((s) =>
      ["Applied", "Under Review", "Shortlisted"].includes(s.applicationStatus)
    ).length;
    const interviewScheduled = students.filter((s) => s.interview.status === "Scheduled").length;
    const selected = students.filter((s) => ["Selected", "Joined"].includes(s.hiringStatus)).length;
    const pendingVerification = students.filter((s) => s.profileCompletion < 80).length;

    return [
      { label: "Total Students", value: total, sub: "All registered students", status: "neutral" },
      { label: "Active Applications", value: activeApplications, sub: "Applied, review or shortlisted", status: "attention" },
      { label: "Interview Scheduled", value: interviewScheduled, sub: "Upcoming this cycle", status: "attention" },
      { label: "Selected Students", value: selected, sub: "Selected or joined", status: "onTrack" },
      { label: "Pending Verification", value: pendingVerification, sub: "Profile completion below 80%", status: "overdue" },
    ];
  }, [students]);

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {stats.map((stat) => (
        <StatCard key={stat.label} {...stat} />
      ))}
    </div>
  );
}