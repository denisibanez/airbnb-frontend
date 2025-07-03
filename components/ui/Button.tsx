import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';
import { LoadingDots } from './LoadingDots';

const buttonVariants = cva(
  // Base styles
  "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none cursor-pointer disabled:cursor-not-allowed",
  {
    variants: {
      variant: {
        primary:
          "text-white focus:ring-primary-01 " +
          "bg-gradient-to-r from-primary-01 to-primary-02 " +
          "hover:from-primary-02 hover:to-primary-03 transition-colors duration-300",
        secondary: "bg-black text-white hover:bg-neutral-900 focus:ring-neutral-900",
        tertiary: "bg-white border border-neutral-300 text-black hover:bg-neutral-100 focus:ring-neutral-400",
        outline: "bg-transparent border border-neutral-300 text-black hover:bg-neutral-100 focus:ring-neutral-400",
        ghost: "bg-transparent text-black hover:bg-neutral-100 focus:ring-neutral-400",
        link: "bg-transparent text-link underline hover:opacity-80 focus:ring-link",
        error: "bg-error-02 text-white hover:opacity-90 focus:ring-error-02",
      },
      size: {
        sm: "h-8 px-3 text-sm",
        md: "h-10 px-4 text-base",
        lg: "h-12 px-6 text-lg",
        xl: "h-14 px-8 text-xl",
      },
      fullWidth: {
        true: "w-full",
        false: "",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
      fullWidth: false,
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, fullWidth, loading, iconLeft, iconRight, children, disabled, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, fullWidth, className }))}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <LoadingDots />
        ) : (
          iconLeft && <span className="mr-2 flex items-center">{iconLeft}</span>
        )}
        {children}
        {iconRight && !loading && <span className="ml-2 flex items-center">{iconRight}</span>}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants }; 