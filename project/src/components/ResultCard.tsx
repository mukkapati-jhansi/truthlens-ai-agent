import { ShieldAlert, ShieldCheck, Clock, TrendingUp, MessageSquare } from 'lucide-react';
import type { AnalysisResponse } from '../lib/api';

interface ResultCardProps {
  result: AnalysisResponse;
}

function ConfidenceBar({ value }: { value: number }) {
  const pct = Math.round(value * 100);
  const color = value >= 0.75 ? (pct > 80 ? 'bg-rose-500' : 'bg-amber-500') : 'bg-emerald-500';
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between text-xs">
        <span className="text-slate-400">Confidence</span>
        <span className="text-white font-semibold">{pct}%</span>
      </div>
      <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-700 ${color}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

function ScoreMeter({ score }: { score: number }) {
  const pct = (score / 10000) * 100;
  const grade = score >= 8000 ? 'A+' : score >= 6000 ? 'A' : score >= 4000 ? 'B' : 'C';
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between text-xs">
        <span className="text-slate-400">Performance Score</span>
        <span className="text-amber-400 font-semibold">{Math.round(score).toLocaleString()} / 10,000 ({grade})</span>
      </div>
      <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-amber-500 to-yellow-400 transition-all duration-700"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

export function ResultCard({ result }: ResultCardProps) {
  const isFake = result.prediction === 'FAKE';

  return (
    <div className={`border rounded-2xl overflow-hidden transition-all duration-500 ${
      isFake
        ? 'bg-rose-950/40 border-rose-800/60'
        : 'bg-emerald-950/40 border-emerald-800/60'
    }`}>
      {/* Verdict Banner */}
      <div className={`px-6 py-5 flex items-center justify-between ${
        isFake ? 'bg-rose-500/10' : 'bg-emerald-500/10'
      }`}>
        <div className="flex items-center gap-4">
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
            isFake ? 'bg-rose-500/20' : 'bg-emerald-500/20'
          }`}>
            {isFake
              ? <ShieldAlert size={24} className="text-rose-400" />
              : <ShieldCheck size={24} className="text-emerald-400" />
            }
          </div>
          <div>
            <div className={`text-2xl font-black tracking-wide ${
              isFake ? 'text-rose-400' : 'text-emerald-400'
            }`}>
              {result.prediction}
            </div>
            <div className="text-slate-400 text-sm">
              {isFake ? 'Likely misinformation detected' : 'Content appears credible'}
            </div>
          </div>
        </div>
        <div className="text-right hidden sm:block">
          <div className={`text-3xl font-black ${isFake ? 'text-rose-400' : 'text-emerald-400'}`}>
            {Math.round(result.confidence * 100)}%
          </div>
          <div className="text-slate-500 text-xs">confidence</div>
        </div>
      </div>

      {/* Metrics */}
      <div className="px-6 py-5 space-y-4 border-t border-slate-800/60">
        <ConfidenceBar value={result.confidence} />
        <ScoreMeter score={result.performance_score} />
      </div>

      {/* Explanation */}
      <div className="px-6 pb-5 space-y-3 border-t border-slate-800/60 pt-5">
        <div className="flex items-center gap-2">
          <MessageSquare size={14} className="text-slate-400" />
          <span className="text-sm font-semibold text-slate-300">Agent Explanation</span>
        </div>
        <p className="text-slate-300 text-sm leading-relaxed">{result.explanation}</p>
      </div>

      {/* Meta */}
      <div className="px-6 py-3 border-t border-slate-800/60 flex items-center gap-4">
        <div className="flex items-center gap-1.5 text-xs text-slate-500">
          <Clock size={12} />
          <span>Response: {result.response_time_ms}ms</span>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-slate-500">
          <TrendingUp size={12} />
          <span>{result.agent_steps.length} agent steps executed</span>
        </div>
      </div>
    </div>
  );
}
