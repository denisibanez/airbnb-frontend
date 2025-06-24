import * as Icons from './Icons';
import React from 'react';

const iconNames = Object.keys(Icons);

// Lista de prefixos conhecidos em ordem decrescente de tamanho para evitar conflitos
const knownPrefixes = [
  'NeonDark', 'OutlineDark', 'TwoToneDark',
  'Neon', 'Outline', 'TwoTone',
  'General', 'Interface', 'Social'
];

// Função para extrair o prefixo real do componente
function getPrefix(name: string) {
  for (const prefix of knownPrefixes) {
    if (name.startsWith(`Icons${prefix}`)) return prefix;
  }
  return '';
}

// Agrupa ícones por prefixo
const prefixGroups: Record<string, string[]> = {};
iconNames.forEach((name) => {
  const prefix = getPrefix(name);
  if (!prefixGroups[prefix]) prefixGroups[prefix] = [];
  prefixGroups[prefix].push(name);
});

// Ordenação dos grupos principais
const groupOrder = [
  'Neon', 'NeonDark', 'Outline', 'OutlineDark', 'TwoTone', 'TwoToneDark', 'General', 'Interface', 'Social', ''
];

// Função para agrupar por subcategoria (prefixo até a primeira letra minúscula após maiúscula)
function getSubcategory(name: string) {
  // Exemplo: 'GeneralClockAlarm' => 'General', 'InterfaceAddAlt' => 'Interface', 'MyCustomIcon' => 'MyCustom'
  const match = name.match(/^[A-Z][a-z]+/);
  return match ? match[0] : 'Outros';
}

export default function AirbnbIconsGrid() {
  return (
    <div className="space-y-8">
      {Object.entries(prefixGroups).sort(([a], [b]) => {
        // Ordena conforme groupOrder, depois alfabeticamente
        const ia = groupOrder.indexOf(a);
        const ib = groupOrder.indexOf(b);
        if (ia !== -1 && ib !== -1) return ia - ib;
        if (ia !== -1) return -1;
        if (ib !== -1) return 1;
        return a.localeCompare(b);
      }).map(([prefix, names]) => {
        const isDark = prefix.endsWith('Dark');
        return (
          <div
            key={prefix || 'Outros'}
            className={`p-6 rounded-xl border ${isDark ? 'bg-black border-neutral-800' : 'bg-white border-neutral-200'}`}
          >
            <h3 className={`text-xl font-bold mb-6 ${isDark ? 'text-white' : 'text-shade-02'}`}>{prefix || 'Outros'}</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-8">
              {names.map((iconName) => {
                const Icon = Icons[iconName as keyof typeof Icons];
                return (
                  <div key={iconName} className="flex flex-col items-center">
                    <Icon className={`w-10 h-10 ${isDark ? 'text-white' : ''}`} />
                    <span className={`mt-2 text-xs break-all text-center ${isDark ? 'text-neutral-300' : 'text-neutral-500'}`}>{iconName}</span>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}