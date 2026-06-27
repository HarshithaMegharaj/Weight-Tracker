import { useState } from 'react';
import { Utensils, Clock, Flame, Leaf, ShoppingCart, ChevronDown, AlertTriangle, Check } from 'lucide-react';

const meals = [
  { time: '6:30 AM', name: 'Morning Ritual', items: ['Warm water + lemon + turmeric', 'Soaked almonds (5-6)', 'Green tea'], cal: 80, prot: '3g', tip: 'Turmeric is anti-inflammatory — great for sciatica' },
  { time: '8:00 AM', name: 'Breakfast', items: ['2 egg whites + 1 whole egg omelette', 'OR: Moong dal chilla (2)', 'OR: Oats upma with veggies'], cal: 350, prot: '22g', tip: 'High protein keeps you full longer' },
  { time: '10:30 AM', name: 'Mid-Morning', items: ['Greek yogurt + flax seeds', 'OR: Apple / Guava', 'OR: Roasted chana'], cal: 150, prot: '8g', tip: 'Flax seeds: omega-3 for inflammation' },
  { time: '1:00 PM', name: 'Lunch', items: ['Grilled chicken (150g) / Fish curry', 'Brown rice (1 cup) or 2 roti', 'Mixed sabzi + raita + salad'], cal: 500, prot: '35g', tip: 'Fish omega-3 reduces nerve inflammation' },
  { time: '4:00 PM', name: 'Evening Snack', items: ['Sprouts chaat with lemon', 'OR: Protein shake + banana', 'OR: Roasted makhana'], cal: 150, prot: '10g', tip: 'Makhana: low-cal, high protein' },
  { time: '7:30 PM', name: 'Dinner', items: ['Grilled fish / Chicken tikka', 'OR: Palak dal / Moong dal', 'Multigrain roti + veggies', 'Turmeric milk before bed'], cal: 400, prot: '28g', tip: 'Keep dinner light. Turmeric milk helps sleep.' },
];

const shopping = [
  { cat: 'Proteins', items: ['Chicken breast', 'Fish', 'Eggs', 'Paneer', 'Moong dal', 'Greek yogurt'] },
  { cat: 'Grains', items: ['Brown rice', 'Oats', 'Quinoa', 'Multigrain atta'] },
  { cat: 'Veggies', items: ['Spinach', 'Lauki', 'Beans', 'Broccoli', 'Cucumber', 'Tomatoes'] },
  { cat: 'Pantry', items: ['Turmeric', 'Flax seeds', 'Almonds', 'Green tea', 'Olive oil'] },
];

const avoid = ['Fried foods (samosa, pakora)', 'White bread / maida', 'Sugary drinks', 'Excessive rice', 'Late heavy meals', 'Processed snacks', 'Excess salt', 'Red meat / Beef'];

function MealCard({ meal, idx }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`glass-card overflow-hidden animate-fade-in-up stagger-${Math.min(idx + 1, 6)}`}>
      <button onClick={() => setOpen(!open)} className="w-full p-4 flex items-center gap-3.5 cursor-pointer active:bg-white/[0.02] transition-colors">
        <div className="w-11 h-11 rounded-[14px] bg-gradient-to-br from-purple-500/15 to-indigo-600/5 flex items-center justify-center border border-purple-500/10 text-[15px] font-extrabold text-purple-300">
          {idx + 1}
        </div>
        <div className="flex-1 text-left min-w-0">
          <p className="text-[13px] font-bold truncate">{meal.name}</p>
          <p className="text-[11px] text-[var(--text-dim)] flex items-center gap-1 mt-0.5"><Clock size={10} /> {meal.time}</p>
        </div>
        <div className="text-right shrink-0">
          <p className="text-[12px] font-bold text-emerald-400">{meal.cal} cal</p>
          <p className="text-[10px] text-[var(--text-dim)]">{meal.prot}</p>
        </div>
        <ChevronDown size={14} className={`text-[var(--text-dim)] transition-transform duration-300 shrink-0 ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="px-4 pb-4 animate-fade-in">
          <div className="pt-3 border-t border-white/[0.05] space-y-1.5">
            {meal.items.map((it, i) => (
              <p key={i} className="text-[13px] text-[var(--text-sub)] flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400/40 mt-1.5 shrink-0" />{it}
              </p>
            ))}
            {meal.tip && (
              <div className="mt-3 p-3 rounded-xl bg-emerald-500/[0.06] border border-emerald-500/12">
                <p className="text-[12px] text-emerald-400/90 flex items-start gap-2"><Leaf size={12} className="shrink-0 mt-0.5" />{meal.tip}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default function DietPlan() {
  const [tab, setTab] = useState('plan');
  const [checked, setChecked] = useState(new Set());
  const totalCal = meals.reduce((s, m) => s + m.cal, 0);

  return (
    <div style={{ padding: "24px 20px 0" }} className="space-y-5">
      <div className="animate-fade-in-up">
        <p className="text-[11px] text-purple-400 font-bold uppercase tracking-widest">Nutrition</p>
        <h1 className="text-[28px] font-extrabold mt-1">Diet Plan</h1>
      </div>

      <div className="flex gap-2 animate-fade-in-up stagger-1">
        {[{ id: 'plan', l: 'Meals', ic: Utensils }, { id: 'shop', l: 'Shopping', ic: ShoppingCart }].map(t => (
          <button key={t.id} onClick={() => setTab(t.id)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-[14px] text-[13px] font-bold cursor-pointer active:scale-95 transition-all
              ${tab === t.id ? 'chip-active' : 'chip'}`}>
            <t.ic size={14} /> {t.l}
          </button>
        ))}
      </div>

      {tab === 'plan' && (
        <>
          <div className="glass-card p-5 animate-fade-in-up stagger-1">
            <p className="text-[10px] text-[var(--text-dim)] font-bold uppercase tracking-widest">Daily Target</p>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-[28px] font-extrabold gradient-text">~{totalCal}</span>
              <span className="text-[13px] text-[var(--text-sub)] font-semibold">cal</span>
            </div>
          </div>
          <div className="space-y-2.5">{meals.map((m, i) => <MealCard key={i} meal={m} idx={i} />)}</div>
          <div className="glass-card p-5 animate-fade-in-up">
            <h3 className="text-[13px] font-bold text-red-400/80 mb-3 flex items-center gap-2"><AlertTriangle size={14} /> Avoid</h3>
            <div className="grid grid-cols-1 gap-2">
              {avoid.map((it, i) => (
                <div key={i} className="flex items-center gap-2.5 text-[13px] text-[var(--text-sub)]">
                  <span className="w-5 h-5 rounded-[8px] bg-red-500/10 flex items-center justify-center shrink-0 text-[10px] text-red-400 font-bold">x</span>{it}
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {tab === 'shop' && (
        <div className="space-y-3">
          {shopping.map((c, ci) => (
            <div key={ci} className={`glass-card p-5 animate-fade-in-up stagger-${Math.min(ci + 1, 6)}`}>
              <h3 className="text-[13px] font-bold text-purple-300 mb-3">{c.cat}</h3>
              <div className="space-y-2">
                {c.items.map((it, j) => {
                  const k = `${ci}-${j}`;
                  const done = checked.has(k);
                  return (
                    <button key={j} onClick={() => setChecked(p => { const n = new Set(p); n.has(k) ? n.delete(k) : n.add(k); return n; })}
                      className="w-full flex items-center gap-3 p-2 rounded-xl cursor-pointer active:bg-white/[0.04] transition-colors text-left">
                      <div className={`w-5 h-5 rounded-[7px] border-[1.5px] flex items-center justify-center transition-all shrink-0
                        ${done ? 'bg-purple-500/20 border-purple-500/50' : 'border-white/10'}`}>
                        {done && <Check size={11} className="text-purple-300" />}
                      </div>
                      <span className={`text-[13px] ${done ? 'line-through text-[var(--text-dim)]' : 'text-[var(--text-sub)]'}`}>{it}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
