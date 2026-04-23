from flask import Flask, request, jsonify
from flask_cors import CORS
import tensorflow as tf
import pickle
from tensorflow.keras.preprocessing.sequence import pad_sequences

app = Flask(__name__)
CORS(app)

# ✅ Load model
model = tf.keras.models.load_model("model.h5")

# ✅ Load tokenizer
with open("tokenizer.pkl", "rb") as f:
    tokenizer = pickle.load(f)

# ✅ Preprocess function
def preprocess(text):
    seq = tokenizer.texts_to_sequences([text])
    padded = pad_sequences(seq, maxlen=50)
    return padded

@app.route("/analyze", methods=["POST"])
def analyze():
    data = request.get_json()
    text = data.get("text", "")

    processed = preprocess(text)
    prediction = model.predict(processed)[0][0]

    # Convert prediction
    label = "FAKE" if prediction > 0.5 else "REAL"

    # Confidence (cleaner output)
    confidence = float(prediction) if label == "FAKE" else float(1 - prediction)
    confidence = round(confidence, 2)

    # 🔥 Improved Explanation (UPDATED)
    if label == "FAKE":
        explanation = "The model detected exaggerated or misleading language patterns often found in fake news."
    else:
        explanation = "The content follows patterns consistent with verified and factual news reporting."

    return jsonify({
        "prediction": label,
        "confidence": confidence,
        "explanation": explanation
    })

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)