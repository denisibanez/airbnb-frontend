import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

export interface TooltipProps {
  children: React.ReactNode; // trigger
  content: React.ReactNode;
  title?: React.ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  variant?: 'light' | 'dark';
  placement?: 'top' | 'bottom' | 'left' | 'right';
  withArrow?: boolean;
  closable?: boolean;
  className?: string;
  contentClassName?: string;
}

export default function Tooltip({
  children,
  content,
  title,
  open,
  defaultOpen,
  onOpenChange,
  variant = 'light',
  placement = 'top',
  withArrow = true,
  closable = false,
  className,
  contentClassName,
}: TooltipProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen || false);
  const triggerRef = useRef<HTMLSpanElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Controlado/Descontrolado
  const visible = open !== undefined ? open : isOpen;
  const setVisible = (v: boolean) => {
    if (open === undefined) setIsOpen(v);
    onOpenChange?.(v);
  };

  // ESC fecha
  useEffect(() => {
    if (!visible) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setVisible(false);
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [visible]);

  // Click fora fecha
  useEffect(() => {
    if (!visible) return;
    function onClick(e: MouseEvent) {
      if (
        contentRef.current &&
        !contentRef.current.contains(e.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(e.target as Node)
      ) {
        setVisible(false);
      }
    }
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, [visible]);

  // Posição
  const getPosition = () => {
    switch (placement) {
      case 'top':
        return 'bottom-full left-1/2 -translate-x-1/2 mb-2';
      case 'bottom':
        return 'top-full left-1/2 -translate-x-1/2 mt-2';
      case 'left':
        return 'right-full top-1/2 -translate-y-1/2 mr-2';
      case 'right':
        return 'left-full top-1/2 -translate-y-1/2 ml-2';
      default:
        return 'bottom-full left-1/2 -translate-x-1/2 mb-2';
    }
  };

  return (
    <span className={cn('relative inline-block', className)} ref={triggerRef}
      tabIndex={0}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      onFocus={() => setVisible(true)}
      onBlur={() => setVisible(false)}
      onClick={() => setVisible(true)}
      aria-haspopup="dialog"
      aria-expanded={visible}
    >
      {children}
      {visible && (
        <div
          ref={contentRef}
          className={cn(
            'absolute z-50 min-w-[220px] max-w-xs rounded-xl shadow-airbnb-03 border text-left',
            getPosition(),
            variant === 'light'
              ? 'bg-white border-neutral-200 text-neutral-900'
              : 'bg-neutral-900 border-neutral-900 text-white',
            contentClassName
          )}
          role="dialog"
          tabIndex={-1}
        >
          {withArrow && (
            <span
              className={cn(
                'absolute w-4 h-4',
                placement === 'top' && 'left-1/2 -translate-x-1/2 bottom-0 translate-y-full',
                placement === 'bottom' && 'left-1/2 -translate-x-1/2 top-0 -translate-y-full',
                placement === 'left' && 'top-1/2 -translate-y-1/2 right-0 translate-x-full',
                placement === 'right' && 'top-1/2 -translate-y-1/2 left-0 -translate-x-full',
              )}
              aria-hidden
            >
              <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4">
                <polygon
                  points="8,0 16,16 0,16"
                  className={cn(
                    variant === 'light' ? 'fill-white stroke-neutral-200' : 'fill-neutral-900 stroke-neutral-900',
                    'stroke-[1px]'
                  )}
                />
              </svg>
            </span>
          )}
          <div className="flex flex-col gap-1 p-4">
            {closable && (
              <button
                className={cn('absolute top-2 right-2 p-1 rounded-full hover:bg-neutral-100/60 transition', variant === 'dark' && 'hover:bg-neutral-800/60')}
                onClick={() => setVisible(false)}
                aria-label="Close"
                tabIndex={0}
              >
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M5 5l8 8M13 5l-8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
              </button>
            )}
            {title && <div className={cn('font-semibold text-[15px]', variant === 'dark' ? 'text-white' : 'text-neutral-900')}>{title}</div>}
            <div className={cn('text-[15px] leading-snug', variant === 'dark' ? 'text-white' : 'text-neutral-900')}>{content}</div>
          </div>
        </div>
      )}
    </span>
  );
} 