import type { Meta, StoryObj } from '@storybook/react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../components/ui/CardAction';
import { Button } from '../components/ui/Button';

const meta: Meta<typeof Card> = {
  title: 'Components/CardAction',
  component: Card,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'elevated', 'elevatedLarge', 'elevatedXl', 'outline', 'ghost'],
    },
    padding: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg', 'xl'],
    },
    className: { control: 'text' },
    children: { control: 'object' },
  },
  args: {
    variant: 'default',
    padding: 'md',
    className: '',
    children: (
      <>
        <CardHeader>
          <CardTitle>Default Card</CardTitle>
          <CardDescription>Default variant with border</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-neutral-07">This is a default card with neutral styling.</p>
        </CardContent>
        <CardFooter>
          <Button variant="primary" size="sm">Action</Button>
        </CardFooter>
      </>
    ),
  },
};
export default meta;

type Story = StoryObj<typeof Card>;

export const Playground: Story = {
  args: {},
};

export const Elevated: Story = {
  args: {
    variant: 'elevated',
    children: (
      <>
        <CardHeader>
          <CardTitle>Elevated Card</CardTitle>
          <CardDescription>Medium elevation shadow</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-neutral-07">This card has a medium elevation shadow.</p>
        </CardContent>
        <CardFooter>
          <Button variant="secondary" size="sm">Action</Button>
        </CardFooter>
      </>
    ),
  },
};

export const ElevatedLarge: Story = {
  args: {
    variant: 'elevatedLarge',
    children: (
      <>
        <CardHeader>
          <CardTitle>Large Elevated</CardTitle>
          <CardDescription>Large elevation shadow</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-neutral-07">This card has a large elevation shadow.</p>
        </CardContent>
        <CardFooter>
          <Button variant="primary" size="sm">Action</Button>
        </CardFooter>
      </>
    ),
  },
}; 