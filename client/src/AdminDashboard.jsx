import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "./AuthContext";
import Navbar from "./Navbar";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500&display=swap');

  .ad-wrap {
    max-width: 960px;
    margin: 0 auto;
    padding: 2rem 1rem;
    font-family: 'DM Sans', sans-serif;
  }

  .ad-header {
    margin-bottom: 2rem;
  }

  .ad-title {
    font-family: 'DM Serif Display', serif;
    font-size: 28px;
    font-weight: 400;
    color: #1a1a18;
    margin-bottom: 0.25rem;
    letter-spacing: -0.3px;
  }

  .ad-subtitle {
    font-size: 14px;
    color: #6b6b68;
    font-weight: 300;
  }

  .ad-stats {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 1rem;
    margin-bottom: 2rem;
  }

  .ad-stat-card {
    background: #ffffff;
    border: 0.5px solid rgba(0,0,0,0.10);
    border-radius: 14px;
    padding: 1rem 1.25rem;
    box-shadow: 0 2px 12px rgba(0,0,0,0.04);
  }

  .ad-stat-label {
    font-size: 11px;
    font-weight: 500;
    color: #a8a8a5;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin-bottom: 6px;
  }

  .ad-stat-value {
    font-size: 26px;
    font-weight: 400;
    font-family: 'DM Serif Display', serif;
    color: #1a1a18;
  }

  .ad-panel {
    background: #ffffff;
    border: 0.5px solid rgba(0,0,0,0.10);
    border-radius: 20px;
    padding: 2rem;
    box-shadow: 0 2px 24px rgba(0,0,0,0.06);
  }

  .ad-panel-title {
    font-family: 'DM Serif Display', serif;
    font-size: 20px;
    font-weight: 400;
    color: #1a1a18;
    margin-bottom: 1.5rem;
  }

  .ad-empty {
    text-align: center;
    padding: 2rem;
    color: #a8a8a5;
    font-size: 14px;
    font-weight: 300;
  }

  .ad-loading {
    text-align: center;
    padding: 2rem;
    color: #a8a8a5;
    font-size: 14px;
  }

  .ad-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .ad-card {
    border: 0.5px solid rgba(0,0,0,0.10);
    border-radius: 14px;
    padding: 1.25rem;
    transition: box-shadow 0.15s;
  }

  .ad-card:hover {
    box-shadow: 0 2px 16px rgba(0,0,0,0.08);
  }

  .ad-card-top {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    margin-bottom: 0.75rem;
    gap: 1rem;
  }

  .ad-card-title {
    font-size: 15px;
    font-weight: 500;
    color: #1a1a18;
  }

  .ad-card-date {
    font-size: 12px;
    color: #a8a8a5;
    font-weight: 300;
    white-space: nowrap;
  }

  .ad-card-user {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 0.75rem;
  }

  .ad-user-avatar {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    background: #E1F5EE;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 11px;
    font-weight: 500;
    color: #0F6E56;
    flex-shrink: 0;
  }

  .ad-user-name {
    font-size: 13px;
    font-weight: 500;
    color: #1a1a18;
  }

  .ad-user-email {
    font-size: 12px;
    color: #a8a8a5;
    font-weight: 300;
  }

  .ad-card-meta {
    display: flex;
    gap: 1.5rem;
    margin-bottom: 0.75rem;
  }

  .ad-meta-item {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .ad-meta-label {
    font-size: 11px;
    color: #a8a8a5;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .ad-meta-value {
    font-size: 13px;
    color: #1a1a18;
  }

  .ad-card-description {
    font-size: 13px;
    color: #6b6b68;
    font-weight: 300;
    margin-bottom: 0.75rem;
    line-height: 1.5;
  }

  .ad-card-bottom {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: 0.75rem;
    border-top: 0.5px solid rgba(0,0,0,0.06);
    gap: 1rem;
    flex-wrap: wrap;
  }

  .ad-status-controls {
    display: flex;
    align-items: center;
    gap: 8px;
    flex-wrap: wrap;
  }

  .ad-select {
    height: 34px;
    padding: 0 10px;
    border: 0.5px solid rgba(0,0,0,0.18);
    border-radius: 8px;
    font-family: 'DM Sans', sans-serif;
    font-size: 13px;
    color: #1a1a18;
    background: #f5f5f3;
    cursor: pointer;
    outline: none;
    transition: border-color 0.15s;
  }

  .ad-select:focus {
    border-color: #1D9E75;
    box-shadow: 0 0 0 3px rgba(29,158,117,0.12);
  }

  .ad-note-input {
    height: 34px;
    padding: 0 10px;
    border: 0.5px solid rgba(0,0,0,0.18);
    border-radius: 8px;
    font-family: 'DM Sans', sans-serif;
    font-size: 13px;
    color: #1a1a18;
    background: #f5f5f3;
    outline: none;
    width: 200px;
    transition: border-color 0.15s;
  }

  .ad-note-input:focus {
    border-color: #1D9E75;
    box-shadow: 0 0 0 3px rgba(29,158,117,0.12);
    background: #ffffff;
  }

  .ad-note-input::placeholder {
    color: #a8a8a5;
    font-weight: 300;
  }

  .ad-update-btn {
    height: 34px;
    padding: 0 14px;
    background: #0F6E56;
    color: #fff;
    border: none;
    border-radius: 8px;
    font-family: 'DM Sans', sans-serif;
    font-size: 13px;
    font-weight: 500;
    cursor: pointer;
    transition: background 0.15s;
    white-space: nowrap;
  }

  .ad-update-btn:hover { background: #085041; }
  .ad-update-btn:disabled { opacity: 0.6; cursor: not-allowed; }

  /* Status badges */
  .ad-badge {
    font-size: 11px;
    font-weight: 500;
    padding: 3px 10px;
    border-radius: 20px;
    text-transform: capitalize;
    letter-spacing: 0.02em;
    white-space: nowrap;
  }

  .ad-badge.pending   { background: #FFF8E1; color: #F59E0B; }
  .ad-badge.reviewing { background: #EEF2FF; color: #4338CA; }
  .ad-badge.in-progress { background: #E0F2FE; color: #0369A1; }
  .ad-badge.completed { background: #E1F5EE; color: #0F6E56; }
  .ad-badge.rejected  { background: #fff0f0; color: #c62828; }
`;

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function StatCard({ label, value }) {
  return (
    <div className="ad-stat-card">
      <div className="ad-stat-label">{label}</div>
      <div className="ad-stat-value">{value}</div>
    </div>
  );
}

function RequestCard({ request, token, onUpdated }) {
  const [status, setStatus] = useState(request.status);
  const [adminNote, setAdminNote] = useState(request.adminNote || "");
  const [loading, setLoading] = useState(false);

  const handleUpdate = async () => {
    setLoading(true);
    try {
      const result = await axios.patch(
        `http://localhost:3001/requests/${request._id}/status`,
        { status, adminNote },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      console.log("Status updated:", result.data);
      onUpdated(); // refresh the list
    } catch (err) {
      console.log("Update error:", err.response?.data);
    } finally {
      setLoading(false);
    }
  };

  const initials =
    `${request.userSnapshot.fName[0]}${request.userSnapshot.lName[0]}`.toUpperCase();

  return (
    <div className="ad-card">
      {/* Title + date */}
      <div className="ad-card-top">
        <span className="ad-card-title">{request.title}</span>
        <span className="ad-card-date">{formatDate(request.createdAt)}</span>
      </div>

      {/* User info */}
      <div className="ad-card-user">
        <div className="ad-user-avatar">{initials}</div>
        <div>
          <div className="ad-user-name">
            {request.userSnapshot.fName} {request.userSnapshot.lName}
          </div>
          <div className="ad-user-email">{request.userSnapshot.email}</div>
        </div>
      </div>

      {/* Survey details */}
      <div className="ad-card-meta">
        <div className="ad-meta-item">
          <span className="ad-meta-label">Municipality</span>
          <span className="ad-meta-value">{request.cadastralMunicipality}</span>
        </div>
        <div className="ad-meta-item">
          <span className="ad-meta-label">Parcel</span>
          <span className="ad-meta-value">{request.parcelNumber}</span>
        </div>
        <div className="ad-meta-item">
          <span className="ad-meta-label">Phone</span>
          <span className="ad-meta-value">{request.phoneNumber}</span>
        </div>
      </div>

      <p className="ad-card-description">{request.description}</p>

      {/* Status controls */}
      <div className="ad-card-bottom">
        <span className={`ad-badge ${request.status}`}>{request.status}</span>

        <div className="ad-status-controls">
          <select
            className="ad-select"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="pending">Pending</option>
            <option value="reviewing">Reviewing</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="rejected">Rejected</option>
          </select>

          <input
            className="ad-note-input"
            placeholder="Add a note (optional)"
            value={adminNote}
            onChange={(e) => setAdminNote(e.target.value)}
          />

          <button
            className="ad-update-btn"
            onClick={handleUpdate}
            disabled={loading}
          >
            {loading ? "Saving..." : "Update"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  const { user, token } = useAuth();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRequests = async () => {
    try {
      const result = await axios.get("http://localhost:3001/requests/all", {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("All requests:", result.data);
      setRequests(result.data.requests);
    } catch (err) {
      console.log("Fetch error:", err.response?.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  // Count requests by status for the stat cards
  const counts = {
    total: requests.length,
    pending: requests.filter((r) => r.status === "pending").length,
    reviewing: requests.filter((r) => r.status === "reviewing").length,
    inProgress: requests.filter((r) => r.status === "in-progress").length,
    completed: requests.filter((r) => r.status === "completed").length,
  };

  return (
    <>
      <style>{styles}</style>
      <Navbar />
      <div className="ad-wrap">
        {/* Header */}
        <div className="ad-header">
          <h1 className="ad-title">Admin Panel</h1>
          <p className="ad-subtitle">
            Welcome, {user?.fName}. Manage all incoming survey requests below.
          </p>
        </div>

        {/* Stat cards */}
        <div className="ad-stats">
          <StatCard label="Total" value={counts.total} />
          <StatCard label="Pending" value={counts.pending} />
          <StatCard label="Reviewing" value={counts.reviewing} />
          <StatCard label="In Progress" value={counts.inProgress} />
          <StatCard label="Completed" value={counts.completed} />
        </div>

        {/* Request list */}
        <div className="ad-panel">
          <h2 className="ad-panel-title">All Requests</h2>

          {loading && <p className="ad-loading">Loading requests...</p>}

          {!loading && requests.length === 0 && (
            <p className="ad-empty">No requests submitted yet.</p>
          )}

          {!loading && requests.length > 0 && (
            <div className="ad-list">
              {requests.map((req) => (
                <RequestCard
                  key={req._id}
                  request={req}
                  token={token}
                  onUpdated={fetchRequests}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
