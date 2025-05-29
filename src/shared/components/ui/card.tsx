import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/shared/lib/utils";

const cardVariants = cva("rounded-lg border bg-card text-card-foreground", {
  variants: {
    variant: {
      default: "shadow-sm",
      elevated: "shadow-md",
      outline: "shadow-none",
      ghost: "border-none shadow-none bg-transparent",
    },
    size: {
      default: "p-6",
      sm: "p-4",
      lg: "p-8",
      compact: "p-3",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

export type CardProps = React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof cardVariants>;

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, size, ...props }, ref) => (
    <div
      data-component="Card"
      ref={ref}
      className={cn(cardVariants({ variant, size, className }))}
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
      compact: "p-3",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

export type CardHeaderProps = React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof cardHeaderVariants>;

const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, size, ...props }, ref) => (
    <div
      data-component="CardHeader"
      ref={ref}
      className={cn(cardHeaderVariants({ size, className }))}
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
      "text-lg font-semibold leading-none tracking-tight",
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
      compact: "p-3 pt-0",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

export type CardContentProps = React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof cardContentVariants>;

const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, size, ...props }, ref) => (
    <div
      data-component="CardContent"
      ref={ref}
      className={cn(cardContentVariants({ size, className }))}
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
      compact: "p-3 pt-0",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

export type CardFooterProps = React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof cardFooterVariants>;

const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, size, ...props }, ref) => (
    <div
      data-component="CardFooter"
      ref={ref}
      className={cn(cardFooterVariants({ size, className }))}
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
