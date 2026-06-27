import { useState } from 'react';
import { Dumbbell, Clock, Flame, AlertTriangle, CheckCircle, Play, ChevronRight } from 'lucide-react';

const workoutPlans = {
  sciaticaSafe: [
    {
      day: 'Mon', fullDay: 'Monday', type: 'Cardio + Core', duration: '40 min', calories: 300,
      exercises: [
        { name: 'Brisk Walking', duration: '20 min', note: 'Flat surface, good shoes' },
        { name: 'Swimming (if available)', duration: '15 min', note: 'Best for sciatica — zero impact' },
        { name: 'Bird-Dog Hold', duration: '3 x 30s', note: 'Strengthens core without back strain' },
        { name: 'Dead Bug', duration: '3 x 10 reps', note: 'Core stability, spine neutral' },
        { name: 'Cat-Cow Stretch', duration: '2 min', note: 'Gentle spine mobility' },
      ],
    },
    {
      day: 'Tue', fullDay: 'Tuesday', type: 'Upper Body', duration: '35 min', calories: 250,
      exercises: [
        { name: 'Wall Push-ups', duration: '3 x 12', note: 'Progress to regular push-ups' },
        { name: 'Shoulder Press (seated)', duration: '3 x 10', note: 'Keep back supported' },
        { name: 'Resistance Band Rows', duration: '3 x 12', note: 'Great for posture' },
        { name: 'Bicep Curls', duration: '3 x 10', note: 'Light weight, good form' },
        { name: 'Gentle Stretching', duration: '5 min', note: 'Focus on shoulders & neck' },
      ],
    },
    {
      day: 'Wed', fullDay: 'Wednesday', type: 'Yoga & Flexibility', duration: '30 min', calories: 150,
      exercises: [
        { name: "Child's Pose", duration: '2 min', note: 'Decompresses spine' },
        { name: 'Pigeon Pose (modified)', duration: '2 min each', note: 'Opens hip flexors, relieves sciatica' },
        { name: 'Cobra Stretch (gentle)', duration: '3 x 30s', note: 'Only go to comfortable range' },
        { name: 'Supine Twist', duration: '2 min each', note: 'Relieves lower back tension' },
        { name: 'Knee-to-Chest Stretch', duration: '2 min each', note: 'Direct sciatica relief' },
        { name: 'Hamstring Stretch (lying)', duration: '2 min each', note: 'Never bounce — hold steady' },
      ],
    },
    {
      day: 'Thu', fullDay: 'Thursday', type: 'Lower Body', duration: '35 min', calories: 280,
      exercises: [
        { name: 'Bodyweight Squats (partial)', duration: '3 x 12', note: "Don't go below parallel" },
        { name: 'Glute Bridges', duration: '3 x 15', note: 'Excellent for glutes without back load' },
        { name: 'Clamshells', duration: '3 x 15 each', note: 'Strengthens hip stabilizers' },
        { name: 'Standing Calf Raises', duration: '3 x 15', note: 'Hold wall for balance' },
        { name: 'Walking Lunges (shallow)', duration: '2 x 10', note: 'Short steps, upright torso' },
      ],
    },
    {
      day: 'Fri', fullDay: 'Friday', type: 'Cardio + HIIT', duration: '35 min', calories: 350,
      exercises: [
        { name: 'Cycling (stationary)', duration: '15 min', note: 'Low impact, adjust seat height' },
        { name: 'Standing March', duration: '3 x 1 min', note: 'High knees, controlled pace' },
        { name: 'Boxing Punches (standing)', duration: '3 x 1 min', note: 'Great cardio, no impact on spine' },
        { name: 'Step-Ups (low step)', duration: '3 x 10 each', note: 'Use a stable step' },
        { name: 'Cool-down Walk', duration: '5 min', note: 'Slow pace, deep breathing' },
      ],
    },
    {
      day: 'Sat', fullDay: 'Saturday', type: 'Active Recovery', duration: '30 min', calories: 150,
      exercises: [
        { name: 'Gentle Walk', duration: '20 min', note: 'Nature walk preferred' },
        { name: 'Full Body Stretching', duration: '10 min', note: 'Focus on tight areas' },
        { name: 'Foam Rolling', duration: '5 min', note: 'Avoid rolling directly on sciatic nerve' },
      ],
    },
    {
      day: 'Sun', fullDay: 'Sunday', type: 'Rest Day', duration: '--', calories: 0,
      exercises: [
        { name: 'Complete Rest', duration: '--', note: 'Recovery is when muscles grow stronger' },
        { name: 'Light stretching if desired', duration: '10 min', note: 'Only if body feels good' },
      ],
    },
  ],
  avoid: [
    'Heavy deadlifts — direct spinal load worsens sciatica',
    'Barbell squats with heavy weight',
    'Toe touches (standing) — strains sciatic nerve',
    'Sit-ups / Crunches — compresses discs',
    'Leg press with heavy weight',
    'Running on hard surfaces (use treadmill/grass)',
    'Any exercise causing shooting pain down the leg',
    'Twisting movements under load',
  ],
};

export default function Exercise() {
  const [selectedDay, setSelectedDay] = useState(0);
  const plan = workoutPlans.sciaticaSafe[selectedDay];
  const weeklyCalories = workoutPlans.sciaticaSafe.reduce((s, d) => s + d.calories, 0);

  return (
    <div className="space-y-6">
      <div className="animate-fade-in-up">
        <h2 className="text-3xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>Exercise Plan</h2>
        <p className="text-gray-500 text-sm mt-1">Sciatica-safe workouts for weight loss</p>
      </div>

      <div className="glass-card p-5 animate-fade-in-up stagger-1">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Weekly Calorie Burn</p>
            <p className="text-2xl font-bold mt-1">
              <span className="gradient-text">~{weeklyCalories}</span>
              <span className="text-sm text-gray-500 font-normal ml-1">cal</span>
            </p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center shadow-lg shadow-orange-500/20">
            <Flame size={22} className="text-white" />
          </div>
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin animate-fade-in-up stagger-2">
        {workoutPlans.sciaticaSafe.map((day, i) => (
          <button
            key={i}
            onClick={() => setSelectedDay(i)}
            className={`shrink-0 px-5 py-3.5 rounded-2xl text-sm cursor-pointer transition-all duration-250 min-w-[80px]
              ${selectedDay === i
                ? 'bg-gradient-to-br from-purple-500/15 to-indigo-500/10 border border-purple-500/25 text-white shadow-lg shadow-purple-500/5'
                : 'bg-white/[0.02] border border-white/[0.05] text-gray-500 hover:text-gray-300 hover:bg-white/[0.04]'}`}
          >
            <p className="font-bold text-xs">{day.day}</p>
            <p className="text-[10px] mt-1 opacity-70 font-medium">{day.type}</p>
          </button>
        ))}
      </div>

      <div className="glass-card p-6 animate-fade-in-up stagger-3">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-semibold" style={{ fontFamily: "'Playfair Display', serif" }}>
              {plan.fullDay}
            </h3>
            <p className="text-sm text-purple-300/80 mt-0.5">{plan.type}</p>
            <div className="flex gap-4 mt-2 text-xs text-gray-500">
              <span className="flex items-center gap-1.5"><Clock size={12} /> {plan.duration}</span>
              <span className="flex items-center gap-1.5"><Flame size={12} /> {plan.calories} cal</span>
            </div>
          </div>
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500/10 to-indigo-500/5 flex items-center justify-center border border-purple-500/10">
            <Dumbbell size={24} className="text-purple-400" />
          </div>
        </div>

        <div className="space-y-2">
          {plan.exercises.map((ex, i) => (
            <div key={i} className="flex items-start gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/[0.04] hover:bg-white/[0.04] transition-all duration-200 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500/15 to-indigo-500/10 flex items-center justify-center shrink-0 border border-purple-500/10 group-hover:border-purple-500/25 transition-colors">
                <Play size={14} className="text-purple-300 ml-0.5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm font-semibold text-gray-200">{ex.name}</p>
                  <span className="text-xs text-gray-500 font-medium shrink-0 tabular-nums">{ex.duration}</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">{ex.note}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="glass-card p-6 border-red-500/10 animate-fade-in-up stagger-4">
        <h3 className="text-sm font-semibold text-red-400/80 mb-4 flex items-center gap-2">
          <AlertTriangle size={15} /> Exercises to AVOID with Sciatica
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {workoutPlans.avoid.map((item, i) => (
            <div key={i} className="flex items-start gap-3 text-sm text-gray-400 p-2 rounded-lg">
              <span className="w-5 h-5 rounded-md bg-red-500/10 flex items-center justify-center shrink-0 mt-0.5">
                <span className="text-red-400 text-xs">x</span>
              </span>
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="glass-card p-6 bg-emerald-500/[0.02] border-emerald-500/10 animate-fade-in-up stagger-5">
        <h3 className="text-sm font-semibold text-emerald-400/80 mb-4 flex items-center gap-2">
          <CheckCircle size={15} /> Sciatica Pain Management
        </h3>
        <ul className="space-y-3 text-sm text-gray-300">
          {[
            'Apply heat pack before exercise (15 min) to loosen muscles',
            'Ice pack after exercise if any flare-up (10 min)',
            'Never push through sharp/shooting pain — stop immediately',
            'Pigeon pose & knee-to-chest stretch daily for nerve relief',
            'Strengthen core — a strong core takes pressure off the spine',
            'Sleep with a pillow between knees to align spine',
          ].map((tip, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/60 mt-2 shrink-0" />
              {tip}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
