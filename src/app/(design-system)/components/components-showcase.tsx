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

export default function ComponentsShowcase() {
  return (
    <div className="space-y-6">
      <Tabs defaultValue="buttons">
        <TabsList className="grid grid-cols-3 w-full max-w-md">
          <TabsTrigger value="buttons">Buttons</TabsTrigger>
          <TabsTrigger value="cards">Cards</TabsTrigger>
          <TabsTrigger value="tabs">Tabs</TabsTrigger>
        </TabsList>

        <TabsContent value="buttons" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Button Variants</CardTitle>
              <CardDescription>
                Different button styles for various contexts
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Variants</h3>
                <div className="flex flex-wrap gap-4">
                  <Button variant="default">Default</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="outline">Outline</Button>
                  <Button variant="ghost">Ghost</Button>
                  <Button variant="link">Link</Button>
                  <Button variant="destructive">Destructive</Button>
                  <Button variant="success">Success</Button>
                  <Button variant="warning">Warning</Button>
                  <Button variant="info">Info</Button>
                  <Button variant="subtle">Subtle</Button>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Sizes</h3>
                <div className="flex flex-wrap items-center gap-4">
                  <Button size="xs">Extra Small</Button>
                  <Button size="sm">Small</Button>
                  <Button size="md">Medium</Button>
                  <Button size="lg">Large</Button>
                  <Button size="xl">Extra Large</Button>
                  <Button size="2xl">2XL</Button>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Shapes</h3>
                <div className="flex flex-wrap gap-4">
                  <Button shape="default">Default</Button>
                  <Button shape="rounded">Rounded</Button>
                  <Button shape="square">Square</Button>
                  <Button shape="pill">Pill</Button>
                  <Button shape="soft">Soft</Button>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Icon Buttons</h3>
                <div className="flex flex-wrap gap-4">
                  <Button size="icon-xs">XS</Button>
                  <Button size="icon-sm">S</Button>
                  <Button size="icon-md">M</Button>
                  <Button size="icon-lg">L</Button>
                  <Button size="icon-xl">XL</Button>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Animations</h3>
                <div className="flex flex-wrap gap-4">
                  <Button animation="default">Default</Button>
                  <Button animation="fast">Fast</Button>
                  <Button animation="slow">Slow</Button>
                  <Button animation="bounce">Bounce</Button>
                  <Button animation="pulse">Pulse</Button>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Elevations</h3>
                <div className="flex flex-wrap gap-4">
                  <Button elevation="none">None</Button>
                  <Button elevation="sm">Small</Button>
                  <Button elevation="md">Medium</Button>
                  <Button elevation="lg">Large</Button>
                  <Button elevation="xl">XL</Button>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">States</h3>
                <div className="flex flex-wrap gap-4">
                  <Button>Default</Button>
                  <Button disabled>Disabled</Button>
                  <Button className="opacity-70">Hover (simulated)</Button>
                  <Button className="opacity-50">Active (simulated)</Button>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <pre className="bg-muted p-4 rounded-lg overflow-x-auto w-full">
                <code>{`<Button 
  variant="primary" 
  size="lg" 
  shape="pill"
  weight="semibold"
  animation="default"
  elevation="sm"
>
  Click Me
</Button>`}</code>
              </pre>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="cards" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Card Variants</CardTitle>
              <CardDescription>
                Different card styles for various contexts
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Variants</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card variant="default">
                    <CardHeader>
                      <CardTitle>Default Card</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p>Default card style</p>
                    </CardContent>
                  </Card>

                  <Card variant="primary">
                    <CardHeader>
                      <CardTitle>Primary Card</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p>Primary card style</p>
                    </CardContent>
                  </Card>

                  <Card variant="secondary">
                    <CardHeader>
                      <CardTitle>Secondary Card</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p>Secondary card style</p>
                    </CardContent>
                  </Card>

                  <Card variant="outline">
                    <CardHeader>
                      <CardTitle>Outline Card</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p>Outline card style</p>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Sizes</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card size="sm">
                    <CardHeader>
                      <CardTitle>Small Card</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p>Small card with compact padding</p>
                    </CardContent>
                  </Card>

                  <Card size="default">
                    <CardHeader>
                      <CardTitle>Default Card</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p>Default card size</p>
                    </CardContent>
                  </Card>

                  <Card size="lg">
                    <CardHeader>
                      <CardTitle>Large Card</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p>Large card with more padding</p>
                    </CardContent>
                  </Card>

                  <Card size="xl">
                    <CardHeader>
                      <CardTitle>Extra Large Card</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p>Extra large card with maximum padding</p>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Interactive Cards</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card interactive={true} animation="hover">
                    <CardHeader>
                      <CardTitle>Hover Card</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p>Card with hover animation</p>
                    </CardContent>
                  </Card>

                  <Card interactive={true} animation="scale">
                    <CardHeader>
                      <CardTitle>Scale Card</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p>Card with scale animation</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <pre className="bg-muted p-4 rounded-lg overflow-x-auto w-full">
                <code>{`<Card
  variant="primary"
  size="lg"
  radius="lg"
  elevation="md"
  animation="hover"
  interactive={true}
>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card description</CardDescription>
  </CardHeader>
  <CardContent>
    Card content
  </CardContent>
  <CardFooter>
    Card footer
  </CardFooter>
</Card>`}</code>
              </pre>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="tabs" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Tabs</CardTitle>
              <CardDescription>
                Tab components for organizing content
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Default Tabs</h3>
                <Tabs defaultValue="tab1">
                  <TabsList>
                    <TabsTrigger value="tab1">Tab 1</TabsTrigger>
                    <TabsTrigger value="tab2">Tab 2</TabsTrigger>
                    <TabsTrigger value="tab3">Tab 3</TabsTrigger>
                  </TabsList>
                  <TabsContent
                    value="tab1"
                    className="p-4 mt-2 border rounded-lg"
                  >
                    Tab 1 content
                  </TabsContent>
                  <TabsContent
                    value="tab2"
                    className="p-4 mt-2 border rounded-lg"
                  >
                    Tab 2 content
                  </TabsContent>
                  <TabsContent
                    value="tab3"
                    className="p-4 mt-2 border rounded-lg"
                  >
                    Tab 3 content
                  </TabsContent>
                </Tabs>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Grid Tabs</h3>
                <Tabs defaultValue="tab1">
                  <TabsList className="grid grid-cols-3 w-full">
                    <TabsTrigger value="tab1">Tab 1</TabsTrigger>
                    <TabsTrigger value="tab2">Tab 2</TabsTrigger>
                    <TabsTrigger value="tab3">Tab 3</TabsTrigger>
                  </TabsList>
                  <TabsContent
                    value="tab1"
                    className="p-4 mt-2 border rounded-lg"
                  >
                    Tab 1 content
                  </TabsContent>
                  <TabsContent
                    value="tab2"
                    className="p-4 mt-2 border rounded-lg"
                  >
                    Tab 2 content
                  </TabsContent>
                  <TabsContent
                    value="tab3"
                    className="p-4 mt-2 border rounded-lg"
                  >
                    Tab 3 content
                  </TabsContent>
                </Tabs>
              </div>
            </CardContent>
            <CardFooter>
              <pre className="bg-muted p-4 rounded-lg overflow-x-auto w-full">
                <code>{`<Tabs defaultValue="tab1">
  <TabsList>
    <TabsTrigger value="tab1">Tab 1</TabsTrigger>
    <TabsTrigger value="tab2">Tab 2</TabsTrigger>
  </TabsList>
  <TabsContent value="tab1">
    Tab 1 content
  </TabsContent>
  <TabsContent value="tab2">
    Tab 2 content
  </TabsContent>
</Tabs>`}</code>
              </pre>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
