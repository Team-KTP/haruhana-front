
import React, { useEffect, useState } from 'react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { storageService } from '../services/storageService';
import { generateDailyProblem } from '../services/geminiService';
import { Problem, Preference, Submission, Streak } from '../types';

interface DashboardProps {
  onSolve: (problem: Problem) => void;
  onViewSubmission: (problem: Problem) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onSolve, onViewSubmission }) => {
  const [loading, setLoading] = useState(true);
  const [problem, setProblem] = useState<Problem | null>(null);
  const [submission, setSubmission] = useState<Submission | null>(null);
  const [streak, setStreak] = useState<Streak>({ currentStreak: 0, maxStreak: 0, lastSolvedDate: null });
  const [preference, setPreference] = useState<Preference | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    const pref = storageService.getPreference();
    const strk = storageService.getStreak();
    setPreference(pref);
    setStreak(strk);

    let existingProblem = storageService.getTodayProblem();
    
    if (existingProblem) {
      setProblem(existingProblem);
      const sub = storageService.getSubmissionForProblem(existingProblem.id);
      setSubmission(sub);
      setLoading(false);
    } else if (pref) {
      try {
        const generated = await generateDailyProblem(pref.topicName, pref.difficulty);
        const newProblem: Problem = {
          ...generated,
          id: Math.random().toString(36).substr(2, 9),
          problemAt: new Date().toISOString().split('T')[0]
        };
        storageService.saveTodayProblem(newProblem);
        setProblem(newProblem);
      } catch (e) {
        console.error("Failed to generate", e);
      } finally {
        setLoading(false);
      }
    } else {
        setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh]">
        <div className="w-10 h-10 border-4 border-haru-500 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-slate-500">오늘의 문제를 준비 중입니다...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Streak Card */}
      <Card className="bg-haru-600 text-white border-none shadow-haru-100 shadow-xl">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-haru-100 text-sm font-medium">연속 학습 기록</p>
            <h2 className="text-4xl font-bold mt-1">{streak.currentStreak}일</h2>
          </div>
          <div className="text-4xl">🔥</div>
        </div>
        <div className="mt-4 pt-4 border-t border-haru-500 flex justify-between text-xs text-haru-100">
          <span>최고 기록: {streak.maxStreak}일</span>
          <span>마지막 학습: {streak.lastSolvedDate || '없음'}</span>
        </div>
      </Card>

      {/* Settings Info */}
      <div className="flex gap-2">
        <span className="bg-white px-3 py-1 rounded-full text-xs font-semibold text-slate-500 border border-slate-100">
          {preference?.topicName}
        </span>
        <span className="bg-white px-3 py-1 rounded-full text-xs font-semibold text-slate-500 border border-slate-100">
          난이도: {preference?.difficulty}
        </span>
      </div>

      {/* Problem Card */}
      <Card title="오늘의 문제">
        {problem ? (
          <div className="space-y-4">
            <h4 className="text-xl font-bold text-slate-800 leading-tight">
              {problem.title}
            </h4>
            <p className="text-slate-500 text-sm line-clamp-2 leading-relaxed">
              {problem.description}
            </p>
            
            {submission ? (
              <Button fullWidth variant="secondary" onClick={() => onViewSubmission(problem)}>
                제출한 답변 보기
              </Button>
            ) : (
              <Button fullWidth onClick={() => onSolve(problem)}>
                문제 풀러 가기
              </Button>
            )}
          </div>
        ) : (
          <p className="text-slate-400 py-4 text-center">문제를 불러오지 못했습니다.</p>
        )}
      </Card>
      
      <p className="text-center text-xs text-slate-400 py-4 italic">
        "꾸준함은 모든 것을 이깁니다."
      </p>
    </div>
  );
};
