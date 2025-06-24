import * as Icons from './Icons';
import React from 'react';

const iconNames = Object.keys(Icons);

// Agrupa ícones por tipo
const groups = {
  Neon: [] as string[],
  NeonDark: [] as string[],
  Outline: [] as string[],
  OutlineDark: [] as string[],
  TwoTone: [] as string[],
  TwoToneDark: [] as string[],
  General: [] as string[],
  Interface: [] as string[],
  Social: [] as string[],
  Outros: [] as string[],
};

iconNames.forEach((name) => {
  if (name.startsWith('NeonDark')) groups.NeonDark.push(name);
  else if (name.startsWith('Neon')) groups.Neon.push(name);
  else if (name.startsWith('OutlineDark')) groups.OutlineDark.push(name);
  else if (name.startsWith('Outline')) groups.Outline.push(name);
  else if (name.startsWith('TwoToneDark')) groups.TwoToneDark.push(name);
  else if (name.startsWith('TwoTone')) groups.TwoTone.push(name);
  else if (name.startsWith('General')) groups.General.push(name);
  else if (name.startsWith('Interface')) groups.Interface.push(name);
  else if (name.startsWith('Social')) groups.Social.push(name);
  else groups.Outros.push(name);
});

const groupOrder = [
  { key: 'Neon', label: 'Neon', dark: false },
  { key: 'NeonDark', label: 'Neon Dark', dark: true },
  { key: 'Outline', label: 'Outline', dark: false },
  { key: 'OutlineDark', label: 'Outline Dark', dark: true },
  { key: 'TwoTone', label: 'Two Tone', dark: false },
  { key: 'TwoToneDark', label: 'Two Tone Dark', dark: true },
  { key: 'General', label: 'General', dark: false },
  { key: 'Interface', label: 'Interface', dark: false },
  { key: 'Social', label: 'Social', dark: false },
  { key: 'Outros', label: 'Outros', dark: false },
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
      {groupOrder.map(({ key, label, dark }) => {
        const names = groups[key as keyof typeof groups];
        if (!names.length) return null;

        // Se for a seção Outros, agrupar por subcategoria
        if (key === 'Outros') {
          // Agrupa por subcategoria
          const subcats: Record<string, string[]> = {};
          names.forEach((iconName) => {
            const subcat = getSubcategory(iconName);
            if (!subcats[subcat]) subcats[subcat] = [];
            subcats[subcat].push(iconName);
          });
          // Renderiza cada subcategoria em seu próprio card
          return Object.entries(subcats).map(([subcat, subcatIcons]) => {
            // O card é dark se o prefixo terminar com 'Dark' ou se todos os ícones do grupo contiverem 'Dark'
            const isDark = subcat.endsWith('dark') || subcatIcons.every((n) => n.includes('Dark'));
            return (
              <div
                key={subcat}
                className={`p-6 rounded-xl border mb-4 ${isDark ? 'bg-black border-neutral-800' : 'bg-white border-neutral-200'}`}
              >
                <h3 className={`text-xl font-bold mb-6 ${isDark ? 'text-white' : 'text-shade-02'}`}>{subcat}</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-8">
                  {subcatIcons.map((iconName) => {
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
          });
        }

        // Renderização padrão dos outros grupos
        return (
          <div
            key={key}
            className={`p-6 rounded-xl border ${dark ? 'bg-black border-neutral-800' : 'bg-white border-neutral-200'}`}
          >
            <h3 className={`text-xl font-bold mb-6 ${dark ? 'text-white' : 'text-shade-02'}`}>{label}</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-8">
              {names.map((iconName) => {
                const Icon = Icons[iconName as keyof typeof Icons];
                return (
                  <div key={iconName} className="flex flex-col items-center">
                    <Icon className={`w-10 h-10 ${dark ? 'text-white' : ''}`} />
                    <span className={`mt-2 text-xs break-all text-center ${dark ? 'text-neutral-300' : 'text-neutral-500'}`}>{iconName}</span>
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