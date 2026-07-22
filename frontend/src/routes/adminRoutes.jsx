import DashboardLayout from "../layouts/DashboardLayout";
import AdminDashboard from "../features/dashboard/admin/dashboard/AdminDashboard";
import ManageStudents from "../features/dashboard/admin/students/ManageStudents";
import ManageCompanies from "../features/dashboard/admin/companies/ManageCompanies";
import ManageFaculty from "../features/dashboard/admin/faculty/ManageFaculty";
import ManageInternships from "../features/dashboard/admin/internships/ManageInternships";
import ViewApplications from "../features/dashboard/admin/applications/ViewApplications";
import ReportsAnalytics from "../features/dashboard/admin/reports/ReportsAnalytics";
import AdminSettings from "../features/dashboard/admin/settings/AdminSettings";

const adminRoutes = {
  path: "/admin",
  element: <DashboardLayout />,
  children: [
    { index: true, element: <AdminDashboard /> },
    { path: "students", element: <ManageStudents /> },
    { path: "companies", element: <ManageCompanies /> },
    { path: "faculty", element: <ManageFaculty /> },
    { path: "internships", element: <ManageInternships /> },
    { path: "applications", element: <ViewApplications /> },
    { path: "reports", element: <ReportsAnalytics /> },
    { path: "settings", element: <AdminSettings /> },
  ],
};

export default adminRoutes;