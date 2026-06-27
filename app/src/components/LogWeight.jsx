import { useState } from 'react';
import { Scale, Plus, Upload, Check, Zap, Sun, Smile, Meh, Frown } from 'lucide-react';

const moods = [
  { v: 'great', l: 'Great', icon: Zap, c: 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300' },
  { v: 'good', l: 'Good', icon: Sun, c: 'bg-blue-500/15 border-blue-500/40 text-blue-300' },
  { v: 'okay', l: 'Okay', icon: Smile, c: 'bg-yellow-500/15 border-yellow-500/40 text-yellow-300' },
  { v: 'tired', l: 'Tired', icon: Meh, c: 'bg-orange-500/15 border-orange-500/40 text-orange-300' },
  { v: 'bad', l: 'Bad', icon: Frown, c: 'bg-red-500/15 border-red-500/40 text-red-300' },
];

export default function LogWeight({ onLog }) {
  const [weight, setWeight] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [note, setNote] = useState('');
  const [mood, setMood] = useState('');
  const [preview, setPreview] = useState(null);
  const [saved, setSaved] = useState(false);

  const handleImg = (e) => { const f = e.target.files?.[0]; if (f) { const r = new FileReader(); r.onload = (ev) => setPreview(ev.target.result); r.readAsDataURL(f); } };

  const submit = (e) => {
    e.preventDefault();
    if (!weight) return;
    onLog({ weight: parseFloat(weight), date, note, mood, image: preview, timestamp: Date.now() });
    setSaved(true);
    setTimeout(() => { setWeight(''); setNote(''); setMood(''); setPreview(null); setSaved(false); }, 2000);
  };

  return (
    <div className="px-5 pt-6 pb-4">
      <div className="animate-fade-in-up mb-6">
        <p className="text-[11px] text-purple-400 font-bold uppercase tracking-widest">Daily Check-in</p>
        <h1 className="text-[28px] font-extrabold mt-1">Log Weight</h1>
      </div>

      <form onSubmit={submit} className="space-y-5">
        <div className="glass-card p-5 space-y-5 animate-fade-in-up stagger-1">
          <div>
            <label className="block text-[11px] font-bold text-[var(--text-dim)] uppercase tracking-widest mb-2.5">Weight (kg)</label>
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-[12px] bg-purple-500/15 flex items-center justify-center">
                <Scale size={15} className="text-purple-400" />
              </div>
              <input type="number" step="0.1" min="20" max="300" value={weight} onChange={(e) => setWeight(e.target.value)}
                placeholder="Enter weight" required className="input-field pl-16 text-xl font-extrabold" />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-[var(--text-dim)] uppercase tracking-widest mb-2.5">Date</label>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="input-field" />
          </div>
        </div>

        <div className="glass-card p-5 animate-fade-in-up stagger-2">
          <label className="block text-[11px] font-bold text-[var(--text-dim)] uppercase tracking-widest mb-3">How do you feel?</label>
          <div className="flex flex-wrap gap-2">
            {moods.map(m => {
              const Icon = m.icon;
              return (
                <button key={m.v} type="button" onClick={() => setMood(m.v === mood ? '' : m.v)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-[14px] text-[13px] font-bold border cursor-pointer
                    transition-all duration-200 active:scale-95
                    ${mood === m.v ? m.c : 'bg-white/[0.03] border-white/[0.07] text-[var(--text-dim)]'}`}>
                  <Icon size={14} /> {m.l}
                </button>
              );
            })}
          </div>
        </div>

        <div className="glass-card p-5 animate-fade-in-up stagger-3">
          <label className="block text-[11px] font-bold text-[var(--text-dim)] uppercase tracking-widest mb-2.5">Notes</label>
          <textarea value={note} onChange={(e) => setNote(e.target.value)}
            placeholder="How was your day? What did you eat?" rows={3}
            className="input-field resize-none leading-relaxed" />
        </div>

        <div className="glass-card p-5 animate-fade-in-up stagger-4">
          <label className="block text-[11px] font-bold text-[var(--text-dim)] uppercase tracking-widest mb-2.5">Progress Photo</label>
          {preview ? (
            <div className="relative rounded-2xl overflow-hidden">
              <img src={preview} alt="Progress" className="w-full h-48 object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <button type="button" onClick={() => setPreview(null)}
                className="absolute top-3 right-3 px-3 py-1.5 rounded-xl bg-black/50 backdrop-blur-sm text-xs font-bold text-white cursor-pointer border border-white/10 active:scale-95 transition-transform">
                Remove
              </button>
            </div>
          ) : (
            <label className="flex flex-col items-center justify-center h-32 rounded-2xl border-[1.5px] border-dashed border-white/[0.08] cursor-pointer active:bg-purple-500/5 transition-colors">
              <div className="w-11 h-11 rounded-2xl bg-white/[0.04] flex items-center justify-center mb-2">
                <Upload size={18} className="text-[var(--text-dim)]" />
              </div>
              <span className="text-[13px] text-[var(--text-sub)] font-medium">Tap to upload</span>
              <span className="text-[11px] text-[var(--text-dim)] mt-0.5">JPG, PNG up to 10MB</span>
              <input type="file" accept="image/*" onChange={handleImg} className="hidden" />
            </label>
          )}
        </div>

        <button type="submit" disabled={!weight || saved}
          className={`w-full py-4 rounded-2xl font-bold text-white cursor-pointer flex items-center justify-center gap-2 text-[15px]
            transition-all duration-200 active:scale-[0.97] animate-fade-in-up stagger-5
            ${saved ? 'bg-emerald-600 shadow-lg shadow-emerald-500/30' : 'btn-primary disabled:opacity-30 disabled:cursor-not-allowed'}`}>
          {saved ? <><Check size={18} /> Saved!</> : <><Plus size={18} /> Log Entry</>}
        </button>
      </form>
    </div>
  );
}
