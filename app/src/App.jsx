import { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
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
    } catch {
      return defaultValue;
    }
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [prevTab, setPrevTab] = useState('dashboard');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [toast, setToast] = useState(null);
  const [weightEntries, setWeightEntries] = useLocalStorage('fitglow-weights', []);
  const [profile, setProfile] = useLocalStorage('fitglow-profile', {
    name: '',
    age: '',
    height: 165,
    gender: 'female',
    activityLevel: 'moderate',
    goalWeight: null,
    weeklyTarget: 0.5,
    conditions: ['sciatica'],
    dietPrefs: ['no-beef', 'chicken', 'fish', 'mutton', 'eggs', 'dairy'],
    country: 'India',
    painNotes: '',
  });

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleTabChange = (tab) => {
    if (tab === activeTab) return;
    setIsTransitioning(true);
    setPrevTab(activeTab);
    setTimeout(() => {
      setActiveTab(tab);
      setIsTransitioning(false);
    }, 150);
  };

  const handleLogWeight = (entry) => {
    setWeightEntries(prev => [...prev, entry]);
    showToast('Weight logged successfully!');
  };

  const renderContent = () => {
    const props = { showToast };
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard weightEntries={weightEntries} profile={profile} onTabChange={handleTabChange} />;
      case 'log':
        return <LogWeight onLog={handleLogWeight} {...props} />;
      case 'goals':
        return <Goals profile={profile} setProfile={setProfile} weightEntries={weightEntries} {...props} />;
      case 'diet':
        return <DietPlan profile={profile} />;
      case 'exercise':
        return <Exercise />;
      case 'health':
        return <HealthProfile profile={profile} setProfile={setProfile} {...props} />;
      case 'progress':
        return <ProgressPhotos weightEntries={weightEntries} />;
      case 'trainer':
        return <AITrainer profile={profile} weightEntries={weightEntries} />;
      case 'settings':
        return <SettingsPage
          weightEntries={weightEntries} setWeightEntries={setWeightEntries}
          profile={profile} setProfile={setProfile} {...props}
        />;
      default:
        return <Dashboard weightEntries={weightEntries} profile={profile} onTabChange={handleTabChange} />;
    }
  };

  return (
    <div className="min-h-screen gradient-bg relative overflow-hidden">
      <div className="blob w-[600px] h-[600px] bg-purple-600 -top-64 -right-64" />
      <div className="blob w-[500px] h-[500px] bg-teal-600 bottom-0 -left-48" style={{ animationDelay: '5s' }} />
      <div className="blob w-[400px] h-[400px] bg-indigo-600 top-1/3 right-1/3" style={{ animationDelay: '10s' }} />
      <div className="blob w-[300px] h-[300px] bg-fuchsia-600 bottom-1/4 right-1/4" style={{ animationDelay: '15s' }} />

      <Sidebar activeTab={activeTab} setActiveTab={handleTabChange} />

      <main
        className="relative"
        style={{ marginLeft: '280px', minHeight: '100vh', padding: '2rem 2.5rem 2rem 2rem' }}
      >
        <div
          className={`transition-all duration-300 ease-out ${
            isTransitioning ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'
          }`}
        >
          {renderContent()}
        </div>
      </main>

      {toast && (
        <div className="fixed bottom-6 right-6 z-[100] animate-scale-in">
          <div className={`glass-strong px-5 py-3 flex items-center gap-3 shadow-2xl ${
            toast.type === 'success' ? 'border-emerald-500/30' : 'border-red-500/30'
          }`} style={{ borderRadius: '16px' }}>
            <div className={`w-2 h-2 rounded-full ${
              toast.type === 'success' ? 'bg-emerald-400' : 'bg-red-400'
            }`} />
            <span className="text-sm font-medium">{toast.message}</span>
          </div>
        </div>
      )}
    </div>
  );
}
