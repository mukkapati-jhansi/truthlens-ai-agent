import { useState } from 'react';
import { FileText, Link, Send, AlertCircle } from 'lucide-react';

interface InputFormProps {
  onSubmit: (text?: string, url?: string) => void;
  loading: boolean;
}

const SAMPLE_FAKE = `BREAKING: Scientists SHOCKED as miracle cure for all diseases found in common household item – Big Pharma trying to SUPPRESS this information!! Doctors don't want you to know about this incredible discovery that has been hidden for decades. Share before they DELETE this post!`;

const SAMPLE_REAL = `The Federal Reserve raised its benchmark interest rate by 0.25 percentage points on Wednesday, bringing it to the highest level in 16 years. The move was widely anticipated by markets. Fed Chair Jerome Powell said in a press conference that officials would continue to monitor incoming economic data before deciding on future rate changes.`;

export function InputForm({ onSubmit, loading }: InputFormProps) {
  const [mode, setMode] = useState<'text' | 'url'>('text');
  const [text, setText] = useState('');
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');

    if (mode === 'text') {
      if (!text.trim()) { setError('Please enter some news text to analyze.'); return; }
      if (text.trim().length < 20) { setError('Text too short. Please provide at least 20 characters.'); return; }
      onSubmit(text.trim(), undefined);
    } else {
      if (!url.trim()) { setError('Please enter a URL to analyze.'); return; }
      try { new URL(url.trim()); } catch { setError('Please enter a valid URL.'); return; }
      onSubmit(undefined, url.trim());
    }
  }

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
      <div className="flex items-center gap-1 bg-slate-800 rounded-xl p-1 mb-6 w-fit">
        <button
          onClick={() => setMode('text')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            mode === 'text' ? 'bg-sky-500 text-white shadow-lg shadow-sky-500/20' : 'text-slate-400 hover:text-white'
          }`}
        >
          <FileText size={14} />
          Text Input
        </button>
        <button
          onClick={() => setMode('url')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            mode === 'url' ? 'bg-sky-500 text-white shadow-lg shadow-sky-500/20' : 'text-slate-400 hover:text-white'
          }`}
        >
          <Link size={14} />
          URL Input
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {mode === 'text' ? (
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">News Content</label>
            <textarea
              value={text}
              onChange={e => setText(e.target.value)}
              placeholder="Paste the news article or headline here..."
              rows={6}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-slate-200 placeholder-slate-500 resize-none focus:outline-none focus:ring-2 focus:ring-sky-500/50 focus:border-sky-500/50 transition-all text-sm leading-relaxed"
            />
            <div className="flex gap-2 mt-2">
              <button type="button" onClick={() => setText(SAMPLE_FAKE)} className="text-xs text-rose-400 hover:text-rose-300 transition-colors">
                Load fake sample
              </button>
              <span className="text-slate-600">·</span>
              <button type="button" onClick={() => setText(SAMPLE_REAL)} className="text-xs text-emerald-400 hover:text-emerald-300 transition-colors">
                Load real sample
              </button>
            </div>
          </div>
        ) : (
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Article URL</label>
            <input
              type="text"
              value={url}
              onChange={e => setUrl(e.target.value)}
              placeholder="https://example.com/news-article"
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500/50 focus:border-sky-500/50 transition-all text-sm"
            />
            <p className="text-xs text-slate-500 mt-2">The agent will analyze the URL and extract key signals for classification.</p>
          </div>
        )}

        {error && (
          <div className="flex items-center gap-2 text-rose-400 bg-rose-400/10 border border-rose-400/20 rounded-lg px-3 py-2 text-sm">
            <AlertCircle size={14} />
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 bg-sky-500 hover:bg-sky-400 disabled:bg-slate-700 disabled:text-slate-500 text-white font-semibold py-3 rounded-xl transition-all duration-200 shadow-lg shadow-sky-500/20 hover:shadow-sky-400/30 text-sm"
        >
          {loading ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Agent Processing...
            </>
          ) : (
            <>
              <Send size={15} />
              Analyze with TruthLens Agent
            </>
          )}
        </button>
      </form>
    </div>
  );
}
