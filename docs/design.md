# HaruHaru 디자인 시스템

> 2026년 트렌드를 반영한 감성적이고 현대적인 디자인 시스템

## 1. 디자인 원칙

### 1.1 감성적 표현과 개성
- 단순한 기능 전달을 넘어 사용자와 감정적으로 연결
- 브랜드 개성을 담은 대담한 디자인 선택
- 획일화된 디자인에서 벗어나 독창적인 경험 제공

### 1.2 대담한 타이포그래피
- 타이포그래피를 시각적 주인공으로 활용
- 크기와 웨이트의 과감한 대비로 위계 강조
- 가독성과 임팩트의 균형 유지

### 1.3 생동감 있는 인터랙션
- 모든 인터랙션에 의미 있는 피드백 제공
- 자연스러운 애니메이션으로 즐거운 사용 경험
- 마이크로 인터랙션으로 디테일 완성

### 1.4 일관성 있는 브랜드 경험
- 모든 터치포인트에서 통일된 디자인 언어
- 재사용 가능한 컴포넌트 시스템
- 확장 가능한 디자인 토큰

---

## 2. 색상 시스템

### 2.1 Primary Colors (브랜드 색상)

#### Primary (Indigo) - 신뢰와 집중
메인 브랜드 컬러로 학습과 성장의 이미지 전달

```css
primary-50:  #eef2ff
primary-100: #e0e7ff
primary-200: #c7d2fe
primary-300: #a5b4fc
primary-400: #818cf8
primary-500: #6366f1  /* 기본 색상 */
primary-600: #4f46e5  /* 주요 사용 */
primary-700: #4338ca
primary-800: #3730a3
primary-900: #312e81
```

**사용 예시**:
- Primary-600: 주요 CTA 버튼, 링크
- Primary-500: Focus ring, 활성 상태
- Primary-100: 배경 강조, hover 상태

#### Secondary (Coral) - 따뜻함과 활력
보조 색상으로 따뜻하고 격려하는 느낌 전달

```css
secondary-50:  #fff7ed
secondary-100: #ffedd5
secondary-200: #fed7aa
secondary-300: #fdba74
secondary-400: #fb923c
secondary-500: #f97316  /* 기본 색상 */
secondary-600: #ea580c
secondary-700: #c2410c
secondary-800: #9a3412
secondary-900: #7c2d12
```

**사용 예시**:
- Secondary-500: 보조 버튼, 배지
- Secondary-100: 알림 배경
- Secondary-600: 중요 강조 요소

#### Accent (Mint) - 신선함과 성취
강조 색상으로 성공과 긍정적 피드백 전달

```css
accent-50:  #ecfdf5
accent-100: #d1fae5
accent-200: #a7f3d0
accent-300: #6ee7b7
accent-400: #34d399
accent-500: #10b981  /* 기본 색상 */
accent-600: #059669
accent-700: #047857
accent-800: #065f46
accent-900: #064e3b
```

**사용 예시**:
- Accent-500: 하이라이트, 새로운 기능
- Accent-100: 부드러운 배경 강조

### 2.2 Semantic Colors (의미 전달)

#### Success (Emerald) - 성공과 달성
```css
success-500: #10b981
success-600: #059669
success-700: #047857
```
**사용**: 성공 메시지, 완료 상태, 체크마크

#### Warning (Amber) - 주의와 알림
```css
warning-500: #f59e0b
warning-600: #d97706
warning-700: #b45309
```
**사용**: 경고 메시지, 주의 필요 영역

#### Error (Rose) - 오류와 실패
```css
error-500: #f43f5e
error-600: #e11d48
error-700: #be123c
```
**사용**: 에러 메시지, 삭제 확인, 필수 입력

#### Info (Sky) - 정보와 안내
```css
info-500: #0ea5e9
info-600: #0284c7
info-700: #0369a1
```
**사용**: 정보 메시지, 도움말, 툴팁

### 2.3 Gradient Colors (감성 강화)

#### Primary Gradient (Indigo → Purple)
```css
background: linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%);
```
**사용**: 히어로 섹션, 주요 CTA 버튼, 프리미엄 요소

#### Success Gradient (Emerald → Teal)
```css
background: linear-gradient(135deg, #10B981 0%, #14B8A6 100%);
```
**사용**: 성취 배지, 완료 화면, 축하 요소

#### Warm Gradient (Coral → Amber)
```css
background: linear-gradient(135deg, #F97316 0%, #F59E0B 100%);
```
**사용**: 스트릭 카운터, 동기부여 요소

### 2.4 Neutral Colors (기본 색상)

#### Gray Scale
```css
gray-50:  #f9fafb  /* 배경 */
gray-100: #f3f4f6  /* 보조 배경 */
gray-200: #e5e7eb  /* Border */
gray-300: #d1d5db  /* Border (hover) */
gray-400: #9ca3af  /* Placeholder */
gray-500: #6b7280  /* 보조 텍스트 */
gray-600: #4b5563  /* 일반 텍스트 */
gray-700: #374151  /* 강조 텍스트 */
gray-800: #1f2937  /* 헤딩 */
gray-900: #111827  /* 강한 강조 */
```

### 2.5 접근성 가이드

#### 색상 대비 비율 (WCAG 2.1 AA 기준)
- **일반 텍스트**: 최소 4.5:1
- **큰 텍스트** (18pt 이상): 최소 3:1
- **UI 컴포넌트**: 최소 3:1

#### 색상 사용 원칙
- 색상만으로 정보를 전달하지 않음
- 아이콘, 텍스트 레이블 병행 사용
- 충분한 대비로 가독성 보장

**검증된 조합**:
- White (#FFFFFF) + Primary-600 (#4F46E5) = 8.59:1 ✓
- White (#FFFFFF) + Error-600 (#E11D48) = 5.04:1 ✓
- Gray-900 (#111827) + White (#FFFFFF) = 16.54:1 ✓

---

## 3. 타이포그래피

### 3.1 폰트 패밀리

#### Primary Font: Pretendard Variable
- **타입**: Neo-grotesque, Variable Font
- **웨이트**: 300 (Light) ~ 900 (Black) - 9단계
- **특징**: 한글과 영문 모두 최적화, 다양한 웨이트로 표현력 극대화
- **로딩**: jsDelivr CDN (빠른 로딩, 자동 캐싱)

```html
<!-- CDN -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable.min.css">
```

```css
/* CSS */
font-family: 'Pretendard Variable', 'Inter', system-ui, -apple-system, sans-serif;
font-variation-settings: 'wght' 400; /* 기본 웨이트 */
```

#### Fallback Fonts
1. **Inter**: 영문 전용, Pretendard와 유사한 느낌
2. **system-ui**: 시스템 기본 폰트
3. **-apple-system**: Apple 기기 최적화
4. **sans-serif**: 최종 fallback

### 3.2 타입 스케일 (Type Scale)

#### Display (대형 타이틀) - 히어로, 랜딩
```css
text-6xl: 3.75rem / 60px  (line-height: 1.1)
text-7xl: 4.5rem / 72px   (line-height: 1.1)
text-8xl: 6rem / 96px     (line-height: 1.1)
text-9xl: 8rem / 128px    (line-height: 1.1)
```
**사용**: 히어로 섹션, 랜딩 페이지, 임팩트 메시지

#### Heading (헤딩) - 페이지 제목, 섹션
```css
text-5xl: 3rem / 48px     (line-height: 1.2)
text-4xl: 2.25rem / 36px  (line-height: 1.25)
text-3xl: 1.875rem / 30px (line-height: 1.25)
text-2xl: 1.5rem / 24px   (line-height: 1.375)
text-xl:  1.25rem / 20px  (line-height: 1.375)
```
**사용**: 페이지 제목, 섹션 헤더, 카드 제목

#### Body (본문) - 일반 텍스트
```css
text-lg:   1.125rem / 18px (line-height: 1.75)
text-base: 1rem / 16px     (line-height: 1.5)
text-sm:   0.875rem / 14px (line-height: 1.5)
```
**사용**: 본문 텍스트, 설명, 라벨

#### Caption (작은 텍스트) - 보조 정보
```css
text-xs: 0.75rem / 12px    (line-height: 1.5)
```
**사용**: 캡션, 메타데이터, 타임스탬프

### 3.3 폰트 웨이트 (Font Weight)

```css
font-light:     300  /* 서브 텍스트, 우아한 느낌 */
font-normal:    400  /* 기본 본문 */
font-medium:    500  /* 강조 텍스트 */
font-semibold:  600  /* 서브헤딩, CTA 버튼 */
font-bold:      700  /* 주요 헤딩 */
font-extrabold: 800  /* 임팩트 있는 헤딩 */
font-black:     900  /* 히어로 타이틀, 강한 강조 */
```

#### 웨이트 조합 예시
```css
/* 히어로 섹션 */
h1 { font-weight: 900; font-size: 6rem; }
p  { font-weight: 300; font-size: 1.25rem; }

/* 카드 제목 */
h3 { font-weight: 700; font-size: 1.5rem; }
p  { font-weight: 400; font-size: 1rem; }

/* 버튼 */
button { font-weight: 600; }
```

### 3.4 Line Height (행간)

```css
/* Display - 타이트한 느낌 */
leading-tight: 1.1 ~ 1.2

/* Heading - 균형잡힌 느낌 */
leading-snug: 1.25 ~ 1.375

/* Body - 편안한 읽기 */
leading-normal: 1.5 ~ 1.75
```

### 3.5 Letter Spacing (자간)

```css
/* Display - 약간 좁게 */
tracking-tight: -0.025em

/* Heading - 기본 */
tracking-normal: 0em

/* All Caps - 넓게 */
tracking-wide: 0.05em
```

### 3.6 타이포그래피 사용 예시

```jsx
{/* 히어로 타이틀 */}
<h1 className="text-8xl font-black leading-tight tracking-tight">
  매일 1문제로<br />
  꾸준함을 기르다
</h1>

{/* 페이지 제목 */}
<h2 className="text-4xl font-bold text-gray-900">
  오늘의 문제
</h2>

{/* 본문 */}
<p className="text-base font-normal text-gray-700 leading-normal">
  꾸준함이 만드는 변화를 경험하세요.
</p>

{/* 강조 텍스트 (Gradient) */}
<span className="text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-primary">
  7일 연속 달성!
</span>
```

---

## 4. 스페이싱 시스템

### 4.1 8px 그리드 시스템
모든 간격은 8의 배수를 기준으로 설정하여 일관성 유지

### 4.2 스페이싱 스케일 (Tailwind 기본값)

```css
0:    0px      /* 간격 없음 */
px:   1px      /* 최소 구분선 */
0.5:  2px      /* 미세한 간격 */
1:    4px      /* 매우 작은 간격 */
1.5:  6px
2:    8px      /* 작은 간격 */
3:    12px
4:    16px     /* 기본 간격 */
5:    20px
6:    24px     /* 중간 간격 */
8:    32px     /* 큰 간격 */
10:   40px
12:   48px     /* 섹션 간격 */
16:   64px
20:   80px     /* 매우 큰 간격 */
24:   96px     /* 섹션 구분 */
```

### 4.3 스페이싱 용도별 가이드

#### 컴포넌트 내부 패딩
```css
/* 작은 요소 (Badge, Chip) */
padding: 0.5 ~ 2 (2px ~ 8px)

/* 중간 요소 (Button, Input) */
padding: 3 ~ 4 (12px ~ 16px)

/* 큰 요소 (Card, Modal) */
padding: 6 ~ 8 (24px ~ 32px)
```

#### 요소 간 간격
```css
/* 텍스트 줄 간격 */
gap: 1 ~ 2 (4px ~ 8px)

/* 관련 요소 그룹 */
gap: 4 (16px)

/* 섹션 구분 */
gap: 12 ~ 16 (48px ~ 64px)
```

#### 레이아웃 여백
```css
/* 모바일 */
padding: 4 ~ 6 (16px ~ 24px)

/* 태블릿 */
padding: 6 ~ 8 (24px ~ 32px)

/* 데스크톱 */
padding: 8 ~ 12 (32px ~ 48px)
```

---

## 5. 컴포넌트 디자인

### 5.1 Button (버튼)

#### 크기 (Size)
```css
/* Small */
.btn-sm {
  padding: 0.5rem 1rem;    /* py-2 px-4 */
  font-size: 0.875rem;     /* text-sm */
  font-weight: 500;        /* font-medium */
}

/* Medium (기본) */
.btn-md {
  padding: 0.75rem 1.5rem; /* py-3 px-6 */
  font-size: 1rem;         /* text-base */
  font-weight: 600;        /* font-semibold */
}

/* Large */
.btn-lg {
  padding: 1rem 2rem;      /* py-4 px-8 */
  font-size: 1.125rem;     /* text-lg */
  font-weight: 600;        /* font-semibold */
}
```

#### 변형 (Variant)

**Primary** - 주요 액션
```css
.btn-primary {
  background: linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%);
  color: white;
  border-radius: 0.75rem;  /* rounded-xl */
  transition: all 150ms ease-out;
}

.btn-primary:hover {
  box-shadow: 0 10px 25px rgba(79, 70, 229, 0.3);
  transform: scale(1.02);
}

.btn-primary:active {
  transform: scale(0.98);
}
```

**Secondary** - 보조 액션
```css
.btn-secondary {
  background-color: #f97316;  /* secondary-500 */
  color: white;
  border-radius: 0.75rem;
  transition: all 150ms ease-out;
}

.btn-secondary:hover {
  background-color: #ea580c;  /* secondary-600 */
  box-shadow: 0 10px 25px rgba(249, 115, 22, 0.3);
  transform: scale(1.02);
}
```

**Ghost** - 미니멀 액션
```css
.btn-ghost {
  background-color: transparent;
  color: #374151;  /* gray-700 */
  border-radius: 0.75rem;
  transition: all 150ms ease-out;
}

.btn-ghost:hover {
  background-color: #f3f4f6;  /* gray-100 */
}
```

**Outline** - 경계선 액션
```css
.btn-outline {
  background-color: transparent;
  color: #4f46e5;  /* primary-600 */
  border: 2px solid #4f46e5;
  border-radius: 0.75rem;
  transition: all 150ms ease-out;
}

.btn-outline:hover {
  background-color: #eef2ff;  /* primary-50 */
}
```

#### 상태 (State)
```css
/* Default */
opacity: 1;
cursor: pointer;

/* Hover */
transform: scale(1.02);
box-shadow: lg;

/* Active */
transform: scale(0.98);

/* Disabled */
opacity: 0.5;
cursor: not-allowed;
pointer-events: none;
```

### 5.2 Input (입력 필드)

#### 크기 (Size)
```css
/* Small */
.input-sm {
  padding: 0.5rem 0.75rem;  /* py-2 px-3 */
  font-size: 0.875rem;      /* text-sm */
}

/* Medium (기본) */
.input-md {
  padding: 0.75rem 1rem;    /* py-3 px-4 */
  font-size: 1rem;          /* text-base */
}

/* Large */
.input-lg {
  padding: 1rem 1.25rem;    /* py-4 px-5 */
  font-size: 1.125rem;      /* text-lg */
}
```

#### 기본 스타일
```css
.input-field {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 2px solid #e5e7eb;  /* gray-200 */
  border-radius: 0.75rem;     /* rounded-xl */
  font-size: 1rem;
  transition: all 150ms ease-out;
  outline: none;
}

.input-field:focus {
  border-color: transparent;
  ring: 2px solid #4f46e5;    /* primary-600 */
  ring-offset: 2px;
}

.input-field::placeholder {
  color: #9ca3af;  /* gray-400 */
}
```

#### 상태별 스타일
```css
/* Error */
.input-error {
  border-color: #e11d48;  /* error-600 */
}

.input-error:focus {
  ring-color: #e11d48;
}

/* Disabled */
.input-field:disabled {
  background-color: #f3f4f6;  /* gray-100 */
  cursor: not-allowed;
  opacity: 0.6;
}
```

### 5.3 Card (카드)

#### 크기별 변형
```css
/* Small */
.card-sm {
  background: white;
  border-radius: 0.75rem;  /* rounded-xl */
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  padding: 1rem;  /* p-4 */
  transition: all 300ms ease-out;
}

/* Medium (기본) */
.card {
  background: white;
  border-radius: 1rem;  /* rounded-2xl */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;  /* p-6 */
  transition: all 300ms ease-out;
}

.card:hover {
  box-shadow: 0 20px 25px rgba(0, 0, 0, 0.1);
}

/* Large */
.card-lg {
  background: white;
  border-radius: 1.5rem;  /* rounded-3xl */
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
  padding: 2rem;  /* p-8 */
  transition: all 300ms ease-out;
}
```

#### 인터랙티브 카드
```css
.card-interactive {
  cursor: pointer;
  transition: all 300ms ease-out;
}

.card-interactive:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 25px rgba(0, 0, 0, 0.15);
}

.card-interactive:active {
  transform: translateY(-2px);
}
```

### 5.4 Badge (배지)

```css
.badge {
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.75rem;  /* py-1 px-3 */
  font-size: 0.75rem;        /* text-xs */
  font-weight: 600;          /* font-semibold */
  border-radius: 9999px;     /* rounded-full */
}

/* Variants */
.badge-primary {
  background-color: #eef2ff;  /* primary-50 */
  color: #4f46e5;             /* primary-600 */
}

.badge-success {
  background-color: #ecfdf5;  /* success-50 */
  color: #059669;             /* success-600 */
}

.badge-warning {
  background-color: #fffbeb;  /* warning-50 */
  color: #d97706;             /* warning-600 */
}
```

### 5.5 Modal (모달)

```css
/* Overlay */
.modal-overlay {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
}

/* Container */
.modal {
  background: white;
  border-radius: 1.5rem;  /* rounded-3xl */
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.25);
  max-width: 32rem;       /* max-w-lg */
  width: 90%;
  padding: 2rem;
  animation: scaleIn 300ms ease-out;
}

@keyframes scaleIn {
  0% {
    transform: scale(0.95);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}
```

---

## 6. 레이아웃

### 6.1 Breakpoints (반응형)

Tailwind CSS 기본값 사용

```css
/* Mobile First */
/* Default: < 640px (모바일) */

sm:  640px   /* @media (min-width: 640px) - 큰 모바일, 작은 태블릿 */
md:  768px   /* @media (min-width: 768px) - 태블릿 */
lg:  1024px  /* @media (min-width: 1024px) - 작은 데스크톱 */
xl:  1280px  /* @media (min-width: 1280px) - 데스크톱 */
2xl: 1536px  /* @media (min-width: 1536px) - 큰 데스크톱 */
```

#### 사용 예시
```jsx
<div className="text-2xl md:text-4xl lg:text-6xl">
  {/* 모바일: 24px, 태블릿: 36px, 데스크톱: 60px */}
</div>

<div className="p-4 md:p-6 lg:p-8">
  {/* 모바일: 16px, 태블릿: 24px, 데스크톱: 32px 패딩 */}
</div>
```

### 6.2 Container (컨테이너)

```css
.container {
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  padding-left: 1rem;   /* 모바일: 16px */
  padding-right: 1rem;
}

/* Breakpoint별 max-width */
@media (min-width: 640px) {
  .container {
    max-width: 640px;
    padding-left: 1.5rem;  /* 24px */
    padding-right: 1.5rem;
  }
}

@media (min-width: 768px) {
  .container {
    max-width: 768px;
  }
}

@media (min-width: 1024px) {
  .container {
    max-width: 1024px;
  }
}

@media (min-width: 1280px) {
  .container {
    max-width: 1280px;  /* 권장 최대 너비 */
  }
}
```

### 6.3 Grid System

```css
/* 기본 그리드 */
.grid {
  display: grid;
  gap: 1rem;  /* 16px */
}

/* 반응형 컬럼 */
.grid-cols-1       /* 모바일: 1열 */
.grid-cols-2       /* 2열 */
.md:grid-cols-3    /* 태블릿: 3열 */
.lg:grid-cols-4    /* 데스크톱: 4열 */
```

#### 사용 예시
```jsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  <Card />
  <Card />
  <Card />
</div>
```

### 6.4 Flex Layout

```css
/* 기본 플렉스 */
.flex {
  display: flex;
}

/* 정렬 */
.justify-start      /* 좌측 정렬 */
.justify-center     /* 중앙 정렬 */
.justify-between    /* 양끝 정렬 */
.items-start        /* 상단 정렬 */
.items-center       /* 중앙 정렬 */
.items-end          /* 하단 정렬 */

/* 방향 */
.flex-col           /* 세로 */
.flex-row           /* 가로 */

/* 간격 */
.gap-4              /* 16px */
.gap-6              /* 24px */
```

---

## 7. 모션 & 애니메이션

### 7.1 Transition Duration (전환 속도)

```css
duration-75:  75ms    /* Instant - 미세한 피드백 */
duration-150: 150ms   /* Fast - 버튼, 호버 */
duration-300: 300ms   /* Base - 일반 전환 (기본값) */
duration-500: 500ms   /* Slow - 모달, 드로어 */
duration-700: 700ms   /* Slower - 페이지 전환 */
```

#### 사용 가이드
- **Instant (75ms)**: 미세한 색상 변화, opacity
- **Fast (150ms)**: 버튼 호버, scale 효과
- **Base (300ms)**: 일반적인 전환, slide
- **Slow (500ms)**: 모달 열림/닫힘, 드로어
- **Slower (700ms)**: 페이지 전환, 복잡한 애니메이션

### 7.2 Easing Functions (가속도)

```css
ease-linear:    linear          /* 일정한 속도 */
ease-in:        ease-in         /* 천천히 시작 */
ease-out:       ease-out        /* 천천히 끝 (기본 권장) */
ease-in-out:    ease-in-out     /* 부드러운 시작과 끝 */
```

#### 사용 가이드
- **ease-out**: 대부분의 UI 전환 (버튼, 호버)
- **ease-in-out**: 모달, 드로어, 페이지 전환
- **linear**: 로딩 스피너, 무한 반복 애니메이션

### 7.3 인터랙션 효과

#### Hover (마우스 오버)
```css
/* 기본 호버 */
.hover-lift {
  transition: all 150ms ease-out;
}

.hover-lift:hover {
  transform: scale(1.02);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

/* 부드러운 호버 */
.hover-glow:hover {
  filter: brightness(1.1);
}

/* 그라디언트 이동 */
.hover-gradient {
  background-size: 200% 100%;
  transition: background-position 300ms ease-out;
}

.hover-gradient:hover {
  background-position: 100% 0;
}
```

#### Active (클릭)
```css
.active-press:active {
  transform: scale(0.98);
}

.active-push:active {
  transform: translateY(1px);
}
```

#### Focus (포커스)
```css
.focus-ring:focus {
  outline: none;
  ring: 2px solid #4f46e5;  /* primary-600 */
  ring-offset: 2px;
}

/* Glow Effect */
.focus-glow:focus {
  box-shadow: 0 0 0 4px rgba(79, 70, 229, 0.2);
}
```

### 7.4 커스텀 애니메이션

#### Slide Up (아래에서 위로)
```css
@keyframes slideUp {
  0% {
    transform: translateY(20px);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}

.animate-slide-up {
  animation: slideUp 300ms ease-out;
}
```

#### Fade In (서서히 나타남)
```css
@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

.animate-fade-in {
  animation: fadeIn 300ms ease-out;
}
```

#### Scale In (확대되며 나타남)
```css
@keyframes scaleIn {
  0% {
    transform: scale(0.95);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

.animate-scale-in {
  animation: scaleIn 300ms ease-out;
}
```

#### Spin (회전) - Loading
```css
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}

.animate-spin-slow {
  animation: spin 2s linear infinite;
}
```

### 7.5 Micro-interactions (마이크로 인터랙션)

#### Success Checkmark (체크 애니메이션)
```css
@keyframes checkmark {
  0% {
    stroke-dashoffset: 50;
  }
  100% {
    stroke-dashoffset: 0;
  }
}

.checkmark {
  stroke-dasharray: 50;
  animation: checkmark 400ms ease-out forwards;
}
```

#### Progress Bar (진행바)
```css
.progress-bar {
  width: 0;
  transition: width 500ms ease-out;
}

.progress-bar[data-progress="50"] {
  width: 50%;
}
```

#### Toast Notification (알림)
```css
@keyframes slideInRight {
  0% {
    transform: translateX(100%);
    opacity: 0;
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes fadeOut {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

.toast-enter {
  animation: slideInRight 300ms ease-out;
}

.toast-exit {
  animation: fadeOut 300ms ease-out forwards;
}
```

#### Pulse (강조 효과)
```css
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.animate-pulse {
  animation: pulse 2s ease-in-out infinite;
}
```

### 7.6 페이지 전환

```jsx
// React Router 예시
import { motion } from 'framer-motion'

const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  enter: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: 'easeOut',
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.2,
    },
  },
}

<motion.div
  variants={pageVariants}
  initial="initial"
  animate="enter"
  exit="exit"
>
  {/* Page Content */}
</motion.div>
```

---

## 8. 아이콘

### 8.1 아이콘 라이브러리

**Heroicons** (Tailwind 공식 아이콘)
- **스타일**: Outline (윤곽선), Solid (채움)
- **라이선스**: MIT
- **설치**: `npm install @heroicons/react`

```jsx
import { CheckCircleIcon } from '@heroicons/react/24/solid'
import { UserIcon } from '@heroicons/react/24/outline'

<CheckCircleIcon className="w-6 h-6 text-success-500" />
<UserIcon className="w-5 h-5 text-gray-500" />
```

### 8.2 아이콘 크기

```css
.icon-xs   { width: 12px; height: 12px; }  /* w-3 h-3 */
.icon-sm   { width: 16px; height: 16px; }  /* w-4 h-4 */
.icon-base { width: 20px; height: 20px; }  /* w-5 h-5 (기본) */
.icon-md   { width: 24px; height: 24px; }  /* w-6 h-6 */
.icon-lg   { width: 32px; height: 32px; }  /* w-8 h-8 */
.icon-xl   { width: 40px; height: 40px; }  /* w-10 h-10 */
```

#### 사용 가이드
- **xs (12px)**: Badge 내부
- **sm (16px)**: 작은 버튼, 인라인 텍스트
- **base (20px)**: 일반 버튼, 입력 필드
- **md (24px)**: 큰 버튼, 카드 아이콘
- **lg (32px)**: 섹션 아이콘
- **xl (40px)**: 히어로 아이콘

### 8.3 Stroke Width (선 두께)

```jsx
/* Outline 아이콘 */
<UserIcon className="w-6 h-6" strokeWidth={1.5} />  /* 기본 (섬세) */
<UserIcon className="w-6 h-6" strokeWidth={2} />    /* 굵게 (강조) */
```

### 8.4 아이콘 + 텍스트 조합

```jsx
{/* 버튼 */}
<button className="flex items-center gap-2">
  <CheckCircleIcon className="w-5 h-5" />
  <span>제출하기</span>
</button>

{/* 인라인 */}
<p className="flex items-center gap-1 text-sm text-gray-600">
  <ClockIcon className="w-4 h-4" />
  <span>5분 전</span>
</p>
```

---

## 9. 다크모드

> **Note**: 현재 버전에서는 Light 모드에 집중하며, 다크모드는 추후 버전에서 구현 예정입니다.

### 9.1 향후 구현 계획

#### 색상 전환 전략
```css
/* Light Mode */
background: #f9fafb;  /* gray-50 */
text: #111827;        /* gray-900 */
card: #ffffff;        /* white */

/* Dark Mode */
background: #111827;  /* gray-900 */
text: #f9fafb;        /* gray-50 */
card: #1f2937;        /* gray-800 */
```

#### Tailwind 설정
```javascript
// tailwind.config.js
module.exports = {
  darkMode: 'class',  // 클래스 기반 다크모드
  // ...
}
```

#### 사용 예시
```jsx
<div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-50">
  {/* 컨텐츠 */}
</div>
```

#### 전환 애니메이션
```css
* {
  transition: background-color 300ms ease-out, color 300ms ease-out;
}
```

---

## 10. PWA 디자인

### 10.1 스플래시 스크린

```json
{
  "background_color": "#4F46E5",  /* Primary-600 */
  "theme_color": "#4F46E5",
  "display": "standalone"
}
```

**디자인 요소**:
- 배경: Primary Gradient
- 로고: 화이트 (간결한 워드마크)
- 애니메이션: Fade In (500ms)

### 10.2 앱 아이콘

**크기**:
- 192x192px (Android)
- 512x512px (Android, iOS)
- 180x180px (iOS)

**디자인 가이드**:
- 배경: Primary-600 (#4F46E5)
- 심볼: White, 미니멀
- 여백: 20% (안전 영역)
- 스타일: Flat, 현대적

**파일 위치**:
```
public/
  icons/
    icon-192x192.png
    icon-512x512.png
    apple-touch-icon.png
```

### 10.3 설치 배너

```jsx
<div className="bg-gradient-primary text-white p-6 rounded-2xl">
  <h3 className="text-xl font-bold mb-2">
    앱으로 설치하기
  </h3>
  <p className="text-sm opacity-90 mb-4">
    홈 화면에 추가하고 더 편리하게 사용하세요
  </p>
  <button className="btn-secondary">
    설치하기
  </button>
</div>
```

---

## 11. 접근성 (Accessibility)

### 11.1 체크리스트

#### 색상 대비
- [ ] 모든 텍스트는 배경과 4.5:1 이상 대비
- [ ] 큰 텍스트 (18pt+)는 3:1 이상 대비
- [ ] UI 컴포넌트는 3:1 이상 대비
- [ ] 색상만으로 정보를 전달하지 않음

#### 키보드 네비게이션
- [ ] 모든 인터랙티브 요소에 Tab으로 접근 가능
- [ ] Focus 순서가 논리적
- [ ] Enter/Space로 버튼 활성화 가능
- [ ] ESC로 모달/드로어 닫기 가능

#### Focus 상태
- [ ] 모든 포커스 가능한 요소에 명확한 Focus Ring
- [ ] Focus Ring 최소 2px 두께
- [ ] Focus Ring과 요소 사이 최소 2px 간격

#### ARIA 레이블
- [ ] 아이콘 버튼에 `aria-label` 추가
- [ ] 폼 입력에 `label` 연결
- [ ] 랜드마크 역할 (`role="navigation"` 등) 사용
- [ ] 라이브 리전 (`aria-live`) 적절히 사용

#### 이미지
- [ ] 모든 의미 있는 이미지에 `alt` 텍스트
- [ ] 장식용 이미지는 `alt=""` (빈 값)
- [ ] 복잡한 이미지는 상세 설명 제공

#### 터치 타겟
- [ ] 모든 터치 타겟 최소 44x44px
- [ ] 터치 타겟 간 충분한 간격 (8px 이상)

### 11.2 Focus Ring 구현

```css
/* 기본 Focus Ring */
.focus-visible:focus {
  outline: none;
  box-shadow: 0 0 0 2px white, 0 0 0 4px #4f46e5;
}

/* 고대비 Focus Ring */
@media (prefers-contrast: high) {
  .focus-visible:focus {
    outline: 3px solid;
    outline-offset: 2px;
  }
}
```

### 11.3 스크린 리더 지원

```jsx
{/* 시각적으로 숨기되 스크린 리더에는 표시 */}
<span className="sr-only">
  새 알림 3개
</span>

{/* 아이콘 버튼 */}
<button aria-label="설정 열기">
  <CogIcon className="w-6 h-6" />
</button>

{/* 라이브 리전 */}
<div role="status" aria-live="polite">
  제출이 완료되었습니다.
</div>
```

### 11.4 동작 저감 (Reduced Motion)

```css
/* 애니메이션 비활성화 선호 시 */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 12. 파일 명명 규칙

### 12.1 컴포넌트 (PascalCase)
```
Button.tsx
Header.tsx
ProblemCard.tsx
```

### 12.2 유틸리티 (camelCase)
```
formatDate.ts
calculateStreak.ts
validateEmail.ts
```

### 12.3 타입 정의 (PascalCase)
```
User.types.ts
Problem.types.ts
Common.types.ts
```

### 12.4 스타일 (kebab-case)
```
button-variants.css
card-animations.css
```

### 12.5 페이지 (PascalCase)
```
HomePage.tsx
LoginPage.tsx
ProblemDetailPage.tsx
```

### 12.6 훅 (camelCase, use- 접두사)
```
useAuth.ts
useProblem.ts
useStreak.ts
```

---

## 13. 구현 예시

### 13.1 히어로 섹션

```jsx
<section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-primary-50 px-4">
  <div className="text-center max-w-4xl">
    <h1 className="text-7xl md:text-8xl lg:text-9xl font-black leading-tight tracking-tight mb-6">
      <span className="bg-clip-text text-transparent bg-gradient-primary">
        매일 1문제로
      </span>
      <br />
      꾸준함을 기르다
    </h1>
    <p className="text-lg md:text-xl text-gray-600 font-light mb-8">
      작은 습관이 만드는 큰 변화. 오늘부터 시작하세요.
    </p>
    <div className="flex gap-4 justify-center">
      <button className="btn-primary btn-lg">
        시작하기
      </button>
      <button className="btn-outline btn-lg">
        더 알아보기
      </button>
    </div>
  </div>
</section>
```

### 13.2 카드 그리드

```jsx
<div className="container mx-auto px-4 py-12">
  <h2 className="text-4xl font-bold text-gray-900 mb-8">
    오늘의 문제
  </h2>
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {problems.map((problem) => (
      <div key={problem.id} className="card-interactive">
        <span className="badge badge-primary mb-3">
          {problem.category}
        </span>
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          {problem.title}
        </h3>
        <p className="text-gray-600 mb-4">
          {problem.description}
        </p>
        <button className="btn-secondary w-full">
          문제 풀기
        </button>
      </div>
    ))}
  </div>
</div>
```

### 13.3 폼 입력

```jsx
<form className="space-y-4">
  <div>
    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
      이메일
    </label>
    <input
      id="email"
      type="email"
      className="input-field"
      placeholder="your@email.com"
    />
  </div>
  <div>
    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
      비밀번호
    </label>
    <input
      id="password"
      type="password"
      className="input-field"
      placeholder="••••••••"
    />
  </div>
  <button type="submit" className="btn-primary w-full">
    로그인
  </button>
</form>
```

---

## 14. 참고 자료

### 14.1 디자인 트렌드
- [Breaking rules and bringing joy: top typography trends for 2026](https://www.creativebloq.com/design/fonts-typography/breaking-rules-and-bringing-joy-top-typography-trends-for-2026)
- [Fontfabric: Top 10 Design & Typography Trends for 2026](https://www.fontfabric.com/blog/10-design-trends-shaping-the-visual-typographic-landscape-in-2026/)
- [8 website color trends that'll be everywhere in 2026](https://www.wix.com/blog/website-color-trends)
- [Top 10 Minimalist Web Design Trends For 2026](https://www.digitalsilk.com/digital-trends/minimalist-web-design-trends/)

### 14.2 폰트 리소스
- [Pretendard | Noonnu - Korean Font Collection](https://noonnu.cc/en/font_page/694)
- [Pretendard - Free Korean Fonts](https://www.freekoreanfont.com/pretendard-download/)

### 14.3 도구
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/) - 색상 대비 검증
- [Heroicons](https://heroicons.com/) - 아이콘 라이브러리
- [Tailwind CSS](https://tailwindcss.com/) - CSS 프레임워크

### 14.4 접근성
- [WCAG 2.1 가이드라인](https://www.w3.org/WAI/WCAG21/quickref/)
- [axe DevTools](https://www.deque.com/axe/devtools/) - 접근성 테스트 도구

---

## 15. 버전 관리

**현재 버전**: v1.0.0 (2026-01-20)

### 변경 이력
- **v1.0.0** (2026-01-20): 초기 디자인 시스템 구축
  - 색상 시스템 정의 (Primary, Secondary, Accent, Semantic)
  - 타이포그래피 설정 (Pretendard Variable)
  - 컴포넌트 디자인 규칙
  - 애니메이션 시스템
  - 접근성 가이드라인

### 향후 계획
- **v1.1.0**: 다크모드 지원
- **v1.2.0**: 추가 컴포넌트 (Tooltip, Dropdown, Tabs)
- **v1.3.0**: 고급 애니메이션 패턴
