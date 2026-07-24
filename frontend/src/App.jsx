import { createBrowserRouter, RouterProvider } from "react-router-dom";
import adminRoutes from "./routes/adminRoutes";
import facultyRoutes from "./routes/facultyRoutes";
// import companyRoutes from "./routes/companyRoutes";

import "./App.css";

const router = createBrowserRouter([
  adminRoutes,
  facultyRoutes,
  // companyRoutes,
  // authRoutes, hrRoutes, mentorRoutes, internRoutes yahi pattern se add honge
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;