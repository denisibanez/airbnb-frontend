import React, { useState } from 'react';
import { cn } from '@/lib/utils';

interface TextFieldProps {
  label: string;
  placeholder?: string;
  helperText?: string;
  errorMessage?: string;
  value?: string;
  onChange?: (value: string) => void;
  type?: 'text' | 'email' | 'password' | 'number';
  className?: string;
  iconRight?: React.ReactNode;
}

const TextField = ({
  label,
  placeholder = 'Placeholder text',
  helperText,
  errorMessage,
  value,
  onChange,
  type = 'text',
  className = '',
  iconRight,
}: TextFieldProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const [internalValue, setInternalValue] = useState(value || '');
  const currentValue = value !== undefined ? value : internalValue;
  const hasError = !!errorMessage;
  const isFilled = value !== undefined ? !!value : !!internalValue;
  const showFloating = isFocused || isFilled;
  const inputId = label.replace(/\s+/g, '-').toLowerCase();

  const labelColor = hasError
    ? 'text-[#DD2A2A]'
    : showFloating
    ? 'text-[#222222]'
    : 'text-[#717171]';

  const borderStyle = hasError
    ? 'border-[#DD2A2A]'
    : isFocused
    ? 'border-[#222222] ring-2 ring-[#222222]'
    : 'border-[#B0B0B0]';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInternalValue(e.target.value);
    onChange?.(e.target.value);
  };

  return (
    <div className={cn('space-y-1 w-full', className)}>
      <div
        className={cn(
          'relative flex h-[56px] items-center border rounded-lg px-3 bg-white transition-all duration-150',
          borderStyle
        )}
      >
        <div className="relative w-full min-h-[56px] flex items-center">
          {/* Placeholder simulado */}
          {showFloating && !currentValue?.length  &&(
            <span className="absolute left-0 top-1/2 -translate-y-1/2 text-base text-[#717171] pointer-events-none z-0">
              {placeholder}
            </span>
          )}

          {/* Input */}
          <input
            id={inputId}
            type={type}
            value={currentValue}
            onChange={handleChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className={cn(
              'w-full pt-0 bg-transparent text-[#222] text-base outline-none border-none z-10',
              iconRight && 'pr-10'
            )}
          />

          {/* Label flutuante */}
          <label
            htmlFor={inputId}
            className={cn(
              'absolute left-0 z-20 bg-white transition-all duration-200 pointer-events-none',
              showFloating
                ? 'top-[-8px] text-xs font-medium px-1'
                : 'top-1/2 -translate-y-1/2 text-base font-normal w-full',
              labelColor
            )}
          >
            {label}
          </label>

          {/* Ícone à direita */}
          {iconRight && (
            <span className="absolute right-0 pr-2 top-1/2 -translate-y-1/2 text-[#717171] pointer-events-none z-20">
              {iconRight}
            </span>
          )}
        </div>
      </div>

      {/* Hint ou erro */}
      {(helperText || errorMessage) && (
        <div className="flex items-start gap-1.5 pt-1">
          {hasError && (
            <svg
              className="w-4 h-4 mt-[2px] text-[#DD2A2A]"
              viewBox="0 0 16 16"
              fill="none"
            >
              <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
              <rect x="7.25" y="4.5" width="1.5" height="5" rx="0.75" fill="currentColor" />
              <rect x="7.25" y="11" width="1.5" height="1.5" rx="0.75" fill="currentColor" />
            </svg>
          )}
          <p
            className={cn('text-xs', hasError ? 'text-[#DD2A2A]' : 'text-[#717171]')}
          >
            {errorMessage || helperText}
          </p>
        </div>
      )}
    </div>
  );
};

export default TextField;
