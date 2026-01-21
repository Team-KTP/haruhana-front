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
      profile: '/settings',
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
      <div className="space-y-4 sm:space-y-6 lg:space-y-8 animate-fade-in">
        {/* Streak Card - 반응형 */}
        <Card className="bg-haru-600 text-white border-none shadow-haru-100 shadow-xl">
          {streakLoading ? (
            <div className="text-center py-4 sm:py-6">
              <div className="text-haru-100">로딩 중...</div>
            </div>
          ) : streak ? (
            <>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-haru-100 text-xs sm:text-sm font-medium">연속 학습 기록</p>
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-1">{streak.currentStreak}일</h2>
                </div>
                <div className="text-3xl sm:text-4xl lg:text-5xl">🔥</div>
              </div>
              <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-haru-500 flex flex-col sm:flex-row justify-between gap-2 sm:gap-0 text-xs sm:text-sm text-haru-100">
                <span>최고 기록: {streak.maxStreak}일</span>
                <span>오늘: {format(new Date(), 'yyyy-MM-dd')}</span>
              </div>
            </>
          ) : (
            <div className="text-center py-4 sm:py-6">
              <div className="text-haru-100">스트릭 정보를 불러올 수 없습니다.</div>
            </div>
          )}
        </Card>

        {/* Settings Info - 카드 외부 - 반응형 */}
        {user.categoryTopicName && user.difficulty && (
          <div className="flex flex-wrap gap-2">
            <span className="bg-white px-3 py-1 sm:px-4 sm:py-1.5 rounded-full text-xs sm:text-sm font-semibold text-slate-500 border border-slate-100">
              {user.categoryTopicName}
            </span>
            <span className="bg-white px-3 py-1 sm:px-4 sm:py-1.5 rounded-full text-xs sm:text-sm font-semibold text-slate-500 border border-slate-100">
              난이도: {difficultyLabels[user.difficulty] || user.difficulty}
            </span>
          </div>
        )}

        {/* Problem Card - 반응형 */}
        <Card title="오늘의 문제">
          {problemLoading ? (
            <div className="text-center py-8 sm:py-12 text-slate-400">
              <p className="text-sm sm:text-base">로딩 중...</p>
            </div>
          ) : problem ? (
            <div className="space-y-4 sm:space-y-5">
              <div className="flex flex-wrap gap-2 items-center">
                <span className="bg-haru-50 text-haru-600 text-[10px] sm:text-xs font-bold px-2 py-0.5 sm:px-2.5 sm:py-1 rounded uppercase">
                  {problem.categoryTopicName}
                </span>
                <span className="bg-slate-100 text-slate-500 text-[10px] sm:text-xs font-bold px-2 py-0.5 sm:px-2.5 sm:py-1 rounded uppercase">
                  {difficultyLabels[problem.difficulty] || problem.difficulty}
                </span>
                {problem.isSolved && (
                  <span className="bg-green-50 text-green-600 text-[10px] sm:text-xs font-bold px-2 py-0.5 sm:px-2.5 sm:py-1 rounded">
                    ✓ 완료
                  </span>
                )}
              </div>
              <h4 className="text-lg sm:text-xl lg:text-2xl font-bold text-slate-800 leading-tight">{problem.title}</h4>
              <p className="text-slate-500 text-sm sm:text-base line-clamp-2 sm:line-clamp-3 leading-relaxed">{problem.description}</p>
              <Button
                fullWidth
                size="lg"
                variant={problem.isSolved ? 'secondary' : 'primary'}
                onClick={handleProblemClick}
              >
                {problem.isSolved ? '제출한 답변 보기' : '문제 풀러 가기'}
              </Button>
            </div>
          ) : (
            <div className="text-center py-8 sm:py-12 text-slate-400">
              <p className="text-sm sm:text-base">오늘의 문제를 불러올 수 없습니다.</p>
            </div>
          )}
        </Card>

        <p className="text-center text-xs sm:text-sm text-slate-400 py-4 sm:py-6 italic">
          "꾸준함은 모든 것을 이깁니다."
        </p>
      </div>
    </Layout>
  );
}
