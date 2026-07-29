import { useState } from "react";
import { X } from "lucide-react";
import Badge from "../../../../../components/ui/Badge";
import StatusBadge from "./StatusBadge";
import StatusPipeline from "./StatusPipeline";
import DocumentsSection from "./DocumentsSection";
import ApplicationHistory from "./ApplicationHistory";
import AdminNotes from "./AdminNotes";
import SkillMatchCard from "./SkillMatchCard";

const TABS = ["Overview", "Resume", "Documents", "Timeline", "Notes", "Analytics"];

function Section({ title, children }) {
  return (
    <div className="py-4 border-t border-line first:border-t-0 first:pt-0">
      <h4 className="text-xs uppercase tracking-wider text-slate font-medium font-body mb-2.5">{title}</h4>
      {children}
    </div>
  );
}

export default function StudentProfileDrawer({ application, onClose, onAddNote, onViewDocument }) {
  const [tab, setTab] = useState("Overview");
  if (!application) return null;
  const { student } = application;

  return (
    <div className="fixed inset-0 z-[100] flex justify-end bg-ink/40 animate-[fadeIn_0.15s_ease-out]" onClick={onClose}>
      <div
        className="w-full max-w-lg h-full bg-white shadow-xl flex flex-col animate-[slideIn_0.2s_ease-out]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-line">
          <h2 className="font-display text-lg text-heading">Application Profile</h2>
          <button onClick={onClose} className="rounded-lg p-1.5 text-slate-500 hover:bg-surface-alt transition-colors">
            <X className="w-4 h-4" strokeWidth={1.75} />
          </button>
        </div>

        <div className="flex items-center gap-3 px-5 py-4 border-b border-line">
          <img src={student.photo} alt={student.name} className="w-14 h-14 rounded-full object-cover" />
          <div className="min-w-0">
            <p className="font-display text-base text-heading truncate">{student.name}</p>
            <p className="text-sm text-slate-500 font-body truncate">{application.internship.title} · {application.internship.company}</p>
            <div className="mt-1"><StatusBadge status={application.status} /></div>
          </div>
        </div>

        <div className="flex gap-1 px-5 pt-3 border-b border-line overflow-x-auto">
          {TABS.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-3 py-2 text-sm font-body whitespace-nowrap border-b-2 transition-colors ${
                tab === t ? "border-primary text-primary font-medium" : "border-transparent text-slate-500 hover:text-heading"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-2">
          {tab === "Overview" && (
            <>
              <Section title="Pipeline Status">
                <StatusPipeline status={application.status} />
              </Section>
              <Section title="Basic Information">
                <div className="grid grid-cols-2 gap-3 text-sm font-body">
                  <div><span className="text-xs text-slate-400 block">Email</span>{student.email}</div>
                  <div><span className="text-xs text-slate-400 block">Phone</span>{student.phone}</div>
                  <div><span className="text-xs text-slate-400 block">College</span>{student.college}</div>
                  <div><span className="text-xs text-slate-400 block">Branch</span>{student.branch}</div>
                  <div><span className="text-xs text-slate-400 block">Semester</span>{student.semester}</div>
                  <div><span className="text-xs text-slate-400 block">CGPA</span>{student.cgpa}</div>
                </div>
                <div className="flex gap-4 mt-3 text-sm font-body">
                  {student.github && <a href={student.github} target="_blank" rel="noreferrer" className="text-primary font-medium hover:underline">GitHub</a>}
                  {student.linkedin && <a href={student.linkedin} target="_blank" rel="noreferrer" className="text-primary font-medium hover:underline">LinkedIn</a>}
                  {student.portfolio && <a href={student.portfolio} target="_blank" rel="noreferrer" className="text-primary font-medium hover:underline">Portfolio</a>}
                </div>
              </Section>
              <Section title="Skills">
                <div className="flex flex-wrap gap-1.5">
                  {student.skills.map((s) => (
                    <Badge key={s} variant="neutral">{s}</Badge>
                  ))}
                </div>
              </Section>
            </>
          )}

          {tab === "Resume" && (
            <Section title="Resume">
              <button
                onClick={() => onViewDocument("Resume", application.documents.resume)}
                className="w-full rounded-xl border border-dashed border-line bg-surface-alt/50 px-4 py-6 text-sm font-body text-heading hover:bg-surface-alt transition-colors"
              >
                {application.documents.resume} — Click to preview
              </button>
            </Section>
          )}

          {tab === "Documents" && (
            <Section title="Uploaded Documents">
              <DocumentsSection documents={application.documents} onViewDocument={onViewDocument} />
            </Section>
          )}

          {tab === "Timeline" && (
            <Section title="Application Timeline">
              <ApplicationHistory history={application.history} />
            </Section>
          )}

          {tab === "Notes" && (
            <Section title="Admin Notes">
              <AdminNotes notes={application.adminNotes} onAddNote={onAddNote} />
            </Section>
          )}

          {tab === "Analytics" && (
            <Section title="Skill Match Analytics">
              <SkillMatchCard skillMatch={application.skillMatch} />
            </Section>
          )}
        </div>
      </div>
    </div>
  );
}