import { useState } from 'react';
import { Target, TrendingDown, Calendar, Award, Check } from 'lucide-react';

export default function Goals({ profile, setProfile, weightEntries, showToast }) {
  const [goalWeight, setGoalWeight] = useState(profile.goalWeight || '');
  const [weeklyTarget, setWeeklyTarget] = useState(profile.weeklyTarget || '0.5');
  const [saved, setSaved] = useState(false);

  const currentWeight = weightEntries.length > 0
    ? [...weightEntries].sort((a, b) => new Date(b.date) - new Date(a.date))[0].weight
    : null;

  const remaining = currentWeight && goalWeight ? (currentWeight - goalWeight).toFixed(1) : null;
  const weeksNeeded = remaining && weeklyTarget ? Math.ceil(remaining / parseFloat(weeklyTarget)) : null;

  const handleSave = (e) => {
    e.preventDefault();
    setProfile(prev => ({
      ...prev,
      goalWeight: parseFloat(goalWeight),
      weeklyTarget: parseFloat(weeklyTarget),
    }));
    setSaved(true);
    showToast?.('Goals saved successfully!');
    setTimeout(() => setSaved(false), 2000);
  };

  const progressPercent = currentWeight && profile.goalWeight && weightEntries.length > 1
    ? Math.min(100, Math.max(0,
        ((weightEntries[0].weight - currentWeight) / (weightEntries[0].weight - profile.goalWeight)) * 100
      ))
    : 0;

  const circumference = 2 * Math.PI * 54;
  const dashOffset = circumference - (progressPercent / 100) * circumference;

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="animate-fade-in-up">
        <h2 className="text-3xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>Goals</h2>
        <p className="text-gray-500 text-sm mt-1">Set your targets and track progress</p>
      </div>

      {profile.goalWeight && currentWeight && (
        <div className="glass-card p-8 animate-fade-in-up stagger-1">
          <div className="flex items-center gap-8">
            <div className="relative shrink-0">
              <svg width="128" height="128" viewBox="0 0 128 128" className="-rotate-90">
                <circle cx="64" cy="64" r="54" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="8" />
                <circle
                  cx="64" cy="64" r="54" fill="none"
                  stroke="url(#progressGrad)" strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  strokeDashoffset={dashOffset}
                  className="transition-all duration-1000"
                />
                <defs>
                  <linearGradient id="progressGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#A78BFA" />
                    <stop offset="100%" stopColor="#34D399" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-bold">{progressPercent.toFixed(0)}%</span>
                <span className="text-[10px] text-gray-500 font-medium">complete</span>
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>Progress to Goal</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-gray-400">
                  <span>Start weight</span>
                  <span className="font-medium text-gray-300">{weightEntries[0]?.weight} kg</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Current weight</span>
                  <span className="font-medium text-gray-300">{currentWeight} kg</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Goal weight</span>
                  <span className="font-medium text-purple-300">{profile.goalWeight} kg</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 animate-fade-in-up stagger-2">
        {[
          { icon: TrendingDown, label: 'Remaining', value: remaining > 0 ? remaining : '0', unit: 'kg', gradient: 'from-emerald-500 to-teal-600' },
          { icon: Calendar, label: 'Estimated', value: weeksNeeded || '--', unit: 'weeks', gradient: 'from-blue-500 to-cyan-600' },
          { icon: Award, label: 'Weekly Target', value: weeklyTarget, unit: 'kg/week', gradient: 'from-amber-500 to-orange-600' },
        ].map((stat, i) => (
          <div key={i} className="glass-card p-6 text-center">
            <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center mx-auto mb-3 shadow-lg`}>
              <stat.icon size={20} className="text-white" />
            </div>
            <p className="text-2xl font-bold">{stat.value}</p>
            <p className="text-xs text-gray-500 mt-1">{stat.unit}</p>
            <p className="text-[10px] text-gray-600 mt-2 uppercase tracking-wider font-semibold">{stat.label}</p>
          </div>
        ))}
      </div>

      <form onSubmit={handleSave} className="glass-card p-8 space-y-6 animate-fade-in-up stagger-3">
        <h3 className="text-lg font-semibold" style={{ fontFamily: "'Playfair Display', serif" }}>Set Your Goals</h3>

        <div>
          <label htmlFor="goalWeight" className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
            Goal Weight (kg)
          </label>
          <input
            id="goalWeight" type="number" step="0.5" min="30" max="200"
            value={goalWeight} onChange={(e) => setGoalWeight(e.target.value)}
            placeholder="Your target weight" required
            className="input-field text-lg font-semibold"
          />
        </div>

        <div>
          <label htmlFor="weeklyTarget" className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
            Weekly Loss Target
          </label>
          <select
            id="weeklyTarget" value={weeklyTarget}
            onChange={(e) => setWeeklyTarget(e.target.value)}
            className="input-field cursor-pointer"
          >
            <option value="0.25">0.25 kg/week — Gentle & Sustainable</option>
            <option value="0.5">0.5 kg/week — Recommended</option>
            <option value="0.75">0.75 kg/week — Moderate</option>
            <option value="1">1 kg/week — Aggressive</option>
          </select>
        </div>

        <button
          type="submit"
          className={`w-full py-4 rounded-2xl font-semibold text-white cursor-pointer
            transition-all duration-300 flex items-center justify-center gap-2 text-sm
            ${saved ? 'bg-emerald-600 glow-accent' : 'btn-primary'}`}
        >
          {saved ? <><Check size={18} /> Goals Saved!</> : 'Save Goals'}
        </button>
      </form>
    </div>
  );
}
