import { useState } from "react";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = "http://127.0.0.1:5000";

const SECTORS = [
  "AI",
  "Climate",
  "Crypto",
  "Ecommerce",
  "Fintech",
  "Health",
  "SaaS",
];

const FOUNDER_BACKGROUNDS = [
  { label: "First Time", value: "first_time" },
  { label: "Academic", value: "academic" },
  { label: "Ex-BigTech", value: "ex_bigtech" },
  { label: "Serial Founder", value: "serial_founder" },
];

function NewAnalysis() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    startup_name: "",
    startup_idea: "",
    location: "",
    budget: "",
    sector: "",
    founder_experience_years: "",
    team_size: "",
    founder_background: "",
  });

  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setErrors((previous) => ({
      ...previous,
      [name]: "",
    }));

    setApiError("");
  };

  const handleNumberWheel = (event) => {
    event.currentTarget.blur();
  };

  const validateForm = () => {
    const nextErrors = {};

    if (!formData.startup_name.trim()) {
      nextErrors.startup_name =
        "Please enter your startup name.";
    }

    if (!formData.startup_idea.trim()) {
      nextErrors.startup_idea =
        "Please describe your startup idea.";
    }

    if (!formData.location.trim()) {
      nextErrors.location =
        "Please enter your startup location.";
    }

    if (
      formData.budget === "" ||
      !Number.isFinite(Number(formData.budget)) ||
      Number(formData.budget) < 0
    ) {
      nextErrors.budget =
        "Enter a valid budget of zero or more.";
    }

    if (!SECTORS.includes(formData.sector)) {
      nextErrors.sector =
        "Please select a supported sector.";
    }

    if (
      formData.founder_experience_years === "" ||
      !Number.isInteger(
        Number(formData.founder_experience_years)
      ) ||
      Number(formData.founder_experience_years) < 0 ||
      Number(formData.founder_experience_years) > 24
    ) {
      nextErrors.founder_experience_years =
        "Enter a whole number from 0 to 24.";
    }

    if (
      formData.team_size === "" ||
      !Number.isInteger(Number(formData.team_size)) ||
      Number(formData.team_size) < 2 ||
      Number(formData.team_size) > 299
    ) {
      nextErrors.team_size =
        "Enter a whole number from 2 to 299.";
    }

    if (
      !FOUNDER_BACKGROUNDS.some(
        (background) =>
          background.value === formData.founder_background
      )
    ) {
      nextErrors.founder_background =
        "Please select a founder background.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setApiError("");

    if (!validateForm()) return;

    const token = localStorage.getItem("access_token");

    if (!token) {
      navigate("/login", {
        state: { from: "/NewAnalysis" },
      });
      return;
    }

    const payload = {
      startupName: formData.startup_name.trim(),
      startupIdea: formData.startup_idea.trim(),
      location: formData.location.trim(),
      budget: Number(formData.budget),
      founderExperienceYears: Number(
        formData.founder_experience_years
      ),
      teamSize: Number(formData.team_size),
      sector: formData.sector,
      founderBackground: formData.founder_background,
    };

    setLoading(true);

    try {
      const response = await fetch(
        `${API_BASE_URL}/api/analyze`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json().catch(() => ({}));

      if (
        response.status === 401 ||
        response.status === 403
      ) {
        localStorage.removeItem("access_token");
        localStorage.removeItem("current_user");

        navigate("/login", {
          replace: true,
          state: { from: "/NewAnalysis" },
        });

        return;
      }

      if (!response.ok) {
        const message =
          typeof data.detail === "string"
            ? data.detail
            : typeof data.message === "string"
              ? data.message
              : "Unable to analyze your startup. Please try again.";

        throw new Error(message);
      }

      navigate("/analysis-result", {
        state: {
          result: data,
          submittedStartup: payload,
        },
      });
    } catch (error) {
      console.error("Analysis API error:", error);

      setApiError(
        error.message ||
          "Unable to connect to the backend at http://127.0.0.1:5000."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="analysis-page">
      <div className="analysis-container">
        <div className="analysis-heading">
          <p className="section-label">NEW ANALYSIS</p>

          <h1>
            Tell Us About
            <br />
            <span>Your Startup.</span>
          </h1>

          <p>
            Provide a few details about your startup to generate
            your AI-powered startup analysis.
          </p>
        </div>

        <form
          className="analysis-form"
          onSubmit={handleSubmit}
          noValidate
        >
          <div className="form-group full-width">
            <label htmlFor="startup_name">
              Startup Name
            </label>

            <input
              id="startup_name"
              type="text"
              name="startup_name"
              value={formData.startup_name}
              onChange={handleChange}
              placeholder="e.g. HealthAI"
            />

            {errors.startup_name && (
              <small className="error">
                {errors.startup_name}
              </small>
            )}
          </div>

          <div className="form-group full-width">
            <label htmlFor="startup_idea">
              Startup Idea
            </label>

            <textarea
              id="startup_idea"
              name="startup_idea"
              value={formData.startup_idea}
              onChange={handleChange}
              placeholder="Describe your startup idea, the problem it solves and who it serves..."
              rows={5}
            />

            {errors.startup_idea && (
              <small className="error">
                {errors.startup_idea}
              </small>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="location">
              Startup Location
            </label>

            <input
              id="location"
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="e.g. Ahmedabad, Gujarat"
            />

            {errors.location && (
              <small className="error">
                {errors.location}
              </small>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="budget">
              Estimated Budget
            </label>

            <div className="input-with-unit">
              <input
                id="budget"
                type="number"
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                onWheel={handleNumberWheel}
                placeholder="e.g. 1000000"
                min="0"
                step="any"
              />

              <span>$</span>
            </div>

            {errors.budget && (
              <small className="error">
                {errors.budget}
              </small>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="sector">Sector</label>

            <select
              id="sector"
              name="sector"
              value={formData.sector}
              onChange={handleChange}
            >
              <option value="">
                Select your sector
              </option>

              {SECTORS.map((sector) => (
                <option key={sector} value={sector}>
                  {sector}
                </option>
              ))}
            </select>

            {errors.sector && (
              <small className="error">
                {errors.sector}
              </small>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="founder_experience_years">
              Founder Experience
            </label>

            <div className="input-with-unit">
              <input
                id="founder_experience_years"
                type="number"
                name="founder_experience_years"
                value={formData.founder_experience_years}
                onChange={handleChange}
                onWheel={handleNumberWheel}
                placeholder="0"
                min="0"
                max="24"
                step="1"
              />

              <span>years</span>
            </div>

            {errors.founder_experience_years && (
              <small className="error">
                {errors.founder_experience_years}
              </small>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="team_size">Team Size</label>

            <input
              id="team_size"
              type="number"
              name="team_size"
              value={formData.team_size}
              onChange={handleChange}
              onWheel={handleNumberWheel}
              placeholder="e.g. 8"
              min="2"
              max="299"
              step="1"
            />

            {errors.team_size && (
              <small className="error">
                {errors.team_size}
              </small>
            )}
          </div>

          <div className="form-group full-width">
            <label htmlFor="founder_background">
              Founder Background
            </label>

            <select
              id="founder_background"
              name="founder_background"
              value={formData.founder_background}
              onChange={handleChange}
            >
              <option value="">
                Select founder background
              </option>

              {FOUNDER_BACKGROUNDS.map((background) => (
                <option
                  key={background.value}
                  value={background.value}
                >
                  {background.label}
                </option>
              ))}
            </select>

            {errors.founder_background && (
              <small className="error">
                {errors.founder_background}
              </small>
            )}
          </div>

          <div className="analysis-info">
            <div className="info-icon">✦</div>

            <div className="info-content">
              <h3>What happens next?</h3>

              <p>
                Your startup information will be analyzed by
                specialized AI agents and a machine learning
                prediction model.
              </p>
            </div>
          </div>

          {apiError && (
            <div
              className="result-error full-width"
              role="alert"
            >
              <strong>
                Analysis could not be completed
              </strong>
              <p>{apiError}</p>
            </div>
          )}

          <div className="form-submit">
            <button
              type="button"
              className="secondary-btn"
              onClick={() => navigate("/")}
            >
              ← Back to Home
            </button>

            <button
              type="submit"
              className="primary-btn submit-btn"
              disabled={loading}
            >
              {loading
                ? "Analyzing..."
                : "Analyze My Startup →"}
            </button>

            <p>
              Your information will be sent to the local backend
              API.
            </p>
          </div>
        </form>
      </div>
    </main>
  );
}

export default NewAnalysis;
