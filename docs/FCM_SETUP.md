# Firebase Cloud Messaging (FCM) 설정 가이드

## 1. Firebase 프로젝트 생성

### 1.1 Firebase Console에서 프로젝트 생성
1. [Firebase Console](https://console.firebase.google.com/)에 접속
2. "프로젝트 추가" 클릭
3. 프로젝트 이름 입력 (예: HaruHaru)
4. Google Analytics 설정 (선택사항)
5. 프로젝트 생성 완료

### 1.2 웹 앱 추가
1. 프로젝트 설정으로 이동
2. "앱 추가" → "웹" 선택
3. 앱 닉네임 입력
4. Firebase SDK 구성 정보 확인 (나중에 사용)

## 2. Cloud Messaging 설정

### 2.1 Cloud Messaging 활성화
1. Firebase Console → 프로젝트 설정 → Cloud Messaging
2. "Cloud Messaging API (Legacy)" 활성화 (필요시)
3. FCM 등록 토큰 생성을 위한 설정 확인

### 2.2 웹 푸시 인증서 생성
1. 프로젝트 설정 → Cloud Messaging 탭
2. "웹 푸시 인증서" 섹션으로 이동
3. "키 쌍 생성" 클릭
4. 생성된 VAPID 키 복사 (환경변수에 사용)

## 3. 환경변수 설정

### 3.1 `.env` 파일 생성
프로젝트 루트에 `.env` 파일을 생성하고 Firebase 설정 정보를 입력합니다.

```bash
# API URL
VITE_API_URL=http://localhost:8080

# Firebase Configuration
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_VAPID_KEY=your_vapid_key_from_step_2.2
```

### 3.2 Service Worker 설정 업데이트
`public/firebase-messaging-sw.js` 파일에서 Firebase 설정을 업데이트합니다.

```javascript
const firebaseConfig = {
  apiKey: 'YOUR_API_KEY',
  authDomain: 'YOUR_AUTH_DOMAIN',
  projectId: 'YOUR_PROJECT_ID',
  storageBucket: 'YOUR_STORAGE_BUCKET',
  messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
  appId: 'YOUR_APP_ID',
};
```

## 4. 앱에 FCM 통합

### 4.1 FCMHandler 컴포넌트 추가
`App.tsx` 또는 메인 레이아웃에 FCMHandler를 추가합니다.

```tsx
import { FCMHandler } from './components/fcm/FCMHandler';

function App() {
  return (
    <>
      <Routes>
        {/* 라우트 설정 */}
      </Routes>
      <FCMHandler />
    </>
  );
}
```

### 4.2 Dashboard에서 사용 예시
```tsx
import { useFCM } from '../hooks/useFCM';

export default function Dashboard() {
  const { token, permission, requestPermission } = useFCM();

  // 토큰이 생성되면 자동으로 백엔드로 전송됨
  // FCMHandler 컴포넌트에서 처리

  return (
    // 대시보드 컨텐츠
  );
}
```

## 5. 백엔드 API 연동

### 5.1 API 엔드포인트
현재 백엔드에서 제공하는 디바이스 토큰 동기화 API:

```typescript
// FCM 디바이스 토큰 동기화 (등록/업데이트)
PATCH /v1/members/devices
Request: { deviceToken: string }
Response: 200 OK (void)
```

이 API는 로그인된 사용자의 FCM 토큰을 서버에 저장하거나 업데이트합니다.

### 5.2 백엔드에서 알림 전송
```typescript
// FCM Admin SDK 사용 예시 (Node.js)
import admin from 'firebase-admin';

const message = {
  notification: {
    title: '오늘의 문제가 도착했어요! 📚',
    body: '새로운 문제를 풀고 꾸준함을 이어가세요!',
  },
  data: {
    url: '/dashboard',
    tag: 'daily-problem',
  },
  token: userFcmToken, // 사용자의 FCM 토큰
};

await admin.messaging().send(message);
```

## 6. 테스트

### 6.1 로컬 테스트
1. `npm run dev`로 개발 서버 실행
2. 브라우저에서 `https://localhost:5173` 접속 (HTTPS 필요)
3. 로그인 후 알림 권한 요청 배너 확인
4. "알림 받기" 클릭하여 권한 허용
5. 브라우저 콘솔에서 FCM 토큰 확인

### 6.2 Firebase Console에서 테스트 알림 전송
1. Firebase Console → Cloud Messaging
2. "첫 번째 캠페인 만들기" → "알림 메시지"
3. 알림 제목과 내용 입력
4. "테스트 메시지 전송"
5. FCM 토큰 입력 (브라우저 콘솔에서 복사)
6. "테스트" 클릭

### 6.3 HTTPS 로컬 개발 환경 설정
Service Worker와 FCM은 HTTPS 환경에서만 작동합니다.

#### Vite HTTPS 설정
`vite.config.ts` 파일에 다음 추가:

```typescript
import { defineConfig } from 'vite';
import basicSsl from '@vitejs/plugin-basic-ssl';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      // PWA 설정
    }),
    basicSsl(), // HTTPS 활성화
  ],
});
```

설치:
```bash
npm install -D @vitejs/plugin-basic-ssl
```

## 7. 프로덕션 배포

### 7.1 프로덕션 환경변수 설정
배포 환경(Vercel, Netlify 등)에 환경변수를 설정합니다.

### 7.2 Service Worker 등록 확인
- HTTPS 환경에서만 작동
- `/firebase-messaging-sw.js`가 루트 경로에서 접근 가능해야 함

### 7.3 도메인 설정
Firebase Console → 프로젝트 설정 → 승인된 도메인에 프로덕션 도메인 추가

## 8. 문제 해결

### 8.1 알림이 표시되지 않는 경우
- 브라우저 알림 권한 확인
- HTTPS 연결 확인
- Service Worker 등록 상태 확인 (`chrome://serviceworker-internals/`)
- 브라우저 콘솔에서 에러 메시지 확인

### 8.2 FCM 토큰이 생성되지 않는 경우
- Firebase 설정 확인 (환경변수, Service Worker)
- VAPID 키 확인
- 브라우저 지원 확인 (Firefox, Chrome, Edge 등)

### 8.3 Service Worker 업데이트가 반영되지 않는 경우
- 브라우저 캐시 삭제
- Service Worker 강제 업데이트: `chrome://serviceworker-internals/`에서 Unregister

## 9. 보안 고려사항

### 9.1 환경변수 관리
- `.env` 파일을 `.gitignore`에 추가
- 프로덕션 환경에서는 환경변수를 안전하게 관리
- Firebase API 키는 공개되어도 안전하지만, 사용 제한 설정 권장

### 9.2 Firebase 보안 규칙
Firebase Console에서 적절한 보안 규칙을 설정하여 무단 액세스 방지

## 10. 참고 자료

- [Firebase Cloud Messaging 공식 문서](https://firebase.google.com/docs/cloud-messaging)
- [웹에서 FCM 메시지 수신](https://firebase.google.com/docs/cloud-messaging/js/receive)
- [Service Worker API](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)
- [Web Push API](https://developer.mozilla.org/en-US/docs/Web/API/Push_API)
