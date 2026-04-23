import Navbar from "./Navbar";
import { useAuth } from "./AuthContext";
import RequestForm from "./RequestForm";

export default function Home() {
  const { user } = useAuth();

  return (
    <>
      <Navbar />
      <div
        style={{
          maxWidth: "860px",
          margin: "0 auto",
          padding: "2rem 1rem",
          fontFamily: "DM Sans, sans-serif",
        }}
      >
        <h1
          style={{
            fontFamily: "DM Serif Display, serif",
            fontSize: "28px",
            fontWeight: 400,
            marginBottom: "0.25rem",
          }}
        >
          Welcome, {user?.fName}
        </h1>
        <p style={{ color: "#6b6b68", fontSize: "14px", marginBottom: "2rem" }}>
          TeraGeodet — Surveying Services
        </p>

        <RequestForm />
      </div>
    </>
  );
}
