import type { Meta, StoryObj } from '@storybook/react';
import Callout, { CalloutVariant } from '../components/ui/Callout';

const meta: Meta<typeof Callout> = {
  title: 'Components/Callout',
  component: Callout,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['info', 'warning', 'success', 'error', 'neutral'],
    },
    title: { control: 'text' },
    children: { control: 'text' },
    action: { control: 'object' },
    className: { control: 'text' },
  },
  args: {
    variant: 'info',
    title: 'Informação',
    children: 'Este é um callout de informação no padrão Airbnb.',
    action: undefined,
    className: '',
  },
};
export default meta;

type Story = StoryObj<typeof Callout>;

export const Playground: Story = {
  args: {},
};

export const Info: Story = {
  args: {
    variant: 'info',
    title: 'Informação',
    children: 'Este é um callout de informação no padrão Airbnb.',
  },
};

export const Warning: Story = {
  args: {
    variant: 'warning',
    title: 'Atenção',
    children: 'Este é um callout de aviso/atenção.',
  },
};

export const Success: Story = {
  args: {
    variant: 'success',
    title: 'Sucesso',
    children: 'Sua ação foi realizada com sucesso!',
  },
};

export const Error: Story = {
  args: {
    variant: 'error',
    title: 'Erro',
    children: 'Ocorreu um erro ao processar sua solicitação.',
  },
};

export const Neutral: Story = {
  args: {
    variant: 'neutral',
    title: 'Nota',
    children: 'Este é um callout neutro.',
  },
};

export const WithAction: Story = {
  args: {
    variant: 'info',
    title: 'Saiba mais',
    children: 'Clique no botão para mais informações.',
    action: <button className="underline text-[#007AAB]">Saiba mais</button>,
  },
}; 