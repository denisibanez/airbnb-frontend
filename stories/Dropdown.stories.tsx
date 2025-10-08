import type { Meta, StoryObj } from '@storybook/nextjs';
import Dropdown from '../components/ui/Dropdown';
import { IconsInterfaceFile, IconsGeneralUser, IconsInterfaceSettings } from '../components/ui/Icons';
import CCicon from '../assets/images/CCicon.png';

const meta: Meta<typeof Dropdown> = {
  title: 'Components/Dropdown',
  component: Dropdown,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
    disabled: {
      control: { type: 'boolean' },
    },
    loading: {
      control: { type: 'boolean' },
    },
    error: {
      control: { type: 'boolean' },
    },
    fullWidth: {
      control: { type: 'boolean' },
    },
    label: {
      control: { type: 'text' },
    },
    imageLeft: {
      control: { type: 'text' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const sampleOptions = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' },
  { value: 'option4', label: 'Option 4' },
];

const optionsWithIcons = [
  { value: 'profile', label: 'Profile', iconLeft: <IconsGeneralUser className="w-4 h-4" /> },
  { value: 'settings', label: 'Settings', iconLeft: <IconsInterfaceSettings className="w-4 h-4" /> },
  { value: 'file', label: 'File', iconLeft: <IconsInterfaceFile className="w-4 h-4" /> },
];

// Basic Dropdown States
export const Default: Story = {
  args: {
    options: sampleOptions,
    placeholder: 'Placeholder text',
  },
};

export const Focused: Story = {
  args: {
    options: sampleOptions,
    placeholder: 'Placeholder text',
  },
  parameters: {
    docs: {
      description: {
        story: 'Dropdown in focused state with dark border',
      },
    },
  },
};

export const Loading: Story = {
  args: {
    options: sampleOptions,
    placeholder: 'Placeholder text',
    loading: true,
  },
};

// With External Label
export const WithLabel: Story = {
  args: {
    options: sampleOptions,
    label: 'Label',
    placeholder: 'Placeholder text',
  },
};

export const WithLabelFocused: Story = {
  args: {
    options: sampleOptions,
    label: 'Label',
    placeholder: 'Placeholder text',
  },
  parameters: {
    docs: {
      description: {
        story: 'Dropdown with external label in focused state',
      },
    },
  },
};

export const WithLabelLoading: Story = {
  args: {
    options: sampleOptions,
    label: 'Label',
    placeholder: 'Placeholder text',
    loading: true,
  },
};

// With Internal Icon
export const WithIconLeft: Story = {
  args: {
    options: optionsWithIcons,
    placeholder: 'Placeholder text',
    iconLeft: <IconsInterfaceFile className="w-4 h-4" />,
  },
};

// With Internal Image
export const WithImageLeft: Story = {
  args: {
    options: sampleOptions,
    placeholder: 'Placeholder text',
    imageLeft: CCicon,
  },
};

// With Internal Image (no label when image is present)
export const WithImageLeftOnly: Story = {
  args: {
    options: sampleOptions,
    placeholder: 'Placeholder text',
    imageLeft: CCicon,
  },
};

// With Internal Image - Different States
export const WithImageLeftFocused: Story = {
  args: {
    options: sampleOptions,
    placeholder: 'Placeholder text',
    imageLeft: CCicon,
  },
  parameters: {
    docs: {
      description: {
        story: 'Dropdown with internal image in focused state',
      },
    },
  },
};

export const WithImageLeftLoading: Story = {
  args: {
    options: sampleOptions,
    placeholder: 'Placeholder text',
    imageLeft: CCicon,
    loading: true,
  },
};

// With Internal Label
export const WithInternalLabel: Story = {
  args: {
    options: sampleOptions,
    label: 'Label',
    placeholder: 'Placeholder text',
  },
};

// With Internal Label and Icon
export const WithInternalLabelAndIcon: Story = {
  args: {
    options: optionsWithIcons,
    label: 'Label',
    placeholder: 'Placeholder text',
    iconLeft: <IconsInterfaceFile className="w-4 h-4" />,
  },
};

// With Internal Label and Image
export const WithInternalLabelAndImage: Story = {
  args: {
    options: sampleOptions,
    label: 'Label',
    placeholder: 'Placeholder text',
    imageLeft: CCicon,
  },
};

export const WithIconLeftFocused: Story = {
  args: {
    options: optionsWithIcons,
    placeholder: 'Placeholder text',
    iconLeft: <IconsInterfaceFile className="w-4 h-4" />,
  },
  parameters: {
    docs: {
      description: {
        story: 'Dropdown with internal icon in focused state',
      },
    },
  },
};

export const WithIconLeftLoading: Story = {
  args: {
    options: optionsWithIcons,
    placeholder: 'Placeholder text',
    iconLeft: <IconsInterfaceFile className="w-4 h-4" />,
    loading: true,
  },
};

// Sizes
export const Small: Story = {
  args: {
    options: sampleOptions,
    placeholder: 'Placeholder text',
    size: 'sm',
  },
};

export const Medium: Story = {
  args: {
    options: sampleOptions,
    placeholder: 'Placeholder text',
    size: 'md',
  },
};

export const Large: Story = {
  args: {
    options: sampleOptions,
    placeholder: 'Placeholder text',
    size: 'lg',
  },
};

// With Label and Different Sizes
export const SmallWithLabel: Story = {
  args: {
    options: sampleOptions,
    label: 'Label',
    placeholder: 'Placeholder text',
    size: 'sm',
  },
};

export const MediumWithLabel: Story = {
  args: {
    options: sampleOptions,
    label: 'Label',
    placeholder: 'Placeholder text',
    size: 'md',
  },
};

export const LargeWithLabel: Story = {
  args: {
    options: sampleOptions,
    label: 'Label',
    placeholder: 'Placeholder text',
    size: 'lg',
  },
};

// With Icon and Different Sizes
export const SmallWithIconLeft: Story = {
  args: {
    options: optionsWithIcons,
    placeholder: 'Placeholder text',
    iconLeft: <IconsInterfaceFile className="w-4 h-4" />,
    size: 'sm',
  },
};

export const MediumWithIconLeft: Story = {
  args: {
    options: optionsWithIcons,
    placeholder: 'Placeholder text',
    iconLeft: <IconsInterfaceFile className="w-4 h-4" />,
    size: 'md',
  },
};

export const LargeWithIconLeft: Story = {
  args: {
    options: optionsWithIcons,
    placeholder: 'Placeholder text',
    iconLeft: <IconsInterfaceFile className="w-4 h-4" />,
    size: 'lg',
  },
};

// Loading States for Different Sizes
export const SmallLoading: Story = {
  args: {
    options: sampleOptions,
    placeholder: 'Placeholder text',
    size: 'sm',
    loading: true,
  },
};

export const MediumLoading: Story = {
  args: {
    options: sampleOptions,
    placeholder: 'Placeholder text',
    size: 'md',
    loading: true,
  },
};

export const LargeLoading: Story = {
  args: {
    options: sampleOptions,
    placeholder: 'Placeholder text',
    size: 'lg',
    loading: true,
  },
};

// Error States
export const Error: Story = {
  args: {
    options: sampleOptions,
    placeholder: 'Placeholder text',
    error: true,
  },
};

export const ErrorWithLabel: Story = {
  args: {
    options: sampleOptions,
    label: 'Label',
    placeholder: 'Placeholder text',
    error: true,
  },
};

// Disabled States
export const Disabled: Story = {
  args: {
    options: sampleOptions,
    placeholder: 'Placeholder text',
    disabled: true,
  },
};

export const DisabledWithLabel: Story = {
  args: {
    options: sampleOptions,
    label: 'Label',
    placeholder: 'Placeholder text',
    disabled: true,
  },
};

// Selected State
export const Selected: Story = {
  args: {
    options: sampleOptions,
    placeholder: 'Placeholder text',
    value: 'option2',
  },
};

export const SelectedWithLabel: Story = {
  args: {
    options: sampleOptions,
    label: 'Label',
    placeholder: 'Placeholder text',
    value: 'option2',
  },
};

// Full Width
export const FullWidth: Story = {
  args: {
    options: sampleOptions,
    placeholder: 'Placeholder text',
    fullWidth: true,
  },
  parameters: {
    layout: 'padded',
  },
};

export const FullWidthWithLabel: Story = {
  args: {
    options: sampleOptions,
    label: 'Label',
    placeholder: 'Placeholder text',
    fullWidth: true,
  },
  parameters: {
    layout: 'padded',
  },
};

// All States Grid
export const AllStates: Story = {
  render: () => (
    <div className="grid grid-cols-4 gap-6 p-6">
      {/* Row 1: Basic Dropdown */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-gray-700">Basic Dropdown</h3>
        <Dropdown options={sampleOptions} placeholder="Placeholder text" />
        <Dropdown options={sampleOptions} placeholder="Placeholder text" />
        <Dropdown options={sampleOptions} placeholder="Placeholder text" />
        <Dropdown options={sampleOptions} placeholder="Placeholder text" loading />
      </div>

      {/* Row 2: With Internal Label */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-gray-700">With Internal Label</h3>
        <Dropdown options={sampleOptions} label="Label" placeholder="Placeholder text" />
        <Dropdown options={sampleOptions} label="Label" placeholder="Placeholder text" />
        <Dropdown options={sampleOptions} label="Label" placeholder="Placeholder text" />
        <Dropdown options={sampleOptions} label="Label" placeholder="Placeholder text" loading />
      </div>

      {/* Row 3: With Internal Icon */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-gray-700">With Internal Icon</h3>
        <Dropdown options={optionsWithIcons} placeholder="Placeholder text" iconLeft={<IconsInterfaceFile className="w-4 h-4" />} />
        <Dropdown options={optionsWithIcons} placeholder="Placeholder text" iconLeft={<IconsInterfaceFile className="w-4 h-4" />} />
        <Dropdown options={optionsWithIcons} placeholder="Placeholder text" iconLeft={<IconsInterfaceFile className="w-4 h-4" />} />
        <Dropdown options={optionsWithIcons} placeholder="Placeholder text" iconLeft={<IconsInterfaceFile className="w-4 h-4" />} loading />
      </div>

      {/* Row 4: With Internal Image */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-gray-700">With Internal Image</h3>
        <Dropdown options={sampleOptions} placeholder="Placeholder text" imageLeft={CCicon} />
        <Dropdown options={sampleOptions} placeholder="Placeholder text" imageLeft={CCicon} />
        <Dropdown options={sampleOptions} placeholder="Placeholder text" imageLeft={CCicon} />
        <Dropdown options={sampleOptions} placeholder="Placeholder text" imageLeft={CCicon} loading />
      </div>

      {/* Row 5: Different Sizes */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-gray-700">Different Sizes</h3>
        <Dropdown options={sampleOptions} placeholder="Placeholder text" size="sm" />
        <Dropdown options={sampleOptions} placeholder="Placeholder text" size="md" />
        <Dropdown options={sampleOptions} placeholder="Placeholder text" size="lg" />
        <Dropdown options={sampleOptions} placeholder="Placeholder text" size="lg" loading />
      </div>
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
  },
};
