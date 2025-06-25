import type { Meta, StoryObj } from '@storybook/react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../components/ui/Card';
import { Button } from '../components/ui/Button';

const meta: Meta<any> = {
  title: 'Components/Card',
  component: Card as any,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<any>;

export const Default: Story = {
  render: () => (
    <Card variant="default">
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
    </Card>
  ),
};

export const Elevated: Story = {
  render: () => (
    <Card variant="elevated">
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
    </Card>
  ),
};

export const ElevatedLarge: Story = {
  render: () => (
    <Card variant="elevatedLarge">
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
    </Card>
  ),
}; 