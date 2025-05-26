import { MDXContent } from "./mdx-content";

type MarkdownProps = React.HTMLAttributes<HTMLDivElement> & {
  content: string;
};

export function Markdown({ content, ...props }: MarkdownProps) {
  return <MDXContent content={content} {...props} />;
}

Markdown.displayName = "Markdown";
