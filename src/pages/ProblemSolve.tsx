// 간단한 마크다운 파서 (AI 답변용, 가독성 개선)
const parseMarkdown = (text: string) => {
  const paragraphs = text.split(/\n\n+/);
  return paragraphs.map((paragraph, idx) => {
    if (paragraph.startsWith('## ')) {
      return (
        <h4 key={idx} className="font-bold text-haru-200 mt-5 mb-2 text-base tracking-tight">
          {paragraph.replace('## ', '')}
        </h4>
      );
    } else if (paragraph.startsWith('```')) {
      const code = paragraph.replace(/```[a-zA-Z]*\n?|```$/g, '');
      return (
        <pre key={idx} className="bg-slate-900 p-4 rounded-xl overflow-x-auto text-xs text-haru-100 border border-slate-700 mb-2">
          <code>{code}</code>
        </pre>
      );
    } else if (paragraph.split('\n').some(line => line.startsWith('- '))) {
      return (
        <ul key={idx} className="list-disc list-inside space-y-1 pl-4">
          {paragraph.split('\n').filter(line => line.startsWith('- ')).map((item, i) => (
            <li key={i} className="text-haru-100 leading-relaxed">{item.replace('- ', '')}</li>
          ))}
        </ul>
      );
    } else if (paragraph.trim().startsWith('**') && paragraph.trim().endsWith('**')) {
      return <p key={idx} className="font-bold text-haru-100 text-base mb-1">{paragraph.replace(/\*\*/g, '')}</p>;
    }
    return <p key={idx} className="text-haru-100 leading-relaxed text-[15px]">{paragraph}</p>;
  });
};
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Layout } from '../components/common/Layout';
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
      },
    });
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
      <div className="space-y-6 pb-32 sm:pb-10">
        {/* Back button */}
        <div className="flex items-center gap-2">
          <button onClick={handleBack} className="p-2 -ml-2 text-slate-400 hover:text-slate-600 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <span className="text-xs font-bold text-slate-400 uppercase tracking-tight">
            {problemDetail.assignedAt && format(new Date(problemDetail.assignedAt), 'yyyy-MM-dd')}
          </span>
        </div>

        {/* Problem section */}
        <section className="space-y-4">
          <div className="flex gap-2">
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
          <h2 className="text-2xl font-bold text-slate-800 leading-tight flex items-center gap-2">
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-haru-50 text-haru-500 mr-1">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6l4 2" />
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
              </svg>
            </span>
            {problemDetail.title}
          </h2>
          <Card className="!p-0 bg-gradient-to-br from-haru-50/80 to-slate-50/80 border-0 shadow-md">
            <div className="px-4 py-3">
              <div className="mb-2 flex items-center gap-2">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-haru-400 animate-pulse"></span>
                <span className="text-xs text-haru-500 font-semibold tracking-wide">문제 설명</span>
              </div>
              <div className="border-b border-slate-200 mb-3"></div>
              <div className="prose prose-h4:text-haru-600 prose-p:text-slate-900 prose-ul:text-slate-900 prose-li:marker:text-haru-400 prose-code:bg-slate-100 prose-code:text-xs prose-code:rounded prose-code:px-1 prose-code:py-0.5 prose-pre:bg-slate-900 prose-pre:text-haru-100 prose-pre:rounded-xl prose-pre:p-4 prose-pre:border prose-pre:border-slate-700 max-w-none text-[15px] leading-relaxed">
                {parseMarkdown(problemDetail.description)}
              </div>
            </div>
          </Card>
        </section>

        {/* Answer section or submitted view */}
        {!isAlreadySubmitted && !submissionData ? (
          <section className="space-y-4">
            <label className="block text-sm font-semibold text-slate-700">답변 작성</label>
            <textarea
              value={answer}
              onChange={e => setAnswer(e.target.value)}
              className="w-full h-48 p-4 rounded-xl border border-slate-200 focus:border-haru-500 focus:ring-2 focus:ring-haru-200 outline-none resize-none text-sm transition-all"
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
          <div className="space-y-6 animate-fade-in">
            {/* Submitted answer */}
            <Card title="제출한 답변">
              <p className="text-slate-600 text-sm whitespace-pre-wrap leading-relaxed">
                {submissionData?.userAnswer || problemDetail.userAnswer}
              </p>
              {problemDetail.submittedAt && (
                <p className="text-xs text-slate-400 mt-3">
                  제출 시간: {format(new Date(problemDetail.submittedAt), 'yyyy-MM-dd HH:mm')}
                </p>
              )}
            </Card>

            {/* AI Mentor Section */}
            {showAIAnswer && (
              <div className="bg-slate-800 rounded-2xl p-7 shadow-2xl border border-slate-700">
                <div className="flex items-center gap-2 mb-5 text-haru-300">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                  <h3 className="font-bold text-base tracking-tight">AI 멘토의 조언</h3>
                </div>
                <div className="space-y-4">
                  {parseMarkdown(showAIAnswer)}
                </div>
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
