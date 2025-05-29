"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import * as TabsPrimitive from "@radix-ui/react-tabs";

import { cn } from "@/shared/lib/utils";

const Tabs = TabsPrimitive.Root;

const tabsListVariants = cva(
  "inline-flex items-center justify-center rounded-lg bg-muted text-muted-foreground",
  {
    variants: {
      size: {
        default: "h-9 p-1",
        sm: "h-7 p-0.5 text-xs",
        lg: "h-11 p-1.5 text-base",
      },
      fullWidth: {
        true: "w-full",
        false: "",
      },
    },
    defaultVariants: {
      size: "default",
      fullWidth: false,
    },
  },
);

export type TabsListProps = React.ComponentPropsWithoutRef<
  typeof TabsPrimitive.List
> &
  VariantProps<typeof tabsListVariants>;

const TabsList = React.forwardRef<
  React.ComponentRef<typeof TabsPrimitive.List>,
  TabsListProps
>(({ className, size, fullWidth, ...props }, ref) => (
  <TabsPrimitive.List
    data-component="TabsList"
    ref={ref}
    className={cn(tabsListVariants({ size, fullWidth, className }))}
    {...props}
  />
));
TabsList.displayName = TabsPrimitive.List.displayName;

const tabsTriggerVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow",
  {
    variants: {
      size: {
        default: "px-3 py-1 text-sm",
        sm: "px-2 py-0.5 text-xs",
        lg: "px-4 py-1.5 text-base",
      },
      variant: {
        default: "",
        subtle:
          "data-[state=active]:bg-muted/80 data-[state=active]:shadow-none",
        underline:
          "rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:shadow-none",
      },
    },
    defaultVariants: {
      size: "default",
      variant: "default",
    },
  },
);

export type TabsTriggerProps = React.ComponentPropsWithoutRef<
  typeof TabsPrimitive.Trigger
> &
  VariantProps<typeof tabsTriggerVariants>;

const TabsTrigger = React.forwardRef<
  React.ComponentRef<typeof TabsPrimitive.Trigger>,
  TabsTriggerProps
>(({ className, size, variant, ...props }, ref) => (
  <TabsPrimitive.Trigger
    data-component="TabsTrigger"
    ref={ref}
    className={cn(tabsTriggerVariants({ size, variant, className }))}
    {...props}
  />
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const tabsContentVariants = cva(
  "ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
  {
    variants: {
      spacing: {
        default: "mt-2",
        none: "",
        loose: "mt-4",
      },
    },
    defaultVariants: {
      spacing: "default",
    },
  },
);

export type TabsContentProps = React.ComponentPropsWithoutRef<
  typeof TabsPrimitive.Content
> &
  VariantProps<typeof tabsContentVariants>;

const TabsContent = React.forwardRef<
  React.ComponentRef<typeof TabsPrimitive.Content>,
  TabsContentProps
>(({ className, spacing, ...props }, ref) => (
  <TabsPrimitive.Content
    data-component="TabsContent"
    ref={ref}
    className={cn(tabsContentVariants({ spacing, className }))}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

export {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  tabsListVariants,
  tabsTriggerVariants,
  tabsContentVariants,
};
