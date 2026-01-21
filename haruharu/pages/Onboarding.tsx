import React, { useState } from 'react';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { storageService } from '../services/storageService';
import { TOPICS, DIFFICULTIES } from '../constants';
import { Difficulty, User } from '../types';

interface OnboardingProps {
  user: User;
  onComplete: () => void;
}

export const Onboarding: React.FC<OnboardingProps> = ({ user, onComplete }) => {
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty | null>(null);
  const [selectedTopicId, setSelectedTopicId] = useState<string | null>(null);

  const handleSubmit = () => {
    if (selectedDifficulty && selectedTopicId) {
      storageService.setPreference(selectedDifficulty, selectedTopicId);
      onComplete();
    }
  };

  return (
    <div className="py-6">
      <h2 className="text-2xl font-bold text-slate-800 mb-2">환영합니다, {user.nickname}님!</h2>
      <p className="text-slate-500 mb-8">매일의 학습 습관을 설정해볼까요? 설정은 언제든 변경할 수 있습니다.</p>

      <section className="mb-8">
        <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-4">난이도 선택</h3>
        <div className="grid gap-3">
          {DIFFICULTIES.map((diff) => (
            <div 
              key={diff.value}
              onClick={() => setSelectedDifficulty(diff.value)}
              className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                selectedDifficulty === diff.value 
                  ? 'border-haru-500 bg-haru-50' 
                  : 'border-white bg-white hover:border-slate-200'
              }`}
            >
              <div className="font-bold text-slate-800">{diff.label.split('(')[0]}</div>
              <div className="text-sm text-slate-500">{diff.label.split('(')[1].replace(')', '')}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-10">
        <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-4">주제 선택</h3>
        <div className="grid grid-cols-2 gap-3">
          {TOPICS.map((topic) => (
            <button
              key={topic.id}
              onClick={() => setSelectedTopicId(topic.id)}
              className={`p-3 rounded-xl border-2 text-sm font-medium transition-all text-left ${
                selectedTopicId === topic.id
                  ? 'border-haru-500 bg-haru-50 text-haru-700'
                  : 'border-white bg-white text-slate-600 hover:border-slate-200'
              }`}
            >
              {topic.name}
            </button>
          ))}
        </div>
      </section>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-slate-100 max-w-md mx-auto">
        <Button 
          fullWidth 
          size="lg" 
          disabled={!selectedDifficulty || !selectedTopicId}
          onClick={handleSubmit}
        >
          설정 완료
        </Button>
      </div>
    </div>
  );
};