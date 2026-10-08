import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log("Login data:", formData);

    alert(
      "Authentication will be connected later with the backend."
    );
  };

  return (
    <div className="auth-page">

      <div className="auth-card">

        <div className="auth-logo">
          <span>✦</span> StartupAI
        </div>

        <p className="section-label">
          WELCOME BACK
        </p>

        <h1>
          Sign in to StartupAI
        </h1>

        <p className="auth-description">
          Continue exploring your startup intelligence.
        </p>

        <form onSubmit={handleSubmit}>

          <div className="form-group">

            <label>Email</label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              required
            />

          </div>

          <div className="form-group">

            <label>Password</label>

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />

          </div>

          <button
            type="submit"
            className="primary-btn auth-submit"
          >
            Sign In →
          </button>

        </form>

        <p className="auth-switch">
          Don't have an account?{" "}
          <button
            onClick={() => navigate("/signup")}
          >
            Create Account
          </button>
        </p>

        <button
          className="back-link"
          onClick={() => navigate("/")}
        >
          ← Back to Home
        </button>

      </div>

    </div>
  );
}

export default Login;