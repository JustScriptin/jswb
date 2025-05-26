import "@testing-library/jest-dom";

// Mock next-mdx-remote/serialize
jest.mock("next-mdx-remote/serialize", () => ({
  serialize: jest.fn().mockResolvedValue({
    compiledSource: "",
    scope: {},
    frontmatter: {},
  }),
}));
