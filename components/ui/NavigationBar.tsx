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
  selectedTab?: 'stays' | 'experiences' | 'services';
  onTabChange?: (tab: 'stays' | 'experiences' | 'services') => void;
  loading?: boolean;
  className?: string;
}

const NavigationBar: React.FC<NavigationBarProps> = ({
  onLogoClick,
  onBecomeHost,
  onSearchBar,
  userProfileImage,
  selectedTab = 'stays',
  onTabChange,
  loading = false,
  className,
}) => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  // Skeleton component for loading state
  const NavigationBarSkeleton = () => (
    <header className={cn('w-full bg-white border-b border-[#E0E0E0] py-3 px-8', className)}>
      <div className="flex items-center justify-between">
        {/* Logo skeleton */}
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gray-200 rounded animate-pulse"></div>
          <div className="w-20 h-8 bg-gray-200 rounded animate-pulse hidden sm:block"></div>
        </div>
        
        {/* Central actions skeleton */}
        <div className="flex items-center gap-8">
          <div className="w-16 h-6 bg-gray-200 rounded animate-pulse"></div>
          <div className="w-24 h-6 bg-gray-200 rounded animate-pulse"></div>
          <div className="w-16 h-6 bg-gray-200 rounded animate-pulse"></div>
        </div>
        
        {/* Right actions skeleton */}
        <div className="flex items-center gap-3">
          <div className="w-32 h-8 bg-gray-200 rounded-full animate-pulse hidden md:block"></div>
          <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse"></div>
          <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse"></div>
        </div>
      </div>
      
      {/* SearchBar skeleton */}
      <div className="flex justify-center mt-6">
        <div className="w-full max-w-4xl">
          <div className="bg-white rounded-full shadow-lg border border-[#Ebebeb] py-1 h-[60px] flex items-center gap-2 p-2">
            {/* Where field skeleton */}
            <div className="px-6 h-12 flex flex-col justify-center w-[210px] flex-shrink-0 rounded-full bg-gray-200 animate-pulse">
              <div className="h-3 w-16 bg-gray-300 rounded mb-1"></div>
              <div className="h-4 w-24 bg-gray-300 rounded"></div>
            </div>
            
            {/* Separator */}
            <div className="w-px h-6 bg-gray-300"></div>
            
            {/* Check-in field skeleton */}
            <div className="px-6 h-12 flex flex-col justify-center w-[140px] flex-shrink-0 rounded-full bg-gray-200 animate-pulse">
              <div className="h-3 w-12 bg-gray-300 rounded mb-1"></div>
              <div className="h-4 w-20 bg-gray-300 rounded"></div>
            </div>
            
            {/* Separator */}
            <div className="w-px h-6 bg-gray-300"></div>
            
            {/* Check-out field skeleton */}
            <div className="px-6 h-12 flex flex-col justify-center w-[140px] flex-shrink-0 rounded-full bg-gray-200 animate-pulse">
              <div className="h-3 w-12 bg-gray-300 rounded mb-1"></div>
              <div className="h-4 w-20 bg-gray-300 rounded"></div>
            </div>
            
            {/* Separator */}
            <div className="w-px h-6 bg-gray-300"></div>
            
            {/* Who/Service field skeleton */}
            <div className="px-6 h-12 flex flex-col justify-center flex-1 min-w-0 rounded-full bg-gray-200 animate-pulse">
              <div className="h-3 w-12 bg-gray-300 rounded mb-1"></div>
              <div className="h-4 w-20 bg-gray-300 rounded"></div>
            </div>
            
            {/* Search button skeleton */}
            <div className="w-12 h-12 rounded-full bg-gray-300 animate-pulse flex-shrink-0"></div>
          </div>
        </div>
      </div>
    </header>
  );

  // Show skeleton if loading
  if (loading) {
    return <NavigationBarSkeleton />;
  }

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
          <button 
            onClick={() => onTabChange?.('stays')}
            className={cn(
              "cursor-pointer text-[15px] hover:text-[#717171] transition",
              selectedTab === 'stays' ? "font-semibold text-[#222]" : "font-normal text-[#222]"
            )}
          >
            Stays
          </button>
          <button 
            onClick={() => onTabChange?.('experiences')}
            className={cn(
              "cursor-pointer text-[15px] hover:text-[#717171] transition",
              selectedTab === 'experiences' ? "font-semibold text-[#222]" : "font-normal text-[#222]"
            )}
          >
            Experiences
          </button>
          <button 
            onClick={() => onTabChange?.('services')}
            className={cn(
              "cursor-pointer text-[15px] hover:text-[#717171] transition",
              selectedTab === 'services' ? "font-semibold text-[#222]" : "font-normal text-[#222]"
            )}
          >
            Services
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
            mode={selectedTab === 'experiences' || selectedTab === 'services' ? 'experiences' : 'accommodation'}
            showServiceSelector={selectedTab === 'services'}
            className="max-w-3xl w-full" 
          />
        </div>
      )}
    </header>
  );
};

export default NavigationBar; 
