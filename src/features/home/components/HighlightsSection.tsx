"use client";

import { ReactElement } from "react";
import { motion } from "framer-motion";
import { Terminal, Zap, BarChart3 } from "lucide-react";

const HIGHLIGHTS = [
  {
    icon: <Terminal className="h-6 w-6" strokeWidth={1.5} />,
    title: "In-Browser Editor",
    description: "Write code and see results instantly.",
  },
  {
    icon: <Zap className="h-6 w-6" strokeWidth={1.5} />,
    title: "Instant Feedback",
    description: "Run test cases and learn from mistakes.",
  },
  {
    icon: <BarChart3 className="h-6 w-6" strokeWidth={1.5} />,
    title: "Track Progress",
    description: "Monitor completed challenges and growth.",
  },
] as const;

type Highlight = (typeof HIGHLIGHTS)[number];

function HighlightCard({ icon, title, description }: Highlight): ReactElement {
  return (
    <motion.div
      data-component="HighlightCard"
      whileHover={{ y: -8 }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="rounded-xl border bg-background/80 p-6 text-center shadow-lg backdrop-blur"
    >
      <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-muted">
        {icon}
      </div>
      <h3 className="mb-2 font-semibold">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </motion.div>
  );
}

export function HighlightsSection(): ReactElement {
  return (
    <section data-component="HighlightsSection" className="bg-background py-24">
      <div className="container mx-auto grid gap-12 px-4 md:grid-cols-3">
        {HIGHLIGHTS.map((item) => (
          <HighlightCard key={item.title} {...item} />
        ))}
      </div>
    </section>
  );
}
HighlightsSection.displayName = "HighlightsSection";
