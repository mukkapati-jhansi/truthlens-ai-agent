export async function analyzeNews() {
  return {
    prediction: "FAKE",
    confidence: 0.92,
    explanation: "Demo result (backend not connected)",
    agent_steps: [
      { step: 1, action: "INPUT_ANALYSIS", result: "Input processed" },
      { step: 2, action: "MODEL", result: "Prediction generated" }
    ],
    response_time_ms: 120,
    performance_score: 9000
  };
}