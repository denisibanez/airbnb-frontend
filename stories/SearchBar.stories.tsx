import type { Meta, StoryObj } from '@storybook/react';
import SearchBar from '../components/ui/SearchBar';

const meta: Meta<typeof SearchBar> = {
  title: 'Components/SearchBar',
  component: SearchBar,
  tags: ['autodocs'],
  argTypes: {
    where: { control: 'text' },
    when: { control: 'text' },
    guests: { control: 'text' },
    className: { control: 'text' },
    onWhereClick: { action: 'whereClick' },
    onWhenClick: { action: 'whenClick' },
    onGuestsClick: { action: 'guestsClick' },
    onSearch: { action: 'search' },
  },
  args: {
    where: 'Anywhere',
    when: 'Any week',
    guests: 'Add guests',
    className: '',
  },
};
export default meta;

type Story = StoryObj<typeof SearchBar>;

export const Playground: Story = {
  args: {},
};

export const OnlyWhere: Story = {
  args: {
    where: 'Anywhere',
    when: '',
    guests: '',
  },
};

export const OnlyWhen: Story = {
  args: {
    where: '',
    when: 'Any week',
    guests: '',
  },
};

export const OnlyGuests: Story = {
  args: {
    where: '',
    when: '',
    guests: 'Add guests',
  },
};

export const AllFilled: Story = {
  args: {
    where: 'Paris',
    when: 'Jul 10 - Jul 20',
    guests: '2 guests',
  },
}; 