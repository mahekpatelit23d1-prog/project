import { useNavigate } from "react-router-dom";

function Hero() {
  const navigate = useNavigate();

  return (
    <section className="hero">

      <div className="hero-container">

        {/* Left Side */}
        <div className="hero-content">

          <div className="hero-badge">
            ✦ AI-Powered Startup Intelligence
          </div>

          <h1>
            Turn Your Startup Idea Into a{" "}
            <span>Smarter Decision.</span>
          </h1>

          <p>
            Explore your startup's market potential, competition,
            industry trends, business risks and funding opportunities
            with AI-powered analysis and machine learning.
          </p>

          <div className="hero-buttons">

            <button
              className="primary-btn"
              onClick={() => navigate("/NewAnalysis")}
            >
              Start Your Analysis
              <span>→</span>
            </button>

          </div>

        </div>

        {/* Right Side */}
        <div className="hero-visual">

          <div className="intelligence-card">

            <div className="card-top">
              <div>
                <p className="small-label">
                  STARTUP INTELLIGENCE
                </p>

                <h3>
                  Your Startup
                  <br />
                  Analysis
                </h3>
              </div>

              <div className="status-dot"></div>
            </div>

            <div className="analysis-item">
              <div className="analysis-header">
                <span>Market Opportunity</span>
                <span>Analysis</span>
              </div>

              <div className="progress-track">
                <div className="progress-fill width-80"></div>
              </div>
            </div>

            <div className="analysis-item">
              <div className="analysis-header">
                <span>Growth Potential</span>
                <span>Research</span>
              </div>

              <div className="progress-track">
                <div className="progress-fill width-65"></div>
              </div>
            </div>

            <div className="analysis-item">
              <div className="analysis-header">
                <span>Business Readiness</span>
                <span>Insights</span>
              </div>

              <div className="progress-track">
                <div className="progress-fill width-50"></div>
              </div>
            </div>

            <div className="visual-footer">
              <div>
                <strong>AI Research</strong>
                <small>Ready to explore</small>
              </div>

              <div>
                <strong>ML Prediction</strong>
                <small>Future analysis</small>
              </div>
            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

export default Hero;