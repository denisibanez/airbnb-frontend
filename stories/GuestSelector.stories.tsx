import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import GuestSelector from '../components/ui/GuestSelector';

const meta: Meta<typeof GuestSelector> = {
  title: 'Components/GuestSelector',
  component: GuestSelector,
  tags: ['autodocs'],
  argTypes: {
    value: { control: 'object' },
    className: { control: 'text' },
    onChange: { action: 'changed' },
  },
  args: {
    value: undefined,
    className: '',
  },
};
export default meta;

type Story = StoryObj<typeof GuestSelector>;

export const Playground: Story = {
  args: {},
};

export const Controlled: Story = {
  render: (args) => {
    const [value, setValue] = useState({ adults: 2, children: 1, infants: 0, pets: 0 });
    return <GuestSelector value={value} onChange={v => v && setValue(v)} {...args} />;
  },
};

export const Uncontrolled: Story = {
  args: {},
}; 