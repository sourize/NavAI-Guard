import os
import joblib
import numpy as np
import pandas as pd
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from tensorflow.keras.models import load_model
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="NavAI-Guard API", description="Maritime Anomaly Detection API")

# Enable CORS for frontend
# In production, you might want to restrict this to your Vercel domain
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Allows all origins
    allow_credentials=True,
    allow_methods=["*"], # Allows all methods
    allow_headers=["*"], # Allows all headers
)

# Global variables to hold model and scaler
model = None
scaler = None
THRESHOLD = 0.1

class AISData(BaseModel):
    timestamp_str: str = "27/02/2024 03:42:19"
    mmsi: float
    latitude: float
    longitude: float
    sog: float
    cog: float
    heading: float

@app.on_event("startup")
def load_assets():
    global model, scaler
    try:
        base_path = os.path.dirname(os.path.abspath(__file__))
        model_path = os.path.join(base_path, "models", "autoencoder_model.keras")
        scaler_path = os.path.join(base_path, "models", "scaler.pkl")
        
        print(f"Loading model from {model_path}...")
        model = load_model(model_path)
        print(f"Loading scaler from {scaler_path}...")
        scaler = joblib.load(scaler_path)
        print("Assets loaded successfully.")
    except Exception as e:
        print(f"Error loading assets: {e}")
        raise RuntimeError(f"Could not load model or scaler: {e}")

@app.get("/")
def health_check():
    return {"status": "active", "system": "NavAI-Guard"}

@app.post("/predict")
def predict_anomaly(data: AISData):
    if model is None or scaler is None:
        raise HTTPException(status_code=503, detail="Model/Scaler not loaded")

    try:
        # 1. Process Timestamp
        # Format: DD/MM/YYYY HH:MM:SS
        timestamp_sec = pd.to_datetime(data.timestamp_str, format="%d/%m/%Y %H:%M:%S").value / 1e9
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Invalid Timestamp Format: {e}")

    # 2. Prepare Input Vector
    # Order matches app.py: [timestamp_sec, mmsi, latitude, longitude, sog, cog, heading]
    input_features = np.array([[
        timestamp_sec,
        data.mmsi,
        data.latitude,
        data.longitude,
        data.sog,
        data.cog,
        data.heading
    ]])

    try:
        # 3. Scale
        input_scaled = scaler.transform(input_features)

        # 4. Reconstruct
        reconstructed = model.predict(input_scaled)

        # 5. Calculate Error (MSE)
        reconstruction_error = np.mean(np.square(input_scaled - reconstructed))

        # 6. Determine Anomaly
        is_anomaly = float(reconstruction_error) > THRESHOLD

        return {
            "anomaly": is_anomaly,
            "score": float(reconstruction_error),
            "threshold": THRESHOLD,
            "status": "Anomalous" if is_anomaly else "Normal"
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction error: {e}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
