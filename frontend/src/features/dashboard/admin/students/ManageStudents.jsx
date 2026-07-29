import { useState, useMemo, useEffect } from "react";
import { Download, Plus } from "lucide-react";
import PageHeader from "../../../../components/ui/PageHeader";
import Pagination from "../../../../components/ui/Pagination";
import StudentStats from "./components/StudentStats";
import StudentsSkeleton from "./components/StudentsSkeleton";
import StudentFilters from "./components/StudentFilters";
import StudentTable from "./components/StudentTable";
import StudentProfileDrawer from "./components/StudentProfileDrawer";
import EditStudentDrawer from "./components/EditStudentDrawer";
import DocumentPreviewModal from "./components/DocumentPreviewModal";
import EmailModal from "./components/EmailModal";
import ConfirmationModal from "./components/ConfirmationModal";
import { MOCK_STUDENTS } from "./data/studentsData";

const PAGE_SIZE = 10;

const EMPTY_FILTERS = {
  name: "",
  email: "",
  college: "",
  hiringStatus: "",
  interviewStatus: "",
  applicationStatus: "",
};

export default function ManageStudents() {
  const [students, setStudents] = useState(MOCK_STUDENTS);
  const [filters, setFilters] = useState(EMPTY_FILTERS);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  // Panel / modal state
  const [profileStudent, setProfileStudent] = useState(null);
  const [editStudent, setEditStudent] = useState(null);
  const [emailStudent, setEmailStudent] = useState(null);
  const [documentPreview, setDocumentPreview] = useState(null);
  const [confirmation, setConfirmation] = useState(null);

  useEffect(() => {
    const t = setTimeout(() => setInitialLoading(false), 600);
    return () => clearTimeout(t);
  }, []);



  const filtered = useMemo(() => {
    return students.filter((s) => {
      if (
        filters.name &&
        !s.name.toLowerCase().includes(filters.name.toLowerCase())
      )
        return false;
      if (
        filters.email &&
        !s.email.toLowerCase().includes(filters.email.toLowerCase())
      )
        return false;
      if (filters.college && s.college !== filters.college) return false;
      if (filters.hiringStatus && s.hiringStatus !== filters.hiringStatus)
        return false;
      if (
        filters.interviewStatus &&
        s.interview.status !== filters.interviewStatus
      )
        return false;
      if (
        filters.applicationStatus &&
        s.applicationStatus !== filters.applicationStatus
      )
        return false;
      return true;
    });
  }, [students, filters]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const colleges = [...new Set(MOCK_STUDENTS.map((s) => s.college))];

  const handleReset = () => {
    setFilters(EMPTY_FILTERS);
    setPage(1);
  };

  const handleExport = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert("Exporting students to CSV (demo only).");
    }, 500);
  };

  const updateStudent = (updated) => {
    setStudents((prev) => prev.map((s) => (s.id === updated.id ? updated : s)));
  };

  const handleAction = (key, student) => {
    switch (key) {
      case "view":
        setProfileStudent(student);
        break;
      case "edit":
        setEditStudent(student);
        break;
      case "approve":
        setConfirmation({
          title: "Approve Profile",
          message: `Approve ${student.name}'s profile? They will be notified of the update.`,
          confirmLabel: "Approve",
          onConfirm: () =>
            updateStudent({ ...student, applicationStatus: "Shortlisted" }),
        });
        break;
      case "reject":
        setConfirmation({
          title: "Reject Profile",
          message: `Reject ${student.name}'s profile? This action can be reversed later.`,
          confirmLabel: "Reject",
          danger: true,
          onConfirm: () =>
            updateStudent({ ...student, applicationStatus: "Rejected" }),
        });
        break;
      case "changeHiring":
        setConfirmation({
          title: "Change Hiring Status",
          message: `Move ${student.name} to the next hiring stage?`,
          confirmLabel: "Update",
          onConfirm: () =>
            updateStudent({ ...student, hiringStatus: "Interview Scheduled" }),
        });
        break;
      case "scheduleInterview":
        setConfirmation({
          title: "Schedule Interview",
          message: `Schedule an interview for ${student.name}? This is a demo action.`,
          confirmLabel: "Schedule",
          onConfirm: () =>
            updateStudent({
              ...student,
              interview: {
                date: "Aug 01, 2026",
                time: "11:00 AM",
                mode: "Online",
                status: "Scheduled",
              },
            }),
        });
        break;
      case "sendEmail":
        setEmailStudent(student);
        break;
      case "viewResume":
        setDocumentPreview({
          studentName: student.name,
          label: "Resume",
          fileName: student.documents.resume,
        });
        break;
      case "viewDocuments":
        setDocumentPreview({
          studentName: student.name,
          label: "All Documents",
          fileName: [
            student.documents.resume,
            student.documents.collegeId,
            ...student.documents.certificates,
          ]
            .filter(Boolean)
            .join(", "),
        });
        break;
      case "delete":
        setConfirmation({
          title: "Delete Student",
          message: `Delete ${student.name} permanently? This action cannot be undone.`,
          confirmLabel: "Delete",
          danger: true,
          onConfirm: () =>
            setStudents((prev) => prev.filter((s) => s.id !== student.id)),
        });
        break;
      default:
        break;
    }
  };
  if (initialLoading) {
    return <StudentsSkeleton />;
  }
  return (
    <div className="bg-surface-alt/40 -m-6 md:-m-8 p-6 md:p-8 min-h-full">
      <PageHeader
        title="Manage Students"
        subtitle="Monitor all registered students, internship applications, profile verification and hiring progress."
        actions={
          <>
            <button
              onClick={handleExport}
              className="flex items-center gap-1.5 rounded-xl border border-line bg-white px-3.5 py-2 text-sm font-body text-heading hover:bg-surface-alt transition-colors"
            >
              <Download className="w-4 h-4" strokeWidth={1.75} />
              Export
            </button>
            <button className="flex items-center gap-1.5 rounded-xl bg-primary px-3.5 py-2 text-sm font-body text-white hover:bg-primary/90 transition-colors">
              <Plus className="w-4 h-4" strokeWidth={1.75} />
              Add Student
            </button>
          </>
        }
      />

      <div className="space-y-5">
        <StudentStats students={students} />

        <StudentFilters
          filters={filters}
          onChange={(f) => {
            setFilters(f);
            setPage(1);
          }}
          onReset={handleReset}
          colleges={colleges}
        />

        <StudentTable
          rows={paginated}
          loading={loading}
          onAction={handleAction}
          onPreviewDocument={(student, label, fileName) =>
            setDocumentPreview({ studentName: student.name, label, fileName })
          }
        />

        {!loading && filtered.length > 0 && (
          <Pagination
            page={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        )}
      </div>

      {profileStudent && (
        <StudentProfileDrawer
          student={profileStudent}
          onClose={() => setProfileStudent(null)}
        />
      )}

      {editStudent && (
        <EditStudentDrawer
          student={editStudent}
          onClose={() => setEditStudent(null)}
          onSave={(updated) => {
            updateStudent(updated);
            setEditStudent(null);
          }}
        />
      )}

      {emailStudent && (
        <EmailModal
          student={emailStudent}
          onClose={() => setEmailStudent(null)}
          onSend={() => {
            alert(`Email sent to ${emailStudent.name} (demo only).`);
            setEmailStudent(null);
          }}
        />
      )}

      {documentPreview && (
        <DocumentPreviewModal
          document={documentPreview}
          onClose={() => setDocumentPreview(null)}
        />
      )}

      {confirmation && (
        <ConfirmationModal
          config={confirmation}
          onClose={() => setConfirmation(null)}
          onConfirm={() => {
            confirmation.onConfirm();
            setConfirmation(null);
          }}
        />
      )}
    </div>
  );
}
