import { useState, useEffect } from 'react';
import BottomNav from './components/BottomNav';
import Dashboard from './components/Dashboard';
import LogWeight from './components/LogWeight';
import Goals from './components/Goals';
import DietPlan from './components/DietPlan';
import Exercise from './components/Exercise';
import HealthProfile from './components/HealthProfile';
import ProgressPhotos from './components/ProgressPhotos';
import AITrainer from './components/AITrainer';
import SettingsPage from './components/SettingsPage';

function useLocalStorage(key, defaultValue) {
  const [value, setValue] = useState(() => {
    try {
      const stored = localStorage.getItem(key);
      return stored ? JSON.parse(stored) : defaultValue;
    } catch { return defaultValue; }
  });
  useEffect(() => { localStorage.setItem(key, JSON.stringify(value)); }, [key, value]);
  return [value, setValue];
}

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [toast, setToast] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [weightEntries, setWeightEntries] = useLocalStorage('fitglow-weights', []);
  const [profile, setProfile] = useLocalStorage('fitglow-profile', {
    name: '', age: '', height: 165, gender: 'female', activityLevel: 'moderate',
    goalWeight: null, weeklyTarget: 0.5, conditions: ['sciatica'],
    dietPrefs: ['no-beef', 'chicken', 'fish', 'mutton', 'eggs', 'dairy'],
    country: 'India', painNotes: '',
  });

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 2500);
  };

  const navigate = (tab) => {
    if (tab === activeTab) return;
    setDrawerOpen(false);
    setIsTransitioning(true);
    setTimeout(() => { setActiveTab(tab); setIsTransitioning(false); }, 120);
  };

  const handleLogWeight = (entry) => {
    setWeightEntries(prev => [...prev, entry]);
    showToast('Weight logged!');
  };

  const renderContent = () => {
    const p = { showToast, navigate };
    switch (activeTab) {
      case 'dashboard': return <Dashboard weightEntries={weightEntries} profile={profile} navigate={navigate} />;
      case 'log': return <LogWeight onLog={handleLogWeight} {...p} />;
      case 'goals': return <Goals profile={profile} setProfile={setProfile} weightEntries={weightEntries} {...p} />;
      case 'diet': return <DietPlan profile={profile} />;
      case 'exercise': return <Exercise />;
      case 'health': return <HealthProfile profile={profile} setProfile={setProfile} {...p} />;
      case 'progress': return <ProgressPhotos weightEntries={weightEntries} />;
      case 'trainer': return <AITrainer profile={profile} weightEntries={weightEntries} />;
      case 'settings': return <SettingsPage weightEntries={weightEntries} setWeightEntries={setWeightEntries} profile={profile} setProfile={setProfile} {...p} />;
      default: return <Dashboard weightEntries={weightEntries} profile={profile} navigate={navigate} />;
    }
  };

  return (
    <div className="min-h-dvh gradient-bg relative">
      <div className="blob w-[350px] h-[350px] bg-purple-600 -top-32 -right-32" />
      <div className="blob w-[280px] h-[280px] bg-teal-600 bottom-32 -left-20" style={{ animationDelay: '8s' }} />
      <div className="blob w-[200px] h-[200px] bg-indigo-600 top-1/2 left-1/2" style={{ animationDelay: '16s' }} />

      <main className="relative" style={{ paddingBottom: 'calc(var(--nav-height) + var(--safe-bottom) + 16px)' }}>
        <div className={`transition-all duration-200 ease-out ${isTransitioning ? 'opacity-0 scale-[0.98]' : 'opacity-100 scale-100'}`}>
          {renderContent()}
        </div>
      </main>

      <BottomNav activeTab={activeTab} setActiveTab={navigate} drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen} />

      {toast && (
        <div className="fixed left-4 right-4 z-[200] animate-slide-up" style={{ bottom: 'calc(var(--nav-height) + var(--safe-bottom) + 12px)' }}>
          <div className={`mx-auto max-w-sm glass px-5 py-3.5 flex items-center gap-3 ${
            toast.type === 'success' ? 'border-emerald-500/30' : 'border-red-500/30'
          }`} style={{ borderRadius: '16px', background: 'rgba(6,2,15,0.9)' }}>
            <div className={`w-2.5 h-2.5 rounded-full shrink-0 ${toast.type === 'success' ? 'bg-emerald-400 shadow-lg shadow-emerald-400/50' : 'bg-red-400 shadow-lg shadow-red-400/50'}`} />
            <span className="text-sm font-semibold">{toast.msg}</span>
          </div>
        </div>
      )}
    </div>
  );
}
