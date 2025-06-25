import React from 'react';

export default {
  title: 'Design System/Typography',
  parameters: {
    layout: 'centered',
  },
};

export const TypographyShowcase = () => (
  <div className="space-y-8 max-w-2xl mx-auto p-8">
    <div>
      <h1 className="text-5xl font-bold font-airbnb mb-2">Heading 1 / Display</h1>
      <p className="text-neutral-500">text-5xl font-bold font-airbnb</p>
    </div>
    <div>
      <h2 className="text-4xl font-semibold font-airbnb mb-2">Heading 2</h2>
      <p className="text-neutral-500">text-4xl font-semibold font-airbnb</p>
    </div>
    <div>
      <h3 className="text-3xl font-semibold font-airbnb mb-2">Heading 3</h3>
      <p className="text-neutral-500">text-3xl font-semibold font-airbnb</p>
    </div>
    <div>
      <h4 className="text-2xl font-medium font-airbnb mb-2">Heading 4</h4>
      <p className="text-neutral-500">text-2xl font-medium font-airbnb</p>
    </div>
    <div>
      <h5 className="text-xl font-medium font-airbnb mb-2">Heading 5</h5>
      <p className="text-neutral-500">text-xl font-medium font-airbnb</p>
    </div>
    <div>
      <h6 className="text-lg font-medium font-airbnb mb-2">Heading 6</h6>
      <p className="text-neutral-500">text-lg font-medium font-airbnb</p>
    </div>
    <div>
      <p className="text-base font-normal font-airbnb mb-2">Body / Regular</p>
      <p className="text-neutral-500">text-base font-normal font-airbnb</p>
    </div>
    <div>
      <p className="text-sm font-normal font-airbnb mb-2">Small / Caption</p>
      <p className="text-neutral-500">text-sm font-normal font-airbnb</p>
    </div>
    <div>
      <p className="text-xs font-normal font-airbnb mb-2">Extra Small / Overline</p>
      <p className="text-neutral-500">text-xs font-normal font-airbnb</p>
    </div>
    <div>
      <p className="italic text-base font-airbnb mb-2">Italic Example</p>
      <p className="text-neutral-500">italic text-base font-airbnb</p>
    </div>
    <div>
      <p className="font-bold text-base font-airbnb mb-2">Bold Example</p>
      <p className="text-neutral-500">font-bold text-base font-airbnb</p>
    </div>
  </div>
); 