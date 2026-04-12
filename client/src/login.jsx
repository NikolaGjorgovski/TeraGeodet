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

  .li-wrap {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem 1rem;
    font-family: 'DM Sans', sans-serif;
  }

  .li-card {
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

  .li-accent-bar {
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 4px;
    background: linear-gradient(90deg, #1D9E75, #378ADD, #534AB7);
    border-radius: 20px 20px 0 0;
  }

  .li-brand-icon {
    width: 44px;
    height: 44px;
    border-radius: 12px;
    background: var(--teal-light);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1.25rem;
  }

  .li-card h1 {
    font-family: 'DM Serif Display', serif;
    font-size: 26px;
    font-weight: 400;
    color: var(--text-primary);
    margin-bottom: 0.25rem;
    letter-spacing: -0.3px;
  }

  .li-subtitle {
    font-size: 14px;
    color: var(--text-secondary);
    margin-bottom: 1.75rem;
    font-weight: 300;
  }

  .li-label {
    font-size: 13px;
    font-weight: 500;
    color: var(--text-secondary);
    margin-bottom: 6px;
    letter-spacing: 0.01em;
    display: block;
  }

  .li-input {
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

  .li-input:focus {
    background: var(--bg-primary);
    border-color: var(--teal);
    box-shadow: 0 0 0 3px rgba(29,158,117,0.12);
  }

  .li-input::placeholder { color: var(--text-tertiary); font-weight: 300; }

  .li-icon-wrap { position: relative; }
  .li-icon-wrap .li-input { padding-left: 38px; }
  .li-icon {
    position: absolute;
    left: 12px;
    top: 50%;
    transform: translateY(-50%);
    width: 16px; height: 16px;
    opacity: 0.35;
    pointer-events: none;
  }

  .li-pw-wrap { position: relative; }
  .li-pw-wrap .li-input { padding-right: 40px; }

  .li-toggle-pw {
    position: absolute;
    right: 12px; top: 50%;
    transform: translateY(-50%);
    background: none; border: none; padding: 0;
    cursor: pointer; opacity: 0.4;
    transition: opacity 0.15s; line-height: 1;
  }
  .li-toggle-pw:hover { opacity: 0.8; }

  .li-mb { margin-bottom: 1rem; }

  .li-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1rem;
  }

  .li-remember {
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
  }

  .li-checkbox {
    width: 16px; height: 16px;
    border-radius: 5px;
    border: 0.5px solid var(--border-secondary);
    appearance: none;
    -webkit-appearance: none;
    background: var(--bg-secondary);
    cursor: pointer;
    position: relative;
    transition: background 0.15s, border-color 0.15s;
    flex-shrink: 0;
  }

  .li-checkbox:checked {
    background: var(--teal);
    border-color: var(--teal);
  }

  .li-checkbox:checked::after {
    content: '';
    position: absolute;
    left: 4px; top: 2px;
    width: 5px; height: 8px;
    border: 1.5px solid #fff;
    border-top: none; border-left: none;
    transform: rotate(45deg);
  }

  .li-remember-label {
    font-size: 13px;
    color: var(--text-secondary);
    font-weight: 300;
    user-select: none;
  }

  .li-forgot {
    font-size: 13px;
    color: var(--teal);
    text-decoration: none;
    font-weight: 400;
  }
  .li-forgot:hover { text-decoration: underline; }

  .li-btn {
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
    margin-top: 0.25rem;
    display: block;
  }
  .li-btn:hover { background: var(--teal-deeper); }
  .li-btn:active { transform: scale(0.99); }

  .li-signup {
    text-align: center;
    font-size: 13px;
    color: var(--text-tertiary);
    margin-top: 1.25rem;
    font-weight: 300;
  }
  .li-signup a { color: var(--teal); text-decoration: none; font-weight: 400; }
  .li-signup a:hover { text-decoration: underline; }
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

export default function LoginForm() {
  const [showPw, setShowPw] = useState(false);

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/login", { email, password })
      .then((result) => {
        console.log(result);
        if (result.data === "Success") {
          navigate("/home");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <style>{styles}</style>
      <div className="li-wrap">
        <div className="li-card">
          <div className="li-accent-bar" />

          <div className="li-brand-icon">
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

          <h1>Welcome back</h1>
          <p className="li-subtitle">Sign in to continue to your account.</p>
          <form onSubmit={handleSubmit}>
            {/* Email */}
            <div className="li-mb">
              <label className="li-label" htmlFor="email">
                Email address
              </label>
              <div className="li-icon-wrap">
                <svg
                  className="li-icon"
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
                  className="li-input"
                  placeholder="you@example.com"
                  autoComplete="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            {/* Password */}
            <div className="li-mb">
              <label className="li-label" htmlFor="password">
                Password
              </label>
              <div className="li-pw-wrap">
                <input
                  id="password"
                  name="password"
                  type={showPw ? "text" : "password"}
                  className="li-input"
                  placeholder="Your password"
                  autoComplete="current-password"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  className="li-toggle-pw"
                  type="button"
                  onClick={() => setShowPw((v) => !v)}
                  aria-label="Toggle password visibility"
                >
                  <EyeIcon />
                </button>
              </div>
            </div>
          </form>
          {/* Remember me + Forgot password */}
          <div className="li-row">
            <label className="li-remember">
              <input type="checkbox" name="remember" className="li-checkbox" />
              <span className="li-remember-label">Remember me</span>
            </label>
            <a href="#" className="li-forgot">
              Forgot password?
            </a>
          </div>

          <button className="li-btn" onClick={handleSubmit}>
            Sign in
          </button>

          <p className="li-signup">
            Don't have an account? <a href="#">Sign up</a>
          </p>
        </div>
      </div>
    </>
  );
}
