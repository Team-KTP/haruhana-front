import React, { ReactNode, HTMLAttributes } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  title?: string;
  subtitle?: string;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  onClick,
  title,
  subtitle,
  ...props
}) => {
  // className에 bg- 클래스가 있으면 기본 bg-white 사용 안함
  const hasCustomBg = className.includes('bg-');
  const hasBorder = className.includes('border-');
  const hasPadding = className.includes('!p-');

  return (
    <div
      className={`${hasCustomBg ? '' : 'bg-white'} rounded-xl sm:rounded-2xl ${hasBorder ? '' : 'border border-slate-100'} shadow-sm transition-all overflow-hidden ${onClick ? 'cursor-pointer hover:shadow-md active:scale-[0.99] touch-manipulation' : ''} ${className}`}
      onClick={onClick}
      {...props}
    >
      {(title || subtitle) && (
        <div className="px-4 sm:px-6 pt-4 sm:pt-5 pb-1">
          {title && <h3 className="text-base sm:text-lg font-bold text-slate-800 tracking-tight">{title}</h3>}
          {subtitle && <p className="text-xs sm:text-sm text-slate-400 mt-0.5">{subtitle}</p>}
        </div>
      )}
      <div className={hasPadding ? '' : 'px-4 sm:px-6 py-4 sm:py-5'}>
        {children}
      </div>
    </div>
  );
};
