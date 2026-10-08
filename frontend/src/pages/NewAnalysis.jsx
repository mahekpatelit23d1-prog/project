import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
  };

  const handleNumberWheel = (event) => {
    event.currentTarget.blur();
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.startup_name.trim()) {
      newErrors.startup_name = "Please enter your startup name.";
    }

    if (!formData.startup_idea.trim()) {
      newErrors.startup_idea = "Please describe your startup idea.";
    }

    if (!formData.location.trim()) {
      newErrors.location = "Please enter your startup location.";
    }

    if (!formData.budget) {
      newErrors.budget = "Please enter your estimated budget.";
    }

    if (!formData.sector) {
      newErrors.sector = "Please select a sector.";
    }

    if (!formData.founder_experience_years) {
      newErrors.founder_experience_years =
        "Please enter founder experience.";
    }

    if (!formData.team_size) {
      newErrors.team_size = "Please enter your team size.";
    }

    if (!formData.founder_background) {
      newErrors.founder_background =
        "Please select founder background.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
  event.preventDefault();

  const isValid = validateForm();

  if (!isValid) {
    return;
  }

  setLoading(true);

  try {
    const response = await fetch("http://127.0.0.1:8000/api/analyze", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        startup_name: formData.startup_name,
        startup_idea: formData.startup_idea,
        location: formData.location,
        budget: Number(formData.budget),
        sector: formData.sector,
        founder_experience_years:
          Number(formData.founder_experience_years),
        team_size: Number(formData.team_size),
        founder_background: formData.founder_background,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to analyze startup.");
    }
     console.log("Request sent successfully.");

//    const data = await response.json();
//
//    console.log("Backend Response:", data);

//   navigate("/analysis-result", {
//    state: {
//      result: data,
//    },
//  });

  } catch (error) {
    console.error("Backend Error:", error);

    alert(
      "Something went wrong while analyzing your startup. Please try again."
    );
  } finally {
    setLoading(false);
  }
};

  return (
    <main className="analysis-page">
      <div className="analysis-container">

        {/* PAGE HEADING */}
        <div className="analysis-heading">
          <p className="section-label">
            NEW ANALYSIS
          </p>

          <h1>
            Tell Us About
            <br />
            <span>Your Startup.</span>
          </h1>

          <p>
            Provide a few details about your startup.
            This information will later be used to generate
            your complete AI-powered startup analysis.
          </p>
        </div>

        {/* STARTUP FORM */}
        <form
          className="analysis-form"
          onSubmit={handleSubmit}
        >

          {/* STARTUP NAME */}
          <div className="form-group full-width">
            <label>Startup Name</label>

            <input
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

          {/* STARTUP IDEA */}
          <div className="form-group full-width">
            <label>Startup Idea</label>

            <textarea
              name="startup_idea"
              value={formData.startup_idea}
              onChange={handleChange}
              placeholder="Briefly describe your startup idea ..."
              rows="5"
            />

            {errors.startup_idea && (
              <small className="error">
                {errors.startup_idea}
              </small>
            )}
          </div>

          {/* LOCATION */}
          <div className="form-group">
            <label>Startup Location</label>

            <input
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

          {/* BUDGET */}
          <div className="form-group">
            <label>Estimated Budget</label>

            <div className="input-with-unit">
              <input
                type="number"
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                onWheel={handleNumberWheel}
                placeholder="e.g. 1000000"
                min="0"
              />

              <span>$</span>
            </div>

            {errors.budget && (
              <small className="error">
                {errors.budget}
              </small>
            )}
          </div>

          {/* SECTOR */}
          <div className="form-group">
            <label>Sector</label>

            <select
              name="sector"
              value={formData.sector}
              onChange={handleChange}
            >
              <option value="">
                Select your sector
              </option>

              <option value="AI">AI</option>
              <option value="Climate">Climate</option>
              <option value="Crypto">Crypto</option>
              <option value="Ecommerce">Ecommerce</option>
              <option value="Fintech">Fintech</option>
              <option value="Health">Health</option>
              <option value="SaaS">SaaS</option>
            </select>

            {errors.sector && (
              <small className="error">
                {errors.sector}
              </small>
            )}
          </div>

          {/* FOUNDER EXPERIENCE */}
          <div className="form-group">
            <label>Founder Experience</label>

            <div className="input-with-unit">
              <input
                type="number"
                name="founder_experience_years"
                value={formData.founder_experience_years}
                onChange={handleChange}
                onWheel={handleNumberWheel}
                placeholder="0"
                min="0"
                max="24"
              />

              <span>years</span>
            </div>

            {errors.founder_experience_years && (
              <small className="error">
                {errors.founder_experience_years}
              </small>
            )}
          </div>

          {/* TEAM SIZE */}
          <div className="form-group">
            <label>Team Size</label>

            <input
              type="number"
              name="team_size"
              value={formData.team_size}
              onChange={handleChange}
              onWheel={handleNumberWheel}
              placeholder="e.g. 8"
              min="2"
              max="299"
            />

            {errors.team_size && (
              <small className="error">
                {errors.team_size}
              </small>
            )}
          </div>

          {/* FOUNDER BACKGROUND */}
          <div className="form-group">
            <label>Founder Background</label>

            <select
              name="founder_background"
              value={formData.founder_background}
              onChange={handleChange}
            >
              <option value="">
                Select background
              </option>

              <option value="academic">
                Academic
              </option>

              <option value="first_time">
                First Time Founder
              </option>

              <option value="ex_bigtech">
                Ex-BigTech
              </option>

              <option value="serial_founder">
                Serial Founder
              </option>
            </select>

            {errors.founder_background && (
              <small className="error">
                {errors.founder_background}
              </small>
            )}
          </div>

          {/* INFORMATION BOX */}
          <div className="analysis-info">

            <div className="info-icon">
              ✦
            </div>

            <div className="info-content">
              <h3>
                What happens next?
              </h3>

              <p>
                Your startup information will later be analyzed
                by specialized AI agents and a machine learning
                prediction model.
              </p>
            </div>

          </div>

          {/* FORM ACTIONS */}
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
                {loading ? "Analyzing..." : "Analyze My Startup"}
                {!loading && <span>→</span>}
            </button>

            <p>
              Your information will be used for startup analysis.
            </p>

          </div>

        </form>

      </div>
    </main>
  );
}

export default NewAnalysis;