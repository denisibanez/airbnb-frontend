import type { Meta, StoryObj } from '@storybook/react';
import TextField from '../components/ui/TextField';
import { IconsOutlineAirbnb } from '../components/ui/Icons';

const meta: Meta<typeof TextField> = {
  title: 'Components/TextField',
  component: TextField,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof TextField>;

export const Default: Story = {
  args: {
    label: 'Label',
    placeholder: 'Placeholder text',
  },
};

export const WithHelper: Story = {
  args: {
    label: 'Label',
    placeholder: 'Placeholder text',
    helperText: 'Optional helper text',
  },
};

export const Error: Story = {
  args: {
    label: 'Label',
    placeholder: 'Placeholder text',
    errorMessage: 'Error message',
  },
};

export const ErrorWithHelper: Story = {
  args: {
    label: 'Label',
    placeholder: 'Placeholder text',
    errorMessage: 'Error message',
    helperText: 'Optional helper text',
  },
};

export const Filled: Story = {
  args: {
    label: 'Label',
    placeholder: 'Placeholder text',
    value: 'Filling the input with real text',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Label',
    placeholder: 'Placeholder text',
    helperText: 'Optional helper text',
    value: '',
    disabled: true,
  },
};

export const WithIconRight: Story = {
  args: {
    label: 'Label',
    placeholder: 'Placeholder text',
    iconRight: <IconsOutlineAirbnb className="w-5 h-5" />,
  },
}; 