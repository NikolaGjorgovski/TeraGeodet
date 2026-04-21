import Navbar from "./Navbar";
import { useAuth } from "./AuthContext";

export default function AdminDashboard() {
  const { user } = useAuth();

  return (
    <>
      <Navbar />
      <div style={{ padding: "2rem", fontFamily: "DM Sans, sans-serif" }}>
        <h1>Welcome, {user?.fName}!</h1>
        <p>Admin panel coming in the next step.</p>
      </div>
    </>
  );
}
