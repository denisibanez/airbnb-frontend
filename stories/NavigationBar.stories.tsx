import type { Meta, StoryObj } from '@storybook/react';
import NavigationBar from '../components/ui/NavigationBar';

const meta: Meta<typeof NavigationBar> = {
  title: 'Components/NavigationBar',
  component: NavigationBar,
  tags: ['autodocs'],
  argTypes: {
    onLogoClick: { action: 'logoClick' },
    onBecomeHost: { action: 'becomeHost' },
    onLanguageClick: { action: 'languageClick' },
    onUserMenuClick: { action: 'userMenuClick' },
    onSearchBar: { control: 'object' },
    className: { control: 'text' },
  },
  args: {
    onSearchBar: {
      where: 'Anywhere',
      when: 'Any week',
      guests: 'Add guests',
    },
    className: '',
  },
};
export default meta;

type Story = StoryObj<typeof NavigationBar>;

export const Playground: Story = {
  args: {},
};

export const WithCustomSearch: Story = {
  args: {
    onSearchBar: {
      where: 'Paris',
      when: 'Jul 10 - Jul 20',
      guests: '2 guests',
    },
  },
}; 