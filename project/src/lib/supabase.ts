import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

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
