import type { Meta, StoryObj } from '@storybook/react';
import Chip from '../components/ui/Chip';
import { IconsInterfaceHeartFull } from '../components/ui/Icons';

const meta: Meta<typeof Chip> = {
  title: 'Components/Chip',
  component: Chip,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof Chip>;

export const Playground: Story = {
  args: {},
};

// Baseado na imagem: 6 estados diferentes
export const WhiteChip: Story = {
  render: () => <Chip variant="white" value="$99" />,
};

export const WhiteWithBorderChip: Story = {
  render: () => <Chip variant="whiteWithBorder" value="$99" />,
};

export const DarkChip: Story = {
  render: () => <Chip variant="dark" value="$99" />,
};

export const LightGrayChip: Story = {
  render: () => <Chip variant="lightGray" value="$99" />,
};

export const WhiteWithHeartChip: Story = {
  render: () => (
    <Chip
      variant="whiteWithHeart"
      value="$99"
      iconRight={<IconsInterfaceHeartFull className="w-4 h-4" fill="#FF385C" />}
    />
  ),
};

// Exemplo com valor customizado
export const CustomValue: Story = {
  render: () => <Chip variant="dark" value="$150" />,
}; 
