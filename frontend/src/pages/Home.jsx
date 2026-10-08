import Hero from "../components/Hero";
import Agents from "../components/Agents";
import HowItWorks from "../components/HowItWorks";
import Footer from "../components/Footer";

function Home() {
  return (
    <>
      <main>

        <Hero />

        <section className="why-section">
          <div className="section-container">

            <div className="section-heading center-heading">

              <p className="section-label">
                WHY STARTUPAI
              </p>

              <h2>
                Understand Your Startup
                <br />
                <span>Before You Build It.</span>
              </h2>

              <p>
                StartupAI brings market research, competitor
                intelligence, industry trends, risk analysis,
                funding opportunities and machine learning
                together in one platform.
              </p>

            </div>

            <div className="why-grid">

              <div className="why-card">
                <span>01</span>

                <h3>
                  Research Driven
                </h3>

                <p>
                  Get structured insights across important
                  startup and business dimensions.
                </p>
              </div>

              <div className="why-card">
                <span>02</span>

                <h3>
                  Multi-Agent Intelligence
                </h3>

                <p>
                  Multiple specialized AI agents examine
                  different aspects of your startup.
                </p>
              </div>

              <div className="why-card">
                <span>03</span>

                <h3>
                  Prediction Ready
                </h3>

                <p>
                  Combine research insights with machine
                  learning-based startup prediction.
                </p>
              </div>

            </div>

          </div>
        </section>

        <Agents />

        <HowItWorks />

      </main>

      <Footer />
    </>
  );
}

export default Home;