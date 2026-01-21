
import React, { useEffect, useState } from 'react';
import { Card } from '../components/Card';
import { storageService } from '../services/storageService';
import { Submission, Problem } from '../types';

interface HistoryProps {
  onSolve?: (problem: Problem) => void;
  onViewSubmission?: (problem: Problem) => void;
}

export const History: React.FC<HistoryProps> = ({ onSolve, onViewSubmission }) => {
  const [historyItems, setHistoryItems] = useState<{ problem: Problem, submission: Submission | null }[]>([]);
  const [currentDate, setCurrentDate] = useState(new Date()); 
  const [selectedDate, setSelectedDate] = useState<Date | null>(null); 

  useEffect(() => {
    const subs = storageService.getAllSubmissions();
    const problemsMap: Record<string, Problem> = JSON.parse(localStorage.getItem('haru_problems') || '{}');
    
    const combined = Object.values(problemsMap).map(prob => {
        const sub = subs.find(s => s.problemId === prob.id) || null;
        return { problem: prob, submission: sub };
    }).sort((a, b) => b.problem.problemAt.localeCompare(a.problem.problemAt));

    setHistoryItems(combined);
  }, []);

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    
    const days = [];
    for (let i = 0; i < firstDayOfMonth; i++) days.push(null);
    for (let i = 1; i <= daysInMonth; i++) days.push(new Date(year, month, i));
    return days;
  };

  const days = getDaysInMonth(currentDate);

  const getStatusForDate = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    return historyItems.find(h => h.problem.problemAt === dateStr);
  };

  const filteredHistory = historyItems.filter(item => {
    if (!selectedDate) return true;
    const filterDateStr = selectedDate.toISOString().split('T')[0];
    return item.problem.problemAt === filterDateStr;
  });

  const handleDateClick = (date: Date) => {
    if (selectedDate && date.toDateString() === selectedDate.toDateString()) {
        setSelectedDate(null);
    } else {
        setSelectedDate(date);
    }
  };

  const handleItemClick = (item: { problem: Problem, submission: Submission | null }) => {
    if (item.submission) {
        onViewSubmission?.(item.problem);
    } else {
        onSolve?.(item.problem);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] animate-fade-in">
      <div className="shrink-0 mb-6">
        <h2 className="text-2xl font-bold text-slate-800">나의 기록</h2>
        <p className="text-sm text-slate-500 mt-1">할당된 모든 문제와 풀이 현황입니다.</p>
      </div>
      
      <Card className="shrink-0 mb-6 !p-4">
          <div className="flex justify-between items-center mb-4">
              <button onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))} className="p-1 text-slate-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
              </button>
              <h3 className="font-bold text-slate-700">
                  {currentDate.getFullYear()}년 {currentDate.getMonth() + 1}월
              </h3>
              <button onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))} className="p-1 text-slate-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </button>
          </div>
          
          <div className="grid grid-cols-7 gap-1 text-center mb-1">
             {['일', '월', '화', '수', '목', '금', '토'].map(d => (
                 <div key={d} className="text-[10px] font-bold text-slate-300 py-1 uppercase">{d}</div>
             ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
              {days.map((date, idx) => {
                  if (!date) return <div key={`empty-${idx}`}></div>;
                  
                  const historyItem = getStatusForDate(date);
                  const isSelected = selectedDate && date.toDateString() === selectedDate.toDateString();
                  const isSolved = !!historyItem?.submission;
                  
                  return (
                      <button 
                        key={date.toISOString()} 
                        onClick={() => handleDateClick(date)}
                        className={`aspect-square rounded-lg flex flex-col items-center justify-center text-xs transition-all
                            ${isSelected ? 'bg-haru-500 text-white' : 'hover:bg-slate-50 text-slate-600'}
                            ${historyItem && !isSelected ? (isSolved ? 'font-bold text-haru-600' : 'text-slate-400') : ''}
                        `}
                      >
                          {date.getDate()}
                          {historyItem && !isSelected && (
                              <div className={`w-1 h-1 rounded-full mt-0.5 ${isSolved ? 'bg-haru-500' : 'bg-slate-200'}`}></div>
                          )}
                      </button>
                  );
              })}
          </div>
      </Card>

      <div className="flex-1 min-h-0 flex flex-col">
        <div className="flex items-center justify-between mb-3 shrink-0">
            <h3 className="font-bold text-slate-800 text-sm">
                {selectedDate ? `${selectedDate.toLocaleDateString()} 문제` : '전체 내역'}
            </h3>
            {selectedDate && (
                 <button onClick={() => setSelectedDate(null)} className="text-xs text-haru-600 font-medium">전체 보기</button>
            )}
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar pr-1 pb-10">
          {filteredHistory.length === 0 ? (
              <div className="text-center py-10 text-slate-400 bg-white rounded-xl border border-slate-100">
                  <p className="text-xs">기록이 없습니다.</p>
              </div>
          ) : (
              <div className="space-y-3">
                  {filteredHistory.map((item) => (
                      <div 
                          key={item.problem.id} 
                          className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex flex-col gap-2 cursor-pointer hover:border-haru-200 transition-all active:scale-[0.98]"
                          onClick={() => handleItemClick(item)}
                      >
                          <div className="flex justify-between items-start">
                              <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-2 mb-1">
                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">
                                        {item.problem.problemAt}
                                    </span>
                                    {item.submission ? (
                                        <span className="px-1.5 py-0.5 bg-haru-50 text-haru-600 text-[9px] font-bold rounded">성공</span>
                                    ) : (
                                        <span className="px-1.5 py-0.5 bg-slate-100 text-slate-400 text-[9px] font-bold rounded">미완료</span>
                                    )}
                                  </div>
                                  <h3 className="font-bold text-slate-800 text-sm truncate">{item.problem.title}</h3>
                              </div>
                              <svg className="w-4 h-4 text-slate-300 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                          </div>
                      </div>
                  ))}
              </div>
          )}
        </div>
      </div>
    </div>
  );
};
