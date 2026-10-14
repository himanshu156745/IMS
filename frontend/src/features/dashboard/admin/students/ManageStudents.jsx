import { useState, useMemo, useEffect, useCallback } from "react";
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
import axiosInstance from "../../../../utils/axiosInstance";
import { unwrapList } from "../../../../utils/api";
import toast from "react-hot-toast";

const PAGE_SIZE = 10;

const EMPTY_FILTERS = {
  name: "",
  email: "",
  college: "",
  hiringStatus: "",
  interviewStatus: "",
  applicationStatus: "",
};

const mapUserToStudent = (u, applicationsByStudent = {}) => {
  const p = u.studentProfile || u.profile || {};
  const app = applicationsByStudent[u._id] || null;

  // Calculate profile completion percentage
  const checks = [
    p.fullName,
    u.email,
    p.phoneNumber,
    p.university,
    p.branch,
    p.semester,
    p.skills && p.skills.length > 0,
    p.resumeUrl,
  ];
  const filled = checks.filter(Boolean).length;
  const profileCompletion = Math.round((filled / checks.length) * 100);

  const rawStatus = app?.status || "applied";
  let appStatus = "Applied";
  if (rawStatus === "accepted") appStatus = "Selected";
  else if (rawStatus === "shortlisted") appStatus = "Shortlisted";
  else if (rawStatus === "rejected") appStatus = "Rejected";
  else if (rawStatus === "reviewed") appStatus = "Under Review";

  return {
    id: u._id,
    _id: u._id,
    userId: u._id,
    profileId: p._id,
    applicationId: app?._id,
    name: p.fullName || u.email?.split("@")[0] || "Student",
    email: u.email || "",
    phone: p.phoneNumber || "N/A",
    photo:
      p.avatarUrl ||
      `https://ui-avatars.com/api/?name=${encodeURIComponent(
        p.fullName || u.email?.split("@")[0] || "Student"
      )}&background=4f46e5&color=fff`,
    college: p.university || "Unassigned",
    branch: p.branch || "General",
    semester: p.semester ? `${p.semester}th Semester` : "N/A",
    internshipApplied: app?.internship?.title || "No Active Internship",
    profileCompletion,
    applicationStatus: appStatus,
    hiringStatus:
      appStatus === "Selected"
        ? "Selected"
        : appStatus === "Shortlisted"
        ? "Shortlisted"
        : "Applied",
    skills: p.skills || [],
    github: p.github || "",
    linkedin: p.linkedin || "",
    portfolio: p.portfolio || "",
    documents: {
      resume: p.resumeUrl ? "resume.pdf" : "",
      collegeId: "",
      certificates: [],
    },
    interview: {
      date: "",
      time: "",
      mode: "",
      status: "Not Scheduled",
    },
    adminNotes: "",
    isActive: u.isActive !== false,
  };
};

export default function ManageStudents() {
  const [students, setStudents] = useState([]);
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

  const fetchStudents = useCallback(async () => {
    setLoading(true);
    try {
      const [usersRes, appsRes] = await Promise.allSettled([
        axiosInstance.get("/admin/users", { params: { role: "student", limit: 100 } }),
        axiosInstance.get("/admin/applications", { params: { limit: 100 } }),
      ]);

      const usersList = usersRes.status === "fulfilled" ? unwrapList(usersRes.value) : [];
      const appsList = appsRes.status === "fulfilled" ? unwrapList(appsRes.value) : [];

      const appsByStudent = {};
      appsList.forEach((app) => {
        const studentId = app.student?._id || app.student;
        if (studentId && !appsByStudent[studentId]) {
          appsByStudent[studentId] = app;
        }
      });

      const mapped = usersList.map((u) => mapUserToStudent(u, appsByStudent));
      setStudents(mapped);
    } catch (err) {
      console.error("Failed to fetch students", err);
    } finally {
      setLoading(false);
      setInitialLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

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
        s.interview?.status !== filters.interviewStatus
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
  const colleges = useMemo(
    () => [...new Set(students.map((s) => s.college).filter(Boolean))],
    [students]
  );

  const handleReset = () => {
    setFilters(EMPTY_FILTERS);
    setPage(1);
  };

  const handleExport = () => {
    if (filtered.length === 0) return;
    const headers = [
      "Name",
      "Email",
      "College",
      "Branch",
      "Semester",
      "Internship Applied",
      "Application Status",
      "Hiring Status",
    ];
    const csvRows = [
      headers.join(","),
      ...filtered.map((s) =>
        [
          `"${s.name || ""}"`,
          `"${s.email || ""}"`,
          `"${s.college || ""}"`,
          `"${s.branch || ""}"`,
          `"${s.semester || ""}"`,
          `"${s.internshipApplied || ""}"`,
          `"${s.applicationStatus || ""}"`,
          `"${s.hiringStatus || ""}"`,
        ].join(",")
      ),
    ];
    const blob = new Blob([csvRows.join("\n")], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `students_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Students exported to CSV");
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
          onConfirm: async () => {
            try {
              if (student.applicationId) {
                await axiosInstance.patch(`/applications/${student.applicationId}/status`, {
                  status: "shortlisted",
                });
              }
              updateStudent({
                ...student,
                applicationStatus: "Shortlisted",
                hiringStatus: "Shortlisted",
              });
              toast.success(`Profile approved for ${student.name}`);
            } catch (err) {
              console.error("Failed to approve student profile", err);
              toast.error(err.response?.data?.message || "Failed to approve profile");
            }
          },
        });
        break;
      case "reject":
        setConfirmation({
          title: "Reject Profile",
          message: `Reject ${student.name}'s profile? This action can be reversed later.`,
          confirmLabel: "Reject",
          danger: true,
          onConfirm: async () => {
            try {
              if (student.applicationId) {
                await axiosInstance.patch(`/applications/${student.applicationId}/status`, {
                  status: "rejected",
                });
              }
              updateStudent({
                ...student,
                applicationStatus: "Rejected",
                hiringStatus: "Rejected",
              });
              toast.success(`Profile rejected for ${student.name}`);
            } catch (err) {
              console.error("Failed to reject student profile", err);
              toast.error(err.response?.data?.message || "Failed to reject profile");
            }
          },
        });
        break;
      case "changeHiring":
        setConfirmation({
          title: "Change Hiring Status",
          message: `Move ${student.name} to the next hiring stage?`,
          confirmLabel: "Update",
          onConfirm: () => {
            updateStudent({ ...student, hiringStatus: "Interview Scheduled" });
            toast.success("Hiring status updated");
          },
        });
        break;
      case "scheduleInterview":
        setConfirmation({
          title: "Schedule Interview",
          message: `Schedule an interview for ${student.name}?`,
          confirmLabel: "Schedule",
          onConfirm: () => {
            updateStudent({
              ...student,
              interview: {
                date: new Date(Date.now() + 86400000 * 3).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                }),
                time: "11:00 AM",
                mode: "Online",
                status: "Scheduled",
              },
            });
            toast.success("Interview scheduled");
          },
        });
        break;
      case "sendEmail":
        setEmailStudent(student);
        break;
      case "viewResume":
        setDocumentPreview({
          studentName: student.name,
          label: "Resume",
          fileName: student.documents.resume || "No resume uploaded",
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
            .join(", ") || "No documents available",
        });
        break;
      case "delete":
        setConfirmation({
          title: "Delete Student",
          message: `Delete ${student.name} permanently? This action cannot be undone.`,
          confirmLabel: "Delete",
          danger: true,
          onConfirm: async () => {
            try {
              await axiosInstance.delete(`/admin/users/${student.id || student._id}`);
              setStudents((prev) => prev.filter((s) => s.id !== student.id && s._id !== student.id));
              toast.success(`${student.name} deleted successfully`);
            } catch (err) {
              console.error("Failed to delete student", err);
              toast.error(err.response?.data?.message || "Failed to delete student");
            }
          },
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
            <button
              onClick={fetchStudents}
              className="flex items-center gap-1.5 rounded-xl bg-primary px-3.5 py-2 text-sm font-body text-white hover:bg-primary/90 transition-colors"
            >
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
