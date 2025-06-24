import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const inputVariants = cva(
  "flex w-full rounded-lg border bg-shade-01 px-3 py-2 text-sm ring-offset-shade-01 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-06 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-01 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "border-neutral-03",
        error: "border-error-02 focus-visible:ring-error-02",
        success: "border-discount focus-visible:ring-discount",
      },
      inputSize: {
        sm: "h-8 px-2 text-xs",
        md: "h-10 px-3 text-sm",
        lg: "h-12 px-4 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      inputSize: "md",
    },
  }
);

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof inputVariants> {
  error?: boolean;
  success?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, inputSize, error, success, ...props }, ref) => {
    // Determine variant based on error/success props
    let finalVariant = variant;
    if (error) finalVariant = "error";
    if (success) finalVariant = "success";

    return (
      <input
        className={cn(inputVariants({ variant: finalVariant, inputSize, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export { Input, inputVariants }; 