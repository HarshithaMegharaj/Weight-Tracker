import { useState } from 'react';
import { HeartPulse, Save, AlertCircle, User, Check } from 'lucide-react';

const conditionsList = [
  'Sciatica', 'Lower back pain', 'Knee pain', 'Shoulder pain',
  'PCOS/PCOD', 'Thyroid', 'Diabetes Type 2', 'High blood pressure',
  'Asthma', 'Migraine', 'Anxiety', 'Insomnia',
];

const dietaryPrefs = [
  { id: 'no-beef', label: 'No Beef' },
  { id: 'chicken', label: 'Chicken OK' },
  { id: 'fish', label: 'Fish OK' },
  { id: 'mutton', label: 'Mutton (occasional)' },
  { id: 'eggs', label: 'Eggs OK' },
  { id: 'dairy', label: 'Dairy OK' },
  { id: 'no-pork', label: 'No Pork' },
  { id: 'vegetarian', label: 'Vegetarian' },
];

export default function HealthProfile({ profile, setProfile, showToast }) {
  const [form, setForm] = useState({
    name: profile.name || '',
    age: profile.age || '',
    height: profile.height || '',
    gender: profile.gender || 'female',
    activityLevel: profile.activityLevel || 'moderate',
    conditions: profile.conditions || ['sciatica'],
    dietPrefs: profile.dietPrefs || ['no-beef', 'chicken', 'fish', 'mutton', 'eggs', 'dairy'],
    country: profile.country || 'India',
    painNotes: profile.painNotes || '',
  });
  const [saved, setSaved] = useState(false);

  const toggleCondition = (c) => {
    setForm(prev => ({
      ...prev,
      conditions: prev.conditions.includes(c.toLowerCase())
        ? prev.conditions.filter(x => x !== c.toLowerCase())
        : [...prev.conditions, c.toLowerCase()],
    }));
  };

  const toggleDiet = (id) => {
    setForm(prev => ({
      ...prev,
      dietPrefs: prev.dietPrefs.includes(id)
        ? prev.dietPrefs.filter(x => x !== id)
        : [...prev.dietPrefs, id],
    }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    setProfile(prev => ({ ...prev, ...form, height: parseFloat(form.height), age: parseInt(form.age) }));
    setSaved(true);
    showToast?.('Profile saved successfully!');
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="animate-fade-in-up">
        <h2 className="text-3xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>Health Profile</h2>
        <p className="text-gray-500 text-sm mt-1">Help your AI trainer understand your body & conditions</p>
      </div>

      <form onSubmit={handleSave} className="space-y-5">
        <div className="glass-card p-7 space-y-5 animate-fade-in-up stagger-1">
          <h3 className="font-semibold flex items-center gap-3 text-sm">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-500/20 to-indigo-500/10 flex items-center justify-center">
              <User size={16} className="text-purple-400" />
            </div>
            Basic Information
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Name</label>
              <input id="name" type="text" value={form.name} onChange={e => setForm({...form, name: e.target.value})}
                placeholder="Your name" className="input-field" />
            </div>
            <div>
              <label htmlFor="age" className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Age</label>
              <input id="age" type="number" value={form.age} onChange={e => setForm({...form, age: e.target.value})}
                placeholder="Your age" className="input-field" />
            </div>
            <div>
              <label htmlFor="height" className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Height (cm)</label>
              <input id="height" type="number" value={form.height} onChange={e => setForm({...form, height: e.target.value})}
                placeholder="Height in cm" className="input-field" />
            </div>
            <div>
              <label htmlFor="gender" className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Gender</label>
              <select id="gender" value={form.gender} onChange={e => setForm({...form, gender: e.target.value})}
                className="input-field cursor-pointer">
                <option value="female">Female</option>
                <option value="male">Male</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label htmlFor="activity" className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Activity Level</label>
              <select id="activity" value={form.activityLevel} onChange={e => setForm({...form, activityLevel: e.target.value})}
                className="input-field cursor-pointer">
                <option value="sedentary">Sedentary (desk job)</option>
                <option value="light">Lightly Active</option>
                <option value="moderate">Moderately Active</option>
                <option value="active">Very Active</option>
              </select>
            </div>
            <div>
              <label htmlFor="country" className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Country</label>
              <input id="country" type="text" value={form.country} onChange={e => setForm({...form, country: e.target.value})}
                className="input-field" />
            </div>
          </div>
        </div>

        <div className="glass-card p-7 animate-fade-in-up stagger-2">
          <h3 className="font-semibold flex items-center gap-3 text-sm mb-4">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-orange-500/20 to-amber-500/10 flex items-center justify-center">
              <AlertCircle size={16} className="text-orange-400" />
            </div>
            Health Conditions
          </h3>
          <p className="text-xs text-gray-500 mb-4">Select all that apply — this customizes your exercise & diet plans</p>
          <div className="flex flex-wrap gap-2">
            {conditionsList.map(c => (
              <button
                key={c} type="button"
                onClick={() => toggleCondition(c)}
                className={`chip transition-all duration-250
                  ${form.conditions.includes(c.toLowerCase())
                    ? 'bg-orange-500/15 border-orange-500/40 text-orange-300 shadow-orange-500/5 shadow-lg'
                    : ''}`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <div className="glass-card p-7 animate-fade-in-up stagger-3">
          <h3 className="font-semibold flex items-center gap-3 text-sm mb-4">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/10 flex items-center justify-center">
              <HeartPulse size={16} className="text-emerald-400" />
            </div>
            Dietary Preferences
          </h3>
          <div className="flex flex-wrap gap-2">
            {dietaryPrefs.map(d => (
              <button
                key={d.id} type="button"
                onClick={() => toggleDiet(d.id)}
                className={`chip transition-all duration-250
                  ${form.dietPrefs.includes(d.id)
                    ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300 shadow-emerald-500/5 shadow-lg'
                    : ''}`}
              >
                {d.label}
              </button>
            ))}
          </div>
        </div>

        <div className="glass-card p-7 animate-fade-in-up stagger-4">
          <h3 className="font-semibold mb-4 text-sm">Pain & Problem Notes</h3>
          <textarea
            value={form.painNotes}
            onChange={e => setForm({...form, painNotes: e.target.value})}
            placeholder="Describe your pain, when it occurs, what makes it worse/better..."
            rows={4}
            className="input-field resize-none leading-relaxed"
          />
        </div>

        <button
          type="submit"
          className={`w-full py-4 rounded-2xl font-semibold text-white cursor-pointer
            transition-all duration-300 flex items-center justify-center gap-2 text-sm
            ${saved ? 'bg-emerald-600 glow-accent' : 'btn-primary'}`}
        >
          {saved ? <><Check size={18} /> Profile Saved!</> : <><Save size={16} /> Save Profile</>}
        </button>
      </form>
    </div>
  );
}
