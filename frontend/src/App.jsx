import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { studentRoutes } from "./routes/StudentRoutes";
import { landingPage } from "./routes/LandingPageRoutes";
import adminRoutes from "./routes/adminRoutes";
import facultyRoutes from "./routes/facultyRoutes";
import companyRoutes from "./routes/companyRoutes";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";
import "./App.css";

const router = createBrowserRouter([
  landingPage,
  {
    path: "/login",
    element: <Login />,
  },
  {
  path: "/signup",
  element: <Signup />,
},
  studentRoutes,
  adminRoutes,
  facultyRoutes,
  companyRoutes,
  {
    path: "*",
    element: <NotFound />
  }
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