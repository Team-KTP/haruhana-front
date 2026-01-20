# HaruHaru Frontend

매일 1문제로 꾸준함을 기르는 학습 서비스의 프론트엔드 PWA

## 기술 스택
- React 18 + TypeScript + Vite
- PWA: vite-plugin-pwa
- 상태관리: React Query (TanStack Query)
- 라우팅: React Router v6
- 스타일: Tailwind CSS
- HTTP: Axios
- 폼: React Hook Form
- 날짜: date-fns

## 프로젝트 구조
```
src/
├── components/
│ ├── common/ # Button, Input 등
│ ├── layout/ # Header, Navigation
│ └── features/ # auth, problem, streak, preference
├── pages/ # 페이지 컴포넌트
├── api/ # Axios 클라이언트 및 API 함수
├── hooks/ # useAuth, useProblem, useStreak
├── types/ # TypeScript 타입
├── utils/ # 유틸리티
└── routes/ # 라우팅 설정
```

## 백엔드 연동
- Base URL: `http://localhost:8080/v1`
- 인증: JWT (Bearer 토큰, localStorage 저장)
- Axios 인터셉터로 토큰 자동 추가 및 401 처리

## 핵심 규칙
- 컴포넌트는 함수형(FC), props는 interface 정의
- API 호출은 `src/api/*.ts`에 집중, React Query로 관리
- 전역 상태는 React Query, 로컬 상태는 useState
- 날짜 비교는 `date-fns` 사용 (자정 기준 처리 주의)
- 파일명: PascalCase (컴포넌트), camelCase (유틸, 훅)

## 권한 관리
- GUEST: 초기 설정 페이지만 접근
- MEMBER: 모든 페이지 접근
- ProtectedRoute로 라우트 보호

## PWA 설정
- manifest.json: `/public/manifest.json`
- Service Worker: Vite PWA Plugin 자동 생성
- 캐시: Network First (API), Cache First (정적 파일)

## 주의사항
- 스트릭: 당일 00:00 기준, 23:59까지 제출 가능
- 답변 수정: 제출 당일만 가능
- JWT 만료: 401 응답 시 Refresh Token으로 재발급
- 오프라인: 오늘의 문제는 캐싱, 제출은 온라인 필수

## 상세 문서
- `/docs/api.md` - API 연동 가이드
- `/docs/architecture.md` - 아키텍처 설계
- `/docs/roadmap.md` - 개발 로드맵
