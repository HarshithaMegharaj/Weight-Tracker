import { useState } from 'react';
import { Dumbbell, Clock, Flame, AlertTriangle, CheckCircle, Play, Heart, Zap, Shield } from 'lucide-react';

const days = [
  { d: 'Mon', type: 'Cardio+Core', dur: '40m', cal: 300, ex: [
    { n: 'Brisk Walking', t: '20 min', note: 'Flat surface, good shoes', safe: true },
    { n: 'Swimming', t: '15 min', note: 'Best for sciatica — zero impact', safe: true },
    { n: 'Bird-Dog Hold', t: '3x30s', note: 'Core without back strain', safe: true },
    { n: 'Dead Bug', t: '3x10', note: 'Core stability, spine neutral', safe: true },
    { n: 'Cat-Cow Stretch', t: '2 min', note: 'Gentle spine mobility', safe: true },
  ]},
  { d: 'Tue', type: 'Upper Body', dur: '35m', cal: 250, ex: [
    { n: 'Wall Push-ups', t: '3x12', note: 'Progress gradually', safe: true },
    { n: 'Shoulder Press', t: '3x10', note: 'Keep back supported', safe: true },
    { n: 'Band Rows', t: '3x12', note: 'Great for posture', safe: true },
    { n: 'Bicep Curls', t: '3x10', note: 'Light weight, good form', safe: true },
    { n: 'Stretching', t: '5 min', note: 'Shoulders & neck', safe: true },
  ]},
  { d: 'Wed', type: 'Yoga', dur: '30m', cal: 150, ex: [
    { n: "Child's Pose", t: '2 min', note: 'Decompresses spine', safe: true },
    { n: 'Pigeon Pose', t: '2 min ea', note: 'Opens hips, relieves sciatica', safe: true },
    { n: 'Cobra Stretch', t: '3x30s', note: 'Comfortable range only', safe: true },
    { n: 'Supine Twist', t: '2 min ea', note: 'Lower back tension relief', safe: true },
    { n: 'Knee-to-Chest', t: '2 min ea', note: 'Direct sciatica relief', safe: true },
  ]},
  { d: 'Thu', type: 'Lower Body', dur: '35m', cal: 280, ex: [
    { n: 'Partial Squats', t: '3x12', note: 'Stay above parallel', safe: true },
    { n: 'Glute Bridges', t: '3x15', note: 'No back load', safe: true },
    { n: 'Clamshells', t: '3x15 ea', note: 'Hip stabilizers', safe: true },
    { n: 'Calf Raises', t: '3x15', note: 'Wall for balance', safe: true },
    { n: 'Shallow Lunges', t: '2x10', note: 'Upright torso', safe: true },
  ]},
  { d: 'Fri', type: 'HIIT', dur: '35m', cal: 350, ex: [
    { n: 'Cycling', t: '15 min', note: 'Low impact', safe: true },
    { n: 'Standing March', t: '3x1m', note: 'Controlled pace', safe: true },
    { n: 'Boxing Punches', t: '3x1m', note: 'No spine impact', safe: true },
    { n: 'Step-Ups', t: '3x10', note: 'Stable low step', safe: true },
    { n: 'Cool-down Walk', t: '5 min', note: 'Deep breathing', safe: true },
  ]},
  { d: 'Sat', type: 'Recovery', dur: '30m', cal: 150, ex: [
    { n: 'Gentle Walk', t: '20 min', note: 'Nature preferred', safe: true },
    { n: 'Full Stretch', t: '10 min', note: 'Focus tight areas', safe: true },
  ]},
  { d: 'Sun', type: 'Rest', dur: '--', cal: 0, ex: [
    { n: 'Complete Rest', t: '--', note: 'Recovery builds strength', safe: true },
    { n: 'Light stretch', t: '10 min', note: 'Only if comfortable', safe: true },
  ]},
];

const avoidList = ['Heavy deadlifts', 'Barbell heavy squats', 'Standing toe touches', 'Sit-ups / Crunches', 'Heavy leg press', 'Running on concrete', 'Shooting leg pain exercises', 'Loaded twisting'];

const sciaticaRelief = [
  { name: 'Knee-to-Chest Stretch', how: 'Lie on back, pull one knee to chest. Hold 30s each side. Repeat 3x.', when: 'Morning & before bed', level: 'Beginner' },
  { name: 'Pigeon Pose', how: 'From all fours, bring one knee forward. Extend other leg back. Hold 2 min each side.', when: 'After warm-up', level: 'Intermediate' },
  { name: 'Sciatic Nerve Glide', how: 'Sit upright. Extend one leg, flex foot up, slowly straighten knee. 10 reps each.', when: 'Morning', level: 'Beginner' },
  { name: 'Cat-Cow Stretch', how: 'On all fours, alternate arching and rounding spine. 10 slow cycles.', when: 'Any time', level: 'Beginner' },
  { name: 'Tennis Ball Release', how: 'Sit on tennis ball on glute/piriformis. Roll gently 2 min each side.', when: 'After sitting long', level: 'Beginner' },
  { name: 'Figure-4 Stretch', how: 'Lie on back, cross ankle over knee, pull bottom knee toward chest. Hold 30s.', when: 'Before bed', level: 'Beginner' },
];

const flareUpProtocol = [
  { step: '1. Ice', detail: 'Apply ice pack wrapped in towel to lower back — 15 min on, 15 min off', icon: '🧊' },
  { step: '2. Position', detail: 'Lie on back, knees bent, feet flat. Or side-lie with pillow between knees', icon: '🛏️' },
  { step: '3. Gentle move', detail: 'After 30 min rest, try very gentle knee-to-chest stretch', icon: '🧘' },
  { step: '4. Anti-inflam', detail: 'Turmeric tea, ginger, or prescribed anti-inflammatory', icon: '💊' },
  { step: '5. Walk', detail: 'Short 5-10 min walk when pain eases. Movement aids recovery.', icon: '🚶' },
];

export default function Exercise() {
  const [sel, setSel] = useState(0);
  const [tab, setTab] = useState('plan');
  const plan = days[sel];
  const weekly = days.reduce((s, d) => s + d.cal, 0);

  return (
    <div style={{ padding: "24px 20px 0" }} className="space-y-5">
      <div className="animate-fade-in-up">
        <p className="text-[11px] text-purple-400 font-bold uppercase tracking-widest">Fitness</p>
        <h1 className="text-[28px] font-extrabold mt-1">Exercise</h1>
      </div>

      <div className="flex gap-2 overflow-x-auto scrollbar-thin pb-1 animate-fade-in-up stagger-1">
        {[
          { id: 'plan', l: 'Weekly Plan', ic: Dumbbell },
          { id: 'sciatica', l: 'Sciatica', ic: Heart },
          { id: 'flareup', l: 'Flare-Up', ic: Shield },
        ].map(t => (
          <button key={t.id} onClick={() => setTab(t.id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-[14px] text-[12px] font-bold cursor-pointer active:scale-[0.96] transition-all shrink-0
              ${tab === t.id ? 'chip-active' : 'chip'}`}>
            <t.ic size={13} /> {t.l}
          </button>
        ))}
      </div>

      {tab === 'plan' && (
        <>
          <div className="glass-card p-4 flex items-center justify-between animate-fade-in-up stagger-2">
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
                className={`shrink-0 w-[58px] py-3 rounded-2xl text-center cursor-pointer active:scale-[0.96] transition-all
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
                <div key={i} className="flex items-start gap-3 p-3.5 rounded-[16px] bg-white/[0.02] border border-white/[0.04] transition-colors">
                  <div className="w-9 h-9 rounded-[12px] bg-purple-500/12 flex items-center justify-center shrink-0">
                    <Play size={13} className="text-purple-300 ml-0.5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <p className="text-[13px] font-bold truncate">{ex.n}</p>
                      <span className="text-[11px] text-[var(--text-dim)] font-semibold shrink-0 tabular-nums">{ex.t}</span>
                    </div>
                    <p className="text-[11px] text-[var(--text-dim)] mt-0.5">{ex.note}</p>
                    {ex.safe && <span className="text-[9px] text-emerald-400/60 font-bold uppercase mt-0.5 inline-block">Sciatica Safe</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card p-5 animate-fade-in-up stagger-4">
            <h3 className="text-[13px] font-bold text-red-400/80 mb-4 flex items-center gap-2.5"><AlertTriangle size={14} /> Avoid with Sciatica</h3>
            <div className="grid grid-cols-1 gap-3">
              {avoidList.map((it, i) => (
                <div key={i} className="flex items-center gap-3 text-[13px] text-[var(--text-sub)]">
                  <span className="w-6 h-6 rounded-[8px] bg-red-500/10 flex items-center justify-center shrink-0 text-[10px] text-red-400 font-bold">✕</span>{it}
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {tab === 'sciatica' && (
        <div className="space-y-3 animate-fade-in-up stagger-2">
          <div className="glass-card p-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-11 h-11 rounded-[14px] bg-gradient-to-br from-blue-500/20 to-indigo-500/10 flex items-center justify-center border border-blue-500/15">
                <Heart size={18} className="text-blue-400" />
              </div>
              <div>
                <h3 className="text-[15px] font-extrabold">Sciatica Relief Exercises</h3>
                <p className="text-[11px] text-[var(--text-dim)]">Daily stretches to reduce nerve pain</p>
              </div>
            </div>
            <div className="space-y-3">
              {sciaticaRelief.map((ex, i) => (
                <div key={i} className="p-4 rounded-[16px] bg-white/[0.02] border border-white/[0.04]">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-[13px] font-bold">{ex.name}</p>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${ex.level === 'Beginner' ? 'bg-emerald-500/12 text-emerald-400' : 'bg-amber-500/12 text-amber-400'}`}>
                      {ex.level}
                    </span>
                  </div>
                  <p className="text-[12px] text-[var(--text-sub)] leading-relaxed">{ex.how}</p>
                  <p className="text-[10px] text-[var(--text-dim)] mt-2 flex items-center gap-1.5">
                    <Clock size={10} /> Best: {ex.when}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card p-5">
            <h3 className="text-[13px] font-bold mb-3 flex items-center gap-2">
              <Zap size={14} className="text-amber-400" /> Daily Sciatica Routine (10 min)
            </h3>
            <div className="space-y-2">
              {['Cat-Cow — 1 min', 'Knee-to-Chest — 2 min (1 min each)', 'Pigeon Pose — 4 min (2 min each)', 'Figure-4 Stretch — 2 min (1 min each)', 'Nerve Glide — 1 min'].map((step, i) => (
                <div key={i} className="flex items-center gap-3 text-[13px] text-[var(--text-sub)]">
                  <span className="w-6 h-6 rounded-full bg-purple-500/15 flex items-center justify-center shrink-0 text-[11px] font-bold text-purple-300">{i + 1}</span>
                  {step}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {tab === 'flareup' && (
        <div className="space-y-3 animate-fade-in-up stagger-2">
          <div className="glass-card p-5 bg-red-500/[0.03] border-red-500/10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-11 h-11 rounded-[14px] bg-gradient-to-br from-red-500/20 to-orange-500/10 flex items-center justify-center border border-red-500/15">
                <Shield size={18} className="text-red-400" />
              </div>
              <div>
                <h3 className="text-[15px] font-extrabold">Sciatica Flare-Up Protocol</h3>
                <p className="text-[11px] text-[var(--text-dim)]">When pain strikes, follow these steps</p>
              </div>
            </div>
            <div className="space-y-3">
              {flareUpProtocol.map((step, i) => (
                <div key={i} className="flex items-start gap-3 p-3.5 rounded-[14px] bg-white/[0.02] border border-white/[0.04]">
                  <span className="text-[20px] shrink-0">{step.icon}</span>
                  <div>
                    <p className="text-[13px] font-bold">{step.step}</p>
                    <p className="text-[12px] text-[var(--text-sub)] mt-0.5 leading-relaxed">{step.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card p-5">
            <h3 className="text-[13px] font-bold text-emerald-400/80 mb-3 flex items-center gap-2"><CheckCircle size={14} /> Prevention Tips</h3>
            <ul className="space-y-3 text-[13px] text-[var(--text-sub)]">
              {[
                'Lose weight — every 1 kg reduces 4 kg of spinal pressure',
                'Strengthen core daily (Bird-Dog, Dead Bug)',
                'Never sit for more than 30 min — set a timer',
                'Sleep with pillow between knees (side) or under knees (back)',
                'Anti-inflammatory diet: turmeric, ginger, fish, berries',
                'Swimming is the #1 exercise for sciatica — zero impact',
                'Avoid bending + twisting at the same time',
                'Use lumbar support when sitting',
                'Keep hamstrings flexible — stretch daily',
                'Stay hydrated — discs need water to cushion spine',
              ].map((t, i) => (
                <li key={i} className="flex items-start gap-2.5"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400/50 mt-1.5 shrink-0" />{t}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {tab === 'plan' && (
        <div className="glass-card p-5 bg-emerald-500/[0.02] border-emerald-500/10 animate-fade-in-up stagger-5">
          <h3 className="text-[13px] font-bold text-emerald-400/80 mb-3 flex items-center gap-2"><CheckCircle size={14} /> Pain Management</h3>
          <ul className="space-y-2.5 text-[13px] text-[var(--text-sub)]">
            {['Heat pack before exercise (15 min)', 'Ice after if flare-up (10 min)', 'Stop at sharp/shooting pain', 'Daily pigeon pose + knee-to-chest', 'Strengthen core for spine support', 'Pillow between knees when sleeping'].map((t, i) => (
              <li key={i} className="flex items-start gap-2.5"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400/50 mt-1.5 shrink-0" />{t}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
