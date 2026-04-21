import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500&display=swap');

  .nav-wrap {
    width: 100%;
    height: 56px;
    background: #ffffff;
    border-bottom: 0.5px solid rgba(0,0,0,0.10);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 2rem;
    font-family: 'DM Sans', sans-serif;
    box-shadow: 0 1px 12px rgba(0,0,0,0.04);
    position: sticky;
    top: 0;
    z-index: 100;
  }

  .nav-brand {
    display: flex;
    align-items: center;
    gap: 10px;
    text-decoration: none;
  }

  .nav-brand-icon {
    width: 32px;
    height: 32px;
    border-radius: 8px;
    background: #E1F5EE;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .nav-brand-name {
    font-family: 'DM Serif Display', serif;
    font-size: 17px;
    color: #1a1a18;
    letter-spacing: -0.2px;
  }

  .nav-right {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .nav-user {
    font-size: 13px;
    color: #6b6b68;
    font-weight: 300;
  }

  .nav-role-badge {
    font-size: 11px;
    font-weight: 500;
    padding: 2px 8px;
    border-radius: 20px;
    text-transform: capitalize;
    letter-spacing: 0.02em;
  }

  .nav-role-badge.user {
    background: #E1F5EE;
    color: #0F6E56;
  }

  .nav-role-badge.admin {
    background: #EEF2FF;
    color: #4338CA;
  }

  .nav-logout {
    height: 32px;
    padding: 0 14px;
    background: none;
    border: 0.5px solid rgba(0,0,0,0.18);
    border-radius: 8px;
    font-family: 'DM Sans', sans-serif;
    font-size: 13px;
    color: #6b6b68;
    cursor: pointer;
    transition: all 0.15s;
    font-weight: 400;
  }

  .nav-logout:hover {
    background: #fff0f0;
    border-color: #e57373;
    color: #c62828;
  }
`;

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <>
      <style>{styles}</style>
      <nav className="nav-wrap">
        {/* Brand */}
        <a href="/home" className="nav-brand">
          <div className="nav-brand-icon">
            <svg width="18" height="18" viewBox="0 0 22 22" fill="none">
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
          <span className="nav-brand-name">TeraGeodet</span>
        </a>

        {/* Right side */}
        <div className="nav-right">
          {user && (
            <>
              <span className="nav-user">
                {user.fName} {user.lName}
              </span>
              <span className={`nav-role-badge ${user.role}`}>{user.role}</span>
            </>
          )}
          <button className="nav-logout" onClick={handleLogout}>
            Sign out
          </button>
        </div>
      </nav>
    </>
  );
}
