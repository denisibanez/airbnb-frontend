import type { Meta, StoryObj } from '@storybook/react';
import DatePicker from '../components/ui/DatePicker';

const meta: Meta<typeof DatePicker> = {
  title: 'Components/DatePicker',
  component: DatePicker,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof DatePicker>;

export const Playground: Story = {
  args: {},
};

export const RangeSelection: Story = {
  render: () => <DatePicker />,
};

export const Tabs: Story = {
  render: () => <DatePicker />,
};

export const Pills: Story = {
  render: () => <DatePicker />,
}; 