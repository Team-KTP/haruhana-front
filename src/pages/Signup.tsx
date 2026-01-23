import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { ErrorModal } from '../components/common/ErrorModal';
import { signup } from '../api/auth';
import { MemberCreateRequest } from '../types/auth';
import { Difficulty } from '../types/common';
import { DIFFICULTY_OPTIONS } from '../constants';
import { useCategories } from '../hooks/usePreference';
import { useErrorModal } from '../hooks/useErrorModal';
import { getErrorMessage } from '../utils/errorHandler';
import Loading from '../components/common/Loading';

export default function Signup() {
  // Step 1: Account info
  const [step, setStep] = useState<1 | 2>(1);
  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');

  // Step 2: Preference
  const [selectedCategoryTopicId, setSelectedCategoryTopicId] = useState<number | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty | null>(null);
  const [openCategoryId, setOpenCategoryId] = useState<number | null>(null);
  const [openGroupId, setOpenGroupId] = useState<number | null>(null);

  const navigate = useNavigate();
  const { categoryData, isLoading: categoriesLoading } = useCategories();
  const { modalState, showError, closeModal } = useErrorModal();

  const signupMutation = useMutation({
    mutationFn: (data: MemberCreateRequest) => signup(data),
    onSuccess: () => {
      // 회원가입 성공 시 로그인 페이지로 이동
      navigate('/login', { state: { message: '회원가입이 완료되었습니다. 로그인해주세요.' } });
    },
    onError: (err: unknown) => {
      console.error('Signup error:', err);
      showError(getErrorMessage(err));
    },
  });

  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!loginId.trim() || !password.trim() || !nickname.trim()) {
      showError('모든 필드를 입력해주세요.');
      return;
    }

    // API 스펙: 최소 8자, 영문 대소문자 및 숫자 포함
    if (password.length < 8) {
      showError('비밀번호는 최소 8자 이상이어야 합니다.');
      return;
    }

    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;
    if (!passwordPattern.test(password)) {
      showError('비밀번호는 영문 대소문자와 숫자를 포함해야 합니다.');
      return;
    }

    // 다음 단계로 이동
    setStep(2);
  };

  const handleStep2Submit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedCategoryTopicId || !selectedDifficulty) {
      showError('학습 주제와 난이도를 모두 선택해주세요.');
      return;
    }

    signupMutation.mutate({
      loginId,
      password,
      nickname,
      categoryTopicId: selectedCategoryTopicId,
      difficulty: selectedDifficulty,
    });
  };

  const toggleCategory = (categoryId: number) => {
    if (openCategoryId === categoryId) {
      setOpenCategoryId(null);
      setOpenGroupId(null);
    } else {
      setOpenCategoryId(categoryId);
      setOpenGroupId(null);
    }
  };

  const toggleGroup = (groupId: number) => {
    setOpenGroupId(openGroupId === groupId ? null : groupId);
  };

  const handleTopicSelect = (topicId: number) => {
    setSelectedCategoryTopicId(topicId);
  };

  // 선택된 토픽 정보 찾기
  const getSelectedTopicInfo = () => {
    if (!selectedCategoryTopicId || !categoryData) return null;

    for (const category of categoryData.categories) {
      for (const group of category.groups) {
        const topic = group.topics.find(t => t.id === selectedCategoryTopicId);
        if (topic) {
          return { category: category.name, group: group.name, topic: topic.name };
        }
      }
    }
    return null;
  };

  const selectedInfo = getSelectedTopicInfo();

  if (step === 2 && categoriesLoading) {
    return <Loading fullScreen message="카테고리를 불러오는 중..." />;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 via-haru-50/30 to-slate-50 px-4 sm:px-6 py-8">
      <div className="mb-6 sm:mb-8 lg:mb-10 text-center">
        <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-gradient-to-br from-haru-500 to-haru-600 rounded-3xl mx-auto flex items-center justify-center text-white text-3xl sm:text-4xl lg:text-5xl font-bold shadow-xl shadow-haru-200 mb-4 sm:mb-6">
          하
        </div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-800 mb-2">하루하루</h1>
        <p className="text-sm sm:text-base text-slate-500">
          {step === 1 ? '회원가입 - 계정 정보를 입력하세요' : '학습 설정 - 관심 주제를 선택하세요'}
        </p>
      </div>

      {/* Step 1: Account Info - 반응형 */}
      {step === 1 && (
        <Card className="w-full max-w-sm sm:max-w-md">
          <form onSubmit={handleStep1Submit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">아이디</label>
              <input
                type="text"
                required
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-haru-500 focus:ring-2 focus:ring-haru-200 outline-none transition-all"
                placeholder="아이디를 입력하세요"
                value={loginId}
                onChange={e => setLoginId(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">비밀번호</label>
              <input
                type="password"
                required
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-haru-500 focus:ring-2 focus:ring-haru-200 outline-none transition-all"
                placeholder="비밀번호 (최소 8자, 영문 대소문자+숫자)"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">닉네임</label>
              <input
                type="text"
                required
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-haru-500 focus:ring-2 focus:ring-haru-200 outline-none transition-all"
                placeholder="사용할 닉네임을 입력하세요"
                value={nickname}
                onChange={e => setNickname(e.target.value)}
              />
            </div>

            <Button type="submit" fullWidth size="lg">
              다음
            </Button>
          </form>

          <div className="mt-6 text-center">
            <Link to="/login" className="text-sm text-slate-500 hover:text-haru-600">
              이미 계정이 있으신가요? <span className="font-semibold">로그인</span>
            </Link>
          </div>
        </Card>
      )}

      {/* Step 2: Preference Setup */}
      {step === 2 && (
        <Card className="w-full max-w-3xl">
          <form onSubmit={handleStep2Submit} className="space-y-8">
            {/* 선택된 주제 표시 */}
            {selectedInfo && (
              <div className="p-4 bg-gradient-to-r from-haru-50 to-haru-100/50 border border-haru-200 rounded-xl">
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-haru-600 font-medium">✓ 선택됨:</span>
                  <span className="text-slate-700">
                    {selectedInfo.category} / {selectedInfo.group} / <strong>{selectedInfo.topic}</strong>
                  </span>
                </div>
              </div>
            )}

            {/* 학습 주제 선택 - 아코디언 */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-4">
                📚 학습 주제 선택
              </label>
              <div className="space-y-3">
                {categoryData?.categories.map((category) => (
                  <div
                    key={category.id}
                    className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow"
                  >
                    {/* 대분류 헤더 */}
                    <button
                      type="button"
                      onClick={() => toggleCategory(category.id)}
                      className="w-full px-5 py-4 flex items-center justify-between bg-gradient-to-r from-slate-50 to-white hover:from-slate-100 hover:to-slate-50 transition-colors"
                      disabled={signupMutation.isPending}
                    >
                      <span className="font-semibold text-slate-800 text-left">{category.name}</span>
                      <svg
                        className={`w-5 h-5 text-slate-400 transition-transform ${
                          openCategoryId === category.id ? 'rotate-180' : ''
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

                    {/* 중분류 목록 */}
                    {openCategoryId === category.id && (
                      <div className="border-t border-slate-100">
                        {category.groups.map((group) => (
                          <div key={group.id} className="border-b border-slate-50 last:border-b-0">
                            {/* 중분류 헤더 */}
                            <button
                              type="button"
                              onClick={() => toggleGroup(group.id)}
                              className="w-full px-5 py-3 flex items-center justify-between hover:bg-slate-50 transition-colors"
                              disabled={signupMutation.isPending}
                            >
                              <span className="text-sm font-medium text-slate-700 text-left">
                                {group.name}
                              </span>
                              <svg
                                className={`w-4 h-4 text-slate-400 transition-transform ${
                                  openGroupId === group.id ? 'rotate-180' : ''
                                }`}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                              </svg>
                            </button>

                            {/* 소분류 토픽 목록 */}
                            {openGroupId === group.id && (
                              <div className="px-5 py-3 bg-slate-50/50 grid grid-cols-2 md:grid-cols-3 gap-2">
                                {group.topics.map((topic) => (
                                  <button
                                    key={topic.id}
                                    type="button"
                                    onClick={() => handleTopicSelect(topic.id)}
                                    className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                                      selectedCategoryTopicId === topic.id
                                        ? 'bg-gradient-to-r from-haru-500 to-haru-600 text-white shadow-md shadow-haru-200'
                                        : 'bg-white text-slate-700 border border-slate-200 hover:border-haru-300 hover:bg-haru-50'
                                    }`}
                                    disabled={signupMutation.isPending}
                                  >
                                    {topic.name}
                                  </button>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* 난이도 선택 */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-4">
                🎯 난이도 선택
              </label>
              <div className="grid grid-cols-3 gap-3">
                {DIFFICULTY_OPTIONS.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setSelectedDifficulty(option.value)}
                    className={`p-5 rounded-xl border-2 transition-all text-center ${
                      selectedDifficulty === option.value
                        ? 'border-haru-500 bg-gradient-to-br from-haru-50 to-haru-100 shadow-lg shadow-haru-200'
                        : 'border-slate-200 bg-white hover:border-haru-300 hover:shadow-md'
                    }`}
                    disabled={signupMutation.isPending}
                  >
                    <div className="text-2xl mb-2">{option.icon}</div>
                    <div className={`font-bold mb-1 ${
                      selectedDifficulty === option.value ? 'text-haru-700' : 'text-slate-800'
                    }`}>
                      {option.label}
                    </div>
                    <div className="text-xs text-slate-500">{option.description}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                fullWidth
                size="lg"
                variant="outline"
                onClick={() => setStep(1)}
                disabled={signupMutation.isPending}
              >
                이전
              </Button>
              <Button
                type="submit"
                fullWidth
                size="lg"
                disabled={
                  !selectedCategoryTopicId || !selectedDifficulty || signupMutation.isPending
                }
              >
                {signupMutation.isPending ? '처리 중...' : '회원가입 완료'}
              </Button>
            </div>
          </form>
        </Card>
      )}

      <ErrorModal
        isOpen={modalState.isOpen}
        onClose={closeModal}
        title={modalState.title}
        message={modalState.message}
        type={modalState.type}
      />
    </div>
  );
}
