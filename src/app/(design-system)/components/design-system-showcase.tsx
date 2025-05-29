"use client";

import React from "react";
import { Button } from "@/shared/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/shared/components/ui/tabs";
import { cn } from "@/shared/lib/utils";
import { getCategoryColorClasses } from "@/shared/constants/categories";
import TokensShowcase from "./tokens-showcase";
import ComponentsShowcase from "./components-showcase";

export default function DesignSystemShowcase() {
  return (
    <div className="container mx-auto py-10 px-4 md:px-6">
      <div className="flex flex-col gap-6">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">Design System</h1>
          <p className="text-muted-foreground text-lg">
            A comprehensive guide to the JavaScript Workbench design system
          </p>
        </div>

        <Tabs
          defaultValue="overview"
          className="w-full"
          onValueChange={setActiveTab}
        >
          <TabsList className="grid grid-cols-4 w-full max-w-2xl">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="tokens">Design Tokens</TabsTrigger>
            <TabsTrigger value="components">Components</TabsTrigger>
            <TabsTrigger value="patterns">Usage Patterns</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>JavaScript Workbench Design System</CardTitle>
                <CardDescription>
                  A cohesive design system built on Tailwind CSS v4 and Shadcn
                  UI
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  This design system provides a comprehensive set of components,
                  tokens, and patterns to create consistent and accessible user
                  interfaces across the JavaScript Workbench platform.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Design Tokens</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p>
                        Consistent variables for colors, typography, spacing,
                        and more
                      </p>
                    </CardContent>
                    <CardFooter>
                      <Button
                        variant="outline"
                        onClick={() => setActiveTab("tokens")}
                      >
                        Explore Tokens
                      </Button>
                    </CardFooter>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>Components</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p>Reusable UI building blocks with consistent styling</p>
                    </CardContent>
                    <CardFooter>
                      <Button
                        variant="outline"
                        onClick={() => setActiveTab("components")}
                      >
                        Explore Components
                      </Button>
                    </CardFooter>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>Usage Patterns</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p>Common UI patterns and best practices</p>
                    </CardContent>
                    <CardFooter>
                      <Button
                        variant="outline"
                        onClick={() => setActiveTab("patterns")}
                      >
                        Explore Patterns
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Category Colors</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-2">
                    <div
                      className={cn(
                        "p-4 rounded-lg",
                        getCategoryColorClasses("arrays"),
                      )}
                    >
                      Arrays
                    </div>
                    <div
                      className={cn(
                        "p-4 rounded-lg",
                        getCategoryColorClasses("objects"),
                      )}
                    >
                      Objects
                    </div>
                    <div
                      className={cn(
                        "p-4 rounded-lg",
                        getCategoryColorClasses("strings"),
                      )}
                    >
                      Strings
                    </div>
                    <div
                      className={cn(
                        "p-4 rounded-lg",
                        getCategoryColorClasses("functions"),
                      )}
                    >
                      Functions
                    </div>
                    <div
                      className={cn(
                        "p-4 rounded-lg",
                        getCategoryColorClasses("algorithms"),
                      )}
                    >
                      Algorithms
                    </div>
                    <div
                      className={cn(
                        "p-4 rounded-lg",
                        getCategoryColorClasses("async"),
                      )}
                    >
                      Async
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Component Variants</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    <Button variant="default">Default</Button>
                    <Button variant="secondary">Secondary</Button>
                    <Button variant="outline">Outline</Button>
                    <Button variant="ghost">Ghost</Button>
                    <Button variant="link">Link</Button>
                    <Button variant="destructive">Destructive</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="tokens" className="mt-6">
            <TokensShowcase />
          </TabsContent>

          <TabsContent value="components" className="mt-6">
            <ComponentsShowcase />
          </TabsContent>

          <TabsContent value="patterns" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Usage Patterns</CardTitle>
                <CardDescription>
                  Common UI patterns and best practices for the JavaScript
                  Workbench platform
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold">
                    Category-Based Components
                  </h3>
                  <p>
                    When creating components that represent JavaScript
                    categories (arrays, objects, etc.), use the
                    getCategoryColorClasses helper function to apply consistent
                    styling:
                  </p>
                  <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
                    <code>{`import { getCategoryColorClasses } from "@/shared/constants/categories";

<div className={cn("p-4 rounded-lg", getCategoryColorClasses("arrays"))}>
  Array content
</div>`}</code>
                  </pre>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-semibold">
                    Interactive Elements
                  </h3>
                  <p>
                    For interactive elements, use the appropriate variants and
                    provide hover/active states:
                  </p>
                  <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
                    <code>{`// Button with animation and elevation
<Button 
  variant="primary"
  size="lg"
  animation="default"
  elevation="sm"
>
  Click Me
</Button>

<Card
  interactive={true}
  animation="hover"
>
  Card content
</Card>`}</code>
                  </pre>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-semibold">Dark Mode Support</h3>
                  <p>
                    All components support dark mode automatically. For custom
                    elements, use the dark: prefix:
                  </p>
                  <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
                    <code>{`<div className="bg-background text-foreground dark:bg-background dark:text-foreground">
  Content with automatic dark mode support
</div>`}</code>
                  </pre>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
