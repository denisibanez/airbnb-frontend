import React, { useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: React.ReactNode;
  error?: boolean;
  indeterminate?: boolean;
  className?: string;
}

const Checkbox: React.FC<CheckboxProps> = ({
  label,
  error,
  indeterminate,
  disabled,
  className,
  id,
  ...props
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.indeterminate = !!indeterminate;
    }
  }, [indeterminate]);

  return (
    <label
      htmlFor={id}
      className={cn(
        'inline-flex items-center gap-2 cursor-pointer select-none',
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
    >
      <span className="relative flex items-center justify-center">
        <input
          ref={inputRef}
          id={id}
          type="checkbox"
          disabled={disabled}
          className={cn(
            'peer appearance-none w-5 h-5 rounded-[4px] border border-[#B0B0B0] bg-white transition-all outline-none',
            'focus:ring-2 focus:ring-[#B4D8F8] focus:border-[#007AAB]',
            'checked:bg-[#222] checked:border-[#222] checked:text-white',
            error && 'border-[#FF385C] focus:ring-[#FF385C]',
            disabled && 'bg-[#F7F7F7] border-[#E0E0E0]',
          )}
          {...props}
        />
        {/* Checkmark */}
        <span
          className={cn(
            'pointer-events-none absolute left-0 top-0 w-5 h-5 flex items-center justify-center',
            'transition-all',
            'peer-checked:opacity-100 peer-checked:scale-100 opacity-0 scale-75',
            indeterminate && 'opacity-100 scale-100',
          )}
        >
          {indeterminate ? (
            <svg width="16" height="16" viewBox="0 0 20 20" fill="none"><rect x="4" y="9" width="12" height="2" rx="1" fill="#fff"/></svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 20 20" fill="none"><path d="M5 10.5 9 14.5 15 7.5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          )}
        </span>
      </span>
      {label && (
        <span className={cn('text-[15px] text-[#222] font-normal', disabled && 'text-[#B0B0B0]', error && 'text-[#FF385C]')}>{label}</span>
      )}
    </label>
  );
};

export default Checkbox; 