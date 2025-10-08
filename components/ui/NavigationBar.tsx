import React, { useState } from 'react';
import Image from 'next/image';
import { cn } from '../../lib/utils';
import SearchBar from './SearchBar';
import UserMenu from './UserMenu';
import { IconsNeonAirbnb, IconsInterfaceMenu, IconsGeneralUser } from './Icons';

export interface NavigationBarProps {
  onLogoClick?: () => void;
  onBecomeHost?: () => void;
  onSearchBar?: React.ComponentProps<typeof SearchBar>;
  userProfileImage?: string;
  className?: string;
}

const NavigationBar: React.FC<NavigationBarProps> = ({
  onLogoClick,
  onBecomeHost,
  onSearchBar,
  userProfileImage,
  className,
}) => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  return (
    <header className={cn('w-full bg-white border-b border-[#E0E0E0] py-3 px-8', className)}>
      <div className="flex items-center justify-between">
        {/* Logo */}
        <button onClick={onLogoClick} className="flex items-center gap-2 group cursor-pointer">
          <IconsNeonAirbnb className="w-10 h-10 text-[#FF385C]  group-hover:opacity-80 transition" />
          <span className="text-[28px] font-bold text-[#FF385C] font-airbnb hidden sm:inline">airbnb</span>
        </button>
        
        {/* Ações centralizadas */}
        <div className="flex items-center gap-8">
          <button className=" cursor-pointer font-semibold text-[15px] text-[#222] hover:text-[#717171] transition">
            Stays
          </button>
          <button className=" cursor-pointer font-normal text-[15px] text-[#222] hover:text-[#717171] transition">
            Experiences
          </button>
          <button className=" cursor-pointer font-normal text-[15px] text-[#222] hover:text-[#717171] transition">
            Online Experiences
          </button>
        </div>
        
        {/* Ações à direita */}
        <div className="flex items-center gap-3">
          <button
            onClick={onBecomeHost}
            className="font-semibold text-[15px] cursor-pointer text-[#222] px-4 py-2 rounded-full hover:bg-[#F7F7F7] transition hidden md:inline"
          >
            Airbnb your home
          </button>
          
          
          {/* User Icon separado */}
          <button className="flex items-center justify-center w-10 h-10 rounded-full bg-[#F7F7F7] transition">
            {userProfileImage ? (
              <Image 
                src={userProfileImage} 
                alt="User profile" 
                width={28}
                height={28}
                className="w-10 h-10 rounded-full object-cover cursor-pointer"
              />
            ) : (
              <IconsGeneralUser className="w-7 h-7  cursor-pointer" style={{ fill: '#5b5b5b' }} />
            )}
          </button>

          {/* Menu separado */}
          <div className="relative">
            <button
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className=" cursor-pointer flex items-center justify-center w-10 h-10 rounded-full bg-[#F7F7F7] transition"
            >
              <IconsInterfaceMenu className="w-5 h-5 cursor-pointer" style={{ fill: '#5b5b5b' }} />
            </button>
            
            {/* UserMenu */}
            <UserMenu 
              isOpen={isUserMenuOpen}
              onClose={() => setIsUserMenuOpen(false)}
            />
          </div>
        </div>
      </div>
      
      {/* SearchBar centralizada abaixo */}
      {onSearchBar && (
        <div className="flex justify-center mt-8">
          <SearchBar 
            {...onSearchBar}
            className="max-w-3xl w-full" 
          />
        </div>
      )}
    </header>
  );
};

export default NavigationBar; 
