import { useState, useEffect, useMemo, useCallback } from "react";
import { useParams } from "react-router-dom";
import { MdOutlineDownload, MdOutlineVisibility, MdOutlineCheckCircle, MdOutlinePendingActions, MdClose } from "react-icons/md";
import axiosInstance from "../../../../utils/axiosInstance";
import { unwrapList } from "../../../../utils/api";
import toast from "react-hot-toast";
import { useAuth } from "../../../../hooks/useAuth";
import { formatInTimeZone } from "date-fns-tz";

export default function StudentReport() {
  const { user } = useAuth();
  const { id } = useParams();
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [internships, setInternships] = useState([]);
  const [selectedInternshipId, setSelectedInternshipId] = useState(id || '');
  const [studentInfo, setStudentInfo] = useState(null);
  const [selectedReport, setSelectedReport] = useState(null);
  const [feedbackText, setFeedbackText] = useState('');
  const [evaluating, setEvaluating] = useState(false);

  useEffect(() => {
    const fetchInternships = async () => {
      try {
        const res = await axiosInstance.get('/internships');
        const list = unwrapList(res).filter(i => !i.mentor || (i.mentor?._id || i.mentor) === user?._id);
        setInternships(list);
        if ((!selectedInternshipId || !list.some(i => i._id === selectedInternshipId)) && list.length > 0) {
          setSelectedInternshipId(list[0]._id);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchInternships();
  }, [selectedInternshipId, user?._id]);

  const fetchReports = useCallback(async () => {
    if (!selectedInternshipId) {
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      const res = await axiosInstance.get(`/reports/internship/${selectedInternshipId}`);
      const list = unwrapList(res);
      setReports(list);

      if (list.length > 0) {
        const first = list[0];
        setStudentInfo({
          name: first.studentName || first.studentProfile?.fullName || first.student?.email || "Student Applicant",
          photo: first.studentProfile?.avatarUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(first.studentName || first.studentProfile?.fullName || 'Student')}`,
          enrollment: first.studentProfile?.university || first.student?.email?.split('@')[0] || "ENR-2026",
          department: first.studentProfile?.course || first.studentProfile?.branch || "Computer Science",
          status: first.status === 'approved' ? 'Completed' : 'Active',
          company: first.internship?.title || "Technology Intern",
          role: "Intern",
          progress: Math.round((list.filter(r => r.status === 'approved').length / list.length) * 100),
          attendance: 95
        });
      }
    } catch {
      setReports([]);
    } finally {
      setLoading(false);
    }
  }, [selectedInternshipId]);

  useEffect(() => {
    if (selectedInternshipId) {
      fetchReports();
    }
  }, [selectedInternshipId, fetchReports]);

  const handleEvaluate = async (reportId, status) => {
    try {
      setEvaluating(true);
      await axiosInstance.patch(`/reports/${reportId}/evaluate`, {
        status,
        facultyFeedback: feedbackText
      });
      toast.success(`Report marked as ${status}!`);
      setSelectedReport(null);
      setFeedbackText('');
      fetchReports();
    } catch (err) {
      toast.error(err.response?.data?.message || `Failed to evaluate report`);
    } finally {
      setEvaluating(false);
    }
  };

  const handleDownload = (r) => {
    const studentName = studentInfo?.name || "Student";
    const content = `STUDENT INTERNSHIP REPORT\n=========================\nStudent: ${studentName}\nEnrollment: ${studentInfo?.enrollment || 'N/A'}\nDate: ${r.dateKey}\nHours Worked: ${r.hoursWorked} hrs\nStatus: ${r.status}\n\nTask Description:\n${r.taskDescription}\n\nFaculty Feedback:\n${r.facultyFeedback || 'No feedback provided'}\n`;
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Report_${r.dateKey || 'student'}.txt`;
    link.click();
    URL.revokeObjectURL(url);
    toast.success("Report downloaded");
  };

  const student = studentInfo || {
    name: "Student Applicant",
    photo: "https://ui-avatars.com/api/?name=Student",
    enrollment: "N/A",
    department: "Information Technology",
    status: "Active",
    company: "Internship Program",
    role: "Intern",
    progress: reports.length > 0 ? Math.round((reports.filter(r => r.status === 'approved').length / reports.length) * 100) : 0,
    attendance: 0
  };

  const timeline = useMemo(() => {
    if (reports.length === 0) {
      return [
        { label: "Internship Started", date: "Initial Milestone", done: true },
        { label: "Week 2 Report Reviewed", date: "Upcoming", done: false },
        { label: "Mid-Term Evaluation", date: "Scheduled", done: false },
        { label: "Final Submission", date: "Pending", done: false }
      ];
    }
    const items = [
      { label: "Internship Started", date: reports[reports.length - 1]?.date ? new Date(reports[reports.length - 1].date).toLocaleDateString() : "Active", done: true }
    ];
    reports.slice(0, 3).forEach((r, idx) => {
      items.push({
        label: `Report #${idx + 1} Reviewed`,
        date: r.date ? new Date(r.date).toLocaleDateString() : r.dateKey,
        done: r.status === 'approved'
      });
    });
    items.push({
      label: "Final Submission",
      date: "End of Term",
      done: reports.every(r => r.status === 'approved')
    });
    return items;
  }, [reports]);

  if (loading) {
    return <div className="animate-pulse space-y-6"><div className="h-40 rounded-2xl bg-slate-200"></div><div className="grid grid-cols-1 gap-6 lg:grid-cols-3"><div className="h-80 rounded-2xl bg-slate-200 lg:col-span-2"></div><div className="h-80 rounded-2xl bg-slate-200"></div></div></div>;
  }

  return (
    <div className="animate-fadeIn space-y-6">
      {internships.length > 1 && (
        <div className="flex items-center justify-between bg-white border border-slate-200 rounded-2xl px-5 py-3">
          <span className="text-sm font-semibold text-slate-700">Select Internship:</span>
          <select
            value={selectedInternshipId}
            onChange={(e) => setSelectedInternshipId(e.target.value)}
            className="input-field text-xs py-1.5 px-3 max-w-xs"
          >
            {internships.map((intern) => (
              <option key={intern._id} value={intern._id}>{intern.title} ({intern.location || 'Remote'})</option>
            ))}
          </select>
        </div>
      )}

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
            {reports.length === 0 ? (
              <div className="text-center py-10 text-slate-400 text-sm">
                No reports submitted for this internship yet.
              </div>
            ) : (
              reports.map((r) => (
                <div
                  key={r._id}
                  className="flex flex-col gap-3 rounded-xl border border-slate-100 p-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                        r.status === "approved" ? "bg-emerald-50 text-emerald-500" : (r.status === "rejected" ? "bg-red-50 text-red-500" : "bg-amber-50 text-amber-500")
                      }`}
                    >
                      {r.status === "approved" ? <MdOutlineCheckCircle size={20} /> : <MdOutlinePendingActions size={20} />}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-700">{r.taskDescription ? (r.taskDescription.slice(0, 48) + (r.taskDescription.length > 48 ? '...' : '')) : `Report - ${r.dateKey}`}</p>
                      <p className="text-xs text-slate-400">{r.date ? new Date(r.date).toLocaleDateString() : r.dateKey} • {r.hoursWorked || 0} hrs worked</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => {
                        setSelectedReport(r);
                        setFeedbackText(r.facultyFeedback || '');
                      }} 
                      className="btn-secondary px-3 py-1.5 text-xs flex items-center gap-1"
                    >
                      <MdOutlineVisibility size={16} /> Evaluate
                    </button>
                    <button onClick={() => handleDownload(r)} className="btn-primary px-3 py-1.5 text-xs flex items-center gap-1">
                      <MdOutlineDownload size={16} /> Download
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="card p-5">
          <h3 className="mb-4 font-bold text-slate-800">Progress Timeline</h3>
          <div className="space-y-0">
            {timeline.map((t, i) => (
              <div key={t.label || i} className="flex gap-3">
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

      {/* Evaluation & Feedback Modal */}
      {selectedReport && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
          <div className="card w-full max-w-lg p-6 space-y-4 bg-white shadow-xl animate-fadeIn">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h4 className="font-bold text-slate-800">Evaluate Student Report</h4>
              <button 
                onClick={() => setSelectedReport(null)}
                className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
              >
                <MdClose size={20} />
              </button>
            </div>
            <div className="space-y-3 text-sm">
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase">Task Description</p>
                <p className="mt-1 text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-100 whitespace-pre-wrap">{selectedReport.taskDescription || "No description provided."}</p>
              </div>
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span>Hours: <strong className="text-slate-700">{selectedReport.hoursWorked || 0} hrs</strong></span>
                <span>Date: <strong className="text-slate-700">{selectedReport.date ? new Date(selectedReport.date).toLocaleDateString() : selectedReport.dateKey}</strong></span>
                <span className="capitalize">Status: <strong className="text-slate-700">{selectedReport.status || 'pending'}</strong></span>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Faculty Feedback</label>
                <textarea
                  value={feedbackText}
                  onChange={(e) => setFeedbackText(e.target.value)}
                  placeholder="Provide evaluation remarks or feedback..."
                  className="input-field w-full min-h-[90px] py-2 text-sm"
                />
              </div>
            </div>
            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setSelectedReport(null)}
                className="btn-secondary px-4 py-2 text-xs"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={evaluating}
                onClick={() => handleEvaluate(selectedReport._id, 'rejected')}
                className="px-4 py-2 text-xs font-bold text-red-600 bg-red-50 hover:bg-red-100 rounded-xl transition-colors disabled:opacity-50"
              >
                Reject
              </button>
              <button
                type="button"
                disabled={evaluating}
                onClick={() => handleEvaluate(selectedReport._id, 'approved')}
                className="btn-primary px-4 py-2 text-xs disabled:opacity-50"
              >
                {evaluating ? "Evaluating..." : "Approve Report"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
