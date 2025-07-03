import React from 'react';
import { cn } from '../../lib/utils';

export type ChipVariant =
  | 'default'
  | 'outlined'
  | 'outlinedDouble'
  | 'outlinedSm'
  | 'filled'
  | 'map'
  | 'mapFilled'
  | 'mapShadow'
  | 'mapFavorite';

export interface ChipProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: ChipVariant;
  selected?: boolean;
  iconRight?: React.ReactNode;
  className?: string;
}

const Chip: React.FC<ChipProps> = ({
  children,
  variant = 'default',
  selected,
  iconRight,
  className,
  ...props
}) => {
  // Estilos base por variante
  const base =
    'inline-flex items-center justify-center font-medium transition-all select-none focus:outline-none';
  let styles = '';

  switch (variant) {
    case 'default':
      styles =
        'h-10 px-7 rounded-full bg-[#F7F7F7] text-[#222] text-[20px] shadow-none border-none';
      break;
    case 'outlined':
      styles =
        'h-10 px-7 rounded-full bg-white text-[#222] text-[20px] border border-[#222] shadow-none';
      break;
    case 'outlinedDouble':
      styles =
        'h-10 px-7 rounded-full bg-white text-[#222] text-[20px] border-2 border-[#222] outline outline-1 outline-[#E0E0E0] shadow-none';
      break;
    case 'outlinedSm':
      styles =
        'h-8 px-5 rounded-full bg-white text-[#222] text-[18px] border border-[#222] shadow-none';
      break;
    case 'filled':
      styles =
        'h-10 px-7 rounded-full bg-[#222] text-white text-[20px] border-none shadow-none';
      break;
    case 'map':
      styles =
        'h-8 px-5 rounded-full bg-white text-[#222] text-[18px] border-none shadow-none';
      break;
    case 'mapFilled':
      styles =
        'h-8 px-5 rounded-full bg-[#222] text-white text-[18px] border-none shadow-none';
      break;
    case 'mapShadow':
      styles =
        'h-8 px-5 rounded-full bg-white text-[#222] text-[18px] border-none shadow-airbnb-01';
      break;
    case 'mapFavorite':
      styles =
        'h-8 px-5 rounded-full bg-white text-[#222] text-[18px] border-none shadow-none';
      break;
    default:
      styles = '';
  }

  // Estado selecionado (para chips de mapa)
  const selectedStyles =
    variant.startsWith('map') && selected
      ? 'bg-[#222] text-white'
      : '';

  return (
    <button
      type="button"
      className={cn(base, styles, selectedStyles, className)}
      {...props}
    >
      <span className="flex items-center gap-1">
        {children}
        {iconRight && <span className="ml-1 flex items-center">{iconRight}</span>}
      </span>
    </button>
  );
};

export default Chip; 