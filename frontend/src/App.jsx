import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Login from "./pages/Login";
import Register from "./pages/Register"; // Or Signup depending on your filename
import NotFound from "./pages/NotFound";

import { landingPage } from "./routes/LandingPageRoutes";
import { studentRoutes } from "./routes/StudentRoutes";
import adminRoutes from "./routes/adminRoutes";
import facultyRoutes from "./routes/facultyRoutes";
import companyRoutes from "./routes/companyRoutes";

import "./App.css";

const router = createBrowserRouter([
  // Landing Page Route object
  landingPage,

  // Authentication
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/signup",
    element: <Register />, // Alias to support both /signup and /register URLs
  },

  // Role-Based Module Routes
  studentRoutes,
  adminRoutes,
  facultyRoutes,
  companyRoutes,

  // Fallback 404 Route
  {
    path: "*",
    element: <NotFound />,
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster position="top-right" />
    </>
  );
}

export default App;