from flask import Flask, request, jsonify
import tensorflow as tf
import pickle

app = Flask(__name__)

# Load model
model = tf.keras.models.load_model("model.h5")

# Load tokenizer
with open("tokenizer.pkl", "rb") as f:
    tokenizer = pickle.load(f)

def preprocess(text):
    seq = tokenizer.texts_to_sequences([text])
    padded = tf.keras.preprocessing.sequence.pad_sequences(seq, maxlen=300)
    return padded

@app.route("/analyze", methods=["POST"])
def analyze():
    data = request.json
    text = data.get("text")

    processed = preprocess(text)
    prediction = model.predict(processed)[0][0]

    label = "FAKE" if prediction > 0.5 else "REAL"

    return jsonify({
        "prediction": label,
        "confidence": float(prediction),
        "explanation": "Based on linguistic patterns and training data"
    })

if __name__ == "__main__":
    app.run(port=5000, debug=True)