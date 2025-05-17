declare module "*.mdx" {
  import { FC } from "react";
  const MDXComponent: FC<Record<string, unknown>>;
  export default MDXComponent;
  export const metadata: Record<string, unknown>;
}
