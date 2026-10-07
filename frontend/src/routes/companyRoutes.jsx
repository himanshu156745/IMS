import DashboardLayout from "../features/dashboard/company/layouts/DashboardLayout";

import Dashboard from "../features/dashboard/company/pages/Dashboard";
import ManageInternships from "../features/dashboard/company/pages/ManageInternships";
import ViewApplications from "../features/dashboard/company/pages/ViewApplications";
import CompanyProfile from "../features/dashboard/company/pages/CompanyProfile";
import AssignedStudents from "../features/dashboard/company/pages/AssignedStudents";
import PostInternship from "../features/dashboard/company/pages/PostInternship";

import ProtectedRoute from "../components/auth/ProtectedRoute";

const companyRoutes = {
  path: "/company",
  element: (
    <ProtectedRoute allowedRoles={["company"]}>
      <DashboardLayout />
    </ProtectedRoute>
  ),
  children: [
    {
      index: true,
      element: <Dashboard />,
    },
    {
      path: "dashboard",
      element: <Dashboard />,
    },
    {
      path: "manage-internships",
      element: <ManageInternships />,
    },
    {
      path: "post-internship",
      element: <PostInternship />,
    },
    {
      path: "view-applications",
      element: <ViewApplications />,
    },
    {
      path: "assigned-students",
      element: <AssignedStudents />,
    },
    {
      path: "profile",
      element: <CompanyProfile />,
    },
  ],
};

export default companyRoutes;