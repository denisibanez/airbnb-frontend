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
    className: { control: 'text' },
  },
  args: {
    onSearchBar: {
      where: 'Pesquisar destinos',
      checkIn: 'Adicionar datas',
      checkOut: 'Adicionar datas',
      guests: 'Adicionar viajantes',
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

export const WithDatePicker: Story = {
  render: () => {
    const [dates, setDates] = React.useState<[Date | null, Date | null]>([null, null]);
    
    return (
      <div className="min-h-screen bg-gray-50 pb-20">
        <NavigationBar 
          userProfileImage="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face"
          onSearchBar={{
            where: 'Pesquisar destinos',
            checkIn: 'Adicionar datas',
            checkOut: 'Adicionar datas',
            guests: 'Adicionar viajantes',
            onDateChange: (newDates) => {
              setDates(newDates);
              console.log('Datas selecionadas:', newDates);
            },
          }}
        />
        {dates[0] && dates[1] && (
          <div className="mt-8 text-center">
            <p className="text-lg font-semibold">
              Datas selecionadas: {dates[0].toLocaleDateString('pt-BR')} - {dates[1].toLocaleDateString('pt-BR')}
            </p>
          </div>
        )}
      </div>
    );
  },
}; 
