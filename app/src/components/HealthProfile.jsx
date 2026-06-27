import { useState } from 'react';
import { HeartPulse, Save, AlertCircle, User, Check, Activity } from 'lucide-react';

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
    <div className="px-5 pt-6 space-y-5">
      <div className="animate-fade-in-up">
        <p className="text-[11px] text-purple-400 font-bold uppercase tracking-widest">Personal</p>
        <h1 className="text-[28px] font-extrabold mt-1">Health Profile</h1>
      </div>

      <form onSubmit={handleSave} className="space-y-4">
        <div className="glass-card p-5 space-y-4 animate-fade-in-up stagger-1">
          <h3 className="text-[13px] font-bold flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-[12px] bg-gradient-to-br from-purple-500/20 to-indigo-500/10 flex items-center justify-center border border-purple-500/10">
              <User size={15} className="text-purple-400" />
            </div>
            Basic Information
          </h3>

          <div className="space-y-3.5">
            <div>
              <label className="block text-[11px] font-bold text-[var(--text-dim)] uppercase tracking-widest mb-2">Name</label>
              <input type="text" value={form.name} onChange={e => setForm({...form, name: e.target.value})}
                placeholder="Your name" className="input-field" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-[var(--text-dim)] uppercase tracking-widest mb-2">Age</label>
                <input type="number" value={form.age} onChange={e => setForm({...form, age: e.target.value})}
                  placeholder="Age" className="input-field" />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-[var(--text-dim)] uppercase tracking-widest mb-2">Height (cm)</label>
                <input type="number" value={form.height} onChange={e => setForm({...form, height: e.target.value})}
                  placeholder="cm" className="input-field" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-[var(--text-dim)] uppercase tracking-widest mb-2">Gender</label>
                <select value={form.gender} onChange={e => setForm({...form, gender: e.target.value})}
                  className="input-field cursor-pointer">
                  <option value="female">Female</option>
                  <option value="male">Male</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-[11px] font-bold text-[var(--text-dim)] uppercase tracking-widest mb-2">Country</label>
                <input type="text" value={form.country} onChange={e => setForm({...form, country: e.target.value})}
                  className="input-field" />
              </div>
            </div>
            <div>
              <label className="block text-[11px] font-bold text-[var(--text-dim)] uppercase tracking-widest mb-2">Activity Level</label>
              <select value={form.activityLevel} onChange={e => setForm({...form, activityLevel: e.target.value})}
                className="input-field cursor-pointer">
                <option value="sedentary">Sedentary (desk job)</option>
                <option value="light">Lightly Active</option>
                <option value="moderate">Moderately Active</option>
                <option value="active">Very Active</option>
              </select>
            </div>
          </div>
        </div>

        <div className="glass-card p-5 animate-fade-in-up stagger-2">
          <h3 className="text-[13px] font-bold flex items-center gap-2.5 mb-3">
            <div className="w-9 h-9 rounded-[12px] bg-gradient-to-br from-orange-500/20 to-amber-500/10 flex items-center justify-center border border-orange-500/10">
              <AlertCircle size={15} className="text-orange-400" />
            </div>
            Health Conditions
          </h3>
          <p className="text-[11px] text-[var(--text-dim)] mb-3">Select all that apply</p>
          <div className="flex flex-wrap gap-2">
            {conditionsList.map(c => (
              <button key={c} type="button" onClick={() => toggleCondition(c)}
                className={`chip active:scale-95 transition-all
                  ${form.conditions.includes(c.toLowerCase())
                    ? 'bg-orange-500/15 border-orange-500/40 text-orange-300'
                    : ''}`}>
                {c}
              </button>
            ))}
          </div>
        </div>

        <div className="glass-card p-5 animate-fade-in-up stagger-3">
          <h3 className="text-[13px] font-bold flex items-center gap-2.5 mb-3">
            <div className="w-9 h-9 rounded-[12px] bg-gradient-to-br from-emerald-500/20 to-teal-500/10 flex items-center justify-center border border-emerald-500/10">
              <HeartPulse size={15} className="text-emerald-400" />
            </div>
            Dietary Preferences
          </h3>
          <div className="flex flex-wrap gap-2">
            {dietaryPrefs.map(d => (
              <button key={d.id} type="button" onClick={() => toggleDiet(d.id)}
                className={`chip active:scale-95 transition-all
                  ${form.dietPrefs.includes(d.id)
                    ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300'
                    : ''}`}>
                {d.label}
              </button>
            ))}
          </div>
        </div>

        <div className="glass-card p-5 animate-fade-in-up stagger-4">
          <h3 className="text-[13px] font-bold flex items-center gap-2.5 mb-3">
            <div className="w-9 h-9 rounded-[12px] bg-gradient-to-br from-red-500/20 to-pink-500/10 flex items-center justify-center border border-red-500/10">
              <Activity size={15} className="text-red-400" />
            </div>
            Pain & Problem Notes
          </h3>
          <textarea value={form.painNotes} onChange={e => setForm({...form, painNotes: e.target.value})}
            placeholder="Describe your pain, triggers, what helps..." rows={3}
            className="input-field resize-none leading-relaxed" />
        </div>

        <button type="submit"
          className={`w-full py-4 rounded-2xl font-bold text-white cursor-pointer flex items-center justify-center gap-2 text-[15px]
            active:scale-[0.97] transition-all animate-fade-in-up stagger-5
            ${saved ? 'bg-emerald-600 shadow-lg shadow-emerald-500/30' : 'btn-primary'}`}>
          {saved ? <><Check size={16} /> Saved!</> : <><Save size={16} /> Save Profile</>}
        </button>
      </form>
    </div>
  );
}
