import { useState } from 'react';
import {
  LayoutDashboard, Scale, Target, Utensils, Dumbbell, HeartPulse,
  Camera, MessageCircle, Settings, Menu, X, ChevronRight
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
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setMobileOpen(true)}
        className="fixed top-4 left-4 z-50 p-2 glass rounded-xl cursor-pointer lg:hidden"
        aria-label="Open menu"
      >
        <Menu size={24} />
      </button>

      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside
        className={`fixed top-0 left-0 h-full z-50 transition-all duration-300 ease-out
          ${collapsed ? 'w-20' : 'w-64'}
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          flex flex-col`}
        style={{
          background: 'rgba(15, 10, 30, 0.85)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderRight: '1px solid rgba(255,255,255,0.1)',
        }}
      >
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          {!collapsed && (
            <h1 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-emerald-400 bg-clip-text text-transparent">
              FitGlow
            </h1>
          )}
          <button
            onClick={() => {
              if (mobileOpen) setMobileOpen(false);
              else setCollapsed(!collapsed);
            }}
            className="p-1.5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {mobileOpen ? <X size={20} /> : <ChevronRight size={20} className={`transition-transform ${collapsed ? '' : 'rotate-180'}`} />}
          </button>
        </div>

        <nav className="flex-1 py-4 overflow-y-auto scrollbar-thin">
          {navItems.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => { setActiveTab(id); setMobileOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-3 mx-2 rounded-xl cursor-pointer
                transition-all duration-200
                ${activeTab === id
                  ? 'bg-purple-500/20 text-purple-300 glow-primary'
                  : 'text-gray-400 hover:bg-white/5 hover:text-white'
                }
                ${collapsed ? 'justify-center mx-1 px-2' : ''}`}
              title={collapsed ? label : undefined}
            >
              <Icon size={20} className="shrink-0" />
              {!collapsed && <span className="text-sm font-medium">{label}</span>}
            </button>
          ))}
        </nav>
      </aside>
    </>
  );
}
