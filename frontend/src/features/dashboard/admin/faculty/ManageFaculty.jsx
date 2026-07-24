// import { useState, useMemo } from "react";
// import { Download, Plus } from "lucide-react";
// import PageHeader from "../../../../components/ui/PageHeader";
// import Pagination from "../../../../components/ui/Pagination";
// import FacultyStats from "./components/FacultyStats";
// import FacultyFilters from "./components/FacultyFilters";
// import FacultyTable from "./components/FacultyTable";
// import ConfirmationModal from "./components/ConfirmationModal";
// import { MOCK_FACULTY } from "./data/facultyData";

// const PAGE_SIZE = 10;

// const EMPTY_FILTERS = {
//   name: "",
//   department: "",
//   status: "",
//   experience: "",
//   sort: "",
// };

// export default function ManageFaculty() {
//   const [faculty, setFaculty] = useState(MOCK_FACULTY);
//   const [filters, setFilters] = useState(EMPTY_FILTERS);
//   const [page, setPage] = useState(1);
//   const [loading, setLoading] = useState(false);
//   const [confirmation, setConfirmation] = useState(null);

//   const filtered = useMemo(() => {
//     let result = faculty.filter((f) => {
//       if (
//         filters.name &&
//         !f.name.toLowerCase().includes(filters.name.toLowerCase()) &&
//         !f.facultyId.toLowerCase().includes(filters.name.toLowerCase())
//       )
//         return false;
//       if (filters.department && f.department !== filters.department) return false;
//       if (filters.status && f.status !== filters.status) return false;
//       if (filters.experience) {
//         const [min, max] = filters.experience.replace("+", "-999").split("-").map(Number);
//         if (f.experience < min || f.experience > max) return false;
//       }
//       return true;
//     });

//     if (filters.sort === "name-asc") result = [...result].sort((a, b) => a.name.localeCompare(b.name));
//     if (filters.sort === "experience-desc") result = [...result].sort((a, b) => b.experience - a.experience);
//     if (filters.sort === "rating-desc") result = [...result].sort((a, b) => b.rating - a.rating);

//     return result;
//   }, [faculty, filters]);

//   const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
//   const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

//   const handleReset = () => {
//     setFilters(EMPTY_FILTERS);
//     setPage(1);
//   };

//   const handleExport = () => {
//     setLoading(true);
//     setTimeout(() => {
//       setLoading(false);
//       alert("Exporting faculty to CSV (demo only).");
//     }, 500);
//   };

//   const updateFaculty = (updated) => {
//     setFaculty((prev) => prev.map((f) => (f.id === updated.id ? updated : f)));
//   };

//   const handleAction = (key, member) => {
//     switch (key) {
//       case "view":
//         alert(`View profile for ${member.name} (demo only).`);
//         break;
//       case "edit":
//         alert(`Edit ${member.name} (demo only).`);
//         break;
//       case "assign":
//         alert(`Assign students to ${member.name} (demo only).`);
//         break;
//       case "deactivate":
//         setConfirmation({
//           title: "Deactivate Faculty",
//           message: `Deactivate ${member.name}? They will lose access until reactivated.`,
//           confirmLabel: "Deactivate",
//           danger: true,
//           onConfirm: () => updateFaculty({ ...member, status: "Inactive" }),
//         });
//         break;
//       case "resetPassword":
//         setConfirmation({
//           title: "Reset Password",
//           message: `Send a password reset link to ${member.name} (${member.email})?`,
//           confirmLabel: "Send Reset Link",
//           onConfirm: () => alert(`Password reset link sent to ${member.email} (demo only).`),
//         });
//         break;
//       case "delete":
//         setConfirmation({
//           title: "Delete Faculty",
//           message: `Delete ${member.name} permanently? This action cannot be undone.`,
//           confirmLabel: "Delete",
//           danger: true,
//           onConfirm: () => setFaculty((prev) => prev.filter((f) => f.id !== member.id)),
//         });
//         break;
//       default:
//         break;
//     }
//   };

//   return (
//     <div className="bg-surface-alt/40 -m-6 md:-m-8 p-6 md:p-8 min-h-full">
//       <PageHeader
//         title="Manage Faculty"
//         subtitle="View, add and manage faculty mentors, their departments, subjects and assigned students."
//         actions={
//           <>
//             <button
//               onClick={handleExport}
//               className="flex items-center gap-1.5 rounded-xl border border-line bg-white px-3.5 py-2 text-sm font-body text-heading hover:bg-surface-alt transition-colors"
//             >
//               <Download className="w-4 h-4" strokeWidth={1.75} />
//               Export
//             </button>
//             <button className="flex items-center gap-1.5 rounded-xl bg-primary px-3.5 py-2 text-sm font-body text-white hover:bg-primary/90 transition-colors">
//               <Plus className="w-4 h-4" strokeWidth={1.75} />
//               Add Faculty
//             </button>
//           </>
//         }
//       />

//       <div className="space-y-5">
//         <FacultyStats faculty={faculty} />

//         <FacultyFilters
//           filters={filters}
//           onChange={(f) => {
//             setFilters(f);
//             setPage(1);
//           }}
//           onReset={handleReset}
//         />

//         <FacultyTable rows={paginated} loading={loading} onAction={handleAction} />

//         {!loading && filtered.length > 0 && (
//           <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
//         )}
//       </div>

//       {confirmation && (
//         <ConfirmationModal
//           config={confirmation}
//           onClose={() => setConfirmation(null)}
//           onConfirm={() => {
//             confirmation.onConfirm();
//             setConfirmation(null);
//           }}
//         />
//       )}
//     </div>
//   );
// }

import { useState, useMemo, useEffect } from "react";
import { Download, Plus } from "lucide-react";
import PageHeader from "../../../../components/ui/PageHeader";
import Pagination from "../../../../components/ui/Pagination";
import FacultyStats from "./components/FacultyStats";
import FacultyFilters from "./components/FacultyFilters";
import FacultyTable from "./components/FacultyTable";
import ConfirmationModal from "./components/ConfirmationModal";
import { MOCK_FACULTY } from "./data/facultyData";

const PAGE_SIZE = 10;

const EMPTY_FILTERS = {
  name: "",
  department: "",
  status: "",
  experience: "",
  sort: "",
};

export default function ManageFaculty() {
  const [faculty, setFaculty] = useState(MOCK_FACULTY);
  const [filters, setFilters] = useState(EMPTY_FILTERS);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [confirmation, setConfirmation] = useState(null);

  useEffect(() => {
    const t = setTimeout(() => setInitialLoading(false), 600);
    return () => clearTimeout(t);
  }, []);

  const filtered = useMemo(() => {
    let result = faculty.filter((f) => {
      if (
        filters.name &&
        !f.name.toLowerCase().includes(filters.name.toLowerCase()) &&
        !f.facultyId.toLowerCase().includes(filters.name.toLowerCase())
      )
        return false;
      if (filters.department && f.department !== filters.department) return false;
      if (filters.status && f.status !== filters.status) return false;
      if (filters.experience) {
        const [min, max] = filters.experience.replace("+", "-999").split("-").map(Number);
        if (f.experience < min || f.experience > max) return false;
      }
      return true;
    });

    if (filters.sort === "name-asc") result = [...result].sort((a, b) => a.name.localeCompare(b.name));
    if (filters.sort === "experience-desc") result = [...result].sort((a, b) => b.experience - a.experience);
    if (filters.sort === "rating-desc") result = [...result].sort((a, b) => b.rating - a.rating);

    return result;
  }, [faculty, filters]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleReset = () => {
    setFilters(EMPTY_FILTERS);
    setPage(1);
  };

  const handleExport = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert("Exporting faculty to CSV (demo only).");
    }, 500);
  };

  const updateFaculty = (updated) => {
    setFaculty((prev) => prev.map((f) => (f.id === updated.id ? updated : f)));
  };

  const handleAction = (key, member) => {
    switch (key) {
      case "view":
        alert(`View profile for ${member.name} (demo only).`);
        break;
      case "edit":
        alert(`Edit ${member.name} (demo only).`);
        break;
      case "assign":
        alert(`Assign students to ${member.name} (demo only).`);
        break;
      case "deactivate":
        setConfirmation({
          title: "Deactivate Faculty",
          message: `Deactivate ${member.name}? They will lose access until reactivated.`,
          confirmLabel: "Deactivate",
          danger: true,
          onConfirm: () => updateFaculty({ ...member, status: "Inactive" }),
        });
        break;
      case "resetPassword":
        setConfirmation({
          title: "Reset Password",
          message: `Send a password reset link to ${member.name} (${member.email})?`,
          confirmLabel: "Send Reset Link",
          onConfirm: () => alert(`Password reset link sent to ${member.email} (demo only).`),
        });
        break;
      case "delete":
        setConfirmation({
          title: "Delete Faculty",
          message: `Delete ${member.name} permanently? This action cannot be undone.`,
          confirmLabel: "Delete",
          danger: true,
          onConfirm: () => setFaculty((prev) => prev.filter((f) => f.id !== member.id)),
        });
        break;
      default:
        break;
    }
  };

  return (
    <div className="bg-surface-alt/40 -m-6 md:-m-8 p-6 md:p-8 min-h-full">
      <PageHeader
        title="Manage Faculty"
        subtitle="View, add and manage faculty mentors, their departments, subjects and assigned students."
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
              Add Faculty
            </button>
          </>
        }
      />

      <div className="space-y-5">
        <FacultyStats faculty={faculty} />

        <FacultyFilters
          filters={filters}
          onChange={(f) => {
            setFilters(f);
            setPage(1);
          }}
          onReset={handleReset}
        />

        <FacultyTable rows={paginated} loading={initialLoading || loading} onAction={handleAction} />

        {!initialLoading && !loading && filtered.length > 0 && (
          <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
        )}
      </div>

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