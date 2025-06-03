import { useState, useEffect } from "react";
import { useScroll } from "framer-motion";

/**
 * Custom hook for tracking scroll progress
 *
 * Returns whether the navigation should be shown and the current scroll progress
 */
export function useScrollProgress() {
  const [showNav, setShowNav] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const { scrollY } = useScroll();

  useEffect(() => {
    return scrollY.on("change", (latest) => {
      // Once the nav is shown, keep it visible
      if (latest > 64) {
        setShowNav(true);
      }
      setScrollProgress(
        Math.min(latest / (document.body.scrollHeight - window.innerHeight), 1),
      );
    });
  }, [scrollY]);

  return { showNav, scrollProgress };
}
