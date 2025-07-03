import React, { useState, useRef, useEffect } from 'react';
import { cn } from '../../lib/utils';
import { IconsInterfaceChevronDown, IconsInterfaceCheck } from './Icons';

export type DropdownOption = {
  value: string;
  label: React.ReactNode;
  iconLeft?: React.ReactNode;
};

export interface DropdownProps {
  options: DropdownOption[];
  value?: string;
  onChange?: (value: string) => void;
  label?: string;
  placeholder?: string;
  error?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  iconLeft?: React.ReactNode;
  className?: string;
  menuClassName?: string;
}

const Dropdown: React.FC<DropdownProps> = ({
  options,
  value,
  onChange,
  label,
  placeholder = 'Selecione...',
  error,
  disabled,
  fullWidth,
  iconLeft,
  className,
  menuClassName,
}) => {
  const [open, setOpen] = useState(false);
  const [focused, setFocused] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Fecha menu ao clicar fora
  useEffect(() => {
    if (!open) return;
    function handle(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', handle);
    return () => document.removeEventListener('mousedown', handle);
  }, [open]);

  const selected = options.find(opt => opt.value === value);

  return (
    <div
      ref={ref}
      className={cn(
        'relative',
        fullWidth && 'w-full',
        className
      )}
    >
      {/* Label flutuante */}
      {label && (
        <label
          className={cn(
            'block text-[13px] font-medium mb-1 transition-all',
            error ? 'text-[#FF385C]' : 'text-[#717171]'
          )}
        >
          {label}
        </label>
      )}
      {/* Caixa do select */}
      <button
        type="button"
        disabled={disabled}
        className={cn(
          'flex items-center w-full min-w-[220px] h-12 px-4 rounded-xl border bg-white text-left text-[15px] font-normal transition-all',
          'focus:outline-none focus:ring-2 focus:ring-[#B4D8F8] focus:border-[#007AAB]',
          error
            ? 'border-[#FF385C] focus:ring-[#FF385C]'
            : focused || open
            ? 'border-[#222]'
            : 'border-[#E0E0E0]',
          disabled && 'bg-[#F7F7F7] text-[#B0B0B0] cursor-not-allowed',
          fullWidth && 'w-full',
          open && 'ring-2 ring-[#B4D8F8] border-[#007AAB]',
        )}
        onClick={() => !disabled && setOpen(v => !v)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        {iconLeft && <span className="mr-2 flex items-center">{iconLeft}</span>}
        <span className={cn('flex-1 truncate', !selected && 'text-[#B0B0B0]')}>{selected ? selected.label : placeholder}</span>
        <IconsInterfaceChevronDown className={cn('w-5 h-5 ml-2 transition-transform', open && 'rotate-180')} />
      </button>
      {/* Menu de opções */}
      {open && (
        <div
          className={cn(
            'absolute left-0 mt-2 w-full min-w-[220px] bg-white rounded-xl shadow-airbnb-03 border border-[#E0E0E0] z-50 py-2',
            menuClassName
          )}
          role="listbox"
        >
          {options.map(opt => (
            <button
              key={opt.value}
              type="button"
              className={cn(
                'w-full flex items-center px-4 py-2 text-[15px] rounded-lg transition-all',
                value === opt.value
                  ? 'bg-[#F7F7F7] text-[#222] font-semibold'
                  : 'hover:bg-[#F7F7F7] text-[#222] font-normal',
              )}
              onClick={() => {
                setOpen(false);
                if (onChange) onChange(opt.value);
              }}
              role="option"
              aria-selected={value === opt.value}
            >
              {opt.iconLeft && <span className="mr-2 flex items-center">{opt.iconLeft}</span>}
              <span className="flex-1 truncate">{opt.label}</span>
              {value === opt.value && (
                <IconsInterfaceCheck className="w-4 h-4 text-[#222] ml-2" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown; 