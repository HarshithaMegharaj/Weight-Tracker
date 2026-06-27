import { useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, Line } from 'recharts';
import { TrendingDown, TrendingUp, Flame, Target, Scale, Activity, ArrowRight, Droplets, Dumbbell, Zap, ChevronRight, MessageCircle, Heart, Sparkles, Calendar, Camera, Award } from 'lucide-react';
import { format, differenceInDays, startOfWeek, endOfWeek, isWithinInterval } from 'date-fns';

const dayTypeConfig = {
  working: { emoji: '💪', label: 'Working', color: 'text-emerald-400', bg: 'bg-emerald-500/12' },
  cheat: { emoji: '🍕', label: 'Cheat', color: 'text-amber-400', bg: 'bg-amber-500/12' },
  rest: { emoji: '😴', label: 'Rest', color: 'text-blue-400', bg: 'bg-blue-500/12' },
  skip: { emoji: '😞', label: 'Skip', color: 'text-red-400', bg: 'bg-red-500/12' },
};

function StatCard({ icon: Icon, label, value, unit, trend, trendValue, iconBg, delay = 0, span2 = false }) {
  return (
    <div className={`glass-card p-4 animate-fade-in-up stagger-${delay + 1} ${span2 ? 'bento-span-2' : ''}`}>
      <div className="flex items-center justify-between mb-2.5">
        <div className={`w-9 h-9 rounded-[12px] ${iconBg} flex items-center justify-center shadow-lg`}>
          <Icon size={16} className="text-white glow-icon" />
        </div>
        {trend !== undefined && (
          <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-bold
            ${trend === 'down' ? 'bg-emerald-500/12 text-emerald-400' : 'bg-red-500/12 text-red-400'}`}>
            {trend === 'down' ? <TrendingDown size={10} /> : <TrendingUp size={10} />}
            {trendValue}
          </div>
        )}
      </div>
      <p className="text-[24px] font-extrabold tracking-tight leading-none">{value}</p>
      <p className="text-[10px] text-[var(--text-dim)] mt-1.5 font-bold uppercase tracking-wider">{label}</p>
      {unit && <p className="text-[11px] text-[var(--text-sub)] mt-0.5">{unit}</p>}
    </div>
  );
}

function ChartTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="liquid-glass px-4 py-3 shadow-2xl" style={{ background: 'rgba(5,2,16,0.95)', animationPlayState: 'paused' }}>
      <p className="text-[10px] text-[var(--text-dim)] font-semibold">{label}</p>
      <p className="text-purple-300 font-extrabold text-lg mt-0.5">{payload[0].value} <span className="text-[11px] font-medium text-[var(--text-dim)]">kg</span></p>
    </div>
  );
}

export default function Dashboard({ weightEntries, profile, navigate }) {
  const chartData = useMemo(() => {
    const sorted = [...weightEntries].sort((a, b) => new Date(a.date) - new Date(b.date));
    return sorted.slice(-30).map(e => ({ date: format(new Date(e.date), 'dd'), weight: e.weight, goal: profile.goalWeight || null }));
  }, [weightEntries, profile.goalWeight]);

  const stats = useMemo(() => {
    if (weightEntries.length === 0) return null;
    const sorted = [...weightEntries].sort((a, b) => new Date(a.date) - new Date(b.date));
    const latest = sorted[sorted.length - 1];
    const weekAgo = sorted.find(e => differenceInDays(new Date(latest.date), new Date(e.date)) >= 7) || sorted[0];
    const startWeight = sorted[0];
    const bmi = latest.weight / ((profile.height / 100) ** 2);
    const dayCount = differenceInDays(new Date(), new Date(sorted[0].date)) + 1;
    return {
      current: latest.weight, weeklyChange: (latest.weight - weekAgo.weight).toFixed(1),
      totalLost: (startWeight.weight - latest.weight).toFixed(1), bmi: bmi.toFixed(1),
      streak: calcStreak(sorted), remaining: profile.goalWeight ? (latest.weight - profile.goalWeight).toFixed(1) : null,
      entries: weightEntries.length, dayCount, startDate: sorted[0].date,
    };
  }, [weightEntries, profile]);

  const weeklyRecap = useMemo(() => {
    if (weightEntries.length === 0) return null;
    const now = new Date();
    const weekStart = startOfWeek(now, { weekStartsOn: 1 });
    const weekEnd = endOfWeek(now, { weekStartsOn: 1 });
    const thisWeek = weightEntries.filter(e => {
      const d = new Date(e.date);
      return isWithinInterval(d, { start: weekStart, end: weekEnd });
    });
    if (thisWeek.length === 0) return null;
    const avg = (thisWeek.reduce((s, e) => s + e.weight, 0) / thisWeek.length).toFixed(1);
    const types = { working: 0, cheat: 0, rest: 0, skip: 0 };
    thisWeek.forEach(e => { if (e.dayType && types[e.dayType] !== undefined) types[e.dayType]++; });
    const painAvg = thisWeek.filter(e => e.painLevel !== undefined).length > 0
      ? (thisWeek.filter(e => e.painLevel !== undefined).reduce((s, e) => s + e.painLevel, 0) / thisWeek.filter(e => e.painLevel !== undefined).length).toFixed(1)
      : null;
    return { count: thisWeek.length, avg, types, painAvg };
  }, [weightEntries]);

  const photoComparison = useMemo(() => {
    const withPhotos = [...weightEntries].filter(e => e.image).sort((a, b) => new Date(a.date) - new Date(b.date));
    if (withPhotos.length < 2) return null;
    return { first: withPhotos[0], latest: withPhotos[withPhotos.length - 1] };
  }, [weightEntries]);

  if (!stats) {
    return (
      <div className="px-5 pt-14 flex flex-col items-center text-center min-h-[80dvh] justify-center animate-fade-in-up">
        <div className="liquid-glass p-8 max-w-sm w-full text-center" style={{ animationPlayState: 'paused' }}>
          <div className="w-20 h-20 rounded-[26px] bg-gradient-to-br from-purple-500/25 to-indigo-600/15 flex items-center justify-center mx-auto mb-5 border border-purple-500/20 shadow-[0_0_40px_rgba(139,92,246,0.2)]">
            <Sparkles size={32} className="text-purple-400 glow-icon" />
          </div>
          <h1 className="text-2xl font-extrabold mb-2">Welcome to <span className="gradient-text">FitGlow</span></h1>
          <p className="text-[var(--text-sub)] text-sm leading-relaxed mb-7">Start your transformation journey. Log your first weight and your AI coach will take over.</p>
          <button onClick={() => navigate('log')} className="btn-primary w-full flex items-center justify-center gap-2 cursor-pointer active:scale-95 transition-transform">
            <span className="relative z-10 flex items-center gap-2">Get Started <ArrowRight size={16} /></span>
          </button>
        </div>
      </div>
    );
  }

  const tips = getTips(stats, profile);

  return (
    <div style={{ padding: '24px 20px 0' }} className="space-y-5">
      <div className="animate-fade-in-up">
        <p className="text-[11px] text-purple-400 font-bold uppercase tracking-widest">{greeting()}</p>
        <h1 className="text-[28px] font-extrabold mt-1 leading-tight">
          {profile.name || 'Your Dashboard'}
        </h1>
      </div>

      <div className="glass-card p-4 flex items-center justify-between animate-fade-in-up stagger-1">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-[18px] bg-gradient-to-br from-purple-500/20 to-indigo-600/10 flex flex-col items-center justify-center border border-purple-500/15">
            <span className="text-[20px] font-extrabold text-purple-300 leading-none">{stats.dayCount}</span>
            <span className="text-[8px] text-purple-400/60 font-bold uppercase">Day</span>
          </div>
          <div>
            <p className="text-[15px] font-extrabold">Day {stats.dayCount} of Your Journey</p>
            <p className="text-[11px] text-[var(--text-dim)] mt-0.5">Started {format(new Date(stats.startDate), 'MMM dd, yyyy')}</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <Flame size={14} className="text-orange-400" />
          <span className="text-[13px] font-bold text-orange-300">{stats.streak}d</span>
        </div>
      </div>

      <div className="bento-grid">
        <StatCard icon={Scale} label="Current" value={stats.current} unit="kg"
          trend={stats.weeklyChange < 0 ? 'down' : stats.weeklyChange > 0 ? 'up' : undefined}
          trendValue={`${Math.abs(stats.weeklyChange)}kg`}
          iconBg="bg-gradient-to-br from-purple-500 to-indigo-600 shadow-purple-500/30" delay={0} />
        <StatCard icon={TrendingDown} label="Total Lost" value={stats.totalLost > 0 ? stats.totalLost : '0'} unit="kg"
          iconBg="bg-gradient-to-br from-emerald-500 to-teal-600 shadow-emerald-500/30" delay={1} />
        <StatCard icon={Activity} label="BMI" value={stats.bmi} unit={bmiLabel(stats.bmi)}
          iconBg="bg-gradient-to-br from-blue-500 to-cyan-600 shadow-blue-500/30" delay={2} />
        <StatCard
          icon={stats.remaining > 0 ? Target : Flame}
          label={stats.remaining > 0 ? 'To Goal' : 'Streak'}
          value={stats.remaining > 0 ? stats.remaining : stats.streak}
          unit={stats.remaining > 0 ? 'kg left' : 'days'}
          iconBg="bg-gradient-to-br from-orange-500 to-amber-600 shadow-orange-500/30" delay={3} />
      </div>

      {weeklyRecap && (
        <div className="glass-card animate-fade-in-up stagger-5" style={{ padding: '20px' }}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold flex items-center gap-2">
              <Calendar size={14} className="text-purple-400" /> Weekly Recap
            </h3>
            <span className="text-[10px] text-[var(--text-dim)] font-semibold uppercase tracking-wider">{weeklyRecap.count} entries</span>
          </div>
          <div className="grid grid-cols-2 gap-2.5 mb-3">
            <div className="p-3 rounded-[14px] bg-white/[0.03] border border-white/[0.05] text-center">
              <p className="text-[18px] font-extrabold">{weeklyRecap.avg}</p>
              <p className="text-[10px] text-[var(--text-dim)] font-semibold mt-0.5">Avg Weight (kg)</p>
            </div>
            {weeklyRecap.painAvg && (
              <div className="p-3 rounded-[14px] bg-white/[0.03] border border-white/[0.05] text-center">
                <p className={`text-[18px] font-extrabold ${parseFloat(weeklyRecap.painAvg) <= 3 ? 'text-emerald-400' : parseFloat(weeklyRecap.painAvg) <= 6 ? 'text-amber-400' : 'text-red-400'}`}>{weeklyRecap.painAvg}/10</p>
                <p className="text-[10px] text-[var(--text-dim)] font-semibold mt-0.5">Avg Pain</p>
              </div>
            )}
          </div>
          <div className="flex gap-2 flex-wrap">
            {Object.entries(weeklyRecap.types).map(([type, count]) => {
              if (count === 0) return null;
              const cfg = dayTypeConfig[type];
              return (
                <div key={type} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full ${cfg.bg} text-[11px] font-bold ${cfg.color}`}>
                  <span>{cfg.emoji}</span> {count} {cfg.label}
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div className="glass-card animate-fade-in-up stagger-5" style={{ padding: '20px' }}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-bold">Weight Trend</h3>
          <span className="text-[10px] text-[var(--text-dim)] font-semibold uppercase tracking-wider">Last 30 days</span>
        </div>
        <ResponsiveContainer width="100%" height={180}>
          <AreaChart data={chartData} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
            <defs>
              <linearGradient id="wg" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#8B5CF6" stopOpacity={0.35} />
                <stop offset="100%" stopColor="#8B5CF6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="date" stroke="#2D2650" fontSize={10} tickLine={false} axisLine={false} />
            <YAxis stroke="#2D2650" fontSize={10} tickLine={false} axisLine={false} domain={['dataMin - 1', 'dataMax + 1']} />
            <Tooltip content={<ChartTooltip />} />
            <Area type="monotone" dataKey="weight" stroke="#8B5CF6" strokeWidth={2.5} fill="url(#wg)"
              dot={{ fill: '#050210', stroke: '#8B5CF6', strokeWidth: 2, r: 3 }}
              activeDot={{ r: 7, fill: '#8B5CF6', stroke: '#050210', strokeWidth: 3 }} />
            {chartData[0]?.goal && <Line type="monotone" dataKey="goal" stroke="#2DD4BF" strokeWidth={1.5} strokeDasharray="5 3" dot={false} strokeOpacity={0.5} />}
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {photoComparison && (
        <div className="glass-card animate-fade-in-up stagger-6" style={{ padding: '20px' }} onClick={() => navigate('progress')}>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold flex items-center gap-2">
              <Camera size={14} className="text-purple-400" /> Transformation
            </h3>
            <ChevronRight size={14} className="text-[var(--text-dim)]" />
          </div>
          <div className="flex gap-3">
            <div className="flex-1 relative rounded-[14px]" style={{ overflow: 'hidden' }}>
              <img src={photoComparison.first.image} alt="Before" className="w-full h-28 object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-2 left-2.5">
                <p className="text-white text-[11px] font-bold">Before</p>
                <p className="text-white/60 text-[10px]">{photoComparison.first.weight} kg</p>
              </div>
            </div>
            <div className="flex-1 relative rounded-[14px]" style={{ overflow: 'hidden' }}>
              <img src={photoComparison.latest.image} alt="Latest" className="w-full h-28 object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-2 left-2.5">
                <p className="text-white text-[11px] font-bold">Latest</p>
                <p className="text-white/60 text-[10px]">{photoComparison.latest.weight} kg</p>
              </div>
            </div>
          </div>
          <p className="text-[11px] text-[var(--text-dim)] text-center mt-2.5 font-semibold">
            {(photoComparison.first.weight - photoComparison.latest.weight).toFixed(1)} kg difference
          </p>
        </div>
      )}

      <div className="space-y-2.5 animate-fade-in-up stagger-6">
        <h3 className="text-sm font-bold px-1">Quick Actions</h3>
        <div className="flex gap-2.5 overflow-x-auto scrollbar-thin pb-1 -mx-1 px-1">
          {[
            { label: 'Log Weight', icon: Scale, gradient: 'from-purple-500/20 to-purple-600/5', border: 'border-purple-500/20', tab: 'log', glow: 'shadow-purple-500/10' },
            { label: 'AI Coach', icon: MessageCircle, gradient: 'from-emerald-500/20 to-emerald-600/5', border: 'border-emerald-500/20', tab: 'trainer', glow: 'shadow-emerald-500/10' },
            { label: 'Exercise', icon: Dumbbell, gradient: 'from-blue-500/20 to-blue-600/5', border: 'border-blue-500/20', tab: 'exercise', glow: 'shadow-blue-500/10' },
            { label: 'Goals', icon: Target, gradient: 'from-orange-500/20 to-orange-600/5', border: 'border-orange-500/20', tab: 'goals', glow: 'shadow-orange-500/10' },
          ].map((a, i) => (
            <button key={i} onClick={() => navigate(a.tab)}
              className={`shrink-0 flex items-center gap-2.5 px-5 py-3.5 rounded-2xl bg-gradient-to-br ${a.gradient} ${a.border} border cursor-pointer active:scale-[0.96] transition-all shadow-lg ${a.glow}`}>
              <a.icon size={16} className="text-white/80" />
              <span className="text-[12px] font-bold text-white/85 whitespace-nowrap">{a.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2.5 animate-fade-in-up stagger-7">
        <h3 className="text-sm font-bold px-1">Coach Insights</h3>
        {tips.map((tip, i) => (
          <div key={i} className="glass-card p-4 flex items-start gap-3.5">
            <div className={`w-11 h-11 rounded-[15px] bg-gradient-to-br ${tip.gradient} flex items-center justify-center shrink-0 shadow-lg`}>
              <tip.icon size={18} className="text-white glow-icon" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[13px] font-bold">{tip.title}</p>
              <p className="text-[12px] text-[var(--text-sub)] mt-0.5 leading-relaxed">{tip.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="animate-fade-in-up stagger-7">
        <div className="flex items-center justify-between px-1 mb-2.5">
          <h3 className="text-sm font-bold">Recent Entries</h3>
          <span className="text-[11px] text-[var(--text-dim)] font-semibold">{stats.entries} total</span>
        </div>
        <div className="glass-card divide-y divide-white/[0.04]">
          {[...weightEntries].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5).map((e, i) => {
            const dt = e.dayType ? dayTypeConfig[e.dayType] : null;
            return (
              <div key={i} className="flex items-center justify-between px-5 py-3.5">
                <div className="flex items-center gap-3">
                  {dt ? (
                    <span className="text-[14px]">{dt.emoji}</span>
                  ) : (
                    <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-br from-purple-400 to-indigo-500 shadow-[0_0_8px_rgba(139,92,246,0.3)]" />
                  )}
                  <div>
                    <span className="text-[13px] text-[var(--text-sub)]">{format(new Date(e.date), 'MMM dd')}</span>
                    {dt && <span className={`text-[10px] ml-1.5 ${dt.color}`}>{dt.label}</span>}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {e.painLevel !== undefined && e.painLevel > 0 && (
                    <span className={`text-[10px] font-bold ${e.painLevel <= 3 ? 'text-emerald-400' : e.painLevel <= 6 ? 'text-amber-400' : 'text-red-400'}`}>
                      P:{e.painLevel}
                    </span>
                  )}
                  {e.mood && <span className="text-[11px] text-[var(--text-dim)] capitalize">{e.mood}</span>}
                  <span className="text-[14px] font-bold tabular-nums">{e.weight}<span className="text-[11px] font-medium text-[var(--text-dim)] ml-0.5">kg</span></span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function greeting() { const h = new Date().getHours(); return h < 12 ? 'Good Morning' : h < 17 ? 'Good Afternoon' : 'Good Evening'; }
function calcStreak(s) { let k = 0; const t = new Date(); for (let i = s.length - 1; i >= 0; i--) { if (differenceInDays(t, new Date(s[i].date)) <= k + 1) k++; else break; } return k; }
function bmiLabel(b) { return b < 18.5 ? 'Underweight' : b < 25 ? 'Normal' : b < 30 ? 'Overweight' : 'Obese'; }
function getTips(s, p) {
  const t = [];
  t.push(s.weeklyChange > 0
    ? { icon: Flame, gradient: 'from-orange-500/80 to-red-500/80', title: 'Weight up this week', desc: 'Focus on portion control. Walk 15 min after meals.' }
    : { icon: TrendingDown, gradient: 'from-emerald-500/80 to-teal-500/80', title: `Down ${Math.abs(s.weeklyChange)}kg!`, desc: 'Keep it up! Stay consistent with your routine.' });
  if (p.conditions?.includes('sciatica'))
    t.push({ icon: Heart, gradient: 'from-blue-500/80 to-indigo-500/80', title: 'Sciatica-safe day', desc: 'Try swimming, gentle yoga, or a 30-min walk today. Every kg lost reduces spine pressure.' });
  t.push({ icon: Droplets, gradient: 'from-cyan-500/80 to-blue-500/80', title: 'Stay hydrated', desc: 'Aim for 3-4 liters. Warm lemon water boosts metabolism.' });
  return t;
}
