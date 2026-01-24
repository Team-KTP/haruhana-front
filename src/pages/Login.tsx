import { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { ErrorModal } from '../components/common/ErrorModal';
import { login as loginApi } from '../api/auth';
import { LoginRequest, User } from '../types/auth';
import { getRoleFromToken } from '../utils/token';
import { useErrorModal } from '../hooks/useErrorModal';
import { getErrorMessage } from '../utils/errorHandler';

export default function Login() {
  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const queryClient = useQueryClient();
  const { modalState, showError, closeModal } = useErrorModal();

  // 회원가입 후 전달된 메시지 표시
  useEffect(() => {
    const state = location.state as { message?: string } | null;
    if (state?.message) {
      setSuccessMessage(state.message);
      // 메시지 표시 후 state 초기화
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  const loginMutation = useMutation({
    mutationFn: (data: LoginRequest) => loginApi(data),
    onSuccess: async (tokenResponse) => {
      // 토큰 저장
      localStorage.setItem('accessToken', tokenResponse.accessToken);
      localStorage.setItem('refreshToken', tokenResponse.refreshToken);

      // 토큰에서 역할 추출
      const role = getRoleFromToken(tokenResponse.accessToken);

      if (role) {
        // React Query 캐시에 임시 사용자 데이터 즉시 설정
        const tempUser: User = {
          loginId: loginId,
          nickname: loginId, // nickname도 임시로 설정
          role: role,
          createdAt: new Date().toISOString(),
        };

        queryClient.setQueryData(['auth', 'user'], tempUser);

        // 대시보드로 즉시 이동
        navigate('/dashboard', { replace: true });
      }
    },
    onError: (err: unknown) => {
      console.error('Login error:', err);
      showError(getErrorMessage(err));
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!loginId.trim() || !password.trim()) {
      showError('아이디와 비밀번호를 입력해주세요.');
      return;
    }

    loginMutation.mutate({ loginId, password });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 px-4 sm:px-6 py-8">
      <div className="mb-8 sm:mb-10 text-center">
        <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-haru-500 rounded-3xl mx-auto flex items-center justify-center text-white text-3xl sm:text-4xl lg:text-5xl font-bold shadow-xl shadow-haru-200 mb-4 sm:mb-6">
          하
        </div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-800 mb-2">하루하루</h1>
        <p className="text-sm sm:text-base text-slate-500">매일 조금씩, 꾸준히 성장하세요.</p>
      </div>

      <Card className="w-full max-w-sm sm:max-w-md">
        <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
          {successMessage && (
            <div className="p-3 sm:p-4 bg-green-50 border border-green-200 rounded-lg text-xs sm:text-sm text-green-600">
              {successMessage}
            </div>
          )}

          <div>
            <label className="block text-xs sm:text-sm font-medium text-slate-700 mb-2">아이디</label>
            <input
              type="text"
              autoComplete="username"
              required
              value={loginId}
              onChange={e => setLoginId(e.target.value)}
              className="w-full px-4 py-2.5 sm:py-3 text-sm sm:text-base rounded-xl border border-slate-200 focus:border-haru-500 focus:ring-2 focus:ring-haru-200 outline-none transition-all"
              placeholder="아이디를 입력하세요"
              disabled={loginMutation.isPending}
            />
          </div>
          <div>
            <label className="block text-xs sm:text-sm font-medium text-slate-700 mb-2">비밀번호</label>
            <input
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full px-4 py-2.5 sm:py-3 text-sm sm:text-base rounded-xl border border-slate-200 focus:border-haru-500 focus:ring-2 focus:ring-haru-200 outline-none transition-all"
              placeholder="비밀번호를 입력하세요"
              disabled={loginMutation.isPending}
            />
          </div>
          <Button
            type="submit"
            fullWidth
            size="lg"
            disabled={loginMutation.isPending}
          >
            {loginMutation.isPending ? '로그인 중...' : '로그인'}
          </Button>
          <p className="text-[10px] sm:text-xs text-center text-slate-400 mt-4">
            계속 진행함으로써, 빠름보다는 꾸준함을 추구하는 우리의 철학에 동의하게 됩니다.
          </p>
        </form>
        <div className="mt-5 sm:mt-6 text-center">
          <Link to="/signup" className="text-xs sm:text-sm text-slate-500 hover:text-haru-600 transition-colors">
            아직 계정이 없으신가요? <span className="font-semibold">회원가입</span>
          </Link>
        </div>
      </Card>
      <ErrorModal
        isOpen={modalState.isOpen}
        onClose={closeModal}
        title={modalState.title}
        message={modalState.message}
        type={modalState.type}
      />
    </div>
  );
}
