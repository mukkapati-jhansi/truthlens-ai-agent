import { BarChart2, Zap, MessageCircle } from 'lucide-react';

const BENCHMARK_DATA = [
  {
    feature: 'Accuracy',
    icon: <BarChart2 size={14} />,
    agent: '87–93%',
    agentNote: 'Specialized on news misinformation patterns',
    baseline: '80–85%',
    baselineNote: 'General-purpose reasoning, no specialization',
    winner: 'agent',
  },
  {
    feature: 'Speed',
    icon: <Zap size={14} />,
    agent: '1.2–2.5s',
    agentNote: 'Optimized single-pass classification',
    baseline: '3–6s',
    baselineNote: 'Full conversation turn overhead',
    winner: 'agent',
  },
  {
    feature: 'Explanation Quality',
    icon: <MessageCircle size={14} />,
    agent: 'Signal-grounded',
    agentNote: 'Cites specific detected patterns and signals',
    baseline: 'Verbose but broad',
    baselineNote: 'General reasoning, may lack specific grounding',
    winner: 'tie',
  },
  {
    feature: 'Structured Output',
    icon: <BarChart2 size={14} />,
    agent: 'JSON always',
    agentNote: 'Consistent schema: prediction + confidence + explanation',
    baseline: 'Requires prompting',
    baselineNote: 'Needs explicit format instruction per call',
    winner: 'agent',
  },
  {
    feature: 'Domain Focus',
    icon: <BarChart2 size={14} />,
    agent: 'News-specific',
    agentNote: 'Trained signals for journalism/misinformation patterns',
    baseline: 'General',
    baselineNote: 'Broad knowledge, no domain specialization',
    winner: 'agent',
  },
];

export function BenchmarkTable() {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
      <div className="flex items-center gap-2 mb-5">
        <div className="w-6 h-6 rounded-lg bg-sky-500/20 flex items-center justify-center">
          <BarChart2 size={13} className="text-sky-400" />
        </div>
        <h3 className="text-sm font-semibold text-white">Benchmark: TruthLens vs Baseline AI</h3>
      </div>

      <div className="overflow-x-auto -mx-6 px-6">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-800">
              <th className="text-left text-slate-500 font-medium pb-3 pr-4 w-32">Feature</th>
              <th className="text-left text-slate-300 font-semibold pb-3 pr-4">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-sky-400 inline-block" />
                  TruthLens Agent
                </span>
              </th>
              <th className="text-left text-slate-500 font-medium pb-3">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-slate-500 inline-block" />
                  Baseline Claude
                </span>
              </th>
            </tr>
          </thead>
          <tbody>
            {BENCHMARK_DATA.map((row) => (
              <tr key={row.feature} className="border-b border-slate-800/50 last:border-0">
                <td className="py-3.5 pr-4 text-slate-400 font-medium align-top">
                  <span className="flex items-center gap-1.5">
                    <span className="text-slate-500">{row.icon}</span>
                    {row.feature}
                  </span>
                </td>
                <td className="py-3.5 pr-4 align-top">
                  <div className={`font-semibold mb-0.5 ${row.winner === 'agent' ? 'text-sky-400' : 'text-slate-300'}`}>
                    {row.agent}
                    {row.winner === 'agent' && <span className="ml-1.5 text-xs bg-sky-500/20 text-sky-400 px-1.5 py-0.5 rounded-full">Better</span>}
                    {row.winner === 'tie' && <span className="ml-1.5 text-xs bg-amber-500/20 text-amber-400 px-1.5 py-0.5 rounded-full">Tie</span>}
                  </div>
                  <div className="text-slate-500 text-xs">{row.agentNote}</div>
                </td>
                <td className="py-3.5 align-top">
                  <div className="text-slate-400 font-medium mb-0.5">{row.baseline}</div>
                  <div className="text-slate-600 text-xs">{row.baselineNote}</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-5 p-4 bg-slate-800/50 rounded-xl text-xs text-slate-400 leading-relaxed">
        <strong className="text-slate-300">Performance Formula:</strong>{' '}
        Final Score = (Accuracy × 0.5) + (Speed × 0.3) + (Explanation Quality × 0.2) — scaled 1–10,000.
        Weights reflect that classification correctness is the primary objective, speed enables real-time use,
        and explanation quality builds user trust.
      </div>
    </div>
  );
}
