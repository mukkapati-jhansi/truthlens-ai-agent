import { useEffect, useState } from 'react';
import { Clock, ShieldAlert, ShieldCheck } from 'lucide-react';
import { supabase, type Analysis } from '../lib/supabase';

export function HistoryPanel() {
  const [history, setHistory] = useState<Analysis[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadHistory();
  }, []);

  async function loadHistory() {
    const { data } = await supabase
      .from('analyses')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(10);
    setHistory(data || []);
    setLoading(false);
  }

  if (loading) {
    return (
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
        <div className="h-4 bg-slate-800 rounded w-32 mb-4 animate-pulse" />
        {[1,2,3].map(i => (
          <div key={i} className="h-12 bg-slate-800 rounded-xl mb-2 animate-pulse" />
        ))}
      </div>
    );
  }

  if (history.length === 0) {
    return (
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-center">
        <Clock size={24} className="text-slate-600 mx-auto mb-2" />
        <p className="text-slate-500 text-sm">No analyses yet. Run your first check above.</p>
      </div>
    );
  }

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
      <div className="flex items-center gap-2 mb-4">
        <Clock size={14} className="text-slate-400" />
        <h3 className="text-sm font-semibold text-white">Recent Analyses</h3>
      </div>
      <div className="space-y-2">
        {history.map(item => (
          <div key={item.id} className="flex items-start gap-3 p-3 bg-slate-800/50 rounded-xl hover:bg-slate-800 transition-colors">
            <div className={`mt-0.5 flex-shrink-0 ${item.prediction === 'FAKE' ? 'text-rose-400' : 'text-emerald-400'}`}>
              {item.prediction === 'FAKE'
                ? <ShieldAlert size={15} />
                : <ShieldCheck size={15} />
              }
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 mb-0.5">
                <span className={`text-xs font-bold ${item.prediction === 'FAKE' ? 'text-rose-400' : 'text-emerald-400'}`}>
                  {item.prediction}
                </span>
                <span className="text-xs text-slate-500">{Math.round(item.confidence * 100)}%</span>
                <span className="text-xs text-slate-600 ml-auto">{item.response_time_ms}ms</span>
              </div>
              <p className="text-slate-400 text-xs truncate">{item.input_text.substring(0, 80)}...</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
