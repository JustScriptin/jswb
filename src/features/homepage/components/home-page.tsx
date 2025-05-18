"use client";

import { Hero } from "@/features/homepage/components/sections/hero";
import { PopularChallenges } from "@/features/homepage/components/sections/popular-challenges";
import { HowItWorks } from "@/features/homepage/components/sections/how-it-works";
import { ValueStrip } from "@/features/homepage/components/sections/value-strip";
import { FinalCta } from "@/features/homepage/components/sections/final-cta";
import { NavigationBar } from "@/features/homepage/components/ui/navigation-bar";
import { FloatingCta } from "@/features/homepage/components/ui/floating-cta";
import { LoadingScreen } from "@/features/homepage/components/ui/loading-screen";
import { useLoading } from "@/features/homepage/hooks/useLoading";
import { useScrollProgress } from "@/features/homepage/hooks/useScrollProgress";

export function HomePage() {
  const { isLoading } = useLoading();
  const { showNav, scrollProgress } = useScrollProgress();

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div data-component="HomePage" className="relative">
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
