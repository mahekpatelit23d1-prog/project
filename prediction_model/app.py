from fastapi import FastAPI
from pydantic import BaseModel
import joblib
import pandas as pd


# ============================================================
# 1. CREATE FASTAPI APP
# ============================================================

app = FastAPI(
    title="Startup Prediction API",
    description="ML API for startup success prediction",
    version="1.0.0"
)


# ============================================================
# 2. LOAD TRAINED MODEL
# ============================================================

model_path = "models/startup_prediction_model.pkl"

model = joblib.load(model_path)


# ============================================================
# 3. INPUT DATA FORMAT
# ============================================================

class StartupInput(BaseModel):

    founderExperienceYears: int
    teamSize: int
    marketSizeBillion: float
    sector: str
    founderBackground: str


# ============================================================
# 4. PREDICTION ENDPOINT
# ============================================================

@app.post("/predict")
def predict_startup(data: StartupInput):

    # Convert API input into DataFrame
    input_data = pd.DataFrame([{
        "founder_experience_years": data.founderExperienceYears,
        "team_size": data.teamSize,
        "market_size_billion": data.marketSizeBillion,
        "sector": data.sector,
        "founder_background": data.founderBackground
    }])

    # Prediction
    prediction = model.predict(input_data)[0]

    # Probability of success
    probability = model.predict_proba(input_data)[0][1]

    success_probability = round(probability * 100, 1)

    # Risk level
    if success_probability >= 70:
        risk_level = "Low"
    elif success_probability >= 40:
        risk_level = "Medium"
    else:
        risk_level = "High"

    # API response
    return {
        "successProbability": success_probability,
        "success": int(prediction),
        "riskLevel": risk_level
    }


# ============================================================
# 5. ROOT ENDPOINT
# ============================================================

@app.get("/")
def home():

    return {
        "message": "Startup Prediction API is running"
    }