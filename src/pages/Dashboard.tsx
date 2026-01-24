import { useNavigate, Navigate } from 'react-router-dom';
import { Layout } from '../components/common/Layout';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { useAuth } from '../hooks/useAuth';
import { useStreak } from '../hooks/useStreak';
import { useTodayProblem } from '../hooks/useProblem';
import { format } from 'date-fns';
import { DIFFICULTY_LABELS } from '../constants';

export default function Dashboard() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { streak, isLoading: streakLoading } = useStreak();
  const { problem, isLoading: problemLoading } = useTodayProblem();

  const handleNavigate = (path: string) => {
    const routes: Record<string, string> = {
      dashboard: '/',
      history: '/records',
      profile: '/mypage',
    };
    navigate(routes[path] || '/');
  };

  const handleProblemClick = () => {
    if (problem) {
      navigate(`/problem/${problem.id}`);
    }
  };

  // 인증이 안 된 경우 로그인 화면으로 강제 이동
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <Layout user={user} activeTab="dashboard" onNavigate={handleNavigate} onLogout={logout}>
      <div className="space-y-5 sm:space-y-7 lg:space-y-9">
        {/* 스트릭 카드 - 프리미엄 디자인 */}
        <div className="animate-slide-in-up">
          <div className="relative overflow-hidden bg-gradient-to-br from-haru-500 via-haru-600 to-haru-700 rounded-2xl sm:rounded-3xl shadow-premium-lg">
            {/* 배경 패턴 */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full -translate-y-1/2 translate-x-1/2"></div>
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full translate-y-1/2 -translate-x-1/2"></div>
            </div>

            <div className="relative px-5 sm:px-7 py-6 sm:py-8">
              {streakLoading ? (
                <div className="text-center py-3 sm:py-5">
                  <div className="text-haru-100">로딩 중...</div>
                </div>
              ) : streak ? (
                <>
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="inline-flex items-center gap-2 mb-3">
                        <div className="w-2 h-2 rounded-full bg-white animate-pulse-glow"></div>
                        <p className="text-haru-50 text-xs sm:text-sm font-semibold tracking-wide uppercase">연속 학습 기록</p>
                      </div>
                      <div className="flex items-baseline gap-2 mb-2">
                        <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white tracking-tight">
                          {streak.currentStreak}
                        </h2>
                        <span className="text-2xl sm:text-3xl text-haru-100 font-medium">일</span>
                      </div>
                      <p className="text-haru-100 text-sm sm:text-base">계속해서 멋진 페이스를 유지하고 있어요!</p>
                    </div>
                    <div className="text-5xl sm:text-6xl animate-float">🔥</div>
                  </div>

                  <div className="mt-6 pt-5 border-t border-white/20 flex flex-col sm:flex-row gap-3 sm:gap-0 sm:justify-between">
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-haru-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                      </svg>
                      <span className="text-sm text-haru-100">최고 기록 <span className="font-bold text-white">{streak.maxStreak}일</span></span>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-haru-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span className="text-sm text-haru-100">{format(new Date(), 'yyyy년 MM월 dd일')}</span>
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-center py-3 sm:py-5">
                  <div className="text-haru-100">스트릭 정보를 불러올 수 없습니다.</div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 설정 정보 뱃지 */}
        {user.categoryTopicName && user.difficulty && (
          <div className="flex flex-wrap gap-2 animate-slide-in-left delay-100">
            <span className="inline-flex items-center gap-1.5 bg-white px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold text-slate-700 border border-slate-200 shadow-card hover:shadow-card-hover transition-all">
              <svg className="w-3.5 h-3.5 text-haru-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
              {user.categoryTopicName}
            </span>
            <span className="inline-flex items-center gap-1.5 bg-white px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold text-slate-700 border border-slate-200 shadow-card hover:shadow-card-hover transition-all">
              <svg className="w-3.5 h-3.5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              난이도: {DIFFICULTY_LABELS[user.difficulty] || user.difficulty}
            </span>
          </div>
        )}

        {/* 오늘의 문제 카드 - 프리미엄 디자인 */}
        <div className="animate-slide-in-up delay-200">
          <Card className="shadow-card hover:shadow-card-hover transition-all duration-300 !p-0 overflow-hidden">
            <div className="px-5 sm:px-7 pt-5 sm:pt-6 pb-3">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-1 h-6 bg-gradient-to-b from-haru-500 to-haru-600 rounded-full"></div>
                <h3 className="text-lg sm:text-xl font-bold text-slate-800">오늘의 문제</h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 ml-3">매일 새로운 도전으로 성장하세요</p>
            </div>

            {problemLoading ? (
              <div className="text-center py-10 sm:py-14 text-slate-400">
                <div className="inline-block w-12 h-12 border-4 border-haru-200 border-t-haru-500 rounded-full animate-spin mb-3"></div>
                <p className="text-sm">로딩 중...</p>
              </div>
            ) : problem ? (
              <div className="px-5 sm:px-7 pb-5 sm:pb-7">
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="inline-flex items-center gap-1 bg-haru-50 text-haru-700 text-[10px] sm:text-xs font-bold px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg uppercase tracking-wide">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
                    </svg>
                    {problem.categoryTopicName}
                  </span>
                  <span className="inline-flex items-center gap-1 bg-slate-100 text-slate-600 text-[10px] sm:text-xs font-bold px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg uppercase tracking-wide">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                    </svg>
                    {DIFFICULTY_LABELS[problem.difficulty] || problem.difficulty}
                  </span>
                  {problem.isSolved && (
                    <span className="inline-flex items-center gap-1 bg-green-50 text-green-700 text-[10px] sm:text-xs font-bold px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      완료
                    </span>
                  )}
                </div>

                <h4 className="text-base sm:text-lg lg:text-xl font-bold text-slate-800 leading-snug mb-3">
                  {problem.title}
                </h4>

                <p className="text-slate-600 text-sm sm:text-base line-clamp-3 leading-relaxed mb-5">
                  {problem.description}
                </p>

                {problem.isSolved ? (
                  <button
                    onClick={handleProblemClick}
                    className="w-full group relative overflow-hidden rounded-xl bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 hover:border-green-400 transition-all duration-300 p-4"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 text-white shadow-lg group-hover:scale-110 transition-transform">
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <div className="text-left">
                          <p className="text-sm sm:text-base font-bold text-green-800 mb-0.5">제출 완료</p>
                          <p className="text-xs sm:text-sm text-green-600">답변과 AI 피드백 확인하기</p>
                        </div>
                      </div>
                      <svg className="w-5 h-5 text-green-500 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </button>
                ) : (
                  <Button
                    fullWidth
                    size="lg"
                    onClick={handleProblemClick}
                    className="shadow-premium hover:shadow-premium-lg"
                  >
                    <span className="flex items-center justify-center gap-2">
                      문제 풀러 가기
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </span>
                  </Button>
                )}
              </div>
            ) : (
              <div className="text-center py-10 sm:py-14 text-slate-400">
                <div className="text-5xl mb-4">📭</div>
                <p className="text-sm sm:text-base font-medium">오늘의 문제를 불러올 수 없습니다.</p>
              </div>
            )}
          </Card>
        </div>

        {/* 명언 */}
        <div className="text-center animate-fade-in delay-300">
          <div className="inline-flex items-center gap-2 px-5 py-3 bg-white rounded-full shadow-card">
            <svg className="w-4 h-4 text-haru-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
            </svg>
            <p className="text-xs sm:text-sm text-slate-600 font-medium italic">
              "꾸준함은 모든 것을 이깁니다."
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
