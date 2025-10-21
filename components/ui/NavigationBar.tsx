import React, { useState, useRef, useEffect } from 'react';
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
  const [hasPlayedInitial, setHasPlayedInitial] = useState(false);
  
  const staysVideoRef = useRef<HTMLVideoElement>(null);
  const experiencesVideoRef = useRef<HTMLVideoElement>(null);
  const servicesVideoRef = useRef<HTMLVideoElement>(null);

  // Play initial animation on mount
  useEffect(() => {
    if (!hasPlayedInitial) {
      const playInitialAnimations = async () => {
        try {
          // Play all videos once on mount
          await Promise.all([
            staysVideoRef.current?.play(),
            experiencesVideoRef.current?.play(),
            servicesVideoRef.current?.play(),
          ]);
        } catch (error) {
          console.log('Video autoplay prevented:', error);
        }
      };
      playInitialAnimations();
      setHasPlayedInitial(true);
    }
  }, [hasPlayedInitial]);

  // Control video playback based on selected tab
  useEffect(() => {
    if (!hasPlayedInitial) return;

    const videos = {
      stays: staysVideoRef.current,
      experiences: experiencesVideoRef.current,
      services: servicesVideoRef.current,
    };

    // Play selected tab video once
    const selectedVideo = videos[selectedTab];
    if (selectedVideo) {
      selectedVideo.currentTime = 0;
      selectedVideo.play().catch(e => console.log('Video play error:', e));
    }
  }, [selectedTab, hasPlayedInitial]);

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
              "cursor-pointer text-[15px] hover:text-[#717171] transition flex items-center gap-2 pb-3 border-b-2 -mb-[5px] h-[64px]",
              selectedTab === 'stays' ? "font-semibold text-[#222] border-[#222]" : "font-normal text-[#222] border-transparent"
            )}
          >
            <div className="w-20 h-20 flex items-center justify-center">
              <video 
                ref={staysVideoRef}
                className="w-20 h-20 object-contain"
                playsInline
                poster="https://a0.muscache.com/im/pictures/airbnb-platform-assets/AirbnbPlatformAssets-search-bar-icons/original/a32adab1-f9df-47e1-a411-bdff91b579c3.png?im_w=240"
                preload="auto"
                muted
              >
                <source src="https://a0.muscache.com/videos/search-bar-icons/hevc/house-selected.mov#t=0.001" type="video/mp4; codecs=&quot;hvc1&quot;" />
                <source src="https://a0.muscache.com/videos/search-bar-icons/webm/house-selected.webm" type="video/webm" />
              </video>
            </div>
            <span className="text-[15px] relative right-4 top-1.5">Stays</span>
          </button>
          <button 
            onClick={() => onTabChange?.('experiences')}
            className={cn(
              "cursor-pointer text-[15px] hover:text-[#717171] transition flex items-center gap-2 relative pb-3 border-b-2 -mb-[5px]",
              selectedTab === 'experiences' ? "font-semibold text-[#222] border-[#222]" : "font-normal text-[#222] border-transparent"
            )}
          >
            <div className="w-20 h-20 flex items-center justify-center relative">
              <video 
                ref={experiencesVideoRef}
                className="w-20 h-20 object-contain"
                playsInline
                poster="https://a0.muscache.com/im/pictures/airbnb-platform-assets/AirbnbPlatformAssets-search-bar-icons/original/e47ab655-027b-4679-b2e6-df1c99a5c33d.png?im_w=240"
                preload="auto"
                muted
              >
                <source src="https://a0.muscache.com/videos/search-bar-icons/hevc/balloon-selected.mov#t=0.001" type="video/mp4; codecs=&quot;hvc1&quot;" />
                <source src="https://a0.muscache.com/videos/search-bar-icons/webm/balloon-selected.webm" type="video/webm" />
              </video>
              <span 
                className="absolute left-16 top-3.5 inline-block select-none origin-bottom-left"
                style={{
                  padding: '3px 6px',
                  fontSize: '0.5rem',
                  borderRadius: '10px 10px 10px 2px',
                  background: 'linear-gradient(357.5deg, #3e567c 1.59%, #3a5475 21.23%, #2d3c5b 58.6%, #809dc0 97.4%)',
                  boxShadow: '0 0.953955px 1.90791px rgba(60, 77, 107, 0.25), 0 3.81582px 5.72373px rgba(60, 77, 107, 0.25), inset 0 0 2px 0.5px #001c40, inset 0 -1px 3px #d7ebff',
                  color: 'white',
                  fontWeight: '600',
                  boxSizing: 'border-box',
                  cursor: 'pointer'
                }}
              >
                NEW
              </span>
            </div>
            <span className="text-[15px] relative right-6 top-1.5">Experiences</span>
          </button>
          <button 
            onClick={() => onTabChange?.('services')}
            className={cn(
              "cursor-pointer text-[15px] hover:text-[#717171] transition flex items-center gap-2 relative pb-3 border-b-2 -mb-[5px]",
              selectedTab === 'services' ? "font-semibold text-[#222] border-[#222]" : "font-normal text-[#222] border-transparent"
            )}
          >
            <div className="w-20 h-20 flex items-center justify-center relative">
              <video 
                ref={servicesVideoRef}
                className="w-20 h-20 object-contain"
                playsInline
                poster="https://a0.muscache.com/im/pictures/airbnb-platform-assets/AirbnbPlatformAssets-search-bar-icons/original/2bf5d36d-e731-4465-a8ef-91abbf2ae8ce.png?im_w=240"
                preload="auto"
                muted
              >
                <source src="https://a0.muscache.com/videos/search-bar-icons/hevc/consierge-selected.mov#t=0.001" type="video/mp4; codecs=&quot;hvc1&quot;" />
                <source src="https://a0.muscache.com/videos/search-bar-icons/webm/consierge-selected.webm" type="video/webm" />
              </video>
              <span 
                className="absolute left-16 top-3.5 inline-block select-none origin-bottom-left"
                style={{
                  padding: '3px 6px',
                  fontSize: '0.5rem',
                  borderRadius: '10px 10px 10px 2px',
                  background: 'linear-gradient(357.5deg, #3e567c 1.59%, #3a5475 21.23%, #2d3c5b 58.6%, #809dc0 97.4%)',
                  boxShadow: '0 0.953955px 1.90791px rgba(60, 77, 107, 0.25), 0 3.81582px 5.72373px rgba(60, 77, 107, 0.25), inset 0 0 2px 0.5px #001c40, inset 0 -1px 3px #d7ebff',
                  color: 'white',
                  fontWeight: '600',
                  boxSizing: 'border-box',
                  cursor: 'pointer'
                }}
              >
                NEW
              </span>
            </div>
            <span className="text-[15px] relative right-4 top-1.5">Services</span>
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
        <div className="flex justify-center my-6">
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
