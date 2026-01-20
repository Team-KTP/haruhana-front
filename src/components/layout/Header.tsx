import { Link } from 'react-router-dom';
import { User } from '../../types/auth';

interface HeaderProps {
  user?: User | null;
  onLogout?: () => void;
}

export default function Header({ user, onLogout }: HeaderProps) {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <h1 className="text-2xl font-bold gradient-text">HaruHaru</h1>
          </Link>

          {/* User Menu */}
          <div className="flex items-center gap-4">
            {user ? (
              <>
                <span className="text-sm font-medium text-gray-700">
                  {user.nickname}님
                </span>
                <span className="badge badge-primary">{user.role}</span>
                {onLogout && (
                  <button
                    onClick={onLogout}
                    className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    로그아웃
                  </button>
                )}
              </>
            ) : (
              <Link
                to="/login"
                className="text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors"
              >
                로그인
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
