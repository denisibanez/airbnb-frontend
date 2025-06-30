import React, { useState } from 'react';
import { cn } from '@/lib/utils';

export interface GuestSelectorProps {
  value?: {
    adults: number;
    children: number;
    infants: number;
    pets: number;
  };
  onChange?: (value: GuestSelectorProps['value']) => void;
  className?: string;
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

export default function GuestSelector({ value, onChange, className }: GuestSelectorProps) {
  const [internal, setInternal] = useState({ adults: 1, children: 0, infants: 0, pets: 0 });
  const guests = value || internal;

  function update(key: GuestKey, delta: number) {
    const min = GUESTS.find(g => g.key === key)!.min;
    const next = { ...guests, [key]: Math.max(min, guests[key] + delta) };
    if (!value) setInternal(next);
    onChange?.(next);
  }

  return (
    <div className={cn('w-[380px] max-w-full rounded-3xl shadow-airbnb-03 border border-neutral-200 bg-white p-6 flex flex-col gap-2', className)}>
      {GUESTS.map(g => (
        <div key={g.key} className="flex items-center justify-between py-3 border-b last:border-b-0">
          <div>
            <div className="font-medium text-[17px] text-neutral-900">{g.label}</div>
            <div className="text-sm text-neutral-500">{g.description}</div>
          </div>
          <div className="flex items-center gap-4">
            <button
              className={cn(
                'w-8 h-8 rounded-full border border-neutral-300 flex items-center justify-center text-xl font-bold text-neutral-500 transition',
                guests[g.key] === g.min && 'opacity-40 pointer-events-none',
                'hover:bg-neutral-100'
              )}
              onClick={() => update(g.key, -1)}
              aria-label={`Decrease ${g.label}`}
              disabled={guests[g.key] === g.min}
            >
              –
            </button>
            <span className="w-6 text-center text-[17px] font-medium">{guests[g.key]}</span>
            <button
              className="w-8 h-8 rounded-full border border-neutral-300 flex items-center justify-center text-xl font-bold text-neutral-500 hover:bg-neutral-100 transition"
              onClick={() => update(g.key, 1)}
              aria-label={`Increase ${g.label}`}
            >
              +
            </button>
          </div>
        </div>
      ))}
    </div>
  );
} 