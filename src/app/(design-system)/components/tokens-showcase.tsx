"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
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

export default function TokensShowcase() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Design Tokens</CardTitle>
          <CardDescription>
            Consistent variables for colors, typography, spacing, and more
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="colors">
            <TabsList className="grid grid-cols-5 w-full max-w-2xl">
              <TabsTrigger value="colors">Colors</TabsTrigger>
              <TabsTrigger value="typography">Typography</TabsTrigger>
              <TabsTrigger value="spacing">Spacing</TabsTrigger>
              <TabsTrigger value="radius">Radius</TabsTrigger>
              <TabsTrigger value="shadows">Shadows</TabsTrigger>
            </TabsList>

            <TabsContent value="colors" className="space-y-6 mt-6">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Brand Colors</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <ColorSwatch
                    name="Primary"
                    className="bg-primary text-primary-foreground"
                    variable="--color-primary"
                  />
                  <ColorSwatch
                    name="Secondary"
                    className="bg-secondary text-secondary-foreground"
                    variable="--color-secondary"
                  />
                  <ColorSwatch
                    name="Accent"
                    className="bg-accent text-accent-foreground"
                    variable="--color-accent"
                  />
                  <ColorSwatch
                    name="Muted"
                    className="bg-muted text-muted-foreground"
                    variable="--color-muted"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold">UI Colors</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <ColorSwatch
                    name="Background"
                    className="bg-background text-foreground"
                    variable="--color-background"
                  />
                  <ColorSwatch
                    name="Foreground"
                    className="bg-foreground text-background"
                    variable="--color-foreground"
                  />
                  <ColorSwatch
                    name="Card"
                    className="bg-card text-card-foreground"
                    variable="--color-card"
                  />
                  <ColorSwatch
                    name="Border"
                    className="bg-border text-foreground"
                    variable="--color-border"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Feedback Colors</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <ColorSwatch
                    name="Success"
                    className="bg-success text-success-foreground"
                    variable="--color-success"
                  />
                  <ColorSwatch
                    name="Warning"
                    className="bg-warning text-warning-foreground"
                    variable="--color-warning"
                  />
                  <ColorSwatch
                    name="Destructive"
                    className="bg-destructive text-destructive-foreground"
                    variable="--color-destructive"
                  />
                  <ColorSwatch
                    name="Info"
                    className="bg-info text-info-foreground"
                    variable="--color-info"
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="typography" className="space-y-6 mt-6">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Font Sizes</h3>
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <p className="text-xs">Text Extra Small (--font-size-xs)</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <p className="text-sm">Text Small (--font-size-sm)</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <p className="text-base">Text Base (--font-size-base)</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <p className="text-lg">Text Large (--font-size-lg)</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <p className="text-xl">Text Extra Large (--font-size-xl)</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <p className="text-2xl">Text 2XL (--font-size-2xl)</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <p className="text-3xl">Text 3XL (--font-size-3xl)</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <p className="text-4xl">Text 4XL (--font-size-4xl)</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Font Weights</h3>
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <p className="font-light">
                      Font Light (--font-weight-light)
                    </p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <p className="font-normal">
                      Font Normal (--font-weight-normal)
                    </p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <p className="font-medium">
                      Font Medium (--font-weight-medium)
                    </p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <p className="font-semibold">
                      Font Semibold (--font-weight-semibold)
                    </p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <p className="font-bold">Font Bold (--font-weight-bold)</p>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="spacing" className="space-y-6 mt-6">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Spacing Scale</h3>
                <div className="space-y-4">
                  {[1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24].map((size) => (
                    <div key={size} className="flex items-center gap-4">
                      <div className={`bg-primary h-4 w-${size}`}></div>
                      <span>
                        Space {size} (--space-{size})
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="radius" className="space-y-6 mt-6">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Border Radius</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="p-4 border rounded-[var(--radius-sm)] h-24 flex items-center justify-center">
                    <span>Small (--radius-sm)</span>
                  </div>
                  <div className="p-4 border rounded-[var(--radius-md)] h-24 flex items-center justify-center">
                    <span>Medium (--radius-md)</span>
                  </div>
                  <div className="p-4 border rounded-[var(--radius-lg)] h-24 flex items-center justify-center">
                    <span>Large (--radius-lg)</span>
                  </div>
                  <div className="p-4 border rounded-[var(--radius-xl)] h-24 flex items-center justify-center">
                    <span>Extra Large (--radius-xl)</span>
                  </div>
                  <div className="p-4 border rounded-[var(--radius-2xl)] h-24 flex items-center justify-center">
                    <span>2XL (--radius-2xl)</span>
                  </div>
                  <div className="p-4 border rounded-[var(--radius-full)] h-24 flex items-center justify-center">
                    <span>Full (--radius-full)</span>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="shadows" className="space-y-6 mt-6">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Shadows</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="p-6 bg-card shadow-sm h-24 flex items-center justify-center rounded-lg">
                    <span>Shadow Small (--shadow-sm)</span>
                  </div>
                  <div className="p-6 bg-card shadow-md h-24 flex items-center justify-center rounded-lg">
                    <span>Shadow Medium (--shadow-md)</span>
                  </div>
                  <div className="p-6 bg-card shadow-lg h-24 flex items-center justify-center rounded-lg">
                    <span>Shadow Large (--shadow-lg)</span>
                  </div>
                  <div className="p-6 bg-card shadow-xl h-24 flex items-center justify-center rounded-lg">
                    <span>Shadow XL (--shadow-xl)</span>
                  </div>
                  <div className="p-6 bg-card shadow-2xl h-24 flex items-center justify-center rounded-lg">
                    <span>Shadow 2XL (--shadow-2xl)</span>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}

function ColorSwatch({
  name,
  className,
  variable,
}: {
  name: string;
  className: string;
  variable: string;
}) {
  return (
    <div className="space-y-1.5">
      <div
        className={cn(
          "h-16 w-full rounded-md flex items-center justify-center",
          className,
        )}
      >
        {name}
      </div>
      <div className="text-xs">{variable}</div>
    </div>
  );
}
