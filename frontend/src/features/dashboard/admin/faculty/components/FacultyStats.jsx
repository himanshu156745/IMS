import StatCard from "../../../../../components/ui/StatCard";

export default function FacultyStats({ faculty }) {
  const total = faculty.length;
  const active = faculty.filter((f) => f.status === "Active").length;
  const departments = new Set(faculty.map((f) => f.department)).size;
  const onLeave = faculty.filter((f) => f.status === "On Leave").length;
  const pending = faculty.filter((f) => f.status === "Pending Approval").length;
  const avgRating =
    faculty.reduce((sum, f) => sum + f.rating, 0) / (faculty.length || 1);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
      <StatCard label="Total Faculty" value={total} status="neutral" />
      <StatCard label="Active Faculty" value={active} status="onTrack" />
      <StatCard label="Departments" value={departments} status="neutral" />
      <StatCard label="On Leave" value={onLeave} status="attention" />
      <StatCard label="Pending Approval" value={pending} status="attention" />
      <StatCard label="Avg. Student Rating" value={avgRating.toFixed(1)} status="onTrack" />
    </div>
  );
}