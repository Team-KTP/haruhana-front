import { useEffect, useState } from 'react';
import { MessagePayload } from 'firebase/messaging';
import { getFCMToken, onForegroundMessage, isNotificationSupported, getNotificationPermission } from '../firebase/fcm';

interface UseFCMReturn {
  token: string | null;
  permission: NotificationPermission;
  isSupported: boolean;
  requestPermission: () => Promise<string | null>;
  isLoading: boolean;
}

export const useFCM = (): UseFCMReturn => {
  const [token, setToken] = useState<string | null>(null);
  const [permission, setPermission] = useState<NotificationPermission>(getNotificationPermission());
  const [isLoading, setIsLoading] = useState(false);

  const isSupported = isNotificationSupported();

  // 토큰 요청 함수
  const requestPermission = async (): Promise<string | null> => {
    if (!isSupported) {
      console.warn('Push notifications are not supported in this browser');
      return null;
    }

    setIsLoading(true);
    try {
      const fcmToken = await getFCMToken();
      if (fcmToken) {
        setToken(fcmToken);
        setPermission('granted');

        // TODO: 백엔드로 토큰 전송
        // await sendTokenToBackend(fcmToken);
      } else {
        setPermission(getNotificationPermission());
      }
      return fcmToken;
    } catch (error) {
      console.error('Error requesting FCM permission:', error);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // 포그라운드 메시지 리스너 설정
  useEffect(() => {
    if (!isSupported || !token) return;

    console.log('[useFCM] Setting up foreground message listener');

    const unsubscribe = onForegroundMessage((payload: MessagePayload) => {
      console.log('[useFCM] Foreground message received:', payload);

      // 알림 표시
      if (payload.notification) {
        const { title, body, icon } = payload.notification;

        console.log('[useFCM] Displaying notification:', { title, body });

        // 브라우저 알림 표시
        if (Notification.permission === 'granted') {
          const notification = new Notification(title || '새 알림', {
            body: body || '',
            icon: icon || '/icons/icon-192x192.svg',
            badge: '/icons/icon-192x192.svg',
            data: payload.data,
            tag: payload.data?.tag || 'fcm-notification',
            requireInteraction: false,
          });

          // 알림 클릭 이벤트
          notification.onclick = () => {
            console.log('[useFCM] Notification clicked');
            window.focus();
            notification.close();

            // URL이 있으면 이동
            if (payload.data?.url) {
              window.location.href = payload.data.url;
            }
          };
        } else {
          console.warn('[useFCM] Notification permission not granted');
        }
      }

      // 커스텀 이벤트 발생 (앱 내에서 처리하고 싶은 경우)
      window.dispatchEvent(
        new CustomEvent('fcm-message', {
          detail: payload,
        })
      );
    });

    return () => {
      if (typeof unsubscribe === 'function') {
        unsubscribe();
      }
    };
  }, [isSupported, token]);

  // 앱 로드 시 권한 상태 확인
  useEffect(() => {
    if (isSupported) {
      setPermission(getNotificationPermission());

      // 이미 권한이 있으면 토큰 자동 가져오기
      if (getNotificationPermission() === 'granted' && !token) {
        requestPermission();
      }
    }
  }, [isSupported]);

  return {
    token,
    permission,
    isSupported,
    requestPermission,
    isLoading,
  };
};
