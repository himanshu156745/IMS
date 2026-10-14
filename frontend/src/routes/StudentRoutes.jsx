import StudentDashboard from "../layouts/StudentDashLayout";
import MyProfile from "../features/dashboard/student/myProfile/MyProfile";
import ViewInternships from "../features/dashboard/student/viewInternship/ViewInternship";
import ApplyInternship from "../features/dashboard/student/applyIntership/ApplyInternship";
import MyApplications from "../features/dashboard/student/dashboard/MyApplications";
import DailyReportPage from "../features/dashboard/student/dailyReport/DailyReportPage";
import AttendancePage from "../features/dashboard/student/attendance/AttendancePage";
import Certificates from "../features/dashboard/student/dashboard/Certificates";

import ProtectedRoute from "../components/auth/ProtectedRoute";

export const studentRoutes = {
    path: "/students",
    element: (
        <ProtectedRoute allowedRoles={['student']}>
            <StudentDashboard />
        </ProtectedRoute>
    ),
    children: [
        {
            path: "profile",
            element: <MyProfile />
        },
        {
            path: "view-internships",
            element: <ViewInternships />
        },
        {
            path: "apply/:internshipId",
            element: <ApplyInternship />
        },
        {
            path: "applications",
            element: <MyApplications />
        },
        {
            path: "reports",
            element: <DailyReportPage />
        },
        {
            path: "attendance",
            element: <AttendancePage />
        },
        {
            path: "certificates",
            element: <Certificates />
        },
    ]
}
