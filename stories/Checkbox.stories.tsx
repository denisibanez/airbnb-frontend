import type { Meta, StoryObj } from '@storybook/react';
import Checkbox from '../components/ui/Checkbox';

const meta: Meta<typeof Checkbox> = {
  title: 'Components/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  argTypes: {
    checked: { control: 'boolean' },
    indeterminate: { control: 'boolean' },
    disabled: { control: 'boolean' },
    error: { control: 'boolean' },
    label: { control: 'text' },
    className: { control: 'text' },
    variant: { 
      control: 'select',
      options: ['style1', 'style2', 'style3']
    },
    onChange: { action: 'changed' },
  },
  args: {
    checked: false,
    indeterminate: false,
    disabled: false,
    error: false,
    label: 'Aceito os termos',
    className: '',
  },
};
export default meta;

type Story = StoryObj<typeof Checkbox>;

export const Playground: Story = {
  args: {},
};

// Style 1 - Light gray border
export const Style1Unchecked: Story = {
  args: {
    variant: 'style1',
    checked: false,
    label: 'Style 1 - Unchecked',
  },
};

export const Style1Checked: Story = {
  args: {
    variant: 'style1',
    checked: true,
    label: 'Style 1 - Checked',
  },
};

// Style 2 - Dark gray/black border
export const Style2Unchecked: Story = {
  args: {
    variant: 'style2',
    checked: false,
    label: 'Style 2 - Unchecked',
  },
};

export const Style2Checked: Story = {
  args: {
    variant: 'style2',
    checked: true,
    label: 'Style 2 - Checked',
  },
};

// Style 3 - Double border
export const Style3Unchecked: Story = {
  args: {
    variant: 'style3',
    checked: false,
    label: 'Style 3 - Unchecked',
  },
};

export const Style3Checked: Story = {
  args: {
    variant: 'style3',
    checked: true,
    label: 'Style 3 - Checked',
  },
};

export const Indeterminate: Story = {
  args: {
    indeterminate: true,
    label: 'Checkbox indeterminado',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    label: 'Checkbox desabilitado',
  },
};

export const Error: Story = {
  args: {
    error: true,
    label: 'Checkbox com erro',
  },
}; 
