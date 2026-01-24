# Firebase FCM 빠른 시작 가이드

## ⚠️ 현재 상태
Firebase 설정이 `.env` 파일에 없어서 FCM 기능이 **비활성화** 상태입니다.

## 🚀 FCM 활성화 단계

### 1. Firebase 프로젝트 생성 (5분)

1. [Firebase Console](https://console.firebase.google.com/) 접속
2. "프로젝트 추가" 클릭
3. 프로젝트 이름 입력: `careerhub` (또는 원하는 이름)
4. Google Analytics: **사용 안 함** 선택 (빠른 설정)
5. "프로젝트 만들기" 클릭

### 2. 웹 앱 추가 (2분)

1. Firebase Console → 프로젝트 설정 (톱니바퀴 아이콘)
2. "앱 추가" → **웹(</>)** 선택
3. 앱 닉네임: `careerhub-web`
4. Firebase SDK 구성 정보 화면에서 **설정 복사**

   ```javascript
   const firebaseConfig = {
     apiKey: "AIza....",           // ← 이 값들 복사
     authDomain: "...",
     projectId: "...",
     storageBucket: "...",
     messagingSenderId: "...",
     appId: "..."
   };
   ```

### 3. VAPID 키 생성 (1분)

1. Firebase Console → 프로젝트 설정 → **Cloud Messaging** 탭
2. "웹 푸시 인증서" 섹션으로 스크롤
3. "키 쌍 생성" 버튼 클릭
4. 생성된 키 복사 (예: `BKxxx...`)

### 4. 환경변수 설정 (1분)

`.env` 파일을 열고 다음 내용 추가:

```bash
VITE_API_URL=http://localhost:8080
VITE_APP_NAME=HaruHaru

# Firebase Configuration (위에서 복사한 값들 붙여넣기)
VITE_FIREBASE_API_KEY=AIzaSy...
VITE_FIREBASE_AUTH_DOMAIN=careerhub-xxxxx.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=careerhub-xxxxx
VITE_FIREBASE_STORAGE_BUCKET=careerhub-xxxxx.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:xxxxx
VITE_FIREBASE_VAPID_KEY=BKxxx...
```

### 5. Service Worker 설정 (1분)

`public/firebase-messaging-sw.js` 파일을 열고 `firebaseConfig` 부분을 같은 값으로 교체:

```javascript
const firebaseConfig = {
  apiKey: 'AIzaSy...',              // .env와 같은 값
  authDomain: 'careerhub-xxxxx.firebaseapp.com',
  projectId: 'careerhub-xxxxx',
  storageBucket: 'careerhub-xxxxx.appspot.com',
  messagingSenderId: '123456789',
  appId: '1:123456789:web:xxxxx',
};
```

### 6. 개발 서버 재시작 (필수!)

```bash
# 현재 서버 종료 (Ctrl+C)
npm run dev
```

## ✅ 테스트

1. 브라우저에서 `http://localhost:5173` 접속
2. 로그인
3. 3초 후 알림 권한 요청 배너 확인
4. "알림 받기" 클릭
5. 브라우저 콘솔 확인:
   ```
   [Firebase] Firebase initialized successfully
   [FCM] Token generated: xxx...
   [FCM] ✅ Device token synced successfully to backend
   ```

## 🔍 문제 해결

### "Firebase not configured" 경고가 계속 뜨는 경우
- ✅ `.env` 파일이 프로젝트 루트에 있는지 확인
- ✅ 모든 환경변수가 `VITE_` 접두사로 시작하는지 확인
- ✅ 개발 서버를 **재시작**했는지 확인

### 알림 권한 배너가 안 뜨는 경우
- ✅ 로그인되어 있는지 확인
- ✅ 3초 기다리기
- ✅ 이미 권한을 허용했다면 배너가 안 뜹니다 (정상)

### 토큰이 백엔드로 안 가는 경우
- ✅ Network 탭에서 `PATCH /v1/members/devices` 요청 확인
- ✅ 로그인 토큰이 localStorage에 있는지 확인
- ✅ 백엔드 서버가 실행 중인지 확인

## 📚 더 자세한 문서

전체 문서는 [`docs/FCM_SETUP.md`](docs/FCM_SETUP.md) 참고

---

## ⏭️ 지금 당장은 FCM 없이도 개발 가능

FCM 설정이 없어도 앱의 다른 기능들은 정상적으로 작동합니다.
알림 기능이 필요할 때 위 단계를 따라 설정하면 됩니다.
