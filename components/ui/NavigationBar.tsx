import React from 'react';
import { cn } from '@/lib/utils';
import SearchBar from './SearchBar';
import { IconsNeonAirbnb, IconsInterfaceMenu, IconsGeneralUser } from './Icons';
import { GlobeIcon } from './IconCustomized/IconCustomized';

export interface NavigationBarProps {
  onLogoClick?: () => void;
  onBecomeHost?: () => void;
  onLanguageClick?: () => void;
  onUserMenuClick?: () => void;
  onSearchBar?: React.ComponentProps<typeof SearchBar>;
  className?: string;
}

const NavigationBar: React.FC<NavigationBarProps> = ({
  onLogoClick,
  onBecomeHost,
  onLanguageClick,
  onUserMenuClick,
  onSearchBar,
  className,
}) => {
  return (
    <header className={cn('w-full bg-white border-b border-[#E0E0E0] py-3 px-8 flex items-center justify-between', className)}>
      {/* Logo */}
      <button onClick={onLogoClick} className="flex items-center gap-2 group">
        <IconsNeonAirbnb className="w-10 h-10 text-[#FF385C] group-hover:opacity-80 transition" />
        <span className="text-[28px] font-bold text-[#FF385C] font-airbnb hidden sm:inline">airbnb</span>
      </button>
      {/* SearchBar central */}
      <div className="flex-1 flex justify-center">
        <SearchBar {...onSearchBar} className="max-w-xl w-full" />
      </div>
      {/* Ações à direita */}
      <div className="flex items-center gap-3 ml-6">
        <button
          onClick={onBecomeHost}
          className="font-semibold text-[15px] text-[#222] px-4 py-2 rounded-full hover:bg-[#F7F7F7] transition hidden md:inline"
        >
          Become a Host
        </button>
        <button
          onClick={onLanguageClick}
          className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-[#F7F7F7] transition"
        >
          <GlobeIcon className="w-5 h-5 text-[#222]" />
        </button>
        {/* UserMenu */}
        <button
          onClick={onUserMenuClick}
          className="flex items-center gap-2 border border-[#E0E0E0] rounded-full px-3 py-1.5 shadow-airbnb-01 hover:shadow-airbnb-02 transition relative"
        >
          <IconsInterfaceMenu className="w-5 h-5 text-[#222]" />
          <span className="relative">
            <IconsGeneralUser className="w-7 h-7 text-[#717171]" />
            {/* Badge de notificação */}
            <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-[#FF385C] rounded-full border-2 border-white" />
          </span>
        </button>
      </div>
    </header>
  );
};

export default NavigationBar; 