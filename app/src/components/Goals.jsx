import { useState } from 'react';
import { Target, TrendingDown, Calendar, Award, Check } from 'lucide-react';

export default function Goals({ profile, setProfile, weightEntries, showToast }) {
  const [goalWeight, setGoalWeight] = useState(profile.goalWeight || '');
  const [weeklyTarget, setWeeklyTarget] = useState(profile.weeklyTarget || '0.5');
  const [saved, setSaved] = useState(false);

  const currentWeight = weightEntries.length > 0 ? [...weightEntries].sort((a, b) => new Date(b.date) - new Date(a.date))[0].weight : null;
  const remaining = currentWeight && goalWeight ? (currentWeight - goalWeight).toFixed(1) : null;
  const weeksNeeded = remaining && weeklyTarget ? Math.ceil(remaining / parseFloat(weeklyTarget)) : null;
  const progressPercent = currentWeight && profile.goalWeight && weightEntries.length > 1
    ? Math.min(100, Math.max(0, ((weightEntries[0].weight - currentWeight) / (weightEntries[0].weight - profile.goalWeight)) * 100))
    : 0;
  const circ = 2 * Math.PI * 50;
  const offset = circ - (progressPercent / 100) * circ;

  const save = (e) => {
    e.preventDefault();
    setProfile(p => ({ ...p, goalWeight: parseFloat(goalWeight), weeklyTarget: parseFloat(weeklyTarget) }));
    setSaved(true); showToast?.('Goals saved!');
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="px-5 pt-6 space-y-5">
      <div className="animate-fade-in-up">
        <p className="text-[11px] text-purple-400 font-bold uppercase tracking-widest">Track Progress</p>
        <h1 className="text-[28px] font-extrabold mt-1">Goals</h1>
      </div>

      {profile.goalWeight && currentWeight && (
        <div className="glass-card p-6 flex items-center gap-6 animate-fade-in-up stagger-1">
          <div className="relative shrink-0">
            <svg width="108" height="108" viewBox="0 0 108 108" className="-rotate-90">
              <circle cx="54" cy="54" r="50" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="7" />
              <circle cx="54" cy="54" r="50" fill="none" stroke="url(#pg)" strokeWidth="7" strokeLinecap="round"
                strokeDasharray={circ} strokeDashoffset={offset} className="transition-all duration-700" />
              <defs><linearGradient id="pg" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stopColor="#8B5CF6" /><stop offset="100%" stopColor="#2DD4BF" /></linearGradient></defs>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-xl font-extrabold">{progressPercent.toFixed(0)}%</span>
              <span className="text-[9px] text-[var(--text-dim)] font-bold uppercase">done</span>
            </div>
          </div>
          <div className="flex-1 space-y-2 text-[13px]">
            <div className="flex justify-between"><span className="text-[var(--text-sub)]">Start</span><span className="font-bold">{weightEntries[0]?.weight} kg</span></div>
            <div className="flex justify-between"><span className="text-[var(--text-sub)]">Now</span><span className="font-bold">{currentWeight} kg</span></div>
            <div className="flex justify-between"><span className="text-[var(--text-sub)]">Goal</span><span className="font-bold text-purple-300">{profile.goalWeight} kg</span></div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-3 gap-2.5 animate-fade-in-up stagger-2">
        {[
          { icon: TrendingDown, v: remaining > 0 ? remaining : '0', u: 'kg left', bg: 'bg-gradient-to-br from-emerald-500 to-teal-600' },
          { icon: Calendar, v: weeksNeeded || '--', u: 'weeks', bg: 'bg-gradient-to-br from-blue-500 to-cyan-600' },
          { icon: Award, v: weeklyTarget, u: 'kg/wk', bg: 'bg-gradient-to-br from-amber-500 to-orange-600' },
        ].map((s, i) => (
          <div key={i} className="glass-card p-4 text-center">
            <div className={`w-9 h-9 rounded-[12px] ${s.bg} flex items-center justify-center mx-auto mb-2`}>
              <s.icon size={16} className="text-white" />
            </div>
            <p className="text-lg font-extrabold">{s.v}</p>
            <p className="text-[10px] text-[var(--text-dim)] font-semibold mt-0.5">{s.u}</p>
          </div>
        ))}
      </div>

      <form onSubmit={save} className="glass-card p-6 space-y-5 animate-fade-in-up stagger-3">
        <h3 className="text-[15px] font-bold">Set Your Goals</h3>
        <div>
          <label className="block text-[11px] font-bold text-[var(--text-dim)] uppercase tracking-widest mb-2.5">Goal Weight (kg)</label>
          <input type="number" step="0.5" min="30" max="200" value={goalWeight} onChange={e => setGoalWeight(e.target.value)}
            placeholder="Target weight" required className="input-field text-lg font-bold" />
        </div>
        <div>
          <label className="block text-[11px] font-bold text-[var(--text-dim)] uppercase tracking-widest mb-2.5">Weekly Loss Target</label>
          <select value={weeklyTarget} onChange={e => setWeeklyTarget(e.target.value)} className="input-field cursor-pointer">
            <option value="0.25">0.25 kg/week — Gentle</option>
            <option value="0.5">0.5 kg/week — Recommended</option>
            <option value="0.75">0.75 kg/week — Moderate</option>
            <option value="1">1 kg/week — Aggressive</option>
          </select>
        </div>
        <button type="submit" className={`w-full py-4 rounded-2xl font-bold text-white cursor-pointer flex items-center justify-center gap-2 text-[15px] active:scale-[0.97] transition-all
          ${saved ? 'bg-emerald-600 shadow-lg shadow-emerald-500/30' : 'btn-primary'}`}>
          {saved ? <><Check size={16} /> Saved!</> : 'Save Goals'}
        </button>
      </form>
    </div>
  );
}
