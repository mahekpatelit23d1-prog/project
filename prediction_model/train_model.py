import pandas as pd
import os

from sklearn.model_selection import train_test_split
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import OneHotEncoder
from sklearn.pipeline import Pipeline

from sklearn.linear_model import LogisticRegression
from sklearn.tree import DecisionTreeClassifier
from sklearn.ensemble import RandomForestClassifier

from sklearn.metrics import (
    accuracy_score,
    precision_score,
    recall_score,
    f1_score
)

import joblib
import matplotlib.pyplot as plt


# ============================================================
# 1. LOAD DATASET
# ============================================================

df = pd.read_csv("dataset/startup_prediction_dataset.csv")

print("Dataset loaded successfully!")
print("Dataset Shape:", df.shape)


# ============================================================
# 2. SELECT FEATURES AND TARGET
# ============================================================

features = [
    "founder_experience_years",
    "team_size",
    "market_size_billion",
    "sector",
    "founder_background"
]

target = "Success"

X = df[features]
y = df[target]


# ============================================================
# 3. CHECK MISSING VALUES
# ============================================================

print("\nMissing Values:")
print(X.isnull().sum())

print("\nTarget Distribution:")
print(y.value_counts())


# ============================================================
# 4. DEFINE NUMERICAL AND CATEGORICAL FEATURES
# ============================================================

numerical_features = [
    "founder_experience_years",
    "team_size",
    "market_size_billion"
]

categorical_features = [
    "sector",
    "founder_background"
]


# ============================================================
# 5. PREPROCESSING
# ============================================================

preprocessor = ColumnTransformer(
    transformers=[
        (
            "categorical",
            OneHotEncoder(handle_unknown="ignore"),
            categorical_features
        )
    ],
    remainder="passthrough"
)


# ============================================================
# 6. TRAIN-TEST SPLIT
# ============================================================

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.20,
    random_state=42,
    stratify=y
)

print("\nTraining Data:", X_train.shape)
print("Testing Data:", X_test.shape)


# ============================================================
# 7. DEFINE MODELS
# ============================================================

models = {
    "Logistic Regression": LogisticRegression(max_iter=1000),
    "Decision Tree": DecisionTreeClassifier(random_state=42),
    "Random Forest": RandomForestClassifier(
        n_estimators=100,
        random_state=42
    )
}


# ============================================================
# 8. TRAIN AND EVALUATE MODELS
# ============================================================

results = []

best_model = None
best_model_name = None
best_f1 = 0


for name, model in models.items():

    pipeline = Pipeline(
        steps=[
            ("preprocessor", preprocessor),
            ("model", model)
        ]
    )

    # Train
    pipeline.fit(X_train, y_train)

    # Predict
    y_pred = pipeline.predict(X_test)

    # Metrics
    accuracy = accuracy_score(y_test, y_pred)
    precision = precision_score(y_test, y_pred, zero_division=0)
    recall = recall_score(y_test, y_pred, zero_division=0)
    f1 = f1_score(y_test, y_pred, zero_division=0)

    results.append({
        "Model": name,
        "Accuracy": accuracy,
        "Precision": precision,
        "Recall": recall,
        "F1 Score": f1
    })

    print("\n-----------------------------------")
    print(name)
    print("-----------------------------------")
    print("Accuracy :", round(accuracy, 4))
    print("Precision:", round(precision, 4))
    print("Recall   :", round(recall, 4))
    print("F1 Score :", round(f1, 4))

    # Select best model
    if f1 > best_f1:
        best_f1 = f1
        best_model = pipeline
        best_model_name = name


# ============================================================
# 9. DISPLAY MODEL COMPARISON
# ============================================================

results_df = pd.DataFrame(results)

print("\n\nMODEL COMPARISON")
print(results_df)


# ============================================================
# 10. SAVE BEST MODEL
# ============================================================

os.makedirs("models", exist_ok=True)

model_path = "models/startup_prediction_model.pkl"

joblib.dump(best_model, model_path)

print("\nBest Model:", best_model_name)
print("Best F1 Score:", round(best_f1, 4))
print("Model saved successfully at:", model_path)


# ============================================================
# 11. CREATE MODEL COMPARISON GRAPH
# ============================================================

os.makedirs("graphs", exist_ok=True)

results_df.set_index("Model")[
    ["Accuracy", "Precision", "Recall", "F1 Score"]
].plot(kind="bar")

plt.title("Model Comparison")
plt.ylabel("Score")
plt.xlabel("Model")
plt.xticks(rotation=0)
plt.tight_layout()

graph_path = "graphs/model_comparison.png"

plt.savefig(graph_path)
plt.close()

print("Graph saved successfully at:", graph_path)

print("\n===================================")
print("MODEL TRAINING COMPLETED")
print("===================================")