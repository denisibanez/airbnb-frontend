import React from 'react';
import { cn } from '../../lib/utils';

export interface CalloutProps {
  icon?: React.ReactNode;
  iconAlign?: 'left' | 'right';
  title?: React.ReactNode;
  children: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
}

const Callout: React.FC<CalloutProps> = ({
  icon,
  iconAlign = 'right',
  title,
  children,
  action,
  className,
}) => {
  return (
    <div
      className={cn(
        'flex items-center gap-4 bg-white rounded-2xl px-7 py-6 border border-[#E0E0E0]',
        className
      )}
    >
      {icon && iconAlign === 'left' && (
        <span className="flex-shrink-0 flex items-center justify-center">{icon}</span>
      )}
      <div className="flex-1 min-w-0">
        {title && <div className="font-semibold text-[20px] text-[#222] mb-1 leading-tight">{title}</div>}
        <div className="text-[17px] text-[#222] leading-snug">{children}</div>
        {action && <div className="mt-2">{action}</div>}
      </div>
      {icon && iconAlign === 'right' && (
        <span className="flex-shrink-0 flex items-center justify-center">{icon}</span>
      )}
    </div>
  );
};

export default Callout; 