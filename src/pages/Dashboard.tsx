import { useNavigate } from 'react-router-dom';
import { Layout } from '../components/common/Layout';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { useAuth } from '../hooks/useAuth';
import { useStreak } from '../hooks/useStreak';
import { useTodayProblem } from '../hooks/useProblem';
import { format } from 'date-fns';

const difficultyLabels: Record<string, string> = {
  EASY: '쉬움',
  MEDIUM: '보통',
  HARD: '어려움',
};

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

  if (!user) {
    return null; // useAuth가 로그인 페이지로 리다이렉트함
  }

  return (
    <Layout user={user} activeTab="dashboard" onNavigate={handleNavigate} onLogout={logout}>
      <div className="space-y-5 sm:space-y-7 lg:space-y-9 animate-fade-in">
        {/* Streak Card - 반응형 */}
        <Card className="bg-haru-600 text-white border-none shadow-haru-100 shadow-xl">
          {streakLoading ? (
            <div className="text-center py-3 sm:py-5">
              <div className="text-haru-100">로딩 중...</div>
            </div>
          ) : streak ? (
            <>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-haru-100 text-xs font-medium">연속 학습 기록</p>
                  <h2 className="text-2xl sm:text-3xl font-bold mt-1">{streak.currentStreak}일</h2>
                </div>
                <div className="text-2xl sm:text-3xl">🔥</div>
              </div>
              <div className="mt-2 sm:mt-3 pt-2 sm:pt-3 border-t border-haru-500 flex flex-col sm:flex-row justify-between gap-2 sm:gap-0 text-xs text-haru-100">
                <span>최고 기록: {streak.maxStreak}일</span>
                <span>오늘: {format(new Date(), 'yyyy-MM-dd')}</span>
              </div>
            </>
          ) : (
            <div className="text-center py-3 sm:py-5">
              <div className="text-haru-100">스트릭 정보를 불러올 수 없습니다.</div>
            </div>
          )}
        </Card>

        {/* Settings Info - 카드 외부 - 반응형 */}
        {user.categoryTopicName && user.difficulty && (
          <div className="flex flex-wrap gap-1.5">
            <span className="bg-white px-2.5 py-1 sm:px-3.5 sm:py-1.5 rounded-full text-xs font-semibold text-slate-500 border border-slate-100">
              {user.categoryTopicName}
            </span>
            <span className="bg-white px-2.5 py-1 sm:px-3.5 sm:py-1.5 rounded-full text-xs font-semibold text-slate-500 border border-slate-100">
              난이도: {difficultyLabels[user.difficulty] || user.difficulty}
            </span>
          </div>
        )}

        {/* Problem Card - 반응형 */}
        <Card title="오늘의 문제">
          {problemLoading ? (
            <div className="text-center py-7 sm:py-10 text-slate-400">
              <p className="text-sm">로딩 중...</p>
            </div>
          ) : problem ? (
            <div className="space-y-3 sm:space-y-4">
              <div className="flex flex-wrap gap-1.5 items-center">
                <span className="bg-haru-50 text-haru-600 text-[10px] sm:text-xs font-bold px-2 py-0.5 sm:px-2 sm:py-0.5 rounded uppercase">
                  {problem.categoryTopicName}
                </span>
                <span className="bg-slate-100 text-slate-500 text-[10px] sm:text-xs font-bold px-2 py-0.5 sm:px-2 sm:py-0.5 rounded uppercase">
                  {difficultyLabels[problem.difficulty] || problem.difficulty}
                </span>
                {problem.isSolved && (
                  <span className="bg-green-50 text-green-600 text-[10px] sm:text-xs font-bold px-2 py-0.5 sm:px-2 sm:py-0.5 rounded">
                    ✓ 완료
                  </span>
                )}
              </div>
              <h4 className="text-base sm:text-lg font-bold text-slate-800 leading-tight">{problem.title}</h4>
              <p className="text-slate-500 text-sm line-clamp-2 leading-relaxed">{problem.description}</p>
              {problem.isSolved ? (
                <button
                  onClick={handleProblemClick}
                  className="w-full group relative overflow-hidden rounded-xl bg-gradient-to-r from-haru-50/50 to-haru-100/50 border border-haru-200 hover:border-haru-400 hover:from-haru-50 hover:to-haru-100 transition-all duration-200 p-3"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-gradient-to-br from-haru-500 to-haru-600 text-white shadow-sm">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div className="text-left">
                        <p className="text-sm font-semibold text-haru-700">제출 완료</p>
                        <p className="text-xs text-haru-600/70">답변과 AI 피드백 확인하기</p>
                      </div>
                    </div>
                    <svg className="w-4 h-4 text-haru-400 group-hover:text-haru-600 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </button>
              ) : (
                <Button
                  fullWidth
                  size="lg"
                  onClick={handleProblemClick}
                >
                  문제 풀러 가기
                </Button>
              )}
            </div>
          ) : (
            <div className="text-center py-7 sm:py-10 text-slate-400">
              <p className="text-sm">오늘의 문제를 불러올 수 없습니다.</p>
            </div>
          )}
        </Card>

        <p className="text-center text-xs text-slate-400 py-3 sm:py-5 italic">
          "꾸준함은 모든 것을 이깁니다."
        </p>
      </div>
    </Layout>
  );
}
