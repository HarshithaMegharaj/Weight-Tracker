import { useState } from 'react';
import { Scale, Plus, Upload, Check, Smile, Meh, Frown, Sun, Zap } from 'lucide-react';

export default function LogWeight({ onLog, showToast }) {
  const [weight, setWeight] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [note, setNote] = useState('');
  const [mood, setMood] = useState('');
  const [preview, setPreview] = useState(null);
  const [saved, setSaved] = useState(false);

  const moods = [
    { value: 'great', label: 'Great', icon: Zap, activeClass: 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300 shadow-emerald-500/10 shadow-lg' },
    { value: 'good', label: 'Good', icon: Sun, activeClass: 'bg-blue-500/15 border-blue-500/40 text-blue-300 shadow-blue-500/10 shadow-lg' },
    { value: 'okay', label: 'Okay', icon: Smile, activeClass: 'bg-yellow-500/15 border-yellow-500/40 text-yellow-300 shadow-yellow-500/10 shadow-lg' },
    { value: 'tired', label: 'Tired', icon: Meh, activeClass: 'bg-orange-500/15 border-orange-500/40 text-orange-300 shadow-orange-500/10 shadow-lg' },
    { value: 'bad', label: 'Bad', icon: Frown, activeClass: 'bg-red-500/15 border-red-500/40 text-red-300 shadow-red-500/10 shadow-lg' },
  ];

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setPreview(ev.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!weight) return;
    onLog({
      weight: parseFloat(weight),
      date, note, mood,
      image: preview,
      timestamp: Date.now(),
    });
    setSaved(true);
    setTimeout(() => {
      setWeight(''); setNote(''); setMood(''); setPreview(null); setSaved(false);
    }, 2000);
  };

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <div className="animate-fade-in-up">
        <h2 className="text-3xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>Log Weight</h2>
        <p className="text-gray-500 text-sm mt-1">Track your daily progress</p>
      </div>

      <form onSubmit={handleSubmit} className="glass-card p-8 space-y-7 animate-fade-in-up stagger-1">
        <div>
          <label htmlFor="weight" className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
            Weight (kg)
          </label>
          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-xl bg-purple-500/10 flex items-center justify-center">
              <Scale size={16} className="text-purple-400" />
            </div>
            <input
              id="weight" type="number" step="0.1" min="20" max="300"
              value={weight} onChange={(e) => setWeight(e.target.value)}
              placeholder="Enter your weight"
              required
              className="input-field pl-16 text-lg font-semibold"
            />
          </div>
        </div>

        <div>
          <label htmlFor="date" className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Date</label>
          <input
            id="date" type="date" value={date}
            onChange={(e) => setDate(e.target.value)}
            className="input-field"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">How do you feel?</label>
          <div className="flex flex-wrap gap-2">
            {moods.map(m => {
              const Icon = m.icon;
              return (
                <button
                  key={m.value} type="button"
                  onClick={() => setMood(m.value === mood ? '' : m.value)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium border cursor-pointer
                    transition-all duration-250
                    ${mood === m.value ? m.activeClass : 'bg-white/[0.03] border-white/[0.08] text-gray-500 hover:bg-white/[0.06] hover:text-gray-300'}`}
                >
                  <Icon size={15} />
                  {m.label}
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <label htmlFor="note" className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Notes</label>
          <textarea
            id="note" value={note} onChange={(e) => setNote(e.target.value)}
            placeholder="How was your day? What did you eat?"
            rows={3}
            className="input-field resize-none leading-relaxed"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Progress Photo</label>
          {preview ? (
            <div className="relative rounded-2xl overflow-hidden group">
              <img src={preview} alt="Progress" className="w-full h-52 object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <button
                type="button"
                onClick={() => setPreview(null)}
                className="absolute top-3 right-3 px-3 py-1.5 rounded-xl bg-black/40 backdrop-blur-sm hover:bg-black/60 text-white text-xs font-medium cursor-pointer transition-colors border border-white/10"
              >
                Remove
              </button>
            </div>
          ) : (
            <label className="flex flex-col items-center justify-center h-36 rounded-2xl border border-dashed border-white/[0.08] hover:border-purple-500/40 cursor-pointer transition-all duration-300 hover:bg-purple-500/[0.03] group">
              <div className="w-12 h-12 rounded-2xl bg-white/[0.04] flex items-center justify-center mb-3 group-hover:bg-purple-500/10 transition-colors">
                <Upload size={20} className="text-gray-500 group-hover:text-purple-400 transition-colors" />
              </div>
              <span className="text-sm text-gray-500 group-hover:text-gray-400 transition-colors">Click to upload photo</span>
              <span className="text-[11px] text-gray-600 mt-1">JPG, PNG up to 10MB</span>
              <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
            </label>
          )}
        </div>

        <button
          type="submit" disabled={!weight || saved}
          className={`w-full py-4 rounded-2xl font-semibold text-white cursor-pointer
            transition-all duration-300 flex items-center justify-center gap-2 text-sm
            ${saved
              ? 'bg-emerald-600 glow-accent'
              : 'btn-primary disabled:opacity-30 disabled:cursor-not-allowed disabled:transform-none'
            }`}
        >
          {saved ? (
            <><Check size={18} /> Saved Successfully!</>
          ) : (
            <><Plus size={18} /> Log Entry</>
          )}
        </button>
      </form>
    </div>
  );
}
