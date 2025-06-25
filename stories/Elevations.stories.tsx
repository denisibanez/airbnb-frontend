import React from 'react';

const elevations = [
  { name: 'Shadow Airbnb 01', class: 'shadow-airbnb-01', desc: 'Leve, menus, dropdowns' },
  { name: 'Shadow Airbnb 02', class: 'shadow-airbnb-02', desc: 'Cards, popovers' },
  { name: 'Shadow Airbnb 03', class: 'shadow-airbnb-03', desc: 'Elevated cards, modals' },
  { name: 'Shadow Airbnb 04', class: 'shadow-airbnb-04', desc: 'Maximum elevation, drawers' },
];

export default {
  title: 'Design System/Elevations',
  parameters: {
    layout: 'centered',
  },
};

export const ElevationsShowcase = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 p-8 max-w-4xl mx-auto">
    {elevations.map((e) => (
      <div key={e.name} className={`w-32 h-24 rounded-lg border border-neutral-200 bg-white flex flex-col items-center justify-center ${e.class}`}>
        <span className="font-medium text-neutral-700 mb-1">{e.name}</span>
        <span className="text-xs text-neutral-400 text-center">{e.desc}</span>
      </div>
    ))}
  </div>
); 