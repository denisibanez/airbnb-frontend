import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import Tabs, { TabItem } from '../components/ui/Tabs';
import { IconsOutlineAirbnb } from '../components/ui/Icons';

const items: TabItem[] = [
  { key: 'dome', label: 'Dome', icon: <IconsOutlineAirbnb className="w-6 h-6" /> },
  { key: 'dome2', label: 'Dome', icon: <IconsOutlineAirbnb className="w-6 h-6" /> },
  { key: 'dome3', label: 'Dome', icon: <IconsOutlineAirbnb className="w-6 h-6" /> },
  { key: 'dome4', label: 'Dome', icon: <IconsOutlineAirbnb className="w-6 h-6" /> },
];
const textItems: TabItem[] = [
  { key: 'stays', label: 'Stays' },
  { key: 'stays2', label: 'Stays' },
  { key: 'stays3', label: 'Stays' },
];
const pillItems: TabItem[] = [
  { key: 'choose', label: 'Choose dates' },
  { key: 'flex', label: "I'm flexible" },
];

const meta: Meta<typeof Tabs> = {
  title: 'Components/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  argTypes: {
    items: { control: 'object' },
    value: { control: 'text' },
    variant: { control: 'select', options: ['underline', 'pill'] },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    fullWidth: { control: 'boolean' },
    orientation: { control: 'select', options: ['horizontal', 'vertical'] },
    className: { control: 'text' },
    onChange: { action: 'changed' },
  },
  args: {
    items,
    value: 'dome',
    variant: 'underline',
    size: 'md',
    fullWidth: false,
    orientation: 'horizontal',
    className: '',
  },
};
export default meta;

type Story = StoryObj<typeof Tabs>;

export const Playground: Story = {
  render: (args) => {
    const [value, setValue] = useState(args.value || 'dome');
    return <Tabs {...args} value={value} onChange={setValue} />;
  },
};

export const UnderlineIcons: Story = {
  render: () => {
    const [value, setValue] = useState('dome');
    return <Tabs items={items} value={value} onChange={setValue} variant="underline" />;
  },
};

export const UnderlineText: Story = {
  render: () => {
    const [value, setValue] = useState('stays');
    return <Tabs items={textItems} value={value} onChange={setValue} variant="underline" />;
  },
};

export const UnderlineVertical: Story = {
  render: () => {
    const [value, setValue] = useState('stays');
    return <Tabs items={textItems} value={value} onChange={setValue} variant="underline" orientation="vertical" />;
  },
};

export const Pill: Story = {
  render: () => {
    const [value, setValue] = useState('choose');
    return <Tabs items={pillItems} value={value} onChange={setValue} variant="pill" />;
  },
};

export const PillFullWidth: Story = {
  render: () => {
    const [value, setValue] = useState('choose');
    return <Tabs items={pillItems} value={value} onChange={setValue} variant="pill" fullWidth />;
  },
};

export const Sizes: Story = {
  render: () => {
    const [value, setValue] = useState('dome');
    return (
      <div className="flex flex-col gap-4">
        <Tabs items={items} value={value} onChange={setValue} variant="underline" size="sm" />
        <Tabs items={items} value={value} onChange={setValue} variant="underline" size="md" />
        <Tabs items={items} value={value} onChange={setValue} variant="underline" size="lg" />
      </div>
    );
  },
}; 