import { useState } from 'react';
import { Dumbbell, Clock, Flame, AlertTriangle, CheckCircle, Play } from 'lucide-react';

const days = [
  { d: 'Mon', type: 'Cardio+Core', dur: '40m', cal: 300, ex: [
    { n: 'Brisk Walking', t: '20 min', note: 'Flat surface, good shoes' },
    { n: 'Swimming', t: '15 min', note: 'Best for sciatica — zero impact' },
    { n: 'Bird-Dog Hold', t: '3x30s', note: 'Core without back strain' },
    { n: 'Dead Bug', t: '3x10', note: 'Core stability, spine neutral' },
    { n: 'Cat-Cow Stretch', t: '2 min', note: 'Gentle spine mobility' },
  ]},
  { d: 'Tue', type: 'Upper Body', dur: '35m', cal: 250, ex: [
    { n: 'Wall Push-ups', t: '3x12', note: 'Progress gradually' },
    { n: 'Shoulder Press', t: '3x10', note: 'Keep back supported' },
    { n: 'Band Rows', t: '3x12', note: 'Great for posture' },
    { n: 'Bicep Curls', t: '3x10', note: 'Light weight, good form' },
    { n: 'Stretching', t: '5 min', note: 'Shoulders & neck' },
  ]},
  { d: 'Wed', type: 'Yoga', dur: '30m', cal: 150, ex: [
    { n: "Child's Pose", t: '2 min', note: 'Decompresses spine' },
    { n: 'Pigeon Pose', t: '2 min ea', note: 'Opens hips, relieves sciatica' },
    { n: 'Cobra Stretch', t: '3x30s', note: 'Comfortable range only' },
    { n: 'Supine Twist', t: '2 min ea', note: 'Lower back tension relief' },
    { n: 'Knee-to-Chest', t: '2 min ea', note: 'Direct sciatica relief' },
  ]},
  { d: 'Thu', type: 'Lower Body', dur: '35m', cal: 280, ex: [
    { n: 'Partial Squats', t: '3x12', note: 'Stay above parallel' },
    { n: 'Glute Bridges', t: '3x15', note: 'No back load' },
    { n: 'Clamshells', t: '3x15 ea', note: 'Hip stabilizers' },
    { n: 'Calf Raises', t: '3x15', note: 'Wall for balance' },
    { n: 'Shallow Lunges', t: '2x10', note: 'Upright torso' },
  ]},
  { d: 'Fri', type: 'HIIT', dur: '35m', cal: 350, ex: [
    { n: 'Cycling', t: '15 min', note: 'Low impact' },
    { n: 'Standing March', t: '3x1m', note: 'Controlled pace' },
    { n: 'Boxing Punches', t: '3x1m', note: 'No spine impact' },
    { n: 'Step-Ups', t: '3x10', note: 'Stable low step' },
    { n: 'Cool-down Walk', t: '5 min', note: 'Deep breathing' },
  ]},
  { d: 'Sat', type: 'Recovery', dur: '30m', cal: 150, ex: [
    { n: 'Gentle Walk', t: '20 min', note: 'Nature preferred' },
    { n: 'Full Stretch', t: '10 min', note: 'Focus tight areas' },
  ]},
  { d: 'Sun', type: 'Rest', dur: '--', cal: 0, ex: [
    { n: 'Complete Rest', t: '--', note: 'Recovery builds strength' },
    { n: 'Light stretch', t: '10 min', note: 'Only if comfortable' },
  ]},
];

const avoidList = ['Heavy deadlifts', 'Barbell heavy squats', 'Standing toe touches', 'Sit-ups / Crunches', 'Heavy leg press', 'Running on concrete', 'Shooting leg pain exercises', 'Loaded twisting'];

export default function Exercise() {
  const [sel, setSel] = useState(0);
  const plan = days[sel];
  const weekly = days.reduce((s, d) => s + d.cal, 0);

  return (
    <div style={{ padding: "24px 20px 0" }} className="space-y-5">
      <div className="animate-fade-in-up">
        <p className="text-[11px] text-purple-400 font-bold uppercase tracking-widest">Fitness</p>
        <h1 className="text-[28px] font-extrabold mt-1">Exercise</h1>
      </div>

      <div className="glass-card p-4 flex items-center justify-between animate-fade-in-up stagger-1">
        <div>
          <p className="text-[10px] text-[var(--text-dim)] font-bold uppercase tracking-widest">Weekly Burn</p>
          <p className="text-xl font-extrabold mt-0.5"><span className="gradient-text">~{weekly}</span> <span className="text-[12px] text-[var(--text-sub)] font-semibold">cal</span></p>
        </div>
        <div className="w-11 h-11 rounded-[14px] bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center shadow-lg shadow-orange-500/20">
          <Flame size={20} className="text-white" />
        </div>
      </div>

      <div className="flex gap-1.5 overflow-x-auto scrollbar-thin pb-1 -mx-1 px-1 animate-fade-in-up stagger-2">
        {days.map((day, i) => (
          <button key={i} onClick={() => setSel(i)}
            className={`shrink-0 w-[58px] py-3 rounded-2xl text-center cursor-pointer active:scale-95 transition-all
              ${sel === i
                ? 'bg-gradient-to-b from-purple-500/20 to-purple-600/5 border border-purple-500/30 shadow-lg shadow-purple-500/10'
                : 'bg-white/[0.02] border border-white/[0.04] text-[var(--text-dim)]'}`}>
            <p className={`text-[12px] font-extrabold ${sel === i ? 'text-white' : ''}`}>{day.d}</p>
            <p className="text-[9px] mt-0.5 font-semibold opacity-60">{day.type}</p>
          </button>
        ))}
      </div>

      <div className="glass-card p-5 animate-fade-in-up stagger-3">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="text-[17px] font-extrabold">{plan.d} — {plan.type}</h3>
            <div className="flex gap-3 mt-1.5 text-[11px] text-[var(--text-dim)] font-semibold">
              <span className="flex items-center gap-1"><Clock size={11} /> {plan.dur}</span>
              <span className="flex items-center gap-1"><Flame size={11} /> {plan.cal} cal</span>
            </div>
          </div>
          <div className="w-12 h-12 rounded-[16px] bg-purple-500/10 flex items-center justify-center border border-purple-500/10">
            <Dumbbell size={22} className="text-purple-400" />
          </div>
        </div>

        <div className="space-y-2">
          {plan.ex.map((ex, i) => (
            <div key={i} className="flex items-start gap-3 p-3.5 rounded-[16px] bg-white/[0.02] border border-white/[0.04] active:bg-white/[0.04] transition-colors">
              <div className="w-9 h-9 rounded-[12px] bg-purple-500/12 flex items-center justify-center shrink-0">
                <Play size={13} className="text-purple-300 ml-0.5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1">
                  <p className="text-[13px] font-bold truncate">{ex.n}</p>
                  <span className="text-[11px] text-[var(--text-dim)] font-semibold shrink-0 tabular-nums">{ex.t}</span>
                </div>
                <p className="text-[11px] text-[var(--text-dim)] mt-0.5">{ex.note}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="glass-card p-5 animate-fade-in-up stagger-4">
        <h3 className="text-[13px] font-bold text-red-400/80 mb-3 flex items-center gap-2"><AlertTriangle size={14} /> Avoid with Sciatica</h3>
        <div className="grid grid-cols-1 gap-2">
          {avoidList.map((it, i) => (
            <div key={i} className="flex items-center gap-2.5 text-[13px] text-[var(--text-sub)]">
              <span className="w-5 h-5 rounded-[8px] bg-red-500/10 flex items-center justify-center shrink-0 text-[10px] text-red-400 font-bold">x</span>{it}
            </div>
          ))}
        </div>
      </div>

      <div className="glass-card p-5 bg-emerald-500/[0.02] border-emerald-500/10 animate-fade-in-up stagger-5">
        <h3 className="text-[13px] font-bold text-emerald-400/80 mb-3 flex items-center gap-2"><CheckCircle size={14} /> Pain Management</h3>
        <ul className="space-y-2.5 text-[13px] text-[var(--text-sub)]">
          {['Heat pack before exercise (15 min)', 'Ice after if flare-up (10 min)', 'Stop at sharp/shooting pain', 'Daily pigeon pose + knee-to-chest', 'Strengthen core for spine support', 'Pillow between knees when sleeping'].map((t, i) => (
            <li key={i} className="flex items-start gap-2.5"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400/50 mt-1.5 shrink-0" />{t}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
