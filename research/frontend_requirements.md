# Frontend Requirements

## 1. Purpose

This document defines the frontend requirements for the AI-Powered Multi-Agent Startup Assistant with Prediction Model.

The frontend provides the user interface where the user enters startup information, submits the analysis request, and views the results returned by the backend.

The frontend should be simple, clear, responsive, and easy to use.



## 2. Frontend Responsibilities

The frontend is responsible for:

* Collecting required user inputs.
* Validating basic input before submission.
* Providing restricted dropdowns for fixed dataset categories.
* Sending the startup information to the main backend API.
* Displaying loading status while analysis is running.
* Displaying AI research results.
* Displaying ML prediction results.
* Displaying errors clearly.
* Presenting the final startup analysis in an understandable format.

The frontend should not directly communicate with the AI agents or ML prediction service.

The recommended flow is:

TEXT

            User
            ↓
         Frontend
            ↓
      Main Backend API
            ↓
  AI Research + ML Prediction
            ↓
      Main Backend
            ↓
         Frontend
            ↓
      Final Analysis




# 3. Startup Analysis Form

The main frontend page should contain a startup analysis form.

The form should collect the following information:

| Field              | Type         | Required | Input Method    |

| Startup Idea       | Text         | Yes      | Text area/input |
| Location           | Text         | Yes      | Text input      |
| Startup Budget     | Numeric      | Yes      | Number input    |
| Founder Experience | Numeric      | Yes      | Number input    |
| Team Size          | Numeric      | Yes      | Number input    |
| Sector             | Fixed String | Yes      | Dropdown        |
| Founder Background | Fixed String | Yes      | Dropdown        |



# 4. Startup Idea

### Field

TEXT

    startupIdea


### Type

String.

### Source

User input.

### Purpose

Describes the startup idea that will be analyzed by the AI research agents.

### Example

TEXT

    AI healthcare app for small clinics


The field should allow the user to provide enough information for the AI agents to understand the proposed startup.



# 5. Location

### Field

TEXT

    location


### Type

String.

### Source

User input.

### Purpose

Identifies where the user plans to start or operate the business.

The location is important for AI-based feasibility research.

### Example

TEXT

    Ahmedabad, Gujarat


The location is not currently a feature in the ML training dataset.

It should therefore be passed to the AI research service rather than directly used as an ML feature.



# 6. Startup Budget

### Field

TEXT

    budget


### Type

Numeric.

### Source

User input.

### Purpose

Represents the amount of money available for starting the business.

The budget is used by the AI research system to evaluate budget feasibility.

### Example

TEXT

    1000000


The project team should define and document the currency used by the application.

The budget is not currently a feature in the ML training dataset.



# 7. Founder Experience

### Field

TEXT

    founderExperienceYears


### Type

Numeric.

### Source

User input.

### Purpose

Represents the founder's previous experience in years.

This value is also used by the ML prediction model.

### Example

TEXT

    5

The frontend should prevent invalid non-numeric input.


# 8. Team Size

### Field

TEXT

    teamSize


### Type

Numeric.

### Source

User input.

### Purpose

Represents the number of people in the startup team.

This value is also used by the ML prediction model.

### Example

TEXT

    8

The frontend should accept positive numeric values.



# 9. Sector

### Field

TEXT

    sector

### Type

String.

### Source

User selection.

### Input Method

Dropdown.

### Purpose

Identifies the startup's industry sector.

The sector must be restricted to the values available in the project's dataset.

### Allowed Values

TEXT

    Health
    Fintech
    SaaS
    Ecommerce
    Climate
    Crypto
    AI

The user should not be allowed to enter arbitrary sector values.

This restriction is important because the ML model was trained using these specific categories.



# 10. Founder Background

### Field

TEXT

    founderBackground


### Type

String.

### Source

User selection.

### Input Method

Dropdown.

### Purpose

Describes the founder's background.

### Allowed Values

TEXT

    academic
    first_time
    ex_bigtech
    serial_founder

The user should not be allowed to enter arbitrary values.



# 11. Form Validation

The frontend should perform basic validation before sending the request.

Required fields:

TEXT

    startupIdea
    location
    budget
    founderExperienceYears
    teamSize
    sector
    founderBackground


The frontend should check:

* Required fields are not empty.
* Numeric fields contain valid numbers.
* Budget is a valid positive value.
* Founder experience is a valid non-negative value.
* Team size is a positive value.
* Sector is one of the allowed values.
* Founder background is one of the allowed values.

Example validation message:

TEXT

    Please enter a valid team size.




# 12. Submit Button

The form should contain a clear button for starting the analysis.

Example:

TEXT

    Analyze Startup

When the user clicks the button:

1. Validate the form.
2. If validation fails, show the appropriate error.
3. If validation succeeds, send the request to the backend.
4. Display a loading state.
5. Wait for the backend response.
6. Display the final analysis.



# 13. Backend Request

The frontend should send the following JSON structure to:

TEXT

    POST /api/startup/analyze


Example:

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


The frontend should use the exact field names agreed upon in the API requirements.

# 14. Loading State

The frontend shall display a loading state while the startup analysis is being processed.

Example messages:

Analyzing your startup...
Researching the market...
Checking legal requirements...
Finding funding opportunities...
Calculating the startup success prediction...

The submit button should be disabled while the request is processing to prevent duplicate submissions.

# 15. Results Page

After receiving a successful backend response, the frontend should display the results in clearly separated sections.

The frontend shall display the following sections:

1.Startup Summary
2.Market Research
3.Legal Guidance
4.Funding Opportunities
5.ML Success Prediction
6.Overall Analysis

# 16. Startup Summary

The frontend should display basic information about the analyzed startup.

Example:

    Startup Idea:
    AI healthcare app

    Location:
    Ahmedabad, Gujarat

    Sector:
    AI

# 17. Market Analysis

The frontend should display:

* Market size
* Market growth
* Opportunity assessment

Example:

    Market Size: $35 billion
    Market Growth: 14%
    Opportunity: High


The market size should be displayed to the user in a readable format.

Internally, the API uses:

    marketSizeBillion

# 18. AI Agent Results

Market Research Agent : Display market size, market growth, competition, customer demand, industry trends, and opportunities where information is available.

Legal Agent : Display relevant registration requirements, licenses, regulations, and official legal resource links.

Funding Agent : Display potential funding schemes, grants, incubators, eligibility criteria, and application deadlines where available.


# 19. ML Success Prediction

The frontend should clearly display the prediction result.

Example:

    Estimated Success Probability: 72.4%
    Prediction: Success
    Risk Level: Medium

The frontend should display the probability as a percentage.

For example: 0.724


would be displayed as: 72.4%


if the backend provides the value as a decimal.

If the backend already returns: 72.4

then it should be displayed as: 72.4%

The frontend and backend must agree on the probability format during implementation.

# 20. Overall Analysis

The frontend shall present an understandable summary based on the actual market research, legal guidance, funding findings, and ML prediction returned by the backend.

The frontend shall not generate unsupported conclusions or present the ML prediction as a guarantee of startup success.

# 21. Error Handling

If the backend returns an error, the frontend should display a clear message.

Example:

    Unable to analyze the startup.
    Please check your information and try again.


For invalid input: Please select a valid sector.

For research failure:

    Some market research information could not be confirmed.
    Please try again later.

The frontend should not display raw technical errors such as stack traces to the user.

# 22. No-Data or Insufficient-Data Handling

If the AI research service cannot obtain reliable information, the frontend should clearly indicate that the information is unavailable.

Example:

    Market Size:
    Information could not be reliably confirmed.

The application must not present invented information as confirmed research.

# 23. Responsive Design

The frontend should work on:

* Desktop
* Laptop
* Tablet
* Mobile screen

The form and result sections should remain readable at different screen sizes.

# 24. User Experience Requirements

The interface should:

* Use clear labels.
* Use readable text.
* Provide useful validation messages.
* Clearly distinguish input fields from results.
* Show loading status during analysis.
* Prevent duplicate submissions.
* Make the success probability easy to understand.
* Clearly separate AI research results from ML prediction results.
* Avoid unnecessary complexity.

# 25. Important Dataset Constraint

The frontend must not change the allowed dataset categories.

For `sector`, only these values are allowed:

    Health
    Fintech
    SaaS
    Ecommerce
    Climate
    Crypto
    AI


For `founderBackground`, only these values are allowed:

    academic
    first_time
    ex_bigtech
    serial_founder

These values must remain consistent with the ML training dataset.

# 26. Important Market Size Constraint

The AI research system should provide market size in billions.

The API field is:  marketSizeBillion

Example: 25


represents: $25 billion

The frontend can display this as: $25 billion

The frontend should not convert the value into another unit before sending it to the backend.

# 27. Separation of Responsibilities

The frontend collects information and displays results.

The frontend should not:

* Train the ML model.
* Perform ML predictions locally.
* Perform market research.
* Decide the market size.
* Modify AI research results.
* Directly communicate with individual AI agents unless the architecture is explicitly changed by the team.

The backend and services are responsible for processing these tasks.

# 28. Recommended Screen Structure

A simple frontend structure can be:

        ------------------------------------------------
                  AI-Powered Startup Assistant
        ------------------------------------------------

        Startup Idea
        [                                      ]

        Location
        [                                      ]

        Startup Budget
        [                                      ]

        Founder Experience (Years)
        [                                      ]

        Team Size
        [                                      ]

        Sector
        [           Select Sector ▼            ]

        Founder Background
        [          Select Background ▼         ]

                  [ Analyze Startup ]








              ANALYSIS RESULTS

Startup Summary

Market Research :

    Market size and growth

    Competition, customers, and trends

Legal Guidance :

Funding Opportunities :

ML Success Prediction :

    Success probability, if provided

    Predicted result

    Risk level, if provided

Overall Analysis
----------------
Summary...

# 29. Frontend API Rule

The frontend should use the main backend endpoint:

    POST /api/startup/analyze


The frontend should not need to know how the three AI agents or ML model work internally.

This keeps the system modular and makes future changes easier.

# 30. Final Frontend Requirement

The frontend must provide a complete and user-friendly interface for entering startup information and viewing the combined AI research and ML prediction results.

The implementation should maintain consistency with:

* `dataset_documentation.md`
* `requirements.md`
* `ai_agent_requirements.md`
* `ml_requirements.md`
* `api_requirements.md`

Any changes to field names, allowed values, units, or API response structures should be discussed with the relevant team members before implementation.
