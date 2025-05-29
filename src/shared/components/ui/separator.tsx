"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import * as SeparatorPrimitive from "@radix-ui/react-separator";

import { cn } from "@/shared/lib/utils";

const separatorVariants = cva("shrink-0", {
  variants: {
    variant: {
      default: "bg-border",
      muted: "bg-muted",
      primary: "bg-primary",
      accent: "bg-accent",
    },
    size: {
      default: "",
      thin: "h-[0.5px]",
      thick: "h-[2px]",
    },
    orientation: {
      horizontal: "h-[1px] w-full",
      vertical: "h-full w-[1px]",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
    orientation: "horizontal",
  },
});

export type SeparatorProps = React.ComponentPropsWithoutRef<
  typeof SeparatorPrimitive.Root
> &
  VariantProps<typeof separatorVariants> & {
    decorative?: boolean;
  };

const Separator = React.forwardRef<
  React.ComponentRef<typeof SeparatorPrimitive.Root>,
  SeparatorProps
>(
  (
    {
      className,
      orientation = "horizontal",
      decorative = true,
      variant,
      size,
      ...props
    },
    ref,
  ) => (
    <SeparatorPrimitive.Root
      data-component="Separator"
      ref={ref}
      decorative={decorative}
      orientation={orientation}
      className={cn(
        separatorVariants({
          variant,
          size,
          orientation,
          className,
        }),
      )}
      {...props}
    />
  ),
);
Separator.displayName = SeparatorPrimitive.Root.displayName;

export { Separator, separatorVariants };
