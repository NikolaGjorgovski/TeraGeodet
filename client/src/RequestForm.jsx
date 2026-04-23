import { useState } from "react";
import axios from "axios";
import { useAuth } from "./AuthContext";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500&display=swap');

  .rf-wrap {
    background: #ffffff;
    border: 0.5px solid rgba(0,0,0,0.10);
    border-radius: 20px;
    padding: 2rem;
    box-shadow: 0 2px 24px rgba(0,0,0,0.06);
    font-family: 'DM Sans', sans-serif;
  }

  .rf-title {
    font-family: 'DM Serif Display', serif;
    font-size: 22px;
    font-weight: 400;
    color: #1a1a18;
    margin-bottom: 0.25rem;
    letter-spacing: -0.3px;
  }

  .rf-subtitle {
    font-size: 13px;
    color: #6b6b68;
    font-weight: 300;
    margin-bottom: 1.75rem;
  }

  .rf-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
    margin-bottom: 1rem;
  }

  .rf-field {
    display: flex;
    flex-direction: column;
    gap: 6px;
    margin-bottom: 1rem;
  }

  .rf-field-inline {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .rf-label {
    font-size: 13px;
    font-weight: 500;
    color: #6b6b68;
    letter-spacing: 0.01em;
  }

  .rf-input, .rf-textarea {
    background: #f5f5f3;
    border: 0.5px solid rgba(0,0,0,0.18);
    border-radius: 10px;
    color: #1a1a18;
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    padding: 10px 14px;
    width: 100%;
    transition: border-color 0.15s, box-shadow 0.15s;
    outline: none;
  }

  .rf-input {
    height: 42px;
  }

  .rf-input:focus, .rf-textarea:focus {
    background: #ffffff;
    border-color: #1D9E75;
    box-shadow: 0 0 0 3px rgba(29,158,117,0.12);
  }

  .rf-input::placeholder, .rf-textarea::placeholder {
    color: #a8a8a5;
    font-weight: 300;
  }

  .rf-input:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .rf-textarea {
    resize: vertical;
    min-height: 100px;
  }

  .rf-prefilled-note {
    font-size: 12px;
    color: #a8a8a5;
    font-weight: 300;
    margin-bottom: 1.25rem;
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .rf-divider {
    height: 0.5px;
    background: rgba(0,0,0,0.08);
    margin: 1.25rem 0;
  }

  .rf-btn {
    width: 100%;
    height: 44px;
    background: #0F6E56;
    color: #fff;
    border: none;
    border-radius: 10px;
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: background 0.15s, transform 0.1s;
    margin-top: 0.5rem;
  }
  .rf-btn:hover { background: #085041; }
  .rf-btn:active { transform: scale(0.99); }
  .rf-btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }

  .rf-success {
    background: #E1F5EE;
    border: 0.5px solid #1D9E75;
    border-radius: 10px;
    padding: 12px 16px;
    font-size: 13px;
    color: #0F6E56;
    margin-top: 1rem;
    text-align: center;
  }

  .rf-error {
    background: #fff0f0;
    border: 0.5px solid #e57373;
    border-radius: 10px;
    padding: 12px 16px;
    font-size: 13px;
    color: #c62828;
    margin-top: 1rem;
    text-align: center;
  }
`;

export default function RequestForm({ onRequestSubmitted }) {
  const { user, token } = useAuth();

  const [phoneNumber, setPhoneNumber] = useState("");
  const [cadastralMunicipality, setCadastralMunicipality] = useState("");
  const [parcelNumber, setParcelNumber] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    // Log what we're about to send
    console.log("Submitting request with data:", {
      phoneNumber,
      cadastralMunicipality,
      parcelNumber,
      title,
      description,
    });

    // Log the token being used
    console.log("Using token:", token);

    try {
      const result = await axios.post(
        "http://localhost:3001/requests",
        {
          phoneNumber,
          cadastralMunicipality,
          parcelNumber,
          title,
          description,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // ← sends the JWT to the backend
          },
        },
      );

      console.log("Full result:", result);
      console.log("Status:", result.status);
      console.log("Data:", result.data);
      // Log the full response from the backend
      console.log("Server response:", result.data);

      setSuccess(true);

      // Clear the form
      setPhoneNumber("");
      setCadastralMunicipality("");
      setParcelNumber("");
      setTitle("");
      setDescription("");

      // Tell the parent component to refresh the request list
      if (onRequestSubmitted) onRequestSubmitted();
    } catch (err) {
      console.log("Full error object:", err);
      console.log("Error status:", err.response?.status);
      console.log("Error message:", err.response?.data);

      setError(
        err.response?.data?.message ||
          "Something went wrong. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{styles}</style>
      <div className="rf-wrap">
        <h2 className="rf-title">Submit a Request</h2>
        <p className="rf-subtitle">
          Fill in the details below and we'll get back to you.
        </p>

        {/* Pre-filled user info — read only */}
        <p className="rf-prefilled-note">
          <svg
            width="13"
            height="13"
            viewBox="0 0 16 16"
            fill="none"
            stroke="#a8a8a5"
            strokeWidth="1.2"
          >
            <circle cx="8" cy="8" r="7" />
            <path d="M8 7v4M8 5v.5" strokeLinecap="round" />
          </svg>
          Your account details are pre-filled and cannot be changed here.
        </p>

        <div className="rf-grid">
          <div className="rf-field-inline">
            <label className="rf-label">First name</label>
            <input className="rf-input" value={user?.fName || ""} disabled />
          </div>
          <div className="rf-field-inline">
            <label className="rf-label">Last name</label>
            <input className="rf-input" value={user?.lName || ""} disabled />
          </div>
        </div>

        <div className="rf-field">
          <label className="rf-label">Email address</label>
          <input className="rf-input" value={user?.email || ""} disabled />
        </div>

        <div className="rf-divider" />

        {/* Fields the user fills in */}
        <form onSubmit={handleSubmit}>
          <div className="rf-field">
            <label className="rf-label">Phone number</label>
            <input
              className="rf-input"
              placeholder="e.g. 071 234 567"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>

          <div className="rf-grid">
            <div className="rf-field-inline">
              <label className="rf-label">Cadastral municipality</label>
              <input
                className="rf-input"
                placeholder="e.g. Ohrid"
                value={cadastralMunicipality}
                onChange={(e) => setCadastralMunicipality(e.target.value)}
              />
            </div>
            <div className="rf-field-inline">
              <label className="rf-label">Parcel number</label>
              <input
                className="rf-input"
                placeholder="e.g. 1234/5"
                value={parcelNumber}
                onChange={(e) => setParcelNumber(e.target.value)}
              />
            </div>
          </div>

          <div className="rf-field">
            <label className="rf-label">Request title</label>
            <input
              className="rf-input"
              placeholder="e.g. Boundary survey"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="rf-field">
            <label className="rf-label">Description</label>
            <textarea
              className="rf-textarea"
              placeholder="Describe what you need in as much detail as possible..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <button className="rf-btn" type="submit" disabled={loading}>
            {loading ? "Submitting..." : "Submit request"}
          </button>

          {success && (
            <div className="rf-success">
              Request submitted successfully! We'll be in touch soon.
            </div>
          )}

          {error && <div className="rf-error">{error}</div>}
        </form>
      </div>
    </>
  );
}
