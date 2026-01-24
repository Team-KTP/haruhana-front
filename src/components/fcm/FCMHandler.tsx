import { useEffect, useState } from 'react';
import { useFCM } from '../../hooks/useFCM';
import { NotificationPermissionBanner } from '../common/NotificationPermissionBanner';
import { syncDeviceToken } from '../../api/fcm';
import { useAuth } from '../../hooks/useAuth';

const FCM_PERMISSION_DISMISSED_KEY = 'fcm_permission_dismissed';

export const FCMHandler: React.FC = () => {
  const { user } = useAuth();
  const { token, permission, isSupported, requestPermission } = useFCM();
  const [showBanner, setShowBanner] = useState(false);

  // 배너 표시 조건 확인
  useEffect(() => {
    console.log('[FCMHandler] Banner display check:', {
      user: !!user,
      isSupported,
      permission,
      dismissed: sessionStorage.getItem(FCM_PERMISSION_DISMISSED_KEY),
    });

    if (!user || !isSupported) {
      console.log('[FCMHandler] Banner blocked - user:', !!user, 'isSupported:', isSupported);
      return;
    }

    // 이미 권한이 허용되었거나 거부된 경우
    if (permission === 'granted' || permission === 'denied') {
      console.log('[FCMHandler] Banner blocked - permission already decided:', permission);
      return;
    }

    // 사용자가 이전에 배너를 닫은 경우 (세션 스토리지 체크)
    const dismissed = sessionStorage.getItem(FCM_PERMISSION_DISMISSED_KEY);
    if (dismissed) {
      console.log('[FCMHandler] Banner blocked - previously dismissed');
      return;
    }

    console.log('[FCMHandler] Banner will be shown in 3 seconds...');
    // 로그인 후 3초 뒤에 배너 표시
    const timer = setTimeout(() => {
      console.log('[FCMHandler] Showing banner now!');
      setShowBanner(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, [user, isSupported, permission]);

  // 토큰이 생성되면 백엔드로 전송
  useEffect(() => {
    if (token && user) {
      const savedToken = localStorage.getItem('fcm_token');

      console.log('[FCM] Token generated:', token);
      console.log('[FCM] Saved token:', savedToken);
      console.log('[FCM] User:', user);

      // 토큰이 변경되었거나 저장된 토큰이 없는 경우에만 전송
      if (savedToken !== token) {
        console.log('[FCM] Sending token to backend...');
        syncDeviceToken(token)
          .then(() => {
            console.log('[FCM] ✅ Device token synced successfully to backend');
            // 로컬 스토리지에 저장 (재전송 방지)
            localStorage.setItem('fcm_token', token);
          })
          .catch((error) => {
            console.error('[FCM] ❌ Failed to sync device token:', error);
            console.error('[FCM] Error details:', {
              message: error.message,
              response: error.response?.data,
              status: error.response?.status,
            });
          });
      } else {
        console.log('[FCM] Token already synced, skipping');
      }
    } else {
      console.log('[FCM] Conditions not met - token:', !!token, 'user:', !!user);
    }
  }, [token, user]);

  const handleEnable = async () => {
    await requestPermission();
    setShowBanner(false);
  };

  const handleDismiss = () => {
    setShowBanner(false);
    // 이번 세션에서는 더 이상 표시하지 않음
    sessionStorage.setItem(FCM_PERMISSION_DISMISSED_KEY, 'true');
  };

  if (!showBanner) {
    return null;
  }

  return <NotificationPermissionBanner onEnable={handleEnable} onDismiss={handleDismiss} />;
};
