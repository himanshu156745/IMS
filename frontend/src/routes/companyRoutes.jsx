// import { LayoutGrid, Building2, Briefcase, FileText, Users } from "lucide-react";
// import DashboardLayout from "../layouts/DashboardLayout";
// import {
//   CompanyDashboard,
//   CompanyProfile,
//   ManageInternships,
//   Applications,
//   AssignedStudents,
// } from "../features/dashboard/company";

// const COMPANY_NAV = [
//   { to: "/company", label: "Dashboard", Icon: LayoutGrid, end: true },
//   { to: "/company/profile", label: "Company Profile", Icon: Building2 },
//   { to: "/company/internships", label: "Manage Internships", Icon: Briefcase },
//   { to: "/company/applications", label: "Applications", Icon: FileText },
//   { to: "/company/students", label: "Assigned Students", Icon: Users },
// ];

// const companyRoutes = {
//   path: "/company",
//   element: (
//     <DashboardLayout
//       navItems={COMPANY_NAV}
//       brandTitle="RID Tech"
//       brandSubtitle="Company Portal"
//     />
//   ),
//   children: [
//     { index: true, element: <CompanyDashboard /> },
//     { path: "profile", element: <CompanyProfile /> },
//     { path: "internships", element: <ManageInternships /> },
//     { path: "applications", element: <Applications /> },
//     { path: "students", element: <AssignedStudents /> },
//   ],
// };

// export default companyRoutes;