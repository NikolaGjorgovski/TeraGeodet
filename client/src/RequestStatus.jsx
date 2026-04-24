import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "./AuthContext";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500&display=swap');

  .rs-wrap {
    background: #ffffff;
    border: 0.5px solid rgba(0,0,0,0.10);
    border-radius: 20px;
    padding: 2rem;
    box-shadow: 0 2px 24px rgba(0,0,0,0.06);
    font-family: 'DM Sans', sans-serif;
    margin-top: 1.5rem;
  }

  .rs-title {
    font-family: 'DM Serif Display', serif;
    font-size: 22px;
    font-weight: 400;
    color: #1a1a18;
    margin-bottom: 0.25rem;
    letter-spacing: -0.3px;
  }

  .rs-subtitle {
    font-size: 13px;
    color: #6b6b68;
    font-weight: 300;
    margin-bottom: 1.75rem;
  }

  .rs-empty {
    text-align: center;
    padding: 2rem;
    color: #a8a8a5;
    font-size: 14px;
    font-weight: 300;
  }

  .rs-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .rs-card {
    border: 0.5px solid rgba(0,0,0,0.10);
    border-radius: 14px;
    padding: 1.25rem;
    transition: box-shadow 0.15s;
  }

  .rs-card:hover {
    box-shadow: 0 2px 16px rgba(0,0,0,0.06);
  }

  .rs-card-top {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    margin-bottom: 0.75rem;
    gap: 1rem;
  }

  .rs-card-title {
    font-size: 15px;
    font-weight: 500;
    color: #1a1a18;
  }

  .rs-card-date {
    font-size: 12px;
    color: #a8a8a5;
    font-weight: 300;
    white-space: nowrap;
  }

  .rs-card-meta {
    display: flex;
    gap: 1.5rem;
    margin-bottom: 0.75rem;
  }

  .rs-meta-item {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .rs-meta-label {
    font-size: 11px;
    color: #a8a8a5;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .rs-meta-value {
    font-size: 13px;
    color: #1a1a18;
    font-weight: 400;
  }

  .rs-card-bottom {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 0.75rem;
    padding-top: 0.75rem;
    border-top: 0.5px solid rgba(0,0,0,0.06);
  }

  .rs-admin-note {
    font-size: 13px;
    color: #6b6b68;
    font-weight: 300;
    font-style: italic;
  }

  /* Status badges */
  .rs-badge {
    font-size: 11px;
    font-weight: 500;
    padding: 3px 10px;
    border-radius: 20px;
    text-transform: capitalize;
    letter-spacing: 0.02em;
    white-space: nowrap;
  }

  .rs-badge.pending {
    background: #FFF8E1;
    color: #F59E0B;
  }

  .rs-badge.reviewing {
    background: #EEF2FF;
    color: #4338CA;
  }

  .rs-badge.in-progress {
    background: #E0F2FE;
    color: #0369A1;
  }

  .rs-badge.completed {
    background: #E1F5EE;
    color: #0F6E56;
  }

  .rs-badge.rejected {
    background: #fff0f0;
    color: #c62828;
  }

  .rs-loading {
    text-align: center;
    padding: 2rem;
    color: #a8a8a5;
    font-size: 14px;
  }

  .rs-error {
    background: #fff0f0;
    border: 0.5px solid #e57373;
    border-radius: 10px;
    padding: 12px 16px;
    font-size: 13px;
    color: #c62828;
    text-align: center;
  }
`;

// Formats "2024-01-15T10:30:00Z" into "Jan 15, 2024"
function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function RequestStatus({ refreshTrigger }) {
  const { token } = useAuth();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchRequests = async () => {
    try {
      setLoading(true);
      const result = await axios.get("http://localhost:3001/requests/mine", {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("My requests:", result.data);
      setRequests(result.data.requests);
    } catch (err) {
      console.log("Fetch error:", err);
      setError("Could not load your requests.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch on mount and whenever refreshTrigger changes
  useEffect(() => {
    fetchRequests();
  }, [refreshTrigger]);

  return (
    <>
      <style>{styles}</style>
      <div className="rs-wrap">
        <h2 className="rs-title">Your Requests</h2>
        <p className="rs-subtitle">
          Track the status of your submitted requests.
        </p>

        {loading && <p className="rs-loading">Loading your requests...</p>}

        {error && <div className="rs-error">{error}</div>}

        {!loading && !error && requests.length === 0 && (
          <p className="rs-empty">You haven't submitted any requests yet.</p>
        )}

        {!loading && !error && requests.length > 0 && (
          <div className="rs-list">
            {requests.map((req) => (
              <div key={req._id} className="rs-card">
                <div className="rs-card-top">
                  <span className="rs-card-title">{req.title}</span>
                  <span className="rs-card-date">
                    {formatDate(req.createdAt)}
                  </span>
                </div>

                <div className="rs-card-meta">
                  <div className="rs-meta-item">
                    <span className="rs-meta-label">Municipality</span>
                    <span className="rs-meta-value">
                      {req.cadastralMunicipality}
                    </span>
                  </div>
                  <div className="rs-meta-item">
                    <span className="rs-meta-label">Parcel</span>
                    <span className="rs-meta-value">{req.parcelNumber}</span>
                  </div>
                  <div className="rs-meta-item">
                    <span className="rs-meta-label">Phone</span>
                    <span className="rs-meta-value">{req.phoneNumber}</span>
                  </div>
                </div>

                <p
                  style={{
                    fontSize: "13px",
                    color: "#6b6b68",
                    fontWeight: 300,
                  }}
                >
                  {req.description}
                </p>

                <div className="rs-card-bottom">
                  {req.adminNote ? (
                    <span className="rs-admin-note">Note: {req.adminNote}</span>
                  ) : (
                    <span />
                  )}
                  <span className={`rs-badge ${req.status}`}>{req.status}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
