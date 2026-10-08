import { useNavigate } from "react-router-dom";

function History() {

  const navigate = useNavigate();

  return (
    <main className="basic-page">

      <div className="basic-card">

        <div className="mini-logo">
          <span>✦</span> StartupAI
        </div>

        <p className="section-label">
          HISTORY
        </p>

        <h1>
          Your Analysis History
        </h1>

        <p>
          Your previous startup analyses will appear here
          once analysis and backend services are connected.
        </p>

        <div className="empty-history">

          <div className="empty-icon">
            ◷
          </div>

          <h3>
            No analyses yet
          </h3>

          <p>
            Start your first startup analysis to see your
            results here.
          </p>

          <button
            className="primary-btn"
            onClick={() => navigate("/NewAnalysis")}
          >
            Start New Analysis →
          </button>

        </div>

      </div>

    </main>
  );
}

export default History;