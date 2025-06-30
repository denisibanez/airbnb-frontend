import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import Tooltip from '../components/ui/Tooltip';

const content = 'Get to know Jane better through reviews. Reviews can only be left by past guests or hosts.';
const title = 'Title';

const meta: Meta<typeof Tooltip> = {
  title: 'Components/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  argTypes: {
    content: { control: 'text' },
    title: { control: 'text' },
    variant: { control: 'select', options: ['light', 'dark'] },
    placement: { control: 'select', options: ['top', 'bottom', 'left', 'right'] },
    withArrow: { control: 'boolean' },
    closable: { control: 'boolean' },
    className: { control: 'text' },
    contentClassName: { control: 'text' },
    open: { control: 'boolean' },
    defaultOpen: { control: 'boolean' },
  },
  args: {
    content,
    title: '',
    variant: 'light',
    placement: 'top',
    withArrow: true,
    closable: false,
    className: '',
    contentClassName: '',
    open: undefined,
    defaultOpen: undefined,
  },
};
export default meta;

type Story = StoryObj<typeof Tooltip>;

export const Playground: Story = {
  args: {},
  render: (args) => (
    <div className="flex justify-center items-center h-64">
      <Tooltip {...args}>
        <button className="px-4 py-2 rounded border">Hover me</button>
      </Tooltip>
    </div>
  ),
};

export const AllLight: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-8 p-8 border-2 border-dashed border-violet-300 rounded-xl bg-neutral-50">
      <Tooltip content={content} defaultOpen withArrow>
        <button className="w-full h-24 rounded-xl border">{content}</button>
      </Tooltip>
      <Tooltip content={content} title={title} defaultOpen withArrow>
        <button className="w-full h-24 rounded-xl border">{title}</button>
      </Tooltip>
      <Tooltip content={content} defaultOpen withArrow={false}>
        <button className="w-full h-24 rounded-xl border">No Arrow</button>
      </Tooltip>
      <Tooltip content={content} title={title} defaultOpen withArrow={false}>
        <button className="w-full h-24 rounded-xl border">Title, No Arrow</button>
      </Tooltip>
      <Tooltip content={content} defaultOpen closable>
        <button className="w-full h-24 rounded-xl border">Closable</button>
      </Tooltip>
      <Tooltip content={content} title={title} defaultOpen closable>
        <button className="w-full h-24 rounded-xl border">Title, Closable</button>
      </Tooltip>
    </div>
  ),
};

export const AllDark: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-8 p-8 border-2 border-dashed border-violet-300 rounded-xl bg-neutral-50">
      <Tooltip content={content} defaultOpen withArrow variant="dark">
        <button className="w-full h-24 rounded-xl border bg-neutral-900 text-white">{content}</button>
      </Tooltip>
      <Tooltip content={content} title={title} defaultOpen withArrow variant="dark">
        <button className="w-full h-24 rounded-xl border bg-neutral-900 text-white">{title}</button>
      </Tooltip>
      <Tooltip content={content} defaultOpen withArrow={false} variant="dark">
        <button className="w-full h-24 rounded-xl border bg-neutral-900 text-white">No Arrow</button>
      </Tooltip>
      <Tooltip content={content} title={title} defaultOpen withArrow={false} variant="dark">
        <button className="w-full h-24 rounded-xl border bg-neutral-900 text-white">Title, No Arrow</button>
      </Tooltip>
      <Tooltip content={content} defaultOpen closable variant="dark">
        <button className="w-full h-24 rounded-xl border bg-neutral-900 text-white">Closable</button>
      </Tooltip>
      <Tooltip content={content} title={title} defaultOpen closable variant="dark">
        <button className="w-full h-24 rounded-xl border bg-neutral-900 text-white">Title, Closable</button>
      </Tooltip>
    </div>
  ),
};

export const Placements: Story = {
  render: () => (
    <div className="flex flex-wrap gap-8 p-8 border-2 border-dashed border-violet-300 rounded-xl bg-neutral-50 justify-center items-center">
      <Tooltip content={content} defaultOpen placement="top">
        <button className="w-40 h-16 rounded-xl border">Top</button>
      </Tooltip>
      <Tooltip content={content} defaultOpen placement="bottom">
        <button className="w-40 h-16 rounded-xl border">Bottom</button>
      </Tooltip>
      <Tooltip content={content} defaultOpen placement="left">
        <button className="w-40 h-16 rounded-xl border">Left</button>
      </Tooltip>
      <Tooltip content={content} defaultOpen placement="right">
        <button className="w-40 h-16 rounded-xl border">Right</button>
      </Tooltip>
    </div>
  ),
}; 