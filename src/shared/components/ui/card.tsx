import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/shared/lib/utils";

const cardVariants = cva("rounded-lg border bg-card text-card-foreground", {
  variants: {
    variant: {
      default: "shadow-sm",
      primary: "bg-primary/5 border-primary/20",
      secondary: "bg-secondary border-secondary/20",
      accent: "bg-accent/5 border-accent/20",
      destructive: "bg-destructive/5 border-destructive/20",
      success: "bg-success/5 border-success/20",
      warning: "bg-warning/5 border-warning/20",
      info: "bg-info/5 border-info/20",
      outline: "border-border shadow-none",
      ghost: "border-none shadow-none bg-transparent",
    },
    size: {
      default: "p-6",
      sm: "p-4",
      lg: "p-8",
      xl: "p-10",
      compact: "p-3",
    },
    radius: {
      default: "rounded-[var(--radius-lg)]",
      sm: "rounded-[var(--radius-md)]",
      lg: "rounded-[var(--radius-xl)]",
      xl: "rounded-[var(--radius-2xl)]",
      none: "rounded-none",
    },
    elevation: {
      none: "shadow-none",
      sm: "shadow-sm",
      md: "shadow-md",
      lg: "shadow-lg",
      xl: "shadow-xl",
    },
    animation: {
      default: "transition-all duration-[var(--transition-normal)]",
      fast: "transition-all duration-[var(--transition-fast)]",
      slow: "transition-all duration-[var(--transition-slow)]",
      none: "",
      hover: "transition-all hover:translate-y-[-4px] hover:shadow-md",
      scale: "transition-all hover:scale-[1.02]",
    },
    interactive: {
      true: "cursor-pointer hover:shadow-md active:shadow-sm active:translate-y-[1px]",
      false: "",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
    radius: "default",
    elevation: "sm",
    animation: "default",
    interactive: false,
  },
});

export type CardProps = React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof cardVariants>;

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      className,
      variant,
      size,
      radius,
      elevation,
      animation,
      interactive,
      ...props
    },
    ref,
  ) => (
    <div
      data-component="Card"
      ref={ref}
      className={cn(
        cardVariants({
          variant,
          size,
          radius,
          elevation,
          animation,
          interactive,
          className,
        }),
      )}
      {...props}
    />
  ),
);
Card.displayName = "Card";

const cardHeaderVariants = cva("flex flex-col space-y-1.5", {
  variants: {
    size: {
      default: "p-6",
      sm: "p-4",
      lg: "p-8",
      xl: "p-10",
      compact: "p-3",
    },
    align: {
      default: "items-start",
      center: "items-center",
      end: "items-end",
    },
    spacing: {
      default: "space-y-1.5",
      tight: "space-y-1",
      loose: "space-y-2.5",
    },
  },
  defaultVariants: {
    size: "default",
    align: "default",
    spacing: "default",
  },
});

export type CardHeaderProps = React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof cardHeaderVariants>;

const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, size, align, spacing, ...props }, ref) => (
    <div
      data-component="CardHeader"
      ref={ref}
      className={cn(cardHeaderVariants({ size, align, spacing, className }))}
      {...props}
    />
  ),
);
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    data-component="CardTitle"
    ref={ref}
    className={cn(
      "text-xl font-semibold leading-none tracking-tight",
      className,
    )}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    data-component="CardDescription"
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

const cardContentVariants = cva("", {
  variants: {
    size: {
      default: "p-6 pt-0",
      sm: "p-4 pt-0",
      lg: "p-8 pt-0",
      xl: "p-10 pt-0",
      compact: "p-3 pt-0",
    },
    spacing: {
      default: "space-y-4",
      tight: "space-y-2",
      loose: "space-y-6",
      none: "space-y-0",
    },
  },
  defaultVariants: {
    size: "default",
    spacing: "default",
  },
});

export type CardContentProps = React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof cardContentVariants>;

const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, size, spacing, ...props }, ref) => (
    <div
      data-component="CardContent"
      ref={ref}
      className={cn(cardContentVariants({ size, spacing, className }))}
      {...props}
    />
  ),
);
CardContent.displayName = "CardContent";

const cardFooterVariants = cva("flex items-center", {
  variants: {
    size: {
      default: "p-6 pt-0",
      sm: "p-4 pt-0",
      lg: "p-8 pt-0",
      xl: "p-10 pt-0",
      compact: "p-3 pt-0",
    },
    justify: {
      default: "justify-start",
      center: "justify-center",
      end: "justify-end",
      between: "justify-between",
      around: "justify-around",
      evenly: "justify-evenly",
    },
    spacing: {
      default: "gap-4",
      tight: "gap-2",
      loose: "gap-6",
      none: "gap-0",
    },
  },
  defaultVariants: {
    size: "default",
    justify: "default",
    spacing: "default",
  },
});

export type CardFooterProps = React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof cardFooterVariants>;

const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, size, justify, spacing, ...props }, ref) => (
    <div
      data-component="CardFooter"
      ref={ref}
      className={cn(cardFooterVariants({ size, justify, spacing, className }))}
      {...props}
    />
  ),
);
CardFooter.displayName = "CardFooter";

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
  cardVariants,
  cardHeaderVariants,
  cardContentVariants,
  cardFooterVariants,
};
