import { useState } from 'react';
import { Utensils, Clock, Flame, Leaf, ShoppingCart, ChevronDown, ChevronUp, AlertTriangle, Check } from 'lucide-react';

const mealPlans = {
  indian: {
    meals: [
      {
        time: '6:30 AM', name: 'Morning Ritual', emoji: '1',
        items: ['Warm water with lemon & turmeric', 'Soaked almonds (5-6)', 'Green tea or black coffee'],
        calories: 80, protein: '3g', tip: 'Turmeric is anti-inflammatory — great for sciatica relief',
      },
      {
        time: '8:00 AM', name: 'Breakfast', emoji: '2',
        items: ['2 egg whites + 1 whole egg omelette with veggies', 'OR: Moong dal chilla (2) with mint chutney', 'OR: Oats upma with vegetables'],
        calories: 350, protein: '22g', tip: 'High protein breakfast keeps you full longer',
      },
      {
        time: '10:30 AM', name: 'Mid-Morning Snack', emoji: '3',
        items: ['Greek yogurt with flax seeds', 'OR: A small fruit (apple/guava)', 'OR: Handful of roasted chana'],
        calories: 150, protein: '8g', tip: 'Flax seeds are rich in omega-3, helps with inflammation',
      },
      {
        time: '1:00 PM', name: 'Lunch', emoji: '4',
        items: ['Grilled chicken breast (150g) / Fish curry', 'Brown rice (1 small cup) or 2 roti', 'Mixed sabzi (lauki, beans, spinach)', 'Cucumber raita', 'Small salad'],
        calories: 500, protein: '35g', tip: 'Fish is excellent — omega-3 reduces nerve inflammation from sciatica',
      },
      {
        time: '4:00 PM', name: 'Evening Snack', emoji: '5',
        items: ['Sprouts chaat with lemon', 'OR: Protein shake with banana', 'OR: Roasted makhana (fox nuts)'],
        calories: 150, protein: '10g', tip: 'Makhana is low-calorie, high in protein and anti-oxidants',
      },
      {
        time: '7:30 PM', name: 'Dinner', emoji: '6',
        items: ['Grilled fish / Chicken tikka (120g)', 'OR: Palak dal / Moong dal', 'Multigrain roti (1) or quinoa', 'Steamed/sautéed vegetables', 'Turmeric milk before bed'],
        calories: 400, protein: '28g', tip: 'Keep dinner light. Turmeric milk helps with pain and sleep.',
      },
    ],
  },
  shopping: [
    { category: 'Proteins', icon: '🥩', items: ['Chicken breast', 'Fish (rohu, salmon, pomfret)', 'Eggs', 'Paneer (low-fat)', 'Moong dal', 'Chana dal', 'Greek yogurt'] },
    { category: 'Grains', icon: '🌾', items: ['Brown rice', 'Oats', 'Quinoa', 'Multigrain atta', 'Ragi flour'] },
    { category: 'Vegetables', icon: '🥬', items: ['Spinach (palak)', 'Bottle gourd (lauki)', 'Beans', 'Broccoli', 'Cucumber', 'Tomatoes', 'Carrots', 'Bell peppers'] },
    { category: 'Fruits', icon: '🍎', items: ['Apples', 'Guava', 'Papaya', 'Berries', 'Banana (pre-workout)'] },
    { category: 'Pantry', icon: '🫙', items: ['Turmeric', 'Flax seeds', 'Chia seeds', 'Almonds', 'Walnuts', 'Green tea', 'Apple cider vinegar', 'Olive oil', 'Coconut oil'] },
  ],
  avoid: [
    'Fried foods (samosa, pakora, bhature)',
    'White bread and maida products',
    'Sugary drinks and packaged juices',
    'Excessive rice portions',
    'Late-night heavy meals',
    'Processed/packaged snacks',
    'Excess salt (worsens inflammation)',
    'Red meat / Beef (as per your preference)',
  ],
};

function MealCard({ meal, index }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`glass-card overflow-hidden animate-fade-in-up stagger-${Math.min(index + 1, 6)}`}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full p-5 flex items-center justify-between cursor-pointer"
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500/15 to-indigo-500/10 flex items-center justify-center border border-purple-500/10 text-lg font-bold text-purple-300">
            {meal.emoji}
          </div>
          <div className="text-left">
            <p className="font-semibold text-sm text-gray-200">{meal.name}</p>
            <p className="text-xs text-gray-500 mt-0.5 flex items-center gap-1">
              <Clock size={11} /> {meal.time}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right hidden sm:block">
            <p className="text-xs font-semibold text-emerald-400">{meal.calories} cal</p>
            <p className="text-[10px] text-gray-600">{meal.protein} protein</p>
          </div>
          <div className={`w-8 h-8 rounded-xl bg-white/[0.04] flex items-center justify-center transition-transform duration-300 ${open ? 'rotate-180' : ''}`}>
            <ChevronDown size={14} className="text-gray-500" />
          </div>
        </div>
      </button>
      {open && (
        <div className="px-5 pb-5 animate-fade-in">
          <div className="pt-3 border-t border-white/[0.05]">
            <ul className="space-y-2">
              {meal.items.map((item, i) => (
                <li key={i} className="text-sm text-gray-300 flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400/50 mt-1.5 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            {meal.tip && (
              <div className="mt-4 p-3.5 rounded-xl bg-emerald-500/[0.06] border border-emerald-500/15">
                <p className="text-xs text-emerald-400/90 flex items-start gap-2 leading-relaxed">
                  <Leaf size={13} className="shrink-0 mt-0.5" />
                  {meal.tip}
                </p>
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
  const [checkedItems, setCheckedItems] = useState(new Set());
  const totalCalories = mealPlans.indian.meals.reduce((s, m) => s + m.calories, 0);
  const totalProtein = mealPlans.indian.meals.reduce((s, m) => s + parseInt(m.protein), 0);

  const toggleCheck = (key) => {
    setCheckedItems(prev => {
      const next = new Set(prev);
      next.has(key) ? next.delete(key) : next.add(key);
      return next;
    });
  };

  return (
    <div className="space-y-6">
      <div className="animate-fade-in-up">
        <h2 className="text-3xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>Diet Plan</h2>
        <p className="text-gray-500 text-sm mt-1">Personalized Indian nutrition for weight loss & sciatica management</p>
      </div>

      <div className="flex gap-2 animate-fade-in-up stagger-1">
        {[
          { id: 'plan', label: 'Meal Plan', icon: Utensils },
          { id: 'shop', label: 'Shopping List', icon: ShoppingCart },
        ].map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium cursor-pointer
              transition-all duration-250
              ${tab === t.id ? 'chip-active' : 'chip'}`}
          >
            <t.icon size={15} /> {t.label}
          </button>
        ))}
      </div>

      {tab === 'plan' && (
        <>
          <div className="glass-card p-5 animate-fade-in-up stagger-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Daily Target</p>
                <p className="text-2xl font-bold mt-1 gradient-text">~{totalCalories} cal</p>
              </div>
              <div className="flex gap-6">
                <div className="text-right">
                  <p className="text-xs text-gray-600">Protein</p>
                  <p className="text-sm font-bold text-emerald-400">{totalProtein}g</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-600">Meals</p>
                  <p className="text-sm font-bold text-purple-300">6</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            {mealPlans.indian.meals.map((meal, i) => (
              <MealCard key={i} meal={meal} index={i} />
            ))}
          </div>

          <div className="glass-card p-6 border-red-500/10 animate-fade-in-up">
            <h3 className="text-sm font-semibold text-red-400/80 mb-4 flex items-center gap-2">
              <AlertTriangle size={15} /> Foods to Avoid
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {mealPlans.avoid.map((item, i) => (
                <div key={i} className="flex items-center gap-3 text-sm text-gray-400 p-2 rounded-lg hover:bg-white/[0.02] transition-colors">
                  <span className="w-5 h-5 rounded-md bg-red-500/10 flex items-center justify-center shrink-0">
                    <span className="text-red-400 text-xs">x</span>
                  </span>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {tab === 'shop' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {mealPlans.shopping.map((cat, i) => (
            <div key={i} className={`glass-card p-6 animate-fade-in-up stagger-${Math.min(i + 1, 6)}`}>
              <h3 className="font-semibold text-sm text-purple-300 mb-4 flex items-center gap-2">
                <span className="text-lg">{cat.icon}</span> {cat.category}
              </h3>
              <ul className="space-y-2">
                {cat.items.map((item, j) => {
                  const key = `${i}-${j}`;
                  const checked = checkedItems.has(key);
                  return (
                    <li key={j}
                      onClick={() => toggleCheck(key)}
                      className="text-sm text-gray-300 flex items-center gap-3 p-2 rounded-lg hover:bg-white/[0.03] cursor-pointer transition-colors"
                    >
                      <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all duration-200 shrink-0
                        ${checked ? 'bg-purple-500/20 border-purple-500/40' : 'border-white/10'}`}>
                        {checked && <Check size={12} className="text-purple-300" />}
                      </div>
                      <span className={checked ? 'line-through text-gray-600' : ''}>{item}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
