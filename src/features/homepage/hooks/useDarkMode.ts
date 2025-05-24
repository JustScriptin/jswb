import { useEffect, useState } from "react";

export type UseDarkModeReturn = {
  isDark: boolean;
  toggleDark: () => void;
};

/**
 * Custom hook for toggling dark mode
 *
 * Applies or removes the `dark` class on the html element
 */
export function useDarkMode(defaultDark = true): UseDarkModeReturn {
  const [isDark, setIsDark] = useState(defaultDark);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  const toggleDark = () => setIsDark((prev) => !prev);

  return { isDark, toggleDark };
}
