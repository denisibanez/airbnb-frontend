import React from 'react';
import Image from 'next/image';
import { cn } from '../../lib/utils';
import { 
  IconsInterfaceHeart, 
  IconsOutlineAirbnb, 
  IconsInterfaceSend, 
  IconsGeneralUser,
  IconsInterfaceSettings,
  IconsInterfaceHelp
} from './Icons';

import { GlobeIcon } from './IconCustomized/IconCustomized';

export interface UserMenuProps {
  isOpen: boolean;
  onClose: () => void;
  className?: string;
}

const UserMenu: React.FC<UserMenuProps> = ({
  isOpen,
  onClose,
  className,
}) => {
  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 z-40" 
        onClick={onClose}
      />
      
      {/* Menu */}
      <div className={cn(
        'absolute top-full right-0 mt-2 w-80 bg-white rounded-xl shadow-lg border border-[#E0E0E0] z-50 py-2',
        className
      )}>
        {/* Seção 1: Ações do usuário */}
        <div className="px-4 py-2">
          <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-[#F7F7F7] transition ">
            <IconsInterfaceHeart className="w-5 h-5" style={{  stroke: '#222', strokeWidth: '0.2' }} />
            <span className="text-[#222] font-medium">Favoritos</span>
          </button>
          
          <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-[#F7F7F7] transition">
            <IconsOutlineAirbnb className="w-5 h-5" style={{  stroke: '#222', strokeWidth: '0.4' }} />
            <span className="text-[#222] font-medium">Viagens</span>
          </button>
          
          <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-[#F7F7F7] transition">
            <IconsInterfaceSend className="w-5 h-5" style={{ fill: 'none', stroke: '#222', strokeWidth: '1.5' }} />
            <span className="text-[#222] font-medium">Mensagens</span>
          </button>
          
          <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-[#F7F7F7] transition">
            <IconsGeneralUser className="w-5 h-5" style={{ fill: 'none', stroke: '#222', strokeWidth: '1.5' }} />
            <span className="text-[#222] font-medium">Perfil</span>
          </button>
        </div>

        {/* Divisor */}
        <div className="border-t border-[#E0E0E0] my-2" />

        {/* Seção 2: Configurações da conta */}
        <div className="px-4 py-2">
          <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-[#F7F7F7] transition">
            <IconsInterfaceSettings className="w-5 h-5" style={{ fill: 'none', stroke: '#222', strokeWidth: '1.5' }} />
            <span className="text-[#222] font-medium">Configurações da conta</span>
          </button>
          
          <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-[#F7F7F7] transition">
            <GlobeIcon className="w-5 h-5" style={{ fill: 'none', stroke: '#222', strokeWidth: '1.5' }} />
            <span className="text-[#222] font-medium">Idiomas e moeda</span>
          </button>
          
          <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-[#F7F7F7] transition">
            <IconsInterfaceHelp className="w-5 h-5" style={{ fill: 'none', stroke: '#222', strokeWidth: '1.5' }} />
            <span className="text-[#222] font-medium">Centro de Ajuda</span>
          </button>
        </div>

        {/* Divisor */}
        <div className="border-t border-[#E0E0E0] my-2" />

        {/* Seção 3: Torne-se um Anfitrião */}
        <div className="px-4 py-2">
          <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-[#F7F7F7] transition">
            <div className="flex-1">
              <h3 className="font-bold text-[#222] text-sm mb-1">Torne-se um Anfitrião</h3>
              <p className="text-[#717171] text-xs leading-relaxed">
                Anuncie um alojamento, Experiência ou serviço e ganhe um rendimento extra: não podia ser mais fácil!
              </p>
            </div>
            <div className="flex-shrink-0">
              <Image 
                src="https://a0.muscache.com/im/pictures/airbnb-platform-assets/AirbnbPlatformAssets-UserProfile/original/5347d650-16de-4f5a-a38e-79edc988befa.png?im_w=720" 
                alt="Host illustration" 
                width={40}
                height={40}
                className="w-10 h-10 rounded-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Divisor */}
        <div className="border-t border-[#E0E0E0] my-2" />

        {/* Seção 4: Ações do anfitrião */}
        <div className="px-4 py-2">
          <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-[#F7F7F7] transition">
            <span className="text-[#222] font-medium">Convide anfitriões</span>
          </button>
          
          <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-[#F7F7F7] transition">
            <span className="text-[#222] font-medium">Encontrar coanfitriões</span>
          </button>
          
          <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-[#F7F7F7] transition">
            <span className="text-[#222] font-medium">Cartões-oferta</span>
          </button>
        </div>

        {/* Divisor */}
        <div className="border-t border-[#E0E0E0] my-2" />

        {/* Seção 5: Sair */}
        <div className="px-4 py-2">
          <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-[#F7F7F7] transition">
            <span className="text-[#222] font-medium">Sair</span>
          </button>
        </div>
      </div>
    </>
  );
};

UserMenu.displayName = 'UserMenu';

export default UserMenu;
