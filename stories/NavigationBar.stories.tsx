import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs';
import NavigationBar from '../components/ui/NavigationBar';

const meta: Meta<typeof NavigationBar> = {
  title: 'Components/NavigationBar',
  component: NavigationBar,
  tags: ['autodocs'],
  argTypes: {
    onLogoClick: { action: 'logoClick' },
    onBecomeHost: { action: 'becomeHost' },
    onSearchBar: { control: 'object' },
    userProfileImage: { control: 'text' },
    loading: { control: 'boolean' },
    className: { control: 'text' },
  },
  args: {
    onSearchBar: {
      where: 'Pesquisar destinos',
      checkIn: 'Adicionar datas',
      checkOut: 'Adicionar datas',
      guests: 'Adicionar viajantes',
    },
    loading: false,
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
      checkIn: 'Jul 10',
      checkOut: 'Jul 20',
      guests: '2 hóspedes',
    },
  },
};

export const WithUserProfileImage: Story = {
  args: {
    userProfileImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face',
  },
};

export const WithUserProfileImageAndSearch: Story = {
  args: {
    userProfileImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face',
    onSearchBar: {
      where: 'Tokyo',
      checkIn: 'Ago 15',
      checkOut: 'Ago 25',
      guests: '4 hóspedes',
    },
  },
};

export const DefaultUserIcon: Story = {
  args: {
    // Sem userProfileImage para mostrar o ícone padrão
  },
};

export const WithDifferentProfileImages: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-sm font-semibold text-gray-700 mb-4">Profile Image 1</h3>
        <NavigationBar userProfileImage="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face" />
      </div>
      <div>
        <h3 className="text-sm font-semibold text-gray-700 mb-4">Profile Image 2</h3>
        <NavigationBar userProfileImage="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face" />
      </div>
      <div>
        <h3 className="text-sm font-semibold text-gray-700 mb-4">Profile Image 3</h3>
        <NavigationBar userProfileImage="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=32&h=32&fit=crop&crop=face" />
      </div>
      <div>
        <h3 className="text-sm font-semibold text-gray-700 mb-4">Profile Image with Search Bar</h3>
        <NavigationBar 
          userProfileImage="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face"
          onSearchBar={{
            where: 'Paris',
            checkIn: 'Jul 10',
            checkOut: 'Jul 20',
            guests: '2 hóspedes',
          }}
        />
      </div>
    </div>
  ),
};

export const AllUserStates: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-sm font-semibold text-gray-700 mb-4">Default User Icon (No Background)</h3>
        <NavigationBar />
      </div>
      <div>
        <h3 className="text-sm font-semibold text-gray-700 mb-4">With User Profile Image</h3>
        <NavigationBar userProfileImage="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face" />
      </div>
      <div>
        <h3 className="text-sm font-semibold text-gray-700 mb-4">With Search Bar</h3>
        <NavigationBar 
          userProfileImage="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face"
          onSearchBar={{
            where: 'Paris',
            checkIn: 'Jul 10',
            checkOut: 'Jul 20',
            guests: '2 hóspedes',
          }}
        />
      </div>
    </div>
  ),
};

export const WithTabSelection: Story = {
  render: () => {
    const [selectedTab, setSelectedTab] = React.useState<'stays' | 'experiences' | 'services'>('stays');
    const [dates, setDates] = React.useState<[Date | null, Date | null]>([null, null]);
    
    return (
      <div className="min-h-screen bg-gray-50 pb-20">
        <NavigationBar 
          selectedTab={selectedTab}
          onTabChange={(tab) => {
            setSelectedTab(tab);
            console.log('Tab changed to:', tab);
          }}
          userProfileImage="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face"
          onSearchBar={{
            where: 'Search destinations',
            checkIn: 'Add dates',
            checkOut: 'Add dates',
            guests: 'Add guests',
            onDateChange: (newDates) => {
              setDates(newDates);
              console.log('Dates selected:', newDates);
            },
            onLocationSelect: (location) => {
              console.log('Location selected:', location);
            },
          }}
        />
        <div className="mt-8 text-center">
          <p className="text-lg font-semibold text-gray-700">
            Current tab: <span className="text-[#FF385C]">{selectedTab}</span>
          </p>
          <p className="text-sm text-gray-500 mt-2">
            SearchBar mode: {selectedTab === 'experiences' || selectedTab === 'services' ? 'experiences' : 'accommodation'}
          </p>
          <p className="text-xs text-gray-400 mt-2">
            Popovers stay open when switching tabs, but selections are cleared
          </p>
          {dates[0] && dates[1] && (
            <p className="text-sm text-gray-600 mt-4">
              Dates: {dates[0].toLocaleDateString('en-US')} - {dates[1].toLocaleDateString('en-US')}
            </p>
          )}
        </div>
      </div>
    );
  },
};

export const LoadingState: Story = {
  args: {
    loading: true,
  },
  render: (args) => (
    <div className="min-h-screen bg-gray-50">
      <NavigationBar {...args} />
      <div className="p-8">
        <h2 className="text-xl font-semibold mb-4">NavigationBar Loading State</h2>
        <p className="text-gray-600 mb-4">
          This example shows the skeleton loading state for the entire NavigationBar component.
        </p>
        <div className="bg-white p-4 rounded-lg border">
          <h3 className="font-semibold mb-2">Loading State</h3>
          <p className="text-sm text-gray-600">
            The skeleton includes placeholders for the logo, navigation tabs, user actions, and the SearchBar.
          </p>
        </div>
      </div>
    </div>
  ),
}; 
