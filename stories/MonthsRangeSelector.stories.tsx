import type { Meta, StoryObj } from '@storybook/react';
import MonthsRangeSelector from '../components/ui/MonthsRangeSelector';

const meta: Meta<typeof MonthsRangeSelector> = {
  title: 'UI/MonthsRangeSelector',
  component: MonthsRangeSelector,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: { type: 'number', min: 1, max: 12 },
      description: 'Number of months selected (1-12)',
    },
    language: {
      control: { type: 'select' },
      options: ['pt', 'en'],
      description: 'Language for text content',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: 3,
    language: 'pt',
  },
};

export const English: Story = {
  args: {
    value: 5,
    language: 'en',
  },
};

export const LongDuration: Story = {
  args: {
    value: 9,
    language: 'pt',
  },
};

export const ShortDuration: Story = {
  args: {
    value: 1,
    language: 'pt',
  },
};

export const Interactive: Story = {
  args: {
    value: 6,
    language: 'pt',
  },
  render: (args) => {
    const [value, setValue] = React.useState(args.value);

    return (
      <div className="p-8">
        <MonthsRangeSelector
          {...args}
          value={value}
          onChange={setValue}
        />
        <div className="mt-4 text-center text-sm text-gray-600">
          Selected: {value} months
        </div>
      </div>
    );
  },
};
