import type { Meta, StoryObj } from '@storybook/react';
import ReviewBox, { ReviewCriterion, ReviewData } from '../components/ui/ReviewBox';

const criteria: ReviewCriterion[] = [
  { label: 'Cleanliness', value: 4.8 },
  { label: 'Accuracy', value: 4.8 },
  { label: 'Communication', value: 4.8 },
  { label: 'Location', value: 4.8 },
  { label: 'Check-in', value: 4.8 },
  { label: 'Value', value: 4.8 },
];

const review: ReviewData = {
  user: {
    name: 'Hanna',
    avatarUrl: '',
    date: 'January 2023',
  },
  text: 'We had a delightful stay! We loved soaking in the tub, hiking in the area, and wine tasting in Truckee.',
};

const meta: Meta<typeof ReviewBox> = {
  title: 'Components/ReviewBox',
  component: ReviewBox,
  tags: ['autodocs'],
  argTypes: {
    criteria: { control: 'object' },
    review: { control: 'object' },
    className: { control: 'text' },
  },
  args: {
    criteria,
    review,
    className: '',
  },
};
export default meta;

type Story = StoryObj<typeof ReviewBox>;

export const Playground: Story = {
  args: {},
};

export const NoAvatar: Story = {
  args: {
    review: {
      ...review,
      user: { ...review.user, avatarUrl: undefined },
    },
  },
}; 