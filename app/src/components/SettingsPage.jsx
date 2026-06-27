import { useState } from 'react';
import { Settings, Trash2, Download, Upload } from 'lucide-react';

export default function SettingsPage({ weightEntries, setWeightEntries, profile, setProfile }) {
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
      } catch {
        alert('Invalid backup file');
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
    } else {
      setConfirmClear(true);
      setTimeout(() => setConfirmClear(false), 3000);
    }
  };

  return (
    <div className="max-w-lg mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-1">Settings</h2>
        <p className="text-gray-400 text-sm">Manage your data and preferences</p>
      </div>

      <div className="glass p-6 space-y-4">
        <h3 className="font-semibold flex items-center gap-2">
          <Settings size={18} className="text-purple-400" /> Data Management
        </h3>

        <div className="space-y-3">
          <button
            onClick={handleExport}
            className="w-full flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 cursor-pointer transition-colors"
          >
            <Download size={18} className="text-emerald-400" />
            <div className="text-left">
              <p className="text-sm font-medium">Export Data</p>
              <p className="text-xs text-gray-400">Download all your data as JSON</p>
            </div>
          </button>

          <label className="w-full flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 cursor-pointer transition-colors">
            <Upload size={18} className="text-blue-400" />
            <div className="text-left">
              <p className="text-sm font-medium">Import Data</p>
              <p className="text-xs text-gray-400">Restore from a backup file</p>
            </div>
            <input type="file" accept=".json" onChange={handleImport} className="hidden" />
          </label>

          <button
            onClick={handleClearData}
            className={`w-full flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-colors
              ${confirmClear ? 'bg-red-500/20 border border-red-500/30' : 'bg-white/5 hover:bg-white/10'}`}
          >
            <Trash2 size={18} className="text-red-400" />
            <div className="text-left">
              <p className="text-sm font-medium text-red-400">
                {confirmClear ? 'Click again to confirm' : 'Clear All Data'}
              </p>
              <p className="text-xs text-gray-400">This action cannot be undone</p>
            </div>
          </button>
        </div>
      </div>

      <div className="glass p-6">
        <h3 className="font-semibold mb-3">Stats</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between text-gray-300">
            <span>Total entries</span><span className="font-medium">{weightEntries.length}</span>
          </div>
          <div className="flex justify-between text-gray-300">
            <span>Photos uploaded</span><span className="font-medium">{weightEntries.filter(e => e.image).length}</span>
          </div>
          <div className="flex justify-between text-gray-300">
            <span>Days tracked</span>
            <span className="font-medium">
              {weightEntries.length > 0
                ? new Set(weightEntries.map(e => e.date)).size
                : 0}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
