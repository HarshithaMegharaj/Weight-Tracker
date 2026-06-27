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

  const handleLogWeight = (entry) => {
    setWeightEntries(prev => [...prev, entry]);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard weightEntries={weightEntries} profile={profile} />;
      case 'log':
        return <LogWeight onLog={handleLogWeight} />;
      case 'goals':
        return <Goals profile={profile} setProfile={setProfile} weightEntries={weightEntries} />;
      case 'diet':
        return <DietPlan profile={profile} />;
      case 'exercise':
        return <Exercise />;
      case 'health':
        return <HealthProfile profile={profile} setProfile={setProfile} />;
      case 'progress':
        return <ProgressPhotos weightEntries={weightEntries} />;
      case 'trainer':
        return <AITrainer profile={profile} weightEntries={weightEntries} />;
      case 'settings':
        return <SettingsPage
          weightEntries={weightEntries} setWeightEntries={setWeightEntries}
          profile={profile} setProfile={setProfile}
        />;
      default:
        return <Dashboard weightEntries={weightEntries} profile={profile} />;
    }
  };

  return (
    <div className="min-h-screen gradient-bg relative overflow-hidden">
      <div className="blob w-96 h-96 bg-purple-600 -top-48 -right-48" />
      <div className="blob w-80 h-80 bg-emerald-600 bottom-20 -left-40" style={{ animationDelay: '2s' }} />
      <div className="blob w-64 h-64 bg-blue-600 top-1/2 right-1/4" style={{ animationDelay: '4s' }} />

      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main
        className="relative"
        style={{ marginLeft: '256px', minHeight: '100vh', padding: '2rem 2.5rem' }}
      >
        {renderContent()}
      </main>
    </div>
  );
}
