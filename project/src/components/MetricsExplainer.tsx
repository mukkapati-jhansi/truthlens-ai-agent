import { Target, Gauge, MessageSquare } from 'lucide-react';

const METRICS = [
  {
    icon: <Target size={16} className="text-sky-400" />,
    label: 'Accuracy',
    weight: '50%',
    description: 'Measured by model confidence score. Higher confidence = better accuracy signal.',
    color: 'sky',
  },
  {
    icon: <Gauge size={16} className="text-emerald-400" />,
    label: 'Speed',
    weight: '30%',
    description: 'Response time in ms. Max 10,000 points at 0ms, decreasing 2pts/ms.',
    color: 'emerald',
  },
  {
    icon: <MessageSquare size={16} className="text-amber-400" />,
    label: 'Explanation Quality',
    weight: '20%',
    description: 'Length and specificity of reasoning. Signal-referenced explanations score highest.',
    color: 'amber',
  },
];

export function MetricsExplainer() {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
      <h3 className="text-sm font-semibold text-white mb-4">Performance Scoring System</h3>
      <div className="space-y-4">
        {METRICS.map(m => (
          <div key={m.label} className="flex gap-3">
            <div className={`w-8 h-8 rounded-lg bg-${m.color}-500/10 flex items-center justify-center flex-shrink-0 mt-0.5`}>
              {m.icon}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-white">{m.label}</span>
                <span className={`text-xs font-mono bg-${m.color}-500/10 text-${m.color}-400 px-1.5 py-0.5 rounded`}>
                  ×{m.weight}
                </span>
              </div>
              <p className="text-slate-500 text-xs mt-0.5 leading-relaxed">{m.description}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 p-3 bg-slate-800/60 rounded-xl">
        <code className="text-xs text-sky-300 font-mono">
          Score = (Accuracy × 0.5) + (Speed × 0.3) + (Explanation × 0.2)
        </code>
        <p className="text-xs text-slate-500 mt-1">Final score on a scale of 1–10,000</p>
      </div>
    </div>
  );
}
