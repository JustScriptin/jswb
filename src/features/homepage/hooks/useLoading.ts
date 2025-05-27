import { useState, useEffect } from "react";

/**
 * Custom hook for managing loading state
 *
 * Controls the loading screen duration
 */
export function useLoading(duration = 1000) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      return void 0;
    }, duration);

    return () => {
      clearTimeout(timer);
      return void 0;
    };
  }, [duration]);

  return { isLoading, setIsLoading };
}
