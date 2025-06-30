import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Accordion from '../components/ui/Accordion';

const meta: Meta<typeof Accordion> = {
  title: 'Components/Accordion',
  component: Accordion,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof Accordion>;

const faqItems = [
  {
    title: 'What is AirCover?',
    content: (
      <>
        AirCover is comprehensive protection included for free with every booking. It includes protection from Host cancellations, listing inaccuracies, and other issues like trouble checking in, as well as a 24-hour safety line.<br /><br />
        <strong>
          <a href="#" className="underline text-[#222] hover:text-[#FF385C]">Learn more about how AirCover protects your booking</a>
        </strong>
      </>
    ),
  },
  ...Array(5).fill({
    title: 'What is AirCover?',
    content: '',
  })
];

export const Default: Story = {
  render: () => <Accordion items={faqItems} />,
};

export const AllClosed: Story = {
  render: () => <Accordion items={faqItems} allowMultiple={false} />,
};

export const MultipleOpen: Story = {
  render: () => <Accordion items={faqItems} allowMultiple />,
};

export const NoLinks: Story = {
  render: () => <Accordion items={faqItems.map(i => ({ ...i, content: 'Just text', link: undefined }))} />,
}; 