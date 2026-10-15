import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const API_BASE_URL = "http://127.0.0.1:5000";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    const email = formData.email.trim();
    const password = formData.password;

    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        const message =
          typeof data.detail === "string"
            ? data.detail
            : typeof data.message === "string"
              ? data.message
              : "Login failed. Please check your email and password.";

        throw new Error(message);
      }

      if (!data.access_token) {
        throw new Error("Login response did not contain an access token.");
      }

      localStorage.setItem("access_token", data.access_token);

      if (data.user) {
        localStorage.setItem("current_user", JSON.stringify(data.user));
      }

      const meResponse = await fetch(`${API_BASE_URL}/api/auth/me`, {
        headers: {
          Authorization: `Bearer ${data.access_token}`,
          Accept: "application/json",
        },
      });

      const meData = await meResponse.json().catch(() => ({}));

      if (!meResponse.ok) {
        localStorage.removeItem("access_token");
        localStorage.removeItem("current_user");

        throw new Error(
          "Unable to verify your login with the backend. Please sign in again."
        );
      }

      localStorage.setItem(
        "current_user",
        JSON.stringify(meData.user || meData || data.user || {})
      );

      navigate(location.state?.from || "/NewAnalysis", {
        replace: true,
      });
    } catch (err) {
      console.error("Login API error:", err);
      setError(
        err.message || "Unable to connect to the backend. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="auth-page">
      <div className="auth-card">
        <div className="auth-logo">
          <span>✦</span> StartupAI
        </div>

        <p className="section-label">WELCOME BACK</p>
        <h1>Sign in to StartupAI</h1>

        <p className="auth-description">
          Continue exploring your startup intelligence.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="login-email">Email</label>

            <input
              id="login-email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              autoComplete="email"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="login-password">Password</label>

            <input
              id="login-password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              autoComplete="current-password"
              required
            />
          </div>

          {error && (
            <p className="auth-error" role="alert">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="primary-btn auth-submit"
            disabled={loading}
          >
            {loading ? "Signing In..." : "Sign In →"}
          </button>
        </form>

        <p className="auth-switch">
          Don't have an account?{" "}
          <button type="button" onClick={() => navigate("/signup")}>
            Create Account
          </button>
        </p>

        <button
          type="button"
          className="back-link"
          onClick={() => navigate("/")}
        >
          ← Back to Home
        </button>
      </div>
    </main>
  );
}

export default Login;