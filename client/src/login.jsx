import { useState } from "react";

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
    --red: #E24B4A;
    --red-light: rgba(226,75,74,0.10);
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

  .li-input.invalid {
    border-color: var(--red);
    box-shadow: 0 0 0 3px var(--red-light);
  }

  .li-input.valid { border-color: var(--teal); }

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

  .li-error {
    font-size: 11px;
    color: var(--red);
    margin-top: 4px;
    min-height: 16px;
  }

  .li-alert {
    background: var(--red-light);
    border: 0.5px solid var(--red);
    border-radius: 10px;
    padding: 10px 14px;
    font-size: 13px;
    color: var(--red);
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    gap: 8px;
  }

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
  .li-btn:disabled {
    background: var(--bg-secondary);
    color: var(--text-tertiary);
    cursor: not-allowed;
  }

  .li-signup {
    text-align: center;
    font-size: 13px;
    color: var(--text-tertiary);
    margin-top: 1.25rem;
    font-weight: 300;
  }
  .li-signup a { color: var(--teal); text-decoration: none; font-weight: 400; }
  .li-signup a:hover { text-decoration: underline; }

  .li-success {
    text-align: center;
    padding: 1rem 0 0.5rem;
  }
  .li-success-icon {
    width: 56px; height: 56px;
    border-radius: 50%;
    background: var(--teal-light);
    display: flex; align-items: center; justify-content: center;
    margin: 0 auto 1.25rem;
  }
  .li-success h2 {
    font-family: 'DM Serif Display', serif;
    font-size: 22px; font-weight: 400;
    color: var(--text-primary);
    margin-bottom: 0.5rem;
  }
  .li-success p {
    font-size: 14px;
    color: var(--text-secondary);
    font-weight: 300;
    line-height: 1.6;
  }
  .li-success .li-btn {
    max-width: 200px;
    margin: 1.5rem auto 0;
  }

  .li-spinner {
    width: 16px; height: 16px;
    border: 2px solid rgba(255,255,255,0.35);
    border-top-color: #fff;
    border-radius: 50%;
    animation: li-spin 0.6s linear infinite;
    display: inline-block;
    margin-right: 8px;
    vertical-align: middle;
  }

  @keyframes li-spin {
    to { transform: rotate(360deg); }
  }
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

function AlertIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      style={{ flexShrink: 0 }}
    >
      <circle cx="8" cy="8" r="7" />
      <path d="M8 5v3.5M8 11v.5" strokeLinecap="round" />
    </svg>
  );
}

export default function LoginForm() {
  const [fields, setFields] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [showPw, setShowPw] = useState(false);
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [success, setSuccess] = useState(false);

  const set = (key) => (e) => {
    setFields((f) => ({ ...f, [key]: e.target.value }));
    setErrors((err) => ({ ...err, [key]: "" }));
    setLoginError("");
  };

  const validate = () => {
    const e = {};
    if (!fields.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email))
      e.email = "Enter a valid email address";
    if (!fields.password) e.password = "Password is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setLoading(true);
    setLoginError("");

    // Simulate an API call
    await new Promise((r) => setTimeout(r, 1200));

    // Demo: treat "wrong@example.com" as a bad credential to show error state
    if (fields.email === "wrong@example.com") {
      setLoginError("Incorrect email or password. Please try again.");
      setLoading(false);
      return;
    }

    setLoading(false);
    setSuccess(true);
  };

  const handleReset = () => {
    setFields({ email: "", password: "" });
    setErrors({});
    setShowPw(false);
    setRemember(false);
    setLoading(false);
    setLoginError("");
    setSuccess(false);
  };

  const emailValid =
    fields.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email);

  return (
    <>
      <style>{styles}</style>
      <div className="li-wrap">
        <div className="li-card">
          <div className="li-accent-bar" />

          {!success ? (
            <>
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
              <p className="li-subtitle">
                Sign in to continue to your account.
              </p>

              {loginError && (
                <div className="li-alert">
                  <AlertIcon />
                  {loginError}
                </div>
              )}

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
                    type="email"
                    className={`li-input${errors.email ? " invalid" : emailValid ? " valid" : ""}`}
                    placeholder="you@example.com"
                    value={fields.email}
                    onChange={set("email")}
                    autoComplete="email"
                    disabled={loading}
                  />
                </div>
                {errors.email && <div className="li-error">{errors.email}</div>}
              </div>

              {/* Password */}
              <div className="li-mb">
                <label className="li-label" htmlFor="password">
                  Password
                </label>
                <div className="li-pw-wrap">
                  <input
                    id="password"
                    type={showPw ? "text" : "password"}
                    className={`li-input${errors.password ? " invalid" : fields.password ? " valid" : ""}`}
                    placeholder="Your password"
                    value={fields.password}
                    onChange={set("password")}
                    autoComplete="current-password"
                    disabled={loading}
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
                {errors.password && (
                  <div className="li-error">{errors.password}</div>
                )}
              </div>

              {/* Remember me + Forgot */}
              <div className="li-row">
                <label className="li-remember">
                  <input
                    type="checkbox"
                    className="li-checkbox"
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                  />
                  <span className="li-remember-label">Remember me</span>
                </label>
                <a href="#" className="li-forgot">
                  Forgot password?
                </a>
              </div>

              <button
                className="li-btn"
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading && <span className="li-spinner" />}
                {loading ? "Signing in…" : "Sign in"}
              </button>

              <p className="li-signup">
                Don't have an account? <a href="/register">Sign up</a>
              </p>
            </>
          ) : (
            <div className="li-success">
              <div className="li-success-icon">
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                  <path
                    d="M6 14l6 6 10-10"
                    stroke="#0F6E56"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h2>Signed in!</h2>
              <p>
                Welcome back, <strong>{fields.email}</strong>. You're now logged
                in.
              </p>
              <button className="li-btn" onClick={handleReset}>
                Back to login
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
