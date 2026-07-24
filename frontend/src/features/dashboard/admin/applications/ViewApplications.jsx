// import { useState, useMemo, useEffect } from "react";
// import { Download, Upload } from "lucide-react";
// import PageHeader from "../../../../components/ui/PageHeader";
// import Pagination from "../../../../components/ui/Pagination";
// import ApplicationStats from "./ApplicationStats";
// import ApplicationFilters from "./ApplicationFilters";
// import ApplicationsTable from "./ApplicationsTable";
// import BulkActionBar from "./BulkActionBar";
// import NotificationPanel from "./NotificationPanel";
// import ActivityTimeline from "./ActivityTimeline";
// import AnalyticsSection from "./AnalyticsSection";
// import StudentProfileDrawer from "./StudentProfileDrawer";
// import ResumePreviewModal from "./ResumePreviewModal";
// import InterviewScheduler from "./InterviewScheduler";
// import EmptyApplications from "./EmptyApplications";
// import LoadingSkeleton from "./LoadingSkeleton";
// import { APPLICATIONS } from "./data/applicationsData";

import { useState, useMemo, useEffect } from "react";
import { Download, Upload } from "lucide-react";
import PageHeader from "../../../../components/ui/PageHeader";
import Pagination from "../../../../components/ui/Pagination";
import ApplicationStats from "./components/ApplicationStats";
import ApplicationFilters from "./components/ApplicationFilters";
import ApplicationsTable from "./components/ApplicationsTable";
import BulkActionBar from "./components/BulkActionBar";
import NotificationPanel from "./components/NotificationPanel";
import ActivityTimeline from "./components/ActivityTimeline";
import AnalyticsSection from "./components/AnalyticsSection";
import StudentProfileDrawer from "./components/StudentProfileDrawer";
import ResumePreviewModal from "./components/ResumePreviewModal";
import InterviewScheduler from "./components/InterviewScheduler";
import EmptyApplications from "./components/EmptyApplications";
import LoadingSkeleton from "./components/LoadingSkeleton";
import { APPLICATIONS } from "./data/applicationsData";

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
  const [applications, setApplications] = useState(APPLICATIONS);
  const [filters, setFilters] = useState(EMPTY_FILTERS);
  const [page, setPage] = useState(1);
  const [initialLoading, setInitialLoading] = useState(true);
  const [selectedIds, setSelectedIds] = useState([]);
  const [profileApp, setProfileApp] = useState(null);
  const [resumeDoc, setResumeDoc] = useState(null);
  const [schedulerApp, setSchedulerApp] = useState(null);

  useEffect(() => {
    const t = setTimeout(() => setInitialLoading(false), 600);
    return () => clearTimeout(t);
  }, []);

  const filtered = useMemo(() => {
    return applications.filter((a) => {
      const q = filters.query.toLowerCase();
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
      if (
        filters.minCgpa &&
        parseFloat(a.student.cgpa) < parseFloat(filters.minCgpa)
      )
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

  const updateApplication = (id, patch) => {
    setApplications((prev) =>
      prev.map((a) => (a.id === id ? { ...a, ...patch } : a)),
    );
  };

  const toggleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };

  const toggleSelectAll = (checked) => {
    setSelectedIds(checked ? paginated.map((r) => r.id) : []);
  };

  const handleBulkAction = (action) => {
    switch (action) {
      case "accept":
        selectedIds.forEach((id) =>
          updateApplication(id, { status: "Accepted" }),
        );
        break;
      case "reject":
        selectedIds.forEach((id) =>
          updateApplication(id, { status: "Rejected" }),
        );
        break;
      case "assign":
        selectedIds.forEach((id) =>
          updateApplication(id, { status: "Assigned" }),
        );
        break;
      case "export":
        alert(`Exporting ${selectedIds.length} applications (demo only).`);
        break;
      case "delete":
        if (
          confirm(
            `Delete ${selectedIds.length} selected applications? This cannot be undone.`,
          )
        ) {
          setApplications((prev) =>
            prev.filter((a) => !selectedIds.includes(a.id)),
          );
        }
        break;
      default:
        break;
    }
    setSelectedIds([]);
  };

  const handleAction = (key, row) => {
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
        alert(`Downloading ${row.documents.resume} (demo only).`);
        break;
      case "shortlist":
        updateApplication(row.id, { status: "Shortlisted" });
        break;
      case "accept":
        updateApplication(row.id, { status: "Accepted" });
        break;
      case "reject":
        if (confirm(`Reject ${row.student.name}'s application?`))
          updateApplication(row.id, { status: "Rejected" });
        break;
      case "scheduleInterview":
        setSchedulerApp(row);
        break;
      case "assign":
        updateApplication(row.id, { status: "Assigned" });
        break;
      case "addNote":
        setProfileApp(row);
        break;
      case "delete":
        if (confirm(`Delete ${row.student.name}'s application permanently?`)) {
          setApplications((prev) => prev.filter((a) => a.id !== row.id));
        }
        break;
      default:
        break;
    }
  };

  return (
    <div className="bg-surface-alt/40 -m-6 md:-m-8 p-6 md:p-8 min-h-full">
      <PageHeader
        title="View Applications"
        subtitle="Review, manage and track all internship applications submitted by students."
        actions={
          <>
            <button
              onClick={() => alert("Importing applications (demo only).")}
              className="flex items-center gap-1.5 rounded-xl border border-line bg-white px-3.5 py-2 text-sm font-body text-heading hover:bg-surface-alt transition-colors"
            >
              <Upload className="w-4 h-4" strokeWidth={1.75} />
              Import Data
            </button>
            <button
              onClick={() => alert("Exporting applications (demo only).")}
              className="flex items-center gap-1.5 rounded-xl bg-primary px-3.5 py-2 text-sm font-body text-white hover:bg-primary/90 transition-colors"
            >
              <Download className="w-4 h-4" strokeWidth={1.75} />
              Export Applications
            </button>
          </>
        }
      />

      {initialLoading ? (
        <LoadingSkeleton />
      ) : (
        <div className="space-y-5">
          <ApplicationStats applications={applications} />

          {/* <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
            <div className="xl:col-span-2">
              <NotificationPanel applications={applications} />
            </div>
            <ActivityTimeline
              activities={applications.slice(0, 5).map((a) => ({
                text: `${a.student.name} — ${a.status} for ${a.internship.title}`,
                time: a.appliedDate,
              }))}
            />
          </div> */}

          <NotificationPanel applications={applications} />
          {/* <AnalyticsSection applications={applications} /> */}

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
                    text: `${a.student.name} — ${a.status} for ${a.internship.title}`,
                    time: a.appliedDate,
                  }))}
                />
              </div>
            </>
          )}
        </div>
      )}

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
