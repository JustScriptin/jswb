import { useState, useEffect, useMemo, useCallback } from "react";
import { getLocalStorageValue } from "@/lib/storage";
import type { Language } from "@/features/codingChallenges/types";

export function useLanguagePreference(
  slug: string,
  defaultLanguage: Language = "javascript",
) {
  const [language, setLanguageState] = useState<Language>(defaultLanguage);

  // Load saved language preference after mount
  useEffect(() => {
    const savedLanguage = getLocalStorageValue(
      `${slug}-language`,
      defaultLanguage,
    ) as Language;
    setLanguageState(savedLanguage);
  }, [slug, defaultLanguage]);

  // React 19 Performance: Memoize setter to prevent unnecessary re-renders
  const setLanguage = useCallback((newLanguage: Language) => {
    setLanguageState(newLanguage);
  }, []);

  // React 19 Performance: Memoize return object to prevent unnecessary re-renders
  return useMemo(
    () => ({
      language,
      setLanguage,
    }),
    [language, setLanguage],
  );
}
