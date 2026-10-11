# Project Requirements

## 1. Project Title

AI-Powered Multi-Agent Startup Assistant with Prediction Model

## 2. Project Objective

The system is designed to help a user evaluate a startup idea by combining:

1. User-provided startup information
2. Current information researched by AI agents
3. A machine learning prediction model
4. A final combined startup analysis

The system should provide the user with a structured startup evaluation rather than relying only on the machine learning prediction.

## 3. Main System Workflow

The expected workflow is:

User
↓
Frontend
↓
Main Backend
↓
AI Agent Service + Prediction Model
↓
Backend combines results
↓
Final Startup Analysis
↓
Frontend displays results

## 4. User Inputs

The frontend should collect the following information from the user.


### 4.1 Startup Idea

The user should enter a description of their startup idea.

Example:

"An AI-powered healthcare application for small clinics."

This information is primarily used by the AI research agents.


### 4.2 Location

The user should provide the intended startup location.

Example:

"Ahmedabad, Gujarat, India"

Location is not currently included in the machine learning dataset.

It should be used by the AI agents to evaluate location-related feasibility.



### 4.3 Startup Budget

The user should provide the approximate available startup budget.

Example:

"₹10,00,000"

Startup budget is not currently included in the machine learning dataset.

It should be used by the AI agents to evaluate budget feasibility.



### 4.4 Founder Experience

The user should provide the founder's experience in years.

This corresponds to:

`founder_experience_years`

The value must be numeric.



### 4.5 Team Size

The user should provide the number of startup team members.

This corresponds to:

`team_size`

The value must be numeric.



### 4.6 Sector

The user must select one sector from the predefined dataset categories.

Allowed values:

- Health
- Fintech
- SaaS
- Ecommerce
- Climate
- Crypto
- AI

The frontend should use a dropdown/select control.

The user should not be allowed to enter arbitrary sector names.



### 4.7 Founder Background

The user must select one founder background category.

Allowed values:

- academic
- first_time
- ex_bigtech
- serial_founder

The frontend should use a dropdown/select control.





## 5. Information That Should Be Researched by AI Agents

The following information should not be manually entered by the user.

AI agents should research:

- Current market size
- Market growth
- Competition
- Customer demand
- Industry trends
- Location feasibility
- Budget feasibility

The market research agent should provide market size in billions because the prediction dataset uses:

`market_size_billion`





## 6. AI Agent Responsibilities

The project contains five AI agents.

### Agent 1 — Market Research Agent

Responsibilities:

- Research current market size
- Research market growth
- Identify market opportunity
- Identify relevant market trends
- Provide sources for important market information

Important output:

`market_size_billion`

### Agent 2 — Legal Agent

Responsibilities:

- Identifies relevant business registration requirements, licenses, regulations, and official legal resources based on the startup's sector and location.


### Agent 3 — Funding Agent

Responsibilities:

- Identifies relevant grants 
- government funding schemes, incubators, and other funding opportunities 
- including eligibility criteria and application deadlines where available.


## 7. Machine Learning Prediction

The machine learning model is trained using the project dataset.

The current prediction features are:

1. `founder_experience_years`
2. `team_size`
3. `market_size_billion`
4. `sector`
5. `founder_background`

The target variable is:

`Success`

Possible target values:

- `0` = Not successful
- `1` = Successful

## 8. Important Separation Between AI Research and ML Prediction

AI agents and the machine learning model have different responsibilities.

### AI agents

AI agents research current external information such as:

- Market size
- Market growth
- Competition
- Customer demand
- Industry trends
- Location feasibility
- Budget feasibility

### Machine learning model

The machine learning model predicts startup success using the features on which it was trained.

The AI agents should not automatically retrain the machine learning model after every research request.


## 9. Market Size Data Format

The prediction dataset uses:

`market_size_billion`

Therefore, the AI market research agent must provide market size in billions.

Example:

If research finds:

$25 billion

The value supplied to the prediction model should be:

`25`

It should not be supplied as:

`25,000,000,000`

The unit must remain consistent throughout the system.


## 10. Fields Not Currently in the ML Dataset

The following fields are user inputs or AI-researched information but are not currently ML features:

- Startup idea
- Location
- Startup budget
- Market growth
- Competition
- Customer demand
- Industry trends

These should not be added to the ML model unless the dataset is intentionally changed and the model is retrained and validated.


## 11. AI Research Output

The AI service should return structured information containing the results of the five agents.

Example:

{
  "market": {
    "marketSizeBillion": 25,
    "marketGrowth": "14%",
    "opportunity": "High"
  },
  "competition": {
    "level": "High"
  },
  "customerDemand": {
    "level": "High"
  },
  "industryTrends": {
    "assessment": "Positive"
  },
  "feasibility": {
    "budget": "Medium",
    "location": "Good"
  }
}

The exact API structure can be finalized by Members 2 and 3.

## 12. Final System Analysis

The final result should combine three types of information.

User Information
Startup idea
Location
Startup budget
Founder experience
Team size
Sector
Founder background
AI Research
Market size
Market growth
Competition
Customer demand
Industry trends
Location feasibility
Budget feasibility
ML Prediction
Success prediction
Success probability, if available

The frontend should display these results clearly.

## 13. Data Validation Requirements

The system should validate that:

Founder experience is numeric.
Team size is numeric.
Startup budget is valid and positive.
Startup idea is not empty.
Location is not empty.
Sector is one of the seven allowed values.
Founder background is one of the four allowed values.
Market size is numeric.
Market size uses billions as its unit.

Invalid input should produce a clear error message instead of causing the application to fail.

## 14. Research Source Requirements

AI-generated research should use reliable and relevant sources whenever external information is available.

Preferred sources include:

Government or official organizations
Industry reports
Reputable research organizations
Official company sources where appropriate
Reliable business and news publications

Important research claims should be traceable to their sources.

## 15. System Quality Requirements

The final system should be:

Easy to use
Clear
Consistent
Validated
Explainable
Modular
Testable

The system should clearly distinguish between:

User-provided information
AI-researched information
Machine-learning prediction

## 16. Team Responsibilities

Member 1 — Frontend

    Responsible for:

    User interface
    Input forms
    Dropdowns
    Loading states
    Results display
    Frontend-backend integration

Member 2 — Backend

    Responsible for:

    Main backend API
    Receiving frontend requests
    Calling AI-agent service
    Calling prediction service
    Combining responses
    Returning final results

Member 3 — AI Agents

    Responsible for:

    Five AI agents
    External research
    Structured AI outputs
    Source handling
    AI-agent service/API

Member 4 — Prediction Model

    Responsible for:

    Dataset preprocessing
    Model training
    Model evaluation
    Model selection
    Prediction service/API

Member 5 — Research

    Responsible for:

    Requirements
    Dataset documentation
    AI-agent requirements
    API requirements
    Test cases
    Research sources
    Validation
    Integration testing
    Project documentation
    Final report support

## 17. Project Constraint

The current ML dataset should remain unchanged unless the team intentionally decides to create and validate a new dataset/model version.

The seven sector categories and four founder-background categories should remain aligned with the dataset.

## 18. Overall System Workflow

The expected workflow is:

                       User

                        ↓

                     Frontend

                        ↓

                   Main Backend

                        ↓

        AI Agent Service + Prediction Model

                        ↓

              Backend combines results

                        ↓

             Final Startup Analysis

                        ↓

             Frontend displays results



## 19. Final Goal

The completed system should allow a user to submit startup information once.

The backend should coordinate the five AI agents and the prediction model and return one combined startup analysis.

The user should not need to manually research and enter market size, competition, customer demand, or industry trends.