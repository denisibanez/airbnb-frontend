import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import RadioButton from '../components/ui/RadioButton';

const meta: Meta<typeof RadioButton> = {
  title: 'Components/RadioButton',
  component: RadioButton,
  tags: ['autodocs'],
  argTypes: {
    checked: { control: 'boolean' },
    label: { control: 'text' },
    description: { control: 'text' },
    disabled: { control: 'boolean' },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    variant: { control: 'select', options: ['default', 'outlined', 'filled'] },
    className: { control: 'text' },
  },
  args: {
    checked: false,
    label: '',
    description: '',
    disabled: false,
    size: 'md',
    variant: 'default',
    className: '',
  },
};
export default meta;

type Story = StoryObj<typeof RadioButton>;

export const Playground: Story = {
  args: {},
};

export const OnlyRadio: Story = {
  render: () => (
    <div className="flex flex-col gap-4 p-4 border-2 border-dashed border-violet-300 rounded-xl w-fit">
      <RadioButton checked={false} onChange={() => {}} />
      <RadioButton checked onChange={() => {}} />
      <RadioButton checked={false} variant="outlined" onChange={() => {}} />
      <RadioButton checked variant="outlined" onChange={() => {}} />
      <RadioButton checked={false} variant="filled" onChange={() => {}} />
      <RadioButton checked variant="filled" onChange={() => {}} />
    </div>
  ),
};

export const WithLabels: Story = {
  render: () => (
    <div className="p-4 border-2 border-dashed border-violet-300 rounded-xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <RadioButton checked={false} label="Keypad" description="Guests can open the door with a code" onChange={() => {}} />
        <RadioButton checked label="Keypad" description="Guests can open the door with a code" onChange={() => {}} />
        <RadioButton checked={false} variant="filled" label="Keypad" description="Guests can open the door with a code" onChange={() => {}} />
        <RadioButton checked variant="filled" label="Keypad" description="Guests can open the door with a code" onChange={() => {}} />
        <RadioButton checked={false} variant="outlined" label="Keypad" description="Guests can open the door with a code" onChange={() => {}} />
        <RadioButton checked variant="outlined" label="Keypad" description="Guests can open the door with a code" onChange={() => {}} />
      </div>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex gap-6 items-center p-4">
      <RadioButton checked size="sm" onChange={() => {}} />
      <RadioButton checked size="md" onChange={() => {}} />
      <RadioButton checked size="lg" onChange={() => {}} />
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className="flex flex-col gap-4 p-4">
      <RadioButton checked={false} disabled label="Keypad" onChange={() => {}} />
      <RadioButton checked disabled label="Keypad" onChange={() => {}} />
    </div>
  ),
};

export const Group: Story = {
  render: () => {
    const [value, setValue] = useState('2');
    return (
      <div className="flex flex-col gap-2 p-4">
        {[1, 2, 3].map(i => (
          <RadioButton
            key={i}
            checked={value === String(i)}
            onChange={() => setValue(String(i))}
            label={`Option ${i}`}
            name="group"
            value={String(i)}
          />
        ))}
      </div>
    );
  },
}; 