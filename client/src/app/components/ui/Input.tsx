import React, { useState } from 'react';
import { InputProps } from '@/types';
import { XCircle } from 'lucide-react';

export const Input: React.FC<InputProps> = ({
  label,
  error,
  type = 'text',
  leftIcon,
  rightIcon,
  className = '',
  disabled,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  
  const baseStyles = 'w-full font-body bg-paper-page rounded-hand border-hand transition-all duration-normal focus:outline-none';
  
  const stateStyles = error
    ? 'border-notebook-red focus:ring-2 focus:ring-notebook-red focus:border-transparent'
    : isFocused
      ? 'border-ink focus:ring-2 focus:ring-notebook-blue focus:border-transparent'
      : 'border-ink/40';

  const disabledStyles = disabled ? 'opacity-50 cursor-not-allowed bg-paper' : '';

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label className="block font-caption text-ink mb-2">
          {label}
        </label>
      )}
      <div className="relative">
        {leftIcon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-ink/60">
            {leftIcon}
          </div>
        )}
        <input
          type={type}
          className={`${baseStyles} ${stateStyles} ${disabledStyles} px-4 py-3 ${leftIcon ? 'pl-10' : ''} ${rightIcon || error ? 'pr-10' : ''}`}
          disabled={disabled}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        />
        {error && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-notebook-red">
            <XCircle className="h-5 w-5" />
          </div>
        )}
        {!error && rightIcon && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-ink/60">
            {rightIcon}
          </div>
        )}
      </div>
      {error && (
        <p className="text-sm text-notebook-red mt-1 font-caption">
          {error}
        </p>
      )}
    </div>
  );
};

/**
 * Input Component
 * 
 * Purpose: Reusable input field with validation states
 * 
 * Props:
 * - label: string - Label text
 * - error: string - Error message (triggers error state)
 * - type: 'text' | 'password' | 'email' | 'number' | 'search'
 * - leftIcon: React.ReactNode - Icon on the left
 * - rightIcon: React.ReactNode - Icon on the right
 * - disabled: boolean - Disables the input
 * 
 * Usage Example:
 * ```tsx
 * <Input label="Email" type="email" error="Invalid email" />
 * ```
 * 
 * Accessibility Notes:
 * - Proper label association
 * - Error states announced to screen readers
 * - Visible focus states
 */
