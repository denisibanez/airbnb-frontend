import type { Meta, StoryObj } from '@storybook/react';
import Callout from '../components/ui/Callout';
import diamond from '../assets/images/Type=Diamond.png';

const meta: Meta<typeof Callout> = {
  title: 'Components/Callout',
  component: Callout,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof Callout>;

export const Playground: Story = {
  args: {
    children: 'Este é um callout padrão no estilo Airbnb.',
  },
};

export const Default: Story = {
  args: {
    children: 'Este é um callout padrão no estilo Airbnb.',
  },
};

export const ReservationCard: Story = {
  render: () => (
    <Callout
      variant="reservation"
      title="Your reservation"
      status="canceled"
      reservationCode="XMPQKAPZ6D"
      image="https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM="
    >
      tiny house, tiny farm
    </Callout>
  ),
};

export const RareFindCard: Story = {
  render: () => (
    <Callout
      variant="rare-find"
      icon={diamond}
    >
      Hope's place on Airbnb is usually fully booked.
    </Callout>
  ),
};

export const WithAction: Story = {
  args: {
    children: 'Clique no botão para mais informações.',
    action: <button className="underline text-[#007AAB]">Saiba mais</button>,
  },
}; 
