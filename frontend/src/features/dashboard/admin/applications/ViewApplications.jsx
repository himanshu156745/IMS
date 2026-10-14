import { useState, useMemo, useEffect } from "react";
import { Download, Upload } from "lucide-react";
import PageHeader from "../../../../components/ui/PageHeader";
import Pagination from "../../../../components/ui/Pagination";
import ApplicationStats from "./components/ApplicationStats";
import ApplicationFilters from "./components/ApplicationFilters";
import ApplicationsTable from "./components/ApplicationsTable";
import BulkActionBar from "./components/BulkActionBar";
import NotificationPanel from "./components/NotificationPanel";
import ActivityTimeline from "../../../../components/ui/ActivityTimeline";
import AnalyticsSection from "./components/AnalyticsSection";
import StudentProfileDrawer from "./components/StudentProfileDrawer";
import ResumePreviewModal from "./components/ResumePreviewModal";
import InterviewScheduler from "./components/InterviewScheduler";
import EmptyApplications from "./components/EmptyApplications";
import ApplicationsSkeleton from "./components/ApplicationsSkeleton";
import axiosInstance from "../../../../utils/axiosInstance";
import { unwrapList } from "../../../../utils/api";
import toast from "react-hot-toast";

const PAGE_SIZE = 10;

const EMPTY_FILTERS = {
  query: "",
  status: "",
  branch: "",
  college: "",
  priority: "",
  minCgpa: "",
};

export default function ViewApplications() {
  const [applications, setApplications] = useState([]);
  const [filters, setFilters] = useState(EMPTY_FILTERS);
  const [page, setPage] = useState(1);
  const [initialLoading, setInitialLoading] = useState(true);
  const [selectedIds, setSelectedIds] = useState([]);
  const [profileApp, setProfileApp] = useState(null);
  const [resumeDoc, setResumeDoc] = useState(null);
  const [schedulerApp, setSchedulerApp] = useState(null);

  const fetchApplications = () => {
    return axiosInstance.get('/admin/applications')
      .then(res => {
        const live = unwrapList(res);
        if (Array.isArray(live)) {
          const formatted = live.map((item, idx) => ({
            id: item._id || `APP${String(idx + 1).padStart(4, "0")}`,
            _id: item._id,
            student: {
              name: item.studentProfile?.fullName || item.student?.email?.split('@')[0] || "Student Applicant",
              email: item.student?.email || "student@college.edu",
              phone: item.studentProfile?.phoneNumber || "N/A",
              college: item.studentProfile?.university || "University",
              branch: item.studentProfile?.branch || item.studentProfile?.course || "Computer Science",
              semester: item.studentProfile?.semester || 1,
              cgpa: item.studentProfile?.cgpa ? String(item.studentProfile.cgpa) : "0.0",
              skills: item.studentProfile?.skills?.length ? item.studentProfile.skills : [],
              photo: item.studentProfile?.avatarUrl || `https://i.pravatar.cc/150?u=${item._id || idx}`,
              github: item.studentProfile?.github || null,
              linkedin: item.studentProfile?.linkedin || null,
              portfolio: item.studentProfile?.portfolio || null
            },
            internship: {
              title: item.internship?.title || "Internship Role",
              company: item.internship?.company?.name || "Partner Company",
              requiredSkills: item.internship?.requirements || []
            },
            resume: item.resumeUrl || "Resume.pdf",
            appliedDate: item.createdAt ? new Date(item.createdAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }) : "N/A",
            priority: "Medium",
            skillMatch: { percentage: item.studentProfile?.skills?.length ? 85 : 50, matched: item.studentProfile?.skills || [], missing: [] },
            status: item.status ? item.status.charAt(0).toUpperCase() + item.status.slice(1) : "Applied",
            documents: {
              resume: item.resumeUrl || "Resume.pdf",
              certificates: [],
              coverLetter: item.coverLetter || null,
              idProof: "ID_Proof.pdf",
              portfolio: item.studentProfile?.portfolio || null
            },
            interview: null,
            adminNotes: [],
            history: [{ step: "Applied", date: item.createdAt ? new Date(item.createdAt).toLocaleDateString() : "N/A" }]
          }));
          setApplications(formatted);
        } else {
          setApplications([]);
        }
      })
      .catch((err) => {
        console.error("Failed to fetch applications:", err);
        setApplications([]);
      });
  };

  useEffect(() => {
    let isMounted = true;
    fetchApplications().finally(() => {
      if (isMounted) setInitialLoading(false);
    });

    return () => { isMounted = false; };
  }, []);

  const filtered = useMemo(() => {
    const q = filters.query.toLowerCase();
    const minCgpaNum = filters.minCgpa ? parseFloat(filters.minCgpa) : 0;

    return applications.filter((a) => {
      if (
        q &&
        !a.student.name.toLowerCase().includes(q) &&
        !a.student.email.toLowerCase().includes(q) &&
        !a.internship.title.toLowerCase().includes(q) &&
        !a.student.college.toLowerCase().includes(q) &&
        !a.student.skills.some((s) => s.toLowerCase().includes(q))
      )
        return false;
      if (filters.status && a.status !== filters.status) return false;
      if (filters.branch && a.student.branch !== filters.branch) return false;
      if (filters.college && a.student.college !== filters.college)
        return false;
      if (filters.priority && a.priority !== filters.priority) return false;
      if (minCgpaNum && parseFloat(a.student.cgpa) < minCgpaNum)
        return false;
      return true;
    });
  }, [applications, filters]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleReset = () => {
    setFilters(EMPTY_FILTERS);
    setPage(1);
  };

  const updateApplication = async (id, patch) => {
    setApplications((prev) =>
      prev.map((a) => (a.id === id ? { ...a, ...patch } : a)),
    );
    if (patch.status && typeof id === 'string' && id.length === 24) {
      try {
        await axiosInstance.patch(`/applications/${id}/status`, { status: patch.status.toLowerCase() });
      } catch (err) {
        console.error("Failed to update application status:", err);
      }
    }
  };

  const toggleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };

  const toggleSelectAll = (checked) => {
    setSelectedIds(checked ? paginated.map((r) => r.id) : []);
  };

  const exportAppsToCsv = (appsToExport, filename = "applications") => {
    if (!appsToExport || appsToExport.length === 0) {
      toast.error("No applications to export");
      return;
    }
    const headers = ["Student Name", "Email", "Internship", "Company", "Status", "Applied Date", "Match Score"];
    const csvRows = [
      headers.join(","),
      ...appsToExport.map((a) =>
        [
          `"${a.student?.name || ""}"`,
          `"${a.student?.email || ""}"`,
          `"${a.internship?.role || a.internship?.name || ""}"`,
          `"${a.internship?.company || ""}"`,
          `"${a.status || ""}"`,
          `"${a.timeline?.appliedDate || ""}"`,
          a.matchScore || 0,
        ].join(",")
      ),
    ];
    const blob = new Blob([csvRows.join("\n")], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `${filename}_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Applications exported to CSV");
  };

  const handleBulkAction = async (action) => {
    if (selectedIds.length === 0) return;

    switch (action) {
      case "accept":
        setApplications((prev) => prev.map(a => selectedIds.includes(a.id) ? { ...a, status: "Accepted" } : a));
        await Promise.allSettled(selectedIds.map(id => typeof id === 'string' && id.length === 24 ? axiosInstance.patch(`/applications/${id}/status`, { status: 'accepted' }) : Promise.resolve()));
        toast.success(`Accepted ${selectedIds.length} application(s)`);
        break;
      case "reject":
        setApplications((prev) => prev.map(a => selectedIds.includes(a.id) ? { ...a, status: "Rejected" } : a));
        await Promise.allSettled(selectedIds.map(id => typeof id === 'string' && id.length === 24 ? axiosInstance.patch(`/applications/${id}/status`, { status: 'rejected' }) : Promise.resolve()));
        toast.success(`Rejected ${selectedIds.length} application(s)`);
        break;
      case "assign":
        setApplications((prev) => prev.map(a => selectedIds.includes(a.id) ? { ...a, status: "Assigned" } : a));
        toast.success(`Assigned ${selectedIds.length} application(s)`);
        break;
      case "export":
        {
          const selectedApps = applications.filter((a) => selectedIds.includes(a.id));
          exportAppsToCsv(selectedApps, "selected_applications");
        }
        break;
      case "delete":
        if (
          confirm(
            `Delete ${selectedIds.length} selected applications? This cannot be undone.`,
          )
        ) {
          const idsToDelete = [...selectedIds];
          setApplications((prev) =>
            prev.filter((a) => !idsToDelete.includes(a.id)),
          );
          await Promise.allSettled(idsToDelete.map(id => typeof id === 'string' && id.length === 24 ? axiosInstance.delete(`/admin/applications/${id}`) : Promise.resolve()));
          toast.success(`Deleted ${idsToDelete.length} application(s)`);
        }
        break;
      default:
        break;
    }
    setSelectedIds([]);
  };

  const handleAction = async (key, row) => {
    switch (key) {
      case "view":
        setProfileApp(row);
        break;
      case "viewResume":
        setResumeDoc({
          studentName: row.student.name,
          label: "Resume",
          fileName: row.documents.resume,
        });
        break;
      case "downloadResume":
        if (row.documents.resume && row.documents.resume.startsWith('http')) {
          window.open(row.documents.resume, '_blank');
        } else {
          toast.info(`Downloading ${row.documents.resume || 'resume.pdf'}`);
        }
        break;
      case "shortlist":
        await updateApplication(row.id, { status: "Shortlisted" });
        toast.success(`Application shortlisted`);
        break;
      case "accept":
        await updateApplication(row.id, { status: "Accepted" });
        toast.success(`Application accepted`);
        break;
      case "reject":
        if (confirm(`Reject ${row.student.name}'s application?`)) {
          await updateApplication(row.id, { status: "Rejected" });
          toast.success(`Application rejected`);
        }
        break;
      case "scheduleInterview":
        setSchedulerApp(row);
        break;
      case "assign":
        await updateApplication(row.id, { status: "Assigned" });
        toast.success(`Application assigned`);
        break;
      case "addNote":
        setProfileApp(row);
        break;
      case "delete":
        if (confirm(`Delete ${row.student.name}'s application permanently?`)) {
          setApplications((prev) => prev.filter((a) => a.id !== row.id));
          if (typeof row.id === 'string' && row.id.length === 24) {
            try {
              await axiosInstance.delete(`/admin/applications/${row.id}`);
              toast.success("Application deleted");
            } catch (err) {
              console.error("Failed to delete application:", err);
              toast.error(err.response?.data?.message || "Failed to delete application");
            }
          } else {
            toast.success("Application deleted");
          }
        }
        break;
      default:
        break;
    }
  };

  if (initialLoading) {
    return (
      <div className="bg-surface-alt/40 -m-6 md:-m-8 p-6 md:p-8 min-h-full">
        <ApplicationsSkeleton />
      </div>
    );
  }

  return (
    <div className="bg-surface-alt/40 -m-6 md:-m-8 p-6 md:p-8 min-h-full">
      <PageHeader
        title="View Applications"
        subtitle="Review, manage and track all internship applications submitted by students."
        actions={
          <>
            <button
              onClick={() => toast.info("Import feature is ready for dataset sync")}
              className="flex items-center gap-1.5 rounded-xl border border-line bg-white px-3.5 py-2 text-sm font-body text-heading hover:bg-surface-alt transition-colors"
            >
              <Upload className="w-4 h-4" strokeWidth={1.75} />
              Import Data
            </button>
            <button
              onClick={() => exportAppsToCsv(filtered, "applications")}
              className="flex items-center gap-1.5 rounded-xl bg-primary px-3.5 py-2 text-sm font-body text-white hover:bg-primary/90 transition-colors"
            >
              <Download className="w-4 h-4" strokeWidth={1.75} />
              Export Applications
            </button>
          </>
        }
      />
      <div className="space-y-5">
        <ApplicationStats applications={applications} />

        <NotificationPanel applications={applications} />

        <ApplicationFilters
          filters={filters}
          onChange={(f) => {
            setFilters(f);
            setPage(1);
          }}
          onReset={handleReset}
        />

        <BulkActionBar
          selectedCount={selectedIds.length}
          onBulkAction={handleBulkAction}
          onClear={() => setSelectedIds([])}
        />

        {filtered.length === 0 ? (
          <EmptyApplications onResetFilters={handleReset} />
        ) : (
          <>
            <ApplicationsTable
              rows={paginated}
              loading={false}
              selectedIds={selectedIds}
              onToggleSelect={toggleSelect}
              onToggleSelectAll={toggleSelectAll}
              onAction={handleAction}
            />

            <Pagination
              page={page}
              totalPages={totalPages}
              onPageChange={setPage}
            />

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-5 mt-6">
              <div className="xl:col-span-2">
                <AnalyticsSection applications={applications} />
              </div>

              <ActivityTimeline
                activities={applications.slice(0, 5).map((a) => ({
                  type: "Application Submitted",
                  message: `${a.student.name} — ${a.status} for ${a.internship.title}`,
                  time: a.appliedDate,
                }))}
              />
            </div>
          </>
        )}
      </div>

      {profileApp && (
        <StudentProfileDrawer
          application={profileApp}
          onClose={() => setProfileApp(null)}
          onAddNote={(note) => {
            const updated = {
              ...profileApp,
              adminNotes: [...profileApp.adminNotes, note],
            };
            updateApplication(profileApp.id, {
              adminNotes: updated.adminNotes,
            });
            setProfileApp(updated);
          }}
          onViewDocument={(label, fileName) =>
            setResumeDoc({
              studentName: profileApp.student.name,
              label,
              fileName,
            })
          }
        />
      )}

      {resumeDoc && (
        <ResumePreviewModal
          document={resumeDoc}
          onClose={() => setResumeDoc(null)}
        />
      )}

      {schedulerApp && (
        <InterviewScheduler
          application={schedulerApp}
          onClose={() => setSchedulerApp(null)}
          onSave={(interview) => {
            updateApplication(schedulerApp.id, {
              interview,
              status: "Interview Scheduled",
            });
            setSchedulerApp(null);
          }}
        />
      )}
    </div>
  );
}
