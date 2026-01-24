import React from 'react';
import { User } from '../../types/auth';

interface LayoutProps {
  children: React.ReactNode;
  user?: User | null;
  activeTab?: string;
  onNavigate?: (path: string) => void;
  onLogout?: () => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, user, activeTab, onNavigate }) => {
  return (
    <div className="h-screen bg-slate-50 flex flex-col min-w-[375px]">
      {/* Fixed Header - 반응형 */}
      <header className="shrink-0 h-14 sm:h-16 bg-white border-b border-slate-100 flex items-center justify-between px-4 sm:px-6 lg:px-8 z-10">
        <div
          className="flex items-center gap-2 sm:gap-3 cursor-pointer"
          onClick={() => onNavigate && onNavigate('dashboard')}
        >
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-haru-500 rounded-lg flex items-center justify-center text-white font-bold text-lg sm:text-xl">H</div>
          <h1 className="font-bold text-lg sm:text-xl text-slate-800">하루하루</h1>
        </div>

        {user && (
          <button
            onClick={() => onNavigate && onNavigate('profile')}
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200 transition-colors"
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
          </button>
        )}
      </header>

      {/* Main Area - 반응형 컨테이너 */}
      <main className="flex-1 overflow-y-auto custom-scrollbar p-3 sm:p-5 lg:p-7 pb-24 lg:pb-7 lg:ml-64 min-w-0">
        <div className="max-w-md sm:max-w-lg lg:max-w-2xl mx-auto min-w-0">
          {children}
        </div>
      </main>

      {/* Fixed Bottom Tab Bar - 모바일/태블릿만 표시 */}
      {user && onNavigate && (
        <nav className="shrink-0 h-16 sm:h-18 bg-white border-t border-slate-100 flex justify-around items-center px-4 sm:px-8 fixed bottom-0 left-0 right-0 z-10 lg:hidden">
          <NavTab
            active={activeTab === 'dashboard'}
            onClick={() => onNavigate('dashboard')}
            icon={<svg className="w-6 h-6 sm:w-7 sm:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>}
            label="홈"
          />
          <NavTab
            active={activeTab === 'history'}
            onClick={() => onNavigate('history')}
            icon={<svg className="w-6 h-6 sm:w-7 sm:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
            label="기록"
          />
          <NavTab
            active={activeTab === 'profile'}
            onClick={() => onNavigate('profile')}
            icon={<svg className="w-6 h-6 sm:w-7 sm:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>}
            label="내 정보"
          />
        </nav>
      )}

      {/* Desktop Sidebar Navigation - 데스크톱에서만 표시 */}
      {user && onNavigate && (
        <nav className="hidden lg:flex fixed left-0 top-14 sm:top-16 bottom-0 w-64 bg-white border-r border-slate-100 flex-col p-6 space-y-2 z-10">
          <SideNavItem
            active={activeTab === 'dashboard'}
            onClick={() => onNavigate('dashboard')}
            icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>}
            label="홈"
          />
          <SideNavItem
            active={activeTab === 'history'}
            onClick={() => onNavigate('history')}
            icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
            label="기록"
          />
          <SideNavItem
            active={activeTab === 'profile'}
            onClick={() => onNavigate('profile')}
            icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>}
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
    className={`flex flex-col items-center justify-center transition-colors ${active ? 'text-haru-500' : 'text-slate-400 hover:text-slate-600'}`}
  >
    {icon}
    <span className="text-[10px] sm:text-xs mt-1 font-medium">{label}</span>
  </button>
);

const SideNavItem = ({ active, onClick, icon, label }: { active: boolean; onClick: () => void; icon: React.ReactNode; label: string }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
      active
        ? 'bg-haru-50 text-haru-600 font-semibold'
        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-800'
    }`}
  >
    {icon}
    <span className="text-sm">{label}</span>
  </button>
);
