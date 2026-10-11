# Dataset Documentation

## (1) Dataset Overview

The project uses a startup prediction dataset to train a machine learning model that predicts startup success.

Dataset size:

            - Rows: 100,000
            - Columns: 6
            - Missing values: None

The prediction target is the `Success` column.

## (2) Dataset Columns

|       Column        |  Data Type  |               Description                  |       Source       |

| founder_experience_ |  Integer    |   Number of years of founder experience    |     User input     |
        year

|      team_size      |  Integer    |   Number of people in the startup team     |     User input     |

| market_size_billion |   Float     |    Market size represented in billions     | AI market research |

|       sector        | Categorical |         Startup industry sector            |     User input     |
|  founder_background | Categorical |    Background/category of the founder      |     User input     |
|      Success        |   Integer   |    Target variable indicating success      |       Dataset      |



## (3) Target Variable

The `Success` column is the target variable for the machine learning model.

Possible values:

- `0` = Not successful
- `1` = Successful

The model should use the other five input features to predict the probability and/or class of startup success.

## (4) Allowed Sector Values

The `sector` field must be restricted to the categories present in the dataset:

- Health
- Fintech
- SaaS
- Ecommerce
- Climate
- Crypto
- AI

The frontend should provide these values through a dropdown/select field rather than allowing arbitrary sector names.

## (5) Allowed Founder Background Values

The dataset contains four founder background categories:

- academic
- first_time
- ex_bigtech
- serial_founder

The frontend should provide these as predefined choices.

## (6) User Inputs

The following prediction-related information should be collected from the user:

- Startup idea
- Location
- Startup budget
- Founder experience in years
- Team size
- Sector
- Founder background

Startup idea, location, and startup budget are important for the AI research/feasibility analysis.
Only founder experience, team size, sector, and founder background are entered directly as ML features. Market size is obtained through the Market Research Agent and supplied to the prediction model by the backend. Startup idea, location, and budget are used for AI research, not as current ML features.

## (7) AI Research Inputs

The AI agents should research information that is not directly entered by the user.

Examples include:

The three AI agents research information that is not directly available from the user's ML inputs.

1. Market Research Agent: Market size, market growth, competition, customer demand, and industry trends.

2. Legal Agent: Business registration, licenses, regulations, and official legal resources.

3. Funding Agent: Grants, government funding schemes, incubators, eligibility criteria, and application deadlines.

For example, a market size of $25 billion should be passed as 25, not 25000000000.

The AI market research agent should provide the market size in the same unit expected by the prediction model: billions.

For example, a market size of $25 billion should be passed as:

25

and not as:

25,000,000,000

## (8) Prediction Model Inputs

The machine learning model currently uses these five dataset features:

1. founder_experience_years
2. team_size
3. market_size_billion
4. sector
5. founder_background

The `Success` column is the prediction target and should not be supplied as an input during prediction.

## (9) Information Not Currently Included in the ML Dataset

The current dataset does not contain:

- Startup idea
- Location
- Startup budget
- Market growth
- Competition
- Customer demand
- Industry trends

These inputs and findings may be used by the three AI agents for research and guidance, but they must not be silently added as ML features.

## (10) Data Validation Requirements

Before sending data to the prediction model:

- Founder experience must be numeric.
- Team size must be numeric.
- Market size must be numeric.
- Sector must be one of the seven allowed sector values.
- Founder background must be one of the four allowed values.
- Market size must use billions as the unit.
- The `Success` value must not be sent as a prediction input.

## (11) Architecture Principle

- The three AI agents are responsible for researching current market, legal, and funding information.
- The machine learning model predicts startup success using the five features it was trained on.
- The AI agents must not retrain the ML model whenever new research is performed.
- The current dataset should remain the source for model training unless the team intentionally creates and validates a new dataset.
- If reliable market-size information cannot be confirmed, the system must not invent a value for the prediction model.