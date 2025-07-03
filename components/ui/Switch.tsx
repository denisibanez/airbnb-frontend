import React from 'react';
import { cn } from '../../lib/utils';

export interface SwitchProps {
  checked?: boolean;
  disabled?: boolean;
  error?: boolean;
  label?: React.ReactNode;
  description?: React.ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'outlined' | 'filled';
  name?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const sizeMap = {
  sm: { track: 'w-8 h-4', thumb: 'w-3.5 h-3.5', translate: 'translate-x-4' },
  md: { track: 'w-11 h-6', thumb: 'w-5 h-5', translate: 'translate-x-5' },
  lg: { track: 'w-14 h-8', thumb: 'w-7 h-7', translate: 'translate-x-6' },
};

export default function Switch({
  checked,
  disabled,
  error,
  label,
  description,
  className,
  size = 'md',
  variant = 'default',
  name,
  onChange,
  ...props
}: SwitchProps) {
  const s = sizeMap[size];
  return (
    <label className={cn('inline-flex items-center gap-3 cursor-pointer select-none', disabled && 'opacity-50 cursor-not-allowed', className)}>
      <span className="relative inline-flex items-center">
        <input
          type="checkbox"
          checked={checked}
          disabled={disabled}
          className="peer sr-only"
          name={name}
          onChange={onChange}
          {...props}
        />
        <span
          className={cn(
            'transition-colors duration-200 flex items-center px-0.5 box-border rounded-full',
            s.track,
            variant === 'filled' && checked ? 'bg-neutral-900 border border-neutral-900' :
            variant === 'outlined' ? 'bg-white border-2 border-neutral-900' :
            checked ? 'bg-neutral-900' : 'bg-[#E0E0E0]',
            variant === 'filled' && !checked && 'bg-white border border-neutral-400',
            variant === 'outlined' && !checked && 'bg-white border-2 border-neutral-400',
            error && 'ring-2 ring-[#FF385C] ring-offset-1',
            disabled && 'bg-[#F7F7F7] border-[#E0E0E0]'
          )}
        >
          <span
            className={cn(
              'block rounded-full bg-white shadow-airbnb-01 transition-all duration-200 flex items-center justify-center',
              s.thumb,
              checked ? s.translate : 'translate-x-0',
              error && 'ring-2 ring-[#FF385C] ring-offset-0',
              variant === 'filled' && checked && 'bg-white border-2 border-neutral-900',
              variant === 'outlined' && checked && 'bg-neutral-900 border-2 border-neutral-900',
              variant === 'outlined' && !checked && 'border-2 border-neutral-400',
              variant === 'filled' && !checked && 'border border-neutral-400',
            )}
          >
            {checked && (
              <svg className={cn('w-4 h-4 text-neutral-900', size === 'sm' && 'w-3 h-3', variant === 'filled' && 'text-white')} viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="2" /><path d="M6 10.5l2.5 2.5 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            )}
          </span>
        </span>
      </span>
      {(label || description) && (
        <span className="flex flex-col">
          {label && <span className={cn('text-[15px] text-[#222] font-normal', disabled && 'text-[#B0B0B0]', error && 'text-[#FF385C]')}>{label}</span>}
          {description && <span className="text-sm text-neutral-500 leading-tight">{description}</span>}
        </span>
      )}
    </label>
  );
} 