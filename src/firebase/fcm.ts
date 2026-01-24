import { getToken, onMessage, MessagePayload } from 'firebase/messaging';
import { messaging, isFirebaseConfigured } from './config';

// FCM 토큰 가져오기
export const getFCMToken = async (): Promise<string | null> => {
  if (!messaging || !isFirebaseConfigured()) {
    console.warn('[FCM] FCM is not available - Firebase not configured properly');
    return null;
  }

  try {
    // 알림 권한 요청
    const permission = await Notification.requestPermission();

    if (permission !== 'granted') {
      console.log('Notification permission denied');
      return null;
    }

    // FCM 토큰 가져오기
    const token = await getToken(messaging, {
      vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY,
    });

    if (token) {
      console.log('FCM Token:', token);
      return token;
    } else {
      console.log('No registration token available');
      return null;
    }
  } catch (error) {
    console.error('Error getting FCM token:', error);
    return null;
  }
};

// 포그라운드 메시지 리스너 설정
export const onForegroundMessage = (callback: (payload: MessagePayload) => void) => {
  if (!messaging || !isFirebaseConfigured()) {
    console.warn('[FCM] FCM is not available - Firebase not configured properly');
    return () => {};
  }

  return onMessage(messaging, (payload) => {
    console.log('Foreground message received:', payload);
    callback(payload);
  });
};

// 알림 표시 헬퍼 함수
export const showNotification = (title: string, options?: NotificationOptions) => {
  if ('Notification' in window && Notification.permission === 'granted') {
    const defaultOptions: NotificationOptions = {
      icon: '/icons/icon-192x192.svg',
      badge: '/icons/icon-192x192.svg',
      ...options,
    };
    new Notification(title, defaultOptions);
  }
};

// 알림 권한 확인
export const isNotificationSupported = (): boolean => {
  return 'Notification' in window && 'serviceWorker' in navigator;
};

// 알림 권한 상태 확인
export const getNotificationPermission = (): NotificationPermission => {
  if (!isNotificationSupported()) {
    return 'denied';
  }
  return Notification.permission;
};
