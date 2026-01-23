import React from 'react';
import { Button } from './Button';

interface ErrorModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  message: string;
  type?: 'error' | 'warning' | 'info';
}

export const ErrorModal: React.FC<ErrorModalProps> = ({
  isOpen,
  onClose,
  title,
  message,
  type = 'error',
}) => {
  if (!isOpen) return null;

  const iconMap = {
    error: (
      <svg className="w-12 h-12 sm:w-16 sm:h-16 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    warning: (
      <svg className="w-12 h-12 sm:w-16 sm:h-16 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
    ),
    info: (
      <svg className="w-12 h-12 sm:w-16 sm:h-16 text-haru-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  };

  const titleMap = {
    error: '오류가 발생했습니다',
    warning: '경고',
    info: '알림',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
      {/* 배경 오버레이 */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* 모달 콘텐츠 */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 sm:p-8 animate-scale-in">
        {/* 아이콘 */}
        <div className="flex justify-center mb-4">
          {iconMap[type]}
        </div>

        {/* 제목 */}
        <h2 className="text-xl sm:text-2xl font-bold text-slate-800 text-center mb-3">
          {title || titleMap[type]}
        </h2>

        {/* 메시지 */}
        <p className="text-sm sm:text-base text-slate-600 text-center mb-6 leading-relaxed whitespace-pre-wrap">
          {message}
        </p>

        {/* 버튼 */}
        <Button
          fullWidth
          size="lg"
          onClick={onClose}
          className="shadow-md"
        >
          확인
        </Button>
      </div>
    </div>
  );
};
