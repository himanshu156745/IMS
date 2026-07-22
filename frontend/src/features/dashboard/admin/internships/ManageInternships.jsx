import { useState, useMemo } from "react";
import { Download, RefreshCw } from "lucide-react";
import PageHeader from "../../../../components/ui/PageHeader";
import Pagination from "../../../../components/ui/Pagination";
import InternshipStats from "./components/InternshipStats";
import InternshipFilters from "./components/InternshipFilters";
import InternshipTable from "./components/InternshipTable";

const MOCK_INTERNSHIPS = [
  {
    id: 1,
    name: "MERN Developer Internship",
    company: "Google",
    mentor: "Dr. Anil Kumar",
    department: "Computer Science",
    applicants: 42,
    status: "Active",
    deadline: "Aug 12, 2026",
    description:
      "Work on production React and Node.js features alongside the platform team, shipping real code reviewed by senior engineers.",
    skills: ["React", "Node.js", "MongoDB", "Express", "REST APIs"],
    duration: "3 months",
    assignedStudents: 6,
    mode: "Hybrid",
    openPositions: 4,
    lastUpdated: "Jul 20, 2026",
  },
  {
    id: 2,
    name: "Cloud Infrastructure Intern",
    company: "Amazon",
    mentor: "Dr. Suresh Rao",
    department: "Information Technology",
    applicants: 31,
    status: "Pending",
    deadline: "Aug 05, 2026",
    description:
      "Support the internal cloud tooling team with monitoring dashboards and infra automation scripts.",
    skills: ["AWS", "Docker", "Python", "Terraform"],
    duration: "6 months",
    assignedStudents: 0,
    mode: "Remote",
    openPositions: 3,
    lastUpdated: "Jul 18, 2026",
  },
  {
    id: 3,
    name: "Product Design Intern",
    company: "Figma",
    mentor: "Prof. Meena Iyer",
    department: "Design",
    applicants: 18,
    status: "Completed",
    deadline: "Jun 30, 2026",
    description:
      "Contribute to design system components and run usability tests for a new collaboration feature.",
    skills: ["Figma", "Prototyping", "UX Research"],
    duration: "2 months",
    assignedStudents: 2,
    mode: "Onsite",
    openPositions: 0,
    lastUpdated: "Jul 01, 2026",
  },
  {
    id: 4,
    name: "Growth Marketing Intern",
    company: "Stripe",
    mentor: "Dr. Anil Kumar",
    department: "MBA",
    applicants: 12,
    status: "Rejected",
    deadline: "Jul 10, 2026",
    description:
      "Assist the growth team with campaign analytics and A/B test reporting for onboarding flows.",
    skills: ["SQL", "Analytics", "A/B Testing"],
    duration: "3 months",
    assignedStudents: 0,
    mode: "Remote",
    openPositions: 0,
    lastUpdated: "Jul 11, 2026",
  },
];

const PAGE_SIZE = 10;

export default function ManageInternships() {
  const [filters, setFilters] = useState({ search: "", company: "", mentor: "", department: "", status: "" });
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const filtered = useMemo(() => {
    return MOCK_INTERNSHIPS.filter((r) => {
      if (filters.search && !r.name.toLowerCase().includes(filters.search.toLowerCase())) return false;
      if (filters.company && r.company !== filters.company) return false;
      if (filters.mentor && r.mentor !== filters.mentor) return false;
      if (filters.department && r.department !== filters.department) return false;
      if (filters.status && r.status !== filters.status) return false;
      return true;
    });
  }, [filters]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const companies = [...new Set(MOCK_INTERNSHIPS.map((r) => r.company))];
  const mentors = [...new Set(MOCK_INTERNSHIPS.map((r) => r.mentor))];
  const departments = [...new Set(MOCK_INTERNSHIPS.map((r) => r.department))];

  const handleReset = () => {
    setFilters({ search: "", company: "", mentor: "", department: "", status: "" });
    setPage(1);
  };

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 600);
  };

  return (
    <div className="bg-surface-alt/40 -m-6 md:-m-8 p-6 md:p-8 min-h-full">
      <PageHeader
        title="Manage Internships"
        subtitle="View, organize and monitor all internship opportunities."
        actions={
          <>
            <button className="flex items-center gap-1.5 rounded-xl border border-line bg-white px-3.5 py-2 text-sm font-body text-heading hover:bg-surface-alt transition-colors">
              <Download className="w-4 h-4" strokeWidth={1.75} />
              Export
            </button>
            <button
              onClick={handleRefresh}
              className="flex items-center gap-1.5 rounded-xl bg-primary px-3.5 py-2 text-sm font-body text-white hover:bg-primary/90 transition-colors"
            >
              <RefreshCw className="w-4 h-4" strokeWidth={1.75} />
              Refresh
            </button>
          </>
        }
      />

      <div className="space-y-5">
        <InternshipStats />

        <InternshipFilters
          filters={filters}
          onChange={(f) => {
            setFilters(f);
            setPage(1);
          }}
          onReset={handleReset}
          companies={companies}
          mentors={mentors}
          departments={departments}
        />

        <InternshipTable rows={paginated} loading={loading} />

        {!loading && filtered.length > 0 && (
          <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
        )}
      </div>
    </div>
  );
}