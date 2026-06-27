import { useState } from 'react';
import { Scale, Upload, Check, Zap, Sun, Smile, Meh, Frown, Sparkles, Activity } from 'lucide-react';

const moods = [
  { v: 'great', l: 'Great', icon: Zap, bg: 'rgba(16,185,129,0.15)', bc: 'rgba(16,185,129,0.4)', tc: '#6ee7b7' },
  { v: 'good', l: 'Good', icon: Sun, bg: 'rgba(59,130,246,0.15)', bc: 'rgba(59,130,246,0.4)', tc: '#93c5fd' },
  { v: 'okay', l: 'Okay', icon: Smile, bg: 'rgba(234,179,8,0.15)', bc: 'rgba(234,179,8,0.4)', tc: '#fde047' },
  { v: 'tired', l: 'Tired', icon: Meh, bg: 'rgba(249,115,22,0.15)', bc: 'rgba(249,115,22,0.4)', tc: '#fdba74' },
  { v: 'bad', l: 'Bad', icon: Frown, bg: 'rgba(239,68,68,0.15)', bc: 'rgba(239,68,68,0.4)', tc: '#fca5a5' },
];

const dayTypes = [
  { v: 'working', l: 'Working Day', emoji: '💪', bg: 'rgba(16,185,129,0.15)', bc: 'rgba(16,185,129,0.4)', tc: '#6ee7b7' },
  { v: 'cheat', l: 'Cheat Day', emoji: '🍕', bg: 'rgba(245,158,11,0.15)', bc: 'rgba(245,158,11,0.4)', tc: '#fcd34d' },
  { v: 'rest', l: 'Rest Day', emoji: '😴', bg: 'rgba(59,130,246,0.15)', bc: 'rgba(59,130,246,0.4)', tc: '#93c5fd' },
  { v: 'skip', l: 'Gave Up', emoji: '😞', bg: 'rgba(239,68,68,0.15)', bc: 'rgba(239,68,68,0.4)', tc: '#fca5a5' },
];

const painLabels = ['None', '', '🙂', '', 'Mild', '', '😣', '', 'Bad', '', '🔥 Severe'];

function compressImage(dataUrl, maxWidth = 800, quality = 0.7) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      let { width, height } = img;
      if (width > maxWidth) {
        height = (height * maxWidth) / width;
        width = maxWidth;
      }
      canvas.width = width;
      canvas.height = height;
      canvas.getContext('2d').drawImage(img, 0, 0, width, height);
      resolve(canvas.toDataURL('image/jpeg', quality));
    };
    img.src = dataUrl;
  });
}

export default function LogWeight({ onLog, profile }) {
  const [weight, setWeight] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [note, setNote] = useState('');
  const [mood, setMood] = useState('');
  const [dayType, setDayType] = useState('working');
  const [painLevel, setPainLevel] = useState(0);
  const [preview, setPreview] = useState(null);
  const [saved, setSaved] = useState(false);
  const [compressing, setCompressing] = useState(false);

  const hasSciatica = profile?.conditions?.includes('sciatica');

  const handleImg = async (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setCompressing(true);
    const reader = new FileReader();
    reader.onload = async (ev) => {
      const compressed = await compressImage(ev.target.result);
      setPreview(compressed);
      setCompressing(false);
    };
    reader.readAsDataURL(f);
  };

  const submit = (e) => {
    e.preventDefault();
    if (!weight) return;
    onLog({
      weight: parseFloat(weight), date, note, mood, dayType,
      painLevel: hasSciatica ? painLevel : undefined,
      image: preview, timestamp: Date.now(),
    });
    setSaved(true);
    setTimeout(() => {
      setWeight(''); setNote(''); setMood(''); setDayType('working');
      setPainLevel(0); setPreview(null); setSaved(false);
      setDate(new Date().toISOString().split('T')[0]);
    }, 2000);
  };

  return (
    <div style={{ padding: "24px 20px 16px" }}>
      <div className="animate-fade-in-up mb-6">
        <p className="text-[11px] text-purple-400 font-bold uppercase tracking-widest">Daily Check-in</p>
        <h1 className="text-[28px] font-extrabold mt-1">Log Weight</h1>
      </div>

      <form onSubmit={submit} className="space-y-4">
        <div className="glass-card space-y-4 animate-fade-in-up stagger-1" style={{ padding: '20px' }}>
          <div>
            <label className="block text-[11px] font-bold text-[var(--text-dim)] uppercase tracking-widest mb-2.5">Weight (kg)</label>
            <div style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', width: '40px', height: '40px', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(to bottom right, rgba(139,92,246,0.2), rgba(79,70,229,0.1))', border: '1px solid rgba(139,92,246,0.1)' }}>
                <Scale size={16} className="text-purple-400" />
              </div>
              <input type="number" step="0.1" min="20" max="300" value={weight} onChange={(e) => setWeight(e.target.value)}
                placeholder="Enter weight" required className="input-field text-xl font-extrabold" style={{ paddingLeft: '68px' }} />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-[var(--text-dim)] uppercase tracking-widest mb-2.5">Date</label>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="input-field" />
          </div>
        </div>

        <div className="glass-card animate-fade-in-up stagger-2" style={{ padding: '20px' }}>
          <label className="block text-[11px] font-bold text-[var(--text-dim)] uppercase tracking-widest mb-3">Day Type</label>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
            {dayTypes.map(d => {
              const isActive = dayType === d.v;
              return (
                <button key={d.v} type="button" onClick={() => setDayType(d.v)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '10px',
                    padding: '14px 16px', borderRadius: '16px', fontSize: '13px', fontWeight: 700,
                    cursor: 'pointer', transition: 'all 0.2s', borderWidth: '1.5px', borderStyle: 'solid',
                    background: isActive ? d.bg : 'rgba(255,255,255,0.03)',
                    borderColor: isActive ? d.bc : 'rgba(255,255,255,0.07)',
                    color: isActive ? d.tc : 'var(--text-dim)',
                  }}>
                  <span style={{ fontSize: '16px' }}>{d.emoji}</span> {d.l}
                </button>
              );
            })}
          </div>
        </div>

        <div className="glass-card animate-fade-in-up stagger-3" style={{ padding: '20px' }}>
          <label className="block text-[11px] font-bold text-[var(--text-dim)] uppercase tracking-widest mb-3">How do you feel?</label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {moods.map(m => {
              const Icon = m.icon;
              const isActive = mood === m.v;
              return (
                <button key={m.v} type="button" onClick={() => setMood(m.v === mood ? '' : m.v)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '8px',
                    padding: '12px 16px', borderRadius: '16px', fontSize: '13px', fontWeight: 700,
                    cursor: 'pointer', transition: 'all 0.2s', borderWidth: '1.5px', borderStyle: 'solid',
                    background: isActive ? m.bg : 'rgba(255,255,255,0.03)',
                    borderColor: isActive ? m.bc : 'rgba(255,255,255,0.07)',
                    color: isActive ? m.tc : 'var(--text-dim)',
                  }}>
                  <Icon size={15} /> {m.l}
                </button>
              );
            })}
          </div>
        </div>

        {hasSciatica && (
          <div className="glass-card animate-fade-in-up stagger-4" style={{ padding: '20px' }}>
            <label className="block text-[11px] font-bold text-[var(--text-dim)] uppercase tracking-widest mb-3">
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Activity size={12} /> Sciatica Pain Level</span>
            </label>
            <div className="space-y-3">
              <input type="range" min="0" max="10" value={painLevel} onChange={e => setPainLevel(parseInt(e.target.value))}
                className="w-full h-2 rounded-full appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, #34D399 0%, #FBBF24 50%, #F87171 100%)`,
                  accentColor: painLevel <= 3 ? '#34D399' : painLevel <= 6 ? '#FBBF24' : '#F87171',
                }} />
              <div className="flex justify-between text-[11px] text-[var(--text-dim)]">
                <span>No Pain</span>
                <span className={`text-[14px] font-extrabold ${painLevel <= 3 ? 'text-emerald-400' : painLevel <= 6 ? 'text-amber-400' : 'text-red-400'}`}>
                  {painLevel}/10 {painLabels[painLevel]}
                </span>
                <span>Severe</span>
              </div>
              {painLevel >= 7 && (
                <div className="p-3 rounded-xl bg-red-500/[0.08] border border-red-500/15 text-[12px] text-red-300/80">
                  High pain detected. Consider rest, ice therapy, and gentle stretching. Avoid heavy exercises today.
                </div>
              )}
            </div>
          </div>
        )}

        <div className="glass-card animate-fade-in-up stagger-4" style={{ padding: '20px' }}>
          <label className="block text-[11px] font-bold text-[var(--text-dim)] uppercase tracking-widest mb-2.5">Notes</label>
          <textarea value={note} onChange={(e) => setNote(e.target.value)}
            placeholder="How was your day? What did you eat?" rows={3}
            className="input-field resize-none leading-relaxed" />
        </div>

        <div className="glass-card animate-fade-in-up stagger-5" style={{ padding: '20px' }}>
          <label className="block text-[11px] font-bold text-[var(--text-dim)] uppercase tracking-widest mb-2.5">Progress Photo</label>
          {compressing ? (
            <div className="flex flex-col items-center justify-center h-32 rounded-[20px] border-[1.5px] border-dashed border-purple-500/20">
              <div className="w-8 h-8 border-2 border-purple-400 border-t-transparent rounded-full animate-spin mb-2" />
              <span className="text-[12px] text-[var(--text-sub)]">Compressing photo...</span>
            </div>
          ) : preview ? (
            <div className="relative rounded-[20px]" style={{ overflow: 'hidden' }}>
              <img src={preview} alt="Progress" className="w-full h-48 object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <button type="button" onClick={() => setPreview(null)}
                className="absolute top-3 right-3 px-3.5 py-2 rounded-xl bg-black/50 backdrop-blur-sm text-[12px] font-bold text-white cursor-pointer border border-white/10 active:scale-95 transition-transform">
                Remove
              </button>
            </div>
          ) : (
            <label className="flex flex-col items-center justify-center h-32 rounded-[20px] border-[1.5px] border-dashed border-white/[0.08] cursor-pointer active:bg-purple-500/5 transition-colors">
              <div className="w-12 h-12 rounded-[16px] bg-white/[0.04] flex items-center justify-center mb-2.5">
                <Upload size={20} className="text-[var(--text-dim)]" />
              </div>
              <span className="text-[13px] text-[var(--text-sub)] font-medium">Tap to upload</span>
              <span className="text-[11px] text-[var(--text-dim)] mt-0.5">JPG, PNG up to 10MB</span>
              <input type="file" accept="image/*" onChange={handleImg} className="hidden" />
            </label>
          )}
        </div>

        <button type="submit" disabled={!weight || saved}
          className={`w-full py-4 rounded-[20px] font-bold text-white cursor-pointer flex items-center justify-center gap-2.5 text-[15px]
            transition-all duration-200 active:scale-[0.96] animate-fade-in-up stagger-6
            ${saved
              ? 'bg-emerald-600 shadow-[0_8px_32px_rgba(52,211,153,0.3)]'
              : 'btn-primary disabled:opacity-30 disabled:cursor-not-allowed'}`}>
          {saved ? <><Check size={18} /> Logged Successfully!</> : <><Sparkles size={18} className="relative z-10" /> Log Entry</>}
        </button>
      </form>
    </div>
  );
}
