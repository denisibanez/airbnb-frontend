import React, { useState, useEffect, useRef } from 'react';
import { cn } from '../../lib/utils';
import { IconsInterfaceSearch } from './Icons';
import IconsInterfaceClose from './Icons/IconsInterfaceClose';
import DatePicker from './DatePicker';
import GuestSelector from './GuestSelector';
import ServiceSelector from './ServiceSelector';
import PlacesPopover from './PlacesPopover';

export interface SearchBarProps {
  where?: string;
  checkIn?: string;
  checkOut?: string;
  guests?: string;
  onWhereClick?: () => void;
  onCheckInClick?: () => void;
  onCheckOutClick?: () => void;
  onGuestsClick?: () => void;
  onSearch?: () => void;
  onDateChange?: (dates: [Date | null, Date | null]) => void;
  onLocationSelect?: (location: { key: string; title: string; subtitle: string; type: string }) => void;
  mode?: 'experiences' | 'accommodation'; // novo prop para controlar o modo
  showServiceSelector?: boolean; // Se true, mostra ServiceSelector ao invés de GuestSelector
  // Initial values
  initialDates?: [Date | null, Date | null];
  initialLocation?: string;
  initialGuestCounts?: { adults: number; children: number; infants: number; pets: number };
  initialServices?: string;
  loading?: boolean; // Prop para mostrar skeleton loading
  className?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  checkIn = 'Add dates',
  checkOut = 'Add dates',
  guests = 'Add guests',
  onCheckInClick,
  onCheckOutClick,
  onGuestsClick,
  onSearch,
  onDateChange,
  onLocationSelect,
  mode = 'accommodation',
  showServiceSelector = false,
  initialDates,
  initialLocation,
  initialGuestCounts,
  initialServices,
  loading = false,
  className,
}) => {
  const [isQuemHovered, setIsQuemHovered] = useState(false);
  const [isQuemActive, setIsQuemActive] = useState(false);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [isGuestSelectorOpen, setIsGuestSelectorOpen] = useState(false);
  const [isPlacesPopoverOpen, setIsPlacesPopoverOpen] = useState(false);
  const [selectedDates, setSelectedDates] = useState<[Date | null, Date | null]>(initialDates || [null, null]);
  const [guestCounts, setGuestCounts] = useState(initialGuestCounts || { adults: 1, children: 0, infants: 0, pets: 0 });
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState(initialLocation || '');
  const [activeField, setActiveField] = useState<'where' | 'checkin' | 'checkout' | 'guests' | null>(null);
  const [selectedService, setSelectedService] = useState<string>(initialServices || '');
  
  // Track if it's the first render to avoid clearing on mount
  const isFirstRender = useRef(true);

  // Skeleton component for loading state
  const SearchBarSkeleton = () => (
    <div className={cn("search-bar-container relative bg-white rounded-full shadow-airbnb-03 border border-neutral-200 p-2 flex items-center gap-2", className)}>
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
  );

  // Reset all selections when mode changes (but not on first render)
  useEffect(() => {
    // Skip on first render
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    
    // Reset dates
    setSelectedDates([null, null]);
    
    // Reset location
    setSelectedLocation('');
    setSearchQuery('');
    
    // Reset guests
    setGuestCounts({ adults: 1, children: 0, infants: 0, pets: 0 });
    
    // Reset services
      setSelectedService('');
    
    // Note: We DON'T close popovers here, they stay open
  }, [mode, showServiceSelector]);
  
  const handleCheckInClick = () => {
    setIsDatePickerOpen(true);
    setIsGuestSelectorOpen(false);
    setIsPlacesPopoverOpen(false);
    setIsQuemActive(true);
    setActiveField('checkin');
    onCheckInClick?.();
  };
  
  const handleCheckOutClick = () => {
    setIsDatePickerOpen(true);
    setIsGuestSelectorOpen(false);
    setIsPlacesPopoverOpen(false);
    setIsQuemActive(true);
    setActiveField('checkout');
    onCheckOutClick?.();
  };
  
  const handleLocationSearch = (query: string) => {
    setSearchQuery(query);
    setSelectedLocation(''); // Clear selected location when user types
    setActiveField('where');
    if (query.length >= 2) {
      setIsPlacesPopoverOpen(true);
    } else if (query.length === 0) {
      setIsPlacesPopoverOpen(false);
    }
  };

  const handleLocationSelect = (location: { key: string; title: string; subtitle: string; type?: string }) => {
    const fullLocation = location.subtitle ? `${location.title}, ${location.subtitle}` : location.title;
    setSelectedLocation(fullLocation);
    setSearchQuery('');
    setIsPlacesPopoverOpen(false);
    setIsQuemActive(false);
    setActiveField(null);
    onLocationSelect?.(location as { key: string; title: string; subtitle: string; type: string });
  };

  const handleClearLocation = () => {
    setSelectedLocation('');
    setSearchQuery('');
    setIsPlacesPopoverOpen(false);
    setActiveField(null);
  };

  const handleClearGuests = () => {
    if (showServiceSelector) {
      setSelectedService('');
    } else {
      setGuestCounts({ adults: 1, children: 0, infants: 0, pets: 0 });
    }
    setIsGuestSelectorOpen(false);
    setIsQuemActive(false);
    setActiveField(null);
  };
  
  const handleDateChange = (dates: [Date | null, Date | null]) => {
    setSelectedDates(dates);
    onDateChange?.(dates);
    
    // Automatically close when both dates are selected
    if (dates[0] && dates[1]) {
      setTimeout(() => {
        setIsDatePickerOpen(false);
      }, 300);
    }
  };
  
  const formatDisplayDate = (date: Date | null) => {
    if (!date) return 'Add dates';
    return date.toLocaleDateString('en-US', { day: '2-digit', month: 'short' });
  };

  const formatGuestsText = () => {
    // Check if it's the default state (1 adult, 0 everything else)
      const isDefaultState = guestCounts.adults === 1 && 
                            guestCounts.children === 0 && 
                            guestCounts.infants === 0 && 
                            guestCounts.pets === 0 &&
                            selectedService === '';
    
    if (isDefaultState) {
      return showServiceSelector ? 'Add service' : (guests || 'Add guests');
    }
    
    if (mode === 'experiences') {
      // If a service is selected, show only the service name
      if (selectedService) {
        const serviceNames: { [key: string]: string } = {
          'photography': 'Serviços de fotografia',
          'chefs': 'Chefs',
          'ready-food': 'Comida pronta',
          'massage': 'Massagem',
          'training': 'Serviços de treino',
          'makeup': 'Maquilhagem',
          'hair': 'Cabelo',
          'spa': 'Tratamentos de spa',
          'catering': 'Catering',
          'manicure': 'Manicure'
        };
        return serviceNames[selectedService] || selectedService;
      }
      
      // If no service selected, show guest counts
      const parts: string[] = [];
      if (guestCounts.adults > 0) parts.push(`${guestCounts.adults} ${guestCounts.adults === 1 ? 'Adult' : 'Adults'}`);
      if (guestCounts.children > 0) parts.push(`${guestCounts.children} ${guestCounts.children === 1 ? 'Child' : 'Children'}`);
      if (guestCounts.infants > 0) parts.push(`${guestCounts.infants} ${guestCounts.infants === 1 ? 'Infant' : 'Infants'}`);
      
      return parts.length > 0 ? parts.join(', ') : (guests || 'Add guests');
    } else {
      const totalGuests = guestCounts.adults + guestCounts.children;
      const parts: string[] = [];
      
      if (totalGuests > 0) {
        parts.push(`${totalGuests} ${totalGuests === 1 ? 'guest' : 'guests'}`);
      }
      if (guestCounts.infants > 0) {
        parts.push(`${guestCounts.infants} ${guestCounts.infants === 1 ? 'infant' : 'infants'}`);
      }
      if (guestCounts.pets > 0) {
        parts.push(`${guestCounts.pets} ${guestCounts.pets === 1 ? 'pet' : 'pets'}`);
      }
      
      return parts.length > 0 ? parts.join(', ') : (guests || 'Add guests');
    }
  };

  const handleSeparatorOnMouseLeave = (e: React.MouseEvent<HTMLElement>, value: string, elementTarget: string) => {
    const prevSeparator = e.currentTarget[elementTarget as keyof HTMLElement] as HTMLElement;
    if (prevSeparator) prevSeparator.style.opacity = value;
  };

  // Close with ESC and deactivate button on outside click
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsDatePickerOpen(false);
        setIsGuestSelectorOpen(false);
        setIsPlacesPopoverOpen(false);
        setIsQuemActive(false);
        setActiveField(null);
      }
    };
    
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Don't close if clicking on navigation buttons (tab switching)
      if (target.closest('button') && target.textContent && 
          (target.textContent.includes('Stays') || 
           target.textContent.includes('Experiences') || 
           target.textContent.includes('Services'))) {
        return;
      }
      // Se clicar fora do search bar, desativa o botão
      if (!target.closest('.search-bar-container')) {
        setIsQuemActive(false);
        setIsDatePickerOpen(false);
        setIsGuestSelectorOpen(false);
        setIsPlacesPopoverOpen(false);
        setActiveField(null);
      }
    };
    
    if (isDatePickerOpen || isGuestSelectorOpen || isPlacesPopoverOpen || isQuemActive) {
      console.log('Adicionando listeners, estados:', { isDatePickerOpen, isGuestSelectorOpen, isPlacesPopoverOpen, isQuemActive });
      document.addEventListener('keydown', handleEsc);
      // Adiciona listener com um pequeno delay para evitar fechamento imediato
      const timer = setTimeout(() => {
        console.log('Adicionando listener de clique externo (após 100ms)');
        document.addEventListener('mousedown', handleClickOutside);
      }, 100);
      
      return () => {
        clearTimeout(timer);
        document.removeEventListener('keydown', handleEsc);
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [isDatePickerOpen, isGuestSelectorOpen, isPlacesPopoverOpen, isQuemActive]);
  
  // Show skeleton if loading
  if (loading) {
    return <SearchBarSkeleton />;
  }

  return (
    <div className={cn('relative search-bar-container', className)}>
      <div
        className={cn(
          'flex items-center rounded-full shadow-lg border border-[#Ebebeb] py-1 h-[60px] w-full max-w-4xl transition-all duration-300',
          isQuemActive ? 'bg-[#ebebeb]' : 'bg-white'
        )}
      >
      {/* Onde */}
      <div 
        className={cn(
          "px-6 h-12 flex flex-col justify-center w-[210px] flex-shrink-0 rounded-full transition-all duration-200 hover:bg-[#dddddd] hover:h-[61px] relative",
          activeField === 'where' && isQuemActive ? "bg-white h-[61px]" : ""
        )}
      >
        <span className="text-xs font-semibold text-[#222] mb-1">Where</span>
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder={!selectedLocation && !searchQuery ? "Search destinations" : ""}
            value={selectedLocation || searchQuery}
            onChange={(e) => handleLocationSearch(e.target.value)}
            onFocus={() => {
              setIsPlacesPopoverOpen(true);
              setIsDatePickerOpen(false);
              setIsGuestSelectorOpen(false);
              setIsQuemActive(true);
              setActiveField('where');
            }}
            className="text-sm text-[#717171] bg-transparent border-none outline-none placeholder-[#717171] w-full"
          />
          {(selectedLocation || searchQuery) && (
            <button
              onClick={handleClearLocation}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 w-6 h-6 flex items-center justify-center rounded-full hover:bg-gray-200 transition-colors"
              aria-label="Clear search"
            >
             <IconsInterfaceClose className="w-4 h-4 cursor-pointer" />
            </button>
          )}
        </div>
      </div>
      {/* Separador */}
      <div className="w-px h-8 bg-[#dddddd] transition-opacity duration-200" />
      
      {/* Check-in */}
      <button
        type="button"
        className={cn(
          "px-6 h-12 flex flex-col cursor-pointer justify-center hover:h-[61px] hover:rounded-4xl transition text-left w-[140px] flex-shrink-0",
          activeField === 'checkin' && isQuemActive 
            ? "bg-white h-[61px] rounded-full"
            : "hover:bg-[#dddddd] rounded-full"
        )}
        onClick={handleCheckInClick}
        onMouseEnter={(e) => {
          handleSeparatorOnMouseLeave(e, '0', 'previousElementSibling')
          handleSeparatorOnMouseLeave(e, '0', 'nextElementSibling')
        }}
        onMouseLeave={(e) => {
          handleSeparatorOnMouseLeave(e, '1', 'previousElementSibling')
          handleSeparatorOnMouseLeave(e, '1', 'nextElementSibling')
        }}
      >
        <span className="text-xs font-semibold text-[#222] mb-1">Check-in</span>
        <span className="text-sm text-[#717171] truncate">{selectedDates[0] ? formatDisplayDate(selectedDates[0]) : checkIn}</span>
      </button>
      {/* Separador */}
      <div className="w-px h-8 bg-[#dddddd] transition-opacity duration-200" />
      
      {/* Check-out */}
      <button
        type="button"
        className={cn(
          "px-6 h-12 flex flex-col cursor-pointer justify-center hover:h-[61px] hover:rounded-4xl transition text-left w-[140px] flex-shrink-0",
          activeField === 'checkout' && isQuemActive 
            ? "bg-white h-[61px] rounded-full"
            : "rounded-full hover:bg-[#dddddd]"
        )}
        onClick={handleCheckOutClick}
        onMouseEnter={(e) => {
          handleSeparatorOnMouseLeave(e, '0', 'previousElementSibling')
          handleSeparatorOnMouseLeave(e, '0', 'nextElementSibling')
        }}
        onMouseLeave={(e) => {
          handleSeparatorOnMouseLeave(e, '1', 'previousElementSibling')
          handleSeparatorOnMouseLeave(e, '1', 'nextElementSibling')
        }}
      >
        <span className="text-xs font-semibold text-[#222] mb-1">Check-out</span>
        <span className="text-sm text-[#717171] truncate">{selectedDates[1] ? formatDisplayDate(selectedDates[1]) : checkOut}</span>
      </button>
      {/* Separador */}
      <div className="w-px h-8 bg-[#dddddd] transition-opacity duration-200" />
      
      {/* Quem */}
       <div 
         className={cn(
           "flex items-center px-2 relative transition-all duration-200 flex-1 min-w-0",
           activeField === 'guests' && isQuemActive
             ? 'bg-white rounded-full h-[61px]'
             : isQuemActive 
               ? (isQuemHovered ? 'bg-white rounded-full h-[61px]' : 'bg-transparent rounded-none')
               : (isQuemHovered ? 'bg-[#dddddd] rounded-full h-[61px]' : 'bg-transparent rounded-none')
         )}
         onMouseEnter={(e) => {
          handleSeparatorOnMouseLeave(e, '0', 'previousElementSibling')
           setIsQuemHovered(true);
         }}
         onMouseLeave={(e) => {
          handleSeparatorOnMouseLeave(e, '1', 'previousElementSibling')
           setIsQuemHovered(false);
         }}
       >
        <div className="relative flex-1 min-w-0 overflow-hidden">
          <button
            type="button"
            className={cn(
              "px-6 h-12 flex flex-col cursor-pointer justify-center hover:h-[61px] hover:rounded-4xl transition text-left w-full",
              
            )}
            onClick={(e) => {
              e.stopPropagation();
              console.log('Clicou em Quem, estado atual:', isGuestSelectorOpen);
              setIsGuestSelectorOpen(!isGuestSelectorOpen);
              setIsDatePickerOpen(false);
              setIsPlacesPopoverOpen(false);
              setIsQuemActive(true);
              setActiveField('guests');
              onGuestsClick?.();
            }}
          >
            <span className="text-xs font-semibold text-[#222] mb-1">{showServiceSelector ? 'Service type' : 'Who'}</span>
            <span className="text-sm text-[#717171] overflow-hidden text-ellipsis block truncate">{formatGuestsText()}</span>
          </button>
          
          {/* Clear button for guests/services */}
          {(selectedService || (guestCounts.adults !== 1 || guestCounts.children !== 0 || guestCounts.infants !== 0 || guestCounts.pets !== 0)) && (
            <button
              type="button"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 w-6 h-6 flex items-center justify-center rounded-full hover:bg-gray-200 transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                handleClearGuests();
              }}
              aria-label="Clear selection"
            >
              <IconsInterfaceClose className="w-4 h-4 cursor-pointer" />
            </button>
          )}
        </div>

         <button
             type="button"
             className={cn(
               "cursor-pointer flex items-center justify-center rounded-full shadow-sm transition-all duration-300 ease-in-out relative z-10 h-12 overflow-hidden flex-shrink-0",
               isQuemActive 
                 ? "bg-gradient-to-r from-[#E61E4D] via-[#E31C5F] to-[#D70466] hover:from-[#FF5A5F] hover:via-[#FF385C] hover:to-[#E61E4D] w-[120px]" 
                 : "bg-[#FF385C] hover:bg-gradient-to-r hover:from-[#E61E4D] hover:via-[#E31C5F] hover:to-[#D70466] hover:brightness-110 w-12 px-0 gap-0"
             )}
             onClick={onSearch}
             aria-label="Search"
           >
             <IconsInterfaceSearch className="w-5 h-5 flex-shrink-0" style={{ fill: 'white' }} />
             <span className={cn(
               "text-white font-semibold text-base whitespace-nowrap transition-all duration-300",
               isQuemActive ? "opacity-100 max-w-[80px] ml-2" : "opacity-0 max-w-0 ml-0"
             )}>
               Search
             </span>
           </button>
         </div>
      </div>
      
      {/* DatePicker */}
      {isDatePickerOpen && (
        <div className="absolute top-full mt-4 left-1/2 transform -translate-x-1/2 z-50">
          <DatePicker
            value={selectedDates}
            onChange={handleDateChange}
            language="en"
          />
        </div>
      )}

      {/* GuestSelector - mostra quando não for ServiceSelector */}
      {isGuestSelectorOpen && !showServiceSelector ? (
        <div className="absolute top-full mt-4 right-0 z-50">
          <GuestSelector
            value={guestCounts}
            mode={mode}
            onChange={(value) => {
              console.log('GuestSelector onChange:', value);
              if (value) {
                setGuestCounts(value);
              }
            }}
            onClose={() => {
              console.log('Closing GuestSelector');
              setIsGuestSelectorOpen(false);
              setIsQuemActive(false);
              setActiveField(null);
            }}
          />
        </div>
      ) : null}
      
      {/* ServiceSelector - apenas quando showServiceSelector for true */}
      {showServiceSelector && isGuestSelectorOpen ? (
        <div className="absolute top-full mt-4 right-0 z-50">
          <ServiceSelector
            value={selectedService}
            onChange={(service) => {
              console.log('ServiceSelector onChange:', service);
              setSelectedService(service);
            }}
            onClose={() => {
              console.log('Closing ServiceSelector');
              setIsGuestSelectorOpen(false);
              setIsQuemActive(false);
              setActiveField(null);
            }}
          />
        </div>
      ) : null}
      
      {/* PlacesPopover */}
      {isPlacesPopoverOpen && (
        <div className="absolute top-full mt-4 left-0 z-50">
          <PlacesPopover
            regions={[]}
            recent={[
              { 
                key: '1', 
                title: 'Nearby', 
                subtitle: 'Discover what\'s nearby',
                iconBgColor: 'bg-blue-50',
                iconColor: 'text-blue-500'
              },
              { 
                key: '2', 
                title: 'Porto, Porto District', 
                subtitle: 'Because your wishlist already has listings in Porto',
                iconBgColor: 'bg-green-50',
                iconColor: 'text-green-500'
              },
              { 
                key: '3', 
                title: 'Lisbon, Lisbon District', 
                subtitle: 'Because your wishlist already has listings in Lisbon',
                iconBgColor: 'bg-red-50',
                iconColor: 'text-red-500'
              },
              { 
                key: '4', 
                title: 'Albufeira, Faro', 
                subtitle: 'Popular beach destination',
                iconBgColor: 'bg-red-50',
                iconColor: 'text-red-500'
              },
              { 
                key: '5', 
                title: 'Málaga, Spain', 
                subtitle: 'For places like Alcazaba de Málaga',
                iconBgColor: 'bg-red-50',
                iconColor: 'text-red-500'
              },
              { 
                key: '6', 
                title: 'Madrid, Spain', 
                subtitle: 'For the vibrant nightlife',
                iconBgColor: 'bg-red-50',
                iconColor: 'text-red-500'
              },
              { 
                key: '7', 
                title: 'Alicante, Spain', 
                subtitle: 'For the seaside charm',
                iconBgColor: 'bg-green-50',
                iconColor: 'text-green-500'
              },
            ]}
            searchQuery={searchQuery}
            onRecentSelect={(search) => {
              console.log('Selected destination:', search);
              setIsPlacesPopoverOpen(false);
              setIsQuemActive(false);
            }}
            onLocationSelect={handleLocationSelect}
          />
        </div>
      )}
    </div>
  );
};

export default SearchBar; 
