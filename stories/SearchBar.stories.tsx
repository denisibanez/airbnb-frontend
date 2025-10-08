import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import SearchBar from '../components/ui/SearchBar';

const meta: Meta<typeof SearchBar> = {
  title: 'Components/SearchBar',
  component: SearchBar,
  tags: ['autodocs'],
  argTypes: {
    where: { control: 'text' },
    checkIn: { control: 'text' },
    checkOut: { control: 'text' },
    guests: { control: 'text' },
    className: { control: 'text' },
    onWhereClick: { action: 'whereClick' },
    onCheckInClick: { action: 'checkInClick' },
    onCheckOutClick: { action: 'checkOutClick' },
    onGuestsClick: { action: 'guestsClick' },
    onSearch: { action: 'search' },
    onDateChange: { action: 'dateChange' },
  },
  args: {
    where: 'Pesquisar destinos',
    checkIn: 'Adicionar datas',
    checkOut: 'Adicionar datas',
    guests: 'Adicionar viajantes',
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
    where: 'Paris',
    checkIn: 'Adicionar datas',
    checkOut: 'Adicionar datas',
    guests: '',
  },
};

export const WithDates: Story = {
  args: {
    where: 'Tokyo',
    checkIn: '10 de jul',
    checkOut: '20 de jul',
    guests: '',
  },
};

export const AllFilled: Story = {
  args: {
    where: 'Paris',
    checkIn: '10 de jul',
    checkOut: '20 de jul',
    guests: '2 hóspedes',
  },
};

export const WithDatePicker: Story = {
  render: () => {
    const [dates, setDates] = React.useState<[Date | null, Date | null]>([null, null]);
    
    return (
      <div className="min-h-screen bg-gray-50 p-20">
        <div className="flex justify-center">
          <SearchBar 
            where="Pesquisar destinos"
            checkIn="Adicionar datas"
            checkOut="Adicionar datas"
            guests="Adicionar viajantes"
            onDateChange={(newDates) => {
              setDates(newDates);
              console.log('Datas selecionadas:', newDates);
            }}
            onSearch={() => {
              console.log('Buscar com datas:', dates);
            }}
          />
        </div>
        {dates[0] && dates[1] && (
          <div className="mt-8 text-center">
            <p className="text-lg font-semibold text-gray-700">
              Datas selecionadas: {dates[0].toLocaleDateString('pt-BR')} - {dates[1].toLocaleDateString('pt-BR')}
            </p>
            <p className="text-sm text-gray-500 mt-2">
              ({Math.round((dates[1].getTime() - dates[0].getTime()) / (1000 * 60 * 60 * 24))} noites)
            </p>
          </div>
        )}
      </div>
    );
  },
}; 
