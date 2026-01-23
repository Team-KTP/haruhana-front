import React, { useState } from 'react';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Layout } from '../components/common/Layout';
import { ErrorModal } from '../components/common/ErrorModal';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { useCategories, useUpdatePreference } from '../hooks/usePreference';
import { useErrorModal } from '../hooks/useErrorModal';
import { Difficulty } from '../types/common';
import { DIFFICULTY_LABELS, DIFFICULTY_OPTIONS } from '../constants';
import { formatJoinDate } from '../utils/dateUtils';
import { getErrorMessage } from '../utils/errorHandler';
import Loading from '../components/common/Loading';

// TODO: 실제 사용자 정보와 선호도는 props/context/API로 연동
const mockUser = {
  nickname: '홍길동',
};
const mockPref = {
  difficulty: '보통',
  topicName: '알고리즘',
};

const MyPage: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [selectedCategoryTopicId, setSelectedCategoryTopicId] = useState<number | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty | null>(null);
  const [openCategoryId, setOpenCategoryId] = useState<number | null>(null);
  const [openGroupId, setOpenGroupId] = useState<number | null>(null);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [editedNickname, setEditedNickname] = useState('');

  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { categoryData, isLoading: categoriesLoading } = useCategories();
  const { update, isUpdating } = useUpdatePreference();
  const { modalState, showError, closeModal } = useErrorModal();

  const handleNavigate = (path: string) => {
    const routes: Record<string, string> = { dashboard: '/', history: '/records', profile: '/mypage' };
    navigate(routes[path] || '/');
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

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleStartEditProfile = () => {
    setEditedNickname(user?.nickname || '');
    setIsEditingProfile(true);
  };

  const handleSaveProfile = () => {
    // TODO: API 연동하여 프로필 업데이트
    if (editedNickname.trim()) {
      console.log('Save profile:', { nickname: editedNickname, profileImage });
      setIsEditingProfile(false);
    }
  };

  const handleCancelEditProfile = () => {
    setEditedNickname('');
    setProfileImage(null);
    setIsEditingProfile(false);
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

  const selectedTopicInfo = getSelectedTopicInfo();

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedCategoryTopicId || !selectedDifficulty) {
      showError('학습 주제와 난이도를 모두 선택해주세요.');
      return;
    }

    update(
      {
        categoryTopicId: selectedCategoryTopicId,
        difficulty: selectedDifficulty,
      },
      {
        onSuccess: () => {
          setIsEditing(false);
        },
        onError: (err) => {
          console.error('Preference update error:', err);
          showError(getErrorMessage(err));
        },
      }
    );
  };

  if (isEditing && categoriesLoading) {
    return (
      <Layout user={user} activeTab="profile" onNavigate={handleNavigate} onLogout={logout}>
        <Loading fullScreen message="카테고리를 불러오는 중..." />
      </Layout>
    );
  }

  const content = isEditing ? (
    <div className="space-y-5 sm:space-y-7 animate-fade-in max-w-3xl mx-auto py-6 sm:py-10 px-4 pb-32 min-w-0">
      {/* 헤더 */}
      <div className="flex items-center gap-3 animate-slide-in-left">
        <button
          onClick={() => setIsEditing(false)}
          className="p-2 -ml-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all active:scale-95"
        >
          <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-800">학습 설정 변경</h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">어떤 주제를 학습하고 싶으신가요?</p>
        </div>
      </div>

      <Card className="shadow-card hover:shadow-card-hover transition-all min-w-0">
        <form onSubmit={handleSaveSettings} className="space-y-8 min-w-0">
          {/* 학습 주제 선택 - 아코디언 */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-4 min-w-0">
              📚 학습 주제 선택
              {selectedTopicInfo && (
                <span className="ml-2 text-xs font-normal text-haru-600 break-words">
                  · {selectedTopicInfo.category} / {selectedTopicInfo.group} / <strong>{selectedTopicInfo.topic}</strong>
                </span>
              )}
            </label>
            <div className="space-y-3 min-w-0">
              {categoryData?.categories.map((category) => (
                <div
                  key={category.id}
                  className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow min-w-0"
                >
                  {/* 대분류 헤더 */}
                  <button
                    type="button"
                    onClick={() => toggleCategory(category.id)}
                    className="w-full px-5 py-4 flex items-center justify-between bg-gradient-to-r from-slate-50 to-white hover:from-slate-100 hover:to-slate-50 transition-colors min-w-0"
                    disabled={isUpdating}
                  >
                    <span className="font-semibold text-slate-800 text-left truncate">{category.name}</span>
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
                            disabled={isUpdating}
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
                                  disabled={isUpdating}
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
          <div className="min-w-0">
            <label className="block text-sm font-semibold text-slate-700 mb-4 min-w-0">
              🎯 난이도 선택
              {selectedDifficulty && (
                <span className="ml-2 text-xs font-normal text-haru-600">
                  · <strong>{DIFFICULTY_OPTIONS.find(d => d.value === selectedDifficulty)?.label}</strong>
                </span>
              )}
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
                  disabled={isUpdating}
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

          {/* 버튼 */}
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              fullWidth
              size="lg"
              variant="outline"
              onClick={() => setIsEditing(false)}
              disabled={isUpdating}
            >
              취소
            </Button>
            <Button
              type="submit"
              fullWidth
              size="lg"
              disabled={!selectedCategoryTopicId || !selectedDifficulty || isUpdating}
              className="shadow-premium hover:shadow-premium-lg"
            >
              {isUpdating ? '설정 중...' : '설정 저장'}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  ) : (
    <div className="space-y-4 sm:space-y-6 max-w-xl mx-auto py-4 sm:py-8 min-w-0">
      {/* 프로필 헤더 - 프리미엄 디자인 */}
      <div className="animate-slide-in-up min-w-0">
        <div className="relative overflow-hidden bg-gradient-to-br from-haru-500 via-haru-600 to-haru-700 rounded-xl sm:rounded-2xl shadow-premium-lg min-w-0">
          {/* 배경 패턴 */}
          <div className="absolute inset-0 opacity-10 overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 sm:w-48 sm:h-48 bg-white rounded-full -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 sm:w-32 sm:h-32 bg-white rounded-full translate-y-1/2 -translate-x-1/2"></div>
          </div>

          <div className="relative px-4 sm:px-6 py-4 sm:py-6 min-w-0">
            {/* 수정 버튼 - 우측 상단 고정 */}
            {!isEditingProfile && (
              <button
                onClick={handleStartEditProfile}
                className="absolute top-3 right-3 sm:top-4 sm:right-4 p-1.5 sm:p-2 rounded-lg bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 transition-all group z-10"
                title="프로필 수정"
              >
                <svg className="w-4 h-4 text-white/80 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
              </button>
            )}

            {isEditingProfile ? (
              // 프로필 수정 모드
              <div className="space-y-3 sm:space-y-4 min-w-0">
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse-glow"></div>
                    <p className="text-haru-100 text-xs font-semibold tracking-wide uppercase">프로필 수정</p>
                  </div>
                  <button
                    onClick={handleCancelEditProfile}
                    className="p-1.5 rounded-lg hover:bg-white/10 text-white/80 hover:text-white transition-all"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* 프로필 이미지 + 닉네임 입력 (항상 가로 배치) */}
                <div className="flex items-start gap-3 sm:gap-4">
                  {/* 프로필 이미지 업로드 */}
                  <div className="relative group flex-shrink-0">
                    <input
                      type="file"
                      id="profile-image-upload-edit"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    <label
                      htmlFor="profile-image-upload-edit"
                      className="block w-16 h-16 sm:w-20 sm:h-20 rounded-xl cursor-pointer overflow-hidden border-2 border-white/30 shadow-lg transition-all hover:border-white/50"
                    >
                      {profileImage ? (
                        <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white text-xl sm:text-2xl font-bold">
                          {(editedNickname || user?.nickname || mockUser.nickname)[0]}
                        </div>
                      )}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                    </label>
                  </div>

                  {/* 닉네임 입력 */}
                  <div className="flex-1 min-w-0">
                    <label className="block text-white/80 text-xs sm:text-sm font-medium mb-1.5">닉네임</label>
                    <input
                      type="text"
                      value={editedNickname}
                      onChange={(e) => setEditedNickname(e.target.value)}
                      className="w-full px-3 py-2.5 sm:px-4 sm:py-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm sm:text-base placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/40 transition-all"
                      placeholder="닉네임 입력"
                      autoFocus
                    />
                  </div>
                </div>

                {/* 저장 버튼 */}
                <div className="flex gap-2 pt-1">
                  <button
                    onClick={handleCancelEditProfile}
                    className="flex-1 px-3 py-2.5 sm:py-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm font-medium hover:bg-white/20 active:scale-[0.98] transition-all"
                  >
                    취소
                  </button>
                  <button
                    onClick={handleSaveProfile}
                    disabled={!editedNickname.trim()}
                    className="flex-1 px-3 py-2.5 sm:py-3 rounded-xl bg-white text-haru-600 text-sm font-bold hover:bg-white/90 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    저장
                  </button>
                </div>
              </div>
            ) : (
              // 일반 표시 모드
              <div className="pr-10 sm:pr-12">
                <div className="flex items-start gap-3 sm:gap-4">
                  {/* 프로필 이미지 */}
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden border-2 border-white/30 shadow-lg">
                      {profileImage ? (
                        <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white text-xl sm:text-2xl font-bold">
                          {(user?.nickname || mockUser.nickname)[0]}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* 텍스트 정보 */}
                  <div className="flex-1 min-w-0">
                    <div className="inline-flex items-center gap-1.5 mb-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse-glow"></div>
                      <p className="text-haru-100 text-[10px] sm:text-xs font-semibold tracking-wide uppercase">학습자 프로필</p>
                    </div>
                    <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-0.5 truncate">
                      {user?.nickname || mockUser.nickname}님
                    </h2>

                    {user?.createdAt && (
                      <div className="inline-flex items-center gap-1.5 text-white/70">
                        <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span className="text-[10px] sm:text-xs font-medium">{formatJoinDate(user.createdAt)} 가입</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 현재 학습 설정 */}
      <div className="animate-slide-in-up delay-100">
        <Card className="shadow-card hover:shadow-card-hover transition-all duration-300 !p-0 overflow-hidden">
          <div className="px-5 sm:px-7 pt-5 sm:pt-6 pb-3">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-1 h-6 bg-gradient-to-b from-haru-500 to-haru-600 rounded-full"></div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-800">현재 학습 설정</h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 ml-3">나의 학습 환경을 확인하세요</p>
          </div>

          <div className="px-5 sm:px-7 pb-5 sm:pb-7">
            <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-5">
              <div className="bg-gradient-to-br from-slate-50 to-slate-100/50 p-4 sm:p-5 rounded-xl sm:rounded-2xl border border-slate-200">
                <div className="flex items-center gap-1.5 mb-2">
                  <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <p className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-wide">난이도</p>
                </div>
                <p className="font-bold text-base sm:text-lg text-slate-800">{user?.difficulty ? DIFFICULTY_LABELS[user.difficulty] : mockPref.difficulty}</p>
              </div>
              <div className="bg-gradient-to-br from-slate-50 to-slate-100/50 p-4 sm:p-5 rounded-xl sm:rounded-2xl border border-slate-200">
                <div className="flex items-center gap-1.5 mb-2">
                  <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-haru-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                  <p className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-wide">주제</p>
                </div>
                <p className="font-bold text-base sm:text-lg text-slate-800 truncate">{user?.categoryTopicName || mockPref.topicName}</p>
              </div>
            </div>
            <Button
              fullWidth
              variant="outline"
              size="lg"
              onClick={() => setIsEditing(true)}
              className="border-2 border-haru-200 hover:border-haru-300 hover:bg-haru-50 text-haru-700 font-semibold"
            >
              <span className="flex items-center justify-center gap-2">
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                설정 변경하기
              </span>
            </Button>
          </div>
        </Card>
      </div>

      {/* 시스템 섹션 */}
      <div className="space-y-3 animate-slide-in-up delay-200">
        <div className="flex items-center gap-2 px-1">
          <svg className="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
          </svg>
          <h3 className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-widest">시스템</h3>
        </div>
        <Card className="!p-0 border-slate-200 shadow-card hover:shadow-card-hover transition-all">
          <button
            onClick={logout}
            className="w-full px-5 sm:px-6 py-4 sm:py-5 flex items-center justify-between hover:bg-slate-50 transition-all active:scale-[0.99] group"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center group-hover:bg-red-100 transition-colors">
                <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </div>
              <span className="text-sm sm:text-base font-semibold text-slate-700 group-hover:text-slate-900 transition-colors">계정 로그아웃</span>
            </div>
            <svg className="w-5 h-5 text-slate-300 group-hover:text-slate-400 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </Card>
      </div>

      {/* 버전 정보 */}
      <div className="text-center pt-6 sm:pt-10 animate-fade-in delay-300">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-full border border-slate-100">
          <svg className="w-3 h-3 text-slate-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          <p className="text-[10px] sm:text-xs text-slate-400 font-bold tracking-wider uppercase">HaruHaru v1.0.0</p>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <Layout user={user} activeTab="profile" onNavigate={handleNavigate} onLogout={logout}>
        {content}
      </Layout>
      <ErrorModal
        isOpen={modalState.isOpen}
        onClose={closeModal}
        title={modalState.title}
        message={modalState.message}
        type={modalState.type}
      />
    </>
  );
};

export default MyPage;
