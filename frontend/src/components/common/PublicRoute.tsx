import { Navigate, Outlet } from "react-router-dom";

export default function PublicRoute() {
  const token = localStorage.getItem("token");

  // User is already logged in.
  // Do not allow them to open Login/Signup again.
  if (token) {
    return <Navigate to="/dashboard" replace />;
  }

  // User is not logged in.
  return <Outlet />;
}