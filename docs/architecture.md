# 아키텍처 가이드

## 프로젝트 구조 상세

```
src/
├── assets/                    # 정적 파일
│   ├── images/               # 이미지 파일
│   ├── fonts/                # 폰트 파일
│   └── icons/                # 아이콘 파일
│
├── components/               # 컴포넌트
│   ├── common/              # 공통 컴포넌트
│   │   ├── Button.tsx       # 버튼 컴포넌트
│   │   ├── Input.tsx        # 입력 컴포넌트
│   │   ├── Card.tsx         # 카드 컴포넌트
│   │   ├── Modal.tsx        # 모달 컴포넌트
│   │   └── Loading.tsx      # 로딩 컴포넌트
│   │
│   ├── layout/              # 레이아웃 컴포넌트
│   │   ├── Header.tsx       # 헤더
│   │   ├── Navigation.tsx   # 네비게이션
│   │   └── Container.tsx    # 컨테이너
│   │
│   └── features/            # 기능별 컴포넌트
│       ├── auth/            # 인증
│       │   ├── LoginForm.tsx
│       │   └── SignupForm.tsx
│       ├── problem/         # 문제
│       │   ├── ProblemCard.tsx
│       │   ├── ProblemDetail.tsx
│       │   └── AnswerForm.tsx
│       ├── streak/          # 스트릭
│       │   ├── StreakBadge.tsx
│       │   ├── StreakCounter.tsx
│       │   └── CalendarView.tsx
│       └── preference/      # 설정
│           ├── DifficultySelector.tsx
│           └── CategorySelector.tsx
│
├── pages/                   # 페이지 컴포넌트
│   ├── LoginPage.tsx
│   ├── SignupPage.tsx
│   ├── PreferenceSetupPage.tsx
│   ├── TodayProblemPage.tsx
│   ├── MyRecordPage.tsx
│   └── SettingsPage.tsx
│
├── hooks/                   # Custom Hooks
│   ├── useAuth.ts          # 인증 관련
│   ├── useProblem.ts       # 문제 관련
│   ├── useStreak.ts        # 스트릭 관련
│   ├── usePreference.ts    # 설정 관련
│   └── useRecord.ts        # 기록 관련
│
├── api/                    # API 요청
│   ├── client.ts          # Axios 인스턴스
│   ├── auth.ts            # 인증 API
│   ├── problem.ts         # 문제 API
│   ├── streak.ts          # 스트릭 API
│   ├── preference.ts      # 설정 API
│   └── record.ts          # 기록 API
│
├── types/                  # TypeScript 타입
│   ├── auth.ts            # 인증 관련 타입
│   ├── problem.ts         # 문제 관련 타입
│   ├── streak.ts          # 스트릭 관련 타입
│   ├── preference.ts      # 설정 관련 타입
│   ├── record.ts          # 기록 관련 타입
│   └── common.ts          # 공통 타입
│
├── utils/                  # 유틸리티 함수
│   ├── dateUtils.ts       # 날짜 처리
│   ├── storage.ts         # 로컬 스토리지
│   ├── validation.ts      # 유효성 검증
│   └── format.ts          # 포맷팅
│
├── constants/              # 상수
│   ├── index.ts           # 공통 상수
│   ├── routes.ts          # 라우트 경로
│   └── api.ts             # API 엔드포인트
│
├── routes/                 # 라우팅
│   ├── index.tsx          # 라우트 설정
│   └── ProtectedRoute.tsx # 인증 라우트
│
├── styles/                 # 스타일
│   ├── globals.css        # 전역 스타일
│   └── tailwind.css       # Tailwind 설정
│
├── App.tsx                 # 메인 앱 컴포넌트
└── main.tsx               # 진입점
```

## 핵심 아키텍처 패턴

### 1. 컴포넌트 설계 원칙

#### 단일 책임 원칙 (Single Responsibility)

각 컴포넌트는 하나의 명확한 역할만 수행합니다.

```typescript
// ❌ 나쁜 예 - 여러 책임을 가진 컴포넌트
function ProblemPageWithEverything() {
  // 문제 조회, 제출, 스트릭 관리, UI 렌더링 모두 처리
}

// ✅ 좋은 예 - 역할별로 분리
function TodayProblemPage() {
  const { todayProblem } = useProblem();
  const { streak } = useStreak();

  return (
    <>
      <StreakBadge count={streak} />
      <ProblemCard problem={todayProblem} />
      <AnswerForm problemId={todayProblem.id} />
    </>
  );
}
```

#### 컴포넌트 계층 구조

```
Page (페이지 레벨)
  └─> Feature Components (기능 컴포넌트)
       └─> Common Components (공통 컴포넌트)
```

### 2. 상태 관리 전략

#### 상태 분류

1. **서버 상태** - React Query로 관리
   - API 데이터 (문제, 스트릭, 기록 등)
   - 캐싱, 리페칭, 동기화 자동 처리

2. **클라이언트 상태** - React State로 관리
   - 폼 입력값
   - UI 상태 (모달 열림/닫힘 등)
   - 임시 데이터

3. **영구 상태** - LocalStorage로 관리
   - JWT 토큰
   - 사용자 설정

#### 상태 관리 예시

```typescript
// 서버 상태 - React Query
const { data: todayProblem } = useQuery({
  queryKey: ['todayProblem'],
  queryFn: getTodayProblem,
});

// 클라이언트 상태 - React State
const [answer, setAnswer] = useState('');
const [isModalOpen, setIsModalOpen] = useState(false);

// 영구 상태 - LocalStorage
const token = localStorage.getItem('accessToken');
```

### 3. 데이터 흐름

```
User Action (사용자 액션)
    ↓
Component Event Handler (컴포넌트 이벤트 핸들러)
    ↓
Custom Hook (커스텀 훅)
    ↓
API Module (API 모듈)
    ↓
Axios Client (HTTP 클라이언트)
    ↓
Backend API (백엔드)
    ↓
Response (응답)
    ↓
React Query Cache (캐시 업데이트)
    ↓
Component Re-render (컴포넌트 리렌더링)
```

### 4. 폴더 구조 규칙

#### 컴포넌트 파일 구성

```typescript
// components/features/problem/ProblemCard/
├── ProblemCard.tsx        # 메인 컴포넌트
├── ProblemCard.test.tsx   # 테스트
├── ProblemCard.stories.tsx # Storybook (선택)
└── index.ts               # Export
```

#### Export 패턴

```typescript
// index.ts - Named export 사용
export { ProblemCard } from './ProblemCard';
export type { ProblemCardProps } from './ProblemCard';
```

### 5. 타입 정의 규칙

#### API 응답 타입

```typescript
// types/problem.ts
export interface Problem {
  id: string;
  title: string;
  description: string;
  difficulty: 'EASY' | 'MEDIUM' | 'HARD';
  category: string;
  assignedAt: string;
}

export interface SubmitAnswerRequest {
  dailyProblemId: string;
  answer: string;
}

export interface SubmitAnswerResponse {
  success: boolean;
  aiResponse: string;
  streakUpdated: boolean;
}
```

#### 컴포넌트 Props 타입

```typescript
// components/features/problem/ProblemCard.tsx
export interface ProblemCardProps {
  problem: Problem;
  onSubmit?: (answer: string) => void;
  isLoading?: boolean;
}

export function ProblemCard({
  problem,
  onSubmit,
  isLoading = false
}: ProblemCardProps) {
  // ...
}
```

## 라우팅 아키텍처

### 라우트 설정

```typescript
// routes/index.tsx
import { createBrowserRouter } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/signup',
    element: <SignupPage />,
  },
  {
    path: '/',
    element: <ProtectedRoute />,
    children: [
      {
        path: '/preference-setup',
        element: <PreferenceSetupPage />,
      },
      {
        path: '/today',
        element: <TodayProblemPage />,
      },
      {
        path: '/records',
        element: <MyRecordPage />,
      },
      {
        path: '/settings',
        element: <SettingsPage />,
      },
    ],
  },
]);
```

### 보호된 라우트

```typescript
// routes/ProtectedRoute.tsx
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

export default function ProtectedRoute() {
  const { isAuthenticated, user, isLoading } = useAuth();

  if (isLoading) {
    return <Loading />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // GUEST 사용자는 초기 설정 페이지로
  if (user?.role === 'GUEST') {
    return <Navigate to="/preference-setup" replace />;
  }

  return <Outlet />;
}
```

## 성능 최적화 전략

### 1. Code Splitting

```typescript
// 페이지 레벨에서 지연 로딩
import { lazy, Suspense } from 'react';

const TodayProblemPage = lazy(() => import('@/pages/TodayProblemPage'));
const MyRecordPage = lazy(() => import('@/pages/MyRecordPage'));

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/today" element={<TodayProblemPage />} />
        <Route path="/records" element={<MyRecordPage />} />
      </Routes>
    </Suspense>
  );
}
```

### 2. React Query 캐싱 전략

```typescript
// 캐시 시간 설정
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5분
      gcTime: 1000 * 60 * 30, // 30분 (이전 cacheTime)
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});
```

### 3. 메모이제이션

```typescript
import { memo, useMemo, useCallback } from 'react';

// 컴포넌트 메모이제이션
export const ProblemCard = memo(({ problem }: ProblemCardProps) => {
  // 복잡한 계산 메모이제이션
  const formattedDate = useMemo(() => {
    return format(new Date(problem.assignedAt), 'yyyy-MM-dd');
  }, [problem.assignedAt]);

  // 콜백 메모이제이션
  const handleSubmit = useCallback((answer: string) => {
    submitAnswer({ problemId: problem.id, answer });
  }, [problem.id]);

  return (
    // ...
  );
});
```

## PWA 아키텍처

### Service Worker 전략

```typescript
// vite.config.ts
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/api\.haruharu\.com\/.*/i,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'api-cache',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24, // 24시간
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
        ],
      },
    }),
  ],
});
```

### 오프라인 지원

```typescript
// 온라인/오프라인 감지
import { useEffect, useState } from 'react';

export function useOnlineStatus() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    function handleOnline() {
      setIsOnline(true);
    }

    function handleOffline() {
      setIsOnline(false);
    }

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return isOnline;
}
```

## 에러 바운더리

```typescript
// components/common/ErrorBoundary.tsx
import { Component, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || <div>오류가 발생했습니다.</div>;
    }

    return this.props.children;
  }
}
```

## 테스트 전략

### 테스트 피라미드

```
       ┌─────────┐
       │   E2E   │ (소수)
       ├─────────┤
       │Integration│ (중간)
       ├─────────┤
       │  Unit   │ (다수)
       └─────────┘
```

### 단위 테스트 예시

```typescript
// components/features/problem/ProblemCard.test.tsx
import { render, screen } from '@testing-library/react';
import { ProblemCard } from './ProblemCard';

describe('ProblemCard', () => {
  const mockProblem = {
    id: '1',
    title: '테스트 문제',
    description: '문제 설명',
    difficulty: 'EASY',
    category: '알고리즘',
    assignedAt: '2024-01-01T00:00:00Z',
  };

  it('문제 제목을 렌더링한다', () => {
    render(<ProblemCard problem={mockProblem} />);
    expect(screen.getByText('테스트 문제')).toBeInTheDocument();
  });
});
```
