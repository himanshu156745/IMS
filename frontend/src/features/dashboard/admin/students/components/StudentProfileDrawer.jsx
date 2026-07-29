import { X } from "lucide-react";
import Badge from "../../../../../components/ui/Badge";
import ProfileCompletionBar from "./ProfileCompletionBar";
import { applicationStatusVariant, hiringStatusVariant, interviewStatusVariant } from "../utils/statusVariants";

function Section({ title, children }) {
  return (
    <div className="py-4 border-t border-line first:border-t-0 first:pt-0">
      <h4 className="text-xs uppercase tracking-wider text-slate font-medium font-body mb-2.5">{title}</h4>
      {children}
    </div>
  );
}

export default function StudentProfileDrawer({ student, onClose }) {
  if (!student) return null;

  return (
    <div className="fixed inset-0 z-[100] flex justify-end bg-ink/40 animate-[fadeIn_0.15s_ease-out]" onClick={onClose}>
      <div
        className="w-full max-w-md h-full bg-white shadow-xl flex flex-col animate-[slideIn_0.2s_ease-out]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-line">
          <h2 className="font-display text-lg text-heading">Student Profile</h2>
          <button onClick={onClose} className="rounded-lg p-1.5 text-slate-500 hover:bg-surface-alt transition-colors">
            <X className="w-4 h-4" strokeWidth={1.75} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-2">
          <div className="flex items-center gap-3 py-4">
            <img src={student.photo} alt={student.name} className="w-14 h-14 rounded-full object-cover" />
            <div>
              <p className="font-display text-base text-heading">{student.name}</p>
              <p className="text-sm text-slate-500 font-body">{student.email}</p>
              <p className="text-sm text-slate-500 font-body">{student.phone}</p>
            </div>
          </div>

          <Section title="Profile Completion">
            <ProfileCompletionBar value={student.profileCompletion} />
          </Section>

          <Section title="Basic Information">
            <div className="grid grid-cols-2 gap-3 text-sm font-body">
              <div><span className="text-xs text-slate-400 block">College</span>{student.college}</div>
              <div><span className="text-xs text-slate-400 block">Branch</span>{student.branch}</div>
              <div><span className="text-xs text-slate-400 block">Semester</span>{student.semester}</div>
              <div><span className="text-xs text-slate-400 block">Skills</span>{student.skills.join(", ") || "—"}</div>
            </div>
            <div className="flex gap-4 mt-3 text-sm font-body">
              {student.github && <a href={student.github} target="_blank" rel="noreferrer" className="text-primary font-medium hover:underline">GitHub</a>}
              {student.linkedin && <a href={student.linkedin} target="_blank" rel="noreferrer" className="text-primary font-medium hover:underline">LinkedIn</a>}
              {student.portfolio && <a href={student.portfolio} target="_blank" rel="noreferrer" className="text-primary font-medium hover:underline">Portfolio</a>}
            </div>
          </Section>

          <Section title="Uploaded Documents">
            <div className="flex flex-wrap gap-2">
              <Badge variant={student.documents.resume ? "onTrack" : "neutral"}>Resume {student.documents.resume ? "✓" : "—"}</Badge>
              <Badge variant={student.documents.collegeId ? "onTrack" : "neutral"}>College ID {student.documents.collegeId ? "✓" : "—"}</Badge>
              <Badge variant={student.documents.certificates.length ? "onTrack" : "neutral"}>
                Certificates ({student.documents.certificates.length})
              </Badge>
            </div>
          </Section>

          <Section title="Internship Details">
            <p className="text-sm font-body text-heading">{student.internshipApplied}</p>
          </Section>

          <Section title="Application Status">
            <Badge variant={applicationStatusVariant(student.applicationStatus)}>{student.applicationStatus}</Badge>
          </Section>

          <Section title="Hiring Status">
            <Badge variant={hiringStatusVariant(student.hiringStatus)}>{student.hiringStatus}</Badge>
          </Section>

          <Section title="Interview Details">
            {student.interview.status === "Not Scheduled" ? (
              <Badge variant="neutral">Not Scheduled</Badge>
            ) : (
              <div className="grid grid-cols-2 gap-3 text-sm font-body">
                <div><span className="text-xs text-slate-400 block">Date</span>{student.interview.date}</div>
                <div><span className="text-xs text-slate-400 block">Time</span>{student.interview.time}</div>
                <div><span className="text-xs text-slate-400 block">Mode</span>{student.interview.mode}</div>
                <div>
                  <span className="text-xs text-slate-400 block mb-1">Status</span>
                  <Badge variant={interviewStatusVariant(student.interview.status)}>{student.interview.status}</Badge>
                </div>
              </div>
            )}
          </Section>

          <Section title="Admin Notes">
            <p className="text-sm text-slate-500 font-body">{student.adminNotes || "No notes added yet."}</p>
          </Section>
        </div>
      </div>
    </div>
  );
}