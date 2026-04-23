export interface AnalysisRequest {
  text?: string;
  url?: string;
  mode?: 'standard' | 'deep';
}

export interface AgentStep {
  step: number;
  action: string;
  result: string;
}

export interface AnalysisResponse {
  prediction: 'FAKE' | 'REAL';
  confidence: number;
  explanation: string;
  agent_steps: AgentStep[];
  response_time_ms: number;
  performance_score: number;
  error?: string;
}

export async function analyzeNews(req: AnalysisRequest): Promise<AnalysisResponse> {
  const startTime = Date.now();

  // 🚀 SIMULATED RESPONSE (no backend required)
  await new Promise((resolve) => setTimeout(resolve, 800)); // fake delay

  const fakePrediction = Math.random() > 0.5 ? "FAKE" : "REAL";
  const fakeConfidence = Math.random() * 0.2 + 0.8; // 0.8 - 1.0

  const explanation =
    fakePrediction === "FAKE"
      ? "The model detected exaggerated or misleading language patterns often found in fake news."
      : "The content follows patterns consistent with verified and factual news reporting.";

  const responseTime = Date.now() - startTime;

  return {
    prediction: fakePrediction,
    confidence: fakeConfidence,
    explanation: explanation,
    agent_steps: [
      { step: 1, action: "INPUT_ANALYSIS", result: "User input processed" },
      { step: 2, action: "STRATEGY_SELECTION", result: "Classification selected" },
      { step: 3, action: "CLASSIFICATION_EXECUTED", result: fakePrediction },
      { step: 4, action: "EXPLANATION_GENERATED", result: explanation },
      { step: 5, action: "RESPONSE_STRUCTURED", result: "Output returned" }
    ],
    response_time_ms: responseTime,
    performance_score: Math.floor(
      (fakeConfidence * 0.5 + 0.8 * 0.3 + 0.8 * 0.2) * 10000
    )
  };
}