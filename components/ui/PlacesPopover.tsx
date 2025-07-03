import React from 'react';
import { cn } from '../../lib/utils';

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
}
export interface PlacesPopoverProps {
  regions: PlaceRegion[];
  recent: RecentSearch[];
  onRegionSelect?: (region: PlaceRegion) => void;
  onRecentSelect?: (search: RecentSearch) => void;
  className?: string;
}

export default function PlacesPopover({ regions, recent, onRegionSelect, onRecentSelect, className }: PlacesPopoverProps) {
  return (
    <div className={cn('w-[700px] max-w-full rounded-3xl shadow-airbnb-03 border border-neutral-200 bg-white p-0 flex overflow-hidden', className)}>
      {/* Recentes */}
      <div className="w-1/2 p-6 flex flex-col">
        <div className="font-semibold text-lg mb-4">Busquedas recientes</div>
        <div className="flex flex-col gap-2 flex-1">
          {recent.length === 0 && <div className="text-neutral-400 text-sm">Nenhuma busca recente</div>}
          {recent.map(r => (
            <button
              key={r.key}
              className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-neutral-100 transition text-left"
              onClick={() => onRecentSelect?.(r)}
            >
              <span className="w-7 h-7 flex items-center justify-center bg-neutral-100 rounded-full text-neutral-500">
                {r.icon || <span className="text-xl">🕑</span>}
              </span>
              <span>
                <div className="font-medium text-[15px] text-neutral-900 leading-tight">{r.title}</div>
                <div className="text-xs text-neutral-500">{r.subtitle}</div>
              </span>
            </button>
          ))}
        </div>
      </div>
      {/* Separador */}
      <div className="w-px bg-violet-300 my-6 mx-0" />
      {/* Regiões */}
      <div className="w-1/2 p-6 flex flex-col">
        <div className="font-semibold text-lg mb-4">Buscar por region</div>
        <div className="grid grid-cols-3 gap-4">
          {regions.map(r => (
            <button
              key={r.key}
              className="flex flex-col items-center gap-2 p-2 rounded-xl hover:bg-neutral-100 transition"
              onClick={() => onRegionSelect?.(r)}
            >
              <img src={r.image} alt={r.name} className="w-20 h-16 object-cover rounded-md border border-neutral-200" />
              <span className="text-sm text-neutral-700 font-medium">{r.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
} 