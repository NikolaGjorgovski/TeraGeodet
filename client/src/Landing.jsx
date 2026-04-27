import { useNavigate } from "react-router-dom";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --teal: #1D9E75;
    --teal-dark: #0F6E56;
    --teal-deeper: #085041;
    --teal-light: #E1F5EE;
    --text-primary: #1a1a18;
    --text-secondary: #6b6b68;
    --text-tertiary: #a8a8a5;
    --bg-secondary: #f5f5f3;
    --border: rgba(0,0,0,0.10);
  }

  .ln-body {
    font-family: 'DM Sans', sans-serif;
    color: var(--text-primary);
    background: #ffffff;
  }

  /* ── NAVBAR ── */
  .ln-nav {
    position: sticky;
    top: 0;
    z-index: 100;
    background: rgba(255,255,255,0.92);
    backdrop-filter: blur(12px);
    border-bottom: 0.5px solid var(--border);
    height: 56px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 2rem;
  }

  .ln-nav-brand {
    display: flex;
    align-items: center;
    gap: 10px;
    text-decoration: none;
  }

  .ln-nav-icon {
    width: 32px;
    height: 32px;
    border-radius: 8px;
    background: var(--teal-light);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .ln-nav-name {
    font-family: 'DM Serif Display', serif;
    font-size: 17px;
    color: var(--text-primary);
    letter-spacing: -0.2px;
  }

  .ln-nav-links {
    display: flex;
    align-items: center;
    gap: 2rem;
  }

  .ln-nav-link {
    font-size: 14px;
    color: var(--text-secondary);
    text-decoration: none;
    font-weight: 400;
    transition: color 0.15s;
  }

  .ln-nav-link:hover { color: var(--text-primary); }

  .ln-nav-btn {
    height: 34px;
    padding: 0 16px;
    background: var(--teal-dark);
    color: #fff;
    border: none;
    border-radius: 8px;
    font-family: 'DM Sans', sans-serif;
    font-size: 13px;
    font-weight: 500;
    cursor: pointer;
    transition: background 0.15s;
  }
  .ln-nav-btn:hover { background: var(--teal-deeper); }

  /* ── HERO ── */
  .ln-hero {
    min-height: 88vh;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 4rem 1rem;
    background: linear-gradient(160deg, #f0faf6 0%, #ffffff 50%, #f5f5f3 100%);
    position: relative;
    overflow: hidden;
  }

  .ln-hero-bg {
    position: absolute;
    inset: 0;
    background-image: radial-gradient(circle at 20% 50%, rgba(29,158,117,0.07) 0%, transparent 50%),
                      radial-gradient(circle at 80% 20%, rgba(29,158,117,0.05) 0%, transparent 40%);
    pointer-events: none;
  }

  .ln-hero-content {
    max-width: 720px;
    position: relative;
    z-index: 1;
  }

  .ln-hero-badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: var(--teal-light);
    color: var(--teal-dark);
    font-size: 12px;
    font-weight: 500;
    padding: 5px 12px;
    border-radius: 20px;
    margin-bottom: 1.5rem;
    letter-spacing: 0.02em;
  }

  .ln-hero-title {
    font-family: 'DM Serif Display', serif;
    font-size: clamp(38px, 6vw, 64px);
    font-weight: 400;
    color: var(--text-primary);
    line-height: 1.1;
    letter-spacing: -1px;
    margin-bottom: 1.25rem;
  }

  .ln-hero-title span {
    color: var(--teal);
    font-style: italic;
  }

  .ln-hero-sub {
    font-size: 17px;
    color: var(--text-secondary);
    font-weight: 300;
    line-height: 1.6;
    max-width: 520px;
    margin: 0 auto 2.5rem;
  }

  .ln-hero-actions {
    display: flex;
    gap: 12px;
    justify-content: center;
    flex-wrap: wrap;
  }

  .ln-btn-primary {
    height: 46px;
    padding: 0 24px;
    background: var(--teal-dark);
    color: #fff;
    border: none;
    border-radius: 10px;
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: background 0.15s, transform 0.1s;
  }
  .ln-btn-primary:hover { background: var(--teal-deeper); }
  .ln-btn-primary:active { transform: scale(0.99); }

  .ln-btn-secondary {
    height: 46px;
    padding: 0 24px;
    background: transparent;
    color: var(--text-primary);
    border: 0.5px solid rgba(0,0,0,0.20);
    border-radius: 10px;
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    font-weight: 400;
    cursor: pointer;
    transition: border-color 0.15s, background 0.15s;
  }
  .ln-btn-secondary:hover {
    background: var(--bg-secondary);
    border-color: rgba(0,0,0,0.30);
  }

  .ln-hero-stats {
    display: flex;
    justify-content: center;
    gap: 3rem;
    margin-top: 4rem;
    padding-top: 2rem;
    border-top: 0.5px solid var(--border);
  }

  .ln-hero-stat-value {
    font-family: 'DM Serif Display', serif;
    font-size: 32px;
    color: var(--text-primary);
    letter-spacing: -0.5px;
  }

  .ln-hero-stat-label {
    font-size: 13px;
    color: var(--text-tertiary);
    font-weight: 300;
    margin-top: 2px;
  }

  /* ── SECTION SHARED ── */
  .ln-section {
    padding: 5rem 1rem;
  }

  .ln-section-inner {
    max-width: 960px;
    margin: 0 auto;
  }

  .ln-section-tag {
    font-size: 11px;
    font-weight: 500;
    color: var(--teal);
    text-transform: uppercase;
    letter-spacing: 0.1em;
    margin-bottom: 0.75rem;
  }

  .ln-section-title {
    font-family: 'DM Serif Display', serif;
    font-size: clamp(28px, 4vw, 40px);
    font-weight: 400;
    color: var(--text-primary);
    letter-spacing: -0.5px;
    margin-bottom: 1rem;
    line-height: 1.15;
  }

  .ln-section-sub {
    font-size: 15px;
    color: var(--text-secondary);
    font-weight: 300;
    line-height: 1.6;
    max-width: 560px;
    margin-bottom: 3rem;
  }

  /* ── SERVICES ── */
  .ln-services-bg {
    background: var(--bg-secondary);
  }

  .ln-services-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.25rem;
  }

  .ln-service-card {
    background: #ffffff;
    border: 0.5px solid var(--border);
    border-radius: 16px;
    padding: 1.75rem;
    transition: box-shadow 0.2s, transform 0.2s;
  }

  .ln-service-card:hover {
    box-shadow: 0 8px 32px rgba(0,0,0,0.08);
    transform: translateY(-2px);
  }

  .ln-service-icon {
    width: 44px;
    height: 44px;
    border-radius: 12px;
    background: var(--teal-light);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1rem;
  }

  .ln-service-title {
    font-size: 16px;
    font-weight: 500;
    color: var(--text-primary);
    margin-bottom: 0.5rem;
  }

  .ln-service-desc {
    font-size: 13px;
    color: var(--text-secondary);
    font-weight: 300;
    line-height: 1.6;
  }

  /* ── ABOUT ── */
  .ln-about-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
    align-items: center;
  }

  .ln-about-image {
    background: linear-gradient(135deg, var(--teal-light) 0%, #dff0e8 100%);
    border-radius: 20px;
    height: 380px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 0.5px solid var(--border);
  }

  .ln-about-body {
    font-size: 15px;
    color: var(--text-secondary);
    font-weight: 300;
    line-height: 1.7;
    margin-bottom: 1.5rem;
  }

  .ln-about-points {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .ln-about-point {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 14px;
    color: var(--text-primary);
    font-weight: 400;
  }

  .ln-about-check {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: var(--teal-light);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  /* ── TEAM ── */
  .ln-team-bg {
    background: var(--bg-secondary);
  }

  .ln-team-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1.25rem;
  }

  .ln-team-card {
    background: #ffffff;
    border: 0.5px solid var(--border);
    border-radius: 16px;
    padding: 1.5rem;
    text-align: center;
    transition: box-shadow 0.2s, transform 0.2s;
  }

  .ln-team-card:hover {
    box-shadow: 0 8px 32px rgba(0,0,0,0.08);
    transform: translateY(-2px);
  }

  .ln-team-avatar {
    width: 72px;
    height: 72px;
    border-radius: 50%;
    background: linear-gradient(135deg, var(--teal-light), #dff0e8);
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 1rem;
    font-family: 'DM Serif Display', serif;
    font-size: 22px;
    color: var(--teal-dark);
    border: 2px solid rgba(29,158,117,0.15);
  }

  .ln-team-name {
    font-size: 15px;
    font-weight: 500;
    color: var(--text-primary);
    margin-bottom: 4px;
  }

  .ln-team-role {
    font-size: 12px;
    color: var(--text-tertiary);
    font-weight: 300;
    margin-bottom: 0.75rem;
  }

  .ln-team-badge {
    display: inline-block;
    background: var(--teal-light);
    color: var(--teal-dark);
    font-size: 11px;
    font-weight: 500;
    padding: 3px 10px;
    border-radius: 20px;
  }

  /* ── CONTACT ── */
  .ln-contact-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 3rem;
    align-items: start;
  }

  .ln-contact-items {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
    margin-bottom: 2rem;
  }

  .ln-contact-item {
    display: flex;
    align-items: flex-start;
    gap: 1rem;
  }

  .ln-contact-icon {
    width: 40px;
    height: 40px;
    border-radius: 10px;
    background: var(--teal-light);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .ln-contact-label {
    font-size: 11px;
    font-weight: 500;
    color: var(--text-tertiary);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin-bottom: 3px;
  }

  .ln-contact-value {
    font-size: 14px;
    color: var(--text-primary);
    font-weight: 400;
  }

  .ln-map-placeholder {
    background: linear-gradient(135deg, var(--teal-light) 0%, #dff0e8 100%);
    border-radius: 16px;
    height: 280px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border: 0.5px solid var(--border);
    gap: 0.75rem;
  }

  .ln-map-label {
    font-size: 13px;
    color: var(--text-secondary);
    font-weight: 300;
  }

  /* ── FOOTER ── */
  .ln-footer {
    background: var(--text-primary);
    padding: 2rem 1rem;
    text-align: center;
  }

  .ln-footer-text {
    font-size: 13px;
    color: rgba(255,255,255,0.35);
    font-weight: 300;
  }

  .ln-footer-brand {
    font-family: 'DM Serif Display', serif;
    font-size: 15px;
    color: rgba(255,255,255,0.7);
    margin-bottom: 0.5rem;
  }
`;

const services = [
  {
    title: "Cadastral Surveys",
    desc: "Precise boundary determination and cadastral parcel mapping in accordance with national regulations.",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#0F6E56"
        strokeWidth="1.5"
      >
        <rect x="3" y="3" width="8" height="8" rx="1" />
        <rect x="13" y="3" width="8" height="8" rx="1" />
        <rect x="3" y="13" width="8" height="8" rx="1" />
        <rect x="13" y="13" width="8" height="8" rx="1" />
      </svg>
    ),
  },
  {
    title: "Topographic Surveys",
    desc: "Detailed terrain mapping and elevation data collection for construction and planning purposes.",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#0F6E56"
        strokeWidth="1.5"
      >
        <path
          d="M3 18l5-8 4 5 3-4 6 7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: "Boundary Marking",
    desc: "Physical demarcation of property boundaries with permanent markers as per legal requirements.",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#0F6E56"
        strokeWidth="1.5"
      >
        <circle cx="12" cy="12" r="3" />
        <path d="M12 2v4M12 18v4M2 12h4M18 12h4" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Parcel Subdivision",
    desc: "Legal splitting and merging of land parcels with full documentation for cadastral registration.",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#0F6E56"
        strokeWidth="1.5"
      >
        <path d="M3 3h18v18H3zM12 3v18M3 12h18" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Construction Stakeout",
    desc: "Accurate positioning of construction elements on-site based on approved architectural plans.",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#0F6E56"
        strokeWidth="1.5"
      >
        <path
          d="M2 20h20M6 20V10l6-7 6 7v10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <rect x="9" y="14" width="6" height="6" />
      </svg>
    ),
  },
  {
    title: "Legal Documentation",
    desc: "Preparation of all required geodetic reports and official documentation for government submission.",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#0F6E56"
        strokeWidth="1.5"
      >
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
        <path d="M14 2v6h6M8 13h8M8 17h5" strokeLinecap="round" />
      </svg>
    ),
  },
];

const team = [
  { name: "Aleksandar Petrov", role: "Licensed Surveyor", initials: "AP" },
  { name: "Marija Nikolova", role: "Geodetic Engineer", initials: "MN" },
  { name: "Stefan Blazevski", role: "Field Technician", initials: "SB" },
  {
    name: "Elena Todorovska",
    role: "Documentation Specialist",
    initials: "ET",
  },
];

export default function Landing() {
  const navigate = useNavigate();

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <style>{styles}</style>
      <div className="ln-body">
        {/* ── NAVBAR ── */}
        <nav className="ln-nav">
          <a href="/" className="ln-nav-brand">
            <div className="ln-nav-icon">
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
            <span className="ln-nav-name">TeraGeodet</span>
          </a>

          <div className="ln-nav-links">
            <a
              className="ln-nav-link"
              onClick={() => scrollTo("services")}
              href="#services"
            >
              Services
            </a>
            <a
              className="ln-nav-link"
              onClick={() => scrollTo("about")}
              href="#about"
            >
              About
            </a>
            <a
              className="ln-nav-link"
              onClick={() => scrollTo("team")}
              href="#team"
            >
              Team
            </a>
            <a
              className="ln-nav-link"
              onClick={() => scrollTo("contact")}
              href="#contact"
            >
              Contact
            </a>
            <button className="ln-nav-btn" onClick={() => navigate("/login")}>
              Client Portal
            </button>
          </div>
        </nav>

        {/* ── HERO ── */}
        <section className="ln-hero">
          <div className="ln-hero-bg" />
          <div className="ln-hero-content">
            <div className="ln-hero-badge">
              <svg width="10" height="10" viewBox="0 0 10 10" fill="#0F6E56">
                <circle cx="5" cy="5" r="5" />
              </svg>
              Licensed Geodetic Firm — Est. 2005
            </div>

            <h1 className="ln-hero-title">
              Precision surveying for <span>every parcel</span>
            </h1>

            <p className="ln-hero-sub">
              TeraGeodet provides professional geodetic and cadastral services
              across the region. Accurate, reliable, and legally compliant —
              every time.
            </p>

            <div className="ln-hero-actions">
              <button
                className="ln-btn-primary"
                onClick={() => navigate("/login")}
              >
                Submit a Request
              </button>
              <button
                className="ln-btn-secondary"
                onClick={() => scrollTo("services")}
              >
                Our Services
              </button>
            </div>

            <div className="ln-hero-stats">
              <div>
                <div className="ln-hero-stat-value">500+</div>
                <div className="ln-hero-stat-label">Surveys completed</div>
              </div>
              <div>
                <div className="ln-hero-stat-value">20+</div>
                <div className="ln-hero-stat-label">Years of experience</div>
              </div>
              <div>
                <div className="ln-hero-stat-value">4</div>
                <div className="ln-hero-stat-label">Licensed professionals</div>
              </div>
            </div>
          </div>
        </section>

        {/* ── SERVICES ── */}
        <section className="ln-section ln-services-bg" id="services">
          <div className="ln-section-inner">
            <p className="ln-section-tag">What we do</p>
            <h2 className="ln-section-title">
              Comprehensive geodetic services
            </h2>
            <p className="ln-section-sub">
              From initial boundary surveys to full legal documentation, we
              handle every step of the geodetic process with precision.
            </p>
            <div className="ln-services-grid">
              {services.map((s) => (
                <div key={s.title} className="ln-service-card">
                  <div className="ln-service-icon">{s.icon}</div>
                  <div className="ln-service-title">{s.title}</div>
                  <div className="ln-service-desc">{s.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── ABOUT ── */}
        <section className="ln-section" id="about">
          <div className="ln-section-inner">
            <div className="ln-about-grid">
              <div className="ln-about-image">
                <svg
                  width="80"
                  height="80"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#1D9E75"
                  strokeWidth="0.75"
                  opacity="0.4"
                >
                  <path
                    d="M3 18l5-8 4 5 3-4 6 7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle cx="8" cy="6" r="2" />
                </svg>
              </div>
              <div>
                <p className="ln-section-tag">About the firm</p>
                <h2 className="ln-section-title">
                  Trusted geodetic expertise since 2005
                </h2>
                <p className="ln-about-body">
                  TeraGeodet was founded with a single mission — to deliver
                  accurate, reliable, and legally compliant geodetic services to
                  individuals, businesses, and institutions across the region.
                  Over two decades, we have built a reputation for precision and
                  professionalism.
                </p>
                <p className="ln-about-body">
                  Our team of licensed surveyors and engineers combines modern
                  technology with deep local knowledge to deliver results that
                  stand up to legal scrutiny and meet the highest technical
                  standards.
                </p>
                <div className="ln-about-points">
                  {[
                    "Licensed and certified by national authorities",
                    "Modern GPS and total station equipment",
                    "Fast turnaround with full documentation",
                    "Serving residential, commercial and municipal clients",
                  ].map((point) => (
                    <div key={point} className="ln-about-point">
                      <div className="ln-about-check">
                        <svg
                          width="10"
                          height="10"
                          viewBox="0 0 12 12"
                          fill="none"
                          stroke="#0F6E56"
                          strokeWidth="1.5"
                        >
                          <path
                            d="M2 6l3 3 5-5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                      {point}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── TEAM ── */}
        <section className="ln-section ln-team-bg" id="team">
          <div className="ln-section-inner">
            <p className="ln-section-tag">Our people</p>
            <h2 className="ln-section-title">Meet the team</h2>
            <p className="ln-section-sub">
              A small, experienced team dedicated to delivering quality geodetic
              work on every project.
            </p>
            <div className="ln-team-grid">
              {team.map((member) => (
                <div key={member.name} className="ln-team-card">
                  <div className="ln-team-avatar">{member.initials}</div>
                  <div className="ln-team-name">{member.name}</div>
                  <div className="ln-team-role">{member.role}</div>
                  <span className="ln-team-badge">TeraGeodet</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CONTACT ── */}
        <section className="ln-section" id="contact">
          <div className="ln-section-inner">
            <p className="ln-section-tag">Get in touch</p>
            <h2 className="ln-section-title">Contact us</h2>
            <p className="ln-section-sub">
              Reach out to discuss your project or submit a request directly
              through our client portal.
            </p>
            <div className="ln-contact-grid">
              <div>
                <div className="ln-contact-items">
                  {[
                    {
                      label: "Address",
                      value: "ul. Makedonska 12, Ohrid 6000",
                      icon: (
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#0F6E56"
                          strokeWidth="1.5"
                        >
                          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                          <circle cx="12" cy="9" r="2.5" />
                        </svg>
                      ),
                    },
                    {
                      label: "Phone",
                      value: "+389 46 123 456",
                      icon: (
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#0F6E56"
                          strokeWidth="1.5"
                        >
                          <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.01 1.18 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                        </svg>
                      ),
                    },
                    {
                      label: "Email",
                      value: "info@terageodet.mk",
                      icon: (
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#0F6E56"
                          strokeWidth="1.5"
                        >
                          <rect x="2" y="4" width="20" height="16" rx="2" />
                          <path d="M2 7l10 7 10-7" />
                        </svg>
                      ),
                    },
                    {
                      label: "Working hours",
                      value: "Mon – Fri, 08:00 – 16:00",
                      icon: (
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#0F6E56"
                          strokeWidth="1.5"
                        >
                          <circle cx="12" cy="12" r="10" />
                          <path d="M12 6v6l4 2" strokeLinecap="round" />
                        </svg>
                      ),
                    },
                  ].map((item) => (
                    <div key={item.label} className="ln-contact-item">
                      <div className="ln-contact-icon">{item.icon}</div>
                      <div>
                        <div className="ln-contact-label">{item.label}</div>
                        <div className="ln-contact-value">{item.value}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  className="ln-btn-primary"
                  onClick={() => navigate("/login")}
                >
                  Submit a Request →
                </button>
              </div>

              {/* Map placeholder */}
              <div className="ln-map-placeholder">
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#1D9E75"
                  strokeWidth="1"
                >
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                  <circle cx="12" cy="9" r="2.5" />
                </svg>
                <span className="ln-map-label">Ohrid, North Macedonia</span>
              </div>
            </div>
          </div>
        </section>

        {/* ── FOOTER ── */}
        <footer className="ln-footer">
          <div className="ln-footer-brand">TeraGeodet</div>
          <div className="ln-footer-text">
            © {new Date().getFullYear()} TeraGeodet. All rights reserved.
          </div>
        </footer>
      </div>
    </>
  );
}
