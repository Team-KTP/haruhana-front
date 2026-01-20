import { NavLink } from 'react-router-dom';
import { UserRole } from '../../types/common';

interface NavigationProps {
  userRole?: UserRole;
}

export default function Navigation({ userRole }: NavigationProps) {
  // GUEST는 초기 설정만 가능
  if (userRole === 'ROLE_GUEST') {
    return null;
  }

  const navItems = [
    { to: '/', label: '오늘의 문제', icon: '📝' },
    { to: '/records', label: '기록', icon: '📊' },
    { to: '/settings', label: '설정', icon: '⚙️' },
  ];

  return (
    <nav className="bg-white border-t border-gray-200 fixed bottom-0 left-0 right-0 z-40 md:relative md:border-t-0 md:border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-around md:justify-start md:gap-8">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex flex-col md:flex-row items-center gap-1 md:gap-2 py-3 px-4 text-sm font-medium transition-colors ${
                  isActive
                    ? 'text-primary-600 border-b-2 border-primary-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`
              }
            >
              <span className="text-xl md:text-base">{item.icon}</span>
              <span>{item.label}</span>
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
}
