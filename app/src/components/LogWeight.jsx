import { useState } from 'react';
import { Scale, Plus, Camera, Upload } from 'lucide-react';

export default function LogWeight({ onLog }) {
  const [weight, setWeight] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [note, setNote] = useState('');
  const [mood, setMood] = useState('');
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [saved, setSaved] = useState(false);

  const moods = [
    { value: 'great', label: 'Great', color: 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300' },
    { value: 'good', label: 'Good', color: 'bg-blue-500/20 border-blue-500/40 text-blue-300' },
    { value: 'okay', label: 'Okay', color: 'bg-yellow-500/20 border-yellow-500/40 text-yellow-300' },
    { value: 'tired', label: 'Tired', color: 'bg-orange-500/20 border-orange-500/40 text-orange-300' },
    { value: 'bad', label: 'Bad', color: 'bg-red-500/20 border-red-500/40 text-red-300' },
  ];

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
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
      date,
      note,
      mood,
      image: preview,
      timestamp: Date.now(),
    });
    setSaved(true);
    setTimeout(() => {
      setWeight('');
      setNote('');
      setMood('');
      setImage(null);
      setPreview(null);
      setSaved(false);
    }, 2000);
  };

  return (
    <div className="max-w-lg mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-1">Log Weight</h2>
        <p className="text-gray-400 text-sm">Track your daily progress</p>
      </div>

      <form onSubmit={handleSubmit} className="glass p-6 space-y-6">
        <div>
          <label htmlFor="weight" className="block text-sm font-medium text-gray-300 mb-2">Weight (kg)</label>
          <div className="relative">
            <Scale size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              id="weight"
              type="number"
              step="0.1"
              min="20"
              max="300"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder="Enter weight"
              required
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10
                focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none
                text-white placeholder-gray-500 transition-colors"
            />
          </div>
        </div>

        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-300 mb-2">Date</label>
          <input
            id="date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10
              focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none
              text-white transition-colors"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">How do you feel?</label>
          <div className="flex flex-wrap gap-2">
            {moods.map(m => (
              <button
                key={m.value}
                type="button"
                onClick={() => setMood(m.value === mood ? '' : m.value)}
                className={`px-4 py-2 rounded-xl text-sm font-medium border cursor-pointer
                  transition-all duration-200
                  ${mood === m.value ? m.color : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'}`}
              >
                {m.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label htmlFor="note" className="block text-sm font-medium text-gray-300 mb-2">Notes</label>
          <textarea
            id="note"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="How was your day? What did you eat?"
            rows={3}
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10
              focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none
              text-white placeholder-gray-500 transition-colors resize-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Progress Photo</label>
          {preview ? (
            <div className="relative rounded-xl overflow-hidden">
              <img src={preview} alt="Progress" className="w-full h-48 object-cover" />
              <button
                type="button"
                onClick={() => { setImage(null); setPreview(null); }}
                className="absolute top-2 right-2 p-1.5 rounded-lg bg-black/50 hover:bg-black/70 cursor-pointer transition-colors"
              >
                <span className="text-white text-sm">Remove</span>
              </button>
            </div>
          ) : (
            <label className="flex flex-col items-center justify-center h-32 rounded-xl border-2 border-dashed border-white/10 hover:border-purple-500/50 cursor-pointer transition-colors">
              <Upload size={24} className="text-gray-400 mb-2" />
              <span className="text-sm text-gray-400">Click to upload photo</span>
              <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
            </label>
          )}
        </div>

        <button
          type="submit"
          disabled={!weight || saved}
          className={`w-full py-3 rounded-xl font-semibold text-white cursor-pointer
            transition-all duration-200 flex items-center justify-center gap-2
            ${saved
              ? 'bg-emerald-600 glow-accent'
              : 'bg-purple-600 hover:bg-purple-500 glow-primary disabled:opacity-40 disabled:cursor-not-allowed'
            }`}
        >
          {saved ? (
            <>Saved Successfully!</>
          ) : (
            <><Plus size={18} /> Log Entry</>
          )}
        </button>
      </form>
    </div>
  );
}
