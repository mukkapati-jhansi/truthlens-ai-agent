import { CheckCircle, Search, Brain, Sparkles, BarChart2, Package } from 'lucide-react';
import type { AgentStep } from '../lib/api';

const STEP_ICONS: Record<string, React.ReactNode> = {
  INPUT_ANALYSIS: <Search size={14} />,
  STRATEGY_SELECTION: <Brain size={14} />,
  CLASSIFICATION_EXECUTED: <Sparkles size={14} />,
  EXPLANATION_GENERATED: <CheckCircle size={14} />,
  RESPONSE_STRUCTURED: <BarChart2 size={14} />,
};

interface AgentStepsProps {
  steps: AgentStep[];
  animating: boolean;
}

export function AgentSteps({ steps, animating }: AgentStepsProps) {
  if (steps.length === 0 && !animating) return null;

  const placeholders = animating && steps.length === 0
    ? ['INPUT_ANALYSIS', 'STRATEGY_SELECTION', 'CLASSIFICATION_EXECUTED', 'EXPLANATION_GENERATED', 'RESPONSE_STRUCTURED']
    : [];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-6 h-6 rounded-lg bg-amber-500/20 flex items-center justify-center">
          <Brain size={13} className="text-amber-400" />
        </div>
        <h3 className="text-sm font-semibold text-white">Agent Reasoning Chain</h3>
      </div>

      <div className="space-y-3">
        {steps.length > 0 ? steps.map((step) => (
          <div key={step.step} className="flex gap-3 group">
            <div className="flex flex-col items-center">
              <div className="w-7 h-7 rounded-lg bg-sky-500/20 border border-sky-500/30 flex items-center justify-center text-sky-400 flex-shrink-0">
                {STEP_ICONS[step.action] || <Package size={14} />}
              </div>
              {step.step < steps.length && (
                <div className="w-px h-full bg-slate-700 mt-1" />
              )}
            </div>
            <div className="pb-3 min-w-0 flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-mono text-sky-400/80 bg-sky-400/10 px-2 py-0.5 rounded-md">{step.action}</span>
                <span className="text-xs text-slate-600">Step {step.step}</span>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed">{step.result}</p>
            </div>
          </div>
        )) : placeholders.map((action, i) => (
          <div key={i} className="flex gap-3 animate-pulse">
            <div className="w-7 h-7 rounded-lg bg-slate-800 flex-shrink-0" />
            <div className="pb-3 flex-1">
              <div className="h-4 bg-slate-800 rounded w-32 mb-2" />
              <div className="h-3 bg-slate-800 rounded w-full" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
