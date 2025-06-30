import type { Meta, StoryObj } from '@storybook/react';
import Dropdown, { DropdownOption } from '../components/ui/Dropdown';
import { IconsInterfaceInfo } from '../components/ui/Icons';

const options: DropdownOption[] = [
  { value: '1', label: 'Placeholder text' },
  { value: '2', label: 'Outra opção' },
  { value: '3', label: 'Mais uma opção' },
];

const optionsWithIcon: DropdownOption[] = [
  { value: '1', label: 'Placeholder text', iconLeft: <IconsInterfaceInfo className="w-5 h-5" /> },
  { value: '2', label: 'Outra opção', iconLeft: <IconsInterfaceInfo className="w-5 h-5" /> },
  { value: '3', label: 'Mais uma opção', iconLeft: <IconsInterfaceInfo className="w-5 h-5" /> },
];

const meta: Meta<typeof Dropdown> = {
  title: 'Components/Dropdown',
  component: Dropdown,
  tags: ['autodocs'],
  argTypes: {
    value: { control: 'text' },
    options: { control: 'object' },
    label: { control: 'text' },
    placeholder: { control: 'text' },
    error: { control: 'boolean' },
    disabled: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
    iconLeft: { control: 'object' },
    className: { control: 'text' },
    onChange: { action: 'changed' },
  },
  args: {
    value: '',
    options,
    label: '',
    placeholder: 'Placeholder text',
    error: false,
    disabled: false,
    fullWidth: false,
    iconLeft: undefined,
    className: '',
  },
};
export default meta;

type Story = StoryObj<typeof Dropdown>;

export const Playground: Story = {
  args: {},
};

export const WithLabel: Story = {
  args: {
    label: 'Label',
    value: '',
    options,
  },
};

export const Error: Story = {
  args: {
    label: 'Label',
    value: '',
    options,
    error: true,
  },
};

export const Disabled: Story = {
  args: {
    label: 'Label',
    value: '',
    options,
    disabled: true,
  },
};

export const FullWidth: Story = {
  args: {
    label: 'Label',
    value: '',
    options,
    fullWidth: true,
  },
};

export const WithIconLeft: Story = {
  args: {
    label: 'Label',
    value: '',
    options: optionsWithIcon,
  },
}; 