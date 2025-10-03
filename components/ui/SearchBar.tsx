import React, { useState } from 'react';
import { cn } from '../../lib/utils';
import { IconsInterfaceSearch } from './Icons';

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
  className?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  where = 'Pesquisar destinos',
  checkIn = 'Adicionar datas',
  checkOut = 'Adicionar datas',
  guests = 'Adicionar viajantes',
  onWhereClick,
  onCheckInClick,
  onCheckOutClick,
  onGuestsClick,
  onSearch,
  className,
}) => {
  const [isQuemHovered, setIsQuemHovered] = useState(false);
  return (
    <div
      className={cn(
        'flex items-center bg-white rounded-full shadow-lg border border-[#E0E0E0] py-1 h-[64px] w-full max-w-4xl',
        className
      )}
    >
      {/* Onde */}
      <button
        type="button"
        className="px-6 h-12 flex flex-col cursor-pointer justify-center hover:bg-[#F7F7F7] hover:h-[61px] hover:rounded-4xl transition text-left"
        onClick={onWhereClick}
        onMouseEnter={(e) => {
          const nextSeparator = e.currentTarget.nextElementSibling as HTMLElement;
          if (nextSeparator) nextSeparator.style.opacity = '0';
        }}
        onMouseLeave={(e) => {
          const nextSeparator = e.currentTarget.nextElementSibling as HTMLElement;
          if (nextSeparator) nextSeparator.style.opacity = '1';
        }}
      >
        <span className="text-xs font-semibold text-[#222] mb-1">Onde</span>
        <span className="text-sm text-[#717171]">{where}</span>
      </button>
      {/* Separador */}
      <div className="w-px h-8 bg-[#E0E0E0] transition-opacity duration-200" />
      
      {/* Check-in */}
      <button
        type="button"
        className="px-6 h-12 flex flex-col cursor-pointer justify-center hover:bg-[#F7F7F7] hover:h-[61px] hover:rounded-4xl transition text-left"
        onClick={onCheckInClick}
        onMouseEnter={(e) => {
          const prevSeparator = e.currentTarget.previousElementSibling as HTMLElement;
          const nextSeparator = e.currentTarget.nextElementSibling as HTMLElement;
          if (prevSeparator) prevSeparator.style.opacity = '0';
          if (nextSeparator) nextSeparator.style.opacity = '0';
        }}
        onMouseLeave={(e) => {
          const prevSeparator = e.currentTarget.previousElementSibling as HTMLElement;
          const nextSeparator = e.currentTarget.nextElementSibling as HTMLElement;
          if (prevSeparator) prevSeparator.style.opacity = '1';
          if (nextSeparator) nextSeparator.style.opacity = '1';
        }}
      >
        <span className="text-xs font-semibold text-[#222] mb-1">Check-in</span>
        <span className="text-sm text-[#717171]">{checkIn}</span>
      </button>
      {/* Separador */}
      <div className="w-px h-8 bg-[#E0E0E0] transition-opacity duration-200" />
      
      {/* Check-out */}
      <button
        type="button"
        className="px-6 h-12 flex flex-col cursor-pointer justify-center hover:bg-[#F7F7F7] hover:h-[61px] hover:rounded-4xl  transition text-left"
        onClick={onCheckOutClick}
        onMouseEnter={(e) => {
          const prevSeparator = e.currentTarget.previousElementSibling as HTMLElement;
          const nextSeparator = e.currentTarget.nextElementSibling as HTMLElement;
          if (prevSeparator) prevSeparator.style.opacity = '0';
          if (nextSeparator) nextSeparator.style.opacity = '0';
        }}
        onMouseLeave={(e) => {
          const prevSeparator = e.currentTarget.previousElementSibling as HTMLElement;
          const nextSeparator = e.currentTarget.nextElementSibling as HTMLElement;
          if (prevSeparator) prevSeparator.style.opacity = '1';
          if (nextSeparator) nextSeparator.style.opacity = '1';
        }}
      >
        <span className="text-xs font-semibold text-[#222] mb-1">Check-out</span>
        <span className="text-sm text-[#717171]">{checkOut}</span>
      </button>
      {/* Separador */}
      <div className="w-px h-8 bg-[#E0E0E0] transition-opacity duration-200" />
      
      {/* Quem */}
       <div className={`flex items-center px-2 relative transition-all duration-200 ${isQuemHovered ? 'bg-[#F7F7F7] rounded-full' : 'bg-transparent rounded-none'}`}>
         <button
           type="button"
           className="px-6 h-12 min-w-[232px] flex flex-col cursor-pointer justify-center hover:bg-[#F7F7F7] hover:h-[61px] hover:rounded-4xl transition text-left"
           onClick={onGuestsClick}
           onMouseEnter={(e) => {
             const prevSeparator = e.currentTarget.previousElementSibling as HTMLElement;
             if (prevSeparator) prevSeparator.style.opacity = '0';
             setIsQuemHovered(true);
           }}
           onMouseLeave={(e) => {
             const prevSeparator = e.currentTarget.previousElementSibling as HTMLElement;
             if (prevSeparator) prevSeparator.style.opacity = '1';
             setIsQuemHovered(false);
           }}
         >
           <span className="text-xs font-semibold text-[#222] mb-1">Quem</span>
           <span className="text-sm text-[#717171]">{guests}</span>
         </button>

         <button
             type="button"
             className="cursor-pointer flex items-center justify-center w-12 h-12 rounded-full bg-[#FF385C] hover:bg-[#FF5A5F] shadow-sm transition-all duration-200 relative z-10"
             onClick={onSearch}
             aria-label="Search"
           >
             <IconsInterfaceSearch className="w-6 h-6" style={{ fill: 'white' }} />
           </button>
         </div>
    </div>
  );
};

export default SearchBar; 
