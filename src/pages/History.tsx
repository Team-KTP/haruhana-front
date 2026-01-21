import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '../components/common/Layout';
import { Card } from '../components/common/Card';
import { useAuth } from '../hooks/useAuth';
import { useDailyProblem, useMonthlyProblems } from '../hooks/useHistory';
import { format } from 'date-fns';

const difficultyLabels: Record<string, string> = {
  EASY: '쉬움',
  MEDIUM: '보통',
  HARD: '어려움',
};

export default function History() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [currentMonth, setCurrentMonth] = useState(new Date());
  // 선택된 날짜 (null이면 오늘 날짜 기준으로 조회)
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  // 선택된 날짜 또는 undefined(오늘)로 API 호출
  const { problem, isLoading } = useDailyProblem(selectedDate);

  // 월별 문제 데이터 (캘린더 점 표시용, 회원 가입일 이후만 조회)
  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth() + 1;
  const { problemsMap } = useMonthlyProblems(year, month, user?.createdAt);

  const handleNavigate = (path: string) => {
    const routes: Record<string, string> = {
      dashboard: '/',
      history: '/records',
      profile: '/mypage',
    };
    navigate(routes[path] || '/');
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();

    const days: (Date | null)[] = [];
    for (let i = 0; i < firstDayOfMonth; i++) days.push(null);
    for (let i = 1; i <= daysInMonth; i++) days.push(new Date(year, month, i));
    return days;
  };

  const days = getDaysInMonth(currentMonth);

  const handleDateClick = (date: Date) => {
    const dateStr = format(date, 'yyyy-MM-dd');
    if (selectedDate === dateStr) {
      // 같은 날짜 다시 클릭하면 오늘로 리셋
      setSelectedDate(null);
    } else {
      setSelectedDate(dateStr);
    }
  };

  const handleItemClick = (problemId: number) => {
    navigate(`/problem/${problemId}`);
  };

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const handleResetToToday = () => {
    setSelectedDate(null);
    setCurrentMonth(new Date());
  };

  // 오늘 날짜
  const today = format(new Date(), 'yyyy-MM-dd');

  if (!user) {
    return null;
  }

  return (
    <Layout user={user} activeTab="history" onNavigate={handleNavigate} onLogout={logout}>
      <div className="animate-fade-in space-y-4 sm:space-y-6 pb-20">
        <div>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-800">나의 기록</h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">날짜를 선택하여 문제를 확인하세요.</p>
        </div>

        {/* 캘린더 - 반응형 */}
        <Card className="!p-3 sm:!p-4 lg:!p-5 shrink-0">
          <div className="flex justify-between items-center mb-3 sm:mb-4">
            <button onClick={handlePrevMonth} className="p-1 sm:p-2 text-slate-400 hover:text-slate-600 transition-colors">
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <h3 className="font-bold text-sm sm:text-base lg:text-lg text-slate-700">
              {currentMonth.getFullYear()}년 {currentMonth.getMonth() + 1}월
            </h3>
            <button onClick={handleNextMonth} className="p-1 sm:p-2 text-slate-400 hover:text-slate-600 transition-colors">
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          <div className="grid grid-cols-7 gap-1 sm:gap-2 text-center mb-1 sm:mb-2">
            {['일', '월', '화', '수', '목', '금', '토'].map(d => (
              <div key={d} className="text-[10px] sm:text-xs font-bold text-slate-300 py-1 uppercase">{d}</div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1 sm:gap-2">
            {days.map((date, idx) => {
              if (!date) return <div key={`empty-${idx}`}></div>;

              const dateStr = format(date, 'yyyy-MM-dd');
              const isSelected = selectedDate === dateStr;
              const isToday = dateStr === today;
              const isCurrentSelection = selectedDate === null && isToday;

              // 해당 날짜의 문제 상태 확인
              const problemStatus = problemsMap.get(dateStr);
              const hasProblem = !!problemStatus;
              const isSolved = problemStatus?.isSolved ?? false;

              return (
                <button
                  key={date.toISOString()}
                  onClick={() => handleDateClick(date)}
                  className={`aspect-square rounded-lg flex flex-col items-center justify-center text-xs sm:text-sm transition-all cursor-pointer
                    ${isSelected || isCurrentSelection ? 'bg-haru-500 text-white' : 'hover:bg-slate-100 text-slate-600'}
                    ${isToday && !isSelected && selectedDate !== null ? 'ring-2 ring-haru-300' : ''}
                  `}
                >
                  {date.getDate()}
                  {/* 문제가 있는 날짜에 점 표시 */}
                  {hasProblem && !(isSelected || isCurrentSelection) && (
                    <div className={`w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full mt-0.5 ${isSolved ? 'bg-haru-500' : 'bg-slate-100'}`}></div>
                  )}
                </button>
              );
            })}
          </div>
        </Card>

        {/* 선택된 날짜 문제 표시 - 반응형 */}
        <div className="flex-1 min-h-0 flex flex-col">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <h3 className="font-bold text-slate-800 text-sm sm:text-base">
              {selectedDate ? `${selectedDate} 문제` : '오늘의 문제'}
            </h3>
            {selectedDate && (
              <button onClick={handleResetToToday} className="text-xs sm:text-sm text-haru-600 font-medium hover:text-haru-700 transition-colors">
                오늘로 돌아가기
              </button>
            )}
          </div>

          <div className="flex-1 overflow-y-auto custom-scrollbar">
            {isLoading ? (
              <div className="text-center py-10 sm:py-12 text-slate-400 bg-white rounded-xl border border-slate-100">
                <p className="text-xs sm:text-sm">로딩 중...</p>
              </div>
            ) : !problem || problem.id === null ? (
              <div className="text-center py-10 sm:py-12 lg:py-16 bg-white rounded-xl border border-slate-100">
                <div className="text-4xl sm:text-5xl mb-3">📭</div>
                <p className="text-sm sm:text-base font-medium text-slate-500">할당받은 문제가 없습니다</p>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  {selectedDate ? `${selectedDate}에는` : '오늘은'} 배정된 문제가 없어요.
                </p>
              </div>
            ) : (
              <div
                className="bg-white p-4 sm:p-5 lg:p-6 rounded-xl border border-slate-100 shadow-sm flex flex-col gap-2 sm:gap-3 cursor-pointer hover:border-haru-200 transition-all active:scale-[0.98]"
                onClick={() => handleItemClick(problem.id)}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1 sm:mb-2">
                      <span className="bg-haru-50 text-haru-600 text-[10px] sm:text-xs font-bold px-2 py-0.5 sm:px-2.5 sm:py-1 rounded uppercase">
                        {problem.categoryTopic}
                      </span>
                      <span className="bg-slate-100 text-slate-500 text-[10px] sm:text-xs font-bold px-2 py-0.5 sm:px-2.5 sm:py-1 rounded uppercase">
                        {difficultyLabels[problem.difficulty] || problem.difficulty}
                      </span>
                      {problem.isSolved ? (
                        <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 bg-green-50 text-green-600 text-[10px] sm:text-xs font-bold rounded">✓ 완료</span>
                      ) : (
                        <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 bg-slate-100 text-slate-400 text-[10px] sm:text-xs font-bold rounded">미완료</span>
                      )}
                    </div>
                    <h3 className="font-bold text-slate-800 text-sm sm:text-base lg:text-lg truncate">{problem.title}</h3>
                  </div>
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-slate-300 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
