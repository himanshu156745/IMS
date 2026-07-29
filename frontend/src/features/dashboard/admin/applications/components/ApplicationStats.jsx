import StatCard from "../../../../../components/ui/StatCard";

export default function ApplicationStats({ applications }) {
  const total = applications.length;
  const pending = applications.filter((a) => a.status === "Under Review").length;
  const shortlisted = applications.filter((a) => a.status === "Shortlisted").length;
  const accepted = applications.filter((a) => a.status === "Accepted").length;
  const rejected = applications.filter((a) => a.status === "Rejected").length;
  const assigned = applications.filter((a) => a.status === "Assigned").length;
  const completed = applications.filter((a) => a.status === "Completed").length;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-4">
      <StatCard label="Total Applications" value={total} status="neutral" />
      <StatCard label="Pending Review" value={pending} status="attention" />
      <StatCard label="Shortlisted" value={shortlisted} status="attention" />
      <StatCard label="Accepted" value={accepted} status="onTrack" />
      <StatCard label="Rejected" value={rejected} status="overdue" />
      <StatCard label="Assigned" value={assigned} status="onTrack" />
      <StatCard label="Completed" value={completed} status="onTrack" />
    </div>
  );
}