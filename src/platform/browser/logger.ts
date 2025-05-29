/**
 * Browser-compatible logger implementation
 * Provides the same API as the Node logger but uses browser console methods
 */
export const logger = {
  debug: (...args: unknown[]) => {
    console.debug(...args);
  },
  info: (...args: unknown[]) => {
    console.log(...args);
  },
  warn: (...args: unknown[]) => {
    console.warn(...args);
  },
  error: (...args: unknown[]) => {
    console.error(...args);
  },
} as const;
