import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, ArrowRight } from 'lucide-react';

function getTrainerResponse(message, profile, weightEntries) {
  const msg = message.toLowerCase();
  const latest = weightEntries.length > 0
    ? [...weightEntries].sort((a, b) => new Date(b.date) - new Date(a.date))[0]
    : null;
  const hasSciatica = profile.conditions?.includes('sciatica');

  if (msg.includes('pain') || msg.includes('hurt') || msg.includes('sciatica')) {
    return `I understand the sciatica pain can be really tough. Here's what I recommend RIGHT NOW:

**Immediate Relief:**
- Lie on your back, pull the affected knee to chest gently — hold 30 seconds
- Pigeon pose (modified) — 2 minutes each side
- Apply a heat pack to your lower back for 15 minutes
- Take a gentle 10-minute walk — movement helps more than rest

**Long-term Management:**
- Strengthen your core daily (Bird-Dog, Dead Bug exercises)
- Swimming is the #1 exercise for sciatica — zero spinal compression
- Sleep with a pillow between your knees
- Avoid sitting for more than 30 minutes — stand and stretch
- Anti-inflammatory foods: turmeric, ginger, fish (omega-3), berries

**Avoid:** Heavy lifting, sit-ups/crunches, toe touches, running on concrete.

Your pain WILL improve as you lose weight — every kg lost reduces spinal pressure significantly.`;
  }

  if (msg.includes('eat') || msg.includes('food') || msg.includes('hungry') || msg.includes('meal') || msg.includes('dinner') || msg.includes('lunch') || msg.includes('snack')) {
    return `Here's what I suggest based on your preferences (no beef, chicken/fish/mutton OK):

**Quick Healthy Options:**
- **Snack:** Roasted makhana (fox nuts) + green tea — only 100 cal, high protein
- **Quick meal:** 2 boiled eggs + cucumber + a chapati — filling, ~250 cal
- **Dinner idea:** Grilled fish with sauteed spinach and a small bowl of dal — ~400 cal

**If you're craving something heavy:**
- Chicken tikka (grilled, not fried) with raita instead of butter chicken
- Egg bhurji with multigrain toast instead of bread pakora
- Moong dal chilla instead of dosa (lower carb, higher protein)

**Golden rules:**
1. Eat protein first in every meal (chicken, fish, eggs, dal)
2. Fill half your plate with vegetables
3. Drink water 20 min before meals — reduces appetite naturally
4. Stop eating by 8 PM if possible

${hasSciatica ? '**For sciatica:** Include fish 3-4 times a week — omega-3 is nature\'s anti-inflammatory.' : ''}`;
  }

  if (msg.includes('exercise') || msg.includes('workout') || msg.includes('gym')) {
    return `Here's your exercise guidance${hasSciatica ? ' (sciatica-safe)' : ''}:

**Today's Quick Workout (20 min, no equipment):**
1. Brisk walking — 5 min warm-up
2. Bodyweight squats (partial) — 3 x 12
3. Glute bridges — 3 x 15
4. Bird-Dog hold — 3 x 30 seconds
5. Standing calf raises — 3 x 15
6. Cool-down stretching — 5 min

**Best exercises for weight loss + sciatica:**
- Swimming (best — zero impact, full body)
- Walking (30-40 min daily)
- Cycling (stationary preferred)
- Yoga (pigeon pose, cat-cow, child's pose)

**AVOID:** Deadlifts, heavy squats, crunches, toe touches, running on concrete.

**Pro tip:** Exercise in the morning if possible — it boosts metabolism for the whole day and reduces pain sensitivity.`;
  }

  if (msg.includes('motivat') || msg.includes('give up') || msg.includes('fail') || msg.includes('cheat') || msg.includes('bad day')) {
    return `Listen to me carefully — ${profile.name || 'champion'}:

**One bad day does NOT erase your progress.** Not even close.

${latest ? `You started this journey and you're at ${latest.weight} kg. That takes COURAGE. Most people never even start.` : ''}

**Remember:**
- Weight loss is not linear — your body fluctuates 1-2 kg daily (water, food, hormones)
- A "cheat meal" is not failure — it's human. Get back on track the NEXT meal
- You didn't gain weight in one day, and you won't lose it in one day
- Progress photos don't lie — compare monthly, not daily

**What to do right now:**
1. Drink a big glass of water
2. Go for a 10-minute walk
3. Plan your next healthy meal
4. Log your weight tomorrow — consistency beats perfection

I'm here for you. Every single day. You WILL reach your goal.`;
  }

  if (msg.includes('water') || msg.includes('hydrat')) {
    return `**Hydration is KEY for weight loss.** Here's your plan:

**Daily target:** 3-4 liters (about 12-16 glasses)

**Schedule:**
- Wake up: 2 glasses warm water + lemon
- Before each meal: 1 glass (20 min before)
- During workout: Sip every 10-15 min
- Before bed: 1 glass (not too much — you need sleep!)

**Hydration hacks:**
- Add lemon, cucumber, or mint for flavor
- Keep a bottle at your desk — you'll drink more
- Set hourly reminders on your phone
- Herbal tea counts! Green tea boosts metabolism

**Why it matters:**
- Reduces hunger (often you're thirsty, not hungry)
- Boosts metabolism by 30% for 1 hour after drinking
- Helps flush toxins and reduce inflammation
${hasSciatica ? '- Keeps spinal discs hydrated — directly helps sciatica' : ''}`;
  }

  if (msg.includes('sleep') || msg.includes('rest') || msg.includes('tired') || msg.includes('insomnia')) {
    return `**Sleep is the most underrated weight loss tool.** Poor sleep = weight gain.

**Target:** 7-8 hours of quality sleep

**Sleep improvement plan:**
1. Set a consistent bedtime (same time every night)
2. No screens 1 hour before bed (or use blue light filter)
3. Drink warm turmeric milk at 9 PM — helps with sleep AND inflammation
4. Keep room cool (18-20C is ideal)
5. No caffeine after 2 PM

${hasSciatica ? `**Sleeping with sciatica:**
- Sleep on your side with a pillow between your knees
- Or on your back with a pillow under your knees
- NEVER sleep on your stomach — worsens spinal alignment
- A medium-firm mattress is best` : ''}

**Why sleep matters for weight loss:**
- Poor sleep increases ghrelin (hunger hormone) by 28%
- Reduces leptin (fullness hormone) by 18%
- You literally burn calories while sleeping well
- Recovery from exercise happens during deep sleep`;
  }

  return `${profile.name ? `Hi ${profile.name}! ` : ''}I'm your AI fitness trainer. Here's what I can help you with:

${latest ? `**Your current status:** ${latest.weight} kg${profile.goalWeight ? ` -> Goal: ${profile.goalWeight} kg (${(latest.weight - profile.goalWeight).toFixed(1)} kg to go)` : ''}` : '**Start by logging your weight** to get personalized advice.'}

**Ask me about:**
- **"What should I eat?"** — Personalized meal suggestions
- **"Give me a workout"** — Sciatica-safe exercise plans
- **"I had a bad day"** — Motivation & support
- **"My sciatica is acting up"** — Pain management tips
- **"How much water?"** — Hydration guidance
- **"I can't sleep"** — Sleep optimization

I'm strict but I care. Let's make you glow!`;
}

export default function AITrainer({ profile, weightEntries }) {
  const [messages, setMessages] = useState([
    { role: 'bot', text: `Welcome${profile.name ? `, ${profile.name}` : ''}! I'm your personal AI trainer. I know about your health conditions and dietary preferences. Ask me anything — nutrition, exercise, pain management, or just need motivation. I'm here to help you transform!` }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = (text) => {
    const userMsg = (text || input).trim();
    if (!userMsg) return;
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInput('');
    setIsTyping(true);
    setTimeout(() => {
      const response = getTrainerResponse(userMsg, profile, weightEntries);
      setMessages(prev => [...prev, { role: 'bot', text: response }]);
      setIsTyping(false);
    }, 800);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSend();
  };

  const quickActions = [
    { label: 'What should I eat?', icon: '🍽' },
    { label: 'My sciatica hurts', icon: '🦴' },
    { label: 'Give me a workout', icon: '💪' },
    { label: 'I need motivation', icon: '⚡' },
    { label: 'Water intake?', icon: '💧' },
    { label: 'Sleep tips', icon: '🌙' },
  ];

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)]">
      <div className="mb-5 animate-fade-in-up">
        <h2 className="text-3xl font-bold flex items-center gap-3" style={{ fontFamily: "'Playfair Display', serif" }}>
          AI Trainer
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-purple-500/20 to-indigo-500/10 flex items-center justify-center">
            <Sparkles size={16} className="text-purple-400" />
          </div>
        </h2>
        <p className="text-gray-500 text-sm mt-1">Your strict but caring personal fitness coach</p>
      </div>

      <div className="flex-1 glass-card p-5 overflow-y-auto scrollbar-thin space-y-4 mb-4">
        {messages.map((msg, i) => (
          <div key={i} className={`flex gap-3 animate-fade-in ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0
              ${msg.role === 'user'
                ? 'bg-gradient-to-br from-purple-500/20 to-indigo-500/10 border border-purple-500/15'
                : 'bg-gradient-to-br from-emerald-500/20 to-teal-500/10 border border-emerald-500/15'}`}
            >
              {msg.role === 'user'
                ? <User size={15} className="text-purple-300" />
                : <Bot size={15} className="text-emerald-300" />}
            </div>
            <div className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-line
              ${msg.role === 'user'
                ? 'bg-gradient-to-br from-purple-500/15 to-indigo-500/10 border border-purple-500/15 text-gray-200 rounded-br-md'
                : 'bg-white/[0.03] border border-white/[0.06] text-gray-300 rounded-bl-md'}`}
            >
              {msg.text.split(/(\*\*.*?\*\*)/).map((part, j) =>
                part.startsWith('**') && part.endsWith('**')
                  ? <strong key={j} className="text-white font-semibold">{part.slice(2, -2)}</strong>
                  : part
              )}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex gap-3 animate-fade-in">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/10 border border-emerald-500/15 flex items-center justify-center">
              <Bot size={15} className="text-emerald-300" />
            </div>
            <div className="bg-white/[0.03] border border-white/[0.06] px-4 py-3 rounded-2xl rounded-bl-md">
              <div className="flex gap-1.5">
                <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {messages.length <= 2 && (
        <div className="flex flex-wrap gap-2 mb-3 animate-fade-in-up">
          {quickActions.map((action, i) => (
            <button
              key={i}
              onClick={() => handleSend(action.label)}
              className="chip flex items-center gap-2 text-xs"
            >
              <span>{action.icon}</span> {action.label}
            </button>
          ))}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex gap-3">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask your trainer anything..."
          className="input-field flex-1"
        />
        <button
          type="submit"
          disabled={!input.trim()}
          className="w-12 h-12 rounded-2xl btn-primary flex items-center justify-center cursor-pointer
            disabled:opacity-30 disabled:cursor-not-allowed disabled:transform-none"
        >
          <Send size={16} />
        </button>
      </form>
    </div>
  );
}
