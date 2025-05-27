import "@testing-library/jest-dom";

// Mock next-mdx-remote/rsc
jest.mock("next-mdx-remote/rsc", () => ({
  compileMDX: jest.fn().mockResolvedValue({
    content: null,
    frontmatter: {},
  }),
  MDXRemote: ({ children }: { children: React.ReactNode }) => children,
}));
