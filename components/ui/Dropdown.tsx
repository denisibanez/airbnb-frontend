import React, { useState, useRef, useEffect } from 'react';
import { cn } from '../../lib/utils';
import { IconsInterfaceChevronDown, IconsInterfaceCheck } from './Icons';
import Image, { StaticImageData } from 'next/image';

export type DropdownOption = {
  value: string;
  label: React.ReactNode;
  iconLeft?: React.ReactNode;
};

export type DropdownSize = 'sm' | 'md' | 'lg';

export interface DropdownProps {
  options: DropdownOption[];
  value?: string;
  onChange?: (value: string) => void;
  label?: string;
  placeholder?: string;
  error?: boolean;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  iconLeft?: React.ReactNode;
  imageLeft?: string | StaticImageData;
  size?: DropdownSize;
  className?: string;
  menuClassName?: string;
}

const Dropdown: React.FC<DropdownProps> = ({
  options,
  value,
  onChange,
  label,
  placeholder = 'Placeholder text',
  error,
  disabled,
  loading = false,
  fullWidth,
  iconLeft,
  imageLeft,
  size = 'md',
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

  // Tamanhos
  const sizeClasses = {
    sm: 'h-10 px-3 text-sm',
    md: 'h-12 px-4 text-base',
    lg: 'h-14 px-5 text-lg',
  };


  return (
    <div
      ref={ref}
      className={cn(
        'relative',
        fullWidth && 'w-full',
        className
      )}
    >
      {/* Caixa do select */}
      <button
        type="button"
        disabled={disabled}
        className={cn(
          'flex items-center w-full min-w-[220px] rounded-lg border bg-transparent text-left font-normal transition-all',
          sizeClasses[size],
          'focus:outline-none focus:ring-2 focus:ring-[#222] focus:border-[#222]',
          error
            ? 'border-[#FF385C] focus:ring-[#FF385C]'
            : focused || open
            ? 'border-[#222] ring-2 ring-[#222]'
            : 'border-[#E0E0E0] hover:border-[#B0B0B0]',
          disabled && 'bg-[#F7F7F7] text-[#B0B0B0] cursor-not-allowed',
          loading && 'cursor-wait',
          fullWidth && 'w-full',
          open && 'ring-2 ring-[#222] border-[#222]',
        )}
        onClick={() => !disabled && setOpen(v => !v)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        {/* Label interno */}
        {label && !loading && !imageLeft && (
          <span className={cn(
            'absolute left-4 top-1 text-xs font-medium transition-all pointer-events-none',
            error ? 'text-[#FF385C]' : 'text-[#717171]'
          )}>
            {label}
          </span>
        )}
        
        {/* Ícone ou imagem à esquerda */}
        {iconLeft && !loading && <span className="mr-2 flex items-center">{iconLeft}</span>}
        {imageLeft && !loading && (
          <Image 
            src={imageLeft} 
            alt="" 
            width={20}
            height={20}
            className="w-5 h-5 mr-3 flex-shrink-0" 
          />
        )}
        
        {loading ? (
          <div className="flex items-center justify-center flex-1">
            <div className="flex space-x-1">
              <div className="w-1 h-1 bg-[#717171] rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="w-1 h-1 bg-[#717171] rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
              <div className="w-1 h-1 bg-[#717171] rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
            </div>
          </div>
        ) : (
          <span className={cn(
            'flex-1 truncate',
            !selected && 'text-[#222]',
            selected && 'text-[#222]',
            label && !imageLeft && 'mt-5' // Adiciona margem superior quando há label interno e não há imagem
          )}>
            {selected ? selected.label : placeholder}
          </span>
        )}
        {!loading && <IconsInterfaceChevronDown className={cn('w-5 h-5 ml-2 transition-transform text-[#717171]', open && 'rotate-180')} />}
      </button>
      {/* Menu de opções */}
      {open && (
        <div
          className={cn(
            'absolute left-0 mt-2 w-full min-w-[220px] bg-white rounded-lg shadow-airbnb-03 border border-[#E0E0E0] z-50 py-2',
            menuClassName
          )}
          role="listbox"
        >
          {options.map(opt => (
            <button
              key={opt.value}
              type="button"
              className={cn(
                'w-full flex items-center justify-start px-4 py-2 rounded-lg transition-all text-left',
                sizeClasses[size],
                value === opt.value
                  ? 'bg-[#F7F7F7] text-[#222] font-semibold'
                  : 'hover:bg-[#F7F7F7] text-[#222] font-normal hover:text-[#222]',
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
                <IconsInterfaceCheck className="w-4 h-4 text-[#222] ml-2 flex-shrink-0" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

Dropdown.displayName = 'Dropdown';

export default Dropdown; 
