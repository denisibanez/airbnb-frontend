import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import AirbnbCard, { AirbnbCardVariant } from '../components/ui/AirbnbCard';

const meta: Meta<typeof AirbnbCard> = {
  title: 'Components/AirbnbCard',
  component: AirbnbCard,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['listing', 'simple', 'dates', 'reserve', 'priceDetails'],
    },
    title: { control: 'text' },
    location: { control: 'text' },
    rating: { control: 'number' },
    reviewsCount: { control: 'number' },
    price: { control: 'text' },
    priceOld: { control: 'text' },
    priceTotal: { control: 'text' },
    dates: { control: 'text' },
    beds: { control: 'text' },
    badge: { control: 'text' },
    favorite: { control: 'boolean' },
    images: { control: 'object' },
    imageUrl: { control: 'text' },
    showFooter: { control: 'boolean' },
  },
  args: {
    title: 'Groveland, California',
    location: 'Yosemite National Park',
    rating: 4.91,
    price: '$289 night',
    images: ['https://www.getchalet.com/images/placeholder.svg'],
    favorite: false,
    badge: '',
    variant: 'listing',
  },
};
export default meta;

type Story = StoryObj<typeof AirbnbCard>;

export const Listing: Story = {
  args: {
    variant: 'listing',
    title: 'Groveland, California',
    location: 'Yosemite National Park',
    rating: 4.91,
    price: '$289 night',
    images: ['https://www.getchalet.com/images/placeholder.svg'],
    favorite: false,
    badge: '',
  },
};

export const ListingCarousel: Story = {
  args: {
    variant: 'listing',
    title: 'Groveland, California (Carrossel)',
    location: 'Yosemite National Park',
    rating: 4.91,
    price: '$289 night',
    images: [
      'https://www.getchalet.com/images/placeholder.svg',
      'https://www.getchalet.com/images/placeholder.svg',
      'https://www.getchalet.com/images/placeholder.svg',
    ],
    favorite: false,
    badge: '',
  },
};

export const ListingBadge: Story = {
  args: {
    variant: 'listing',
    title: 'Private room in San Francisco',
    location: 'Private Room & Balcony-Connected...',
    beds: '1 queen bed',
    dates: 'Oct 23 - 28',
    rating: 4.91,
    reviewsCount: 484,
    priceOld: '$289',
    price: '$289',
    priceTotal: '$120',
    images: ['https://www.getchalet.com/images/placeholder.svg'],
    badge: 'Superhost',
    favorite: false,
  },
};

export const ListingFavorite: Story = {
  args: {
    variant: 'listing',
    title: 'Groveland, California',
    price: '$289 night',
    dates: 'Apr 17-22',
    rating: 4.91,
    images: ['https://www.getchalet.com/images/placeholder.svg'],
    favorite: true,
    badge: '',
  },
};

export const Simple: Story = {
  args: {
    variant: 'simple',
    title: 'Bedroom 2',
    beds: '2 single beds',
    images: ['https://www.getchalet.com/images/placeholder.svg'],
    favorite: false,
    badge: '',
  },
};

const today = new Date();

export const Reserve: Story = {
  args: {
    variant: 'reserve',
    title: 'Reserva em Yosemite',
    priceOld: '$500',
    price: '$440',
    rating: 4.99,
    reviewsCount: 337,
    actionLabel: 'Reserve',
    details: [
      { label: 'CHECK-IN', value: '18/08/2025' },
      { label: 'CHECKOUT', value: '20/08/2025' },
      { label: 'GUESTS', value: '2 guests' },
      { label: '500 x 2 nights', value: '$1,000' },
      { label: 'Long stay discount', value: '-$60' },
      { label: 'Cleaning fee', value: '$100' },
      { label: 'Service fee', value: '$0' },
      { label: 'Total before taxes', value: '$1,040', highlight: true },
    ],
    onAction: () => alert('Reserva realizada!'),
    datePickerProps: {
      unavailableDates: [
        new Date(2025, 7, 10), // 10/08/2025
        new Date(2025, 7, 15), // 15/08/2025
        new Date(2025, 7, 20), // 20/08/2025
        new Date(2025, 8, 5),  // 05/09/2025
        new Date(2025, 8, 12), // 12/09/2025
      ],
    },
    badge: '',
  },
};

export const PriceDetails: Story = {
  args: {
    variant: 'priceDetails',
    title: 'Glacier Pines Cabin (New Hot Tub Installed!)',
    rating: 4.66,
    reviewsCount: 110,
    details: [
      { label: '500 x 5 nights', value: '$2,500' },
      { label: 'Long stay discount', value: '$2,500' },
      { label: 'Cleaning fee', value: '$200' },
      { label: 'Service fee', value: '$0' },
      { label: 'Total (USD)', value: '$2,400', highlight: true },
    ],
  },
};

export const Skeleton: Story = {
  render: () => (
    <div className="flex gap-6">
      <AirbnbCard  skeleton />
    </div>
  ),
};

export const ListingDiscount: Story = {
  args: {
    variant: 'listing',
    title: 'Private room in San Francisco',
    location: 'Private Room & Balcony-Connected...',
    beds: '1 queen bed',
    dates: 'Oct 23 - 28',
    rating: 4.91,
    reviewsCount: 484,
    priceOld: '$289',
    price: '$289',
    priceTotal: '$120',
    images: ['https://www.getchalet.com/images/placeholder.svg'],
    favorite: false,
    badge: '',
  },
};