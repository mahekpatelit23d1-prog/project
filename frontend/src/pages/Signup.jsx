import { useState } from "react";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = "http://127.0.0.1:5000";

function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setError("");
    setSuccess("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          password: formData.password,
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        const message =
          typeof data.detail === "string"
            ? data.detail
            : typeof data.message === "string"
              ? data.message
              : response.status === 409
                ? "An account with this email already exists."
                : "Unable to create your account. Please try again.";

        throw new Error(message);
      }

      setSuccess(
        "Your account was created successfully. Redirecting to sign in..."
      );

      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });

      window.setTimeout(() => {
        navigate("/login", { replace: true });
      }, 1200);
    } catch (err) {
      console.error("Signup API error:", err);

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

        <p className="section-label">GET STARTED</p>
        <h1>Create Your Account</h1>

        <p className="auth-description">
          Start exploring intelligent startup analysis.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="signup-name">Full Name</label>
            <input
              id="signup-name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your full name"
              autoComplete="name"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="signup-email">Email</label>
            <input
              id="signup-email"
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
            <label htmlFor="signup-password">Password</label>
            <input
              id="signup-password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="At least 8 characters"
              autoComplete="new-password"
              minLength={8}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="signup-confirm-password">Confirm Password</label>
            <input
              id="signup-confirm-password"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Re-enter your password"
              autoComplete="new-password"
              required
            />
          </div>

          {error && (
            <p className="auth-error" role="alert">
              {error}
            </p>
          )}

          {success && (
            <p className="auth-success" role="status">
              {success}
            </p>
          )}

          <button
            type="submit"
            className="primary-btn auth-submit"
            disabled={loading || Boolean(success)}
          >
            {loading ? "Creating Account..." : "Create Account →"}
          </button>
        </form>

        <p className="auth-switch">
          Already have an account?{" "}
          <button type="button" onClick={() => navigate("/login")}>
            Sign In
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

export default Signup;