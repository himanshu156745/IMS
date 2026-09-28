import { createBrowserRouter, RouterProvider } from "react-router-dom"
import {  studentRoutes } from "./routes/StudentRoutes"
import { landingPage } from "./routes/LandingPageRoutes"
import adminRoutes from "./routes/adminRoutes";
import facultyRoutes from "./routes/facultyRoutes";
import "./App.css";

const router = createBrowserRouter([
  landingPage,
  studentRoutes,
  adminRoutes,
  facultyRoutes,
])


function App() {
  return <RouterProvider router={router} />;
}

export default App