import React from 'react';

interface StudyStreakCardProps {
  streak: number;
  best: number;
  lastDate: string;
}

const StudyStreakCard: React.FC<StudyStreakCardProps> = ({ streak, best, lastDate }) => {
  return (
    <div className="card-lg w-full max-w-md bg-gradient-primary text-white relative overflow-hidden shadow-xl animate-fade-in">
      <div className="flex flex-col gap-2">
        <span className="text-lg font-medium">연속 학습 기록</span>
        <div className="flex items-center gap-3 mt-2 mb-1">
          <span className="text-5xl font-extrabold drop-shadow-lg">{streak}일</span>
          <span className="text-3xl ml-2">🔥</span>
        </div>
        <div className="flex justify-between text-sm opacity-90">
          <span>최고 기록: <b>{best}일</b></span>
          <span>마지막 학습: {lastDate}</span>
        </div>
      </div>
    </div>
  );
};

export default StudyStreakCard;
