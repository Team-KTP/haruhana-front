import { useEffect, useState } from 'react';
import { useFCM } from '../../hooks/useFCM';
import { NotificationPermissionBanner } from '../common/NotificationPermissionBanner';
import { syncDeviceToken } from '../../api/fcm';
import { useAuth } from '../../hooks/useAuth';
import { logger } from '../../utils/logger';

const FCM_PERMISSION_DISMISSED_KEY = 'fcm_permission_dismissed';

export const FCMHandler: React.FC = () => {
  const { user } = useAuth();
  const { token, permission, isSupported, requestPermission } = useFCM();
  const [showBanner, setShowBanner] = useState(false);

  // 배너 표시 조건 확인
  useEffect(() => {
    logger.log('[FCMHandler] Banner display check:', {
      user: !!user,
      isSupported,
      permission,
      dismissed: sessionStorage.getItem(FCM_PERMISSION_DISMISSED_KEY),
    });

    if (!user || !isSupported) {
      logger.log('[FCMHandler] Banner blocked - user:', !!user, 'isSupported:', isSupported);
      return;
    }

    // 이미 권한이 허용되었거나 거부된 경우
    if (permission === 'granted' || permission === 'denied') {
      logger.log('[FCMHandler] Banner blocked - permission already decided:', permission);
      return;
    }

    // 사용자가 이전에 배너를 닫은 경우 (세션 스토리지 체크)
    const dismissed = sessionStorage.getItem(FCM_PERMISSION_DISMISSED_KEY);
    if (dismissed) {
      logger.log('[FCMHandler] Banner blocked - previously dismissed');
      return;
    }

    logger.log('[FCMHandler] Banner will be shown in 3 seconds...');
    // 로그인 후 3초 뒤에 배너 표시
    const timer = setTimeout(() => {
      logger.log('[FCMHandler] Showing banner now!');
      setShowBanner(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, [user, isSupported, permission]);

  // 토큰이 생성되면 백엔드로 전송
  useEffect(() => {
    if (token && user) {
      const savedToken = localStorage.getItem('fcm_token');

      logger.log('[FCM] Token generated:', token.substring(0, 20) + '...');
      logger.log('[FCM] User:', user.nickname);

      // 토큰이 변경되었거나 저장된 토큰이 없는 경우에만 전송
      if (savedToken !== token) {
        logger.log('[FCM] Sending token to backend...');
        syncDeviceToken(token)
          .then(() => {
            logger.log('[FCM] Device token synced successfully');
            // 로컬 스토리지에 저장 (재전송 방지)
            localStorage.setItem('fcm_token', token);
          })
          .catch((error) => {
            logger.error('[FCM] Failed to sync device token:', error.message);
          });
      } else {
        logger.log('[FCM] Token already synced, skipping');
      }
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
