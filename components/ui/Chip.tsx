import React from 'react';
import { cn } from '../../lib/utils';

export type ChipVariant =
  | 'white'
  | 'whiteWithBorder'
  | 'dark'
  | 'lightGray'
  | 'whiteWithHeart';

export interface ChipProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value?: string;
  variant?: ChipVariant;
  iconRight?: React.ReactNode;
  className?: string;
}

const Chip: React.FC<ChipProps> = ({
  value = '$99',
  variant = 'white',
  iconRight,
  className,
  ...props
}) => {
  // Estilos base
  const base =
    'inline-flex items-center justify-center font-medium transition-all select-none focus:outline-none h-8 px-3 rounded-full shadow-sm';
  
  let styles = '';

  switch (variant) {
    case 'white':
      styles = 'bg-white text-[#222] border border-[#B0B0B0]';
      break;
    case 'whiteWithBorder':
      styles = 'bg-white text-[#222] border border-[#B0B0B0]';
      break;
    case 'dark':
      styles = 'bg-[#222] text-white border-none';
      break;
    case 'lightGray':
      styles = 'bg-[#F7F7F7] text-[#222] border border-[#B0B0B0]';
      break;
    case 'whiteWithHeart':
      styles = 'bg-white text-[#222] border border-[#B0B0B0]';
      break;
    default:
      styles = '';
  }

  return (
    <button
      type="button"
      className={cn(base, styles, className)}
      {...props}
    >
      <span className="flex items-center gap-1 text-[16px]">
        {value}
        {iconRight && <span className="ml-1 flex items-center">{iconRight}</span>}
      </span>
    </button>
  );
};

export default Chip; 
