// 🔥 SAFE FALLBACK (no crash even without env variables)

export const supabase = null;

export type Analysis = {
  id: string;
  input_type: string;
  input_text: string;
  input_url: string | null;
  prediction: 'FAKE' | 'REAL';
  confidence: number;
  explanation: string;
  response_time_ms: number;
  agent_steps: AgentStep[];
  performance_score: number;
  created_at: string;
};

export type AgentStep = {
  step: number;
  action: string;
  result: string;
};