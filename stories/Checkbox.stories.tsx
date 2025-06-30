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

export const Checked: Story = {
  args: {
    checked: true,
    label: 'Checkbox marcado',
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

export const NoLabel: Story = {
  args: {
    label: '',
  },
}; 