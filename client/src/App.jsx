import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import SignupForm from "./signup";
import LoginForm from "./login";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./Home";
import AdminDashboard from "./AdminDashboard";
import ProtectedRoute from "./ProtectedRoute";
import { useAuth } from "./AuthContext";

function RedirectIfLoggedIn({ children }) {
  const { user, loading } = useAuth();
  if (loading) return null;
  if (user)
    return <Navigate to={user.role === "admin" ? "/admin" : "/home"} replace />;
  return children;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route
          path="/login"
          element={
            <RedirectIfLoggedIn>
              <LoginForm />
            </RedirectIfLoggedIn>
          }
        />
        <Route
          path="/register"
          element={
            <RedirectIfLoggedIn>
              <SignupForm />
            </RedirectIfLoggedIn>
          }
        />

        {/* User only */}
        <Route
          path="/home"
          element={
            <ProtectedRoute allowedRoles={["user", "admin"]}>
              <Home />
            </ProtectedRoute>
          }
        />

        {/* Admin only */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute requiredRole="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
          home
        />

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
