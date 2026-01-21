import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth, useAuthRole } from '../../../hooks/useAuth';
import Loading from '../../common/Loading';
import { UserRole } from '../../../types/common';

interface ProtectedRouteProps {
  children: ReactNode;
  requireRole?: UserRole;
  redirectTo?: string;
}

export default function ProtectedRoute({
  children,
  requireRole,
  redirectTo = '/login',
}: ProtectedRouteProps) {
  const { user, isLoading } = useAuth();
  // 토큰 기반 즉시 인증 확인 (API 호출 없음)
  const { role: tokenRole, isAuthenticated: hasValidToken } = useAuthRole();

  // 유효한 토큰이 없으면 즉시 리다이렉트
  if (!hasValidToken) {
    return <Navigate to={redirectTo} replace />;
  }

  // 토큰은 유효하지만 user 데이터 로딩 중이면 로딩 표시
  if (isLoading && !user) {
    return <Loading fullScreen message="인증 확인 중..." />;
  }

  // 특정 역할이 필요한 경우 체크 (토큰 기반 역할 사용)
  const currentRole = user?.role || tokenRole;
  if (requireRole && currentRole !== requireRole) {
    // GUEST는 초기 설정 페이지로 리다이렉트
    if (currentRole === 'ROLE_GUEST') {
      return <Navigate to="/preference-setup" replace />;
    }
    // 권한 없음
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
