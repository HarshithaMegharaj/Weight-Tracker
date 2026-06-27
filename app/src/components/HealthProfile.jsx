import { useState } from 'react';
import { HeartPulse, Save, AlertCircle } from 'lucide-react';

const conditionsList = [
  'Sciatica', 'Lower back pain', 'Knee pain', 'Shoulder pain',
  'PCOS/PCOD', 'Thyroid', 'Diabetes Type 2', 'High blood pressure',
  'Asthma', 'Migraine', 'Anxiety', 'Insomnia',
];

const dietaryPrefs = [
  { id: 'no-beef', label: 'No Beef', default: true },
  { id: 'chicken', label: 'Chicken OK', default: true },
  { id: 'fish', label: 'Fish OK', default: true },
  { id: 'mutton', label: 'Mutton (occasionally)', default: true },
  { id: 'eggs', label: 'Eggs OK', default: true },
  { id: 'dairy', label: 'Dairy OK', default: true },
  { id: 'no-pork', label: 'No Pork', default: false },
  { id: 'vegetarian', label: 'Vegetarian', default: false },
];

export default function HealthProfile({ profile, setProfile }) {
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
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-1">Health Profile</h2>
        <p className="text-gray-400 text-sm">Help your AI trainer understand your body & conditions</p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        <div className="glass p-6 space-y-4">
          <h3 className="font-semibold flex items-center gap-2">
            <HeartPulse size={18} className="text-purple-400" /> Basic Info
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="block text-sm text-gray-300 mb-1">Name</label>
              <input id="name" type="text" value={form.name} onChange={e => setForm({...form, name: e.target.value})}
                className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 focus:border-purple-500 outline-none text-white" />
            </div>
            <div>
              <label htmlFor="age" className="block text-sm text-gray-300 mb-1">Age</label>
              <input id="age" type="number" value={form.age} onChange={e => setForm({...form, age: e.target.value})}
                className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 focus:border-purple-500 outline-none text-white" />
            </div>
            <div>
              <label htmlFor="height" className="block text-sm text-gray-300 mb-1">Height (cm)</label>
              <input id="height" type="number" value={form.height} onChange={e => setForm({...form, height: e.target.value})}
                className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 focus:border-purple-500 outline-none text-white" />
            </div>
            <div>
              <label htmlFor="gender" className="block text-sm text-gray-300 mb-1">Gender</label>
              <select id="gender" value={form.gender} onChange={e => setForm({...form, gender: e.target.value})}
                className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 focus:border-purple-500 outline-none text-white cursor-pointer">
                <option value="female">Female</option>
                <option value="male">Male</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label htmlFor="activity" className="block text-sm text-gray-300 mb-1">Activity Level</label>
              <select id="activity" value={form.activityLevel} onChange={e => setForm({...form, activityLevel: e.target.value})}
                className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 focus:border-purple-500 outline-none text-white cursor-pointer">
                <option value="sedentary">Sedentary (desk job)</option>
                <option value="light">Lightly Active</option>
                <option value="moderate">Moderately Active</option>
                <option value="active">Very Active</option>
              </select>
            </div>
            <div>
              <label htmlFor="country" className="block text-sm text-gray-300 mb-1">Country</label>
              <input id="country" type="text" value={form.country} onChange={e => setForm({...form, country: e.target.value})}
                className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 focus:border-purple-500 outline-none text-white" />
            </div>
          </div>
        </div>

        <div className="glass p-6">
          <h3 className="font-semibold flex items-center gap-2 mb-3">
            <AlertCircle size={18} className="text-orange-400" /> Health Conditions
          </h3>
          <p className="text-xs text-gray-400 mb-3">Select all that apply — this helps customize your plan</p>
          <div className="flex flex-wrap gap-2">
            {conditionsList.map(c => (
              <button
                key={c}
                type="button"
                onClick={() => toggleCondition(c)}
                className={`px-3 py-1.5 rounded-xl text-sm cursor-pointer border transition-all duration-200
                  ${form.conditions.includes(c.toLowerCase())
                    ? 'bg-orange-500/20 border-orange-500/40 text-orange-300'
                    : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'}`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <div className="glass p-6">
          <h3 className="font-semibold mb-3">Dietary Preferences</h3>
          <div className="flex flex-wrap gap-2">
            {dietaryPrefs.map(d => (
              <button
                key={d.id}
                type="button"
                onClick={() => toggleDiet(d.id)}
                className={`px-3 py-1.5 rounded-xl text-sm cursor-pointer border transition-all duration-200
                  ${form.dietPrefs.includes(d.id)
                    ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300'
                    : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'}`}
              >
                {d.label}
              </button>
            ))}
          </div>
        </div>

        <div className="glass p-6">
          <h3 className="font-semibold mb-3">Pain & Problem Notes</h3>
          <textarea
            value={form.painNotes}
            onChange={e => setForm({...form, painNotes: e.target.value})}
            placeholder="Describe your pain, when it occurs, what makes it worse/better..."
            rows={4}
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-purple-500 outline-none text-white placeholder-gray-500 resize-none"
          />
        </div>

        <button
          type="submit"
          className={`w-full py-3 rounded-xl font-semibold text-white cursor-pointer transition-all duration-200
            ${saved ? 'bg-emerald-600' : 'bg-purple-600 hover:bg-purple-500'}`}
        >
          <span className="flex items-center justify-center gap-2">
            <Save size={18} /> {saved ? 'Profile Saved!' : 'Save Profile'}
          </span>
        </button>
      </form>
    </div>
  );
}
