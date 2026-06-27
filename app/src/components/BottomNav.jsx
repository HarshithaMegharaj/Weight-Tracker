import {
  LayoutDashboard, Scale, Target, Utensils, Dumbbell, HeartPulse,
  Camera, MessageCircle, Settings, X, MoreHorizontal
} from 'lucide-react';

const primaryTabs = [
  { id: 'dashboard', label: 'Home', icon: LayoutDashboard },
  { id: 'log', label: 'Log', icon: Scale },
  { id: 'trainer', label: 'AI Coach', icon: MessageCircle },
  { id: 'diet', label: 'Diet', icon: Utensils },
];

const moreTabs = [
  { id: 'goals', label: 'Goals', icon: Target, gradient: 'from-orange-500/20 to-amber-500/10', border: 'border-orange-500/15' },
  { id: 'exercise', label: 'Exercise', icon: Dumbbell, gradient: 'from-blue-500/20 to-cyan-500/10', border: 'border-blue-500/15' },
  { id: 'health', label: 'Health', icon: HeartPulse, gradient: 'from-pink-500/20 to-rose-500/10', border: 'border-pink-500/15' },
  { id: 'progress', label: 'Photos', icon: Camera, gradient: 'from-emerald-500/20 to-teal-500/10', border: 'border-emerald-500/15' },
  { id: 'settings', label: 'Settings', icon: Settings, gradient: 'from-indigo-500/20 to-purple-500/10', border: 'border-indigo-500/15' },
];

export default function BottomNav({ activeTab, setActiveTab, drawerOpen, setDrawerOpen }) {
  const isMoreActive = moreTabs.some(t => t.id === activeTab);

  return (
    <>
      {drawerOpen && (
        <div className="fixed inset-0 z-[90] bg-black/60 backdrop-blur-md animate-fade-in" onClick={() => setDrawerOpen(false)} />
      )}

      {drawerOpen && (
        <div className="fixed bottom-0 left-0 right-0 z-[95] animate-slide-up" style={{ paddingBottom: 'var(--safe-bottom)' }}>
          <div className="mx-3 mb-2 rounded-[28px] overflow-hidden"
            style={{ background: 'linear-gradient(165deg, rgba(13,8,32,0.98) 0%, rgba(6,2,15,0.98) 100%)', backdropFilter: 'blur(48px)', border: '1px solid rgba(255,255,255,0.1)' }}>
            <div className="flex items-center justify-between px-5 pt-5 pb-2">
              <h3 className="text-[13px] font-bold text-white/70 uppercase tracking-widest">More</h3>
              <button onClick={() => setDrawerOpen(false)}
                className="w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center cursor-pointer active:scale-90 transition-transform"
                aria-label="Close">
                <X size={16} className="text-white/40" />
              </button>
            </div>
            <div className="px-3 pb-4 grid grid-cols-3 gap-2">
              {moreTabs.map(({ id, label, icon: Icon, gradient, border }) => (
                <button key={id} onClick={() => { setActiveTab(id); setDrawerOpen(false); }}
                  className={`flex flex-col items-center gap-2.5 py-4 px-2 rounded-[20px] cursor-pointer transition-all duration-250
                    ${activeTab === id
                      ? 'bg-purple-500/15 border border-purple-500/25 shadow-[0_0_20px_rgba(139,92,246,0.1)]'
                      : `bg-gradient-to-br ${gradient} ${border} border active:scale-93`}
                    text-${activeTab === id ? 'purple-300' : 'white/50'}`}>
                  <div className={`w-12 h-12 rounded-[16px] flex items-center justify-center transition-all
                    ${activeTab === id
                      ? 'bg-purple-500/20 shadow-[0_0_16px_rgba(139,92,246,0.2)]'
                      : 'bg-white/[0.04]'}`}>
                    <Icon size={21} className={activeTab === id ? 'glow-icon' : ''} />
                  </div>
                  <span className="text-[11px] font-bold">{label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <nav className="fixed bottom-0 left-0 right-0 z-[80] glass-nav"
        style={{ paddingBottom: 'var(--safe-bottom)', height: 'calc(var(--nav-height) + var(--safe-bottom))' }}>
        <div className="flex items-center justify-around h-[var(--nav-height)] max-w-lg mx-auto px-2">
          {primaryTabs.map(({ id, label, icon: Icon }) => {
            const isActive = activeTab === id;
            return (
              <button key={id} onClick={() => setActiveTab(id)}
                className={`flex flex-col items-center justify-center gap-1 py-1 px-3 rounded-2xl cursor-pointer
                  transition-all duration-300 relative min-w-[64px]
                  ${isActive ? 'text-purple-300' : 'text-white/30 active:scale-90'}`}
                aria-label={label}>
                {isActive && (
                  <div className="absolute -top-[1px] left-1/2 -translate-x-1/2 w-10 h-[3px] rounded-b-full bg-gradient-to-r from-purple-400 via-violet-400 to-indigo-400 shadow-[0_0_12px_rgba(139,92,246,0.5)]" />
                )}
                <div className={`w-10 h-10 rounded-[14px] flex items-center justify-center transition-all duration-300
                  ${isActive ? 'nav-active-bg' : ''}`}>
                  <Icon size={21} strokeWidth={isActive ? 2.5 : 1.8} className={isActive ? 'glow-icon' : ''} />
                </div>
                <span className={`text-[10px] font-bold tracking-wide ${isActive ? 'text-purple-300' : ''}`}>{label}</span>
              </button>
            );
          })}

          <button onClick={() => setDrawerOpen(!drawerOpen)}
            className={`flex flex-col items-center justify-center gap-1 py-1 px-3 rounded-2xl cursor-pointer
              transition-all duration-300 min-w-[64px]
              ${isMoreActive ? 'text-purple-300' : 'text-white/30 active:scale-90'}`}
            aria-label="More">
            {isMoreActive && (
              <div className="absolute -top-[1px] w-10 h-[3px] rounded-b-full bg-gradient-to-r from-purple-400 via-violet-400 to-indigo-400 shadow-[0_0_12px_rgba(139,92,246,0.5)]" />
            )}
            <div className={`w-10 h-10 rounded-[14px] flex items-center justify-center transition-all duration-300
              ${isMoreActive ? 'nav-active-bg' : ''}`}>
              <MoreHorizontal size={21} strokeWidth={isMoreActive ? 2.5 : 1.8} className={isMoreActive ? 'glow-icon' : ''} />
            </div>
            <span className={`text-[10px] font-bold tracking-wide ${isMoreActive ? 'text-purple-300' : ''}`}>More</span>
          </button>
        </div>
      </nav>
    </>
  );
}
