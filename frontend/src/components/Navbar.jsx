import { NavLink, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  return (
    <header className="navbar">
      <div className="nav-container">

        {/* Logo */}
        <div
          className="logo"
          onClick={() => navigate("/")}
        >
          <span className="logo-icon">✦</span>
          <span>StartupAI</span>
        </div>

        {/* Center Navigation */}
        <nav className="nav-links">
          <NavLink to="/">Home</NavLink>

          <NavLink to="/NewAnalysis">
            New Analysis
          </NavLink>

          <NavLink to="/history">
            History
          </NavLink>
        </nav>

        {/* Right Actions */}
        <div className="nav-actions">

          <button
            className="login-btn"
            onClick={() => navigate("/login")}
          >
            Log In
          </button>

          <button
            className="primary-btn nav-start-btn"
            onClick={() => navigate("/NewAnalysis")}
          >
            Start Analysis
            <span>→</span>
          </button>

        </div>

      </div>
    </header>
  );
}

export default Navbar;