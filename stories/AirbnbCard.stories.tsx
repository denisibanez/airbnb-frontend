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

export const Reserve: Story = {
  args: {
    variant: 'reserve',
    title: 'Reserva',
    summary: (
      <div>
        <div className="flex items-center gap-2 mb-2">
          <span className="line-through text-[#B0B0B0] text-lg">$500</span>
          <span className="text-2xl font-bold">$440</span>
          <span className="text-sm text-[#222]">night</span>
          <span className="ml-auto text-sm text-[#222]">4.99 · 337 reviews</span>
        </div>
        <div className="flex gap-2 mb-2">
          <div className="flex-1">
            <div className="text-xs text-[#717171]">CHECK-IN</div>
            <div className="font-medium text-[#222]">2/6/2023</div>
          </div>
          <div className="flex-1">
            <div className="text-xs text-[#717171]">CHECKOUT</div>
            <div className="font-medium text-[#222]">2/11/2023</div>
          </div>
          <div className="flex-1">
            <div className="text-xs text-[#717171]">GUESTS</div>
            <div className="font-medium text-[#222]">1 guest</div>
          </div>
        </div>
      </div>
    ),
    details: [
      { label: '500 x 5 nights', value: '$2,500' },
      { label: 'Long stay discount', value: '-$300' },
      { label: 'Cleaning fee', value: '$200' },
      { label: 'Service fee', value: '$0' },
      { label: 'Total before taxes', value: '$2,400', highlight: true },
    ],
    actionLabel: 'Reserve',
  },
};

export const PriceDetails: Story = {
  args: {
    variant: 'priceDetails',
    title: 'Detalhes de preço',
    summary: (
      <div>
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-semibold uppercase text-[#B0B0B0]">Entire cabin</span>
          <span className="ml-auto text-xs text-[#717171]">Superhost</span>
        </div>
        <div className="font-medium text-[#222]">Glacier Pines Cabin (New Hot Tub Installed!)</div>
        <div className="text-xs text-[#717171]">4.86 (110 reviews)</div>
        <div className="text-xs text-[#717171] mt-1">Your booking is protected by <span className="text-[#FF385C] font-semibold">aircover</span></div>
      </div>
    ),
    details: [
      { label: '500 x 5 nights', value: '$2,500' },
      { label: 'Long stay discount', value: '-$300' },
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