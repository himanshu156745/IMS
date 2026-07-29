import { createBrowserRouter, RouterProvider } from "react-router-dom"
import {  studentRoutes } from "./routes/StudentRoutes"
import { landingPage } from "./routes/LandingPageRoutes"

const router = createBrowserRouter([
  landingPage,
  studentRoutes,

])
const App = () => {
  return (
    <RouterProvider router={router}/>
  )
}

export default App