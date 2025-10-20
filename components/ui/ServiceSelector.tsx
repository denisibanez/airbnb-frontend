import React, { useState } from 'react';
import { cn } from '../../lib/utils';
import IconsOutlineCamera from './Icons/IconsOutlineCamera';
import IconsOutlineChefSKitchens from './Icons/IconsOutlineChefSKitchens';
import IconsGeneralUtensils from './Icons/IconsGeneralUtensils';
import IconsOutlineCleaning from './Icons/IconsOutlineCleaning';
import IconsGeneralClock from './Icons/IconsGeneralClock';
import IconsOutlineHairDryer from './Icons/IconsOutlineHairDryer';
import IconsOutlineFitness from './Icons/IconsOutlineFitness';
import IconsGeneralStar from './Icons/IconsGeneralStar';
import IconsOutlineGift from './Icons/IconsOutlineGift';
import IconsGeneralHeart from './Icons/IconsGeneralHeart';

export interface ServiceSelectorProps {
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
  onClose?: () => void;
}

const SERVICES = [
  {
    id: 'photography',
    label: 'Serviços de fotografia',
    icon: <IconsOutlineCamera className="w-6 h-6" />
  },
  {
    id: 'chefs',
    label: 'Chefs',
    icon: <IconsOutlineChefSKitchens className="w-6 h-6" />
  },
  {
    id: 'ready-food',
    label: 'Comida pronta',
    icon: <IconsGeneralUtensils className="w-6 h-6" />
  },
  {
    id: 'massage',
    label: 'Massagem',
    icon: <IconsOutlineCleaning className="w-6 h-6" />
  },
  {
    id: 'training',
    label: 'Serviços de treino',
    icon: <IconsGeneralClock className="w-6 h-6" />
  },
  {
    id: 'makeup',
    label: 'Maquilhagem',
    icon: <IconsGeneralStar className="w-6 h-6" />
  },
  {
    id: 'hair',
    label: 'Cabelo',
    icon: <IconsOutlineHairDryer className="w-6 h-6" />
  },
  {
    id: 'spa',
    label: 'Tratamentos de spa',
    icon: <IconsOutlineFitness className="w-6 h-6" />
  },
  {
    id: 'catering',
    label: 'Catering',
    icon: <IconsOutlineGift className="w-6 h-6" />
  },
  {
    id: 'manicure',
    label: 'Manicure',
    icon: <IconsGeneralHeart className="w-6 h-6" />
  }
];

export default function ServiceSelector({ value = '', onChange, className, onClose }: ServiceSelectorProps) {
  const [selectedService, setSelectedService] = useState<string>(value);

  const handleServiceSelect = (serviceId: string) => {
    const newSelection = selectedService === serviceId ? '' : serviceId;
    setSelectedService(newSelection);
    onChange?.(newSelection);
  };

  return (
    <div 
      className={cn('w-[380px] max-w-full rounded-3xl shadow-airbnb-03 border border-neutral-200 bg-white p-6 flex flex-col gap-3', className)}
      onMouseDown={e => e.stopPropagation()}
    >
      <div className="font-semibold text-lg text-[#222] mb-2">Select services</div>
      
      <div className="grid grid-cols-2 gap-3">
        {SERVICES.map((service) => (
          <button
            key={service.id}
            onClick={() => handleServiceSelect(service.id)}
            className={cn(
              'flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all duration-200',
              selectedService === service.id
                ? 'border-[#222] bg-[#F7F7F7]'
                : 'border-[#EBEBEB] hover:border-[#DDDDDD] hover:bg-[#F7F7F7]'
            )}
            onMouseDown={e => e.stopPropagation()}
          >
            <div className="text-2xl mb-2">{service.icon}</div>
            <div className="text-sm font-medium text-[#222] text-center leading-tight">
              {service.label}
            </div>
          </button>
        ))}
      </div>

      <div className="mt-4 text-sm text-[#717171] text-left">
        Select a service for your experience.
      </div>
      
      <button
        className="mt-6 ml-auto text-base font-medium underline text-[#222] bg-transparent border-0 p-0 cursor-pointer hover:text-black"
        type="button"
        onClick={onClose}
      >
        Close
      </button>
    </div>
  );
}
