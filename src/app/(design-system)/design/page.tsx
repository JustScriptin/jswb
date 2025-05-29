import React from "react";
import type { Metadata } from "next";
import DesignSystemShowcase from "../components/design-system-showcase";

export const metadata: Metadata = {
  title: "Design System | JavaScript Workbench",
  description: "Component library and design tokens for JavaScript Workbench",
};

export default function DesignSystemPage() {
  return <DesignSystemShowcase />;
}
