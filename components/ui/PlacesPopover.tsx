import React, { useState, useEffect } from 'react';
import { cn } from '../../lib/utils';
import { LoadingDots } from './LoadingDots';

// Importing Airbnb destination images
import locationIcon from '../../assets/images/places/13943162-b620-4595-89af-74f3d557f6ea.png';
import cityIcon from '../../assets/images/places/3963ed21-1431-400f-a21c-88686f279fc4.png';
import beachIcon from '../../assets/images/places/6621f19d-c12e-4b2d-b4e5-2a24544938a0.png';
import architectureIcon from '../../assets/images/places/7c3c8e23-e8c3-4962-9df2-ed59826b073c.png';
import nightlifeIcon from '../../assets/images/places/974a8950-1e84-49d9-a959-a9e9264d5bc7.png';
import gastronomyIcon from '../../assets/images/places/99437893-7e64-49e5-bf62-8ae72a3d0321.png';
import charmIcon from '../../assets/images/places/aeba68c0-44ba-4ee6-9835-da23d7fb0a65.png';
import trendingIcon from '../../assets/images/places/af70e151-7bfc-4743-b257-b950b06c259b.png';
import favoritesIcon from '../../assets/images/places/b0d5d3cc-f5d3-4a60-a0cb-0172860decd2.png';
import destinationIcon from '../../assets/images/places/bac337c4-8528-4941-bca0-0ecfd95f5d82.png';
import mountainIcon from '../../assets/images/places/c98f58bf-8512-43e3-af54-6c1f0b2c8a23.png';
import countrysideIcon from '../../assets/images/places/d2d9f652-03f0-4c23-9246-f825ffd1f0d4.png';
import lakeIcon from '../../assets/images/places/e9efb4fc-a002-40cf-8811-42ef5ce74518.png';
import vineyardIcon from '../../assets/images/places/ea5e5ee3-e9d8-48a1-b7e9-1003bf6fe850.png';
import islandIcon from '../../assets/images/places/eede907b-881f-4c1f-abeb-6379d89a74b6.webp';

export interface PlaceRegion {
  key: string;
  name: string;
  image: string;
}
export interface RecentSearch {
  key: string;
  title: string;
  subtitle: string;
  icon?: React.ReactNode;
  iconColor?: string;
  iconBgColor?: string;
}

export interface LocationSearch {
  key: string;
  title: string;
  subtitle: string;
  type: 'city' | 'region' | 'country' | 'landmark';
}

interface NominatimResult {
  place_id: number;
  display_name: string;
  type: string;
  class: string;
  address: {
    city?: string;
    town?: string;
    village?: string;
    state?: string;
    country?: string;
    country_code?: string;
  };
  lat: string;
  lon: string;
}

// Image mapping based on destination type
const getDestinationImage = (title: string, index: number) => {
  const titleLower = title.toLowerCase();
  
  // Specific mapping by keywords
  if (titleLower.includes('por perto') || titleLower.includes('nearby')) return locationIcon;
  if (titleLower.includes('praia') || titleLower.includes('beach') || titleLower.includes('albufeira') || titleLower.includes('málaga') || titleLower.includes('alicante')) return beachIcon;
  if (titleLower.includes('montanha') || titleLower.includes('mountain') || titleLower.includes('nazaré')) return mountainIcon;
  if (titleLower.includes('cidade') || titleLower.includes('city') || titleLower.includes('porto') || titleLower.includes('lisboa') || titleLower.includes('madri') || titleLower.includes('barcelona')) return cityIcon;
  if (titleLower.includes('vida noturna') || titleLower.includes('nightlife') || titleLower.includes('marbella')) return nightlifeIcon;
  if (titleLower.includes('arquitetura') || titleLower.includes('architecture') || titleLower.includes('sevilha') || titleLower.includes('valência')) return architectureIcon;
  if (titleLower.includes('favoritos') || titleLower.includes('favorites')) return favoritesIcon;
  if (titleLower.includes('destino') || titleLower.includes('destination')) return destinationIcon;
  if (titleLower.includes('gastronomia') || titleLower.includes('gastronomy')) return gastronomyIcon;
  if (titleLower.includes('encanto') || titleLower.includes('charm')) return charmIcon;
  if (titleLower.includes('trending') || titleLower.includes('popular')) return trendingIcon;
  if (titleLower.includes('campo') || titleLower.includes('countryside') || titleLower.includes('aveiro')) return countrysideIcon;
  if (titleLower.includes('lago') || titleLower.includes('lake')) return lakeIcon;
  if (titleLower.includes('vinha') || titleLower.includes('vineyard')) return vineyardIcon;
  if (titleLower.includes('ilha') || titleLower.includes('island')) return islandIcon;
  
  // Fallback based on index
  const imageMap = [
    locationIcon,      // 0 - Por perto
    cityIcon,          // 1 - Porto
    cityIcon,          // 2 - Lisboa
    beachIcon,         // 3 - Albufeira
    beachIcon,         // 4 - Málaga
    nightlifeIcon,     // 5 - Madri
    beachIcon,         // 6 - Alicante
    architectureIcon,  // 7 - Barcelona
    architectureIcon,  // 8 - Sevilha
    countrysideIcon,   // 9 - Aveiro
    mountainIcon,      // 10 - Nazaré
    nightlifeIcon,     // 11 - Marbella
    architectureIcon,  // 12 - Coimbra
    gastronomyIcon,    // 13 - Valência
  ];
  
  return imageMap[index] || locationIcon;
};
export interface PlacesPopoverProps {
  regions: PlaceRegion[];
  recent: RecentSearch[];
  searchQuery?: string;
  onRegionSelect?: (region: PlaceRegion) => void;
  onRecentSelect?: (search: RecentSearch) => void;
  onLocationSelect?: (location: LocationSearch | { title: string; subtitle: string; key: string; type?: string }) => void;
  className?: string;
}

export default function PlacesPopover({ recent, searchQuery = '', onRecentSelect, onLocationSelect, className }: PlacesPopoverProps) {
  const [searchResults, setSearchResults] = useState<LocationSearch[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  // Function to convert Nominatim results to LocationSearch
  const convertNominatimToLocation = (result: NominatimResult): LocationSearch => {
    const { address, type, class: resultClass } = result;
    
    // Determine location type
    let locationType: 'city' | 'region' | 'country' | 'landmark' = 'city';
    if (resultClass === 'boundary' && type === 'administrative') {
      locationType = 'region';
    } else if (resultClass === 'place' && type === 'country') {
      locationType = 'country';
    } else if (resultClass === 'tourism' || resultClass === 'historic') {
      locationType = 'landmark';
    }

    // Determine title and subtitle
    const cityName = address.city || address.town || address.village || '';
    const stateName = address.state || '';
    const countryName = address.country || '';

    let title = '';
    let subtitle = '';

    if (locationType === 'country') {
      title = countryName;
      subtitle = 'País';
    } else if (cityName) {
      title = cityName;
      subtitle = countryName;
    } else if (stateName) {
      title = stateName;
      subtitle = countryName;
    } else {
      // Usa o display_name simplificado
      const parts = result.display_name.split(',').slice(0, 2);
      title = parts[0] || result.display_name;
      subtitle = parts[1]?.trim() || countryName;
    }

    return {
      key: result.place_id.toString(),
      title: title.trim(),
      subtitle: subtitle.trim(),
      type: locationType,
    };
  };

  // Search function using Nominatim API
  useEffect(() => {
    if (searchQuery.length < 2) {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    
    const timer = setTimeout(async () => {
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?` +
          `q=${encodeURIComponent(searchQuery)}` +
          `&format=json` +
          `&addressdetails=1` +
          `&limit=8` +
          `&accept-language=pt-BR`,
          {
            headers: {
              'User-Agent': 'Airbnb-Clone-App/1.0'
            }
          }
        );

        if (!response.ok) {
          throw new Error('Error fetching locations');
        }

        const data: NominatimResult[] = await response.json();
        const locations = data.map(convertNominatimToLocation);
        
        setSearchResults(locations);
        setIsSearching(false);
      } catch (error) {
        console.error('Error fetching locations:', error);
        setSearchResults([]);
        setIsSearching(false);
      }
    }, 500); // 500ms delay to avoid too many requests

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const getLocationIcon = (type: string): string => {
    switch (type) {
      case 'city': return cityIcon.src;
      case 'region': return countrysideIcon.src;
      case 'country': return destinationIcon.src;
      case 'landmark': return architectureIcon.src;
      default: return locationIcon.src;
    }
  };

  return (
    <div className={cn('w-[380px] max-w-full rounded-3xl shadow-airbnb-03 border border-neutral-200 bg-white p-6 flex flex-col', className)}>
      {/* Search results or suggestions */}
      <div className="flex flex-col gap-1 max-h-[400px] overflow-y-auto places-popover-scroll">
        {searchQuery.length >= 2 ? (
          // Show search results
          <>
            {isSearching ? (
              <div className="flex flex-col items-center justify-center py-8 text-[#717171]">
                <div className="text-[#717171]">
                  <LoadingDots />
                </div>
              </div>
            ) : searchResults.length > 0 ? (
              searchResults.map((location) => (
                <button
                  key={location.key}
                  className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-[#F7F7F7] transition text-left group"
                  onClick={() => onLocationSelect?.(location)}
                >
                  <div className="w-12 h-12 flex items-center justify-center rounded-lg flex-shrink-0 overflow-hidden bg-[#F7F7F7]">
                    <img 
                      src={getLocationIcon(location.type)} 
                      alt={location.title}
                      className="w-12 h-12 object-contain"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-[17px] text-[#222] leading-tight truncate">{location.title}</div>
                    <div className="text-sm text-[#717171] leading-tight">{location.subtitle}</div>
                  </div>
                </button>
              ))
            ) : (
              <div className="text-[#717171]">
                <LoadingDots />
              </div>
            )}
          </>
        ) : (
          // Show suggestions when there's no search
          <>
            <div className="font-semibold text-lg text-[#222] mb-4">Suggested destinations</div>
            {recent.length === 0 && <div className="text-[#717171] text-sm">No recent searches</div>}
            {recent.map((r, index) => {
              const destinationImage = getDestinationImage(r.title, index);
              
              return (
                <button
                  key={r.key}
                  className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-[#F7F7F7] transition text-left group"
                  onClick={() => {
                    onRecentSelect?.(r);
                    onLocationSelect?.({
                      title: r.title,
                      subtitle: r.subtitle,
                      key: r.key,
                      type: 'city'
                    });
                  }}
                >
                  <div className="w-12 h-12 flex items-center justify-center rounded-lg flex-shrink-0 overflow-hidden">
                    <img 
                      src={typeof destinationImage === 'string' ? destinationImage : destinationImage.src} 
                      alt={r.title}
                      className="w-12 h-12 object-contain"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-[17px] text-[#222] leading-tight truncate">{r.title}</div>
                    <div className="text-sm text-[#717171] leading-tight">{r.subtitle}</div>
                  </div>
                </button>
              );
            })}
          </>
        )}
      </div>
    </div>
  );
}

// Custom CSS for scrollbar
const scrollbarStyles = `
  .places-popover-scroll::-webkit-scrollbar {
    width: 6px;
  }
  
  .places-popover-scroll::-webkit-scrollbar-track {
    background: transparent;
  }
  
  .places-popover-scroll::-webkit-scrollbar-thumb {
    background-color: #9CA3AF;
    border-radius: 3px;
  }
  
  .places-popover-scroll::-webkit-scrollbar-thumb:hover {
    background-color: #6B7280;
  }
`;

// Add styles to head if they don't exist
if (typeof document !== 'undefined' && !document.getElementById('places-popover-scroll-styles')) {
  const style = document.createElement('style');
  style.id = 'places-popover-scroll-styles';
  style.textContent = scrollbarStyles;
  document.head.appendChild(style);
} 
