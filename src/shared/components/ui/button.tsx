import * as React from "react";

import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/shared/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap text-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow hover:bg-primary-highlight active:bg-primary-muted",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90 active:bg-destructive-muted",
        outline:
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground active:bg-accent/90",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary-highlight active:bg-secondary-muted",
        ghost:
          "hover:bg-accent hover:text-accent-foreground active:bg-accent/90",
        link: "text-primary underline-offset-4 hover:underline hover:text-primary-highlight active:text-primary-muted",
        success:
          "bg-success text-success-foreground shadow-sm hover:bg-success/90 active:bg-success-muted",
        warning:
          "bg-warning text-warning-foreground shadow-sm hover:bg-warning/90 active:bg-warning-muted",
        info: "bg-info text-info-foreground shadow-sm hover:bg-info/90 active:bg-info-muted",
        subtle:
          "bg-muted text-muted-foreground hover:bg-muted/80 active:bg-muted/70",
        category:
          "border border-transparent hover:border-current active:opacity-90",
      },
      size: {
        default: "h-9 px-4 py-2",
        xs: "h-7 rounded-[var(--radius-sm)] px-2.5 text-xs",
        sm: "h-8 rounded-[var(--radius-md)] px-3 text-xs",
        md: "h-9 rounded-[var(--radius-md)] px-4 py-2",
        lg: "h-10 rounded-[var(--radius-lg)] px-6 text-sm",
        xl: "h-12 rounded-[var(--radius-lg)] px-8 text-base",
        "2xl": "h-14 rounded-[var(--radius-xl)] px-10 text-lg",
        icon: "h-9 w-9",
        "icon-xs": "h-6 w-6",
        "icon-sm": "h-7 w-7",
        "icon-md": "h-9 w-9",
        "icon-lg": "h-11 w-11",
        "icon-xl": "h-14 w-14",
      },
      shape: {
        default: "rounded-[var(--radius-md)]",
        rounded: "rounded-full",
        square: "rounded-none",
        pill: "rounded-[var(--radius-full)]",
        soft: "rounded-[var(--radius-lg)]",
      },
      weight: {
        default: "font-medium",
        light: "font-normal",
        medium: "font-medium",
        semibold: "font-semibold",
        bold: "font-bold",
      },
      animation: {
        default: "transition-all duration-[var(--transition-normal)]",
        fast: "transition-all duration-[var(--transition-fast)]",
        slow: "transition-all duration-[var(--transition-slow)]",
        none: "",
        bounce: "transition-all hover:animate-bounce",
        pulse: "transition-all hover:animate-pulse",
      },
      elevation: {
        none: "",
        sm: "shadow-sm",
        md: "shadow-md",
        lg: "shadow-lg",
        xl: "shadow-xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      shape: "default",
      weight: "default",
      animation: "default",
      elevation: "none",
    },
  },
);

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  };

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      shape,
      weight,
      animation,
      elevation,
      asChild = false,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        data-component="Button"
        className={cn(
          buttonVariants({
            variant,
            size,
            shape,
            weight,
            animation,
            elevation,
            className,
          }),
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
