import { ReactNode } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Navigation from './Navigation';
import { User } from '../../types/auth';

interface LayoutProps {
  user?: User | null;
  onLogout?: () => void;
  children?: ReactNode;
}

export default function Layout({ user, onLogout, children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header user={user} onLogout={onLogout} />

      {user?.role === 'ROLE_MEMBER' && <Navigation userRole={user.role} />}

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8 pb-20 md:pb-8">
        {children || <Outlet />}
      </main>
    </div>
  );
}
