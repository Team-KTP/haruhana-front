import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import History from '../pages/History';
import ProblemSolve from '../pages/ProblemSolve';
import ProtectedRoute from '../components/features/auth/ProtectedRoute';
import AuthRedirect from '../components/features/auth/AuthRedirect';
import MyPage from '../pages/MyPage';
const AppRoutes = () => {
  return (
    <Routes>
      {/* 공개 라우트 */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* 루트 경로 - 로그인 시 대시보드로 리다이렉트 */}
      <Route path="/" element={<AuthRedirect />} />

      {/* MEMBER 전용 라우트 */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute requireRole="ROLE_MEMBER">
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/records"
        element={
          <ProtectedRoute requireRole="ROLE_MEMBER">
            <History />
          </ProtectedRoute>
        }
      />
      <Route
        path="/problem/:id"
        element={
          <ProtectedRoute requireRole="ROLE_MEMBER">
            <ProblemSolve />
          </ProtectedRoute>
        }
      />

      {/* 내 정보 페이지 */}
      <Route
        path="/mypage"
        element={
          <ProtectedRoute requireRole="ROLE_MEMBER">
            <MyPage />
          </ProtectedRoute>
        }
      />
      {/* 필요시 Settings 라우트 추가 */}

      {/* 404 리다이렉트 */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
