import React from 'react';
import { cn } from '../../lib/utils';
import {
  IconsInterfaceInfo,
  IconsInterfaceWarning,
  IconsInterfaceCheck,
  IconsInterfaceError,
} from './Icons';

export type CalloutVariant = 'info' | 'warning' | 'success' | 'error' | 'neutral';

const variantStyles: Record<CalloutVariant, {
  bg: string;
  border: string;
  icon: React.ReactNode;
  iconColor: string;
}> = {
  info: {
    bg: 'bg-[#F0F8FF]',
    border: 'border-[#B4D8F8]',
    icon: <IconsInterfaceInfo className="w-5 h-5" />,
    iconColor: 'text-[#007AAB]',
  },
  warning: {
    bg: 'bg-[#FFF8E1]',
    border: 'border-[#FFE082]',
    icon: <IconsInterfaceWarning className="w-5 h-5" />,
    iconColor: 'text-[#FFB300]',
  },
  success: {
    bg: 'bg-[#F1FAF5]',
    border: 'border-[#A5D6A7]',
    icon: <IconsInterfaceCheck className="w-5 h-5" />,
    iconColor: 'text-[#388E3C]',
  },
  error: {
    bg: 'bg-[#FFF0F0]',
    border: 'border-[#FFB4B4]',
    icon: <IconsInterfaceError className="w-5 h-5" />,
    iconColor: 'text-[#D32F2F]',
  },
  neutral: {
    bg: 'bg-[#F7F7F7]',
    border: 'border-[#E0E0E0]',
    icon: <IconsInterfaceInfo className="w-5 h-5" />,
    iconColor: 'text-[#717171]',
  },
};

export interface CalloutProps {
  variant?: CalloutVariant;
  title?: string;
  children: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
}

const Callout: React.FC<CalloutProps> = ({
  variant = 'info',
  title,
  children,
  action,
  className,
}) => {
  const style = variantStyles[variant];
  return (
    <div
      className={cn(
        'flex items-start gap-3 rounded-lg border px-5 py-4',
        style.bg,
        style.border,
        className
      )}
      style={{ borderWidth: 1, borderStyle: 'solid' }}
    >
      <span className={cn('mt-0.5', style.iconColor)}>{style.icon}</span>
      <div className="flex-1 min-w-0">
        {title && <div className="font-semibold text-[15px] text-[#222] mb-0.5 leading-tight">{title}</div>}
        <div className="text-[15px] text-[#222] leading-snug">{children}</div>
        {action && <div className="mt-2">{action}</div>}
      </div>
    </div>
  );
};

export default Callout; 