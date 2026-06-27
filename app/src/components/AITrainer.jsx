import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles } from 'lucide-react';

function getResponse(msg, profile, entries) {
  const m = msg.toLowerCase();
  const latest = entries.length > 0 ? [...entries].sort((a, b) => new Date(b.date) - new Date(a.date))[0] : null;
  const sci = profile.conditions?.includes('sciatica');

  if (m.includes('pain') || m.includes('hurt') || m.includes('sciatica'))
    return `**Immediate Relief:**\n- Knee to chest gently — hold 30s\n- Pigeon pose — 2 min each side\n- Heat pack on lower back — 15 min\n- Gentle 10-min walk\n\n**Long-term:**\n- Daily Bird-Dog & Dead Bug\n- Swimming = #1 for sciatica\n- Pillow between knees when sleeping\n- Anti-inflammatory: turmeric, ginger, fish\n\n**Avoid:** Heavy lifting, crunches, toe touches\n\nEvery kg lost reduces spinal pressure!`;

  if (m.includes('eat') || m.includes('food') || m.includes('hungry') || m.includes('meal') || m.includes('snack'))
    return `**Quick Options:**\n- Roasted makhana + green tea (~100 cal)\n- 2 boiled eggs + cucumber + chapati (~250 cal)\n- Grilled fish + spinach + dal (~400 cal)\n\n**Craving heavy?**\n- Chicken tikka (grilled) + raita\n- Egg bhurji + multigrain toast\n- Moong dal chilla instead of dosa\n\n**Rules:**\n1. Protein first every meal\n2. Half plate = vegetables\n3. Water 20 min before meals\n4. Stop eating by 8 PM${sci ? '\n\n**Sciatica:** Fish 3-4x/week for omega-3' : ''}`;

  if (m.includes('exercise') || m.includes('workout') || m.includes('gym'))
    return `**Quick 20-min Workout:**\n1. Brisk walk — 5 min\n2. Partial squats — 3x12\n3. Glute bridges — 3x15\n4. Bird-Dog — 3x30s\n5. Calf raises — 3x15\n6. Cool-down stretch — 5 min\n\n**Best for weight loss + sciatica:**\n- Swimming, walking, cycling, yoga\n\n**AVOID:** Deadlifts, heavy squats, crunches\n\n**Pro tip:** Morning exercise boosts all-day metabolism!`;

  if (m.includes('motivat') || m.includes('give up') || m.includes('fail') || m.includes('cheat') || m.includes('bad day'))
    return `${profile.name ? `${profile.name}, ` : ''}**One bad day does NOT erase progress.**\n\n${latest ? `You're at ${latest.weight} kg. Starting takes COURAGE.` : ''}\n\n- Weight fluctuates 1-2 kg daily\n- A cheat meal isn't failure\n- Compare monthly, not daily\n\n**Right now:**\n1. Drink a big glass of water\n2. 10-minute walk\n3. Plan next healthy meal\n4. Log weight tomorrow\n\nConsistency beats perfection. You WILL get there.`;

  if (m.includes('water') || m.includes('hydrat'))
    return `**Daily target:** 3-4 liters\n\n**Schedule:**\n- Wake: 2 glasses warm + lemon\n- Before meals: 1 glass (20 min before)\n- Workout: Sip every 10-15 min\n\n**Hacks:**\n- Lemon/cucumber/mint for flavor\n- Bottle at desk = drink more\n- Green tea counts & boosts metabolism\n\n**Why:** Reduces hunger, +30% metabolism, fights inflammation${sci ? ', hydrates spinal discs' : ''}`;

  if (m.includes('sleep') || m.includes('tired') || m.includes('insomnia'))
    return `**Target:** 7-8 hours\n\n1. Same bedtime every night\n2. No screens 1hr before bed\n3. Turmeric milk at 9 PM\n4. Room temp 18-20°C\n5. No caffeine after 2 PM${sci ? '\n\n**With sciatica:**\n- Side sleep + pillow between knees\n- Or back + pillow under knees\n- Never sleep on stomach' : ''}\n\nPoor sleep = +28% hunger hormone. Sleep well = burn more calories.`;

  return `${profile.name ? `Hi ${profile.name}! ` : ''}I'm your AI fitness coach.\n\n${latest ? `**Status:** ${latest.weight} kg${profile.goalWeight ? ` → Goal: ${profile.goalWeight} kg` : ''}` : '**Log your weight** first!'}\n\n**Ask me about:**\n- "What should I eat?"\n- "Give me a workout"\n- "I had a bad day"\n- "My sciatica hurts"\n- "How much water?"\n- "I can't sleep"`;
}

export default function AITrainer({ profile, weightEntries }) {
  const [messages, setMessages] = useState([
    { role: 'bot', text: `Welcome${profile.name ? `, ${profile.name}` : ''}! I'm your AI fitness coach. Ask me anything — nutrition, exercise, pain management, or motivation.` }
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const endRef = useRef(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages, typing]);

  const send = (text) => {
    const msg = (text || input).trim();
    if (!msg) return;
    setMessages(p => [...p, { role: 'user', text: msg }]);
    setInput('');
    setTyping(true);
    setTimeout(() => {
      setMessages(p => [...p, { role: 'bot', text: getResponse(msg, profile, weightEntries) }]);
      setTyping(false);
    }, 600);
  };

  const quickActions = [
    { l: 'What to eat?', e: '🍽' }, { l: 'Sciatica help', e: '🦴' }, { l: 'Workout', e: '💪' },
    { l: 'Motivation', e: '⚡' }, { l: 'Water tips', e: '💧' }, { l: 'Sleep help', e: '🌙' },
  ];

  return (
    <div className="flex flex-col" style={{ height: 'calc(100dvh - var(--nav-height) - var(--safe-bottom))' }}>
      <div style={{ padding: '24px 20px 12px' }} className="animate-fade-in-up shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-[14px] bg-gradient-to-br from-emerald-500/20 to-teal-500/10 flex items-center justify-center border border-emerald-500/15">
            <Sparkles size={18} className="text-emerald-400" />
          </div>
          <div>
            <h1 className="text-xl font-extrabold">AI Coach</h1>
            <p className="text-[11px] text-[var(--text-dim)] font-semibold">Always online</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-thin px-4 space-y-3 pb-3">
        {messages.map((msg, i) => (
          <div key={i} className={`flex gap-2.5 animate-fade-in ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
            <div className={`w-8 h-8 rounded-[12px] flex items-center justify-center shrink-0
              ${msg.role === 'user' ? 'bg-purple-500/15 border border-purple-500/15' : 'bg-emerald-500/15 border border-emerald-500/15'}`}>
              {msg.role === 'user' ? <User size={14} className="text-purple-300" /> : <Bot size={14} className="text-emerald-300" />}
            </div>
            <div className={`max-w-[82%] px-4 py-3 text-[13px] leading-relaxed whitespace-pre-line
              ${msg.role === 'user'
                ? 'bg-purple-500/12 border border-purple-500/15 rounded-2xl rounded-br-md text-[var(--text)]'
                : 'bg-white/[0.04] border border-white/[0.06] rounded-2xl rounded-bl-md text-[var(--text-sub)]'}`}>
              {msg.text.split(/(\*\*.*?\*\*)/).map((p, j) =>
                p.startsWith('**') && p.endsWith('**') ? <strong key={j} className="text-white font-bold">{p.slice(2, -2)}</strong> : p
              )}
            </div>
          </div>
        ))}
        {typing && (
          <div className="flex gap-2.5 animate-fade-in">
            <div className="w-8 h-8 rounded-[12px] bg-emerald-500/15 border border-emerald-500/15 flex items-center justify-center">
              <Bot size={14} className="text-emerald-300" />
            </div>
            <div className="bg-white/[0.04] border border-white/[0.06] px-4 py-3 rounded-2xl rounded-bl-md flex gap-1.5">
              <div className="w-2 h-2 rounded-full bg-[var(--text-dim)] animate-bounce" />
              <div className="w-2 h-2 rounded-full bg-[var(--text-dim)] animate-bounce" style={{ animationDelay: '0.15s' }} />
              <div className="w-2 h-2 rounded-full bg-[var(--text-dim)] animate-bounce" style={{ animationDelay: '0.3s' }} />
            </div>
          </div>
        )}
        <div ref={endRef} />
      </div>

      {messages.length <= 2 && (
        <div className="flex gap-2 overflow-x-auto scrollbar-thin px-4 pb-2 shrink-0">
          {quickActions.map((a, i) => (
            <button key={i} onClick={() => send(a.l)}
              className="chip shrink-0 flex items-center gap-1.5 text-[12px] active:scale-95 transition-transform">
              <span>{a.e}</span> {a.l}
            </button>
          ))}
        </div>
      )}

      <form onSubmit={(e) => { e.preventDefault(); send(); }} className="px-4 pb-4 pt-2 flex gap-2.5 shrink-0">
        <input type="text" value={input} onChange={e => setInput(e.target.value)}
          placeholder="Ask anything..." className="input-field flex-1" />
        <button type="submit" disabled={!input.trim()}
          className="w-12 h-12 rounded-2xl btn-primary flex items-center justify-center cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed active:scale-90 transition-transform p-0">
          <Send size={16} />
        </button>
      </form>
    </div>
  );
}
