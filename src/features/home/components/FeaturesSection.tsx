"use client";

import { ReactElement } from "react";
import { motion } from "framer-motion";
import { Rocket, BookOpen, Lightbulb } from "lucide-react";

const FEATURES = [
  {
    icon: <Rocket className="h-6 w-6" />,
    title: "Hands-on Practice",
    description: "Write and run code right in your browser.",
  },
  {
    icon: <BookOpen className="h-6 w-6" />,
    title: "Real Examples",
    description: "Learn through practical, everyday tasks.",
  },
  {
    icon: <Lightbulb className="h-6 w-6" />,
    title: "Track Progress",
    description: "See which challenges you've completed.",
  },
] as const;

type Feature = (typeof FEATURES)[number];

function FeatureItem({ icon, title, description }: Feature): ReactElement {
  return (
    <motion.div
      data-component="FeatureItem"
      whileHover={{ y: -4 }}
      className="text-center"
    >
      <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary shadow">
        {icon}
      </div>
      <h3 className="mb-2 font-semibold">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </motion.div>
  );
}

export function FeaturesSection(): ReactElement {
  return (
    <section data-component="FeaturesSection" className="bg-background py-16">
      <div className="container mx-auto grid gap-12 px-4 md:grid-cols-3">
        {FEATURES.map((feature) => (
          <FeatureItem key={feature.title} {...feature} />
        ))}
      </div>
    </section>
  );
}
FeaturesSection.displayName = "FeaturesSection";
