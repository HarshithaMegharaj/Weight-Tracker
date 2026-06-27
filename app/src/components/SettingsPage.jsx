import { useState } from 'react';
import { Settings, Trash2, Download, Upload, Database, Check } from 'lucide-react';

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
    showToast?.('Data exported successfully!');
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
        showToast?.('Data imported successfully!');
      } catch {
        showToast?.('Invalid backup file', 'error');
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
    { label: 'Photos uploaded', value: weightEntries.filter(e => e.image).length },
    { label: 'Days tracked', value: weightEntries.length > 0 ? new Set(weightEntries.map(e => e.date)).size : 0 },
    { label: 'Unique moods logged', value: new Set(weightEntries.map(e => e.mood).filter(Boolean)).size },
  ];

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <div className="animate-fade-in-up">
        <h2 className="text-3xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>Settings</h2>
        <p className="text-gray-500 text-sm mt-1">Manage your data and preferences</p>
      </div>

      <div className="glass-card p-7 space-y-3 animate-fade-in-up stagger-1">
        <h3 className="font-semibold flex items-center gap-3 text-sm mb-4">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-500/20 to-indigo-500/10 flex items-center justify-center">
            <Database size={16} className="text-purple-400" />
          </div>
          Data Management
        </h3>

        <button
          onClick={handleExport}
          className="w-full flex items-center gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.04] hover:border-white/[0.1] cursor-pointer transition-all duration-200 group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/10 flex items-center justify-center group-hover:from-emerald-500/30 transition-colors">
            <Download size={16} className="text-emerald-400" />
          </div>
          <div className="text-left">
            <p className="text-sm font-semibold text-gray-200">Export Data</p>
            <p className="text-xs text-gray-500 mt-0.5">Download all your data as JSON backup</p>
          </div>
        </button>

        <label className="w-full flex items-center gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.04] hover:border-white/[0.1] cursor-pointer transition-all duration-200 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/10 flex items-center justify-center group-hover:from-blue-500/30 transition-colors">
            <Upload size={16} className="text-blue-400" />
          </div>
          <div className="text-left">
            <p className="text-sm font-semibold text-gray-200">Import Data</p>
            <p className="text-xs text-gray-500 mt-0.5">Restore from a backup file</p>
          </div>
          <input type="file" accept=".json" onChange={handleImport} className="hidden" />
        </label>

        <button
          onClick={handleClearData}
          className={`w-full flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-all duration-200
            ${confirmClear
              ? 'bg-red-500/10 border border-red-500/25'
              : 'bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.04] hover:border-white/[0.1]'}`}
        >
          <div className="w-10 h-10 rounded-xl bg-red-500/15 flex items-center justify-center">
            <Trash2 size={16} className="text-red-400" />
          </div>
          <div className="text-left">
            <p className="text-sm font-semibold text-red-400">
              {confirmClear ? 'Click again to confirm deletion' : 'Clear All Data'}
            </p>
            <p className="text-xs text-gray-500 mt-0.5">This action cannot be undone</p>
          </div>
        </button>
      </div>

      <div className="glass-card p-7 animate-fade-in-up stagger-2">
        <h3 className="font-semibold text-sm mb-4 flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/10 flex items-center justify-center">
            <Settings size={16} className="text-indigo-400" />
          </div>
          Statistics
        </h3>
        <div className="grid grid-cols-2 gap-3">
          {statItems.map((stat, i) => (
            <div key={i} className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.04] text-center">
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-xs text-gray-500 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
