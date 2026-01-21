# 반응형 디자인 가이드

하루하루 PWA는 모바일, 태블릿, 데스크톱 모든 기기에서 최적화된 경험을 제공합니다.

## 주요 브레이크포인트

Tailwind CSS 기본 브레이크포인트를 사용합니다:

- **모바일**: `< 640px` (기본)
- **태블릿**: `sm: >= 640px`
- **데스크톱**: `md: >= 768px`, `lg: >= 1024px`, `xl: >= 1280px`

## PWA 최적화

### Viewport 설정
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes, viewport-fit=cover" />
```

### Safe Area 대응
iOS 노치 및 Safe Area를 고려한 padding 유틸리티 클래스:
```css
.safe-top { padding-top: env(safe-area-inset-top); }
.safe-bottom { padding-bottom: env(safe-area-inset-bottom); }
.safe-left { padding-left: env(safe-area-inset-left); }
.safe-right { padding-right: env(safe-area-inset-right); }
```

### 터치 최적화
- `-webkit-tap-highlight-color: transparent` - 탭 하이라이트 제거
- `touch-action: manipulation` - 더블탭 줌 방지
- `overscroll-behavior-y: none` - 당겨서 새로고침 방지

## 레이아웃 컴포넌트

### Layout (src/components/common/Layout.tsx)
- **모바일/태블릿**: 하단 탭바 네비게이션 (고정)
- **데스크톱**: 좌측 사이드바 네비게이션
- 반응형 헤더 높이: `h-14 sm:h-16`
- 반응형 컨텐츠 패딩: `p-4 sm:p-6 lg:p-8`

### Header
- 로고 크기: `w-8 h-8 sm:w-10 sm:h-10`
- 타이틀 크기: `text-lg sm:text-xl`

### Navigation
- 하단 탭바: `h-16 sm:h-18` (모바일/태블릿)
- 아이콘 크기: `w-6 h-6 sm:w-7 sm:h-7`
- 레이블 크기: `text-[10px] sm:text-xs`

## 공통 컴포넌트

### Button
```tsx
// 반응형 사이즈
sm: "px-3 py-1.5 sm:px-3.5 sm:py-2 text-xs sm:text-sm"
md: "px-4 py-2.5 sm:px-5 sm:py-3 text-sm sm:text-base"
lg: "px-5 py-3 sm:px-6 sm:py-3.5 text-base sm:text-lg"

// 터치 최적화
- active:scale-[0.98] - 터치 피드백
- touch-manipulation - 빠른 탭 반응
```

### Card
```tsx
// 반응형 라운딩
rounded-xl sm:rounded-2xl

// 반응형 패딩
px-4 sm:px-6 py-4 sm:py-5

// 제목 크기
text-base sm:text-lg
```

### Input
```tsx
// 반응형 입력 필드
px-3 py-2 sm:px-4 sm:py-2.5 text-sm sm:text-base
```

## 페이지별 반응형 처리

### Dashboard (/)
- 스트릭 카드 텍스트: `text-3xl sm:text-4xl lg:text-5xl`
- 카드 간격: `space-y-4 sm:space-y-6 lg:space-y-8`
- 뱃지 크기: `text-[10px] sm:text-xs`

### ProblemSolve (/problem/:id)
- 문제 제목: `text-2xl sm:text-3xl`
- 답변 입력창: `h-48` (고정, 스크롤 가능)
- 하단 여백: `pb-32 sm:pb-10` (모바일 탭바 고려)

### History (/records)
- 캘린더 그리드: `grid-cols-7` (모든 화면)
- 날짜 셀: `aspect-square` (정사각형 유지)
- 헤더 크기: `text-xl sm:text-2xl lg:text-3xl`
- 캘린더 패딩: `!p-3 sm:!p-4 lg:!p-5`

### MyPage (/mypage)
- 프로필 아이콘: `w-12 h-12`
- 제목 크기: `text-2xl`
- 컨테이너: `max-w-xl mx-auto`

### Login & Signup
- 로고 크기: `w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24`
- 제목 크기: `text-2xl sm:text-3xl lg:text-4xl`
- 카드 너비: `max-w-sm sm:max-w-md` (로그인), `max-w-3xl` (회원가입 2단계)

## MarkdownRenderer

모든 마크다운 요소가 반응형으로 처리됩니다:

```tsx
// 제목
h1: text-xl sm:text-2xl
h2: text-lg sm:text-xl
h3: text-base sm:text-lg

// 본문
p: text-sm sm:text-base

// 리스트
ul/ol: ml-5 sm:ml-6 text-sm sm:text-base

// 코드
inline code: text-xs sm:text-sm
code block: p-3 sm:p-4 text-xs sm:text-sm

// 테이블
table: text-xs sm:text-sm
th/td: px-2 sm:px-4 py-1.5 sm:py-2
```

## CSS 유틸리티

### 커스텀 스크롤바
```css
.custom-scrollbar {
  scrollbar-width: thin;
  scrollbar-color: #cbd5e1 transparent;
}
```

### 애니메이션
```css
.animate-fade-in {
  animation: fade-in 0.3s ease-out;
}
```

### Input 필드
```css
.input-field {
  /* 반응형 패딩 및 텍스트 크기 */
  @apply w-full px-3 py-2 sm:px-4 sm:py-2.5
         text-sm sm:text-base
         border border-slate-200 rounded-xl
         focus:outline-none focus:ring-2
         focus:ring-haru-500 focus:border-transparent;
}
```

## 모바일 최적화 체크리스트

- [x] 터치 영역 최소 44x44px
- [x] 텍스트 최소 14px (모바일)
- [x] Safe Area 대응
- [x] 가로 스크롤 방지
- [x] 탭 하이라이트 제거
- [x] 더블탭 줌 방지
- [x] 당겨서 새로고침 방지
- [x] 하단 네비게이션 고정
- [x] 키보드 대응 (input focus 시)
- [x] 반응형 폰트 크기
- [x] 반응형 간격 및 패딩
- [x] 테이블 가로 스크롤

## 테스트 권장사항

다음 기기 및 해상도에서 테스트하세요:

1. **모바일**
   - iPhone SE (375x667)
   - iPhone 14 Pro (393x852)
   - Samsung Galaxy S21 (360x800)

2. **태블릿**
   - iPad Mini (768x1024)
   - iPad Pro (1024x1366)

3. **데스크톱**
   - 1280x720 (HD)
   - 1920x1080 (Full HD)
   - 2560x1440 (2K)

## 향후 개선사항

- [ ] 다크 모드 지원
- [ ] 가로 모드 최적화
- [ ] 폴더블 기기 대응
- [ ] 고해상도 이미지 최적화
- [ ] 오프라인 모드 UI 개선
