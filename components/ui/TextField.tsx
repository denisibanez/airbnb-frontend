import React, { useState } from 'react';
import { cn } from '../../lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';

const textFieldVariants = cva(
  'relative flex items-center border rounded-lg px-3 bg-transparent transition-all duration-150',
  {
    variants: {
      size: {
        sm: 'h-[40px] px-2.5',
        md: 'h-[48px] px-3',
        lg: 'h-[56px] px-3',
        xl: 'h-[64px] px-4',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

const inputVariants = cva(
  'w-full pt-3  bg-transparent text-[#222] outline-none border-none z-10',
  {
    variants: {
      size: {
        sm: 'text-sm',
        md: 'text-base',
        lg: 'text-base',
        xl: 'text-lg',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

const labelVariants = cva(
  'absolute left-0 z-20  bg-transparent transition-all duration-200 pointer-events-none',
  {
    variants: {
      size: {
        sm: 'text-xs',
        md: 'text-sm',
        lg: 'text-base',
        xl: 'text-base',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

const placeholderVariants = cva(
  'absolute left-0 top-7.5 -translate-y-1/2 text-[#717171] pointer-events-none z-0',
  {
    variants: {
      size: {
        sm: 'text-xs',
        md: 'text-sm',
        lg: 'text-base',
        xl: 'text-lg',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

const labelFloatTopVariants = {
  sm: 'top-1',
  md: 'top-2',
  lg: 'top-2',
  xl: 'top-3',
};
const inputPaddingTopVariants = {
  sm: 'pt-3',
  md: 'pt-3',
  lg: 'pt-4',
  xl: 'pt-5',
};
const placeholderTopVariants = {
  sm: 'top-7',
  md: 'top-8',
  lg: 'top-9',
  xl: 'top-10',
};

interface TextFieldProps extends VariantProps<typeof textFieldVariants> {
  label: string;
  placeholder?: string;
  helperText?: string;
  errorMessage?: string;
  value?: string;
  onChange?: (value: string) => void;
  type?: 'text' | 'email' | 'password' | 'number' | 'tel';
  className?: string;
  iconRight?: React.ReactNode;
  disabled?: boolean;
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
  disabled = false,
  size = 'md',
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
    ? isFocused
      ? 'border-2 border-[#DD2A2A] bg-[#FFF6F6]'
      : 'border border-[#DD2A2A] bg-[#FFF6F6]'
    : isFocused
    ? 'border-none border-[#222222] ring-2 ring-[#222222] bg-transparent'
    : 'border border-[#B0B0B0] bg-transparent';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInternalValue(e.target.value);
    onChange?.(e.target.value);
  };

  // Altura do container baseada no tamanho
  const containerHeight = {
    sm: 'min-h-[40px]',
    md: 'min-h-[48px]',
    lg: 'min-h-[56px]',
    xl: 'min-h-[64px]',
  }[size || 'md'];

  // Garantir que size sempre tem valor válido
  const safeSize = size || 'md';

  return (
    <div className={cn('space-y-1 w-full', className)}>
      <div
        className={cn(
          textFieldVariants({ size }),
          borderStyle,
          disabled && 'opacity-60 cursor-not-allowed bg-neutral-02'
        )}
      >
        <div className={cn("relative w-full flex items-center", containerHeight)}>
          {/* Placeholder simulado */}
          {showFloating && !currentValue?.length && (
            <span className={cn(placeholderVariants({ size: safeSize }), placeholderTopVariants[safeSize], 'left-0 pl-0')}>
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
            disabled={disabled}
            className={cn(
              inputVariants({ size: safeSize }),
              inputPaddingTopVariants[safeSize],
              iconRight && 'pr-8',
              disabled && 'bg-transparent text-[#B0B0B0] cursor-not-allowed',
              'pl-0' // input sempre alinhado à esquerda
            )}
          />

          {/* Label flutuante */}
          <label
            htmlFor={inputId}
            className={cn(
              labelVariants({ size: safeSize }),
              showFloating
                ? `text-xs font-medium  z-20 left-0 ${labelFloatTopVariants[safeSize]}`
                : 'top-1/2 -translate-y-1/2 font-normal w-full z-20 left-0',
              labelColor
            )}
          >
            {label}
          </label>

          {/* Ícone à direita */}
          {iconRight && (
            <span className="absolute right-0 pr-2 top-1/2 -translate-y-1/2 text-[#717171] z-20">
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
