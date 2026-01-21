import { Navigate } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';
import Loading from '../../common/Loading';

/**
 * 로그인 후 자동으로 대시보드로 리다이렉트하는 컴포넌트
 * 로그인하지 않은 경우 로그인 페이지로 리다이렉트
 */
export default function AuthRedirect() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <Loading fullScreen message="인증 확인 중..." />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // 로그인된 사용자는 대시보드로
  return <Navigate to="/dashboard" replace />;
}
