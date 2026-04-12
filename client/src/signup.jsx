import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg-primary: #ffffff;
    --bg-secondary: #f5f5f3;
    --text-primary: #1a1a18;
    --text-secondary: #6b6b68;
    --text-tertiary: #a8a8a5;
    --border-tertiary: rgba(0,0,0,0.10);
    --border-secondary: rgba(0,0,0,0.18);
    --teal: #1D9E75;
    --teal-dark: #0F6E56;
    --teal-deeper: #085041;
    --teal-light: #E1F5EE;
  }

  body {
    background: #f0f0ed;
    font-family: 'DM Sans', sans-serif;
  }

  .su-wrap {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem 1rem;
    font-family: 'DM Sans', sans-serif;
  }

  .su-card {
    background: var(--bg-primary);
    border: 0.5px solid var(--border-tertiary);
    border-radius: 20px;
    padding: 2.5rem 2.5rem 2rem;
    width: 100%;
    max-width: 460px;
    position: relative;
    overflow: hidden;
    box-shadow: 0 2px 24px rgba(0,0,0,0.06);
  }

  .su-accent-bar {
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 4px;
    background: linear-gradient(90deg, #1D9E75, #378ADD, #534AB7);
    border-radius: 20px 20px 0 0;
  }

  .su-brand-icon {
    width: 44px;
    height: 44px;
    border-radius: 12px;
    background: var(--teal-light);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1.25rem;
  }

  .su-card h1 {
    font-family: 'DM Serif Display', serif;
    font-size: 26px;
    font-weight: 400;
    color: var(--text-primary);
    margin-bottom: 0.25rem;
    letter-spacing: -0.3px;
  }

  .su-subtitle {
    font-size: 14px;
    color: var(--text-secondary);
    margin-bottom: 1.75rem;
    font-weight: 300;
  }

  .su-label {
    font-size: 13px;
    font-weight: 500;
    color: var(--text-secondary);
    margin-bottom: 6px;
    letter-spacing: 0.01em;
    display: block;
  }

  .su-input {
    background: var(--bg-secondary);
    border: 0.5px solid var(--border-secondary);
    border-radius: 10px;
    color: var(--text-primary);
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    height: 42px;
    padding: 0 14px;
    width: 100%;
    transition: border-color 0.15s, box-shadow 0.15s;
    outline: none;
  }

  .su-input:focus {
    background: var(--bg-primary);
    border-color: var(--teal);
    box-shadow: 0 0 0 3px rgba(29,158,117,0.12);
  }

  .su-input::placeholder { color: var(--text-tertiary); font-weight: 300; }

  .su-icon-wrap { position: relative; }
  .su-icon-wrap .su-input { padding-left: 38px; }
  .su-icon {
    position: absolute;
    left: 12px;
    top: 50%;
    transform: translateY(-50%);
    width: 16px; height: 16px;
    opacity: 0.35;
    pointer-events: none;
  }

  .su-pw-wrap { position: relative; }
  .su-pw-wrap .su-input { padding-right: 40px; }

  .su-toggle-pw {
    position: absolute;
    right: 12px; top: 50%;
    transform: translateY(-50%);
    background: none; border: none; padding: 0;
    cursor: pointer; opacity: 0.4;
    transition: opacity 0.15s; line-height: 1;
  }
  .su-toggle-pw:hover { opacity: 0.8; }

  .su-name-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
    margin-bottom: 1rem;
  }

  .su-mb { margin-bottom: 1rem; }

  .su-btn {
    width: 100%;
    height: 44px;
    background: var(--teal-dark);
    color: #fff;
    border: none;
    border-radius: 10px;
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: background 0.15s, transform 0.1s;
    letter-spacing: 0.01em;
    margin-top: 0.5rem;
    display: block;
  }
  .su-btn:hover { background: var(--teal-deeper); }
  .su-btn:active { transform: scale(0.99); }

  .su-signin {
    text-align: center;
    font-size: 13px;
    color: var(--text-tertiary);
    margin-top: 1.25rem;
    font-weight: 300;
  }
  .su-signin a { color: var(--teal); text-decoration: none; font-weight: 400; }
  .su-signin a:hover { text-decoration: underline; }
`;

function EyeIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
    >
      <path d="M1 8s2.5-4.5 7-4.5S15 8 15 8s-2.5 4.5-7 4.5S1 8 1 8z" />
      <circle cx="8" cy="8" r="2" />
    </svg>
  );
}

export default function SignupForm() {
  const [showPw, setShowPw] = useState(false);
  const [showCpw, setShowCpw] = useState(false);

  const [fName, setFname] = useState();
  const [lName, setLname] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/register", { fName, lName, email, password })
      .then((result) => {
        console.log(result);
        navigate("/login");
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <style>{styles}</style>
      <div className="su-wrap">
        <div className="su-card">
          <div className="su-accent-bar" />

          <div className="su-brand-icon">
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <path
                d="M4 11C4 7.13 7.13 4 11 4s7 3.13 7 7-3.13 7-7 7-7-3.13-7-7z"
                fill="#1D9E75"
                opacity="0.25"
              />
              <path
                d="M7.5 11.5l2.5 2.5 5-5"
                stroke="#0F6E56"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <h1>Create your account</h1>
          <p className="su-subtitle">Get started — it only takes a minute.</p>

          <form onSubmit={handleSubmit}>
            {/* First & Last name */}
            <div className="su-name-row">
              <div>
                <label className="su-label" htmlFor="fname">
                  First name
                </label>
                <input
                  id="fname"
                  name="fname"
                  type="text"
                  className="su-input"
                  placeholder="Ada"
                  autoComplete="given-name"
                  onChange={(e) => setFname(e.target.value)}
                />
              </div>
              <div>
                <label className="su-label" htmlFor="lname">
                  Last name
                </label>
                <input
                  id="lname"
                  name="lname"
                  type="text"
                  className="su-input"
                  placeholder="Lovelace"
                  autoComplete="family-name"
                  onChange={(e) => setLname(e.target.value)}
                />
              </div>
            </div>

            {/* Email */}
            <div className="su-mb">
              <label className="su-label" htmlFor="email">
                Email address
              </label>
              <div className="su-icon-wrap">
                <svg
                  className="su-icon"
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.2"
                >
                  <rect x="1" y="3" width="14" height="10" rx="2" />
                  <path d="M1 5.5l7 4.5 7-4.5" />
                </svg>
                <input
                  id="email"
                  name="email"
                  type="email"
                  className="su-input"
                  placeholder="you@example.com"
                  autoComplete="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            {/* Password */}
            <div className="su-mb">
              <label className="su-label" htmlFor="password">
                Password
              </label>
              <div className="su-pw-wrap">
                <input
                  id="password"
                  name="password"
                  type={showPw ? "text" : "password"}
                  className="su-input"
                  placeholder="Min. 8 characters"
                  autoComplete="new-password"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  className="su-toggle-pw"
                  type="button"
                  onClick={() => setShowPw((v) => !v)}
                  aria-label="Toggle password visibility"
                >
                  <EyeIcon />
                </button>
              </div>
            </div>

            <button className="su-btn" type="submit">
              Create account
            </button>
          </form>

          <p className="su-signin">
            Already have an account? <a href="/login">Sign in</a>
          </p>
        </div>
      </div>
    </>
  );
}
