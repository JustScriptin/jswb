"use client";

import { Hero } from "@/features/homepage";
import { PopularChallenges } from "@/features/homepage";
import { HowItWorks } from "@/features/homepage";
import { ValueStrip } from "@/features/homepage";
import { FinalCta } from "@/features/homepage";
import { NavigationBar } from "@/features/homepage";
import { FloatingCta } from "@/features/homepage";
import { LoadingScreen } from "@/features/homepage";
import { NoiseTexture } from "@/features/homepage";
import { useLoading } from "@/features/homepage";
import { useScrollProgress } from "@/features/homepage";
import { useDarkMode } from "@/features/homepage";

export function HomePage() {
  const { isDark, toggleDark } = useDarkMode();
  const { isLoading } = useLoading();
  const { showNav, scrollProgress } = useScrollProgress();

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div data-component="HomePage" className="relative">
      <NoiseTexture />
      {showNav && (
        <NavigationBar
          scrollProgress={scrollProgress}
          isDark={isDark}
          toggleDark={toggleDark}
        />
      )}
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
