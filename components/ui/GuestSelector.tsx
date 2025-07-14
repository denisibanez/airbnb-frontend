import React, { useState } from 'react';
import { cn } from '../../lib/utils';

export interface GuestSelectorProps {
  value?: {
    adults: number;
    children: number;
    infants: number;
    pets: number;
  };
  onChange?: (value: GuestSelectorProps['value']) => void;
  className?: string;
  maxGuests?: number; // máximo de adultos+crianças
  maxInfants?: number; // máximo de bebês
  maxPets?: number; // máximo de pets
  allowPets?: boolean; // se false, pets não podem ser adicionados
  onClose?: () => void; // callback para fechar
}

const GUESTS = [
  {
    key: 'adults',
    label: 'Adults',
    description: 'Ages 13 or above',
    min: 1,
  },
  {
    key: 'children',
    label: 'Children',
    description: 'Ages 2-12',
    min: 0,
  },
  {
    key: 'infants',
    label: 'Infants',
    description: 'Under 2',
    min: 0,
  },
  {
    key: 'pets',
    label: 'Pets',
    description: 'Bringing a service animal?',
    min: 0,
  },
] as const;

type GuestKey = typeof GUESTS[number]['key'];

export default function GuestSelector({ value, onChange, className, maxGuests = 16, maxInfants = 5, maxPets = 2, allowPets = true, onClose }: GuestSelectorProps) {
  const [internal, setInternal] = useState({ adults: 1, children: 0, infants: 0, pets: 0 });
  const guests = value || internal;
  const totalGuests = guests.adults + guests.children;

  function update(key: GuestKey, delta: number) {
    const min = GUESTS.find(g => g.key === key)!.min;
    let next = { ...guests, [key]: Math.max(min, guests[key] + delta) };
    // Limites
    if (key === 'adults' || key === 'children') {
      if (next.adults + next.children > maxGuests) return;
    }
    if (key === 'infants' && next.infants > maxInfants) return;
    if (key === 'pets' && (!allowPets || next.pets > maxPets)) return;
    if (!value) setInternal(next);
    onChange?.(next);
  }

  return (
    <div 
      className={cn('w-[380px] max-w-full rounded-3xl shadow-airbnb-03 border border-neutral-200 bg-white p-6 flex flex-col gap-1', className)}
      onMouseDown={e => e.stopPropagation()}
    >
      {GUESTS.map(g => {
        // Limites para +
        let plusDisabled = false;
        if (g.key === 'adults' || g.key === 'children') {
          plusDisabled = totalGuests >= maxGuests;
        }
        if (g.key === 'infants') {
          plusDisabled = guests.infants >= maxInfants;
        }
        if (g.key === 'pets') {
          plusDisabled = !allowPets || guests.pets >= maxPets;
        }
        return (
          <div key={g.key} className="flex items-center justify-between py-2">
            <div>
              <div className="font-medium text-[17px] text-[#222]">
                {g.label}
              </div>
              <div className="text-sm text-[#717171]">
                {g.key === 'pets' ? (
                  <>
                    <span>Menos de 2 anos</span><br />
                    <a href="#" className="text-[#222] underline cursor-pointer text-sm">Vai trazer um animal de serviço?</a>
                  </>
                ) : (
                  g.description
                )}
              </div>
            </div>
            <div className="flex items-center gap-3 ml-8">
              <button
                className={cn(
                  'w-8 h-8 rounded-full flex items-center justify-center text-1xl pb-1 font-normal transition',
                  guests[g.key] === g.min
                    ? 'text-[#B0B0B0] bg-white border border-[#EBEBEB]'
                    : 'text-[#222] bg-white border border-[#B0B0B0] hover:shadow-airbnb-01',
                  'focus:outline-none',
                  guests[g.key] === g.min && 'opacity-40 pointer-events-none'
                )}
                onClick={() => update(g.key, -1)}
                onMouseDown={e => e.stopPropagation()}
                aria-label={`Decrease ${g.label}`}
                disabled={guests[g.key] === g.min}
              >
                –
              </button>
              <span className="w-6 text-center text-[17px] font-medium text-[#222]">{guests[g.key]}</span>
              <button
                className={cn(
                  'w-8 h-8 rounded-full flex items-center justify-center text-1xl pb-1 font-normal transition',
                  plusDisabled
                    ? 'text-[#B0B0B0] bg-white border border-[#EBEBEB]'
                    : 'text-[#222] bg-white border border-[#B0B0B0] hover:shadow-airbnb-01',
                  'focus:outline-none',
                  plusDisabled && 'opacity-40 pointer-events-none'
                )}
                onClick={() => update(g.key, 1)}
                onMouseDown={e => e.stopPropagation()}
                aria-label={`Increase ${g.label}`}
                disabled={plusDisabled}
              >
                +
              </button>
            </div>
          </div>
        );
      })}
      <div className="mt-4 text-sm text-[#717171] text-left">
        Este espaço tem um máximo de {maxGuests} hóspedes, não incluindo bebês. {!allowPets && 'Não são permitidos animais de estimação.'}
      </div>
      <button
        className="mt-6 ml-auto text-base font-medium underline text-[#222] bg-transparent border-0 p-0 cursor-pointer hover:text-black"
        type="button"
        onClick={onClose}
      >
        Fechar
      </button>
    </div>
  );
} 