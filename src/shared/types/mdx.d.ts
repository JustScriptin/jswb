/**
 * Shared MDX type definitions
 */

declare module "*.mdx" {
  import type { ReactElement } from "react";

  const MDXContent: (props: Record<string, unknown>) => ReactElement;
  export default MDXContent;
}
