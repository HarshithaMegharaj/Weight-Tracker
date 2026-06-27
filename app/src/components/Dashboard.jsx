import { useMemo } from 'react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Line
} from 'recharts';
import { TrendingDown, TrendingUp, Flame, Target, Scale, Activity, ArrowRight, Droplets, Moon, Dumbbell } from 'lucide-react';
import { format, differenceInDays } from 'date-fns';

function AnimatedNumber({ value, suffix = '' }) {
  return <span>{value}{suffix}</span>;
}

function StatCard({ icon: Icon, label, value, unit, trend, trendValue, gradient, delay = 0 }) {
  return (
    <div className={`glass-card p-6 animate-fade-in-up stagger-${delay + 1}`}>
      <div className="flex items-start justify-between mb-4">
        <div className={`w-11 h-11 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-lg`}>
          <Icon size={20} className="text-white" />
        </div>
        {trend !== undefined && (
          <div className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium
            ${trend === 'down' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'}`}>
            {trend === 'down' ? <TrendingDown size={12} /> : <TrendingUp size={12} />}
            {trendValue}
          </div>
        )}
      </div>
      <div>
        <p className="text-3xl font-bold tracking-tight">
          <AnimatedNumber value={value} />
        </p>
        <p className="text-xs text-gray-500 mt-1 font-medium">{unit}</p>
      </div>
      <p className="text-[11px] text-gray-600 mt-3 font-medium uppercase tracking-wider">{label}</p>
    </div>
  );
}

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="glass-strong px-4 py-3 shadow-2xl" style={{ borderRadius: '14px' }}>
      <p className="text-[11px] text-gray-500 font-medium mb-1">{label}</p>
      <p className="text-purple-300 font-bold text-lg">{payload[0].value} <span className="text-xs font-normal text-gray-500">kg</span></p>
    </div>
  );
}

export default function Dashboard({ weightEntries, profile, onTabChange }) {
  const chartData = useMemo(() => {
    const sorted = [...weightEntries].sort((a, b) => new Date(a.date) - new Date(b.date));
    return sorted.slice(-30).map(e => ({
      date: format(new Date(e.date), 'MMM dd'),
      weight: e.weight,
      goal: profile.goalWeight || null,
    }));
  }, [weightEntries, profile.goalWeight]);

  const stats = useMemo(() => {
    if (weightEntries.length === 0) return null;
    const sorted = [...weightEntries].sort((a, b) => new Date(a.date) - new Date(b.date));
    const latest = sorted[sorted.length - 1];
    const weekAgo = sorted.find(e =>
      differenceInDays(new Date(latest.date), new Date(e.date)) >= 7
    ) || sorted[0];
    const startWeight = sorted[0];
    const bmi = latest.weight / ((profile.height / 100) ** 2);

    return {
      current: latest.weight,
      weeklyChange: (latest.weight - weekAgo.weight).toFixed(1),
      totalLost: (startWeight.weight - latest.weight).toFixed(1),
      bmi: bmi.toFixed(1),
      streak: calculateStreak(sorted),
      remaining: profile.goalWeight ? (latest.weight - profile.goalWeight).toFixed(1) : null,
      entries: weightEntries.length,
    };
  }, [weightEntries, profile]);

  if (!stats) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] animate-fade-in-up">
        <div className="glass-card p-12 text-center max-w-lg">
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-purple-500/20 to-indigo-500/10 flex items-center justify-center mx-auto mb-6 border border-purple-500/20">
            <Scale size={36} className="text-purple-400" />
          </div>
          <h2 className="text-3xl font-bold mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
            Welcome to <span className="gradient-text">FitGlow</span>
          </h2>
          <p className="text-gray-500 leading-relaxed mb-8">
            Begin your transformation journey by logging your first weight entry.
            Your personal AI trainer will guide every step.
          </p>
          <button
            onClick={() => onTabChange('log')}
            className="btn-primary px-8 py-3.5 cursor-pointer inline-flex items-center gap-2 text-sm"
          >
            Log Your First Weight <ArrowRight size={16} />
          </button>
        </div>
      </div>
    );
  }

  const tips = getTrainerTips(stats, profile);

  return (
    <div className="space-y-6">
      <div className="animate-fade-in-up">
        <h2 className="text-3xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>
          {getGreeting()}{profile.name ? `, ${profile.name}` : ''}
        </h2>
        <p className="text-gray-500 text-sm mt-1">Your fitness journey at a glance</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard
          icon={Scale} label="Current Weight" value={stats.current} unit="kg"
          trend={stats.weeklyChange < 0 ? 'down' : stats.weeklyChange > 0 ? 'up' : undefined}
          trendValue={`${Math.abs(stats.weeklyChange)} kg`}
          gradient="from-purple-500 to-indigo-600" delay={0}
        />
        <StatCard
          icon={TrendingDown} label="Total Lost" value={stats.totalLost > 0 ? stats.totalLost : '0'} unit="kg lost since start"
          gradient="from-emerald-500 to-teal-600" delay={1}
        />
        <StatCard
          icon={Activity} label="BMI" value={stats.bmi} unit={getBMICategory(stats.bmi)}
          gradient="from-blue-500 to-cyan-600" delay={2}
        />
        <StatCard
          icon={stats.remaining > 0 ? Target : Flame}
          label={stats.remaining > 0 ? 'Distance to Goal' : 'Logging Streak'}
          value={stats.remaining > 0 ? stats.remaining : stats.streak}
          unit={stats.remaining > 0 ? 'kg remaining' : 'consecutive days'}
          gradient="from-orange-500 to-amber-600" delay={3}
        />
      </div>

      <div className="glass-card p-6 animate-fade-in-up stagger-5">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold" style={{ fontFamily: "'Playfair Display', serif" }}>Weight Trend</h3>
            <p className="text-xs text-gray-500 mt-0.5">Last 30 days</p>
          </div>
          <div className="flex items-center gap-4 text-xs text-gray-500">
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-[2px] rounded-full bg-purple-400" /> Weight
            </span>
            {chartData[0]?.goal && (
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-[2px] rounded-full bg-emerald-400 opacity-60" style={{ borderTop: '1px dashed' }} /> Goal
              </span>
            )}
          </div>
        </div>
        <ResponsiveContainer width="100%" height={280}>
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="weightGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#A78BFA" stopOpacity={0.25} />
                <stop offset="50%" stopColor="#7C3AED" stopOpacity={0.08} />
                <stop offset="100%" stopColor="#7C3AED" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" vertical={false} />
            <XAxis dataKey="date" stroke="#3D3555" fontSize={11} tickLine={false} axisLine={false} dy={8} />
            <YAxis stroke="#3D3555" fontSize={11} tickLine={false} axisLine={false} dx={-8} domain={['dataMin - 2', 'dataMax + 2']} />
            <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'rgba(167,139,250,0.2)', strokeWidth: 1 }} />
            <Area
              type="monotone" dataKey="weight" stroke="#A78BFA" strokeWidth={2.5}
              fill="url(#weightGradient)"
              dot={{ fill: '#0B0614', stroke: '#A78BFA', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 7, fill: '#A78BFA', stroke: '#0B0614', strokeWidth: 3 }}
            />
            {chartData[0]?.goal && (
              <Line
                type="monotone" dataKey="goal" stroke="#34D399" strokeWidth={1.5}
                strokeDasharray="6 4" dot={false} strokeOpacity={0.5}
              />
            )}
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="glass-card p-6 animate-fade-in-up stagger-6">
          <h3 className="text-lg font-semibold mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            Trainer Insights
          </h3>
          <div className="space-y-3">
            {tips.map((tip, i) => (
              <div key={i} className="flex gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/[0.04] hover:bg-white/[0.04] transition-colors">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${tip.gradient} flex items-center justify-center shrink-0`}>
                  <tip.icon size={18} className="text-white" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-200">{tip.title}</p>
                  <p className="text-xs text-gray-500 mt-1 leading-relaxed">{tip.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card p-6 animate-fade-in-up stagger-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold" style={{ fontFamily: "'Playfair Display', serif" }}>Recent Entries</h3>
            <span className="text-xs text-gray-600 font-medium">{stats.entries} total</span>
          </div>
          <div className="space-y-2 max-h-72 overflow-y-auto scrollbar-thin pr-1">
            {[...weightEntries]
              .sort((a, b) => new Date(b.date) - new Date(a.date))
              .slice(0, 10)
              .map((entry, i) => (
                <div key={i} className="flex items-center justify-between p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.04] hover:bg-white/[0.04] transition-colors group">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-purple-400/60" />
                    <span className="text-sm text-gray-400">{format(new Date(entry.date), 'MMM dd, yyyy')}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    {entry.mood && (
                      <span className="text-xs text-gray-600 capitalize">{entry.mood}</span>
                    )}
                    <span className="font-bold text-sm tabular-nums">{entry.weight} <span className="text-xs font-normal text-gray-600">kg</span></span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return 'Good Morning';
  if (h < 17) return 'Good Afternoon';
  return 'Good Evening';
}

function calculateStreak(sorted) {
  let streak = 0;
  const today = new Date();
  for (let i = sorted.length - 1; i >= 0; i--) {
    const diff = differenceInDays(today, new Date(sorted[i].date));
    if (diff <= streak + 1) streak++;
    else break;
  }
  return streak;
}

function getBMICategory(bmi) {
  if (bmi < 18.5) return 'Underweight';
  if (bmi < 25) return 'Normal';
  if (bmi < 30) return 'Overweight';
  return 'Obese';
}

function getTrainerTips(stats, profile) {
  const tips = [];
  if (stats.weeklyChange > 0) {
    tips.push({
      icon: Flame, gradient: 'from-orange-500/80 to-red-500/80',
      title: 'Weight increased this week',
      desc: 'Focus on portion control and increase water intake. A 15-min walk after meals helps digestion.'
    });
  } else {
    tips.push({
      icon: TrendingDown, gradient: 'from-emerald-500/80 to-teal-500/80',
      title: `Down ${Math.abs(stats.weeklyChange)} kg this week!`,
      desc: 'Excellent progress! Keep your routine consistent and stay hydrated.'
    });
  }
  if (profile.conditions?.includes('sciatica')) {
    tips.push({
      icon: Dumbbell, gradient: 'from-blue-500/80 to-indigo-500/80',
      title: 'Sciatica-safe movement today',
      desc: 'Try swimming, gentle yoga, or a 30-min walk. Avoid heavy squats and deadlifts.'
    });
  }
  tips.push({
    icon: Droplets, gradient: 'from-cyan-500/80 to-blue-500/80',
    title: 'Hydration checkpoint',
    desc: 'Aim for 3-4 liters today. Warm lemon water in the morning boosts metabolism.'
  });
  return tips;
}
