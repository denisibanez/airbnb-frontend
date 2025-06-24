import React from 'react';

export const LoadingDots = () => (
  <span className="inline-flex gap-0.5">
    <span className="w-1.5 h-1.5 bg-current rounded-full animate-bounce [animation-delay:-.3s]"></span>
    <span className="w-1.5 h-1.5 bg-current rounded-full animate-bounce [animation-delay:-.15s]"></span>
    <span className="w-1.5 h-1.5 bg-current rounded-full animate-bounce"></span>
  </span>
); 