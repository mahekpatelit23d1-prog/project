# API Requirements

## 1. Purpose

This document defines the API requirements for the AI-Powered Multi-Agent Startup Assistant with Prediction Model.

The API allows the frontend, backend, AI agents, and machine-learning prediction service to communicate using structured JSON data.

The exact implementation may be adjusted by the development team, but all services should follow consistent field names, data types, units, and response structures.

## 2. Overall API Architecture

The system should use the main backend as the central API for the frontend.

The recommended communication flow is:

                    Frontend
                       |
            | POST /api/startup/analyze
                       v
                 Main Backend
                       |
            +----------------------+
            |                      |
            v                      v
     AI Research Service    ML Prediction Service
            |                      |
            v                      v
      AI Research Result     ML Prediction Result
            |                      |
            +----------+-----------+
                       |
                       v
                 Main Backend
                       |
                       v
                    Frontend


The frontend should normally communicate with the **main backend only**.

The main backend is responsible for coordinating the AI research and ML prediction services.

# 3. Main Backend Endpoint

## Endpoint

    POST /api/startup/analyze

## Purpose

This is the main endpoint used by the frontend to request a complete startup analysis.

The backend receives the startup information, sends the appropriate information to the AI research service and ML prediction service, combines their results, and returns the final analysis to the frontend.

## 4. Main Backend Request

### Method

    POST

### Endpoint

    /api/startup/analyze


### Request Content-Type

    application/json


### Request JSON

JSON

    {
    "startupIdea": "AI healthcare app",
    "location": "Ahmedabad, Gujarat",
    "budget": 1000000,
    "founderExperienceYears": 5,
    "teamSize": 8,
    "sector": "AI",
    "founderBackground": "first_time"
    }


## 5. Main Request Fields

|           Field          |  Type   |   Source   |              Description                        |

| `startupIdea`            | String  | User input | Description of the startup idea                 |
| `location`               | String  | User input | Intended startup location                       |
| `budget`                 | Numeric | User input | Available startup budget                        |
| `founderExperienceYears` | Numeric | User input | Founder experience in years                     |
| `teamSize`               | Numeric | User input | Number of team members                          |
| `sector`                 | String  | User input | Startup sector selected from allowed values     |
| `founderBackground`      | String  | User input | Founder background selected from allowed values |


## 6. Sector Validation

The `sector` field must be limited to the values available in the dataset.

Allowed values are:

    Health
    Fintech
    SaaS
    Ecommerce
    Climate
    Crypto
    AI


The frontend should use a dropdown or another restricted selection method rather than allowing arbitrary sector values.

The backend should also validate the value.

## 7. Founder Background Validation

The `founderBackground` field must be limited to the values available in the dataset.

Allowed values are:

    academic
    first_time
    ex_bigtech
    serial_founder


The frontend should use a dropdown or restricted selection method.

The backend should validate the value before sending the information to the ML service.

# 8. AI Research Service

## Endpoint

    POST /research

## Purpose

The AI research service uses three specialized AI agents:

1. Market Research Agent

    Market size and growth

    Competition

    Customer demand

    Industry trends

    Market opportunities and challenges

2. Legal Agent

    Business registration requirements

    Relevant licenses and permits

    Sector-specific regulations

    Official legal and regulatory resources

3. Funding Agent

    Government funding schemes and grants

    Incubators and startup support programs

    Eligibility criteria

    Application requirements and deadlines, where available

## 9. AI Research Request

The main backend should send the following information to the AI research service:

JSON

    {
    "startupIdea": "AI healthcare app",
    "location": "Ahmedabad, Gujarat",
    "budget": 1000000,
    "sector": "AI"
    }


The AI research service does not need to receive ML-specific fields such as founder experience or team size unless the implementation requires them.

# 10. AI Research Response

The AI research service should return structured JSON.

Example:

JSON

    {
    "marketResearch": {
        "summary": "Market size, trends, customers, and competitors",
        "sources": []
    },
    "legal": {
        "summary": "Relevant legal and regulatory information",
        "sources": []
    },
    "funding": {
        "summary": "Potential funding opportunities",
        "sources": []
    }
    }


# 11. Market Size Unit

The market size returned by the AI research service must use **billions of dollars**.

For example:

    $25 billion → 25
    $100 billion → 100


The value must not be passed as the full dollar amount.

For example, this is incorrect for the ML input: 25000000000


The corresponding ML value should be: 25


The field name should remain:

    marketSizeBillion


This value will later be mapped to the ML feature:

    market_size_billion


# 12. ML Prediction Service

## Endpoint


    POST /predict

## Purpose

The ML prediction service predicts the probability of startup success using the features from the project dataset.

The model uses:

1. Founder experience
2. Team size
3. Market size
4. Sector
5. Founder background

# 13. ML Prediction Request

Example:

JSON

    {
    "founderExperienceYears": 5,
    "teamSize": 8,
    "marketSizeBillion": 35,
    "sector": "AI",
    "founderBackground": "first_time"
    }


The values must correspond to the features used to train the ML model.

# 14. ML Prediction Response

Example:

JSON

    {
    "successProbability": 72.4,
    "success": 1,
    "riskLevel": "Medium"
    }


Where:

* `successProbability` is the predicted probability of success.
* `success` is the predicted binary result.
* `riskLevel` is an application-level interpretation of the prediction.

The exact risk-level thresholds should be defined by the development team and documented before final implementation.

# 15. Main Backend Processing Sequence

The recommended processing sequence is:

### Step 1 — Receive user request

The frontend sends startup information to:

    POST /api/startup/analyze


### Step 2 — Validate input

The backend validates:

* Required fields
* Numeric fields
* Team size
* Founder experience
* Budget
* Sector
* Founder background

### Step 3 — Send research request

The backend sends the relevant startup information to:

    POST /research


### Step 4 — Receive AI research

The AI research service returns results from:

    Market Research Agent

    Legal Agent

    Funding Agent

### Step 5 — Obtain market size

The backend takes the researched:

    marketSizeBillion


value and prepares it for the ML prediction service.

### Step 6 — Send ML request

The backend sends:

    founderExperienceYears
    teamSize
    marketSizeBillion
    sector
    founderBackground


to:
    POST /predict


### Step 7 — Receive ML prediction

The ML service returns:

    successProbability
    success
    riskLevel


### Step 8 — Combine results

The backend combines the AI research and ML prediction results.

### Step 9 — Return final result

The backend returns the complete analysis to the frontend.


# 16. Example Final Backend Response

Example:

JSON

        {
        "startup": {
            "idea": "AI healthcare app",
            "location": "Ahmedabad, Gujarat",
            "sector": "AI"
        },
        "market": {
            "marketSizeBillion": 35,
            "marketGrowth": "14%",
            "opportunity": "High"
        },
        "agents": {
            "marketResearch": {
            "summary": "Market research findings",
            "sources": []
        },
        "legal": {
            "summary": "Legal and regulatory findings",
            "sources": []
        },
        "funding": {
            "summary": "Funding opportunities",
            "sources": []
        }
        "prediction": {
            "successProbability": 72.4,
            "success": 1,
            "riskLevel": "Medium"
        }
        }


# 17. Validation Errors

The API should return a clear error response when input is invalid.

Example:

JSON

    {
    "error": "Invalid sector",
    "message": "Sector must be one of: Health, Fintech, SaaS, Ecommerce, Climate, Crypto, AI"
    }


Another example:

JSON

    {
    "error": "Invalid input",
    "message": "Founder experience and team size must be numeric values."
    }


# 18. Missing Research Information

If an AI agent cannot find reliable information, the system should not invent a value.

Example:

JSON

    {
    "status": "insufficient_data",
    "message": "Reliable market-size information could not be confirmed."
    }


The backend should handle this situation appropriately.

# 19. API Field Consistency

The same field names should be used consistently across services.

For example:

    founderExperienceYears
    teamSize
    marketSizeBillion
    sector
    founderBackground


The ML model may internally use dataset column names such as:

    founder_experience_years
    team_size
    market_size_billion
    founder_background


The API layer can map the API field names to the internal dataset/model names.


# 20. AI Research and ML Separation

The AI research service and ML prediction service have different responsibilities.

### AI Research

The three agents provide:

Market Research Agent: Market size, growth, competition, customer demand, and industry trends.

Legal Agent: Relevant legal requirements, regulations, and official resources.

Funding Agent: Potential funding schemes, grants, eligibility, and application information.


### ML Model

Uses the project's training dataset to predict:

    Startup success probability


The ML model should not be retrained every time a user requests an analysis.


# 21. Frontend Communication

The frontend should normally call:

    POST /api/startup/analyze


rather than directly calling the AI or ML services.

This keeps the architecture organized:

                Frontend
                   ↓
              Main Backend
                   ↓
        AI Service + ML Service


The exact service URLs may be configured differently during development.


# 22. Responsibilities

### Member 1 — Frontend

* Build the startup input form.
* Use dropdowns for sector and founder background.
* Send the request to the main backend.
* Display the final analysis.

### Member 2 — Backend

* Implement the main API.
* Validate requests.
* Coordinate AI and ML services.
* Combine responses.
* Return the final result.

### Member 3 — AI Agents

* Implement the Market Research Agent, Legal Agent, and Funding Agent.

* Implement or coordinate the AI research service.

* Return structured research results and source links where available.

### Member 4 — ML

* Train and evaluate the prediction model.
* Save the trained model and preprocessing components.
* Implement the prediction service.
* Return prediction results.

### Member 5 — Research

* Define API requirements.
* Document API contracts.
* Maintain consistency between the research requirements, AI agents, ML model, and backend.
* Support integration testing and final documentation.


# 23. Important Integration Rule

The exact endpoint names and service URLs may be adjusted by Members 2, 3, and 4 during implementation.

However, the **request and response fields should remain consistent** unless the team agrees on a documented change.

This prevents integration problems between the frontend, backend, AI agents, and ML model.


# 24. Overall API Flow

                        User
                         ↓
                      Frontend
                         ↓
              POST /api/startup/analyze
                         ↓
                   Main Backend
                         ↓
               ├── POST /research
               │         ↓
               │   Three AI Agents
               │         ↓
               │   Research Result
               │
               └── POST /predict
                         ↓
                     ML Model
                         ↓
                  Prediction Result
                         ↓
            Main Backend combines results
                         ↓
               Final Startup Analysis
                         ↓
                      Frontend
                         ↓
                        User


# 25. Final Requirement

The API system must provide a clear and reliable connection between the frontend, backend, AI agents, and ML prediction model.

The API should use:

* JSON request and response formats
* Consistent field names
* Input validation
* Clear error messages
* Market size values in billions
* A main backend endpoint for frontend communication
* Separate services for AI research and ML prediction
* Structured combined results
