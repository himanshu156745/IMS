import { createBrowserRouter, RouterProvider } from "react-router-dom";
import adminRoutes from "./routes/adminRoutes";
import "./App.css";

const router = createBrowserRouter([
  adminRoutes,
  // authRoutes, hrRoutes, mentorRoutes, internRoutes yahi pattern se add honge
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;