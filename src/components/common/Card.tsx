import { ReactNode, HTMLAttributes } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  variant?: 'default' | 'sm' | 'lg' | 'interactive';
  className?: string;
}

export default function Card({
  children,
  variant = 'default',
  className = '',
  ...props
}: CardProps) {
  const variantClass =
    variant === 'sm'
      ? 'card-sm'
      : variant === 'lg'
        ? 'card-lg'
        : variant === 'interactive'
          ? 'card-interactive'
          : 'card';

  return (
    <div className={`${variantClass} ${className}`.trim()} {...props}>
      {children}
    </div>
  );
}
