import nextJest from "next/jest.js";

const createJestConfig = nextJest({ dir: "./" });

const customConfig = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  testMatch: ["<rootDir>/tests/**/*.{test,spec}.{js,jsx,ts,tsx}"],
};

export default createJestConfig(customConfig);
