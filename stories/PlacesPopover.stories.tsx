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
  { 
    key: '1', 
    title: 'Nearby', 
    subtitle: 'Discover what\'s nearby',
    iconBgColor: 'bg-blue-50',
    iconColor: 'text-blue-500'
  },
  { 
    key: '2', 
    title: 'Porto, Porto District', 
    subtitle: 'Because your wishlist already has listings in Porto',
    iconBgColor: 'bg-green-50',
    iconColor: 'text-green-500'
  },
  { 
    key: '3', 
    title: 'Lisbon, Lisbon District', 
    subtitle: 'Because your wishlist already has listings in Lisbon',
    iconBgColor: 'bg-red-50',
    iconColor: 'text-red-500'
  },
  { 
    key: '4', 
    title: 'Albufeira, Faro', 
    subtitle: 'Popular beach destination',
    iconBgColor: 'bg-red-50',
    iconColor: 'text-red-500'
  },
  { 
    key: '5', 
    title: 'Málaga, Spain', 
    subtitle: 'For places like Alcazaba de Málaga',
    iconBgColor: 'bg-red-50',
    iconColor: 'text-red-500'
  },
  { 
    key: '6', 
    title: 'Madrid, Spain', 
    subtitle: 'For the vibrant nightlife',
    iconBgColor: 'bg-red-50',
    iconColor: 'text-red-500'
  },
  { 
    key: '7', 
    title: 'Alicante, Spain', 
    subtitle: 'For the seaside charm',
    iconBgColor: 'bg-green-50',
    iconColor: 'text-green-500'
  },
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

export const AirbnbStyle: Story = {
  args: {
    recent: recent,
  },
  render: (args) => (
    <div className="min-h-screen bg-gray-50 p-20">
      <div className="flex justify-center">
        <PlacesPopover {...args} />
      </div>
    </div>
  ),
};

export const WithScroll: Story = {
  args: {
    recent: [
      ...recent,
      { 
        key: '8', 
        title: 'Barcelona, Spain', 
        subtitle: 'For Gaudí\'s architecture',
        iconBgColor: 'bg-orange-50',
        iconColor: 'text-orange-500'
      },
      { 
        key: '9', 
        title: 'Seville, Spain', 
        subtitle: 'For stunning architecture',
        iconBgColor: 'bg-green-50',
        iconColor: 'text-green-500'
      },
      { 
        key: '10', 
        title: 'Aveiro, Aveiro District', 
        subtitle: 'Near you',
        iconBgColor: 'bg-orange-50',
        iconColor: 'text-orange-500'
      },
      { 
        key: '11', 
        title: 'Nazaré, Leiria', 
        subtitle: 'For places like Nazaré Lighthouse',
        iconBgColor: 'bg-blue-50',
        iconColor: 'text-blue-500'
      },
      { 
        key: '12', 
        title: 'Marbella, Spain', 
        subtitle: 'For the vibrant nightlife',
        iconBgColor: 'bg-green-50',
        iconColor: 'text-green-500'
      },
      { 
        key: '13', 
        title: 'Coimbra, Coimbra District', 
        subtitle: 'For places like Portugal dos Pequenitos',
        iconBgColor: 'bg-orange-50',
        iconColor: 'text-orange-500'
      },
      { 
        key: '14', 
        title: 'Valencia, Spain', 
        subtitle: 'For high-level gastronomy',
        iconBgColor: 'bg-blue-50',
        iconColor: 'text-blue-500'
      },
    ],
  },
  render: (args) => (
    <div className="min-h-screen bg-gray-50 p-20">
      <div className="flex justify-center">
        <PlacesPopover {...args} />
      </div>
    </div>
  ),
}; 
