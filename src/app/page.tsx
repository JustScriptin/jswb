import type { ReactElement } from "react";
import {
  HeroSection,
  StatsPebble,
  FinalBanner,
  MicroNav,
} from "@/features/home/components";
import { Code2, Layers, Trophy } from "lucide-react";

export default function Home(): ReactElement {
  return (
    <main data-component="HomePage" className="flex flex-col">
      <MicroNav />
      <HeroSection />
      <section className="bg-muted py-12">
        <div className="container mx-auto flex justify-center gap-6">
          <StatsPebble
            icon={<Code2 className="h-6 w-6" />}
            value={50}
            label="Exercises"
          />
          <StatsPebble
            icon={<Layers className="h-6 w-6" />}
            value={4}
            label="Categories"
          />
          <StatsPebble
            icon={<Trophy className="h-6 w-6" />}
            value={12}
            label="Techniques"
          />
        </div>
      </section>
      <FinalBanner />
    </main>
  );
}
Home.displayName = "Home";
