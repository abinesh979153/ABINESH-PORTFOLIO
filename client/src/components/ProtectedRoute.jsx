import { Navigate } from "react-router-dom";

// Guards admin-only pages. Redirects to login if no token is stored.
// This is a UX convenience only - the real security boundary is the
// backend's JWT check on protected API routes.
export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem("adminToken");
  if (!token) return <Navigate to="/admin/login" replace />;
  return children;
}
