'use client';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/Card';

import { useEffect, useState } from 'react';
import AirbnbIconsGrid from '../components/ui/AirbnbIconsGrid';
import { IconsOutlineAirbnb, IconsOutlineDarkAirbnb } from '@/components/ui/Icons';
import { SearchIcon } from '@/components/ui/IconCustomized/IconCustomized';
import TextField from '@/components/ui/TextField';

const COLOR_GROUPS = [
  {
    title: 'Shades',
    description: 'Colors used for backgrounds, text, dividers, etc.',
    prefix: '--color-shade-',
    tokens: [
      '01', '02', '02-5', '02-30', '02-50'
    ],
  },
  {
    title: 'Neutrals',
    description: 'Colors used for backgrounds, text, dividers, etc.',
    prefix: '--color-neutral-',
    tokens: [
      '01', '02', '03', '04', '05', '06', '07', '08'
    ],
  },
  {
    title: 'Primary',
    description: 'Colors used for logos and icons',
    prefix: '--color-primary-',
    tokens: ['01', '02'],
  },
  {
    title: 'Gradients',
    description: 'Colors used for different primary button states',
    prefix: '--color-gradient-',
    tokens: ['01', '02', '03'],
  },
  {
    title: 'Error',
    description: 'Colored used for background and text of errors',
    prefix: '--color-error-',
    tokens: ['01', '02'],
  },
  {
    title: 'Accents',
    description: 'Colors used for icons, discounts, links.',
    prefix: '--color-',
    tokens: ['accent-01', 'accent-02', 'discount', 'link'],
  },
];

function getCssVarValue(variable: string) {
  if (typeof window === 'undefined') return '';
  return getComputedStyle(document.documentElement).getPropertyValue(variable).trim();
}

function ColorGroup({ title, description, tokens }: { title: string, description: string, tokens: { name: string, value: string, isGradient?: boolean }[] }) {
  return (
    <div className="p-6 flex flex-col gap-4 min-h-[260px] border rounded-xl bg-white">
      <h3 className="text-xl font-bold mb-1">{title}</h3>
      <p className="text-xs text-neutral-07 mb-2">{description}</p>
      <div className="flex flex-col gap-3">
        {tokens.map((token) => (
          <div key={token.name} className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded border border-neutral-03 flex-shrink-0`}
              style={token.isGradient ? { background: token.value } : { backgroundColor: token.value }}
            />
            <div className="flex flex-col">
              <span className="text-sm text-neutral-08">{token.name}</span>
              <span className="text-xs text-neutral-06">{token.value}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

type ColorToken = { name: string; value: string; isGradient?: boolean };
type ColorGroup = { title: string; description: string; tokens: ColorToken[] };

type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'outline' | 'ghost' | 'link' | 'error';
type ButtonSize = 'sm' | 'md' | 'lg' | 'xl';

export default function Home() {
  const [groups, setGroups] = useState<ColorGroup[]>([]);

  useEffect(() => {
    const allGroups = COLOR_GROUPS.map(group => {
      const tokens = group.tokens.map(token => {
        const varName = group.prefix + token;
        const value = getCssVarValue(varName);
        return {
          name: varName.replace('--color-', ''),
          value,
          isGradient: value.startsWith('linear-gradient'),
        };
      });
      return { ...group, tokens };
    });
    setGroups(allGroups);
  }, []);

  return (
    <main className="min-h-screen p-8 bg-neutral-01">
      {/* Header Section */}
      <section className="mb-12">
        <h1 className="text-6xl font-bold text-shade-02 mb-4 font-circular">
          Airbnb Design System
        </h1>
        <p className="text-xl text-neutral-07 font-circular-book">
          Demonstração dos tokens de design system configurados baseados no Airbnb UI Kit
        </p>
      </section>

      {/* Typography Section */}
      <section className="mb-16">
        <h2 className="text-4xl font-semibold text-shade-02 mb-8 font-circular-medium">Typography</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card variant="elevated" padding="lg">
            <CardHeader>
              <CardTitle>Font Sizes</CardTitle>
              <CardDescription>Escala tipográfica do Airbnb</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-xs">text-xs - 12px/16px</div>
              <div className="text-sm">text-sm - 14px/18px</div>
              <div className="text-base">text-base - 16px/20px</div>
              <div className="text-lg">text-lg - 18px/22px</div>
              <div className="text-xl">text-xl - 20px/24px</div>
              <div className="text-2xl">text-2xl - 22px/26px</div>
              <div className="text-3xl">text-3xl - 24px/28px</div>
              <div className="text-4xl">text-4xl - 26px/30px</div>
              <div className="text-5xl">text-5xl - 32px/36px</div>
              <div className="text-6xl">text-6xl - 40px/44px</div>
            </CardContent>
          </Card>

          <Card variant="elevated" padding="lg">
            <CardHeader>
              <CardTitle>Font Weights</CardTitle>
              <CardDescription>Pesos da fonte Circular</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="font-book">font-book - 400</div>
              <div className="font-medium">font-medium - 500</div>
              <div className="font-semibold">font-semibold - 600</div>
              <div className="font-bold">font-bold - 700</div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Color Palette */}
      <section className="mb-16">
        <h2 className="text-4xl font-semibold text-shade-02 mb-8 font-circular-medium">Color Palette</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {groups.slice(0, 3).map(group => (
            <ColorGroup key={group.title} title={group.title} description={group.description} tokens={group.tokens} />
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {groups.slice(3).map(group => (
            <ColorGroup key={group.title} title={group.title} description={group.description} tokens={group.tokens} />
          ))}
        </div>
      </section>

       {/* Elevation Section */}
      <section className="flex flex-col items-center justify-center min-h-[60vh] bg-neutral-02 py-12">
        <div className="flex gap-16 mb-6">
          <div className="flex flex-col items-center">
            <div className="w-40 h-40 bg-white shadow-airbnb-01 rounded-lg"></div>
            <span className="mt-3 text-sm text-neutral-07">Elevation 01</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-40 h-40 bg-white shadow-airbnb-02 rounded-lg"></div>
            <span className="mt-3 text-sm text-neutral-07">Elevation 02</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-40 h-40 bg-white shadow-airbnb-03 rounded-lg"></div>
            <span className="mt-3 text-sm text-neutral-07">Elevation 03</span>
          </div>
        </div>
        <span className="text-base text-neutral-08 font-medium">Airbnb Elevations (Figma)</span>
      </section>

      {/* Components Section */}
      <section className="mb-16">
        <h2 className="text-4xl font-semibold text-shade-02 mb-8 font-circular-medium">Components</h2>
    



        {/* Cards */}
        <div className="mb-12">
          <h3 className="text-2xl font-semibold text-shade-02 mb-6">Cards</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card variant="default">
              <CardHeader>
                <CardTitle>Default Card</CardTitle>
                <CardDescription>Default variant with border</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-neutral-07">This is a default card with neutral styling.</p>
              </CardContent>
              <CardFooter>
                <Button variant="primary" size="sm">Action</Button>
              </CardFooter>
            </Card>

            <Card variant="elevated">
              <CardHeader>
                <CardTitle>Elevated Card</CardTitle>
                <CardDescription>Medium elevation shadow</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-neutral-07">This card has a medium elevation shadow.</p>
              </CardContent>
              <CardFooter>
                <Button variant="secondary" size="sm">Action</Button>
              </CardFooter>
            </Card>

            <Card variant="elevatedLarge">
              <CardHeader>
                <CardTitle>Large Elevated</CardTitle>
                <CardDescription>Large elevation shadow</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-neutral-07">This card has a large elevation shadow.</p>
              </CardContent>
              <CardFooter>
                <Button variant="primary" size="sm">Action</Button>
              </CardFooter>
            </Card>
          </div>
        </div>

        {/* Buttons Showcase */}
        <div className="mb-16">
          <h3 className="text-2xl font-semibold text-shade-02 mb-6">Buttons</h3>
          {(() => {
            const variants = [
              'primary',
              'secondary',
              'tertiary',
              'outline',
              'ghost',
              'link',
              'error',
            ] as const;
            const sizes = ['sm', 'md', 'lg', 'xl'] as const;
            const statuses = [
              { key: 'default', label: 'Default', render: (variant: ButtonVariant, size: ButtonSize) => <Button variant={variant} size={size}>{variant} {size}</Button> },
              { key: 'loading', label: 'Loading', render: (variant: ButtonVariant, size: ButtonSize) => <Button variant={variant} size={size} loading /> },
              { key: 'disabled', label: 'Disabled', render: (variant: ButtonVariant, size: ButtonSize) => <Button variant={variant} size={size} disabled>Disabled</Button> },
              { key: 'iconLeft', label: 'Icon Left', render: (variant: ButtonVariant, size: ButtonSize) => <Button variant={variant} size={size} iconLeft={variant === 'primary' ? <IconsOutlineDarkAirbnb /> : ['secondary','error'].includes(variant) ? <IconsOutlineDarkAirbnb /> : <IconsOutlineAirbnb />}>Icon Left</Button> },
              { key: 'iconRight', label: 'Icon Right', render: (variant: ButtonVariant, size: ButtonSize) => <Button variant={variant} size={size} iconRight={variant === 'primary' ? <IconsOutlineDarkAirbnb /> : ['secondary','error'].includes(variant) ? <IconsOutlineDarkAirbnb /> : <IconsOutlineAirbnb />}>Icon Right</Button> },
            ];
            return (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {variants.map((variant) => (
                  <Card key={variant} variant="elevated" padding="lg">
                    <CardHeader>
                      <CardTitle className="capitalize">{variant} Buttons</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {statuses.map((status) => (
                        <div key={status.key}>
                          <div className="font-medium text-neutral-07 mb-2 text-sm">{status.label}</div>
                          <div className="flex flex-wrap gap-3">
                            {sizes.map((size) => (
                              <div key={size} className="mb-2">
                                {status.render(variant, size)}
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                      {/* Full Width apenas um por Card */}
                      <div>
                        <div className="font-medium text-neutral-07 mb-2 text-sm">Full Width</div>
                        <Button variant={variant} size="md" fullWidth>
                          Full Width
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            );
          })()}
        </div>

        {/* Airbnb Icons Showcase */}
        <section className="mb-16">
          <h2 className="text-4xl font-semibold text-shade-02 mb-8 font-circular-medium">Airbnb Icons</h2>
          <AirbnbIconsGrid />
        </section>

        {/* Inputs */}
        <div className="mb-12">
          <h3 className="text-2xl font-semibold text-shade-02 mb-6">Inputs</h3>
          <Card variant="elevated" padding="lg">
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Default */}
                <TextField label="Default" placeholder="Placeholder text" iconRight={<SearchIcon className="w-6 h-6 text-neutral-07" />} />
                {/* Helper */}
                <TextField label="With Helper" placeholder="Placeholder text" helperText="Optional helper text" />
                {/* Error */}
                <TextField label="With Error" placeholder="Placeholder text" errorText="Error message" />
                {/* Error + Helper */}
                <TextField label="Error + Helper" placeholder="Placeholder text" errorText="Error message" helperText="Optional helper text" />
                {/* With Icon */}
                <TextField label="With Icon" placeholder="Placeholder text" rightIcon={<IconsOutlineAirbnb className="w-5 h-5" />} />
                {/* Disabled */}
                <TextField label="Disabled" placeholder="Placeholder text" disabled />
                {/* Required */}
                <TextField label="Required" placeholder="Placeholder text" required />
                {/* Filled */}
                <TextField label="Filled" defaultValue="Filling the input with real text" />
                {/* Small */}
                <TextField label="Small" placeholder="Small input" inputSize="sm" />
                {/* Medium */}
                <TextField label="Medium" placeholder="Medium input" inputSize="md" />
                {/* Large */}
                <TextField label="Large" placeholder="Large input" inputSize="lg" />
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

    </main>
  );
}
