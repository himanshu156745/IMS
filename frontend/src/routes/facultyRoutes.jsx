import FacultyLayout from "../features/dashboard/faculty/layout/FacultyLayout";
import Dashboard from "../features/dashboard/faculty/dashboard/Dashboard";
import MyStudents from "../features/dashboard/faculty/students/MyStudents";
import StudentReport from "../features/dashboard/faculty/reports/StudentReport";
import Attendance from "../features/dashboard/faculty/attendance/Attendance";
import Feedback from "../features/dashboard/faculty/feedback/Feedback";
import Performance from "../features/dashboard/faculty/performance/Performance";
import NotFound from "../pages/NotFound";

const facultyRoutes = {
  path: "/faculty",
  element: <FacultyLayout />,
  children: [
    { index: true, element: <Dashboard /> },
    { path: "my-students", element: <MyStudents /> },
    { path: "student-report", element: <StudentReport /> },
    { path: "student-report/:id", element: <StudentReport /> },
    { path: "attendance", element: <Attendance /> },
    { path: "feedback", element: <Feedback /> },
    { path: "performance", element: <Performance /> },
    { path: "*", element: <NotFound /> },
  ],
};

export default facultyRoutes;