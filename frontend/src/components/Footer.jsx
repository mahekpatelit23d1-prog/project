function Footer() {
  return (
    <footer className="footer">

      <button
        className="back-top"
        onClick={() =>
          window.scrollTo({
            top: 0,
            behavior: "smooth"
          })
        }
      >
        Back to top ↑
      </button>

      <div className="footer-main">

        <div className="footer-container">

          {/* Explore StartupAI */}
          <div className="footer-column">

            <h4>Explore StartupAI</h4>

            <p>Home</p>
            <p>New Analysis</p>
            <p>History</p>
            <p>AI Agents</p>

          </div>


          {/* AI Analysis */}
          <div className="footer-column">

            <h4>AI Analysis</h4>

            <p>Market Research</p>
            <p>Legal Analysis</p>
            <p>Funding Opportunities</p>

          </div>


          {/* For Startup Founders */}
          <div className="footer-column">

            <h4>For Startup Founders</h4>

            <p>Analyze Your Startup</p>
            <p>Market Insights</p>
            <p>Business Risks</p>
            <p>Funding Insights</p>
            <p>ML Prediction</p>

          </div>


          {/* Resources & Help */}
          <div className="footer-column">

            <h4>Resources & Help</h4>

            <p>How It Works</p>
            <p>Input Guide</p>
            <p>Contact Us</p>

          </div>

        </div>

      </div>


      <div className="footer-bottom">

        <div className="footer-brand">
          <span>✦</span> StartupAI
        </div>

        <p>
          AI-Powered Startup Intelligence
        </p>

        <p>
          © 2026 StartupAI. All rights reserved.
        </p>

      </div>

    </footer>
  );
}

export default Footer;