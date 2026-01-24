import { useState } from 'react';

interface NotificationPermissionBannerProps {
  onEnable: () => Promise<void>;
  onDismiss: () => void;
}

export const NotificationPermissionBanner: React.FC<NotificationPermissionBannerProps> = ({
  onEnable,
  onDismiss,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleEnable = async () => {
    setIsLoading(true);
    try {
      await onEnable();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-20 sm:bottom-6 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-50 animate-slide-in-up">
      <div className="bg-gradient-to-r from-haru-500 to-haru-600 rounded-2xl shadow-premium-lg border border-haru-400/20 overflow-hidden">
        <div className="p-5">
          <div className="flex items-start gap-3 mb-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="text-white font-bold text-base mb-1">알림을 받으시겠어요?</h3>
              <p className="text-haru-50 text-sm leading-relaxed">
                매일 오전 9시에 새로운 문제를 알려드려요. 꾸준한 학습을 위해 알림을 켜주세요!
              </p>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={onDismiss}
              className="flex-1 px-4 py-2.5 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm font-medium hover:bg-white/20 transition-all"
              disabled={isLoading}
            >
              나중에
            </button>
            <button
              onClick={handleEnable}
              disabled={isLoading}
              className="flex-1 px-4 py-2.5 rounded-xl bg-white text-haru-600 text-sm font-bold hover:bg-white/90 transition-all disabled:opacity-50"
            >
              {isLoading ? '처리 중...' : '알림 받기'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
