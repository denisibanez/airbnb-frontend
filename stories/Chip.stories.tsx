import type { Meta, StoryObj } from '@storybook/react';
import Chip, { ChipVariant } from '../components/ui/Chip';
import { IconsInterfaceHeartFull } from '../components/ui/Icons';

const meta: Meta<typeof Chip> = {
  title: 'Components/Chip',
  component: Chip,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'default',
        'outlined',
        'outlinedDouble',
        'outlinedSm',
        'filled',
        'map',
        'mapFilled',
        'mapShadow',
        'mapFavorite',
      ],
    },
    selected: { control: 'boolean' },
    iconRight: { control: 'object' },
    children: { control: 'text' },
    className: { control: 'text' },
    onClick: { action: 'clicked' },
  },
  args: {
    variant: 'default',
    selected: false,
    children: '1',
    className: '',
  },
};
export default meta;

type Story = StoryObj<typeof Chip>;

export const Playground: Story = {
  args: {},
};

export const Default: Story = {
  args: { variant: 'default', children: '1' },
};
export const Outlined: Story = {
  args: { variant: 'outlined', children: '1' },
};
export const OutlinedDouble: Story = {
  args: { variant: 'outlinedDouble', children: '1' },
};
export const OutlinedSm: Story = {
  args: { variant: 'outlinedSm', children: '1' },
};
export const Filled: Story = {
  args: { variant: 'filled', children: '1' },
};
export const Map: Story = {
  args: { variant: 'map', children: '$99' },
};
export const MapFilled: Story = {
  args: { variant: 'mapFilled', children: '$99', selected: true },
};
export const MapShadow: Story = {
  args: { variant: 'mapShadow', children: '$99' },
};
export const MapFavorite: Story = {
  args: {
    variant: 'mapFavorite',
    children: '$99',
    iconRight: <IconsInterfaceHeartFull className="w-4 h-4 text-[#FF385C]" />,
  },
}; 