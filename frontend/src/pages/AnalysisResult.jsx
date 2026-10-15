import { useLocation, useNavigate } from "react-router-dom";
import "./AnalysisResult.css";

function AnalysisResult() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const result = state?.result;
  const submittedStartup = state?.submittedStartup || {};

  const value = (item) => {
    if (item === null || item === undefined || item === "") {
      return "Not available";
    }

    if (typeof item === "object") {
      return JSON.stringify(item, null, 2);
    }

    return String(item);
  };

  const firstAvailable = (...items) =>
    items.find((item) => item !== null && item !== undefined && item !== "");

  const formatDate = (dateString) => {
    if (!dateString) return "Not available";

    const date = new Date(dateString);

    return Number.isNaN(date.getTime())
      ? "Not available"
      : date.toLocaleString();
  };

  const errorMessage = (error) => {
    if (!error) return "";
    if (typeof error === "string") return error;

    return value(error.error || error.details || error.message || error);
  };

  const renderCard = (label, content) => (
    <article className="result-card" key={label}>
      <span>{label}</span>
      <strong>{value(content)}</strong>
    </article>
  );

  if (!result) {
    return (
      <main className="result-page">
        <div className="result-container result-empty">
          <h1>No Analysis Results Yet</h1>
          <p>Submit your startup details to view your analysis.</p>

          <button
            type="button"
            onClick={() => navigate("/NewAnalysis")}
          >
            Go to New Analysis
          </button>
        </div>
      </main>
    );
  }

  const startup = result.startup || result.input || {};
  const market = result.marketResearch || {};
  const funding = result.fundingResearch || {};
  const legal = result.legalResearch || {};

  const predictionResult = result.prediction || {};

  const prediction =
    predictionResult.prediction &&
    typeof predictionResult.prediction === "object"
      ? predictionResult.prediction
      : predictionResult;

  const probabilityRaw = firstAvailable(
    prediction.successProbability,
    prediction.success_probability
  );

  const probability =
    probabilityRaw !== undefined &&
    Number.isFinite(Number(probabilityRaw)) &&
    probabilityRaw !== ""
      ? Math.min(100, Math.max(0, Number(probabilityRaw)))
      : null;

  const riskLevel = String(
    firstAvailable(prediction.riskLevel, prediction.risk_level, "")
  ).toLowerCase();

  const riskClass =
    riskLevel === "low"
      ? "risk-low"
      : riskLevel === "medium"
        ? "risk-medium"
        : riskLevel === "high"
          ? "risk-high"
          : "risk-unknown";

  const agentErrors = result.agentErrors || {};

  const legalError = firstAvailable(
    legal.error,
    legal.status === "error" ? legal.message : null,
    agentErrors.legal
  );

  const otherAgentErrors = Object.entries(agentErrors).filter(
    ([agent, error]) =>
      agent.toLowerCase() !== "legal" &&
      error !== null &&
      error !== undefined &&
      error !== false &&
      error !== ""
  );

  const idea = firstAvailable(
    startup.startupIdea,
    startup.idea,
    submittedStartup.startupIdea,
    result.startupIdea,
    result.startup_idea
  );

  const location = firstAvailable(
    startup.location,
    submittedStartup.location,
    result.location
  );

  const budget = firstAvailable(
    startup.budget,
    submittedStartup.budget,
    result.budget
  );

  const sector = firstAvailable(
    startup.sector,
    submittedStartup.sector,
    result.sector
  );

  const founderExperience = firstAvailable(
    startup.founderExperienceYears,
    startup.founder_experience_years,
    submittedStartup.founderExperienceYears
  );

  const teamSize = firstAvailable(
    startup.teamSize,
    startup.team_size,
    submittedStartup.teamSize
  );

  const founderBackground = firstAvailable(
    startup.founderBackground,
    startup.founder_background,
    submittedStartup.founderBackground
  );

  const legalSummary = firstAvailable(
    legal.summary,
    legal.details,
    legal.recommendations,
    legal.regulations
  );

  return (
    <main className="result-page">
      <div className="result-container">
        <header className="result-heading">
          <span className="result-eyebrow">
            STARTUP INTELLIGENCE REPORT
          </span>

          <h1>
            Your Startup <span>Analysis</span>
          </h1>

          <p>
            Explore your startup's market, funding, legal research and
            predicted success.
          </p>

          <span className="result-status">
            Analysis status: {value(result.status || "completed")}
          </span>
        </header>

        <section className="result-section">
          <h2>🚀 Startup Overview</h2>

          <div className="result-grid">
            {renderCard(
              "Startup Name",
              firstAvailable(startup.name, startup.startupName, "Not provided")
            )}

            {renderCard("Startup Idea", idea)}
            {renderCard("Location", location)}
            {renderCard("Budget", budget)}

            {renderCard(
              "Founder Experience",
              founderExperience == null
                ? null
                : `${founderExperience} years`
            )}

            {renderCard("Sector", sector)}
            {renderCard("Team Size", teamSize)}
            {renderCard("Founder Background", founderBackground)}
          </div>
        </section>

        <section className="result-section">
          <h2>📊 Success Prediction</h2>

          <div className="prediction-layout">
            <article className="result-card prediction-chart-card">
              <h3>Success Probability</h3>

              {probability === null ? (
                <div className="prediction-unavailable">
                  Prediction is not available yet.
                </div>
              ) : (
                <>
                  <div
                    className="prediction-chart"
                    style={{
                      background: `conic-gradient(#2563eb ${probability}%, #e2e8f0 0)`,
                    }}
                    role="img"
                    aria-label={`Success probability ${probability.toFixed(1)} percent`}
                  >
                    <div className="prediction-chart-hole">
                      <strong>{probability.toFixed(1)}%</strong>
                      <span>Success Probability</span>
                    </div>
                  </div>

                  <p className="prediction-caption">
                    Estimated probability provided by the prediction model.
                  </p>
                </>
              )}
            </article>

            <article className="result-card prediction-risk-card">
              <span>Startup Risk Level</span>

              <strong className={`risk-badge ${riskClass}`}>
                {value(
                  firstAvailable(prediction.riskLevel, prediction.risk_level)
                )}
              </strong>

              <div className="prediction-divider" />

              <span>Prediction Status</span>
              <strong>
                {value(
                  firstAvailable(predictionResult.status, prediction.status)
                )}
              </strong>

              <div className="prediction-divider" />

              <span>Predicted Success Class</span>
              <strong>
                {value(
                  firstAvailable(
                    prediction.success,
                    prediction.predictedSuccess,
                    prediction.predicted_success
                  )
                )}
              </strong>

              <p className="prediction-caption">
                Risk level and prediction status are provided by the backend.
              </p>
            </article>
          </div>
        </section>

        <section className="result-section">
          <h2>📈 Market Research</h2>

          {market.error ? (
            <div className="result-error">
              <strong>Market Research is unavailable</strong>
              <p>{errorMessage(market.error)}</p>
            </div>
          ) : (
            <div className="result-grid">
              {renderCard(
                "Competition",
                firstAvailable(market.competition, market.competitors)
              )}

              {renderCard("Demand", market.demand)}

              {renderCard(
                "Growth Rate",
                firstAvailable(market.growth_rate, market.growthRate)
              )}

              {renderCard(
                "Market Size (Billion)",
                firstAvailable(
                  market.market_size_billion,
                  market.marketSizeBillion,
                  market.marketSize
                )
              )}

              {renderCard(
                "Target Users",
                firstAvailable(market.target_users, market.targetUsers)
              )}
            </div>
          )}
        </section>

        <section className="result-section">
          <h2>💰 Funding Research</h2>

          {funding.error ? (
            <div className="result-error">
              <strong>Funding Research is unavailable</strong>
              <p>{errorMessage(funding.error)}</p>
            </div>
          ) : (
            <div className="result-grid">
              {renderCard(
                "Funding Required",
                firstAvailable(funding.funding_required, funding.fundingRequired)
              )}

              {renderCard(
                "Funding Stage",
                firstAvailable(funding.funding_stage, funding.fundingStage)
              )}

              {renderCard(
                "Potential Investors",
                firstAvailable(funding.investors, funding.potentialInvestors)
              )}

              {renderCard("Grants", funding.grants)}
              {renderCard("Runway", funding.runway)}
            </div>
          )}
        </section>

        <section className="result-section">
          <h2>⚖️ Legal Research</h2>

          {legalError ? (
            <div className="result-error">
              <strong>Legal Agent is temporarily unavailable</strong>
              <p>{errorMessage(legalError)}</p>

              {legal.details && <p>{value(legal.details)}</p>}

              <small>
                Other available analysis results are still displayed.
              </small>
            </div>
          ) : legalSummary ? (
            <div className="result-card legal-result-card">
              <strong>{value(legalSummary)}</strong>
            </div>
          ) : (
            <div className="result-card legal-result-card">
              <strong>Legal research is not available yet.</strong>
            </div>
          )}
        </section>

        {otherAgentErrors.length > 0 && (
          <section className="result-section">
            <h2>⚠️ Other Agent Notices</h2>

            <div className="result-grid">
              {otherAgentErrors.map(([agent, error]) => (
                <article className="result-card" key={agent}>
                  <span>{agent} agent</span>
                  <strong>{errorMessage(error)}</strong>
                </article>
              ))}
            </div>
          </section>
        )}

        <div className="result-actions">
          <button
            type="button"
            onClick={() => navigate("/NewAnalysis")}
          >
            + New Analysis
          </button>

          <button
            type="button"
            className="secondary-button"
            onClick={() => navigate("/history")}
          >
            View History
          </button>

          <button
            type="button"
            className="secondary-button"
            onClick={() => navigate("/")}
          >
            Back to Home
          </button>
        </div>

        <p className="result-timestamp">
          {result.createdAt
            ? `Analysis date: ${formatDate(result.createdAt)}`
            : ""}
        </p>
      </div>
    </main>
  );
}

export default AnalysisResult;