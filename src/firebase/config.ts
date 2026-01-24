import { initializeApp, FirebaseApp } from 'firebase/app';
import { getMessaging, Messaging } from 'firebase/messaging';

// Firebase 설정 - 환경변수에서 가져오기
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Firebase 설정이 완전한지 확인
const isFirebaseConfigured = (): boolean => {
  return !!(
    firebaseConfig.apiKey &&
    firebaseConfig.authDomain &&
    firebaseConfig.projectId &&
    firebaseConfig.storageBucket &&
    firebaseConfig.messagingSenderId &&
    firebaseConfig.appId
  );
};

// Firebase 앱 초기화 (설정이 있을 때만)
let app: FirebaseApp | null = null;
let messaging: Messaging | null = null;

if (isFirebaseConfigured()) {
  try {
    app = initializeApp(firebaseConfig);

    // Messaging 인스턴스 (브라우저에서만 사용 가능)
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      // Service Worker 등록
      navigator.serviceWorker
        .register('/firebase-messaging-sw.js')
        .then((registration) => {
          console.log('[Firebase] Service Worker registered:', registration);
          messaging = getMessaging(app);
        })
        .catch((error) => {
          console.error('[Firebase] Service Worker registration failed:', error);
        });
    }
    console.log('[Firebase] Firebase initialized successfully');
  } catch (error) {
    console.error('[Firebase] Failed to initialize Firebase:', error);
  }
} else {
  console.warn('[Firebase] Firebase configuration is incomplete. FCM features will be disabled.');
  console.warn('[Firebase] Please add Firebase configuration to .env file. See .env.example for details.');
}

export { app, messaging, isFirebaseConfigured };
