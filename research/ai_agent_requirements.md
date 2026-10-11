# AI Agent Requirements

## 1. Purpose

The AI agent component of the AI-Powered Multi-Agent Startup Assistant with Prediction Model provides startup-related research and guidance through three specialized AI agents: 

  1.Market Research Agent, 
  2.Legal Agent, and 
  3.Funding Agent.

Each agent has a specific responsibility and returns structured information that the backend can combine and display through the frontend.


# 2. Common Input to AI Agents

The AI-agent system should receive relevant information about the startup.

Common information may include:

* Startup idea
* Location
* Startup budget
* Founder experience
* Team size
* Sector
* Founder background

Not every agent needs to use every field.

The backend should provide each agent with the information relevant to its task.



# 3. Agent 1 — Market Research Agent

## 3.1 Purpose

The Market Research Agent analyzes the current market related to the startup idea and selected sector.

## 3.2 Main Responsibilities

The agent should research:

* Current market size
* Market growth
* Market trends
* Market opportunity
* Relevant market information

## 3.3 Important Output

The most important output for the prediction model is:

`market_size_billion`

The market size must be provided in billions.

For example:

If the researched market size is $25 billion:

JSON

{
  "marketSizeBillion": 25
}


The value should not be represented as:

        TEXT
        25,000,000,000


## 3.4 Other Expected Output

Example:

JSON

{
  "market": {
    "marketSizeBillion": 25,
    "marketGrowth": "14%",
    "opportunity": "High"
  }
}


## 3.5 Sources

The agent should provide sources for important market claims whenever possible.

Preferred sources include:

* Government organizations
* Industry research organizations
* Reputable market research sources
* Official company sources
* Reliable business publications


# 4. Agent 2 — Legal Agent

## 4.1 Purpose

To identify potentially relevant legal, registration, licensing, and regulatory requirements for the proposed startup.

## 4.2 Main Responsibilities

  The agent should:

  Identify business registration requirements that may apply.

  Research licenses, permits, and regulations relevant to the startup's sector and location.

  Identify possible compliance obligations.

  Prefer official government and regulatory sources.

  Provide source links and research dates where available.

  Flag uncertain requirements that need confirmation.

  Explain that the output is general information, not a substitute for professional legal advice.

## 4.3 Expected output

  Potential registration requirements.

  Relevant licenses or permits.

  Applicable regulatory considerations.

  Compliance checklist.

  Official sources and research dates.

  Uncertainties or items requiring professional confirmation.




# 5. Agent 3 — Funding Agent

## 5.1 Purpose

To research possible funding opportunities suitable for the proposed startup.

## 5.2 Main Responsibilities

The agent should:

* Research relevant government funding schemes and grants.
* Identify relevant startup incubators, accelerators, and funding programs.
* Summarize eligibility requirements.
* Identify application deadlines where officially available.
* Consider the startup's location, sector, and stated budget when relevant.
* Prefer official scheme pages and funding-provider sources.
* Provide source links and research dates where available.
* Never guarantee funding approval or eligibility without verification.

## 5.3 Expected output:

Potential funding programs.

Funding type and amount, when confirmed by a source.

Eligibility criteria.

Application process and deadlines, where available.

Official sources and research dates.

Important limitations or eligibility uncertainties.

# 6.Common Inputs

The agents may use the following information as relevant to their responsibilities:

Startup idea.
Startup location.
Startup budget.
Startup sector.

Other relevant information supplied by the user.

The Market Research Agent may also provide market-size information to the machine-learning prediction service if the value is validated and converted into the required unit.

# 7. Source and Reliability Requirements

Prefer official, authoritative, and recent sources.
Include source names and URLs where available.
Record the date of research.
Do not invent sources, legal requirements, funding amounts, or deadlines.
Clearly identify conflicting, outdated, or insufficient information.
Distinguish source-supported facts from AI interpretation.

If reliable information cannot be found, return an insufficient-data message instead of inventing an answer.

# 8. Structured Output Requirements

Each agent should return structured output that the backend can process consistently.

A recommended general structure is:

{
"agent": "Market Research Agent",
"status": "success",
"summary": "Summary of findings",
"findings": [],
"sources": [],
"researchDate": "YYYY-MM-DD"
}

The agent name, findings, and summary should match the agent's actual responsibility. The status should indicate whether useful results were obtained.

For unsuccessful research, a response may use the following structure:

{
"agent": "Funding Agent",
"status": "insufficient_data",
"summary": "Reliable funding information could not be confirmed.",
"findings": [],
"sources": []
}

These are recommended output formats. The final field names must be coordinated with the backend developer and match the actual implementation.

# 9. Error Handling

The agents should handle situations such as:
No reliable source found.
Conflicting information.
Unavailable research services.
Invalid or incomplete input.
Outdated information.
No relevant funding opportunities identified.

Errors should be communicated clearly and should not cause the entire application to fail unnecessarily.

# 10. Relationship Between AI Agents and the ML Model

The AI agents research current market, legal, and funding information.

The machine-learning model predicts startup success using the five features defined in the project's dataset:

          founder_experience_years

          team_size

          market_size_billion

          sector

          founder_background

The target variable is Success.

Legal information and funding opportunities are not currently ML model features. They must not be added to the prediction input unless the dataset and model are deliberately updated and retrained.

Market size must be provided in billions to the ML model. For example, a market size of USD 25 billion should be represented as 25, not 25000000000.

The system must not automatically retrain the ML model whenever an AI agent finds new information.

# 11.Integration Requirements

The backend coordinates calls to the three agents.
Each agent returns data in a predictable structure.
The backend combines the agent results for the frontend.
Errors from one agent should be handled and reported appropriately.
The actual endpoint names and response fields must match the backend implementation.
The frontend should display market research, legal guidance, and funding opportunities separately.

# 12.Responsibilities

AI Agent Developer — Member 3
Implements the three agents.
Integrates research services and source retrieval.
Produces structured outputs.
Handles failures and insufficient data.
Coordinates response formats with the backend developer.
Research and Documentation — Member 5
Documents agent responsibilities and requirements.
Checks source-quality requirements.
Maintains consistency across project documentation.
Helps prepare test cases and the final project report.

# 13.Expected Outcome

The AI agent component should provide a combined preliminary startup assessment consisting of market research, legal guidance, and potential funding opportunities. Results must include appropriate source information where available and clearly communicate uncertainty.

The system is a decision-support tool. It does not guarantee business success, legal compliance, or funding approval.