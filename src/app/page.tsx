import type { ReactElement } from "react";
import {
  HeroSection,
  FinalBanner,
  MicroNav,
  StatsSection,
  FeaturesSection,
  HowItWorksSection,
  PopularChallengesSection,
} from "@/features/home/components";
import { Separator } from "@/components/ui/separator";

export default function Home(): ReactElement {
  return (
    <main data-component="HomePage" className="flex flex-col">
      <MicroNav />
      <HeroSection />
      <Separator className="my-12" />
      <StatsSection />
      <Separator className="my-12" />
      <FeaturesSection />
      <Separator className="my-12" />
      <HowItWorksSection />
      <Separator className="my-12" />
      <PopularChallengesSection />
      <Separator className="my-12" />
      <FinalBanner />
    </main>
  );
}
Home.displayName = "Home";
