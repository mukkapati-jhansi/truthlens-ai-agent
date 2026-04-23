import { useState } from 'react';
import { Header } from './components/Header';
import { InputForm } from './components/InputForm';
import { ResultCard } from './components/ResultCard';
import { AgentSteps } from './components/AgentSteps';
import { BenchmarkTable } from './components/BenchmarkTable';
import { HistoryPanel } from './components/HistoryPanel';
import { MetricsExplainer } from './components/MetricsExplainer';
import { analyzeNews, type AnalysisResponse } from './lib/api';
import { Shield, BookOpen, BarChart2, History } from 'lucide-react';

type Tab = 'analyze' | 'benchmark' | 'metrics' | 'history';

function App() {
  const [activeTab, setActiveTab] = useState<Tab>('analyze');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResponse | null>(null);
  const [error, setError] = useState('');

  async function handleSubmit(text?: string, url?: string) {
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const res = await analyzeNews({ text, url });
      setResult(res);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Analysis failed. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  const TABS: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: 'analyze', label: 'Analyze', icon: <Shield size={14} /> },
    { id: 'benchmark', label: 'Benchmark', icon: <BarChart2 size={14} /> },
    { id: 'metrics', label: 'Metrics', icon: <BookOpen size={14} /> },
    { id: 'history', label: 'History', icon: <History size={14} /> },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Header />

      {/* Hero */}
      <div className="border-b border-slate-800 bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="max-w-6xl mx-auto px-4 py-12 text-center">
          <div className="inline-flex items-center gap-2 text-xs text-sky-400 bg-sky-400/10 border border-sky-400/20 rounded-full px-3 py-1.5 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
            AI Agent · Multi-Step Reasoning · Real-Time Analysis
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-4 leading-tight tracking-tight">
            Detect Fake News<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-cyan-300">
              with AI Confidence
            </span>
          </h2>
          <p className="text-slate-400 text-lg max-w-xl mx-auto leading-relaxed">
            A production-grade AI agent that classifies news content, explains its reasoning,
            and measures its own performance — all in under 3 seconds.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-slate-800 bg-slate-950 sticky top-[65px] z-40">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex gap-0">
            {TABS.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-5 py-4 text-sm font-medium border-b-2 transition-all ${
                  activeTab === tab.id
                    ? 'text-sky-400 border-sky-400'
                    : 'text-slate-400 border-transparent hover:text-slate-200 hover:border-slate-600'
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        {activeTab === 'analyze' && (
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            {/* Left: Input + Result */}
            <div className="lg:col-span-3 space-y-6">
              <InputForm onSubmit={handleSubmit} loading={loading} />

              {error && (
                <div className="bg-rose-950/40 border border-rose-800/60 rounded-2xl p-4 text-rose-300 text-sm">
                  {error}
                </div>
              )}

              {(result || loading) && (
                <AgentSteps steps={result?.agent_steps || []} animating={loading} />
              )}

              {result && <ResultCard result={result} />}
            </div>

            {/* Right: Context */}
            <div className="lg:col-span-2 space-y-6">
              {/* About the Agent */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
                <h3 className="text-sm font-semibold text-white mb-3">About TruthLens Agent</h3>
                <div className="space-y-3 text-sm text-slate-400 leading-relaxed">
                  <p>
                    TruthLens is a <strong className="text-slate-200">5-step AI agent</strong> that goes beyond
                    simple classification. It understands your input, selects a strategy, executes prediction,
                    generates grounded explanations, and structures its response.
                  </p>
                  <p>
                    Powered by <strong className="text-slate-200">Claude claude-3-5-haiku</strong> with a specialized
                    misinformation detection system prompt — optimized for news domain signals.
                  </p>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-3">
                  {[
                    { label: 'Agent Steps', value: '5' },
                    { label: 'Target Accuracy', value: '90%+' },
                    { label: 'Avg Speed', value: '<2s' },
                    { label: 'Score Scale', value: '10,000' },
                  ].map(stat => (
                    <div key={stat.label} className="bg-slate-800/60 rounded-xl px-3 py-2.5">
                      <div className="text-lg font-bold text-sky-400">{stat.value}</div>
                      <div className="text-xs text-slate-500">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Why This Problem */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
                <h3 className="text-sm font-semibold text-white mb-3">Why This Problem?</h3>
                <div className="space-y-2 text-sm text-slate-400 leading-relaxed">
                  <p>
                    Misinformation spreads <strong className="text-slate-200">6x faster</strong> than accurate
                    news on social platforms (MIT, 2018). Manual fact-checking cannot scale.
                  </p>
                  <p>
                    This is priority #1 because it is <strong className="text-slate-200">high-impact, measurable,
                    and uniquely suited to AI</strong> — pattern recognition across thousands of signals
                    at human-impossible speed.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'benchmark' && (
          <div className="max-w-3xl">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-white mb-2">Benchmark Comparison</h2>
              <p className="text-slate-400 text-sm">TruthLens Agent vs. general-purpose baseline AI on fake news detection.</p>
            </div>
            <BenchmarkTable />
          </div>
        )}

        {activeTab === 'metrics' && (
          <div className="max-w-2xl">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-white mb-2">Performance Metrics</h2>
              <p className="text-slate-400 text-sm">How TruthLens measures and scores itself on every analysis.</p>
            </div>
            <MetricsExplainer />
          </div>
        )}

        {activeTab === 'history' && (
          <div className="max-w-2xl">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-white mb-2">Analysis History</h2>
              <p className="text-slate-400 text-sm">Past analyses stored in Supabase — persisted across sessions.</p>
            </div>
            <HistoryPanel />
          </div>
        )}
      </main>

      <footer className="border-t border-slate-800 mt-16">
        <div className="max-w-6xl mx-auto px-4 py-6 text-center text-xs text-slate-600">
          TruthLens AI Agent — Built for ADE/APO Application · AI-Native Fake News Detection System
        </div>
      </footer>
    </div>
  );
}

export default App;
