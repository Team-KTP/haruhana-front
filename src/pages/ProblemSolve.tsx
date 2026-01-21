import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Layout } from '../components/common/Layout';
import { MarkdownRenderer } from '../components/common/MarkdownRenderer';
import { useAuth } from '../hooks/useAuth';
import { useProblemDetail, useSubmitSolution } from '../hooks/useProblem';
import { useQueryClient } from '@tanstack/react-query';
import { format } from 'date-fns';

const difficultyLabels: Record<string, string> = {
  EASY: '쉬움',
  MEDIUM: '보통',
  HARD: '어려움',
};

export default function ProblemSolve() {
  const queryClient = useQueryClient();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const dailyProblemId = id ? parseInt(id, 10) : 0;

  const { problemDetail, isLoading, error } = useProblemDetail(dailyProblemId);
  const { submit, isSubmitting, data: submissionData } = useSubmitSolution(dailyProblemId);

  const [answer, setAnswer] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  // 기존 답변이 있으면 로드
  useEffect(() => {
    if (problemDetail?.userAnswer) {
      setAnswer(problemDetail.userAnswer);
    }
  }, [problemDetail]);

  const handleNavigate = (path: string) => {
    const routes: Record<string, string> = {
      dashboard: '/',
      history: '/records',
      profile: '/mypage',
    };
    navigate(routes[path] || '/');
  };

  const handleBack = () => {
    navigate('/');
  };

  const handleSubmit = () => {
    if (answer.trim().length < 5) {
      alert('답변은 최소 5자 이상 입력해주세요.');
      return;
    }
    submit(answer, {
      onSuccess: () => {
        // 문제 제출 성공 시 History 관련 쿼리 invalidate
        queryClient.invalidateQueries({ queryKey: ['dailyProblem'] });
        queryClient.invalidateQueries({ queryKey: ['monthlyProblems'] });
        setIsEditing(false);
      },
    });
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    // 원래 답변으로 되돌리기
    if (problemDetail?.userAnswer) {
      setAnswer(problemDetail.userAnswer);
    }
  };

  if (!user) {
    return null;
  }

  if (isLoading) {
    return (
      <Layout user={user} onNavigate={handleNavigate} onLogout={logout}>
        <div className="flex items-center justify-center min-h-[60vh]">
          <p className="text-slate-400">문제를 불러오는 중...</p>
        </div>
      </Layout>
    );
  }

  if (error || !problemDetail) {
    return (
      <Layout user={user} onNavigate={handleNavigate} onLogout={logout}>
        <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
          <p className="text-slate-600">문제를 불러올 수 없습니다.</p>
          <Button onClick={handleBack}>대시보드로 돌아가기</Button>
        </div>
      </Layout>
    );
  }

  const isAlreadySubmitted = !!problemDetail.userAnswer;
  const showAIAnswer = submissionData?.aiAnswer || problemDetail.aiAnswer;

  return (
    <Layout user={user} onNavigate={handleNavigate} onLogout={logout}>
      <div className="space-y-5 pb-32 sm:pb-10">
        {/* Back button */}
        <div className="flex items-center gap-2">
          <button onClick={handleBack} className="p-1.5 -ml-1.5 text-slate-400 hover:text-slate-600 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <span className="text-xs font-bold text-slate-400 uppercase tracking-tight">
            {problemDetail.assignedAt && format(new Date(problemDetail.assignedAt), 'yyyy-MM-dd')}
          </span>
        </div>

        {/* Problem section */}
        <section className="space-y-3">
          <div className="flex gap-1.5">
            <span className="bg-haru-50 text-haru-600 text-[10px] font-bold px-2 py-0.5 rounded uppercase">
              {problemDetail.categoryTopic}
            </span>
            <span className="bg-slate-100 text-slate-500 text-[10px] font-bold px-2 py-0.5 rounded uppercase">
              {difficultyLabels[problemDetail.difficulty] || problemDetail.difficulty}
            </span>
            {isAlreadySubmitted && (
              <span className="bg-green-50 text-green-600 text-[10px] font-bold px-2 py-0.5 rounded">
                ✓ 제출 완료
              </span>
            )}
          </div>
          <h2 className="text-xl font-bold text-slate-800 leading-tight flex items-center gap-2">
            <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-haru-50 text-haru-500 mr-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6l4 2" />
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
              </svg>
            </span>
            {problemDetail.title}
          </h2>
          <Card className="!p-0 bg-gradient-to-br from-haru-50/80 to-slate-50/80 border-0 shadow-md">
            <div className="px-3 py-2.5">
              <div className="mb-2 flex items-center gap-2">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-haru-400 animate-pulse"></span>
                <span className="text-xs text-haru-500 font-semibold tracking-wide">문제 설명</span>
              </div>
              <div className="border-b border-slate-200 mb-2.5"></div>
              <MarkdownRenderer content={problemDetail.description} variant="default" />
            </div>
          </Card>
        </section>

        {/* Answer section or submitted view */}
        {!isAlreadySubmitted && !submissionData ? (
          <section className="space-y-3">
            <label className="block text-sm font-semibold text-slate-700">답변 작성</label>
            <textarea
              value={answer}
              onChange={e => setAnswer(e.target.value)}
              className="w-full h-40 p-3 rounded-xl border border-slate-200 focus:border-haru-500 focus:ring-2 focus:ring-haru-200 outline-none resize-none text-sm transition-all"
              placeholder="답변을 입력하세요..."
              disabled={isSubmitting}
            />
            <Button
              fullWidth
              size="lg"
              onClick={handleSubmit}
              disabled={answer.trim().length < 5 || isSubmitting}
            >
              {isSubmitting ? '제출 중...' : '제출 완료'}
            </Button>
          </section>
        ) : (
          <div className="space-y-5 animate-fade-in">
            {/* Submitted answer or Edit mode */}
            {isEditing ? (
              <section className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="block text-sm font-semibold text-slate-700">답변 수정</label>
                  <span className="text-xs text-slate-500">수정 후 다시 제출해주세요</span>
                </div>
                <textarea
                  value={answer}
                  onChange={e => setAnswer(e.target.value)}
                  className="w-full h-40 p-3 rounded-xl border border-slate-200 focus:border-haru-500 focus:ring-2 focus:ring-haru-200 outline-none resize-none text-sm transition-all"
                  placeholder="답변을 입력하세요..."
                  disabled={isSubmitting}
                />
                <div className="flex gap-2">
                  <Button
                    fullWidth
                    size="lg"
                    onClick={handleSubmit}
                    disabled={answer.trim().length < 5 || isSubmitting}
                  >
                    {isSubmitting ? '제출 중...' : '수정 완료'}
                  </Button>
                  <Button
                    fullWidth
                    size="lg"
                    variant="secondary"
                    onClick={handleCancelEdit}
                    disabled={isSubmitting}
                  >
                    취소
                  </Button>
                </div>
              </section>
            ) : (
              <Card>
                <div className="flex items-start justify-between mb-2.5">
                  <h3 className="text-sm font-semibold text-slate-700">제출한 답변</h3>
                  <button
                    onClick={handleEdit}
                    className="p-1.5 -mr-1.5 -mt-0.5 text-slate-400 hover:text-haru-600 hover:bg-haru-50 rounded-lg transition-all group"
                    title="답변 수정"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                  </button>
                </div>
                <p className="text-slate-600 text-sm whitespace-pre-wrap leading-relaxed">
                  {submissionData?.userAnswer || problemDetail.userAnswer}
                </p>
                {problemDetail.submittedAt && (
                  <p className="text-xs text-slate-400 mt-2.5">
                    제출 시간: {format(new Date(problemDetail.submittedAt), 'yyyy-MM-dd HH:mm')}
                  </p>
                )}
              </Card>
            )}

            {/* AI Mentor Section */}
            {showAIAnswer && (
              <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-5 shadow-2xl border border-slate-700/50">
                <div className="flex items-center gap-2.5 mb-4 pb-3 border-b border-slate-700/50">
                  <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-haru-500/20 border border-haru-500/30">
                    <svg className="w-4 h-4 text-haru-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-base tracking-tight text-haru-200">AI 멘토의 조언</h3>
                    <p className="text-xs text-slate-400 mt-0.5">문제 풀이에 도움이 되는 피드백입니다</p>
                  </div>
                </div>
                <MarkdownRenderer content={showAIAnswer} variant="dark" />
              </div>
            )}

            {/* Back button */}
            <Button fullWidth variant="secondary" onClick={handleBack}>
              대시보드로 돌아가기
            </Button>
          </div>
        )}
      </div>
    </Layout>
  );
}
