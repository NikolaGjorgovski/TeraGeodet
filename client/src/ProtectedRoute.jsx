import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default function ProtectedRoute({ children, requiredRole }) {
  const { user, token, loading } = useAuth();

  // Wait until localStorage has been read before making any decisions
  if (loading) return null;

  // Not logged in at all — send to login
  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  // Logged in but wrong role (e.g. a user trying to access /admin)
  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/home" replace />;
  }

  // All good — render the page
  return children;
}
