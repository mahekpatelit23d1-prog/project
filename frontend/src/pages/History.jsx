import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = "http://127.0.0.1:5000";

function History() {
  const navigate = useNavigate();

  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [retryCount, setRetryCount] = useState(0);

  const fetchHistory = useCallback(
    async (signal) => {
      const token = localStorage.getItem("access_token");

      if (!token) {
        setLoading(false);

        navigate("/login", {
          replace: true,
          state: { from: "/history" },
        });

        return;
      }

      try {
        setLoading(true);
        setError("");

        const response = await fetch(`${API_BASE_URL}/api/history`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
          signal,
        });

        const data = await response.json().catch(() => ({}));

        if (response.status === 401 || response.status === 403) {
          localStorage.removeItem("access_token");
          localStorage.removeItem("current_user");

          navigate("/login", {
            replace: true,
            state: { from: "/history" },
          });

          return;
        }

        if (!response.ok) {
          const message =
            typeof data.detail === "string"
              ? data.detail
              : typeof data.message === "string"
                ? data.message
                : "Unable to load your analysis history.";

          throw new Error(message);
        }

        if (!Array.isArray(data.history)) {
          throw new Error("The history response format is invalid.");
        }

        setHistory(data.history);
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error("History API error:", err);

          setError(
            err.message || "Unable to connect to the backend. Please try again."
          );
        }
      } finally {
        if (!signal.aborted) {
          setLoading(false);
        }
      }
    },
    [navigate]
  );

  useEffect(() => {
    const controller = new AbortController();

    fetchHistory(controller.signal);

    return () => controller.abort();
  }, [fetchHistory, retryCount]);

  const formatDate = (dateString) => {
    if (!dateString) return "Date unavailable";

    const date = new Date(dateString);

    return Number.isNaN(date.getTime())
      ? "Date unavailable"
      : date.toLocaleString();
  };

  const formatValue = (value) => {
    if (value === null || value === undefined || value === "") {
      return "Not specified";
    }

    return typeof value === "object"
      ? JSON.stringify(value)
      : String(value);
  };

  const openAnalysis = (item) => {
    navigate("/analysis-result", {
      state: { result: item },
    });
  };

  return (
    <main className="basic-page">
      <div className="basic-card">
        <div className="mini-logo">
          <span>✦</span> StartupAI
        </div>

        <p className="section-label">HISTORY</p>
        <h1>Your Analysis History</h1>

        <p>
          View your previous startup analyses and revisit your startup
          research.
        </p>

        {loading && (
          <div className="empty-history" role="status">
            <h3>Loading your history...</h3>
            <p>Please wait while we retrieve your analyses.</p>
          </div>
        )}

        {!loading && error && (
          <div className="empty-history" role="alert">
            <div className="empty-icon">!</div>
            <h3>Unable to load history</h3>
            <p>{error}</p>

            <button
              type="button"
              className="primary-btn"
              onClick={() => setRetryCount((number) => number + 1)}
            >
              Try Again
            </button>
          </div>
        )}

        {!loading && !error && history.length === 0 && (
          <div className="empty-history">
            <div className="empty-icon">◷</div>
            <h3>No analyses yet</h3>

            <p>
              Start your first startup analysis to see your results here.
            </p>

            <button
              type="button"
              className="primary-btn"
              onClick={() => navigate("/NewAnalysis")}
            >
              Start New Analysis →
            </button>
          </div>
        )}

        {!loading && !error && history.length > 0 && (
          <div className="history-list">
            <p>
              You have {history.length} saved{" "}
              {history.length === 1 ? "analysis" : "analyses"}.
            </p>

            {history.map((item, index) => {
              const startup = item.startup || {};

              return (
                <article
                  className="history-item"
                  key={
                    item.id ??
                    `${item.createdAt || "analysis"}-${index}`
                  }
                >
                  <h3>
                    {startup.name ||
                      startup.startupName ||
                      "Startup Analysis"}
                  </h3>

                  <p>
                    {startup.idea ||
                      startup.startupIdea ||
                      "No startup idea available."}
                  </p>

                  <div className="history-details">
                    <p>
                      <strong>Sector:</strong>{" "}
                      {formatValue(startup.sector)}
                    </p>

                    <p>
                      <strong>Location:</strong>{" "}
                      {formatValue(startup.location)}
                    </p>

                    <p>
                      <strong>Budget:</strong>{" "}
                      {formatValue(startup.budget)}
                    </p>

                    <p>
                      <strong>Analysis date:</strong>{" "}
                      {formatDate(item.createdAt)}
                    </p>

                    <p>
                      <strong>Status:</strong>{" "}
                      {formatValue(item.status)}
                    </p>
                  </div>

                  <div className="history-actions">
                    <button
                      type="button"
                      className="primary-btn"
                      onClick={() => openAnalysis(item)}
                    >
                      View Analysis →
                    </button>
                  </div>
                </article>
              );
            })}

            <div className="history-actions">
              <button
                type="button"
                className="primary-btn"
                onClick={() => navigate("/NewAnalysis")}
              >
                Start New Analysis →
              </button>

              <button
                type="button"
                className="secondary-btn"
                onClick={() => navigate("/")}
              >
                ← Back to Home
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

export default History;