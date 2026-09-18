import StudentDashboard from "../layouts/StudentDashLayout";
import MyProfile from "../features/dashboard/student/myProfile/MyProfile";
import ViewInternships from "../features/dashboard/student/viewInternship/ViewInternship";
import ApplyInternship from "../features/dashboard/student/applyIntership/ApplyIntership";
import MyApplications from "../features/dashboard/student/dashboard/MyApplications";
import DailyReports from "../features/dashboard/student/dashboard/DailyReports";
import AttendancePage from "../features/dashboard/student/attendance/AttendancePage";
import Certificates from "../features/dashboard/student/dashboard/Certificates";

export const studentRoutes = {

    path: "/students",
    element: <StudentDashboard />,
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
            path: "apply",
            element: <ApplyInternship />
        },
        {
            path: "applications",
            element: <MyApplications />
        },
        {
            path: "reports",
            element: <DailyReports />
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