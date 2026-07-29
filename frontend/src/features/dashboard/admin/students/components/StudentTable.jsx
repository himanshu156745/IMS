import {
  Eye,
  Pencil,
  CheckCircle2,
  XCircle,
  RefreshCcw,
  CalendarClock,
  Mail,
  FileText,
  Folder,
  Trash2,
} from "lucide-react";
import Table from "../../../../../components/ui/Table";
import Badge from "../../../../../components/ui/Badge";
import DropdownMenu from "../../../../../components/ui/DropdownMenu";
import { TableRowSkeleton } from "../../../../../components/ui/SkeletonLoader";
import ProfileCompletionBar from "./ProfileCompletionBar";
import {
  applicationStatusVariant,
  hiringStatusVariant,
  interviewStatusVariant,
} from "../utils/statusVariants";

function DocChip({ label, available, onClick }) {
  return (
    <button
      type="button"
      disabled={!available}
      onClick={onClick}
      className="rounded-lg border border-line bg-white px-2 py-1 text-[11px] font-body text-slate-500 hover:text-primary hover:border-primary/40 hover:bg-primary-bg disabled:opacity-40 disabled:hover:bg-white disabled:hover:text-slate-500 disabled:hover:border-line transition-colors"
    >
      {label}
    </button>
  );
}

export default function StudentTable({ rows, loading, onAction, onPreviewDocument }) {
  const columns = [
    {
      key: "student",
      label: "Student",
      render: (row) => (
        <div className="flex items-center gap-2.5">
          <img src={row.photo} alt={row.name} className="w-8 h-8 rounded-full object-cover" />
          <div>
            <p className="text-sm font-body text-heading leading-tight">{row.name}</p>
            <p className="text-xs text-slate-400 font-body">{row.college}</p>
          </div>
        </div>
      ),
    },
    { key: "email", label: "Email", render: (row) => <span className="text-slate-500">{row.email}</span> },
    { key: "college", label: "College", render: (row) => <span className="text-slate-500">{row.college}</span> },
    {
      key: "internshipApplied",
      label: "Internship Applied",
      render: (row) => <span className="text-slate-500">{row.internshipApplied}</span>,
    },
    {
      key: "profileCompletion",
      label: "Profile Completion",
      render: (row) => <ProfileCompletionBar value={row.profileCompletion} />,
    },
    {
      key: "applicationStatus",
      label: "Application Status",
      render: (row) => <Badge variant={applicationStatusVariant(row.applicationStatus)}>{row.applicationStatus}</Badge>,
    },
    {
      key: "hiringStatus",
      label: "Hiring Status",
      render: (row) => <Badge variant={hiringStatusVariant(row.hiringStatus)}>{row.hiringStatus}</Badge>,
    },
    {
      key: "interview",
      label: "Interview",
      render: (row) =>
        row.interview.status === "Not Scheduled" ? (
          <Badge variant="neutral">Not Scheduled</Badge>
        ) : (
          <div className="space-y-1">
            <p className="text-xs text-heading font-body">{row.interview.date} · {row.interview.time}</p>
            <p className="text-[11px] text-slate-400 font-body">{row.interview.mode}</p>
            <Badge variant={interviewStatusVariant(row.interview.status)}>{row.interview.status}</Badge>
          </div>
        ),
    },
    {
      key: "documents",
      label: "Documents",
      render: (row) => (
        <div className="flex flex-wrap gap-1.5">
          <DocChip label="Resume" available={!!row.documents.resume} onClick={() => onPreviewDocument(row, "Resume", row.documents.resume)} />
          <DocChip label="College ID" available={!!row.documents.collegeId} onClick={() => onPreviewDocument(row, "College ID", row.documents.collegeId)} />
          <DocChip
            label="Certificates"
            available={row.documents.certificates.length > 0}
            onClick={() => onPreviewDocument(row, "Certificates", row.documents.certificates.join(", "))}
          />
        </div>
      ),
    },
    {
      key: "actions",
      label: "Actions",
      render: (row) => (
        <DropdownMenu
          items={[
            { label: "View Profile", Icon: Eye, onClick: () => onAction("view", row) },
            { label: "Edit Student", Icon: Pencil, onClick: () => onAction("edit", row) },
            { label: "Approve Profile", Icon: CheckCircle2, onClick: () => onAction("approve", row) },
            { label: "Reject Profile", Icon: XCircle, onClick: () => onAction("reject", row), danger: true },
            { label: "Change Hiring Status", Icon: RefreshCcw, onClick: () => onAction("changeHiring", row) },
            { label: "Schedule Interview", Icon: CalendarClock, onClick: () => onAction("scheduleInterview", row) },
            { label: "Send Email", Icon: Mail, onClick: () => onAction("sendEmail", row) },
            { label: "View Resume", Icon: FileText, onClick: () => onAction("viewResume", row) },
            { label: "View Documents", Icon: Folder, onClick: () => onAction("viewDocuments", row) },
            { label: "Delete Student", Icon: Trash2, onClick: () => onAction("delete", row), danger: true },
          ]}
        />
      ),
    },
  ];

  if (loading) {
    return (
      <div className="overflow-x-auto rounded-md bg-white shadow-sm">
        <table className="w-full text-sm font-body">
          <thead>
            <tr className="border-b border-slate/10 text-left">
              {columns.map((col) => (
                <th key={col.key} className="px-4 py-3 text-xs uppercase tracking-wider text-slate font-medium">
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 5 }).map((_, i) => (
              <TableRowSkeleton key={i} />
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  return <Table columns={columns} rows={rows} emptyText="No students match the current filters." />;
}