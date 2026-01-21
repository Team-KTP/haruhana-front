
import React from 'react';
import { User } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  user?: User | null;
  activeTab?: string;
  onNavigate?: (path: string) => void;
  onLogout?: () => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, user, activeTab, onNavigate, onLogout }) => {
  return (
    <div className="h-screen bg-slate-50 flex flex-col">
      {/* Fixed Header */}
      <header className="shrink-0 h-14 bg-white border-b border-slate-100 flex items-center justify-between px-4 z-10">
        <div 
          className="flex items-center gap-2 cursor-pointer" 
          onClick={() => onNavigate && onNavigate('dashboard')}
        >
          <div className="w-8 h-8 bg-haru-500 rounded-lg flex items-center justify-center text-white font-bold text-lg">H</div>
          <h1 className="font-bold text-lg text-slate-800">하루하루</h1>
        </div>
        
        {user && (
          <button 
            onClick={() => onNavigate && onNavigate('profile')}
            className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
          </button>
        )}
      </header>

      {/* Main Area */}
      <main className="flex-1 overflow-y-auto custom-scrollbar p-4 pb-24">
        <div className="max-w-md mx-auto h-full">
          {children}
        </div>
      </main>

      {/* Fixed Bottom Tab Bar */}
      {user && onNavigate && (
        <nav className="shrink-0 h-16 bg-white border-t border-slate-100 flex justify-around items-center px-4 fixed bottom-0 left-0 right-0 z-10">
          <NavTab 
            active={activeTab === 'dashboard'} 
            onClick={() => onNavigate('dashboard')}
            icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>}
            label="홈"
          />
          <NavTab 
            active={activeTab === 'history'} 
            onClick={() => onNavigate('history')}
            icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
            label="기록"
          />
          <NavTab 
            active={activeTab === 'profile'} 
            onClick={() => onNavigate('profile')}
            icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>}
            label="내 정보"
          />
        </nav>
      )}
    </div>
  );
};

const NavTab = ({ active, onClick, icon, label }: { active: boolean; onClick: () => void; icon: React.ReactNode; label: string }) => (
  <button 
    onClick={onClick}
    className={`flex flex-col items-center justify-center transition-colors ${active ? 'text-haru-500' : 'text-slate-400'}`}
  >
    {icon}
    <span className="text-[10px] mt-1 font-medium">{label}</span>
  </button>
);
