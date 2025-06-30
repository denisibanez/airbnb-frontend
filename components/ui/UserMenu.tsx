import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { IconsInterfaceMenu, IconsGeneralUser } from './Icons';

export interface UserMenuOption {
  label: string;
  iconLeft?: React.ReactNode;
  onClick?: () => void;
  divider?: boolean;
}

export interface UserMenuProps {
  avatarUrl?: string;
  badge?: boolean;
  options: UserMenuOption[];
  onMenuClick?: () => void;
  className?: string;
}

const UserMenu: React.FC<UserMenuProps> = ({
  avatarUrl,
  badge,
  options,
  onMenuClick,
  className,
}) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function handle(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', handle);
    return () => document.removeEventListener('mousedown', handle);
  }, [open]);

  return (
    <div ref={ref} className={cn('relative', className)}>
      <button
        onClick={e => {
          setOpen(v => !v);
          if (onMenuClick) onMenuClick();
        }}
        className="flex items-center gap-2 border border-[#E0E0E0] rounded-full px-3 py-1.5 shadow-airbnb-01 hover:shadow-airbnb-02 transition relative"
        aria-haspopup="menu"
        aria-expanded={open}
      >
        <IconsInterfaceMenu className="w-5 h-5 text-[#222]" />
        <span className="relative">
          {avatarUrl ? (
            <img src={avatarUrl} alt="Avatar" className="w-7 h-7 rounded-full object-cover" />
          ) : (
            <IconsGeneralUser className="w-7 h-7 text-[#717171]" />
          )}
          {badge && <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-[#FF385C] rounded-full border-2 border-white" />}
        </span>
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-airbnb-03 border border-[#E0E0E0] z-50 py-2">
          {options.map((opt, i) => (
            <React.Fragment key={i}>
              {opt.divider && <div className="my-1 border-t border-[#E0E0E0]" />}
              <button
                type="button"
                className="w-full flex items-center px-4 py-2 text-[15px] rounded-lg transition-all hover:bg-[#F7F7F7] text-[#222] gap-2"
                onClick={() => {
                  setOpen(false);
                  opt.onClick && opt.onClick();
                }}
              >
                {opt.iconLeft && <span className="flex items-center mr-2">{opt.iconLeft}</span>}
                <span className="flex-1 text-left">{opt.label}</span>
              </button>
            </React.Fragment>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserMenu; 