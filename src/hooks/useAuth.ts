import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser, logout as logoutApi } from '../api/auth';
import { User } from '../types/auth';
import { getRoleFromToken, isTokenValid } from '../utils/token';

export function useAuth() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  // 현재 사용자 정보 조회
  const {
    data: user,
    isLoading,
    error,
  } = useQuery<User | null>({
    queryKey: ['auth', 'user'],
    queryFn: async () => {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        return null;
      }

      // 토큰 유효성 검사
      if (!isTokenValid(token)) {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        return null;
      }

      // 토큰에서 역할 추출
      const role = getRoleFromToken(token);
      if (!role) {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        return null;
      }

      try {
        // API로 전체 프로필 정보 조회
        const profile = await getCurrentUser();
        return {
          ...profile,
          role,
        };
      } catch (err) {
        // API 실패해도 토큰이 유효하면 토큰 기반 최소 정보 반환
        // (401 에러는 axios interceptor가 처리)
        const tokenLoginId = token ? JSON.parse(atob(token.split('.')[1])).sub : '';
        return {
          loginId: tokenLoginId,
          nickname: tokenLoginId,
          role,
          createdAt: new Date().toISOString(),
        };
      }
    },
    retry: false,
    staleTime: 5 * 60 * 1000, // 5분
  });

  // 로그아웃 mutation
  const logoutMutation = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      // FCM 토큰 등 인증 관련 로컬 데이터도 삭제
      localStorage.removeItem('fcm_token');
      sessionStorage.removeItem('fcm_permission_dismissed');
      // 캐시 초기화
      queryClient.setQueryData(['auth', 'user'], null);
      queryClient.clear();
      // 로그인 페이지로 이동
      navigate('/login');
    },
    onError: (error) => {
      console.error('Logout error:', error);
      // 에러가 발생해도 로컬 토큰/FCM 등 삭제하고 로그인 페이지로 이동
      localStorage.removeItem('fcm_token');
      sessionStorage.removeItem('fcm_permission_dismissed');
      queryClient.setQueryData(['auth', 'user'], null);
      navigate('/login');
    },
  });

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
    error,
    logout: () => logoutMutation.mutate(),
    isLoggingOut: logoutMutation.isPending,
  };
}

/**
 * 토큰에서 역할만 빠르게 확인하는 훅 (API 호출 없음)
 */
export function useAuthRole() {
  const token = localStorage.getItem('accessToken');

  if (!token || !isTokenValid(token)) {
    return {
      role: null,
      isAuthenticated: false,
    };
  }

  const role = getRoleFromToken(token);

  return {
    role,
    isAuthenticated: !!role,
  };
}
