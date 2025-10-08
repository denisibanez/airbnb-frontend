import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../components/ui/Button';
import { IconsOutlineAirbnb, IconsOutlineDarkAirbnb } from '../components/ui/Icons';

const meta: Meta<any> = {
  title: 'Components/Button',
  component: Button as any,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<any>;

export const Primary: Story = { args: { variant: 'primary', children: 'Primary' } };
export const Secondary: Story = { args: { variant: 'secondary', children: 'Secondary' } };
export const Tertiary: Story = { args: { variant: 'tertiary', children: 'Tertiary' } };
export const Outline: Story = { args: { variant: 'outline', children: 'Outline' } };
export const Ghost: Story = { args: { variant: 'ghost', children: 'Ghost' } };
export const Link: Story = { args: { variant: 'link', children: 'Link' } };
export const Error: Story = { args: { variant: 'error', children: 'Error' } };
export const Gradient: Story = { args: { variant: 'gradient', children: 'Gradient' } };

export const Sizes: Story = {
  render: () => (
    <div className="flex gap-3 flex-wrap">
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
      <Button size="xl">XLarge</Button>
    </div>
  ),
};

export const Loading: Story = { args: { variant: 'primary', loading: true, children: '' } };
export const Disabled: Story = { args: { variant: 'primary', disabled: true, children: 'Disabled' } };
export const FullWidth: Story = { args: { variant: 'primary', fullWidth: true, children: 'Full Width' } };

export const IconLeft: Story = {
  args: {
    variant: 'primary',
    iconLeft: <IconsOutlineDarkAirbnb className="w-5 h-5" />, children: 'Icon Left'
  }
};
export const IconRight: Story = {
  args: {
    variant: 'primary',
    iconRight: <IconsOutlineDarkAirbnb className="w-5 h-5" />, children: 'Icon Right'
  }
};

export const LoadingVariants: Story = {
  render: () => (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
      {['primary','secondary','tertiary','outline','ghost','link','error'].map(variant => (
        <Button key={variant} variant={variant as any} loading>
 
        </Button>
      ))}
    </div>
  ),
};

export const LoadingSizes: Story = {
  render: () => (
    <div className="flex gap-3 flex-wrap">
      <Button size="sm" loading></Button>
      <Button size="md" loading></Button>
      <Button size="lg" loading></Button>
      <Button size="xl" loading></Button>
    </div>
  ),
}; 
