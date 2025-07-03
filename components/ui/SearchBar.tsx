import React from 'react';
import { cn } from '../../lib/utils';
import { IconsInterfaceSearch } from './Icons';

export interface SearchBarProps {
  where?: string;
  when?: string;
  guests?: string;
  onWhereClick?: () => void;
  onWhenClick?: () => void;
  onGuestsClick?: () => void;
  onSearch?: () => void;
  className?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  where = 'Anywhere',
  when = 'Any week',
  guests = 'Add guests',
  onWhereClick,
  onWhenClick,
  onGuestsClick,
  onSearch,
  className,
}) => {
  return (
    <div
      className={cn(
        'flex items-center bg-white rounded-full shadow-airbnb-02 px-2 py-1 h-[64px] w-full max-w-2xl',
        className
      )}
    >
      {/* Destino */}
      <button
        type="button"
        className="px-6 h-12 flex items-center rounded-full font-semibold text-[16px] text-[#222] hover:bg-[#F7F7F7] transition"
        onClick={onWhereClick}
      >
        {where}
      </button>
      {/* Separador */}
      <div className="w-px h-8 bg-[#E0E0E0] mx-1" />
      {/* Datas */}
      <button
        type="button"
        className="px-6 h-12 flex items-center rounded-full font-semibold text-[16px] text-[#222] hover:bg-[#F7F7F7] transition"
        onClick={onWhenClick}
      >
        {when}
      </button>
      {/* Separador */}
      <div className="w-px h-8 bg-[#E0E0E0] mx-1" />
      {/* Hóspedes */}
      <button
        type="button"
        className="px-6 h-12 flex items-center rounded-full font-normal text-[16px] text-[#717171] hover:bg-[#F7F7F7] transition"
        onClick={onGuestsClick}
      >
        {guests}
      </button>
      {/* Botão de busca */}
      <button
        type="button"
        className="ml-3 flex items-center justify-center w-12 h-12 rounded-full bg-[#FF385C] hover:bg-[#FF5A5F] shadow-airbnb-01 transition"
        onClick={onSearch}
        aria-label="Search"
      >
        <IconsInterfaceSearch className="w-6 h-6 text-white" />
      </button>
    </div>
  );
};

export default SearchBar; 