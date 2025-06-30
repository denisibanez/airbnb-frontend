import type { Meta, StoryObj } from '@storybook/react';
import TextField from '../components/ui/TextField';
import { IconsOutlineAirbnb } from '../components/ui/Icons';

const meta: Meta<typeof TextField> = {
  title: 'Components/TextField',
  component: TextField,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof TextField>;

export const Default: Story = {
  args: {
    label: 'Label',
    placeholder: 'Placeholder text',
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">TextField Sizes</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <h4 className="text-sm font-medium text-gray-600 mb-2">Small (sm)</h4>
            <TextField
              label="Small Input"
              placeholder="Small size"
              size="sm"
            />
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-600 mb-2">Medium (md)</h4>
            <TextField
              label="Medium Input"
              placeholder="Medium size"
              size="md"
            />
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-600 mb-2">Large (lg)</h4>
            <TextField
              label="Large Input"
              placeholder="Large size"
              size="lg"
            />
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-600 mb-2">Extra Large (xl)</h4>
            <TextField
              label="Extra Large Input"
              placeholder="Extra large size"
              size="xl"
            />
          </div>
        </div>
      </div>
    </div>
  ),
};

export const SizesWithContent: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">TextField Sizes with Content</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <h4 className="text-sm font-medium text-gray-600 mb-2">Small (sm)</h4>
            <TextField
              label="Email"
              placeholder="Enter your email"
              size="sm"
              value="user@example.com"
              iconRight={<IconsOutlineAirbnb className="w-4 h-4" />}
            />
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-600 mb-2">Medium (md)</h4>
            <TextField
              label="Full Name"
              placeholder="Enter your full name"
              size="md"
              value="John Doe"
              helperText="As it appears on your ID"
            />
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-600 mb-2">Large (lg)</h4>
            <TextField
              label="Phone Number"
              placeholder="Enter your phone number"
              size="lg"
              value="+1 (555) 123-4567"
              type="tel"
            />
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-600 mb-2">Extra Large (xl)</h4>
            <TextField
              label="Address"
              placeholder="Enter your full address"
              size="xl"
              value="123 Main Street, Apt 4B"
              helperText="Include apartment number if applicable"
            />
          </div>
        </div>
      </div>
    </div>
  ),
};

export const WithHelper: Story = {
  args: {
    label: 'Label',
    placeholder: 'Placeholder text',
    helperText: 'Optional helper text',
  },
};

export const Error: Story = {
  args: {
    label: 'Label',
    placeholder: 'Placeholder text',
    errorMessage: 'Error message',
  },
};

export const ErrorWithHelper: Story = {
  args: {
    label: 'Label',
    placeholder: 'Placeholder text',
    errorMessage: 'Error message',
    helperText: 'Optional helper text',
  },
};

export const Filled: Story = {
  args: {
    label: 'Label',
    placeholder: 'Placeholder text',
    value: 'Filling the input with real text',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Label',
    placeholder: 'Placeholder text',
    helperText: 'Optional helper text',
    value: '',
    disabled: true,
  },
};

export const WithIconRight: Story = {
  args: {
    label: 'Label',
    placeholder: 'Placeholder text',
    iconRight: <IconsOutlineAirbnb className="w-5 h-5" />,
  },
};

export const AllSizes: Story = {
  render: () => (
    <div className="space-y-8 p-6">
      <div>
        <h2 className="text-2xl font-bold mb-6">TextField - All Sizes</h2>
        <p className="text-gray-600 mb-8">
          Demonstração de todos os 4 tamanhos disponíveis para o TextField: Small (sm), Medium (md), Large (lg) e Extra Large (xl).
        </p>
      </div>

      {/* Tamanhos vazios */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Empty States</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-gray-700">Small (sm) - 40px</h4>
            <TextField
              label="Email"
              placeholder="Enter your email"
              size="sm"
            />
          </div>
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-gray-700">Medium (md) - 48px</h4>
            <TextField
              label="Full Name"
              placeholder="Enter your full name"
              size="md"
            />
          </div>
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-gray-700">Large (lg) - 56px</h4>
            <TextField
              label="Phone Number"
              placeholder="Enter your phone"
              size="lg"
            />
          </div>
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-gray-700">Extra Large (xl) - 64px</h4>
            <TextField
              label="Address"
              placeholder="Enter your address"
              size="xl"
            />
          </div>
        </div>
      </div>

      {/* Tamanhos com conteúdo */}
      <div>
        <h3 className="text-lg font-semibold mb-4">With Content</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-gray-700">Small (sm)</h4>
            <TextField
              label="Username"
              placeholder="Enter username"
              size="sm"
              value="john_doe"
              iconRight={<IconsOutlineAirbnb className="w-4 h-4" />}
            />
          </div>
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-gray-700">Medium (md)</h4>
            <TextField
              label="Email Address"
              placeholder="Enter your email"
              size="md"
              value="john.doe@example.com"
              helperText="We'll never share your email"
            />
          </div>
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-gray-700">Large (lg)</h4>
            <TextField
              label="Phone Number"
              placeholder="Enter phone number"
              size="lg"
              value="+1 (555) 123-4567"
              type="tel"
            />
          </div>
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-gray-700">Extra Large (xl)</h4>
            <TextField
              label="Full Address"
              placeholder="Enter your complete address"
              size="xl"
              value="123 Main Street, Apt 4B, New York, NY 10001"
              helperText="Include apartment number if applicable"
            />
          </div>
        </div>
      </div>

      {/* Tamanhos com erro */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Error States</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-gray-700">Small (sm)</h4>
            <TextField
              label="Email"
              placeholder="Enter your email"
              size="sm"
              value="invalid-email"
              errorMessage="Please enter a valid email"
            />
          </div>
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-gray-700">Medium (md)</h4>
            <TextField
              label="Password"
              placeholder="Enter your password"
              size="md"
              type="password"
              value="123"
              errorMessage="Password must be at least 8 characters"
            />
          </div>
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-gray-700">Large (lg)</h4>
            <TextField
              label="Phone Number"
              placeholder="Enter phone number"
              size="lg"
              value="123"
              errorMessage="Please enter a valid phone number"
            />
          </div>
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-gray-700">Extra Large (xl)</h4>
            <TextField
              label="Address"
              placeholder="Enter your address"
              size="xl"
              value=""
              errorMessage="Address is required"
            />
          </div>
        </div>
      </div>

      {/* Tamanhos desabilitados */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Disabled States</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-gray-700">Small (sm)</h4>
            <TextField
              label="Username"
              placeholder="Enter username"
              size="sm"
              value="john_doe"
              disabled
            />
          </div>
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-gray-700">Medium (md)</h4>
            <TextField
              label="Email"
              placeholder="Enter your email"
              size="md"
              value="john.doe@example.com"
              disabled
              helperText="This field is disabled"
            />
          </div>
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-gray-700">Large (lg)</h4>
            <TextField
              label="Phone Number"
              placeholder="Enter phone number"
              size="lg"
              value="+1 (555) 123-4567"
              disabled
            />
          </div>
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-gray-700">Extra Large (xl)</h4>
            <TextField
              label="Address"
              placeholder="Enter your address"
              size="xl"
              value="123 Main Street"
              disabled
              helperText="This field is disabled"
            />
          </div>
        </div>
      </div>
    </div>
  ),
}; 