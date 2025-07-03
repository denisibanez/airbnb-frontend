import React from 'react';
import { cn } from '../../lib/utils';

export interface RadioButtonProps {
  checked: boolean;
  onChange?: (checked: boolean) => void;
  label?: string;
  description?: string;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'outlined' | 'filled';
  className?: string;
  name?: string;
  value?: string;
}

const sizeMap = {
  sm: 'w-4 h-4',
  md: 'w-5 h-5',
  lg: 'w-6 h-6',
};

export default function RadioButton({
  checked,
  onChange,
  label,
  description,
  disabled,
  size = 'md',
  variant = 'default',
  className,
  name,
  value,
}: RadioButtonProps) {
  return (
    <label className={cn('flex items-center gap-3 cursor-pointer select-none', disabled && 'opacity-50 cursor-not-allowed', className)}>
      <span
        className={cn(
          'relative flex items-center justify-center rounded-full border transition-all',
          sizeMap[size],
          variant === 'filled' && checked ? 'bg-neutral-900 border-neutral-900' : 'bg-white',
          variant === 'outlined' ? 'border-2 border-neutral-900' : 'border border-neutral-400',
          checked && variant === 'default' && 'border-neutral-900',
          checked && variant === 'outlined' && 'border-neutral-900',
          checked && variant === 'filled' && 'border-neutral-900',
          !checked && 'border-neutral-400',
          disabled && 'pointer-events-none',
          'focus-within:ring-2 focus-within:ring-violet-400',
        )}
        tabIndex={disabled ? -1 : 0}
        aria-checked={checked}
        aria-disabled={disabled}
        role="radio"
      >
        <input
          type="radio"
          checked={checked}
          onChange={e => !disabled && onChange?.(e.target.checked)}
          disabled={disabled}
          name={name}
          value={value}
          className="absolute opacity-0 w-0 h-0"
          tabIndex={-1}
        />
        {checked && (
          <span
            className={cn(
              'block rounded-full bg-neutral-900',
              size === 'sm' && 'w-2 h-2',
              size === 'md' && 'w-2.5 h-2.5',
              size === 'lg' && 'w-3 h-3',
              variant === 'filled' && 'bg-white border-2 border-neutral-900',
              variant === 'outlined' && 'bg-neutral-900',
            )}
          />
        )}
      </span>
      {(label || description) && (
        <span className="flex flex-col">
          {label && <span className="text-[15px] text-neutral-900 font-medium leading-tight">{label}</span>}
          {description && <span className="text-sm text-neutral-500 leading-tight">{description}</span>}
        </span>
      )}
    </label>
  );
} 