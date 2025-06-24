import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';


const buttonVariants = cva(
  // Base styles
  "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        primary: "bg-primary-01 text-shade-01 hover:bg-primary-02 focus:ring-primary-01",
        secondary: "bg-neutral-01 text-shade-02 border border-neutral-03 hover:bg-neutral-02 focus:ring-neutral-07",
        outline: "bg-transparent text-shade-02 border border-neutral-03 hover:bg-neutral-01 focus:ring-neutral-07",
        ghost: "bg-transparent text-shade-02 hover:bg-neutral-01 focus:ring-neutral-07",
        gradient: "bg-gradient-01 text-shade-01 hover:bg-gradient-02 focus:ring-primary-01",
        error: "bg-error-02 text-shade-01 hover:opacity-90 focus:ring-error-02",
        link: "bg-link text-shade-01 hover:opacity-90 focus:ring-link",
        tertiary: "bg-transparent text-shade-02 border border-neutral-03 hover:bg-neutral-01 focus:ring-neutral-07",
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
          <span className="mr-2 flex items-center">
            
          </span>
        ) : (
          iconLeft && <span className="mr-2 flex items-center">{iconLeft}</span>
        )}
        {children}
        {iconRight && <span className="ml-2 flex items-center">{iconRight}</span>}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants }; 