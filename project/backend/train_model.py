import pandas as pd
import numpy as np
import pickle
from sklearn.model_selection import train_test_split
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Embedding, LSTM, Dense
from tensorflow.keras.preprocessing.text import Tokenizer
from tensorflow.keras.preprocessing.sequence import pad_sequences

# 🔹 Sample dataset (you can replace later with real dataset)
data = {
    "text": [
        "Breaking: miracle cure discovered",
        "Shocking news reveals secret conspiracy",
        "Government launches new satellite",
        "Scientists publish research paper",
        "Fake news spreads quickly online",
        "New technology improves healthcare"
    ],
    "label": [1, 1, 0, 0, 1, 0]  # 1 = FAKE, 0 = REAL
}

df = pd.DataFrame(data)

# 🔹 Tokenization
tokenizer = Tokenizer(num_words=5000)
tokenizer.fit_on_texts(df["text"])

X = tokenizer.texts_to_sequences(df["text"])
X = pad_sequences(X, maxlen=50)

y = df["label"]

# 🔹 Train/test split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)

# 🔹 Model
model = Sequential()
model.add(Embedding(5000, 64, input_length=50))
model.add(LSTM(64))
model.add(Dense(1, activation='sigmoid'))

model.compile(loss='binary_crossentropy', optimizer='adam', metrics=['accuracy'])

# 🔹 Train
model.fit(X_train, y_train, epochs=5, batch_size=2)

# 🔹 Save model
model.save("model.h5")

# 🔹 Save tokenizer
with open("tokenizer.pkl", "wb") as f:
    pickle.dump(tokenizer, f)

print("✅ Model and tokenizer saved!")