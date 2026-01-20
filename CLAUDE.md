# HaruHaru Frontend Project

## 프로젝트 개요
매일 1문제로 꾸준함을 기르는 학습 서비스 HaruHaru의 프론트엔드 애플리케이션

## 기술 스택
- **Framework**: React 18
- **Language**: TypeScript
- **Build Tool**: Vite
- **PWA**: Vite PWA Plugin
- **State Management**: React Query (TanStack Query)
- **Routing**: React Router v6
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios
- **Form Handling**: React Hook Form
- **Date Handling**: date-fns

## 프로젝트 구조
```
src/
├── assets/              # 이미지, 폰트 등 정적 파일
├── components/          # 재사용 가능한 컴포넌트
│   ├── common/         # 공통 컴포넌트 (Button, Input 등)
│   ├── layout/         # 레이아웃 컴포넌트 (Header, Navigation 등)
│   └── features/       # 기능별 컴포넌트
│       ├── auth/       # 인증 관련
│       ├── problem/    # 문제 관련
│       ├── streak/     # 스트릭 관련
│       └── preference/ # 설정 관련
├── pages/              # 페이지 컴포넌트
│   ├── LoginPage.tsx
│   ├── SignupPage.tsx
│   ├── PreferenceSetupPage.tsx
│   ├── TodayProblemPage.tsx
│   ├── MyRecordPage.tsx
│   └── SettingsPage.tsx
├── hooks/              # Custom Hooks
│   ├── useAuth.ts
│   ├── useProblem.ts
│   └── useStreak.ts
├── api/                # API 요청 관련
│   ├── client.ts       # Axios 인스턴스
│   ├── auth.ts
│   ├── problem.ts
│   └── streak.ts
├── types/              # TypeScript 타입 정의
│   ├── auth.ts
│   ├── problem.ts
│   └── common.ts
├── utils/              # 유틸리티 함수
│   ├── dateUtils.ts
│   └── storage.ts
├── constants/          # 상수 정의
│   └── index.ts
├── store/              # 전역 상태 관리 (필요시)
├── routes/             # 라우팅 설정
│   └── index.tsx
├── App.tsx
└── main.tsx
```

## 주요 페이지 및 기능

### 1. 인증 페이지
- **로그인 페이지** (`/login`)
  - 로그인 ID, 비밀번호 입력
  - JWT 토큰 저장
  
- **회원가입 페이지** (`/signup`)
  - 로그인 ID, 비밀번호, 닉네임 입력
  - 유효성 검증

### 2. 초기 설정 페이지
- **문제 설정 페이지** (`/preference-setup`)
  - 난이도 선택 (EASY/MEDIUM/HARD)
  - 카테고리 선택 (대분류 → 중분류 → 소분류)
  - GUEST → MEMBER 권한 전환

### 3. 메인 페이지
- **오늘의 문제 페이지** (`/today`)
  - 오늘의 문제 표시
  - 답변 제출 폼
  - 제출 후 AI 답변 표시
  - 현재 스트릭 표시

### 4. 기록 페이지
- **내 기록 페이지** (`/records`)
  - 풀이 기록 목록 (날짜, 문제, 제출 여부)
  - 스트릭 현황 (숫자)
  - 상세 조회 (문제, 내 답변, AI 답변)

### 5. 설정 페이지
- **설정 페이지** (`/settings`)
  - 문제 난이도 변경
  - 카테고리 변경
  - 알림 설정 (추후)

## 핵심 기능 구현 가이드

### 인증 플로우
```typescript
// useAuth hook 사용
const { login, logout, user, isAuthenticated } = useAuth();

// 로그인
await login({ loginId, password });

// 토큰 저장
localStorage.setItem('accessToken', token);
localStorage.setItem('refreshToken', refreshToken);
```

### 권한 관리
- GUEST: 초기 설정 페이지만 접근 가능
- MEMBER: 모든 페이지 접근 가능
- ProtectedRoute 컴포넌트로 라우트 보호

### 문제 제출 플로우
```typescript
// useProblem hook
const { submitAnswer, todayProblem } = useProblem();

// 답변 제출
await submitAnswer({
  dailyProblemId: problem.id,
  answer: userAnswer
});

// 제출 시간 체크 (스트릭 반영 여부)
const isOnTime = isSameDay(new Date(), problem.assignedAt);
```

### 스트릭 관리
```typescript
// useStreak hook
const { streak, updateStreak } = useStreak();

// 문제 제출 성공 시 스트릭 업데이트
// 자정 이후 미제출 시 스트릭 리셋
```

## PWA 설정

### manifest.json
```json
{
  "name": "HaruHaru",
  "short_name": "HaruHaru",
  "description": "매일 1문제로 꾸준함을 기르는 학습 서비스",
  "theme_color": "#4F46E5",
  "background_color": "#FFFFFF",
  "display": "standalone",
  "start_url": "/",
  "icons": [
    {
      "src": "/icons/icon-192x192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-512x512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```

### Service Worker
- Vite PWA Plugin 사용
- 오프라인 지원
- 캐시 전략: Network First (API), Cache First (정적 파일)

## API 연동

### Axios 인스턴스 설정
```typescript
// api/client.ts
const client = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
});

// Request Interceptor - JWT 토큰 자동 추가
client.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response Interceptor - 토큰 만료 시 자동 갱신
client.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // 리프레시 토큰으로 재발급
      // 실패 시 로그아웃
    }
    return Promise.reject(error);
  }
);
```

## 상태 관리

### React Query 사용
```typescript
// 오늘의 문제 조회
const { data: todayProblem } = useQuery({
  queryKey: ['todayProblem'],
  queryFn: getTodayProblem,
  staleTime: 1000 * 60 * 5, // 5분
});

// 문제 제출
const mutation = useMutation({
  mutationFn: submitAnswer,
  onSuccess: () => {
    queryClient.invalidateQueries(['todayProblem']);
    queryClient.invalidateQueries(['streak']);
  },
});
```

## 환경 변수
```env
VITE_API_URL=http://localhost:8080/v1
VITE_APP_NAME=HaruHaru
```

## UI/UX 가이드라인

### 디자인 원칙
- **미니멀**: 불필요한 요소 최소화
- **친근함**: 부담 없는 분위기
- **일관성**: 통일된 디자인 시스템

### 컬러 팔레트
- Primary: Indigo (스트릭, 중요 버튼)
- Success: Green (제출 완료)
- Warning: Yellow (기한 임박)
- Gray: 텍스트, 배경

### 주요 컴포넌트
- **StreakBadge**: 스트릭 숫자를 강조하는 배지
- **ProblemCard**: 문제를 표시하는 카드
- **SubmitButton**: 제출 버튼 (활성화 상태 관리)
- **CalendarView**: 잔디 형식 스트릭 달력 (추후)

## 빌드 및 배포

### 개발 서버
```bash
npm run dev
```

### 프로덕션 빌드
```bash
npm run build
npm run preview
```

### PWA 빌드 확인
- Chrome DevTools > Application > Service Workers
- Lighthouse PWA 점수 확인

## 테스트
```bash
# 단위 테스트
npm run test

# E2E 테스트
npm run test:e2e
```

## 성능 최적화
- Code Splitting (React.lazy)
- Image Optimization
- API 캐싱 (React Query)
- Service Worker 캐싱

## 접근성
- 시맨틱 HTML
- ARIA 속성
- 키보드 네비게이션
- 스크린 리더 지원

## 브라우저 지원
- Chrome (최신 2버전)
- Safari (최신 2버전)
- Firefox (최신 2버전)
- 모바일 브라우저 (iOS Safari, Chrome)

## 개발 우선순위

### Phase 1: 핵심 기능
1. 인증 (로그인/회원가입)
2. 초기 설정 (난이도, 카테고리)
3. 오늘의 문제 조회 및 제출
4. 스트릭 표시

### Phase 2: 기록 관리
1. 풀이 기록 목록
2. 상세 조회
3. 스트릭 현황

### Phase 3: 부가 기능
1. 설정 변경
2. 알림 (추후)
3. 잔디 달력 (추후)

## 주의사항
- 자정(00:00) 기준 날짜 전환 처리 주의
- 답변 수정 가능 시간 체크 (당일 23:59까지)
- 스트릭 계산 로직 정확성 보장
- 오프라인 상태에서의 사용성 고려
- JWT 토큰 만료 처리

## 참고 자료
- [React 공식 문서](https://react.dev)
- [Vite PWA Plugin](https://vite-pwa-org.netlify.app)
- [TanStack Query](https://tanstack.com/query)
- [React Router](https://reactrouter.com)
