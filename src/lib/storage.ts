// Utilities for working with localStorage in a safe way

/**
 * Retrieve a value from localStorage and parse it to the correct type.
 * Falls back to the provided default if reading fails.
 */
export const getLocalStorageValue = <T>(key: string, defaultValue: T): T => {
  if (typeof window === "undefined") return defaultValue;
  try {
    const saved = window.localStorage.getItem(key);
    return (saved as unknown as T) ?? defaultValue;
  } catch {
    return defaultValue;
  }
};

/**
 * Save a value to localStorage. Errors are swallowed to avoid runtime issues
 * in unsupported environments or private browsing modes.
 */
export const setLocalStorageValue = <T>(key: string, value: T): void => {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, String(value));
  } catch {
    // ignore write errors
  }
};
