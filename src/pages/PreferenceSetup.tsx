import { useState } from 'react';
import { AxiosError } from 'axios';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { useAuth } from '../hooks/useAuth';
import { useCategories, useRegisterPreference } from '../hooks/usePreference';
import { Difficulty } from '../types/common';
import Loading from '../components/common/Loading';

const difficultyOptions: { value: Difficulty; label: string; description: string }[] = [
  { value: 'EASY', label: '쉬움', description: '기본 개념 위주' },
  { value: 'MEDIUM', label: '보통', description: '실무 응용 수준' },
  { value: 'HARD', label: '어려움', description: '심화 문제' },
];

export default function PreferenceSetup() {
  const { user } = useAuth();
  const { categories, isLoading: categoriesLoading } = useCategories();
  const { register, isRegistering, error } = useRegisterPreference();

  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!selectedCategoryId || !selectedDifficulty) {
      setErrorMessage('학습 주제와 난이도를 모두 선택해주세요.');
      return;
    }

    register(
      {
        categoryTopicId: selectedCategoryId,
        difficulty: selectedDifficulty,
      },
      {
        onError: (err) => {
          console.error('Preference registration error:', err);
          if (err instanceof AxiosError) {
            setErrorMessage(err.response?.data?.error?.message || '학습 설정 중 오류가 발생했습니다.');
          } else {
            setErrorMessage('학습 설정 중 오류가 발생했습니다.');
          }
        },
      }
    );
  };

  if (categoriesLoading) {
    return <Loading fullScreen message="카테고리를 불러오는 중..." />;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 px-4">
      <div className="mb-8 text-center">
        <div className="w-20 h-20 bg-haru-500 rounded-3xl mx-auto flex items-center justify-center text-white text-4xl font-bold shadow-xl shadow-haru-200 mb-6">
          하
        </div>
        <h1 className="text-3xl font-bold text-slate-800 mb-2">학습 설정</h1>
        <p className="text-slate-500">
          {user?.nickname}님, 어떤 주제를 학습하고 싶으신가요?
        </p>
      </div>

      <Card className="w-full max-w-2xl">
        <form onSubmit={handleSubmit} className="space-y-8">
          {(errorMessage || error) && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
              {errorMessage || '오류가 발생했습니다.'}
            </div>
          )}

          {/* 학습 주제 선택 */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-3">
              학습 주제 선택
            </label>
            <div className="grid grid-cols-2 gap-3">
              {categories?.map((category) => (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => setSelectedCategoryId(category.id)}
                  className={`p-4 rounded-xl border-2 transition-all text-left ${
                    selectedCategoryId === category.id
                      ? 'border-haru-500 bg-haru-50 shadow-md'
                      : 'border-slate-200 bg-white hover:border-haru-300'
                  }`}
                  disabled={isRegistering}
                >
                  <div className="font-semibold text-slate-800">{category.name}</div>
                  {category.description && (
                    <div className="text-xs text-slate-500 mt-1">{category.description}</div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* 난이도 선택 */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-3">
              난이도 선택
            </label>
            <div className="grid grid-cols-3 gap-3">
              {difficultyOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setSelectedDifficulty(option.value)}
                  className={`p-4 rounded-xl border-2 transition-all text-center ${
                    selectedDifficulty === option.value
                      ? 'border-haru-500 bg-haru-50 shadow-md'
                      : 'border-slate-200 bg-white hover:border-haru-300'
                  }`}
                  disabled={isRegistering}
                >
                  <div className="font-semibold text-slate-800">{option.label}</div>
                  <div className="text-xs text-slate-500 mt-1">{option.description}</div>
                </button>
              ))}
            </div>
          </div>

          <Button
            type="submit"
            fullWidth
            size="lg"
            disabled={!selectedCategoryId || !selectedDifficulty || isRegistering}
          >
            {isRegistering ? '설정 중...' : '학습 시작하기'}
          </Button>
        </form>
      </Card>
    </div>
  );
}
