import { useState, useEffect, useCallback } from 'react';
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
  const [prevTab, setPrevTab] = useState('dashboard');
  const [animState, setAnimState] = useState('visible');
  const [toast, setToast] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [weightEntries, setWeightEntries] = useLocalStorage('fitglow-weights', []);
  const [profile, setProfile] = useLocalStorage('fitglow-profile', {
    name: '', age: '', height: 165, gender: 'female', activityLevel: 'moderate',
    goalWeight: null, weeklyTarget: 0.5, conditions: ['sciatica'],
    dietPrefs: ['no-beef', 'chicken', 'fish', 'mutton', 'eggs', 'dairy'],
    country: 'India', painNotes: '',
  });

  const showToast = useCallback((msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 2500);
  }, []);

  const navigate = useCallback((tab) => {
    if (tab === activeTab) return;
    setDrawerOpen(false);
    setAnimState('hiding');
    setTimeout(() => {
      setPrevTab(activeTab);
      setActiveTab(tab);
      setAnimState('entering');
      window.scrollTo({ top: 0 });
      setTimeout(() => setAnimState('visible'), 50);
    }, 150);
  }, [activeTab]);

  const handleLogWeight = useCallback((entry) => {
    setWeightEntries(prev => [...prev, entry]);
    showToast('Weight logged successfully!');
  }, [showToast, setWeightEntries]);

  const renderContent = () => {
    const p = { showToast, navigate };
    switch (activeTab) {
      case 'dashboard': return <Dashboard weightEntries={weightEntries} profile={profile} navigate={navigate} />;
      case 'log': return <LogWeight onLog={handleLogWeight} profile={profile} {...p} />;
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

      <main className="relative overflow-x-hidden" style={{ paddingBottom: 'calc(var(--nav-height) + var(--safe-bottom) + 20px)' }}>
        <div className={`transition-all duration-200 ease-out ${
          animState === 'hiding' ? 'opacity-0 scale-[0.97] translate-y-2' :
          animState === 'entering' ? 'opacity-0 scale-[0.97]' :
          'opacity-100 scale-100 translate-y-0'
        }`}>
          {renderContent()}
        </div>
      </main>

      <BottomNav activeTab={activeTab} setActiveTab={navigate} drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen} />

      {toast && (
        <div className="fixed left-4 right-4 z-[200] animate-slide-up" style={{ bottom: 'calc(var(--nav-height) + var(--safe-bottom) + 16px)' }}>
          <div className={`mx-auto max-w-sm px-5 py-4 flex items-center gap-3 rounded-2xl shadow-2xl ${
            toast.type === 'success'
              ? 'bg-emerald-500/15 border border-emerald-500/30 shadow-emerald-500/10'
              : 'bg-red-500/15 border border-red-500/30 shadow-red-500/10'
          }`} style={{ backdropFilter: 'blur(40px)', WebkitBackdropFilter: 'blur(40px)' }}>
            <div className={`w-2.5 h-2.5 rounded-full shrink-0 ${
              toast.type === 'success'
                ? 'bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.5)]'
                : 'bg-red-400 shadow-[0_0_12px_rgba(248,113,113,0.5)]'
            }`} />
            <span className="text-[13px] font-bold">{toast.msg}</span>
          </div>
        </div>
      )}
    </div>
  );
}
