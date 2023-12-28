import Login from "../auth/Login"
import Register from "../auth/Register"
import Dashboard from "../pages/dashboard/Dashboard"
import ComingSoon from "../comingSoon/ComingSoon"
import NotFound from "../notFound/NotFound"
import { Navigate } from "react-router-dom"

const publicRoutes = [
  { path: "/login", component: <Login /> },
 
  { path: "/register", component: <Register /> },
]

const adminRoutes = [
  {
    path: "/",
    component: <Navigate to="/dashboard" />,
  },

  { path: "/dashboard", component: <Dashboard /> },

  // user management
  { path: "/users", component: <Users /> },

  //guest management
  { path: "/guests/create-guest", component: <AllInOne /> },
  { path: "/guests/create-voucher", component: <Voucher /> },
  { path: "/guests/create-vehicle", component: <Vehicles /> },

  // Administration
  { path: "/manage/types", component: <EventTypes /> },

  //Event management
  { path: "/event/events-list", component: <Events /> },
  { path: "/event/interests-list", component: <ComingSoon /> },

  // feedback form
  { path: "/forms", component: <ComingSoon /> },

  //Instructor
  { path: "/instructor/schedule", component: <ComingSoon /> },
  { path: "/instructor/assign-notes", component: <ComingSoon /> },
  { path: "*", component: <NotFound /> }
]

const userRoutes = [
  {
    path: "/",
    component: <Navigate to="/dashboard" />,
  },
  { path: "/dashboard", component: <Dashboard /> },
  { path: "*", component: <Navigate to="/dashboard" /> },
]

export { adminRoutes, userRoutes, publicRoutes }
