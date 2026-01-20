# 개발 로드맵

## Phase 1: 핵심 기능 구현 (MVP)

### 1.1 프로젝트 초기 설정
- [ ] Vite + React + TypeScript 프로젝트 생성
- [ ] 필수 라이브러리 설치
  - React Router, React Query, Axios
  - Tailwind CSS, React Hook Form
  - date-fns
- [ ] 기본 디렉토리 구조 생성
- [ ] ESLint, Prettier 설정
- [ ] Git 초기화

### 1.2 타입 정의 및 API 클라이언트
- [ ] TypeScript 타입 정의 (`types/`)
  - [ ] auth.ts - 인증 관련 타입
  - [ ] problem.ts - 문제 관련 타입
  - [ ] streak.ts - 스트릭 관련 타입
  - [ ] common.ts - 공통 타입
- [ ] Axios 클라이언트 설정 (`api/client.ts`)
  - [ ] 기본 인스턴스 생성
  - [ ] Request Interceptor (JWT 토큰 추가)
  - [ ] Response Interceptor (토큰 갱신)
- [ ] API 모듈 구현 (`api/`)
  - [ ] auth.ts
  - [ ] problem.ts
  - [ ] streak.ts

### 1.3 인증 기능
- [ ] 로그인 페이지
  - [ ] LoginForm 컴포넌트
  - [ ] useAuth 커스텀 훅
  - [ ] 폼 유효성 검증
  - [ ] 로그인 API 연동
  - [ ] JWT 토큰 저장
- [ ] 회원가입 페이지
  - [ ] SignupForm 컴포넌트
  - [ ] 폼 유효성 검증
  - [ ] 회원가입 API 연동
- [ ] 인증 라우트 보호
  - [ ] ProtectedRoute 컴포넌트
  - [ ] 권한별 리다이렉트 (GUEST/MEMBER)

### 1.4 초기 설정 페이지
- [ ] PreferenceSetupPage 구현
  - [ ] 난이도 선택 UI (EASY/MEDIUM/HARD)
  - [ ] 카테고리 선택 UI (대분류 → 중분류 → 소분류)
  - [ ] usePreference 커스텀 훅
  - [ ] 설정 저장 API 연동
  - [ ] GUEST → MEMBER 권한 전환

### 1.5 오늘의 문제 페이지
- [ ] TodayProblemPage 구현
  - [ ] ProblemCard 컴포넌트 (문제 표시)
  - [ ] AnswerForm 컴포넌트 (답변 입력/제출)
  - [ ] useProblem 커스텀 훅
  - [ ] 문제 조회 API 연동
  - [ ] 답변 제출 API 연동
  - [ ] 제출 후 AI 답변 표시
- [ ] StreakBadge 컴포넌트
  - [ ] 현재 스트릭 표시
  - [ ] useStreak 커스텀 훅
  - [ ] 스트릭 조회 API 연동

### 1.6 공통 컴포넌트
- [ ] Button 컴포넌트
- [ ] Input 컴포넌트
- [ ] Card 컴포넌트
- [ ] Loading 컴포넌트
- [ ] Header 컴포넌트
- [ ] Navigation 컴포넌트

### 1.7 라우팅 설정
- [ ] React Router 설정
- [ ] 페이지 라우트 정의
- [ ] 네비게이션 구현

### 1.8 배포 준비
- [ ] 환경 변수 설정 (.env)
- [ ] 빌드 테스트
- [ ] 프로덕션 빌드 최적화

---

## Phase 2: 기록 관리 및 스트릭

### 2.1 기록 목록 페이지
- [ ] MyRecordPage 구현
  - [ ] RecordList 컴포넌트
  - [ ] useRecord 커스텀 훅
  - [ ] 기록 목록 조회 API 연동
  - [ ] 날짜별 정렬
  - [ ] 제출 여부 표시

### 2.2 기록 상세 페이지
- [ ] RecordDetail 컴포넌트
  - [ ] 문제 상세 표시
  - [ ] 내 답변 표시
  - [ ] AI 답변 표시
  - [ ] 기록 상세 조회 API 연동

### 2.3 스트릭 현황
- [ ] StreakCounter 컴포넌트
  - [ ] 현재 스트릭 숫자 표시
  - [ ] 최고 스트릭 표시
  - [ ] 스트릭 히스토리 조회 API 연동

### 2.4 날짜 처리 로직
- [ ] dateUtils 유틸리티 함수
  - [ ] 자정(00:00) 기준 날짜 전환 처리
  - [ ] 당일 23:59까지 제출 가능 체크
  - [ ] 스트릭 계산 로직

---

## Phase 3: 설정 및 부가 기능

### 3.1 설정 페이지
- [ ] SettingsPage 구현
  - [ ] 난이도 변경 UI
  - [ ] 카테고리 변경 UI
  - [ ] 설정 업데이트 API 연동
  - [ ] 설정 변경 확인 모달

### 3.2 UI/UX 개선
- [ ] 로딩 상태 개선
- [ ] 에러 메시지 표시
- [ ] 성공 토스트 알림
- [ ] 애니메이션 추가
- [ ] 반응형 디자인 최적화

### 3.3 에러 처리
- [ ] ErrorBoundary 구현
- [ ] API 에러 핸들링
- [ ] 사용자 친화적 에러 메시지
- [ ] 네트워크 오류 처리

---

## Phase 4: PWA 및 최적화

### 4.1 PWA 설정
- [ ] manifest.json 생성
  - [ ] 앱 이름, 아이콘 설정
  - [ ] 테마 색상, 배경 색상
  - [ ] display: standalone
- [ ] Service Worker 설정
  - [ ] Vite PWA Plugin 설치 및 설정
  - [ ] 캐시 전략 설정 (Network First, Cache First)
  - [ ] 오프라인 지원
- [ ] PWA 아이콘 생성
  - [ ] 192x192, 512x512 아이콘

### 4.2 성능 최적화
- [ ] Code Splitting
  - [ ] 페이지별 지연 로딩 (React.lazy)
  - [ ] 번들 크기 분석 및 최적화
- [ ] 이미지 최적화
  - [ ] 이미지 포맷 최적화 (WebP)
  - [ ] Lazy loading
- [ ] React Query 캐싱 최적화
  - [ ] staleTime, gcTime 조정
  - [ ] prefetching 전략
- [ ] 메모이제이션
  - [ ] React.memo, useMemo, useCallback 적용

### 4.3 오프라인 기능
- [ ] 오프라인 감지 UI
- [ ] 오프라인 상태에서의 데이터 캐싱
- [ ] 온라인 복구 시 동기화

---

## Phase 5: 추가 기능 (선택)

### 5.1 잔디 달력 (CalendarView)
- [ ] 월별 스트릭 캘린더
- [ ] 날짜별 제출 여부 표시
- [ ] 스트릭 통계 시각화

### 5.2 알림 기능
- [ ] 푸시 알림 설정
- [ ] 매일 특정 시간 알림
- [ ] Service Worker 알림 연동

### 5.3 소셜 기능
- [ ] 친구 목록
- [ ] 스트릭 순위
- [ ] 공유 기능

### 5.4 다크 모드
- [ ] 다크 모드 테마
- [ ] 테마 전환 토글
- [ ] 시스템 설정 따르기

---

## Phase 6: 테스트 및 배포

### 6.1 테스트
- [ ] 단위 테스트
  - [ ] 컴포넌트 테스트 (React Testing Library)
  - [ ] 유틸리티 함수 테스트
  - [ ] 커스텀 훅 테스트
- [ ] 통합 테스트
  - [ ] API 연동 테스트
  - [ ] 라우팅 테스트
- [ ] E2E 테스트 (Playwright/Cypress)
  - [ ] 로그인 플로우
  - [ ] 문제 제출 플로우
  - [ ] 기록 조회 플로우

### 6.2 접근성 (a11y)
- [ ] 시맨틱 HTML 적용
- [ ] ARIA 속성 추가
- [ ] 키보드 네비게이션
- [ ] 스크린 리더 지원
- [ ] 색상 대비 확인

### 6.3 성능 측정
- [ ] Lighthouse 점수 확인
  - [ ] Performance: 90+
  - [ ] Accessibility: 90+
  - [ ] Best Practices: 90+
  - [ ] SEO: 90+
  - [ ] PWA: 100
- [ ] Core Web Vitals 최적화
  - [ ] LCP (Largest Contentful Paint)
  - [ ] FID (First Input Delay)
  - [ ] CLS (Cumulative Layout Shift)

### 6.4 브라우저 테스트
- [ ] Chrome (최신 2버전)
- [ ] Safari (최신 2버전)
- [ ] Firefox (최신 2버전)
- [ ] 모바일 브라우저 (iOS Safari, Chrome)

### 6.5 배포
- [ ] 프로덕션 빌드
- [ ] 환경 변수 설정
- [ ] CI/CD 파이프라인 구축
- [ ] 호스팅 배포 (Vercel/Netlify)
- [ ] 도메인 연결
- [ ] HTTPS 설정

---

## 기술 부채 관리

### 코드 품질
- [ ] TypeScript strict 모드 활성화
- [ ] ESLint 규칙 강화
- [ ] 코드 리뷰 프로세스
- [ ] 주석 및 문서화

### 리팩토링
- [ ] 중복 코드 제거
- [ ] 컴포넌트 재사용성 개선
- [ ] 타입 정의 개선
- [ ] 유틸리티 함수 정리

### 모니터링
- [ ] 에러 트래킹 (Sentry)
- [ ] 사용자 분석 (Google Analytics)
- [ ] 성능 모니터링

---

## 우선순위별 태스크

### 🔴 High Priority (MVP)
- 인증 (로그인/회원가입)
- 초기 설정 (난이도, 카테고리)
- 오늘의 문제 조회 및 제출
- 스트릭 표시

### 🟡 Medium Priority
- 풀이 기록 목록
- 기록 상세 조회
- 설정 변경

### 🟢 Low Priority
- 잔디 달력
- 알림 기능
- 다크 모드
- 소셜 기능

---

## 타임라인 (예상)

```
Week 1-2: Phase 1 (핵심 기능 구현)
Week 3: Phase 2 (기록 관리)
Week 4: Phase 3 (설정 및 부가 기능)
Week 5: Phase 4 (PWA 및 최적화)
Week 6: Phase 5 (추가 기능)
Week 7-8: Phase 6 (테스트 및 배포)
```

---

## 체크포인트

### Milestone 1: MVP 완성
- ✅ 사용자가 로그인 → 초기 설정 → 문제 제출까지 가능
- ✅ 스트릭이 정상 작동

### Milestone 2: 기록 관리 완성
- ✅ 과거 기록 조회 가능
- ✅ 스트릭 현황 확인 가능

### Milestone 3: PWA 완성
- ✅ 모바일 홈 화면 추가 가능
- ✅ 오프라인에서도 작동

### Milestone 4: 프로덕션 배포
- ✅ 실제 사용자가 접근 가능
- ✅ 성능 및 접근성 기준 충족
