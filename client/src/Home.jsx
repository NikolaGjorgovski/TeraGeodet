import { useState } from "react";
import Navbar from "./Navbar";
import { useAuth } from "./AuthContext";
import RequestForm from "./RequestForm";
import RequestStatus from "./RequestStatus";

export default function Home() {
  const { user } = useAuth();
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // Every time a new request is submitted, increment the trigger
  // which causes RequestStatus to re-fetch automatically
  const handleRequestSubmitted = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

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

        <RequestForm onRequestSubmitted={handleRequestSubmitted} />
        <RequestStatus refreshTrigger={refreshTrigger} />
      </div>
    </>
  );
}
