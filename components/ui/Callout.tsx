import React from 'react';
import Image, { StaticImageData } from 'next/image';
import { cn } from '../../lib/utils';

export interface CalloutProps {
  icon?: StaticImageData;
  iconAlign?: 'left' | 'right';
  title?: React.ReactNode;
  children: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
  variant?: 'default' | 'reservation' | 'rare-find';
  status?: 'canceled' | 'confirmed' | 'pending';
  image?: StaticImageData;
  reservationCode?: string;
}

const Callout: React.FC<CalloutProps> = ({
  icon,
  iconAlign = 'right',
  title,
  children,
  action,
  className,
  variant = 'default',
  status,
  image,
  reservationCode,
}) => {
  // Reservation card variant
  if (variant === 'reservation') {
    return (
      <div
        className={cn(
          'bg-white rounded-2xl px-6 py-5 border border-[#E0E0E0] max-w-sm w-full',
          className
        )}
      >
        {/* Title at the top */}
        {title && (
          <div className="font-semibold text-[20px] text-[#222] mb-4 leading-tight">
            {title}
          </div>
        )}
        
        {/* Content area with image and details */}
        <div className="flex items-start gap-4">
          {image && (
            <Image src={image} alt={title as string} width={64} height={64} className="w-16 h-16 rounded-lg object-cover flex-shrink-0" />
          )}
          {!image && (
            <div className="flex-shrink-0 w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
              
            </div>
          )}
          <div className="flex-1 min-w-0">
            {status === 'canceled' && (
              <div className="text-red-600 font-medium text-[15px] mb-1">CANCELED</div>
            )}
            <div className="font-bold text-[16px] text-[#222] leading-snug mb-1">{children}</div>
            {reservationCode && (
              <div className="text-[13px] text-[#717171]">Reservation code: {reservationCode}</div>
            )}
            {action && <div className="mt-3">{action}</div>}
          </div>
        </div>
      </div>
    );
  }

  // Rare find card variant
  if (variant === 'rare-find') {
    return (
      <div
        className={cn(
          'bg-white rounded-2xl px-7 py-6 border border-[#E0E0E0] max-w-sm w-full',
          className
        )}
      >
        <div className="flex items-center gap-4">
          <div className="flex-1 min-w-0">
            <div className="text-[17px] text-[#222] leading-snug">
              <span className="font-semibold">This is a rare find.</span> {children}
            </div>
            {action && <div className="mt-2">{action}</div>}
          </div>
          {icon && (
            <Image src={icon} alt="Rare find" width={24} height={24} className="w-6 h-6" />
          )}
        </div>
      </div>
    );
  }

  // Default variant
  return (
    <div
      className={cn(
        'flex items-center gap-4 bg-white rounded-2xl px-7 py-6 border border-[#E0E0E0] max-w-sm w-full',
        className
      )}
    >
      {icon && iconAlign === 'left' && (
        <Image src={icon} alt="Rare find" width={24} height={24} className="w-6 h-6" />
      )}
      <div className="flex-1 min-w-0">
        {title && <div className="font-semibold text-[20px] text-[#222] mb-1 leading-tight">{title}</div>}
        <div className="text-[17px] text-[#222] leading-snug">{children}</div>
        {action && <div className="mt-2">{action}</div>}
      </div>
      {icon && iconAlign === 'right' && (
        <Image src={icon} alt="Rare find" width={24} height={24} className="w-6 h-6" />
      )}
    </div>
  );
};

export default Callout; 
