import { FileText, CalendarClock, CheckCircle2, AlertCircle } from "lucide-react";

function NotifCard({ Icon, label, value, tone }) {
  const tones = {
    primary: "bg-primary-bg text-primary",
    signal: "bg-signal-light text-signal",
    amber: "bg-amber-light text-amber",
    coral: "bg-coral-light text-coral",
  };
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-line bg-white p-4">
      <div className={`flex h-10 w-10 items-center justify-center rounded-xl shrink-0 ${tones[tone]}`}>
        <Icon className="w-5 h-5" strokeWidth={1.75} />
      </div>
      <div>
        <p className="text-lg font-mono font-medium text-heading">{value}</p>
        <p className="text-xs text-slate-500 font-body">{label}</p>
      </div>
    </div>
  );
}

export default function NotificationPanel({ applications }) {
  const newApplications = applications.filter((a) => a.status === "Applied").length;
  const interviewsToday = applications.filter((a) => a.status === "Interview Scheduled").length;
  const acceptedStudents = applications.filter((a) => ["Accepted", "Assigned", "Completed"].includes(a.status)).length;
  const deadlines = 3;

  return (
    <div className="grid grid-cols-2 gap-3">
      <NotifCard Icon={FileText} label="New Applications" value={newApplications} tone="primary" />
      <NotifCard Icon={CalendarClock} label="Interviews Today" value={interviewsToday} tone="amber" />
      <NotifCard Icon={CheckCircle2} label="Accepted Students" value={acceptedStudents} tone="signal" />
      <NotifCard Icon={AlertCircle} label="Deadlines" value={deadlines} tone="coral" />
    </div>
  );
}