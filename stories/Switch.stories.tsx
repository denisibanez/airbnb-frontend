import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import Switch from '../components/ui/Switch';

const meta: Meta<typeof Switch> = {
  title: 'Components/Switch',
  component: Switch,
  tags: ['autodocs'],
  argTypes: {
    checked: { control: 'boolean' },
    disabled: { control: 'boolean' },
    error: { control: 'boolean' },
    label: { control: 'text' },
    description: { control: 'text' },
    className: { control: 'text' },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    variant: { control: 'select', options: ['default', 'outlined', 'filled'] },
    onChange: { action: 'changed' },
  },
  args: {
    checked: false,
    disabled: false,
    error: false,
    label: 'Display total before taxes',
    description: '',
    className: '',
    size: 'md',
    variant: 'default',
  },
};
export default meta;

type Story = StoryObj<typeof Switch>;

export const Playground: Story = {
  args: {},
};

export const Toggle: Story = {
  render: () => {
    const [v1, setV1] = useState(false);
    const [v2, setV2] = useState(true);
    const [v3, setV3] = useState(false);
    const [v4, setV4] = useState(true);
    const [v5, setV5] = useState(false);
    const [v6, setV6] = useState(true);
    return (
      <div className="flex flex-col gap-4 p-4 border-2 border-dashed border-violet-300 rounded-xl w-fit">
        <Switch checked={v1} onChange={e => setV1(e.target.checked)} />
        <Switch checked={v2} onChange={e => setV2(e.target.checked)} />
        <Switch checked={v3} onChange={e => setV3(e.target.checked)} variant="outlined" />
        <Switch checked={v4} onChange={e => setV4(e.target.checked)} variant="outlined" />
        <Switch checked={v5} onChange={e => setV5(e.target.checked)} variant="filled" />
        <Switch checked={v6} onChange={e => setV6(e.target.checked)} variant="filled" />
      </div>
    );
  },
};

export const WithLabels: Story = {
  render: () => {
    const [toggles, setToggles] = useState([false, true, false, true, false, true, false, true]);
    const update = (i: number, v: boolean) => setToggles(toggles => toggles.map((t, idx) => idx === i ? v : t));
    return (
      <div className="p-4 border-2 border-dashed border-violet-300 rounded-xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Switch checked={toggles[0]} onChange={e => update(0, e.target.checked)} label="Translation" description="Automatically translate descriptions and reviews to English" />
          <Switch checked={toggles[1]} onChange={e => update(1, e.target.checked)} label="Translation" description="Automatically translate descriptions and reviews to English" />
          <Switch checked={toggles[2]} onChange={e => update(2, e.target.checked)} variant="outlined" label="Translation" description="Automatically translate descriptions and reviews to English" />
          <Switch checked={toggles[3]} onChange={e => update(3, e.target.checked)} variant="outlined" label="Translation" description="Automatically translate descriptions and reviews to English" />
          <Switch checked={toggles[4]} onChange={e => update(4, e.target.checked)} variant="filled" label="Translation" description="Automatically translate descriptions and reviews to English" />
          <Switch checked={toggles[5]} onChange={e => update(5, e.target.checked)} variant="filled" label="Translation" description="Automatically translate descriptions and reviews to English" />
          <Switch checked={toggles[6]} onChange={e => update(6, e.target.checked)} variant="outlined" size="lg" label="Translation" description="Automatically translate descriptions and reviews to English" />
          <Switch checked={toggles[7]} onChange={e => update(7, e.target.checked)} variant="filled" size="lg" label="Translation" description="Automatically translate descriptions and reviews to English" />
        </div>
      </div>
    );
  },
};

export const Sizes: Story = {
  render: () => {
    const [s1, setS1] = useState(false);
    const [s2, setS2] = useState(true);
    const [s3, setS3] = useState(false);
    return (
      <div className="flex gap-6 items-center p-4">
        <Switch checked={s1} onChange={e => setS1(e.target.checked)} size="sm" />
        <Switch checked={s2} onChange={e => setS2(e.target.checked)} size="md" />
        <Switch checked={s3} onChange={e => setS3(e.target.checked)} size="lg" />
      </div>
    );
  },
};

export const Disabled: Story = {
  render: () => (
    <div className="flex flex-col gap-4 p-4">
      <Switch checked={false} disabled label="Translation" />
      <Switch checked disabled label="Translation" />
      <Switch checked={false} disabled variant="outlined" label="Translation" />
      <Switch checked disabled variant="outlined" label="Translation" />
      <Switch checked={false} disabled variant="filled" label="Translation" />
      <Switch checked disabled variant="filled" label="Translation" />
    </div>
  ),
}; 