import React, { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  children: ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className = '',
  ...props
}) => {
  const baseStyles = "inline-flex items-center justify-center rounded-xl font-medium transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98] touch-manipulation";
  const variants = {
    primary: "bg-haru-500 text-white hover:bg-haru-600 focus:ring-haru-500 shadow-sm hover:shadow-md",
    secondary: "bg-haru-100 text-haru-800 hover:bg-haru-200 focus:ring-haru-500",
    outline: "border-2 border-slate-200 text-slate-700 hover:border-haru-500 hover:text-haru-600 focus:ring-haru-500 bg-white",
    ghost: "text-slate-500 hover:text-haru-600 hover:bg-haru-50",
  };
  const sizes = {
    sm: "px-3 py-1.5 sm:px-3.5 sm:py-2 text-xs sm:text-sm",
    md: "px-4 py-2.5 sm:px-5 sm:py-3 text-sm sm:text-base",
    lg: "px-5 py-3 sm:px-6 sm:py-3.5 text-base sm:text-lg",
  };
  const widthClass = fullWidth ? "w-full" : "";
  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${widthClass} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
