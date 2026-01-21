
import React, { useState, useEffect } from 'react';
import { Layout } from './components/Layout';
import { Login } from './pages/Login';
import { Onboarding } from './pages/Onboarding';
import { Dashboard } from './pages/Dashboard';
import { ProblemSolve } from './pages/ProblemSolve';
import { History } from './pages/History';
import { storageService } from './services/storageService';
import { User, UserRole, Problem, Submission } from './types';
import { Button } from './components/Button';
import { Card } from './components/Card';
import { TOPICS, DIFFICULTIES } from './constants';

// Simple Router Hook for Hash Routing
const useHashRoute = () => {
  const [route, setRoute] = useState(window.location.hash.replace('#', '') || 'login');
  
  useEffect(() => {
    const handler = () => setRoute(window.location.hash.replace('#', '') || 'login');
    window.addEventListener('hashchange', handler);
    return () => window.removeEventListener('hashchange', handler);
  }, []);

  const navigate = (path: string) => {
    window.location.hash = path;
  };

  return { route, navigate };
};

const App: React.FC = () => {
  const { route, navigate } = useHashRoute();
  const [user, setUser] = useState<User | null>(null);
  
  // State for passing data
  const [activeProblem, setActiveProblem] = useState<Problem | null>(null);
  const [activeSubmission, setActiveSubmission] = useState<Submission | null>(null);
  
  // Settings Mode state
  const [isEditingSettings, setIsEditingSettings] = useState(false);
  const [tempDiff, setTempDiff] = useState<string | null>(null);
  const [tempTopic, setTempTopic] = useState<string | null>(null);

  useEffect(() => {
    // Inject Mock Data if first time
    storageService.initializeMockData();

    const currentUser = storageService.getUser();
    if (currentUser) {
      setUser(currentUser);
      if (route === 'login') {
         navigate(currentUser.role === UserRole.GUEST ? 'onboarding' : 'dashboard');
      }
    } else {
      navigate('login');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogin = (newUser: User) => {
    setUser(newUser);
    navigate(newUser.role === UserRole.GUEST ? 'onboarding' : 'dashboard');
  };

  const handleLogout = () => {
    storageService.clear();
    setUser(null);
    navigate('login');
  };

  const handleOnboardingComplete = () => {
    const updated = storageService.getUser();
    setUser(updated);
    navigate('dashboard');
  };

  const handleSolve = (problem: Problem) => {
    setActiveProblem(problem);
    setActiveSubmission(null);
    navigate('solve');
  };

  const handleViewSubmission = (problem: Problem) => {
    const sub = storageService.getSubmissionForProblem(problem.id);
    setActiveProblem(problem);
    setActiveSubmission(sub);
    navigate('solve');
  };

  // Profile & Settings
  const renderProfile = () => {
    const currentPref = storageService.getPreference();

    if (isEditingSettings) {
      return (
        <div className="space-y-6">
          <div className="flex items-center gap-2 mb-4">
             <button onClick={() => setIsEditingSettings(false)} className="text-slate-500">←</button>
             <h2 className="text-2xl font-bold text-slate-800">설정 변경</h2>
          </div>
          
          <section>
            <h3 className="text-sm font-semibold text-slate-900 mb-3">난이도</h3>
            <div className="grid gap-2">
               {DIFFICULTIES.map(d => (
                 <div 
                   key={d.value} 
                   onClick={() => setTempDiff(d.value)}
                   className={`p-3 rounded-xl border-2 cursor-pointer ${tempDiff === d.value ? 'border-haru-500 bg-haru-50 text-haru-700' : 'border-slate-100 bg-white'}`}
                 >
                   {d.label}
                 </div>
               ))}
            </div>
          </section>

          <section>
            <h3 className="text-sm font-semibold text-slate-900 mb-3">주제</h3>
            <div className="grid grid-cols-2 gap-2">
               {TOPICS.map(t => (
                 <div 
                   key={t.id} 
                   onClick={() => setTempTopic(t.id)}
                   className={`p-3 rounded-xl border-2 cursor-pointer text-sm ${tempTopic === t.id ? 'border-haru-500 bg-haru-50 text-haru-700' : 'border-slate-100 bg-white'}`}
                 >
                   {t.name}
                 </div>
               ))}
            </div>
          </section>

          <Button fullWidth onClick={() => {
             if(tempDiff && tempTopic) {
                // @ts-ignore
                storageService.setPreference(tempDiff, tempTopic);
                setIsEditingSettings(false);
             }
          }}>
            변경사항 저장 (내일부터 적용)
          </Button>
        </div>
      );
    }

    return (
      <div className="py-6 space-y-6">
          <h2 className="text-2xl font-bold text-slate-800">{user?.nickname}님</h2>
          
          <Card className="bg-white">
               <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-full bg-haru-100 text-haru-600 flex items-center justify-center text-2xl font-bold">
                    {user?.nickname[0]}
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">가입일</p>
                    <p className="font-medium text-slate-800">{new Date().toLocaleDateString()}</p>
                  </div>
               </div>

               <div className="border-t border-slate-100 pt-4">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-slate-800">현재 학습 설정</h3>
                    <button 
                      onClick={() => {
                        setTempDiff(currentPref?.difficulty || null);
                        setTempTopic(currentPref?.topicId || null);
                        setIsEditingSettings(true);
                      }}
                      className="text-sm text-haru-600 font-medium"
                    >
                      변경하기
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-slate-50 p-3 rounded-xl">
                      <p className="text-xs text-slate-400 mb-1">난이도</p>
                      <p className="font-semibold text-slate-700">{currentPref?.difficulty}</p>
                    </div>
                    <div className="bg-slate-50 p-3 rounded-xl">
                      <p className="text-xs text-slate-400 mb-1">주제</p>
                      <p className="font-semibold text-slate-700">{currentPref?.topicName}</p>
                    </div>
                  </div>
                  <p className="text-xs text-slate-400 mt-3 text-center">
                    * 설정 변경은 다음날 자정(00:00)부터 적용됩니다.
                  </p>
               </div>
          </Card>
          
          <Button fullWidth variant="ghost" onClick={handleLogout} className="text-red-500 hover:bg-red-50 hover:text-red-600">
             로그아웃
          </Button>
      </div>
    );
  };

  const renderContent = () => {
    if (!user && route !== 'login') return null;

    switch (route) {
      case 'login':
        return <Login onLogin={handleLogin} />;
      case 'onboarding':
        return user ? <Onboarding user={user} onComplete={handleOnboardingComplete} /> : null;
      case 'dashboard':
        return <Dashboard onSolve={handleSolve} onViewSubmission={handleViewSubmission} />;
      case 'solve':
        return activeProblem ? (
          <ProblemSolve 
            problem={activeProblem} 
            onBack={() => navigate('dashboard')} 
            existingSubmission={activeSubmission}
          />
        ) : (
          <div onClick={() => navigate('dashboard')}>문제를 찾을 수 없습니다.</div>
        );
      case 'history':
        return <History onSolve={handleSolve} onViewSubmission={handleViewSubmission} />;
      case 'profile':
        return renderProfile();
      default:
        return <Login onLogin={handleLogin} />;
    }
  };

  const isAuthPage = route === 'login' || route === 'onboarding';

  return (
    <Layout 
      user={!isAuthPage ? user : null} 
      activeTab={route}
      onNavigate={!isAuthPage ? navigate : undefined}
      onLogout={handleLogout}
    >
      {renderContent()}
    </Layout>
  );
};

export default App;
