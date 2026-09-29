import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import LandingPage from "./features/dashboard/landingPage/LandingPage"

import { studentRoutes } from "./routes/StudentRoutes";
import adminRoutes from "./routes/adminRoutes";
import facultyRoutes from "./routes/facultyRoutes";

import "./App.css";

const router = createBrowserRouter([
  // Landing Page Routes
  LandingPage,

  // Direct Landing Page
  {
    path: "/",
    element: <LandingPage />,
  },

  // Authentication
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },

  // Student Routes
  studentRoutes,

  // Admin Routes
  adminRoutes,

  // Faculty Routes
  facultyRoutes,
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;