/**
 * MDX Compiler service
 * Handles compilation of MDX content to React components
 */
import { compileMDX } from "next-mdx-remote/rsc";
import { MDXComponents } from "@/shared/lib/mdx-components";
import { logger } from "@/platform/node/logger";
import type { ReactElement } from "react";

/**
 * Compiles MDX content to React components
 */
export async function compileMdxContent(source: string): Promise<ReactElement> {
  try {
    const { content } = await compileMDX({
      source,
      options: {
        parseFrontmatter: false,
      },
      components: MDXComponents,
    });

    return content;
  } catch (error) {
    logger.error("Error compiling MDX content:", error);
    throw new Error(`Failed to compile MDX content: ${error}`);
  }
}
