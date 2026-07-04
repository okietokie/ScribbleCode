import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { ButtonProps } from '@/types';
import { useAnimation } from '@/hooks';
import { Loader2 } from 'lucide-react';

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
    outline: 'bg-transparent text-ink border-2 hover:bg-notebook-yellow/30',
    ghost: 'bg-transparent text-ink hover:bg-notebook-yellow/30 shadow-none',
    danger: 'bg-notebook-red text-white shadow-paper hover:shadow-paper-hover',
    success: 'bg-notebook-green text-ink shadow-paper hover:shadow-paper-hover',
  };

  const sizeStyles = {
    sm: 'px-4 py-2 text-sm gap-2',
    md: 'px-6 py-3 text-base gap-2',
    lg: 'px-8 py-4 text-lg gap-3',
  };

  return (
    <motion.button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      disabled={disabled || isLoading}
      whileHover={!disabled && !isLoading ? hoverLift.animate : undefined}
      whileTap={!disabled && !isLoading ? { scale: 0.95 } : undefined}
      {...(props as HTMLMotionProps<'button'>)}
    >
      {isLoading ? (
        <Loader2 className="animate-spin h-4 w-4" />
      ) : (
        <>
          {leftIcon && <span>{leftIcon}</span>}
          {children}
          {rightIcon && <span>{rightIcon}</span>}
        </>
      )}
    </motion.button>
  );
};

/**
 * Button Component
 * 
 * Purpose: Reusable button component with multiple variants and sizes
 * 
 * Props:
 * - variant: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success'
 * - size: 'sm' | 'md' | 'lg'
 * - isLoading: boolean - Shows loading spinner when true
 * - leftIcon: React.ReactNode - Icon to display on the left
 * - rightIcon: React.ReactNode - Icon to display on the right
 * - disabled: boolean - Disables the button
 * - className: string - Additional CSS classes
 * 
 * Usage Example:
 * ```tsx
 * <Button variant="primary" size="md" leftIcon={<SaveIcon />}>
 *   Save Changes
 * </Button>
 * ```
 * 
 * Accessibility Notes:
 * - Supports keyboard navigation
 * - Visible focus states
 * - Disabled state is clearly indicated
 */
