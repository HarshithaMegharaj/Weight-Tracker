import { useState } from 'react';
import { Utensils, Clock, Flame, Leaf, ShoppingCart, ChevronDown, ChevronUp } from 'lucide-react';

const mealPlans = {
  indian: {
    label: 'Indian Diet Plan',
    meals: [
      {
        time: '6:30 AM',
        name: 'Morning Ritual',
        items: ['Warm water with lemon & turmeric', 'Soaked almonds (5-6)', 'Green tea or black coffee'],
        calories: 80,
        tip: 'Turmeric is anti-inflammatory — great for sciatica relief',
      },
      {
        time: '8:00 AM',
        name: 'Breakfast',
        items: ['2 egg whites + 1 whole egg omelette with veggies', 'OR: Moong dal chilla (2) with mint chutney', 'OR: Oats upma with vegetables'],
        calories: 350,
        tip: 'High protein breakfast keeps you full longer',
      },
      {
        time: '10:30 AM',
        name: 'Mid-Morning Snack',
        items: ['Greek yogurt with flax seeds', 'OR: A small fruit (apple/guava)', 'OR: Handful of roasted chana'],
        calories: 150,
        tip: 'Flax seeds are rich in omega-3, helps with inflammation',
      },
      {
        time: '1:00 PM',
        name: 'Lunch',
        items: ['Grilled chicken breast (150g) / Fish curry', 'Brown rice (1 small cup) or 2 roti', 'Mixed sabzi (lauki, beans, spinach)', 'Cucumber raita', 'Small salad'],
        calories: 500,
        tip: 'Fish is excellent — omega-3 reduces nerve inflammation from sciatica',
      },
      {
        time: '4:00 PM',
        name: 'Evening Snack',
        items: ['Sprouts chaat with lemon', 'OR: Protein shake with banana', 'OR: Roasted makhana (fox nuts)'],
        calories: 150,
        tip: 'Makhana is low-calorie, high in protein and anti-oxidants',
      },
      {
        time: '7:30 PM',
        name: 'Dinner',
        items: ['Grilled fish / Chicken tikka (120g)', 'OR: Palak dal / Moong dal', 'Multigrain roti (1) or quinoa', 'Steamed/sautéed vegetables', 'Turmeric milk before bed'],
        calories: 400,
        tip: 'Keep dinner light. Turmeric milk helps with pain and sleep.',
      },
    ],
  },
  shopping: [
    { category: 'Proteins', items: ['Chicken breast', 'Fish (rohu, salmon, pomfret)', 'Eggs', 'Paneer (low-fat)', 'Moong dal', 'Chana dal', 'Greek yogurt'] },
    { category: 'Grains', items: ['Brown rice', 'Oats', 'Quinoa', 'Multigrain atta', 'Ragi flour'] },
    { category: 'Vegetables', items: ['Spinach (palak)', 'Bottle gourd (lauki)', 'Beans', 'Broccoli', 'Cucumber', 'Tomatoes', 'Carrots', 'Bell peppers'] },
    { category: 'Fruits', items: ['Apples', 'Guava', 'Papaya', 'Berries', 'Banana (pre-workout)'] },
    { category: 'Pantry', items: ['Turmeric', 'Flax seeds', 'Chia seeds', 'Almonds', 'Walnuts', 'Green tea', 'Apple cider vinegar', 'Olive oil', 'Coconut oil'] },
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

function MealCard({ meal }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="glass p-4">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between cursor-pointer"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center">
            <Clock size={18} className="text-purple-300" />
          </div>
          <div className="text-left">
            <p className="font-medium text-sm">{meal.name}</p>
            <p className="text-xs text-gray-400">{meal.time}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-emerald-400 flex items-center gap-1">
            <Flame size={12} /> {meal.calories} cal
          </span>
          {open ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
        </div>
      </button>
      {open && (
        <div className="mt-3 pt-3 border-t border-white/10">
          <ul className="space-y-1.5">
            {meal.items.map((item, i) => (
              <li key={i} className="text-sm text-gray-300 flex items-start gap-2">
                <span className="text-purple-400 mt-1">•</span>{item}
              </li>
            ))}
          </ul>
          {meal.tip && (
            <div className="mt-3 p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
              <p className="text-xs text-emerald-300 flex items-start gap-1.5">
                <Leaf size={12} className="shrink-0 mt-0.5" />
                {meal.tip}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function DietPlan({ profile }) {
  const [tab, setTab] = useState('plan');
  const totalCalories = mealPlans.indian.meals.reduce((s, m) => s + m.calories, 0);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-1">Diet Plan</h2>
        <p className="text-gray-400 text-sm">Personalized nutrition for weight loss & sciatica management</p>
      </div>

      <div className="flex gap-2">
        {[
          { id: 'plan', label: 'Meal Plan', icon: Utensils },
          { id: 'shop', label: 'Shopping List', icon: ShoppingCart },
        ].map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium cursor-pointer
              transition-all duration-200
              ${tab === t.id ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30' : 'glass text-gray-400 hover:text-white'}`}
          >
            <t.icon size={16} /> {t.label}
          </button>
        ))}
      </div>

      {tab === 'plan' && (
        <>
          <div className="glass p-4 flex items-center justify-between">
            <span className="text-sm text-gray-300">Daily Target</span>
            <span className="text-lg font-bold text-emerald-400 flex items-center gap-1">
              <Flame size={18} /> ~{totalCalories} calories
            </span>
          </div>

          <div className="space-y-3">
            {mealPlans.indian.meals.map((meal, i) => (
              <MealCard key={i} meal={meal} />
            ))}
          </div>

          <div className="glass p-5 border-red-500/20">
            <h3 className="text-sm font-semibold text-red-400 mb-3">Foods to Avoid</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {mealPlans.avoid.map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-gray-400">
                  <span className="text-red-400">✕</span> {item}
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {tab === 'shop' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {mealPlans.shopping.map((cat, i) => (
            <div key={i} className="glass p-5">
              <h3 className="font-semibold text-sm text-purple-300 mb-3">{cat.category}</h3>
              <ul className="space-y-1.5">
                {cat.items.map((item, j) => (
                  <li key={j} className="text-sm text-gray-300 flex items-center gap-2">
                    <input type="checkbox" className="rounded border-white/20 cursor-pointer" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
