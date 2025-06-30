import type { Meta, StoryObj } from '@storybook/react';
import PlacesPopover, { PlaceRegion, RecentSearch } from '../components/ui/PlacesPopover';

const regions: PlaceRegion[] = [
  { key: 'flex', name: 'Busqueda Flexible', image: 'https://placehold.co/120x80?text=Flex' },
  { key: 'usa', name: 'USA', image: 'https://placehold.co/120x80?text=USA' },
  { key: 'es', name: 'España', image: 'https://placehold.co/120x80?text=ES' },
  { key: 'eu', name: 'Europa', image: 'https://placehold.co/120x80?text=EU' },
  { key: 'sa', name: 'Sudamerica', image: 'https://placehold.co/120x80?text=SA' },
  { key: 'it', name: 'Italia', image: 'https://placehold.co/120x80?text=IT' },
];

const recent: RecentSearch[] = [
  { key: '1', title: 'Tulum  Estancias', subtitle: '26–29 de ago.  2 Huespedes' },
  { key: '2', title: 'Ciudad de Mexico  Estancias', subtitle: '26–29 de ago.  2 Huespedes' },
  { key: '3', title: 'Cancun  Estancias', subtitle: '26–29 de ago.  2 Huespedes' },
  { key: '4', title: 'Tulum  Estancias', subtitle: '26–29 de ago.  2 Huespedes' },
  { key: '5', title: 'Tulum  Estancias', subtitle: '26–29 de ago.  2 Huespedes' },
];

const meta: Meta<typeof PlacesPopover> = {
  title: 'Components/PlacesPopover',
  component: PlacesPopover,
  tags: ['autodocs'],
  argTypes: {
    regions: { control: 'object' },
    recent: { control: 'object' },
    className: { control: 'text' },
    onRegionSelect: { action: 'regionSelect' },
    onRecentSelect: { action: 'recentSelect' },
  },
  args: {
    regions,
    recent,
    className: '',
  },
};
export default meta;

type Story = StoryObj<typeof PlacesPopover>;

export const Playground: Story = {
  args: {},
}; 