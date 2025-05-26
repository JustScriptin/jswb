import nextJest from "next/jest.js";

const createJestConfig = nextJest({ dir: "./" });

const customConfig = {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  testMatch: ["<rootDir>/tests/**/*.{test,spec}.{js,jsx,ts,tsx}"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node", "mdx"],
  transformIgnorePatterns: [
    "/node_modules/(?!(next-mdx-remote|@mdx-js)/)",
  ],
};

export default createJestConfig(customConfig);
