import DashboardLayout from "../layouts/DashboardLayout";
import AdminDashboard from "../features/dashboard/admin/pages/AdminDashboard";
import ManageStudents from "../features/dashboard/admin/pages/ManageStudents";
import ManageCompanies from "../features/dashboard/admin/pages/ManageCompanies";
import ManageFaculty from "../features/dashboard/admin/pages/ManageFaculty";
import ManageInternships from "../features/dashboard/admin/pages/ManageInternships";
import ViewApplications from "../features/dashboard/admin/pages/ViewApplications";
import ReportsAnalytics from "../features/dashboard/admin/pages/ReportsAnalytics";
import AdminSettings from "../features/dashboard/admin/pages/AdminSettings";
// import ProtectedRoute + RoleBasedRoute here once auth/ module is wired

const adminRoutes = {
  path: "/admin",
  element: <DashboardLayout />, // wrap with <RoleBasedRoute role="super_admin"> later
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