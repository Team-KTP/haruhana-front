
import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Problem, Submission } from '../types';
import { storageService } from '../services/storageService';

interface ProblemSolveProps {
  problem: Problem;
  onBack: () => void;
  existingSubmission?: Submission | null;
}

export const ProblemSolve: React.FC<ProblemSolveProps> = ({ problem, onBack, existingSubmission }) => {
  const [answer, setAnswer] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [submissionData, setSubmissionData] = useState<Submission | null>(null);

  useEffect(() => {
    if (existingSubmission) {
      setAnswer(existingSubmission.answer);
      setSubmissionData(existingSubmission);
      setSubmitted(true);
    } else {
        const sub = storageService.getSubmissionForProblem(problem.id);
        if(sub) {
            setAnswer(sub.answer);
            setSubmissionData(sub);
            setSubmitted(true);
        } else {
            setSubmitted(false);
            setAnswer('');
        }
    }
  }, [existingSubmission, problem]);

  const handleSubmit = () => {
    if (!answer.trim()) return;
    const sub = storageService.submitAnswer(problem.id, answer);
    setSubmissionData(sub);
    setSubmitted(true);
  };

  return (
    <div className="space-y-6 pb-10">
      <div className="flex items-center gap-2">
        <button onClick={onBack} className="p-2 -ml-2 text-slate-400 hover:text-slate-600">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
        </button>
        <span className="text-xs font-bold text-slate-400 uppercase">{problem.problemAt}</span>
      </div>

      <section className="space-y-4">
        <div className="flex gap-2">
          <span className="bg-haru-50 text-haru-600 text-[10px] font-bold px-2 py-0.5 rounded uppercase">{problem.topic}</span>
          <span className="bg-slate-100 text-slate-500 text-[10px] font-bold px-2 py-0.5 rounded uppercase">{problem.difficulty}</span>
        </div>
        <h2 className="text-2xl font-bold text-slate-800">{problem.title}</h2>
        <Card className="prose prose-slate max-w-none text-slate-600 text-sm leading-relaxed">
           <ReactMarkdown>{problem.description}</ReactMarkdown>
        </Card>
      </section>

      {!submitted ? (
        <section className="space-y-4">
          <label className="block text-sm font-bold text-slate-700">나의 답변</label>
          <textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            className="w-full h-48 p-4 rounded-xl border border-slate-200 focus:border-haru-500 focus:ring-2 focus:ring-haru-200 outline-none resize-none text-sm transition-all"
            placeholder="답변을 입력해주세요 (최소 5자 이상)"
          />
          <Button fullWidth size="lg" onClick={handleSubmit} disabled={answer.length < 5}>
            제출 완료
          </Button>
        </section>
      ) : (
        <div className="space-y-6 animate-fade-in">
           <Card title="제출한 답변">
              <p className="text-slate-700 whitespace-pre-wrap text-sm">{submissionData?.answer}</p>
           </Card>

           <div className="bg-slate-800 text-white rounded-2xl p-6 shadow-lg">
             <div className="flex items-center gap-2 mb-4 text-haru-300">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" /></svg>
                <h3 className="font-bold text-sm">AI 멘토의 조언</h3>
             </div>
             <div className="prose prose-invert prose-sm max-w-none text-slate-300">
               <ReactMarkdown>{problem.aiAnswer}</ReactMarkdown>
             </div>
           </div>

           <Button fullWidth variant="outline" onClick={onBack}>
             목록으로 돌아가기
           </Button>
        </div>
      )}
    </div>
  );
};
