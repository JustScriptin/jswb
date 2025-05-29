import * as React from "react";

import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/shared/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center border transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "bg-primary hover:bg-primary/80 border-transparent text-primary-foreground",
        secondary:
          "bg-secondary hover:bg-secondary/80 border-transparent text-secondary-foreground",
        destructive:
          "bg-destructive hover:bg-destructive/80 border-transparent text-destructive-foreground",
        outline: "text-foreground",
        success:
          "bg-success hover:bg-success/80 border-transparent text-success-foreground",
        warning:
          "bg-warning hover:bg-warning/80 border-transparent text-warning-foreground",
      },
      size: {
        default: "px-2.5 py-0.5 text-xs",
        sm: "px-2 py-0.5 text-xs",
        lg: "px-3 py-1 text-sm",
      },
      shape: {
        default: "rounded-full",
        rounded: "rounded-md",
        square: "rounded-none",
      },
      weight: {
        default: "font-semibold",
        normal: "font-normal",
        bold: "font-bold",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      shape: "default",
      weight: "default",
    },
  },
);

export type BadgeProps = React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof badgeVariants>;

function Badge({
  className,
  variant,
  size,
  shape,
  weight,
  ...props
}: BadgeProps) {
  return (
    <div
      data-component="Badge"
      className={cn(badgeVariants({ variant, size, shape, weight }), className)}
      {...props}
    />
  );
}
Badge.displayName = "Badge";

export { Badge, badgeVariants };
