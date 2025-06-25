import React from 'react';

const colors = [
  { name: 'Primary 01', class: 'bg-primary-01', value: '#FF385C' },
  { name: 'Primary 02', class: 'bg-primary-02', value: '#FF5A5F' },
  { name: 'Primary 03', class: 'bg-primary-03', value: '#FFB400' },
  { name: 'Secondary 01', class: 'bg-secondary-01', value: '#222222' },
  { name: 'Secondary 02', class: 'bg-secondary-02', value: '#717171' },
  { name: 'Neutral 01', class: 'bg-neutral-01', value: '#FFFFFF' },
  { name: 'Neutral 02', class: 'bg-neutral-02', value: '#F7F7F7' },
  { name: 'Neutral 03', class: 'bg-neutral-03', value: '#B0B0B0' },
  { name: 'Neutral 07', class: 'bg-neutral-07', value: '#222222' },
  { name: 'Error 01', class: 'bg-error-01', value: '#DD2A2A' },
  { name: 'Success 01', class: 'bg-success-01', value: '#008A05' },
  { name: 'Warning 01', class: 'bg-warning-01', value: '#FFB400' },
];

export default {
  title: 'Design System/Color Palette',
  parameters: {
    layout: 'centered',
  },
};

export const ColorPaletteShowcase = () => (
  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 p-8 max-w-4xl mx-auto">
    {colors.map((color) => (
      <div key={color.name} className="flex flex-col items-center">
        <div className={`w-20 h-20 rounded-lg border border-neutral-200 shadow-airbnb-01 ${color.class}`} />
        <span className="mt-2 text-sm font-medium text-neutral-700">{color.name}</span>
        <span className="text-xs text-neutral-400">{color.value}</span>
      </div>
    ))}
  </div>
); 