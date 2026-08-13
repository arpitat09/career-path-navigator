import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function ProtectedRoute() {
  const location = useLocation();

  const token = localStorage.getItem("token");

  /*
   * User is not logged in.
   * Send them to Login.
   *
   * We keep the original URL so that
   * we know where they were trying to go.
   */
  if (!token) {
    return (
      <Navigate
        to="/login"
        replace
        state={{
          from: location.pathname,
        }}
      />
    );
  }

  /*
   * User is logged in.
   */
  return <Outlet />;
}