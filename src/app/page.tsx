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

export default function Home(): ReactElement {
  return (
    <main data-component="HomePage" className="flex flex-col">
      <MicroNav />
      <HeroSection />
      <StatsSection />
      <FeaturesSection />
      <HowItWorksSection />
      <PopularChallengesSection />
      <FinalBanner />
    </main>
  );
}
Home.displayName = "Home";
