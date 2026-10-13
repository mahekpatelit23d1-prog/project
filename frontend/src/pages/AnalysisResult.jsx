
import { useLocation, useNavigate } from "react-router-dom";
import "./AnalysisResult.css";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

function AnalysisResult() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const result = state?.result;

  if (!result) {
    return (
      <div className="result-page">
        <div className="result-container">
          <h1>No Analysis Results Yet</h1>
          <p>
            Submit your startup details to view your analysis.
          </p>
          <button onClick={() => navigate("/NewAnalysis")}>
            Go to New Analysis
          </button>
        </div>
      </div>
    );
  }

  const startup = result.startup || {};
  const market = result.marketResearch || {};
  const funding = result.fundingResearch || {};
  const prediction = result.prediction?.prediction || {};
  const legal = result.legalResearch || {};

  const value = (item) =>
    item === null || item === undefined || item === ""
      ? "Not available"
      : item;

  return (
    <div className="result-page">
      <div className="result-container">
        <header className="result-heading">
          <span className="result-eyebrow">
            STARTUP INTELLIGENCE REPORT
          </span>
          <h1>
            Your Startup <span>Analysis</span>
          </h1>
          <p>
            Explore your startup's market, funding, legal
            research and predicted success.
          </p>
        </header>

        <section className="result-section">
          <h2>🚀 Startup Overview</h2>
          <div className="result-grid">
            <article className="result-card">
              <span>Startup Idea</span>
              <strong>{value(startup.startupIdea)}</strong>
            </article>
            <article className="result-card">
              <span>Location</span>
              <strong>{value(startup.location)}</strong>
            </article>
            <article className="result-card">
              <span>Budget</span>
              <strong>{value(startup.budget)}</strong>
            </article>
            <article className="result-card">
              <span>Sector</span>
              <strong>{value(startup.sector)}</strong>
            </article>
            <article className="result-card">
              <span>Founder Experience</span>
              <strong>
                {startup.founderExperienceYears == null
                  ? "Not available"
                  : `${startup.founderExperienceYears} years`}
              </strong>
            </article>
            <article className="result-card">
              <span>Team Size</span>
              <strong>{value(startup.teamSize)}</strong>
            </article>
            <article className="result-card">
              <span>Founder Background</span>
              <strong>{value(startup.founderBackground)}</strong>
            </article>
          </div>
        </section>

                        
<section className="result-section">
  <h2>📊 Success Prediction</h2>

  <div className="prediction-layout">
    <article className="result-card prediction-chart-card">
      <h3>Success Probability</h3>

      <div className="prediction-chart">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={[
                {
                  name: "Success Probability",
                  value: Math.min(
                    100,
                    Math.max(
                      0,
                      Number(
                        result.prediction?.prediction
                          ?.successProbability ?? 0
                      )
                    )
                  ),
                },
                {
                  name: "Remaining",
                  value:
                    100 -
                    Math.min(
                      100,
                      Math.max(
                        0,
                        Number(
                          result.prediction?.prediction
                            ?.successProbability ?? 0
                        )
                      )
                    ),
                },
              ]}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius="72%"
              outerRadius="92%"
              startAngle={90}
              endAngle={-270}
              paddingAngle={2}
              stroke="none"
            >
              <Cell fill="#2563eb" />
              <Cell fill="#e2e8f0" />
            </Pie>

            <Tooltip
                formatter={(value) => `${Number(value).toFixed(1)}%`}
            />
          </PieChart>
        </ResponsiveContainer>

        <div className="prediction-chart-center">
          <strong>
            {result.prediction?.prediction?.successProbability == null
              ? "N/A"
              : `${result.prediction.prediction.successProbability}%`}
          </strong>
          <span>Success Probability</span>
        </div>
      </div>

      <p className="prediction-caption">
        Estimated probability based on the prediction model.
      </p>
    </article>

    <article className="result-card prediction-risk-card">
      <span>Startup Risk Level</span>

      <strong
        className={`risk-badge ${
          String(
            result.prediction?.prediction?.riskLevel ?? ""
          ).toLowerCase() === "low"
            ? "risk-low"
            : String(
                result.prediction?.prediction?.riskLevel ?? ""
              ).toLowerCase() === "medium"
            ? "risk-medium"
            : "risk-high"
        }`}
      >
        {value(result.prediction?.prediction?.riskLevel)}
      </strong>

      <div className="prediction-divider" />

      <span>Prediction Status</span>
      <strong>{value(result.prediction?.status)}</strong>

      <p className="prediction-caption">
        Risk level is provided by your backend prediction model.
      </p>
    </article>
  </div>
</section>


        <section className="result-section">
          <h2>📈 Market Research</h2>
          <div className="result-grid">
            <article className="result-card">
              <span>Competition</span>
              <strong>{value(market.competition)}</strong>
            </article>
            <article className="result-card">
              <span>Demand</span>
              <strong>{value(market.demand)}</strong>
            </article>
            <article className="result-card">
              <span>Growth Rate</span>
              <strong>{value(market.growth_rate)}</strong>
            </article>
            <article className="result-card">
              <span>Market Size (Billion)</span>
              <strong>{value(market.market_size_billion)}</strong>
            </article>
            <article className="result-card">
              <span>Target Users</span>
              <strong>{value(market.target_users)}</strong>
            </article>
          </div>
        </section>

        <section className="result-section">
          <h2>💰 Funding Research</h2>
          <div className="result-grid">
            <article className="result-card">
              <span>Funding Required</span>
              <strong>{value(funding.funding_required)}</strong>
            </article>
            <article className="result-card">
              <span>Funding Stage</span>
              <strong>{value(funding.funding_stage)}</strong>
            </article>
            <article className="result-card">
              <span>Potential Investors</span>
              <strong>{value(funding.investors)}</strong>
            </article>
            <article className="result-card">
              <span>Grants</span>
              <strong>{value(funding.grants)}</strong>
            </article>
            <article className="result-card">
              <span>Runway</span>
              <strong>{value(funding.runway)}</strong>
            </article>
          </div>
        </section>

        <section className="result-section">
          <h2>⚖️ Legal Research</h2>
          {legal.error ? (
            <div className="result-error">
              <strong>Legal Agent is temporarily unavailable</strong>
              <p>{legal.error}</p>
              <p>{value(legal.details)}</p>
              <small>
                Other available results are still displayed above.
              </small>
            </div>
          ) : (
            <div className="result-card">
              <strong>
                {value(legal.summary || legal.details)}
              </strong>
            </div>
          )}
        </section>

        <div className="result-actions">
          <button onClick={() => navigate("/NewAnalysis")}>
            + New Analysis
          </button>
          <button
            className="secondary-button"
            onClick={() => navigate("/")}
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}

export default AnalysisResult;
