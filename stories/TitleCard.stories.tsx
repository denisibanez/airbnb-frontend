import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import TitleCard from '../components/ui/TitleCard';
import { IconsOutlineAirbnb } from '../components/ui/Icons';

const meta: Meta<typeof TitleCard> = {
  title: 'Components/TitleCard',
  component: TitleCard,
  tags: ['autodocs'],
  argTypes: {
    icon: { control: 'object' },
    label: { control: 'text' },
    selected: { control: 'boolean' },
    disabled: { control: 'boolean' },
    className: { control: 'text' },
    onClick: { action: 'clicked' },
  },
  args: {
    icon: <IconsOutlineAirbnb className="w-8 h-8" />,
    label: 'House',
    selected: false,
    disabled: false,
    className: '',
  },
};
export default meta;

type Story = StoryObj<typeof TitleCard>;

export const Playground: Story = {
  args: {},
};

export const Grid: Story = {
  render: () => {
    const [selected, setSelected] = useState(1);
    return (
      <div className="flex gap-4 p-4 border-2 border-dashed border-violet-300 rounded-xl bg-neutral-50">
        {[0, 1, 2, 3, 4].map(i => (
          <TitleCard
            key={i}
            icon={<IconsOutlineAirbnb className="w-8 h-8" />}
            label="House"
            selected={selected === i}
            onClick={() => setSelected(i)}
          />
        ))}
      </div>
    );
  },
};

export const Disabled: Story = {
  render: () => (
    <div className="flex gap-4 p-4">
      <TitleCard icon={<IconsOutlineAirbnb className="w-8 h-8" />} label="House" disabled />
      <TitleCard icon={<IconsOutlineAirbnb className="w-8 h-8" />} label="House" />
    </div>
  ),
}; 