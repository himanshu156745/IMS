import CompanyDashLayout from "../layouts/CompanyDashLayout";
import CompanyDashboard from "../features/dashboard/company/dashboard/CompanyDashboard";
import CompanyInternships from "../features/dashboard/company/internships/CompanyInternships";
import CompanyApplications from "../features/dashboard/company/applications/CompanyApplications";
import CompanyProfile from "../features/dashboard/company/profile/CompanyProfile";
import CompanySettings from "../features/dashboard/company/settings/CompanySettings";
import ProtectedRoute from "../components/auth/ProtectedRoute";

const companyRoutes = {
    path: "/company",
    element: (
        <ProtectedRoute allowedRoles={['company']}>
            <CompanyDashLayout />
        </ProtectedRoute>
    ),
    children: [
        {
            index: true,
            element: <CompanyDashboard />
        },
        {
            path: "internships",
            element: <CompanyInternships />
        },
        {
            path: "applications",
            element: <CompanyApplications />
        },
        {
            path: "profile",
            element: <CompanyProfile />
        },
        {
            path: "settings",
            element: <CompanySettings />
        },
    ]
};

export default companyRoutes;
