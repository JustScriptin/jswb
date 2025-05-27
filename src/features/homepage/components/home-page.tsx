"use client";

import {
  Hero,
  PopularChallenges,
  HowItWorks,
  ValueStrip,
  FinalCta,
  NavigationBar,
  FloatingCta,
  LoadingScreen,
  NoiseTexture,
} from "@/features/homepage";
import { useLoading, useScrollProgress } from "@/features/homepage/hooks";

export function HomePage() {
  const { isLoading } = useLoading();
  const { showNav, scrollProgress } = useScrollProgress();

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div data-component="HomePage" className="relative">
      <NoiseTexture />
      {showNav && <NavigationBar scrollProgress={scrollProgress} />}
      <Hero />
      <PopularChallenges />
      <HowItWorks />
      <ValueStrip />
      <FinalCta />
      <FloatingCta />
    </div>
  );
}
HomePage.displayName = "HomePage";
