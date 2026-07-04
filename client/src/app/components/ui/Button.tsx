import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { ButtonProps } from '@/types';
import { useAnimation } from '@/hooks';

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  children,
  className = '',
  disabled,
  ...props
}) => {
  const animations = useAnimation();
  const hoverLift = animations.hoverLift();

  const baseStyles = 'inline-flex items-center justify-center font-button rounded-hand border-hand border-ink transition-all duration-normal focus:outline-none focus:ring-2 focus:ring-notebook-blue focus:ring-offset-2';
  
  const variantStyles = {
    primary: 'bg-notebook-yellow text-ink shadow-paper hover:shadow-paper-hover',
    secondary: 'bg-paper text-ink shadow-paper hover:shadow-paper-hover',
    outline: 'bg-transparent text-ink hover:bg-notebook-yellow/30',
  };

  const sizeStyles = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  return (
    <motion.button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      disabled={disabled || isLoading}
      whileHover={!disabled && !isLoading ? hoverLift.animate : undefined}
      whileTap={!disabled && !isLoading ? { scale: 0.95 } : undefined}
      {...(props as HTMLMotionProps<'button'>)}
    >
      {isLoading && (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      )}
      {!isLoading && leftIcon && <span className="mr-2">{leftIcon}</span>}
      {children}
      {!isLoading && rightIcon && <span className="ml-2">{rightIcon}</span>}
    </motion.button>
  );
};
