import React, { useState } from 'react';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Layout } from '../components/common/Layout';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

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
  const [tempDiff, setTempDiff] = useState(mockPref.difficulty);
  const [tempTopic, setTempTopic] = useState(mockPref.topicName);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleNavigate = (path: string) => {
    const routes = { dashboard: '/', history: '/records', profile: '/mypage' };
    navigate(routes[path] || '/');
  };

  const handleSaveSettings = () => {
    setIsEditing(false);
  };

  const content = isEditing ? (
    <div className="space-y-6 animate-fade-in max-w-xl mx-auto py-10 px-4">
      <div className="flex items-center gap-2">
        <button 
          onClick={() => setIsEditing(false)} 
          className="p-2 -ml-2 text-slate-400 hover:text-slate-600 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h2 className="text-xl font-bold text-slate-800">학습 설정 변경</h2>
      </div>
      <section className="space-y-3">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">난이도</h3>
        <div className="grid gap-2">
          {['쉬움', '보통', '어려움'].map((d) => (
            <div 
              key={d} 
              onClick={() => setTempDiff(d)}
              className={`p-4 rounded-xl border-2 transition-all cursor-pointer ${
                tempDiff === d 
                  ? 'border-haru-500 bg-haru-50' 
                  : 'border-white bg-white hover:border-slate-100'
              }`}
            >
              <div className={`font-bold ${tempDiff === d ? 'text-haru-700' : 'text-slate-700'}`}>{d}</div>
            </div>
          ))}
        </div>
      </section>
      <section className="space-y-3">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">학습 주제</h3>
        <div className="grid grid-cols-2 gap-2">
          {['알고리즘', '자료구조', '수학', 'CS'].map((t) => (
            <button 
              key={t} 
              onClick={() => setTempTopic(t)}
              className={`p-3 rounded-xl border-2 text-sm font-medium transition-all ${
                tempTopic === t 
                  ? 'border-haru-500 bg-haru-50 text-haru-700' 
                  : 'border-white bg-white text-slate-600 hover:border-slate-100'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </section>
      <div className="pt-4 space-y-3">
        <Button fullWidth size="lg" onClick={handleSaveSettings}>
          설정 저장
        </Button>
        <Button fullWidth variant="ghost" onClick={() => setIsEditing(false)}>
          취소
        </Button>
      </div>
    </div>
  ) : (
    <div className="space-y-6 animate-fade-in max-w-xl mx-auto py-10 px-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">{mockUser.nickname}님</h2>
          <p className="text-slate-400 text-sm">꾸준함이 실력이 됩니다.</p>
        </div>
        <div className="w-12 h-12 rounded-xl bg-haru-100 flex items-center justify-center text-haru-600 text-xl font-bold">
          {mockUser.nickname[0]}
        </div>
      </div>
      <Card title="현재 학습 설정">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">난이도</p>
              <p className="font-semibold text-slate-700">{mockPref.difficulty}</p>
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">주제</p>
              <p className="font-semibold text-slate-700 truncate">{mockPref.topicName}</p>
            </div>
          </div>
          <Button fullWidth variant="outline" size="sm" onClick={() => setIsEditing(true)}>
            설정 변경하기
          </Button>
        </div>
      </Card>
      <div className="space-y-2">
        <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">시스템</h3>
        <Card className="!p-0 border-slate-100">
          <button 
            onClick={() => alert('로그아웃 기능 연결 필요!')}
            className="w-full px-6 py-4 flex items-center justify-between hover:bg-slate-50 transition-colors"
          >
            <span className="text-sm font-medium text-slate-600">계정 로그아웃</span>
            <svg className="w-4 h-4 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7" />
            </svg>
          </button>
        </Card>
      </div>
      <div className="text-center pt-10">
        <p className="text-[10px] text-slate-300 font-bold tracking-widest uppercase">HaruHaru v1.0.0</p>
      </div>
    </div>
  );

  return (
    <Layout user={user} activeTab="profile" onNavigate={handleNavigate} onLogout={logout}>
      {content}
    </Layout>
  );
};

export default MyPage;
