import React from 'react';

interface TodayProblemCardProps {
  title: string;
  description: string;
  tags?: string[];
  difficulty?: string;
  onShowAnswer?: () => void;
}

const TodayProblemCard: React.FC<TodayProblemCardProps> = ({
  title,
  description,
  tags = [],
  difficulty,
  onShowAnswer,
}) => {
  return (
    <div className="card w-full max-w-xl flex flex-col gap-4">
      <div className="flex gap-2 mb-1">
        {tags.map((tag) => (
          <span key={tag} className="badge badge-primary mr-1">{tag}</span>
        ))}
        {difficulty && <span className="badge badge-warning">난이도: {difficulty}</span>}
      </div>
      <div>
        <h2 className="text-xl font-bold mb-2">{title}</h2>
        <p className="text-gray-600 text-base leading-relaxed">{description}</p>
      </div>
      <button
        className="btn-primary w-full mt-2"
        onClick={onShowAnswer}
      >
        제출한 답변 보기
      </button>
    </div>
  );
};

export default TodayProblemCard;
