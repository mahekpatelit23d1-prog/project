function Agents() {
  const agents = [
  {
    number: "01",
    icon: "◈",
    title: "Market Agent",
    description:
      "Analyzes market demand, target customers, market size, customer needs, trends and growth opportunities.",
  },
  {
    number: "02",
    icon: "◇",
    title: "Legal Agent",
    description:
      "Analyzes legal requirements, regulations, compliance, licenses, intellectual property and potential legal risks for the startup.",
  },
  {
    number: "03",
    icon: "◆",
    title: "Funding Agent",
    description:
      "Analyzes suitable investors, grants, government schemes, accelerators and other funding opportunities.",
  },
];

  return (
    <section className="agents-section" id="agents">
      <div className="section-container">

        <div className="section-heading">

          <p className="section-label">
            THREE AI AGENTS
          </p>

          <h2>
            One Startup.
            <br />
            <span>Three Intelligent Perspectives.</span>
          </h2>

          <p>
            Our multi-agent system examines your startup from
            different perspectives to create a complete
            understanding of your business opportunity.
          </p>

        </div>

        <div className="agents-grid">

          {agents.map((agent) => (
            <div
              className="agent-card"
              key={agent.number}
            >

              <div className="agent-top">
                <span className="agent-number">
                  {agent.number}
                </span>

                <span className="agent-icon">
                  {agent.icon}
                </span>
              </div>

              <h3>{agent.title}</h3>

              <p>{agent.description}</p>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
}

export default Agents;