/*
  # TruthLens AI Agent - Database Schema

  ## Overview
  Creates the core tables for the TruthLens fake news detection system.

  ## New Tables

  ### analyses
  Stores each news analysis request and result:
  - `id` (uuid, primary key)
  - `input_type` (text) - 'text' or 'url'
  - `input_text` (text) - the raw news text
  - `input_url` (text, nullable) - optional URL
  - `prediction` (text) - 'FAKE' or 'REAL'
  - `confidence` (numeric) - score 0-1
  - `explanation` (text) - reasoning
  - `response_time_ms` (integer) - processing time in milliseconds
  - `agent_steps` (jsonb) - step-by-step agent reasoning
  - `performance_score` (numeric) - final 1-10000 score
  - `created_at` (timestamptz)
  - `user_id` (uuid, nullable) - optional auth reference

  ### benchmarks
  Stores benchmark comparison data between TruthLens and baseline AI:
  - `id` (uuid, primary key)
  - `test_case` (text) - input used for comparison
  - `truthlens_prediction` (text)
  - `truthlens_confidence` (numeric)
  - `truthlens_response_ms` (integer)
  - `baseline_prediction` (text)
  - `baseline_confidence` (numeric)
  - `baseline_response_ms` (integer)
  - `created_at` (timestamptz)

  ## Security
  - RLS enabled on both tables
  - Public read/insert for analyses (no auth required for demo)
  - Public read/insert for benchmarks
*/

CREATE TABLE IF NOT EXISTS analyses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  input_type text NOT NULL DEFAULT 'text',
  input_text text NOT NULL,
  input_url text,
  prediction text,
  confidence numeric(4,3),
  explanation text,
  response_time_ms integer,
  agent_steps jsonb DEFAULT '[]',
  performance_score numeric(10,2),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE analyses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read analyses"
  ON analyses FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Anyone can insert analyses"
  ON analyses FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE TABLE IF NOT EXISTS benchmarks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  test_case text NOT NULL,
  truthlens_prediction text,
  truthlens_confidence numeric(4,3),
  truthlens_response_ms integer,
  baseline_prediction text,
  baseline_confidence numeric(4,3),
  baseline_response_ms integer,
  notes text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE benchmarks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read benchmarks"
  ON benchmarks FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Anyone can insert benchmarks"
  ON benchmarks FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE INDEX IF NOT EXISTS analyses_created_at_idx ON analyses(created_at DESC);
CREATE INDEX IF NOT EXISTS analyses_prediction_idx ON analyses(prediction);
