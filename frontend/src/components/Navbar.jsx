import { NavLink, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  return (
    <header className="navbar">
      <div className="nav-container">
        <button
          type="button"
          className="logo"
          onClick={() => navigate("/")}
          aria-label="StartupAI home"
        >
          <span className="logo-icon">❖</span>
          <span>StartupAI</span>
        </button>

        <nav className="nav-links" aria-label="Main navigation">
          <NavLink to="/" end>
            Home
          </NavLink>

          <NavLink to="/NewAnalysis">
            New Analysis
          </NavLink>

          <NavLink to="/history">
            History
          </NavLink>
        </nav>

        <div className="nav-actions">
          <button
            type="button"
            className="login-btn"
            onClick={() => navigate("/login")}
          >
            Log In
          </button>

          <button
            type="button"
            className="primary-btn nav-start-btn"
            onClick={() => navigate("/NewAnalysis")}
          >
            Start Analysis <span>→</span>
          </button>
        </div>
      </div>
    </header>
  );
}

export default Navbar;