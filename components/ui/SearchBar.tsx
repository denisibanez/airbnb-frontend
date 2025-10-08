import React, { useState, useEffect } from 'react';
import { cn } from '../../lib/utils';
import { IconsInterfaceSearch } from './Icons';
import DatePicker from './DatePicker';

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
  onDateChange,
  className,
}) => {
  const [isQuemHovered, setIsQuemHovered] = useState(false);
  const [isQuemActive, setIsQuemActive] = useState(false);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [selectedDates, setSelectedDates] = useState<[Date | null, Date | null]>([null, null]);
  
  const handleCheckInClick = () => {
    setIsDatePickerOpen(true);
    setIsQuemActive(true);
    onCheckInClick?.();
  };
  
  const handleCheckOutClick = () => {
    setIsDatePickerOpen(true);
    setIsQuemActive(true);
    onCheckOutClick?.();
  };
  
  const handleWhereClick = () => {
    setIsQuemActive(true);
    onWhereClick?.();
  };
  
  const handleDateChange = (dates: [Date | null, Date | null]) => {
    setSelectedDates(dates);
    onDateChange?.(dates);
    
    // Fechar automaticamente quando ambas as datas forem selecionadas
    if (dates[0] && dates[1]) {
      setTimeout(() => {
        setIsDatePickerOpen(false);
      }, 300);
    }
  };
  
  const formatDisplayDate = (date: Date | null) => {
    if (!date) return 'Adicionar datas';
    return date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' });
  };

  const handleSeparatorOnMouseLeave = (e: React.MouseEvent<HTMLButtonElement>, value: string, elementTarget: string) => {
    const prevSeparator = e.currentTarget[elementTarget as keyof HTMLElement] as HTMLElement;
    if (prevSeparator) prevSeparator.style.opacity = value;
  };

  // Fechar com ESC e desativar botão ao clicar fora
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsDatePickerOpen(false);
        setIsQuemActive(false);
      }
    };
    
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Se clicar fora do search bar, desativa o botão
      if (!target.closest('.search-bar-container')) {
        setIsQuemActive(false);
      }
    };
    
    if (isDatePickerOpen || isQuemActive) {
      document.addEventListener('keydown', handleEsc);
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('keydown', handleEsc);
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [isDatePickerOpen, isQuemActive]);
  
  return (
    <div className={cn('relative search-bar-container', className)}>
      <div
        className={cn(
          'flex items-center bg-white rounded-full shadow-lg border border-[#E0E0E0] py-1 h-[64px] w-full max-w-4xl',
        )}
      >
      {/* Onde */}
      <button
        type="button"
        className="px-6 h-12 flex flex-col cursor-pointer justify-center hover:bg-[#F7F7F7] hover:h-[61px] hover:rounded-4xl transition text-left w-[180px] flex-shrink-0"
        onClick={handleWhereClick}
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
        <span className="text-sm text-[#717171] truncate">{where}</span>
      </button>
      {/* Separador */}
      <div className="w-px h-8 bg-[#E0E0E0] transition-opacity duration-200" />
      
      {/* Check-in */}
      <button
        type="button"
        className="px-6 h-12 flex flex-col cursor-pointer justify-center hover:bg-[#F7F7F7] hover:h-[61px] hover:rounded-4xl transition text-left w-[140px] flex-shrink-0"
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
      <div className="w-px h-8 bg-[#E0E0E0] transition-opacity duration-200" />
      
      {/* Check-out */}
      <button
        type="button"
        className="px-6 h-12 flex flex-col cursor-pointer justify-center hover:bg-[#F7F7F7] hover:h-[61px] hover:rounded-4xl  transition text-left w-[140px] flex-shrink-0"
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
      <div className="w-px h-8 bg-[#E0E0E0] transition-opacity duration-200" />
      
      {/* Quem */}
       <div 
         className={`flex items-center px-2 relative transition-all duration-200 flex-1 ${isQuemHovered ? 'bg-[#F7F7F7] rounded-full h-[61px]' : 'bg-transparent rounded-none'}`}
         onMouseEnter={(e) => {
          handleSeparatorOnMouseLeave(e, '0', 'previousElementSibling')
           setIsQuemHovered(true);
         }}
         onMouseLeave={(e) => {
          handleSeparatorOnMouseLeave(e, '1', 'previousElementSibling')
           setIsQuemHovered(false);
         }}
       >
         <button
           type="button"
           className="px-6 h-12 flex flex-col cursor-pointer justify-center hover:bg-[#F7F7F7] hover:h-[61px] hover:rounded-4xl transition text-left flex-1"
           onClick={() => {
             setIsQuemActive(true);
             onGuestsClick?.();
           }}
           onBlur={() => setIsQuemActive(false)}
         >
           <span className="text-xs font-semibold text-[#222] mb-1">Quem</span>
           <span className="text-sm text-[#717171]">{guests}</span>
         </button>

         <button
             type="button"
             className={cn(
               "cursor-pointer flex items-center justify-center rounded-full shadow-sm transition-all duration-300 ease-in-out relative z-10 h-12  overflow-hidden",
               isQuemActive 
                 ? "bg-gradient-to-r from-[#E61E4D] via-[#E31C5F] to-[#D70466] hover:brightness-110 px-6 gap-2 w-[160px]" 
                 : "bg-[#FF385C] hover:bg-gradient-to-r hover:from-[#E61E4D] hover:via-[#E31C5F] hover:to-[#D70466] hover:brightness-110 w-12 px-0 gap-0"
             )}
             onClick={onSearch}
             aria-label="Search"
           >
             <IconsInterfaceSearch className="w-5 h-5 flex-shrink-0" style={{ fill: 'white' }} />
             <span className={cn(
               "text-white font-semibold text-base whitespace-nowrap transition-all duration-300",
               isQuemActive ? "opacity-100 max-w-[100px] ml-2" : "opacity-0 max-w-0 ml-0"
             )}>
               Pesquisar
             </span>
           </button>
         </div>
      </div>
      
      {/* DatePicker */}
      {isDatePickerOpen && (
        <>
          {/* Overlay para fechar ao clicar fora */}
          <div 
            className="fixed inset-0 bg-black/20 z-40"
            onClick={() => setIsDatePickerOpen(false)}
          />
          <div className="absolute top-full mt-4 left-1/2 transform -translate-x-1/2 z-50">
            <DatePicker
              value={selectedDates}
              onChange={handleDateChange}
              language="pt"
            />
          </div>
        </>
      )}
    </div>
  );
};

export default SearchBar; 
