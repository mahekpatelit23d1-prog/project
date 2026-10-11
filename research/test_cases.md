# Test Cases

## 1. Purpose

This document defines the test cases for the AI-Powered Multi-Agent Startup Assistant with Prediction Model.

The purpose of testing is to verify that:

* User inputs are handled correctly.
* Invalid inputs are rejected.
* AI agents return structured research results.
* The ML prediction service receives valid inputs.
* The ML model returns a prediction.
* The backend correctly combines AI and ML results.
* The frontend correctly displays the results.
* The complete system works together correctly.

# 2. Testing Approach

Testing will be performed at different levels:

        1. Input Validation Testing
                    ↓
         2. AI Agent Testing
                    ↓
         3. ML Model Testing
                    ↓
            4. API Testing
                    ↓
           5. Frontend Testing
                    ↓
          6. Integration Testing
                    ↓
          7. End-to-End Testing

# 3. Test Case Format

Each test case contains:
* Test Case ID
* Component
* Test Description
* Input
* Expected Result
* Priority

The actual test result can be added by the team during implementation.

# 4. Input Validation Test Cases

## TC-001 — Valid Startup Information

Component: Frontend / Backend
Test Description: Submit a startup analysis request with all valid fields.

Input:

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

Expected Result:
The request should pass validation and be sent for analysis.

Priority: High

## TC-002 — Empty Startup Idea

Component: Frontend
Test Description: Submit the form without entering a startup idea.

Expected Result:
The frontend should display a validation message and should not submit the request.

Example Message: Please enter your startup idea.

Priority: High

## TC-003 — Empty Location

Component: Frontend
Test Description: Submit the form without entering a location.

Expected Result:
The frontend should display a validation message.

Priority: High

## TC-004 — Invalid Budget

Component: Frontend / Backend
Test Description: Enter an invalid or negative budget.

Example Input: -100000

Expected Result:
The request should be rejected.

Priority: High

## TC-005 — Invalid Founder Experience

Component: Frontend / Backend
Test Description: Enter a non-numeric founder experience value.

Example Input: five years


Expected Result:
The request should be rejected with a clear validation message.

Priority: High

## TC-006 — Invalid Team Size

Component: Frontend / Backend
Test Description: Enter an invalid team size.

Example Input:-5


Expected Result:
The request should be rejected.

Priority: High

# 5. Sector Validation Test Cases

## TC-007 — Valid Sector

Component: Frontend / Backend
Test Description: Select a valid sector.

Example: AI

Expected Result:
The value should be accepted.

Priority: High

## TC-008 — Invalid Sector

Component: Backend
Test Description: Send a sector that is not part of the dataset.

Example: Agriculture


Expected Result:
The backend should reject the request.

Expected Message:

    Invalid sector.


Priority: High

## TC-009 — All Allowed Sectors

Component: Frontend / Backend
Test Description: Verify that every allowed sector can be selected.

Allowed Values:

    Health
    Fintech
    SaaS
    Ecommerce
    Climate
    Crypto
    AI

Expected Result:
Every allowed value should be accepted.

Priority: High

# 6. Founder Background Test Cases

## TC-010 — Valid Founder Background

Component: Frontend / Backend
Test Description: Select a valid founder background.

Example:

    first_time

Expected Result:
The value should be accepted.

Priority: High

## TC-011 — Invalid Founder Background

Component: Backend
Test Description: Send a founder background that is not in the dataset.

Example: business_owner


Expected Result:
The backend should reject the request.

Priority: High

## TC-012 — All Allowed Founder Backgrounds

Component: Frontend / Backend
Test Description: Verify that every allowed founder background can be selected.

Allowed Values:

    academic
    first_time
    ex_bigtech
    serial_founder

Expected Result:
Every allowed value should be accepted.

Priority: High

# 7. Market Size Test Cases

## TC-013 — Market Size in Billions

Component: AI Research / Backend / ML
Test Description: Verify that market size is represented in billions.

Example: 
Market size = $25 billion

Expected ML Value: 25

Expected Result:

The ML service should receive: marketSizeBillion = 25

Priority: Critical

## TC-014 — Incorrect Market Size Unit

Component: Backend / ML
Test Description: Verify that the full dollar amount is not incorrectly passed to the ML model.

Incorrect Example: 25000000000

Expected Result:

The system should convert or reject the value before it reaches the ML model.

Priority: Critical

## TC-015 — Missing Market Size Research

Component: AI Research / Backend
Test Description: Simulate a situation where reliable market-size information cannot be confirmed.

Expected Result:
The system should indicate insufficient data instead of inventing a market-size value.

Example:

JSON

    {
    "status": "insufficient_data",
    "message": "Reliable market-size information could not be confirmed."
    }

Priority: Critical

# 8. AI Agent Test Cases

## TC-016 — Market Research Agent

Component: AI Agent
Test Description: Verify that the Market Research Agent provides market-related information.

Expected Result:
The response should contain relevant market information such as:

* Market size
* Market growth
* Opportunity assessment

Priority: High

## TC-017 — Legal Agent

Component: AI Agent

Test Description: Verify that the Legal Agent identifies relevant business registration requirements, licenses, regulations, and official legal resources based on the startup's sector and location.

Expected Result: A structured legal research result should be returned with official source links where available. The result must not guarantee legal compliance.

Priority: High

## TC-018 — Funding Agent

Component: AI Agent

Test Description: Verify that the Funding Agent identifies relevant grants, government funding schemes, incubators, and other funding opportunities.

Expected Result: A structured funding result should include eligibility criteria, application deadlines, and official links where available. Funding approval must not be guaranteed.

Priority: High

# 9. AI Research Reliability Test Cases

## TC-019 — Research Source Availability

Component: AI Research

Test Description: Verify that the agents use reliable and relevant sources when researching current information.

Expected Result:

Research results should be supported by identifiable sources.

Priority: High

## TC-020 — Conflicting Research Information

Component: AI Research

Test Description: Test a situation where different sources provide different values.

Expected Result:

The agent should evaluate the available sources and avoid presenting an uncertain value as completely confirmed.

Priority: Medium

## TC-023 — AI Research Failure

Component: AI Research / Backend

Test Description: Simulate an AI research service failure.

Expected Result:

The backend should handle the failure gracefully and return a meaningful response instead of crashing.

Priority: High

# 10. ML Prediction Test Cases

## TC-024 — Valid ML Prediction Request

Component: ML Service
Test Description: Send valid ML features.

Input:

JSON

    {
    "founderExperienceYears": 5,
    "teamSize": 8,
    "marketSizeBillion": 35,
    "sector": "AI",
    "founderBackground": "first_time"
    }


Expected Result:

The ML service should return:

* Success probability
* Binary success prediction
* Risk level, if implemented

Priority: Critical

## TC-025 — Missing ML Feature

Component: ML Service
Test Description: Send a request without one required ML feature.

Example:

JSON

    {
    "founderExperienceYears": 5,
    "teamSize": 8,
    "marketSizeBillion": 35,
    "sector": "AI"
    }

Expected Result:

The ML service should reject the request with a clear error.
Priority: Critical

## TC-026 — Invalid ML Category

Component: ML Service

Test Description: Send an invalid sector or founder background.

Expected Result:

The ML service or API validation layer should reject the input.

Priority: High

## TC-027 — Prediction Probability Range

Component: ML Service

Test Description: Verify that the returned probability is within the valid range.

Expected Range: 0% to 100%

Expected Result:

The prediction probability must never be below 0% or above 100%.

Priority: Critical

# 11. API Test Cases

## TC-028 — Main Analysis Endpoint

Component: Backend API

Test Description: Send a valid request to:

    POST /api/startup/analyze

Expected Result:

The backend should return a complete startup analysis.

Priority: Critical

## TC-029 — Invalid API Request

Component: Backend API

Test Description: Send an invalid request to the main endpoint.

Expected Result:

The backend should return a clear validation error rather than crashing.

Priority: Critical

## TC-030 — AI Service Communication

Component: Backend / AI Service

Test Description: Verify that the backend correctly sends the required information to the AI research service.

Expected Result:

The AI service should receive the correct startup idea, location, budget, and sector.

Priority: Critical

## TC-031 — ML Service Communication

Component: Backend / ML Service

Test Description: Verify that the backend correctly sends the required ML features.

Expected Result:

The ML service should receive:

    founderExperienceYears
    teamSize
    marketSizeBillion
    sector
    founderBackground

Priority: Critical

## TC-032 — Combined Backend Response

Component: Backend

Test Description: Verify that AI research and ML prediction results are combined correctly.

Expected Result:

The backend response should contain:

    Market Research Agent results
    Legal Agent results
    Funding Agent results
    ML prediction results

The backend should combine these results into a structured response. If an AI agent fails, the backend should handle the failure gracefully.

Priority: Critical

# 12. Frontend Test Cases

## TC-033 — Form Display

Component: Frontend
Test Description: Open the application and verify that all required fields are visible.

Expected Result:
The form should contain:

* Startup idea
* Location
* Budget
* Founder experience
* Team size
* Sector
* Founder background
* Analyze button

Priority: High

## TC-034 — Sector Dropdown

Component: Frontend

Test Description: Verify that sector is displayed as a dropdown.

Expected Result:

Only the seven allowed sectors should be available.

Priority: High

## TC-035 — Founder Background Dropdown

Component: Frontend

Test Description: Verify that founder background is displayed as a dropdown.

Expected Result:

Only the four allowed founder-background values should be available.

Priority: High

## TC-036 — Loading State

Component: Frontend

Test Description: Submit a valid request and observe the interface while the backend processes it.

Expected Result:

A loading indicator or status message should be displayed.
The user should understand that the analysis is in progress.

Priority: Medium

## TC-037 — Results Display

Component: Frontend

Test Description: Verify that successful results are displayed correctly.

Expected Result:

The frontend should display:

The frontend should display the following results returned by the backend:

    Startup summary
    Market research
    Legal guidance
    Funding opportunities
    ML success probability and prediction
    Risk level, if implemented
    Overall analysis
    Priority: Critical

## TC-038 — Frontend Error Display

Component: Frontend

Test Description: Simulate a backend error.

Expected Result:

The frontend should display a clear user-friendly error message.
Technical stack traces should not be shown to the user.

Priority: High

# 13. Integration Test Cases

## TC-039 — Frontend to Backend

Component: Frontend / Backend

Test Description: Verify that the frontend can successfully send the startup form data to the backend.

Expected Result:

The backend receives the correct JSON fields and values.

Priority: Critical

## TC-040 — Backend to AI Service

Component: Backend / AI Service

Test Description: Verify communication between the main backend and AI research service.

Expected Result:

The backend should receive structured results from the Market Research Agent, Legal Agent, and Funding Agent.

Priority: Critical

## TC-041 — Backend to ML Service

Component: Backend / ML Service

Test Description: Verify communication between the main backend and ML prediction service.

Expected Result:

The backend receives the expected prediction response.

Priority: Critical

## TC-042 — Complete Integration

Component: Entire System
Test Description: Run a complete startup analysis from frontend submission to final results.

Expected Flow:

             Frontend
                ↓
             Backend
                ↓
            AI Agents
                ↓
        AI Research Result
                ↓
          ML Prediction
                ↓
        Backend Combination
                ↓
         Frontend Results


Expected Result:

The complete analysis should finish successfully and the frontend should display the combined result.
Priority: Critical

# 14. End-to-End Test Cases
## TC-043 — Complete Valid Startup Analysis

Component: Entire System
Test Description: Enter a realistic startup idea and all valid inputs.

Expected Result:
The system should:

1. Accept the input.
2. Validate the data.
3. Perform research using the three AI agents.
4. Obtain market research, legal guidance, and funding information.
5. Send valid ML features to the prediction service.
6. Generate an ML prediction.
7. Combine the results.
8. Display the final analysis.

Priority: Critical

## TC-044 — Invalid Input End-to-End

Component: Entire System

Test Description: Enter invalid information such as an invalid sector.

Expected Result: The system should reject the request before performing unnecessary processing.

Priority: High

## TC-045 — Research Failure End-to-End

Component: Entire System

Test Description: Simulate failure of an AI research component.

Expected Result: The application should handle the failure gracefully and inform the user that some information could not be obtained.

Priority: High

# 15. Performance Test Cases

## TC-046 — Normal Response Time

Component: Entire System

Test Description: Measure the time required for a normal startup analysis.

Expected Result: The application should return results within an acceptable time for the project.

The team should record the actual response time during testing.

Priority: Medium

## TC-047 — Duplicate Submission

Component: Frontend / Backend

Test Description: Click the Analyze button multiple times while a request is still processing.

Expected Result: The frontend should prevent accidental duplicate submissions.

Priority: Medium

# 16. Data Consistency Test Cases

## TC-048 — API Field Names

Component: Frontend / Backend / ML

Test Description: Verify that field names remain consistent between services.

Expected Result: The following fields should be mapped correctly:

                        TEXT

                            founderExperienceYears
                            teamSize
                            marketSizeBillion
                            sector
                            founderBackground

Priority: Critical

## TC-049 — Market Size Consistency

Component: AI / Backend / ML

Test Description: Verify that the market size returned by AI research is correctly passed to the ML service.

Expected Result: For example:

                            TEXT

                                AI research:
                                marketSizeBillion = 35

                should result in:

                            TEXT

                                ML:
                                marketSizeBillion = 35

Priority:Critical

# 17. Test Result Recording

During actual testing, the team should record the result of each test.

Recommended format:

| Test ID | Result    | Notes |

| TC-001  | Pass/Fail | Notes |
| TC-002  | Pass/Fail | Notes |
| TC-003  | Pass/Fail | Notes |

Possible results:

    PASS
    FAIL
    BLOCKED
    NOT TESTED

# 18. Defect Recording

If a test fails, the team should record:

* Test Case ID
* Problem description
* Component
* Steps to reproduce
* Expected result
* Actual result
* Person responsible
* Status

Example:

    Test Case: TC-031
    Problem: ML service received market size in full dollars instead of billions.
    Expected: marketSizeBillion = 25
    Actual: marketSizeBillion = 25000000000
    Component: Backend / ML integration
    Status: Open

# 19. Final Testing Requirement

Before the project is considered complete, the team should verify that:

* All required inputs work.
* Invalid inputs are handled.
* Sector values match the dataset.
* Founder background values match the dataset.
* Market size uses billions.
* Market Research Agent returns structured market information.
* Legal Agent returns relevant legal information and official sources where available.
* Funding Agent returns relevant funding opportunities and official sources where available.
* ML service returns a valid prediction.
* Backend combines AI and ML results correctly.
* Frontend displays the results correctly.
* Errors are handled without crashing.
* The complete end-to-end workflow works.

The final test results should be included in the project's final documentation.
