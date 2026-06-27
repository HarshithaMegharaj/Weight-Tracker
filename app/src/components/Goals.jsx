import { useState } from 'react';
import { Target, TrendingDown, Calendar, Award } from 'lucide-react';

export default function Goals({ profile, setProfile, weightEntries }) {
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
    setTimeout(() => setSaved(false), 2000);
  };

  const progressPercent = currentWeight && profile.goalWeight && weightEntries.length > 1
    ? Math.min(100, Math.max(0,
        ((weightEntries[0].weight - currentWeight) / (weightEntries[0].weight - profile.goalWeight)) * 100
      ))
    : 0;

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-1">Goals</h2>
        <p className="text-gray-400 text-sm">Set your targets and track progress</p>
      </div>

      {profile.goalWeight && currentWeight && (
        <div className="glass p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Progress to Goal</h3>
            <span className="text-sm text-purple-300">{progressPercent.toFixed(0)}%</span>
          </div>
          <div className="w-full h-3 rounded-full bg-white/10 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-purple-500 to-emerald-500 transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <div className="flex justify-between mt-2 text-xs text-gray-400">
            <span>Start: {weightEntries[0]?.weight} kg</span>
            <span>Goal: {profile.goalWeight} kg</span>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="glass p-5 text-center">
          <TrendingDown size={24} className="text-emerald-400 mx-auto mb-2" />
          <p className="text-2xl font-bold">{remaining > 0 ? remaining : '0'}</p>
          <p className="text-xs text-gray-400 mt-1">kg remaining</p>
        </div>
        <div className="glass p-5 text-center">
          <Calendar size={24} className="text-blue-400 mx-auto mb-2" />
          <p className="text-2xl font-bold">{weeksNeeded || '--'}</p>
          <p className="text-xs text-gray-400 mt-1">weeks estimated</p>
        </div>
        <div className="glass p-5 text-center">
          <Award size={24} className="text-yellow-400 mx-auto mb-2" />
          <p className="text-2xl font-bold">{weeklyTarget}</p>
          <p className="text-xs text-gray-400 mt-1">kg/week target</p>
        </div>
      </div>

      <form onSubmit={handleSave} className="glass p-6 space-y-5">
        <h3 className="text-lg font-semibold">Set Your Goals</h3>

        <div>
          <label htmlFor="goalWeight" className="block text-sm font-medium text-gray-300 mb-2">Goal Weight (kg)</label>
          <input
            id="goalWeight"
            type="number"
            step="0.5"
            min="30"
            max="200"
            value={goalWeight}
            onChange={(e) => setGoalWeight(e.target.value)}
            placeholder="Your target weight"
            required
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10
              focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none
              text-white placeholder-gray-500 transition-colors"
          />
        </div>

        <div>
          <label htmlFor="weeklyTarget" className="block text-sm font-medium text-gray-300 mb-2">
            Weekly Weight Loss Target (kg)
          </label>
          <select
            id="weeklyTarget"
            value={weeklyTarget}
            onChange={(e) => setWeeklyTarget(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10
              focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none
              text-white transition-colors cursor-pointer"
          >
            <option value="0.25">0.25 kg/week (Gentle)</option>
            <option value="0.5">0.5 kg/week (Recommended)</option>
            <option value="0.75">0.75 kg/week (Moderate)</option>
            <option value="1">1 kg/week (Aggressive)</option>
          </select>
        </div>

        <button
          type="submit"
          className={`w-full py-3 rounded-xl font-semibold text-white cursor-pointer
            transition-all duration-200
            ${saved ? 'bg-emerald-600' : 'bg-purple-600 hover:bg-purple-500'}`}
        >
          {saved ? 'Goals Saved!' : 'Save Goals'}
        </button>
      </form>
    </div>
  );
}
