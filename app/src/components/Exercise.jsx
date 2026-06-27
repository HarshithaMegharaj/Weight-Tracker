import { useState } from 'react';
import { Dumbbell, Clock, Flame, AlertTriangle, CheckCircle, Play } from 'lucide-react';

const workoutPlans = {
  sciaticaSafe: [
    {
      day: 'Monday',
      type: 'Cardio + Core',
      duration: '40 min',
      calories: 300,
      exercises: [
        { name: 'Brisk Walking', duration: '20 min', note: 'Flat surface, good shoes' },
        { name: 'Swimming (if available)', duration: '15 min', note: 'Best for sciatica — zero impact' },
        { name: 'Bird-Dog Hold', duration: '3 × 30s', note: 'Strengthens core without back strain' },
        { name: 'Dead Bug', duration: '3 × 10 reps', note: 'Core stability, spine neutral' },
        { name: 'Cat-Cow Stretch', duration: '2 min', note: 'Gentle spine mobility' },
      ],
    },
    {
      day: 'Tuesday',
      type: 'Upper Body Strength',
      duration: '35 min',
      calories: 250,
      exercises: [
        { name: 'Wall Push-ups → Regular Push-ups', duration: '3 × 12', note: 'Progress gradually' },
        { name: 'Dumbbell Shoulder Press (seated)', duration: '3 × 10', note: 'Keep back supported' },
        { name: 'Resistance Band Rows', duration: '3 × 12', note: 'Great for posture' },
        { name: 'Bicep Curls', duration: '3 × 10', note: 'Light weight, good form' },
        { name: 'Gentle Stretching', duration: '5 min', note: 'Focus on shoulders & neck' },
      ],
    },
    {
      day: 'Wednesday',
      type: 'Yoga & Flexibility',
      duration: '30 min',
      calories: 150,
      exercises: [
        { name: 'Child\'s Pose', duration: '2 min', note: 'Decompresses spine' },
        { name: 'Pigeon Pose (modified)', duration: '2 min each', note: 'Opens hip flexors, relieves sciatica' },
        { name: 'Cobra Stretch (gentle)', duration: '3 × 30s', note: 'Only go to comfortable range' },
        { name: 'Supine Twist', duration: '2 min each', note: 'Relieves lower back tension' },
        { name: 'Knee-to-Chest Stretch', duration: '2 min each', note: 'Direct sciatica relief' },
        { name: 'Hamstring Stretch (lying)', duration: '2 min each', note: 'Never bounce — hold steady' },
      ],
    },
    {
      day: 'Thursday',
      type: 'Lower Body (Safe)',
      duration: '35 min',
      calories: 280,
      exercises: [
        { name: 'Bodyweight Squats (partial)', duration: '3 × 12', note: 'Don\'t go below parallel' },
        { name: 'Glute Bridges', duration: '3 × 15', note: 'Excellent for glutes without back load' },
        { name: 'Clamshells', duration: '3 × 15 each', note: 'Strengthens hip stabilizers' },
        { name: 'Standing Calf Raises', duration: '3 × 15', note: 'Hold wall for balance' },
        { name: 'Walking Lunges (shallow)', duration: '2 × 10', note: 'Short steps, upright torso' },
      ],
    },
    {
      day: 'Friday',
      type: 'Cardio + HIIT (Modified)',
      duration: '35 min',
      calories: 350,
      exercises: [
        { name: 'Cycling (stationary/outdoor)', duration: '15 min', note: 'Low impact, adjust seat height' },
        { name: 'Standing March', duration: '3 × 1 min', note: 'High knees, controlled pace' },
        { name: 'Boxing Punches (standing)', duration: '3 × 1 min', note: 'Great cardio, no impact on spine' },
        { name: 'Step-Ups (low step)', duration: '3 × 10 each', note: 'Use a stable step' },
        { name: 'Cool-down Walk', duration: '5 min', note: 'Slow pace, deep breathing' },
      ],
    },
    {
      day: 'Saturday',
      type: 'Active Recovery',
      duration: '30 min',
      calories: 150,
      exercises: [
        { name: 'Gentle Walk', duration: '20 min', note: 'Nature walk preferred' },
        { name: 'Full Body Stretching', duration: '10 min', note: 'Focus on tight areas' },
        { name: 'Foam Rolling (if available)', duration: '5 min', note: 'Avoid rolling directly on sciatic nerve' },
      ],
    },
    {
      day: 'Sunday',
      type: 'Rest Day',
      duration: '--',
      calories: 0,
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
    'Running on hard surfaces (use treadmill/grass if running)',
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
      <div>
        <h2 className="text-2xl font-bold mb-1">Exercise Plan</h2>
        <p className="text-gray-400 text-sm">Sciatica-safe workouts designed for weight loss</p>
      </div>

      <div className="glass p-4 flex items-center justify-between">
        <span className="text-sm text-gray-300">Weekly Calorie Burn</span>
        <span className="text-lg font-bold text-orange-400 flex items-center gap-1">
          <Flame size={18} /> ~{weeklyCalories} cal
        </span>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
        {workoutPlans.sciaticaSafe.map((day, i) => (
          <button
            key={i}
            onClick={() => setSelectedDay(i)}
            className={`shrink-0 px-4 py-3 rounded-xl text-sm cursor-pointer transition-all duration-200
              ${selectedDay === i
                ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                : 'glass text-gray-400 hover:text-white'}`}
          >
            <p className="font-medium">{day.day}</p>
            <p className="text-xs mt-0.5 opacity-70">{day.type}</p>
          </button>
        ))}
      </div>

      <div className="glass p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold">{plan.day} — {plan.type}</h3>
            <div className="flex gap-4 mt-1 text-xs text-gray-400">
              <span className="flex items-center gap-1"><Clock size={12} /> {plan.duration}</span>
              <span className="flex items-center gap-1"><Flame size={12} /> {plan.calories} cal</span>
            </div>
          </div>
          <Dumbbell size={24} className="text-purple-400" />
        </div>

        <div className="space-y-3">
          {plan.exercises.map((ex, i) => (
            <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/8 transition-colors">
              <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center shrink-0 mt-0.5">
                <Play size={14} className="text-purple-300" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">{ex.name}</p>
                  <span className="text-xs text-gray-400">{ex.duration}</span>
                </div>
                <p className="text-xs text-gray-400 mt-0.5">{ex.note}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="glass p-5 border-red-500/20">
        <h3 className="text-sm font-semibold text-red-400 mb-3 flex items-center gap-2">
          <AlertTriangle size={16} /> Exercises to AVOID (Sciatica)
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {workoutPlans.avoid.map((item, i) => (
            <div key={i} className="flex items-start gap-2 text-sm text-gray-400">
              <span className="text-red-400 mt-0.5">✕</span>
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="glass p-5 border-emerald-500/20 bg-emerald-500/5">
        <h3 className="text-sm font-semibold text-emerald-400 mb-3 flex items-center gap-2">
          <CheckCircle size={16} /> Sciatica Pain Management Tips
        </h3>
        <ul className="space-y-2 text-sm text-gray-300">
          <li className="flex items-start gap-2"><span className="text-emerald-400">•</span>Apply heat pack before exercise (15 min) to loosen muscles</li>
          <li className="flex items-start gap-2"><span className="text-emerald-400">•</span>Ice pack after exercise if there is any flare-up (10 min)</li>
          <li className="flex items-start gap-2"><span className="text-emerald-400">•</span>Never push through sharp/shooting pain — stop immediately</li>
          <li className="flex items-start gap-2"><span className="text-emerald-400">•</span>Pigeon pose & knee-to-chest stretch daily for nerve relief</li>
          <li className="flex items-start gap-2"><span className="text-emerald-400">•</span>Strengthen core — a strong core takes pressure off the spine</li>
          <li className="flex items-start gap-2"><span className="text-emerald-400">•</span>Sleep with a pillow between knees to align spine</li>
        </ul>
      </div>
    </div>
  );
}
