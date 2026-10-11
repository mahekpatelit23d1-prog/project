# ML Prediction Requirements

## 1. Purpose

The machine learning component predicts the likelihood of startup success using the project's startup prediction dataset.

The target variable is:

`Success`

Possible values:

* `0` = Not successful
* `1` = Successful

## 2. Dataset

The project dataset contains 100,000 rows and 6 columns.

The ML model should use these five columns as prediction features:

1. `founder_experience_years`
2. `team_size`
3. `market_size_billion`
4. `sector`
5. `founder_background`

The `Success` column is the target variable.

## 3. Input Features

### 3.1 Founder Experience

Dataset field:

`founder_experience_years`

Type: Numeric
Source: User input

### 3.2 Team Size

Dataset field:

`team_size`

Type: Numeric

Source: User input

### 3.3 Market Size

Dataset field:

market_size_billion

Type: Numeric
Source: Market Research Agent

The value must represent market size in billions.

Example:

{
  "market_size_billion": 25
}

### 3.4 Sector

Dataset field:

`sector`

Allowed values:

* Health
* Fintech
* SaaS
* Ecommerce
* Climate
* Crypto
* AI

The model preprocessing must handle this categorical feature correctly.

### 3.5 Founder Background

Dataset field:

`founder_background`

Allowed values:

* academic
* first_time
* ex_bigtech
* serial_founder

The model preprocessing must handle this categorical feature correctly.

## 4. Target Variable

The target variable is:

`Success`

Possible values:

        0 = Not successful
        1 = Successful


The target variable must not be supplied as an input during prediction.

## 5. Data Preprocessing

Member 4 should inspect and preprocess the dataset before training.

Preprocessing should include:

* Checking for missing values
* Checking data types
* Checking duplicate or invalid records
* Encoding categorical features
* Preparing numeric features
* Separating features from the target

The preprocessing method used during training must also be used during prediction.

## 6. Train/Test Split

The dataset should be divided into training and testing data.

The test data must not be used to train the model.

The split ratio should be documented by Member 4.

A common starting point is:

* 80% training
* 20% testing

A fixed random state should preferably be used so that experiments can be reproduced.

## 7. Model Comparison

Member 4 should evaluate suitable classification algorithms.

Possible models include:

* Logistic Regression
* Decision Tree
* Random Forest

The final model should be selected based on evaluation results rather than assuming one model is automatically best.

## 8. Model Evaluation

The model should be evaluated using appropriate classification metrics.

Recommended metrics include:

* Accuracy
* Precision
* Recall
* F1-score
* Confusion matrix

If probability predictions are available, additional metrics such as ROC-AUC may also be considered.
The evaluation results should be documented.

## 9. Model Selection

Member 4 should select the model that provides the most appropriate performance for the project based on the evaluation results.

The selected model and reasoning should be documented.

## 10. Prediction Output

The prediction service should return at least:

* Predicted success class
* Success probability, if supported

Example:

JSON

{
  "success": 1,
  "successProbability": 72.4
}

The success probability should be returned as a percentage between 0 and 100 when supported by the selected model. It should represent the model's estimated probability, not a guarantee that the startup will succeed.

## 11. Prediction Input

The prediction service should receive the five model features.

Example:

JSON

{
  "founderExperienceYears": 5,
  "teamSize": 8,
  "marketSizeBillion": 25,
  "sector": "AI",
  "founderBackground": "first_time"
}

The service should validate the input before making a prediction.

## 12. Input Validation

The prediction service should check:

* Founder experience is numeric.
* Team size is numeric.
* Market size is numeric.
* Market size is represented in billions.
* Sector is one of the seven allowed values.
* Founder background is one of the four allowed values.

Invalid input should result in a clear error response.

## 13. Model Persistence

After selecting and training the final model, Member 4 should save the trained model and preprocessing components so that the backend can use them without retraining for every request.

The model should normally be loaded when the prediction service starts.
The system should not retrain the model for every user request.

## 14. Prediction Service

Member 4 should provide a prediction API/service that can receive prediction inputs and return the model result.

A possible endpoint is: POST /predict
Example request:

JSON

{
  "founderExperienceYears": 5,
  "teamSize": 8,
  "marketSizeBillion": 25,
  "sector": "AI",
  "founderBackground": "first_time"
}


Example response:

JSON

{
  "success": 1,
  "successProbability": 72.4
}

The exact endpoint and API format should be finalized with Member 2.

## 15. Important Separation

The machine learning model should use the features it was trained on.
The following are not currently ML features:

* Startup idea
* Location
* Startup budget
* Market growth
* Competition
* Customer demand
* Industry trends

These can be analyzed by the AI agents.
They should not be silently added to the ML model.

## 16. Market Research Integration

The Market Research Agent provides current market-size information.

That information may be used as:

`market_size_billion`

Example:
    
    AI Agent research:
  Market size = $25 billion

            ↓

    Prediction input:
  market_size_billion = 25


The unit must remain consistent.If reliable market-size information cannot be confirmed, the backend should not invent a value. It should follow an agreed error-handling approach with Member 2 rather than sending an invalid or fabricated market-size value to the prediction service.

## 17. Reproducibility

Member 4 should document:
* Dataset used
* Preprocessing steps
* Train/test split
* Random state, if used
* Models tested
* Evaluation metrics
* Final selected model
* Model version

This allows the team to understand and reproduce the ML experiment.

## 18. Responsibility of Member 4

Member 4 is responsible for:
* Dataset preprocessing
* Model training
* Model comparison
* Model evaluation
* Final model selection
* Model persistence
* Prediction API/service
* Prediction documentation

Member 4 should coordinate with:

* Member 3 for market-size output
* Member 2 for API integration
* Member 1 for frontend result requirements
* Member 5 for requirements validation and testing
