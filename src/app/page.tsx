import type { ReactElement } from "react";
import {
  HeroSection,
  FinalBanner,
  MicroNav,
  HighlightsSection,
  WorkflowSection,
  PopularChallengesSection,
} from "@/features/home/components";
import { Separator } from "@/components/ui/separator";

export default function Home(): ReactElement {
  return (
    <main data-component="HomePage" className="flex flex-col">
      <MicroNav />
      <HeroSection />
      <Separator className="my-12" />
      <HighlightsSection />
      <Separator className="my-12" />
      <WorkflowSection />
      <Separator className="my-12" />
      <PopularChallengesSection />
      <Separator className="my-12" />
      <FinalBanner />
    </main>
  );
}
Home.displayName = "Home";
