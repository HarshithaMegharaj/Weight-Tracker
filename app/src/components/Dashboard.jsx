import { useMemo } from 'react';
import {
  LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer
} from 'recharts';
import { TrendingDown, TrendingUp, Flame, Target, Scale, Activity } from 'lucide-react';
import { format, subDays, differenceInDays } from 'date-fns';

function StatCard({ icon: Icon, label, value, unit, trend, trendValue, color }) {
  const colorMap = {
    purple: 'from-purple-500/20 to-purple-600/10 border-purple-500/30',
    green: 'from-emerald-500/20 to-emerald-600/10 border-emerald-500/30',
    blue: 'from-blue-500/20 to-blue-600/10 border-blue-500/30',
    orange: 'from-orange-500/20 to-orange-600/10 border-orange-500/30',
  };

  return (
    <div className={`glass p-5 bg-gradient-to-br ${colorMap[color]} flex flex-col gap-2`}>
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-400">{label}</span>
        <Icon size={18} className="text-gray-400" />
      </div>
      <div className="flex items-baseline gap-1">
        <span className="text-2xl font-bold">{value}</span>
        <span className="text-sm text-gray-400">{unit}</span>
      </div>
      {trend !== undefined && (
        <div className={`flex items-center gap-1 text-xs ${trend === 'down' ? 'text-emerald-400' : 'text-red-400'}`}>
          {trend === 'down' ? <TrendingDown size={14} /> : <TrendingUp size={14} />}
          <span>{trendValue}</span>
        </div>
      )}
    </div>
  );
}

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="glass-strong px-3 py-2 text-sm">
      <p className="text-gray-400">{label}</p>
      <p className="text-purple-300 font-semibold">{payload[0].value} kg</p>
    </div>
  );
}

export default function Dashboard({ weightEntries, profile }) {
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
    };
  }, [weightEntries, profile]);

  if (!stats) {
    return (
      <div className="flex flex-col items-center justify-center h-96 glass p-10 text-center">
        <Scale size={48} className="text-purple-400 mb-4" />
        <h2 className="text-2xl font-bold mb-2">Welcome to FitGlow</h2>
        <p className="text-gray-400 max-w-md">
          Start by logging your first weight entry. Your personal AI trainer will guide you
          through your transformation journey.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-1">Dashboard</h2>
        <p className="text-gray-400 text-sm">Your fitness journey at a glance</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard
          icon={Scale}
          label="Current Weight"
          value={stats.current}
          unit="kg"
          trend={stats.weeklyChange < 0 ? 'down' : 'up'}
          trendValue={`${Math.abs(stats.weeklyChange)} kg this week`}
          color="purple"
        />
        <StatCard
          icon={TrendingDown}
          label="Total Lost"
          value={stats.totalLost > 0 ? stats.totalLost : '0'}
          unit="kg"
          color="green"
        />
        <StatCard
          icon={Activity}
          label="BMI"
          value={stats.bmi}
          unit={getBMICategory(stats.bmi)}
          color="blue"
        />
        <StatCard
          icon={stats.remaining > 0 ? Target : Flame}
          label={stats.remaining > 0 ? 'To Goal' : 'Streak'}
          value={stats.remaining > 0 ? stats.remaining : stats.streak}
          unit={stats.remaining > 0 ? 'kg left' : 'days'}
          color="orange"
        />
      </div>

      <div className="glass p-6">
        <h3 className="text-lg font-semibold mb-4">Weight Trend (Last 30 Days)</h3>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="weightGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
            <XAxis dataKey="date" stroke="#6B7280" fontSize={12} tickLine={false} />
            <YAxis stroke="#6B7280" fontSize={12} tickLine={false} domain={['dataMin - 2', 'dataMax + 2']} />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone" dataKey="weight" stroke="#8B5CF6" strokeWidth={2}
              fill="url(#weightGradient)" dot={{ fill: '#8B5CF6', r: 3 }}
              activeDot={{ r: 6, fill: '#A78BFA' }}
            />
            {chartData[0]?.goal && (
              <Line
                type="monotone" dataKey="goal" stroke="#059669" strokeWidth={1.5}
                strokeDasharray="8 4" dot={false}
              />
            )}
          </AreaChart>
        </ResponsiveContainer>
        {chartData[0]?.goal && (
          <div className="flex items-center gap-4 mt-3 text-xs text-gray-400">
            <span className="flex items-center gap-1"><span className="w-3 h-0.5 bg-purple-500 inline-block" /> Weight</span>
            <span className="flex items-center gap-1"><span className="w-3 h-0.5 bg-emerald-500 inline-block border-dashed" /> Goal</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="glass p-6">
          <h3 className="text-lg font-semibold mb-3">Quick Tips from Your Trainer</h3>
          <div className="space-y-3">
            {getTrainerTips(stats, profile).map((tip, i) => (
              <div key={i} className="flex gap-3 p-3 rounded-xl bg-white/5">
                <span className="text-purple-400 text-lg mt-0.5">{tip.icon}</span>
                <div>
                  <p className="text-sm font-medium">{tip.title}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{tip.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass p-6">
          <h3 className="text-lg font-semibold mb-3">Recent Entries</h3>
          <div className="space-y-2 max-h-64 overflow-y-auto scrollbar-thin">
            {[...weightEntries]
              .sort((a, b) => new Date(b.date) - new Date(a.date))
              .slice(0, 10)
              .map((entry, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-white/5">
                  <span className="text-sm text-gray-400">{format(new Date(entry.date), 'MMM dd, yyyy')}</span>
                  <span className="font-semibold">{entry.weight} kg</span>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
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
    tips.push({ icon: '⚡', title: 'Weight went up this week', desc: 'Focus on portion control and drink more water. A small walk after meals helps.' });
  } else {
    tips.push({ icon: '🎯', title: 'Great progress!', desc: `You lost ${Math.abs(stats.weeklyChange)} kg this week. Keep the momentum going!` });
  }
  if (profile.conditions?.includes('sciatica')) {
    tips.push({ icon: '🧘', title: 'Sciatica-safe exercises today', desc: 'Try swimming, gentle yoga, or walking. Avoid heavy squats and deadlifts.' });
  }
  tips.push({ icon: '💧', title: 'Hydration reminder', desc: 'Aim for 3-4 liters of water today. Add lemon for metabolism boost.' });
  return tips;
}
