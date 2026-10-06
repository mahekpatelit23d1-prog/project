import joblib
import pandas as pd


# ============================================================
# 1. LOAD TRAINED MODEL
# ============================================================

model_path = "models/startup_prediction_model.pkl"

model = joblib.load(model_path)

print("Trained model loaded successfully!")


# ============================================================
# 2. FUNCTION FOR PREDICTION
# ============================================================

def predict_startup(
    founder_experience_years,
    team_size,
    market_size_billion,
    sector,
    founder_background
):

    # Create input data
    input_data = pd.DataFrame([{
        "founder_experience_years": founder_experience_years,
        "team_size": team_size,
        "market_size_billion": market_size_billion,
        "sector": sector,
        "founder_background": founder_background
    }])

    # Get prediction
    prediction = model.predict(input_data)[0]

    # Get probability
    probability = model.predict_proba(input_data)[0][1]

    success_probability = round(probability * 100, 1)

    # Risk level
    if success_probability >= 70:
        risk_level = "Low"
    elif success_probability >= 40:
        risk_level = "Medium"
    else:
        risk_level = "High"

    # Final result
    result = {
        "successProbability": success_probability,
        "success": int(prediction),
        "riskLevel": risk_level
    }

    return result


# ============================================================
# 3. TEST PREDICTION
# ============================================================

result = predict_startup(
    founder_experience_years=5,
    team_size=8,
    market_size_billion=35,
    sector="AI",
    founder_background="First Time"
)

print("\nPrediction Result:")
print(result)