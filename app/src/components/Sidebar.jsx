import { useState } from 'react';
import {
  LayoutDashboard, Scale, Target, Utensils, Dumbbell, HeartPulse,
  Camera, MessageCircle, Settings, Menu, X, Zap
} from 'lucide-react';

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'log', label: 'Log Weight', icon: Scale },
  { id: 'goals', label: 'Goals', icon: Target },
  { id: 'diet', label: 'Diet Plan', icon: Utensils },
  { id: 'exercise', label: 'Exercise', icon: Dumbbell },
  { id: 'health', label: 'Health Profile', icon: HeartPulse },
  { id: 'progress', label: 'Progress Photos', icon: Camera },
  { id: 'trainer', label: 'AI Trainer', icon: MessageCircle },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export default function Sidebar({ activeTab, setActiveTab }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setMobileOpen(true)}
        className="fixed top-4 left-4 z-50 p-2.5 glass rounded-2xl cursor-pointer lg:hidden"
        aria-label="Open menu"
      >
        <Menu size={22} />
      </button>

      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden animate-fade-in"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside
        className={`fixed top-0 left-0 h-full z-50 w-[280px] transition-transform duration-300 ease-out
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          flex flex-col`}
        style={{
          background: 'linear-gradient(180deg, rgba(11,6,20,0.95) 0%, rgba(17,13,31,0.98) 100%)',
          backdropFilter: 'blur(32px) saturate(1.4)',
          WebkitBackdropFilter: 'blur(32px) saturate(1.4)',
          borderRight: '1px solid rgba(255,255,255,0.05)',
        }}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-purple-500/20">
              <Zap size={18} className="text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold gradient-text" style={{ fontFamily: "'Playfair Display', serif" }}>
                FitGlow
              </h1>
              <p className="text-[10px] text-purple-400/60 font-medium tracking-wider uppercase">Pro Tracker</p>
            </div>
          </div>
          <button
            onClick={() => setMobileOpen(false)}
            className="p-1.5 rounded-lg hover:bg-white/5 cursor-pointer lg:hidden transition-colors"
            aria-label="Close menu"
          >
            <X size={18} className="text-gray-500" />
          </button>
        </div>

        <nav className="flex-1 py-3 px-3 overflow-y-auto scrollbar-thin">
          <p className="text-[10px] font-semibold text-purple-400/40 uppercase tracking-widest px-3 py-2">Menu</p>
          {navItems.map(({ id, label, icon: Icon }) => {
            const isActive = activeTab === id;
            return (
              <button
                key={id}
                onClick={() => { setActiveTab(id); setMobileOpen(false); }}
                className={`w-full flex items-center gap-3 px-4 py-3 my-0.5 rounded-2xl cursor-pointer
                  transition-all duration-250 relative group
                  ${isActive
                    ? 'text-white'
                    : 'text-gray-500 hover:text-gray-300 hover:bg-white/[0.03]'
                  }`}
              >
                {isActive && (
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/15 to-indigo-500/10 border border-purple-500/20" />
                )}
                {isActive && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-6 rounded-r-full bg-gradient-to-b from-purple-400 to-indigo-500" />
                )}
                <div className={`relative z-10 w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-250
                  ${isActive
                    ? 'bg-purple-500/20 shadow-lg shadow-purple-500/10'
                    : 'bg-white/[0.03] group-hover:bg-white/[0.06]'}`}
                >
                  <Icon size={18} className={isActive ? 'text-purple-300' : ''} />
                </div>
                <span className={`relative z-10 text-[13px] font-medium ${isActive ? 'text-purple-200' : ''}`}>
                  {label}
                </span>
                {isActive && (
                  <div className="absolute right-3 w-1.5 h-1.5 rounded-full bg-purple-400 shadow-lg shadow-purple-400/50" />
                )}
              </button>
            );
          })}
        </nav>

        <div className="p-4 mx-3 mb-3 rounded-2xl bg-gradient-to-br from-purple-500/10 to-indigo-500/5 border border-purple-500/10">
          <p className="text-xs font-semibold text-purple-300">Your Journey</p>
          <p className="text-[11px] text-purple-400/60 mt-1">Every step counts towards your goal. Stay consistent!</p>
        </div>
      </aside>
    </>
  );
}
