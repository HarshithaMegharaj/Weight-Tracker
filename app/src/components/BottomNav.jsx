import { useState } from 'react';
import {
  LayoutDashboard, Scale, Target, Utensils, Dumbbell, HeartPulse,
  Camera, MessageCircle, Settings, X, MoreHorizontal, Zap
} from 'lucide-react';

const primaryTabs = [
  { id: 'dashboard', label: 'Home', icon: LayoutDashboard },
  { id: 'log', label: 'Log', icon: Scale },
  { id: 'trainer', label: 'AI Coach', icon: MessageCircle },
  { id: 'diet', label: 'Diet', icon: Utensils },
];

const moreTabs = [
  { id: 'goals', label: 'Goals', icon: Target },
  { id: 'exercise', label: 'Exercise', icon: Dumbbell },
  { id: 'health', label: 'Health Profile', icon: HeartPulse },
  { id: 'progress', label: 'Progress Photos', icon: Camera },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export default function BottomNav({ activeTab, setActiveTab, drawerOpen, setDrawerOpen }) {
  const isMoreActive = moreTabs.some(t => t.id === activeTab);

  return (
    <>
      {drawerOpen && (
        <div className="fixed inset-0 z-[90] bg-black/50 backdrop-blur-sm animate-fade-in" onClick={() => setDrawerOpen(false)} />
      )}

      {drawerOpen && (
        <div className="fixed bottom-0 left-0 right-0 z-[95] animate-slide-up" style={{ paddingBottom: 'var(--safe-bottom)' }}>
          <div className="mx-3 mb-2 rounded-3xl overflow-hidden" style={{ background: 'rgba(13,8,32,0.97)', backdropFilter: 'blur(40px)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <div className="flex items-center justify-between px-5 pt-4 pb-2">
              <h3 className="text-sm font-bold text-white/80">More</h3>
              <button onClick={() => setDrawerOpen(false)} className="p-1.5 rounded-xl hover:bg-white/5 cursor-pointer" aria-label="Close">
                <X size={18} className="text-white/40" />
              </button>
            </div>
            <div className="px-2 pb-3 grid grid-cols-3 gap-1">
              {moreTabs.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => { setActiveTab(id); setDrawerOpen(false); }}
                  className={`flex flex-col items-center gap-2 py-4 px-2 rounded-2xl cursor-pointer transition-all duration-200
                    ${activeTab === id
                      ? 'bg-purple-500/15 text-purple-300'
                      : 'text-white/40 hover:bg-white/5 hover:text-white/70 active:scale-95'}`}
                >
                  <div className={`w-11 h-11 rounded-2xl flex items-center justify-center transition-all
                    ${activeTab === id ? 'bg-purple-500/20 shadow-lg shadow-purple-500/20' : 'bg-white/[0.04]'}`}>
                    <Icon size={20} />
                  </div>
                  <span className="text-[11px] font-semibold">{label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <nav
        className="fixed bottom-0 left-0 right-0 z-[80] glass-nav"
        style={{ paddingBottom: 'var(--safe-bottom)', height: 'calc(var(--nav-height) + var(--safe-bottom))' }}
      >
        <div className="flex items-center justify-around h-[var(--nav-height)] max-w-lg mx-auto px-2">
          {primaryTabs.map(({ id, label, icon: Icon }) => {
            const isActive = activeTab === id;
            return (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`flex flex-col items-center justify-center gap-1 py-1 px-3 rounded-2xl cursor-pointer
                  transition-all duration-250 relative min-w-[60px]
                  ${isActive ? 'text-purple-300' : 'text-white/30 active:scale-90'}`}
                aria-label={label}
              >
                {isActive && (
                  <div className="absolute -top-[1px] left-1/2 -translate-x-1/2 w-8 h-[3px] rounded-b-full bg-gradient-to-r from-purple-400 to-indigo-400" />
                )}
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-250
                  ${isActive ? 'bg-purple-500/15 shadow-lg shadow-purple-500/10' : ''}`}>
                  <Icon size={21} strokeWidth={isActive ? 2.5 : 1.8} />
                </div>
                <span className={`text-[10px] font-bold tracking-wide ${isActive ? 'text-purple-300' : ''}`}>{label}</span>
              </button>
            );
          })}

          <button
            onClick={() => setDrawerOpen(!drawerOpen)}
            className={`flex flex-col items-center justify-center gap-1 py-1 px-3 rounded-2xl cursor-pointer
              transition-all duration-250 min-w-[60px]
              ${isMoreActive ? 'text-purple-300' : 'text-white/30 active:scale-90'}`}
            aria-label="More"
          >
            {isMoreActive && (
              <div className="absolute -top-[1px] w-8 h-[3px] rounded-b-full bg-gradient-to-r from-purple-400 to-indigo-400" />
            )}
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all
              ${isMoreActive ? 'bg-purple-500/15 shadow-lg shadow-purple-500/10' : ''}`}>
              <MoreHorizontal size={21} strokeWidth={isMoreActive ? 2.5 : 1.8} />
            </div>
            <span className={`text-[10px] font-bold tracking-wide ${isMoreActive ? 'text-purple-300' : ''}`}>More</span>
          </button>
        </div>
      </nav>
    </>
  );
}
