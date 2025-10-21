import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs';
import SearchBar from '../components/ui/SearchBar';

const meta: Meta<typeof SearchBar> = {
  title: 'Components/SearchBar',
  component: SearchBar,
  tags: ['autodocs'],
  argTypes: {
    where: { control: 'text' },
    checkIn: { control: 'text' },
    checkOut: { control: 'text' },
    guests: { control: 'text' },
    mode: { control: 'select', options: ['accommodation', 'experiences'] },
    showServiceSelector: { control: 'boolean' },
    initialLocation: { control: 'text' },
    initialDates: { control: 'object' },
    initialGuestCounts: { control: 'object' },
    initialServices: { control: 'text' },
    loading: { control: 'boolean' },
    className: { control: 'text' },
    onWhereClick: { action: 'whereClick' },
    onCheckInClick: { action: 'checkInClick' },
    onCheckOutClick: { action: 'checkOutClick' },
    onGuestsClick: { action: 'guestsClick' },
    onSearch: { action: 'search' },
    onDateChange: { action: 'dateChange' },
    onLocationSelect: { action: 'locationSelect' },
  },
  args: {
    where: 'Search destinations',
    checkIn: 'Add dates',
    checkOut: 'Add dates',
    guests: 'Add guests',
    mode: 'accommodation',
    loading: false,
    className: '',
  },
};
export default meta;

type Story = StoryObj<typeof SearchBar>;

export const Playground: Story = {
  args: {},
};

export const OnlyWhere: Story = {
  args: {
    where: 'Paris',
    checkIn: 'Add dates',
    checkOut: 'Add dates',
    guests: '',
  },
};

export const WithDates: Story = {
  args: {
    where: 'Tokyo',
    checkIn: 'Jul 10',
    checkOut: 'Jul 20',
    guests: '',
  },
};

export const AllFilled: Story = {
  args: {
    where: 'Paris',
    checkIn: 'Jul 10',
    checkOut: 'Jul 20',
    guests: '2 guests',
    initialLocation: 'Paris, France',
    initialDates: [new Date(2024, 6, 10), new Date(2024, 6, 20)],
    initialGuestCounts: { adults: 2, children: 0, infants: 0, pets: 0 },
  },
};

export const WithDatePicker: Story = {
  render: () => {
    const [dates, setDates] = React.useState<[Date | null, Date | null]>([null, null]);
    
    return (
      <div className="min-h-screen bg-gray-50 p-20">
        <div className="flex justify-center">
          <SearchBar 
            where="Search destinations"
            checkIn="Add dates"
            checkOut="Add dates"
            guests="Add guests"
            onDateChange={(newDates) => {
              setDates(newDates);
              console.log('Selected dates:', newDates);
            }}
            onSearch={() => {
              console.log('Search with dates:', dates);
            }}
          />
        </div>
        {dates[0] && dates[1] && (
          <div className="mt-8 text-center">
            <p className="text-lg font-semibold text-gray-700">
              Selected dates: {dates[0].toLocaleDateString('en-US')} - {dates[1].toLocaleDateString('en-US')}
            </p>
            <p className="text-sm text-gray-500 mt-2">
              ({Math.round((dates[1].getTime() - dates[0].getTime()) / (1000 * 60 * 60 * 24))} nights)
            </p>
          </div>
        )}
      </div>
    );
  },
};

export const ExperiencesMode: Story = {
  render: () => {
    const [experienceDate, setExperienceDate] = React.useState<Date | null>(null);
    
    return (
      <div className="min-h-screen bg-gray-50 p-20">
        <div className="flex justify-center">
          <SearchBar 
            mode="experiences"
            where="Search destinations"
            onDateChange={(newDates) => {
              console.log('Selected dates:', newDates);
            }}
            onSearch={() => {
              console.log('Search experiences!');
            }}
            onWhereClick={() => console.log('Clicked Where')}
            onCheckInClick={() => console.log('Clicked Check-in')}
            onCheckOutClick={() => console.log('Clicked Check-out')}
            onGuestsClick={() => console.log('Clicked Who')}
          />
        </div>
        <div className="mt-8 text-center">
          <p className="text-gray-600">
            <strong>Experiences Mode:</strong> Single "Add dates" field with ExperienceDatePicker
          </p>
          <ul className="text-sm text-gray-500 mt-4 space-y-1">
            <li>• <strong>Where</strong>: Search destinations</li>
            <li>• <strong>Dates</strong>: Single field that opens ExperienceDatePicker with quick options</li>
            <li>• <strong>Who</strong>: Opens ServiceSelector (Photography, Chefs, Massage, etc.)</li>
            <li>• <strong>Services</strong>: Photography, Chefs, Massage, etc.</li>
          </ul>
        </div>
      </div>
    );
  },
};

export const AccommodationMode: Story = {
  render: () => {
    
    return (
      <div className="min-h-screen bg-gray-50 p-20">
        <div className="flex justify-center">
          <SearchBar 
            mode="accommodation"
            where="Search destinations"
            onDateChange={(newDates) => {
              console.log('Selected dates:', newDates);
            }}
            onSearch={() => {
              console.log('Search accommodations!');
            }}
            onWhereClick={() => console.log('Clicked Where')}
            onCheckInClick={() => console.log('Clicked Check-in')}
            onCheckOutClick={() => console.log('Clicked Check-out')}
            onGuestsClick={() => console.log('Clicked Who')}
          />
        </div>
        <div className="mt-8 text-center">
          <p className="text-gray-600">
            <strong>Accommodation Mode:</strong> Adults, Children, Infants and Pets
          </p>
          <ul className="text-sm text-gray-500 mt-4 space-y-1">
            <li>• <strong>Where</strong>: Search destinations</li>
            <li>• <strong>Check-in/Check-out</strong>: Opens DatePicker</li>
            <li>• <strong>Who</strong>: Opens full GuestSelector (Adults/Children/Infants/Pets)</li>
            <li>• <strong>No services</strong>: Focus on accommodation</li>
          </ul>
        </div>
      </div>
    );
  },
};

export const LoadingState: Story = {
  args: {
    loading: true,
  },
  render: (args) => (
    <div className="min-h-screen bg-gray-50 p-20">
      <div className="flex justify-center">
        <SearchBar {...args} />
      </div>
      <div className="mt-8 text-center">
        <p className="text-lg font-semibold text-gray-700">
          Loading State
        </p>
        <p className="text-sm text-gray-500 mt-2">
          Skeleton loading animation while data is being fetched
        </p>
      </div>
    </div>
  ),
};

export const WithInitialValues: Story = {
  args: {
    mode: 'accommodation',
    initialLocation: 'Tokyo, Japan',
    initialDates: [new Date(2024, 11, 25), new Date(2025, 0, 5)],
    initialGuestCounts: { adults: 2, children: 1, infants: 0, pets: 1 },
    initialServices: 'photography',
  },
  render: (args) => (
    <div className="min-h-screen bg-gray-50 p-20">
      <div className="flex justify-center">
        <SearchBar {...args} />
      </div>
      <div className="mt-8 text-center">
        <p className="text-lg font-semibold text-gray-700">
          Pre-filled SearchBar
        </p>
        <ul className="text-sm text-gray-500 mt-4 space-y-1">
          <li>• <strong>Location</strong>: Tokyo, Japan</li>
          <li>• <strong>Dates</strong>: Dec 25, 2024 - Jan 5, 2025</li>
            <li>• <strong>Guests</strong>: 2 adults, 1 child, 1 pet</li>
            <li>• <strong>Service</strong>: Serviços de fotografia</li>
        </ul>
      </div>
    </div>
  ),
};

export const ExperienceDatePickerDemo: Story = {
  render: () => {
    const [selectedDate, setSelectedDate] = React.useState<Date | null>(null);
    
    return (
      <div className="min-h-screen bg-gray-50 p-20">
        <div className="flex justify-center">
          <SearchBar 
            mode="experiences"
            where="Search destinations"
            onSearch={() => {
              console.log('Search experiences with date:', selectedDate);
            }}
          />
        </div>
        {selectedDate && (
          <div className="mt-8 text-center">
            <p className="text-lg font-semibold text-gray-700">
              Selected experience date: {selectedDate.toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>
        )}
        <div className="mt-8 text-center">
          <p className="text-gray-600">
            <strong>ExperienceDatePicker Features:</strong>
          </p>
          <ul className="text-sm text-gray-500 mt-4 space-y-1">
            <li>• <strong>Quick Options</strong>: Today, Tomorrow, This weekend</li>
            <li>• <strong>Calendar View</strong>: Single month with navigation</li>
            <li>• <strong>Visual Design</strong>: Matches the reference image exactly</li>
            <li>• <strong>Single Date Selection</strong>: Perfect for experiences</li>
            <li>• <strong>Months Selector</strong>: Circular range selector for duration</li>
          </ul>
        </div>
      </div>
    );
  },
};

export const MonthsSelectorDemo: Story = {
  args: {
    mode: 'experiences',
    showServiceSelector: false,
  },
  render: (args) => {
    const [showMonths, setShowMonths] = React.useState(false);
    
    return (
      <div className="p-8">
        <div className="mb-4">
          <button
            onClick={() => setShowMonths(!showMonths)}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Toggle Months Selector: {showMonths ? 'ON' : 'OFF'}
          </button>
        </div>
        <SearchBar {...args} />
        <div className="mt-8 text-center">
          <p className="text-gray-600">
            <strong>MonthsRangeSelector Features:</strong>
          </p>
          <ul className="text-sm text-gray-500 mt-4 space-y-1">
            <li>• <strong>Circular Slider</strong>: Interactive range selection (1-12 months)</li>
            <li>• <strong>Tab Navigation</strong>: Datas, Meses, Flexível</li>
            <li>• <strong>Visual Feedback</strong>: Pink arc shows selected range</li>
            <li>• <strong>Date Calculation</strong>: Automatically calculates date ranges</li>
            <li>• <strong>Responsive Design</strong>: Works on all screen sizes</li>
          </ul>
        </div>
      </div>
    );
  },
}; 
