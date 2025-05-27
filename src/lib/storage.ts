// Utilities for working with localStorage in a safe way

/**
 * Retrieve a value from localStorage and parse it to the correct type.
 * Falls back to the provided default if reading fails.
 */
export const getLocalStorageValue = <T>(key: string, defaultValue: T): T => {
  if (typeof window === "undefined") return defaultValue;
  try {
    const saved = window.localStorage.getItem(key);
    if (saved === null) return defaultValue;
    try {
      return JSON.parse(saved) as T;
    } catch {
      // If parsing fails, return the raw string or default
      return (saved as unknown as T) ?? defaultValue;
    }
  } catch {
    return defaultValue;
  }
};

/**
 * Save a value to localStorage. Errors are swallowed to avoid runtime issues
 * in unsupported environments or private browsing modes.
 */
export const setLocalStorageValue = (key: string, value: unknown): void => {
  if (typeof window === "undefined") return;
  try {
    const valueToStore =
      typeof value === "object" && value !== null 
        ? JSON.stringify(value) 
        : typeof value === "string" 
          ? value 
          : String(value);
    window.localStorage.setItem(key, valueToStore);
  } catch {
    // ignore write errors
  }
};
