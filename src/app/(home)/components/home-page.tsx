"use client";

import { Hero } from "./sections/hero";
import { PopularChallenges } from "./sections/popular-challenges";
import { HowItWorks } from "./sections/how-it-works";
import { ValueStrip } from "./sections/value-strip";
import { FinalCta } from "./sections/final-cta";
import { NavigationBar } from "./ui/navigation-bar";
import { FloatingCta } from "./ui/floating-cta";
import { LoadingScreen } from "./ui/loading-screen";
import { NoiseTexture } from "./ui/noise-texture";
import { useLoading } from "@/shared/hooks/useLoading";
import { useScrollProgress } from "../hooks/useScrollProgress";

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
