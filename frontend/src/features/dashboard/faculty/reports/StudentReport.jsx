import { useParams } from "react-router-dom";
import { MdOutlineDownload, MdOutlineVisibility, MdOutlineCheckCircle, MdOutlinePendingActions } from "react-icons/md";
import { students } from "../data/students.service";

const reports = [
  { id: "R1", title: "Week 1-2 Progress Report", status: "Submitted", date: "05 Jun 2026" },
  { id: "R2", title: "Week 3-4 Progress Report", status: "Submitted", date: "19 Jun 2026" },
  { id: "R3", title: "Mid-Term Internship Report", status: "Pending", date: "Due 24 Jul 2026" },
  { id: "R4", title: "Final Internship Report", status: "Pending", date: "Due 20 Aug 2026" },
];

const timeline = [
  { label: "Internship Started", date: "01 Jun 2026", done: true },
  { label: "Week 2 Report Reviewed", date: "10 Jun 2026", done: true },
  { label: "Week 4 Report Reviewed", date: "22 Jun 2026", done: true },
  { label: "Mid-Term Evaluation", date: "24 Jul 2026", done: false },
  { label: "Final Submission", date: "20 Aug 2026", done: false },
];

export default function StudentReport() {
  const { id } = useParams();
  const student = students.find((s) => s.id === id) || students[0];

  return (
    <div className="animate-fadeIn space-y-6">
      <div className="card flex flex-col gap-5 p-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <img src={student.photo} alt={student.name} className="h-16 w-16 rounded-2xl object-cover" />
          <div>
            <h2 className="text-lg font-extrabold text-slate-800">{student.name}</h2>
            <p className="text-sm text-slate-400">{student.enrollment} • {student.department}</p>
            <span className="badge mt-1.5 bg-blue-50 text-blue-600">{student.status}</span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:gap-8">
          <div>
            <p className="text-xs font-medium text-slate-400">Company</p>
            <p className="text-sm font-semibold text-slate-700">{student.company}</p>
          </div>
          <div>
            <p className="text-xs font-medium text-slate-400">Role</p>
            <p className="text-sm font-semibold text-slate-700">{student.role}</p>
          </div>
          <div>
            <p className="text-xs font-medium text-slate-400">Progress</p>
            <p className="text-sm font-semibold text-slate-700">{student.progress}%</p>
          </div>
          <div>
            <p className="text-xs font-medium text-slate-400">Attendance</p>
            <p className="text-sm font-semibold text-slate-700">{student.attendance}%</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="card p-5 lg:col-span-2">
          <h3 className="mb-4 font-bold text-slate-800">Submitted &amp; Pending Reports</h3>
          <div className="space-y-3">
            {reports.map((r) => (
              <div
                key={r.id}
                className="flex flex-col gap-3 rounded-xl border border-slate-100 p-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                      r.status === "Submitted" ? "bg-emerald-50 text-emerald-500" : "bg-amber-50 text-amber-500"
                    }`}
                  >
                    {r.status === "Submitted" ? <MdOutlineCheckCircle size={20} /> : <MdOutlinePendingActions size={20} />}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-700">{r.title}</p>
                    <p className="text-xs text-slate-400">{r.date}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  {r.status === "Submitted" ? (
                    <>
                      <button className="btn-secondary px-3 py-1.5 text-xs">
                        <MdOutlineVisibility size={16} /> View
                      </button>
                      <button className="btn-primary px-3 py-1.5 text-xs">
                        <MdOutlineDownload size={16} /> Download
                      </button>
                    </>
                  ) : (
                    <span className="badge bg-amber-50 text-amber-600">Awaiting Submission</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card p-5">
          <h3 className="mb-4 font-bold text-slate-800">Progress Timeline</h3>
          <div className="space-y-0">
            {timeline.map((t, i) => (
              <div key={t.label} className="flex gap-3">
                <div className="flex flex-col items-center">
                  <span
                    className={`h-3 w-3 rounded-full ${t.done ? "bg-brand-500" : "bg-slate-200"}`}
                  />
                  {i !== timeline.length - 1 && <span className="h-10 w-0.5 bg-slate-100" />}
                </div>
                <div className="-mt-1 pb-2">
                  <p className={`text-sm font-semibold ${t.done ? "text-slate-700" : "text-slate-400"}`}>
                    {t.label}
                  </p>
                  <p className="text-xs text-slate-400">{t.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}