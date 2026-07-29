export default function InternshipDetailsPanel({ internship }) {
  return (
    <tr>
      <td colSpan={8} className="p-0 bg-surface-alt/60">
        <div className="rounded-2xl border border-line bg-white shadow-sm m-3 p-6 animate-[expandIn_0.18s_ease-out]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-xs uppercase tracking-wide text-slate-400 font-body mb-1.5">Description</h4>
              <p className="text-sm text-heading font-body leading-relaxed">{internship.description}</p>

              <h4 className="text-xs uppercase tracking-wide text-slate-400 font-body mt-4 mb-1.5">Required Skills</h4>
              <div className="flex flex-wrap gap-1.5">
                {internship.skills.map((s) => (
                  <span key={s} className="rounded-full bg-primary-bg text-primary text-xs font-body px-2.5 py-1">{s}</span>
                ))}
              </div>
            </div>

            <dl className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm font-body content-start">
              {[
                ["Duration", internship.duration],
                ["Assigned Students", internship.assignedStudents],
                ["Faculty Mentor", internship.mentor],
                ["Last Updated", internship.lastUpdated],
                ["Internship Mode", internship.mode],
                ["Application Deadline", internship.deadline],
                ["Open Positions", internship.openPositions],
              ].map(([label, value]) => (
                <div key={label}>
                  <dt className="text-xs text-slate-400">{label}</dt>
                  <dd className="text-heading font-medium">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </td>
    </tr>
  );
}