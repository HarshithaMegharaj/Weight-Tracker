import { useState } from 'react';
import { Trash2, Download, Upload, Database, BarChart3 } from 'lucide-react';

export default function SettingsPage({ weightEntries, setWeightEntries, profile, setProfile, showToast }) {
  const [confirmClear, setConfirmClear] = useState(false);

  const handleExport = () => {
    const data = JSON.stringify({ weightEntries, profile }, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `fitglow-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast?.('Data exported!');
  };

  const handleImport = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const data = JSON.parse(ev.target.result);
        if (data.weightEntries) setWeightEntries(data.weightEntries);
        if (data.profile) setProfile(data.profile);
        showToast?.('Data imported!');
      } catch {
        showToast?.('Invalid backup file');
      }
    };
    reader.readAsText(file);
  };

  const handleClearData = () => {
    if (confirmClear) {
      setWeightEntries([]);
      setProfile({ height: 165, goalWeight: null, conditions: ['sciatica'], dietPrefs: ['no-beef', 'chicken', 'fish', 'mutton'] });
      localStorage.removeItem('fitglow-weights');
      localStorage.removeItem('fitglow-profile');
      setConfirmClear(false);
      showToast?.('All data cleared');
    } else {
      setConfirmClear(true);
      setTimeout(() => setConfirmClear(false), 3000);
    }
  };

  const statItems = [
    { label: 'Total entries', value: weightEntries.length },
    { label: 'Photos', value: weightEntries.filter(e => e.image).length },
    { label: 'Days tracked', value: weightEntries.length > 0 ? new Set(weightEntries.map(e => e.date)).size : 0 },
    { label: 'Moods logged', value: new Set(weightEntries.map(e => e.mood).filter(Boolean)).size },
  ];

  return (
    <div style={{ padding: "24px 20px 0" }} className="space-y-5">
      <div className="animate-fade-in-up">
        <p className="text-[11px] text-purple-400 font-bold uppercase tracking-widest">Preferences</p>
        <h1 className="text-[28px] font-extrabold mt-1">Settings</h1>
      </div>

      <div className="glass-card p-5 space-y-2.5 animate-fade-in-up stagger-1">
        <h3 className="text-[13px] font-bold flex items-center gap-2.5 mb-3">
          <div className="w-9 h-9 rounded-[12px] bg-gradient-to-br from-purple-500/20 to-indigo-500/10 flex items-center justify-center border border-purple-500/10">
            <Database size={15} className="text-purple-400" />
          </div>
          Data Management
        </h3>

        <button onClick={handleExport}
          className="w-full flex items-center gap-3.5 p-4 rounded-[16px] bg-white/[0.02] border border-white/[0.04] cursor-pointer active:bg-white/[0.06] active:scale-[0.98] transition-all">
          <div className="w-10 h-10 rounded-[12px] bg-gradient-to-br from-emerald-500/20 to-teal-500/10 flex items-center justify-center border border-emerald-500/10 shrink-0">
            <Download size={16} className="text-emerald-400" />
          </div>
          <div className="text-left">
            <p className="text-[13px] font-bold">Export Data</p>
            <p className="text-[11px] text-[var(--text-dim)] mt-0.5">Download JSON backup</p>
          </div>
        </button>

        <label className="w-full flex items-center gap-3.5 p-4 rounded-[16px] bg-white/[0.02] border border-white/[0.04] cursor-pointer active:bg-white/[0.06] active:scale-[0.98] transition-all">
          <div className="w-10 h-10 rounded-[12px] bg-gradient-to-br from-blue-500/20 to-cyan-500/10 flex items-center justify-center border border-blue-500/10 shrink-0">
            <Upload size={16} className="text-blue-400" />
          </div>
          <div className="text-left">
            <p className="text-[13px] font-bold">Import Data</p>
            <p className="text-[11px] text-[var(--text-dim)] mt-0.5">Restore from backup</p>
          </div>
          <input type="file" accept=".json" onChange={handleImport} className="hidden" />
        </label>

        <button onClick={handleClearData}
          className={`w-full flex items-center gap-3.5 p-4 rounded-[16px] cursor-pointer active:scale-[0.98] transition-all
            ${confirmClear
              ? 'bg-red-500/10 border border-red-500/25'
              : 'bg-white/[0.02] border border-white/[0.04] active:bg-white/[0.06]'}`}>
          <div className="w-10 h-10 rounded-[12px] bg-red-500/15 flex items-center justify-center border border-red-500/10 shrink-0">
            <Trash2 size={16} className="text-red-400" />
          </div>
          <div className="text-left">
            <p className="text-[13px] font-bold text-red-400">
              {confirmClear ? 'Tap again to confirm' : 'Clear All Data'}
            </p>
            <p className="text-[11px] text-[var(--text-dim)] mt-0.5">Cannot be undone</p>
          </div>
        </button>
      </div>

      <div className="glass-card p-5 animate-fade-in-up stagger-2">
        <h3 className="text-[13px] font-bold flex items-center gap-2.5 mb-4">
          <div className="w-9 h-9 rounded-[12px] bg-gradient-to-br from-indigo-500/20 to-purple-500/10 flex items-center justify-center border border-indigo-500/10">
            <BarChart3 size={15} className="text-indigo-400" />
          </div>
          Statistics
        </h3>
        <div className="grid grid-cols-2 gap-2.5">
          {statItems.map((stat, i) => (
            <div key={i} className="p-4 rounded-[14px] bg-white/[0.02] border border-white/[0.04] text-center">
              <p className="text-xl font-extrabold">{stat.value}</p>
              <p className="text-[10px] text-[var(--text-dim)] font-semibold mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="glass-card p-5 animate-fade-in-up stagger-3">
        <p className="text-[11px] text-[var(--text-dim)] text-center font-semibold">FitGlow v1.0</p>
        <p className="text-[10px] text-[var(--text-dim)]/50 text-center mt-1">Your personal fitness companion</p>
      </div>
    </div>
  );
}
