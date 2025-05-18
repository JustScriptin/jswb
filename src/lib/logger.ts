const levelOrder = {
  debug: 10,
  info: 20,
  warn: 30,
  error: 40,
} as const;

type Level = keyof typeof levelOrder;

const currentLevel: Level =
  process.env.NODE_ENV === "production" ? "info" : "debug";

const shouldLog = (level: Level): boolean =>
  levelOrder[level] >= levelOrder[currentLevel];

export const logger = {
  debug: (...args: unknown[]) => {
    if (shouldLog("debug")) console.debug(...args);
  },
  info: (...args: unknown[]) => {
    if (shouldLog("info")) console.log(...args);
  },
  warn: (...args: unknown[]) => {
    if (shouldLog("warn")) console.warn(...args);
  },
  error: (...args: unknown[]) => {
    console.error(...args);
  },
} as const;
