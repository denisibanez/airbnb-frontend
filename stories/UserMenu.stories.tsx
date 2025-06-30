import type { Meta, StoryObj } from '@storybook/react';
import UserMenu, { UserMenuOption } from '../components/ui/UserMenu';
import { IconsGeneralUser, IconsGeneralUserGroup, IconsGeneralVerifiedUser } from '../components/ui/Icons';

const optionsBase: UserMenuOption[] = [
  { label: 'Sign up', iconLeft: <IconsGeneralUser className="w-4 h-4" /> },
  { label: 'Log in', iconLeft: <IconsGeneralVerifiedUser className="w-4 h-4" /> },
  { divider: true, label: '' },
  { label: 'Host your home', iconLeft: <IconsGeneralUserGroup className="w-4 h-4" /> },
  { label: 'Help', iconLeft: <IconsGeneralUser className="w-4 h-4" /> },
];

const meta: Meta<any> = {
  title: 'Components/UserMenu',
  component: UserMenu,
  tags: ['autodocs'],
  argTypes: {
    avatarUrl: { control: 'text' },
    badge: { control: 'boolean' },
    options: { control: 'object' },
    className: { control: 'text' },
    onMenuClick: { action: 'menuClick' },
  },
  args: {
    avatarUrl: '',
    badge: false,
    options: optionsBase,
    className: '',
  },
};
export default meta;

type Story = StoryObj<typeof UserMenu>;

export const Playground: Story = {
  args: {},
};

export const WithAvatar: Story = {
  args: {
    avatarUrl: 'https://randomuser.me/api/portraits/men/32.jpg',
    badge: false,
    options: optionsBase,
    className: '',
  },
};

export const WithBadge: Story = {
  args: {
    avatarUrl: 'https://randomuser.me/api/portraits/women/44.jpg',
    badge: true,
    options: optionsBase,
    className: '',
  },
};

export const NoAvatar: Story = {
  args: {
    avatarUrl: '',
    badge: false,
    options: optionsBase,
    className: '',
  },
};

export const WithSeparators: Story = {
  args: {
    avatarUrl: '',
    badge: false,
    options: [
      { label: 'Sign up', iconLeft: <IconsGeneralUser className="w-4 h-4" /> },
      { label: 'Log in', iconLeft: <IconsGeneralVerifiedUser className="w-4 h-4" /> },
      { divider: true, label: '' },
      { label: 'Host your home', iconLeft: <IconsGeneralUserGroup className="w-4 h-4" /> },
      { label: 'Help', iconLeft: <IconsGeneralUser className="w-4 h-4" /> },
    ],
    className: '',
  },
}; 