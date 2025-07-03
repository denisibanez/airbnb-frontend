import React from 'react';
import { cn } from '../../lib/utils';

export interface TabItem {
  key: string;
  label: string;
  icon?: React.ReactNode;
  disabled?: boolean;
}
export interface TabsProps {
  items: TabItem[];
  value: string;
  onChange: (key: string) => void;
  variant?: 'underline' | 'pill';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  fullWidth?: boolean;
  orientation?: 'horizontal' | 'vertical';
}

const sizeMap = {
  sm: 'text-sm px-3 py-1',
  md: 'text-base px-4 py-2',
  lg: 'text-lg px-5 py-3',
};

export default function Tabs({
  items,
  value,
  onChange,
  variant = 'underline',
  size = 'md',
  className,
  fullWidth,
  orientation = 'horizontal',
}: TabsProps) {
  return (
    <div
      className={cn(
        'flex',
        orientation === 'vertical' ? 'flex-col' : 'flex-row',
        fullWidth && 'w-full',
        className
      )}
      role="tablist"
      aria-orientation={orientation}
    >
      {items.map((item) => {
        const isActive = value === item.key;
        const isDisabled = !!item.disabled;
        return (
          <button
            key={item.key}
            type="button"
            className={cn(
              'relative flex items-center gap-2 font-medium transition-all outline-none',
              sizeMap[size],
              fullWidth && 'flex-1 justify-center',
              isActive &&
                (variant === 'underline'
                  ? 'text-neutral-900'
                  : 'bg-neutral-900 text-white shadow-airbnb-01'),
              !isActive &&
                (variant === 'underline'
                  ? 'text-neutral-500 hover:text-neutral-900'
                  : 'bg-white text-neutral-700 hover:bg-neutral-100'),
              variant === 'pill' && 'rounded-full border border-neutral-200',
              variant === 'underline' && 'bg-transparent',
              isDisabled && 'opacity-40 pointer-events-none',
            )}
            role="tab"
            aria-selected={isActive}
            aria-disabled={isDisabled}
            tabIndex={isDisabled ? -1 : 0}
            onClick={() => !isDisabled && onChange(item.key)}
          >
            {item.icon && <span className="text-xl">{item.icon}</span>}
            <span>{item.label}</span>
            {/* Underline animado */}
            {variant === 'underline' && (
              <span
                className={cn(
                  'absolute left-0 right-0 -bottom-1 h-0.5 rounded bg-neutral-900 transition-all',
                  isActive ? 'opacity-100' : 'opacity-0'
                )}
              />
            )}
          </button>
        );
      })}
    </div>
  );
} 