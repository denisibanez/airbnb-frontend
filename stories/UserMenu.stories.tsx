import type { Meta, StoryObj } from '@storybook/nextjs';
import UserMenu from '../components/ui/UserMenu';

const meta: Meta<typeof UserMenu> = {
  title: 'Components/UserMenu',
  component: UserMenu,
  tags: ['autodocs'],
  argTypes: {
    isOpen: { control: 'boolean' },
    onClose: { action: 'close' },
    userProfileImage: { control: 'text' },
    className: { control: 'text' },
  },
  args: {
    isOpen: true,
    userProfileImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face',
  },
};

export default meta;

type Story = StoryObj<typeof UserMenu>;

export const Default: Story = {
  args: {
    isOpen: true,
  },
};

export const Debug: Story = {
  render: () => {
    console.log('Testing UserMenu render...');
    return (
      <div className="p-4">
        <h3 className="mb-4">UserMenu Debug</h3>
        <UserMenu 
          isOpen={true}
          onClose={() => console.log('Close clicked')}
        />
      </div>
    );
  },
};

export const WithProfileImage: Story = {
  args: {
    isOpen: true,
    userProfileImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face',
  },
};

export const Closed: Story = {
  args: {
    isOpen: false,
  },
};

export const DifferentProfileImages: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-sm font-semibold text-gray-700 mb-4">Profile Image 1</h3>
        <UserMenu 
          isOpen={true}
          onClose={() => {}}
          userProfileImage="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face"
        />
      </div>
      <div>
        <h3 className="text-sm font-semibold text-gray-700 mb-4">Profile Image 2</h3>
        <UserMenu 
          isOpen={true}
          onClose={() => {}}
          userProfileImage="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face"
        />
      </div>
      <div>
        <h3 className="text-sm font-semibold text-gray-700 mb-4">Profile Image 3</h3>
        <UserMenu 
          isOpen={true}
          onClose={() => {}}
          userProfileImage="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=32&h=32&fit=crop&crop=face"
        />
      </div>
    </div>
  ),
};
