import { Routes, Route, Navigate } from 'react-router-dom';

// 임시 컴포넌트 (나중에 실제 페이지로 교체)
const TempPage = ({ title }: { title: string }) => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="text-center">
      <h1 className="text-4xl font-bold text-primary-600 mb-4">{title}</h1>
      <p className="text-gray-600">HaruHaru 프론트엔드 프로젝트가 초기화되었습니다.</p>
    </div>
  </div>
);

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<TempPage title="로그인" />} />
      <Route path="/signup" element={<TempPage title="회원가입" />} />
      <Route path="/preference-setup" element={<TempPage title="초기 설정" />} />
      <Route path="/today" element={<TempPage title="오늘의 문제" />} />
      <Route path="/records" element={<TempPage title="내 기록" />} />
      <Route path="/settings" element={<TempPage title="설정" />} />
    </Routes>
  );
};

export default AppRoutes;
