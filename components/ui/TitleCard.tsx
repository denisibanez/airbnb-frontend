import React from 'react';
import { cn } from '../../lib/utils';

export interface TitleCardProps {
  icon: React.ReactNode;
  label: string;
  selected?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
}

export default function TitleCard({ icon, label, selected, disabled, onClick, className }: TitleCardProps) {
  return (
    <button
      type="button"
      className={cn(
        'flex flex-col items-center justify-center gap-2 w-32 h-28 bg-white border rounded-xl shadow-sm transition-all select-none',
        selected ? 'border-2 border-violet-400 shadow-airbnb-02' : 'border border-neutral-200',
        disabled && 'opacity-40 pointer-events-none',
        'hover:border-violet-400 focus:border-violet-400',
        className
      )}
      onClick={onClick}
      disabled={disabled}
      aria-pressed={selected}
    >
      <span className="text-3xl mb-1">{icon}</span>
      <span className="text-[15px] text-neutral-900 font-medium">{label}</span>
    </button>
  );
} 